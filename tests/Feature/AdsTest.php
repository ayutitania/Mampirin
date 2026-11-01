<?php

use App\Models\Ad;
use Database\Seeders\AdsSeeder;
use Database\Seeders\PartnershipPackageSeeder;
use Inertia\Testing\AssertableInertia as Assert;

test('the ads page receives partnership packages from the database', function () {
    $this->seed(PartnershipPackageSeeder::class);

    $this->get(route('ads'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Ads')
            ->has('packages', 3)
            ->where('packages.0.code', '01')
            ->where('packages.0.cta_url', '/partnership?package=01')
            ->where('packages.1.is_featured', true)
            ->where('packages.2.name', 'Growth Partner (Retainer)')
        );
});

test('active ads are shared with every page', function () {
    $this->seed(AdsSeeder::class);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('ads.top', 3)
            ->has('ads.sidebar', 1)
            ->where('ads.top.0.target_url', 'https://example.com/kopi-senja-jimbaran')
        );
});

test('inactive ads are not shared', function () {
    $this->seed(AdsSeeder::class);

    Ad::query()->where('placement', 'top')->update(['is_active' => false]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->missing('ads.top'));
});
