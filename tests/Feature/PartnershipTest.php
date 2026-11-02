<?php

use App\Models\PartnershipInquiry;
use App\Models\PartnershipPackage;
use Database\Seeders\PartnershipPackageSeeder;
use Inertia\Testing\AssertableInertia as Assert;

test('the partnership page receives packages and the preselected package', function () {
    $this->seed(PartnershipPackageSeeder::class);

    $this->get(route('partnership.index', ['package' => '02']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Partnership')
            ->has('packages', 3)
            ->where('packages.0.code', '01')
            ->where('selectedPackage', '02')
        );
});

test('a partnership inquiry can be stored', function () {
    $this->seed(PartnershipPackageSeeder::class);
    $package = PartnershipPackage::query()->where('code', '02')->firstOrFail();

    $response = $this
        ->from(route('partnership.index'))
        ->post(route('partnership.store'), [
            'partnership_package_id' => $package->id,
            'company' => 'Kopi Senja Jimbaran',
            'contact_name' => 'Ayu Putri',
            'email' => 'ayu@example.com',
            'phone' => '081234567890',
            'message' => 'Kami ingin mempromosikan menu baru untuk mahasiswa bulan depan.',
        ]);

    $response
        ->assertRedirect(route('partnership.index'))
        ->assertSessionHas('success');

    $this->assertDatabaseHas('partnership_inquiries', [
        'partnership_package_id' => $package->id,
        'company' => 'Kopi Senja Jimbaran',
        'email' => 'ayu@example.com',
        'status' => 'pending',
    ]);

    expect(PartnershipInquiry::count())->toBe(1);
});

test('the phone number and package are optional', function () {
    $this->post(route('partnership.store'), [
        'company' => 'Warung Makan Sederhana',
        'contact_name' => 'Budi',
        'email' => 'budi@example.com',
        'message' => 'Ingin konsultasi dulu sebelum memilih paket kemitraan.',
    ])->assertSessionHasNoErrors();

    $inquiry = PartnershipInquiry::first();

    expect($inquiry->phone)->toBeNull()
        ->and($inquiry->partnership_package_id)->toBeNull();
});

test('required fields are validated', function (array $payload, string $invalidField) {
    $this->post(route('partnership.store'), $payload)
        ->assertSessionHasErrors($invalidField);

    expect(PartnershipInquiry::count())->toBe(0);
})->with([
    'company is required' => [['company' => '', 'contact_name' => 'A', 'email' => 'a@example.com', 'message' => str_repeat('konten ', 10)], 'company'],
    'contact name is required' => [['company' => 'Kafe', 'contact_name' => '', 'email' => 'a@example.com', 'message' => str_repeat('konten ', 10)], 'contact_name'],
    'email must be valid' => [['company' => 'Kafe', 'contact_name' => 'A', 'email' => 'bukan-email', 'message' => str_repeat('konten ', 10)], 'email'],
    'message is required' => [['company' => 'Kafe', 'contact_name' => 'A', 'email' => 'a@example.com', 'message' => ''], 'message'],
    'message must be at least 20 characters' => [['company' => 'Kafe', 'contact_name' => 'A', 'email' => 'a@example.com', 'message' => 'terlalu singkat'], 'message'],
]);
