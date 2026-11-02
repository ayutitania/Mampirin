<?php

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Database\Seeders\CategorySeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(CategorySeeder::class);
    $this->admin = User::factory()->create();
});

function categoryPayload(array $overrides = []): array
{
    return [
        'name' => 'Teknologi',
        'slug' => '',
        'description' => 'Berita teknologi dan inovasi lokal.',
        'image_url' => 'https://example.com/teknologi.jpg',
        'sort_order' => 4,
        'is_active' => true,
        ...$overrides,
    ];
}

test('the category index lists all categories with article counts', function () {
    $this->actingAs($this->admin)
        ->get(route('admin.categories.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Categories/Index')
            ->has('categories', 3)
            ->where('categories.0.slug', 'entertainment')
        );
});

test('an admin can create a category', function () {
    $this->actingAs($this->admin)
        ->post(route('admin.categories.store'), categoryPayload())
        ->assertRedirect(route('admin.categories.index'))
        ->assertSessionHas('success');

    $category = Category::query()->where('name', 'Teknologi')->firstOrFail();

    expect($category->slug)->toBe('teknologi')
        ->and($category->sort_order)->toBe(4)
        ->and($category->is_active)->toBeTrue();
});

test('an admin can update a category', function () {
    $category = Category::query()->where('slug', 'history')->firstOrFail();

    $this->actingAs($this->admin)
        ->get(route('admin.categories.edit', $category))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Categories/Form')
            ->where('category.id', $category->id)
        );

    $this->actingAs($this->admin)
        ->put(route('admin.categories.update', $category), categoryPayload([
            'name' => 'Sejarah',
            'slug' => '',
            'is_active' => false,
        ]))
        ->assertRedirect(route('admin.categories.index'))
        ->assertSessionHas('success');

    $category->refresh();

    expect($category->name)->toBe('Sejarah')
        ->and($category->slug)->toBe('sejarah')
        ->and($category->is_active)->toBeFalse();
});

test('an empty category can be deleted', function () {
    $category = Category::query()->create(categoryPayload([
        'slug' => 'teknologi',
    ]));

    $this->actingAs($this->admin)
        ->delete(route('admin.categories.destroy', $category))
        ->assertRedirect(route('admin.categories.index'))
        ->assertSessionHas('success');

    $this->assertModelMissing($category);
});

test('a category that still has articles cannot be deleted', function () {
    $category = Category::query()->where('slug', 'history')->firstOrFail();

    Article::query()->create([
        'category_id' => $category->id,
        'title' => 'Artikel Sejarah',
        'slug' => 'artikel-sejarah',
        'excerpt' => 'Ringkasan artikel sejarah.',
        'body' => str_repeat('Isi artikel yang cukup panjang. ', 5),
        'author' => 'Tim Mampirin',
        'is_published' => true,
        'published_at' => now()->subDay(),
    ]);

    $this->actingAs($this->admin)
        ->from(route('admin.categories.index'))
        ->delete(route('admin.categories.destroy', $category))
        ->assertRedirect(route('admin.categories.index'))
        ->assertSessionHas('error');

    $this->assertModelExists($category);
});

test('category validation rejects invalid payloads', function (array $payload, string $invalidField) {
    $this->actingAs($this->admin)
        ->post(route('admin.categories.store'), categoryPayload($payload))
        ->assertSessionHasErrors($invalidField);
})->with([
    'name is required' => [['name' => ''], 'name'],
    'sort order must be numeric' => [['sort_order' => 'dua'], 'sort_order'],
]);
