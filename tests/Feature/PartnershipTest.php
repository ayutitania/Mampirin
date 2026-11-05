<?php

use App\Models\PartnershipInquiry;
use App\Models\PartnershipPackage;
use Database\Seeders\PartnershipPackageSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('the partnership page receives packages and the preselected package', function () {
    $this->seed(PartnershipPackageSeeder::class);

    $preselected = PartnershipPackage::query()->where('code', '02')->firstOrFail();

    $this->get(route('partnership.index', ['package' => '02']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Partnership')
            ->has('packages', 3)
            ->where('packages.0.code', '01')
            ->where('selectedPackage', '02')
            ->where('selectedPackageId', $preselected->id)
        );
});

test('the preselected package also works with a package id and falls back to nothing for unknown values', function () {
    $this->seed(PartnershipPackageSeeder::class);

    $package = PartnershipPackage::query()->where('code', '03')->firstOrFail();

    $this->get(route('partnership.index', ['package' => $package->id]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('selectedPackageId', $package->id)
        );

    $this->get(route('partnership.index', ['package' => 'tidak-ada']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('selectedPackageId', null)
        );
});

test('a partnership inquiry can be stored', function () {
    Storage::fake('public');

    $this->seed(PartnershipPackageSeeder::class);
    $package = PartnershipPackage::query()->where('code', '02')->firstOrFail();
    $image = UploadedFile::fake()->create('banner.jpg', 200, 'image/jpeg');

    $response = $this
        ->from(route('partnership.index'))
        ->post(route('partnership.store'), [
            'partnership_package_id' => $package->id,
            'company' => 'Kopi Senja Jimbaran',
            'contact_name' => 'Ayu Putri',
            'email' => 'ayu@example.com',
            'phone' => '081234567890',
            'message' => 'Kami ingin mempromosikan menu baru untuk mahasiswa bulan depan.',
            'ad_title' => 'Banner Kopi Senja',
            'ad_target_url' => 'https://instagram.com/kopisenja',
            'ad_image' => $image,
        ]);

    $response
        ->assertRedirect(route('partnership.index'))
        ->assertSessionHas('success');

    $inquiry = PartnershipInquiry::firstOrFail();

    expect($inquiry->partnership_package_id)->toBe($package->id)
        ->and($inquiry->company)->toBe('Kopi Senja Jimbaran')
        ->and($inquiry->email)->toBe('ayu@example.com')
        ->and($inquiry->ad_title)->toBe('Banner Kopi Senja')
        ->and($inquiry->ad_target_url)->toBe('https://instagram.com/kopisenja')
        ->and($inquiry->status)->toBe('pending')
        ->and($inquiry->ad_image_url)->toStartWith('/storage/partnership-images/');

    Storage::disk('public')->assertExists(
        str_replace('/storage/', '', $inquiry->ad_image_url),
    );
});

test('the ad image is optional but must be a valid image when uploaded', function () {
    $this->seed(PartnershipPackageSeeder::class);
    $package = PartnershipPackage::query()->where('code', '02')->firstOrFail();

    $payload = [
        'partnership_package_id' => $package->id,
        'company' => 'Warung Makan Sederhana',
        'contact_name' => 'Budi',
        'email' => 'budi@example.com',
        'message' => 'Ingin mempromosikan menu baru untuk mahasiswa.',
        'ad_title' => 'Banner Warung Makan',
    ];

    $this->post(route('partnership.store'), $payload)
        ->assertSessionHasNoErrors();

    expect(PartnershipInquiry::first()->ad_image_url)->toBeNull();

    $this->post(route('partnership.store'), [
        ...$payload,
        'ad_image' => UploadedFile::fake()->create('dokumen.pdf', 100, 'application/pdf'),
    ])->assertSessionHasErrors('ad_image');
});

test('the phone number is optional but the package is required', function () {
    $this->seed(PartnershipPackageSeeder::class);
    $package = PartnershipPackage::query()->where('code', '03')->firstOrFail();

    $this->post(route('partnership.store'), [
        'partnership_package_id' => $package->id,
        'company' => 'Warung Makan Sederhana',
        'contact_name' => 'Budi',
        'email' => 'budi@example.com',
        'message' => 'Ingin konsultasi dulu sebelum memilih paket kemitraan.',
        'ad_title' => 'Banner Warung Makan',
    ])->assertSessionHasNoErrors();

    $inquiry = PartnershipInquiry::first();

    expect($inquiry->phone)->toBeNull()
        ->and($inquiry->partnership_package_id)->toBe($package->id);
});

test('a missing package is rejected', function () {
    $this->post(route('partnership.store'), [
        'company' => 'Warung Makan Sederhana',
        'contact_name' => 'Budi',
        'email' => 'budi@example.com',
        'message' => 'Ingin konsultasi dulu sebelum memilih paket kemitraan.',
    ])->assertSessionHasErrors('partnership_package_id');

    expect(PartnershipInquiry::count())->toBe(0);
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
