<?php

use App\Models\PartnershipInquiry;
use App\Models\PartnershipPackage;
use App\Models\User;
use Database\Seeders\PartnershipPackageSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(PartnershipPackageSeeder::class);
    $this->admin = User::factory()->create();
});

function sponsorInquiry(array $overrides = []): PartnershipInquiry
{
    return PartnershipInquiry::query()->create([
        'partnership_package_id' => PartnershipPackage::query()->value('id'),
        'company' => 'Kopi Senja Jimbaran',
        'contact_name' => 'Ayu Putri',
        'email' => 'ayu@example.com',
        'phone' => '081234567890',
        'message' => 'Kami ingin mempromosikan menu baru untuk mahasiswa.',
        'status' => 'pending',
        ...$overrides,
    ]);
}

test('the sponsor index lists incoming inquiries with counts', function () {
    sponsorInquiry();
    sponsorInquiry([
        'company' => 'Warung Sederhana',
        'status' => 'contacted',
    ]);

    $this->actingAs($this->admin)
        ->get(route('admin.sponsors.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Sponsors/Index')
            ->has('inquiries.data', 2)
            ->has('statuses', 4)
            ->where('counts.pending', 1)
            ->where('counts.contacted', 1)
        );
});

test('the sponsor index can be filtered by status and search', function () {
    sponsorInquiry();
    sponsorInquiry([
        'company' => 'Warung Sederhana',
        'email' => 'budi@example.com',
        'status' => 'approved',
    ]);

    $this->actingAs($this->admin)
        ->get(route('admin.sponsors.index', ['status' => 'approved']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('inquiries.data', 1)
            ->where('inquiries.data.0.company', 'Warung Sederhana')
        );

    $this->actingAs($this->admin)
        ->get(route('admin.sponsors.index', ['search' => 'budi@example.com']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('inquiries.data', 1)
            ->where('inquiries.data.0.company', 'Warung Sederhana')
        );
});

test('an admin can update the status of an inquiry', function () {
    $inquiry = sponsorInquiry();

    $this->actingAs($this->admin)
        ->patch(route('admin.sponsors.status', $inquiry), ['status' => 'contacted'])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($inquiry->fresh()->status)->toBe('contacted');
});

test('an inquiry status must be one of the known statuses', function () {
    $inquiry = sponsorInquiry();

    $this->actingAs($this->admin)
        ->patch(route('admin.sponsors.status', $inquiry), ['status' => 'unknown'])
        ->assertSessionHasErrors('status');

    expect($inquiry->fresh()->status)->toBe('pending');
});

test('an admin can delete an inquiry', function () {
    $inquiry = sponsorInquiry();

    $this->actingAs($this->admin)
        ->delete(route('admin.sponsors.destroy', $inquiry))
        ->assertRedirect(route('admin.sponsors.index'));

    $this->assertModelMissing($inquiry);
});
