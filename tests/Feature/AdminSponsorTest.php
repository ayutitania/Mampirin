<?php

use App\Models\Ad;
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
        'ad_title' => 'Promo Kopi Senja Jimbaran',
        'ad_target_url' => 'https://instagram.com/kopisenja',
        'ad_image_url' => 'https://example.com/banner.jpg',
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

test('the sponsor index includes the package chosen by the sponsor', function () {
    $package = PartnershipPackage::query()->where('code', '02')->firstOrFail();

    sponsorInquiry(['partnership_package_id' => $package->id]);

    $this->actingAs($this->admin)
        ->get(route('admin.sponsors.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('inquiries.data.0.package.id', $package->id)
            ->where('inquiries.data.0.package.code', '02')
            ->where('inquiries.data.0.package.name', $package->name)
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

test('approving an inquiry creates its ad in the ads table', function () {
    $inquiry = sponsorInquiry();

    $this->actingAs($this->admin)
        ->post(route('admin.sponsors.approve', $inquiry), [
            'ad_title' => 'Promo Kopi Senja',
            'ad_placement' => 'top',
            'ad_is_active' => '1',
        ])
        ->assertRedirect(route('admin.sponsors.index'))
        ->assertSessionHas('success');

    $ad = Ad::query()->firstOrFail();

    expect($ad->title)->toBe('Promo Kopi Senja')
        ->and($ad->placement)->toBe('top')
        ->and($ad->is_active)->toBeTrue()
        ->and($ad->image_url)->toBe('https://example.com/banner.jpg')
        ->and($ad->target_url)->toBe('https://instagram.com/kopisenja')
        ->and($ad->partnership_inquiry_id)->toBe($inquiry->id)
        ->and($inquiry->fresh()->status)->toBe('approved');
});

test('approving with empty optional fields still creates the ad', function () {
    $inquiry = sponsorInquiry([
        'ad_target_url' => null,
        'ad_image_url' => null,
    ]);

    $this->actingAs($this->admin)
        ->post(route('admin.sponsors.approve', $inquiry), [
            'ad_title' => 'Banner Promo',
            'ad_image_url' => '',
            'ad_target_url' => '',
            'ad_placement' => 'top',
            'ad_starts_at' => '',
            'ad_ends_at' => '',
            'ad_sort_order' => '0',
            'ad_is_active' => '1',
        ])
        ->assertSessionHasNoErrors()
        ->assertSessionHas('success');

    expect(Ad::query()->count())->toBe(1)
        ->and($inquiry->fresh()->status)->toBe('approved');
});

test('an inquiry cannot create two ads', function () {
    $inquiry = sponsorInquiry();

    $payload = [
        'ad_title' => 'Promo Kopi Senja',
        'ad_placement' => 'top',
        'ad_is_active' => '1',
    ];

    $this->actingAs($this->admin)
        ->post(route('admin.sponsors.approve', $inquiry), $payload)
        ->assertSessionHas('success');

    $this->actingAs($this->admin)
        ->post(route('admin.sponsors.approve', $inquiry), $payload)
        ->assertSessionHas('error');

    expect(Ad::query()->count())->toBe(1);
});

test('image and target url fall back to the sponsor-provided values', function () {
    $inquiry = sponsorInquiry();

    $this->actingAs($this->admin)
        ->post(route('admin.sponsors.approve', $inquiry), [
            'ad_title' => 'Banner Promosi',
            'ad_placement' => 'sidebar',
            'ad_is_active' => '0',
        ])
        ->assertSessionHas('success');

    $ad = Ad::query()->firstOrFail();

    expect($ad->image_url)->toBe('https://example.com/banner.jpg')
        ->and($ad->target_url)->toBe('https://instagram.com/kopisenja');
});

test('an ad without image or target url creates with nulls', function () {
    $inquiry = sponsorInquiry([
        'ad_target_url' => null,
        'ad_image_url' => null,
    ]);

    $this->actingAs($this->admin)
        ->post(route('admin.sponsors.approve', $inquiry), [
            'ad_title' => 'Banner Teks',
            'ad_placement' => 'sidebar',
            'ad_is_active' => '0',
        ])
        ->assertSessionHas('success');

    $ad = Ad::query()->firstOrFail();

    expect($ad->image_url)->toBeNull()
        ->and($ad->target_url)->toBeNull();
});

test('the approval form requires an ad title and placement', function () {
    $inquiry = sponsorInquiry();

    $this->actingAs($this->admin)
        ->post(route('admin.sponsors.approve', $inquiry), [
            'ad_placement' => 'sidebar',
        ])
        ->assertSessionHasErrors(['ad_title']);

    expect(Ad::count())->toBe(0)
        ->and($inquiry->fresh()->status)->toBe('pending');
});
