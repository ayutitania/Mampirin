<?php

use App\Models\Ad;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->admin = User::factory()->create();
});

function adPayload(array $overrides = []): array
{
    return [
        'title' => 'Promo Kopi Senja',
        'image_url' => 'https://example.com/iklan.jpg',
        'target_url' => 'https://example.com/promo',
        'placement' => 'top',
        'sort_order' => 1,
        'is_active' => true,
        ...$overrides,
    ];
}

test('the ad index lists ads with placement options', function () {
    Ad::query()->create(adPayload());

    $this->actingAs($this->admin)
        ->get(route('admin.ads.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Ads/Index')
            ->has('ads.data', 1)
            ->where('ads.data.0.title', 'Promo Kopi Senja')
            ->has('placements', 3)
            ->where('placements.0.value', 'top')
        );
});

test('the ad index can be filtered by placement and status', function () {
    Ad::query()->create(adPayload());
    Ad::query()->create(adPayload([
        'title' => 'Iklan Sidebar',
        'placement' => 'sidebar',
        'is_active' => false,
    ]));

    $this->actingAs($this->admin)
        ->get(route('admin.ads.index', ['placement' => 'sidebar', 'status' => 'inactive']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('ads.data', 1)
            ->where('ads.data.0.title', 'Iklan Sidebar')
        );
});

test('the create ad form is displayed', function () {
    $this->actingAs($this->admin)
        ->get(route('admin.ads.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Ads/Form')
            ->where('ad', null)
            ->has('placements', 3)
        );
});

test('an admin can create an ad', function () {
    $this->actingAs($this->admin)
        ->post(route('admin.ads.store'), adPayload([
            'starts_at' => now()->toDateTimeString(),
            'ends_at' => now()->addWeek()->toDateTimeString(),
        ]))
        ->assertRedirect(route('admin.ads.index'))
        ->assertSessionHas('success');

    $ad = Ad::query()->firstOrFail();

    expect($ad->title)->toBe('Promo Kopi Senja')
        ->and($ad->placement)->toBe('top')
        ->and($ad->is_active)->toBeTrue()
        ->and($ad->sort_order)->toBe(1);
});

test('an ad can be edited and updated', function () {
    $ad = Ad::query()->create(adPayload());

    $this->actingAs($this->admin)
        ->get(route('admin.ads.edit', $ad))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Ads/Form')
            ->where('ad.id', $ad->id)
        );

    $this->actingAs($this->admin)
        ->put(route('admin.ads.update', $ad), adPayload([
            'title' => 'Promo Diperbarui',
            'placement' => 'article_sidebar',
            'sort_order' => 5,
            'is_active' => false,
        ]))
        ->assertRedirect(route('admin.ads.index'))
        ->assertSessionHas('success');

    $ad->refresh();

    expect($ad->title)->toBe('Promo Diperbarui')
        ->and($ad->placement)->toBe('article_sidebar')
        ->and($ad->sort_order)->toBe(5)
        ->and($ad->is_active)->toBeFalse();
});

test('an admin can toggle the active state of an ad', function () {
    $ad = Ad::query()->create(adPayload());

    $this->actingAs($this->admin)
        ->patch(route('admin.ads.toggle', $ad))
        ->assertRedirect();

    expect($ad->fresh()->is_active)->toBeFalse();

    $this->actingAs($this->admin)
        ->patch(route('admin.ads.toggle', $ad))
        ->assertRedirect();

    expect($ad->fresh()->is_active)->toBeTrue();
});

test('an admin can delete an ad', function () {
    $ad = Ad::query()->create(adPayload());

    $this->actingAs($this->admin)
        ->delete(route('admin.ads.destroy', $ad))
        ->assertRedirect(route('admin.ads.index'));

    $this->assertModelMissing($ad);
});

test('ad validation rejects invalid payloads', function (array $payload, string $invalidField) {
    $this->actingAs($this->admin)
        ->post(route('admin.ads.store'), adPayload($payload))
        ->assertSessionHasErrors($invalidField);

    expect(Ad::count())->toBe(0);
})->with([
    'title is required' => [['title' => ''], 'title'],
    'placement must be known' => [['placement' => 'footer'], 'placement'],
    'ends_at must be a date' => [['ends_at' => 'bukan-tanggal'], 'ends_at'],
    'sort_order must be a number' => [['sort_order' => 'abc'], 'sort_order'],
]);
