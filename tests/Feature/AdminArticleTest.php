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

function articlePayload(array $overrides = []): array
{
    return [
        'title' => 'Artikel Baru dari Admin',
        'slug' => '',
        'category_id' => Category::query()->value('id'),
        'excerpt' => 'Ringkasan singkat artikel yang dibuat lewat panel admin.',
        'body' => str_repeat('Isi artikel yang cukup panjang untuk lolos validasi. ', 3),
        'image_url' => 'https://example.com/artikel.jpg',
        'author' => 'Admin Mampirin',
        'published_at' => now()->toDateTimeString(),
        'is_featured' => true,
        'is_published' => true,
        ...$overrides,
    ];
}

test('the article index is displayed to an authenticated admin', function () {
    Article::query()->create([
        ...articlePayload(),
        'slug' => 'artikel-terdaftar',
    ]);

    $this->actingAs($this->admin)
        ->get(route('admin.articles.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Articles/Index')
            ->has('articles.data', 1)
            ->has('categories', 3)
        );
});

test('the create article form is displayed', function () {
    $this->actingAs($this->admin)
        ->get(route('admin.articles.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Articles/Form')
            ->where('article', null)
            ->has('categories', 3)
        );
});

test('an admin can create an article', function () {
    $this->actingAs($this->admin)
        ->post(route('admin.articles.store'), articlePayload())
        ->assertRedirect(route('admin.articles.index'))
        ->assertSessionHas('success');

    $article = Article::query()->firstOrFail();

    expect($article->slug)->toBe('artikel-baru-dari-admin')
        ->and($article->is_featured)->toBeTrue()
        ->and($article->is_published)->toBeTrue();
});

test('article slugs stay unique when titles collide', function () {
    $this->actingAs($this->admin)
        ->post(route('admin.articles.store'), articlePayload())
        ->assertSessionHasNoErrors();

    $this->actingAs($this->admin)
        ->post(route('admin.articles.store'), articlePayload())
        ->assertSessionHasNoErrors();

    expect(Article::query()->pluck('slug')->all())
        ->toBe(['artikel-baru-dari-admin', 'artikel-baru-dari-admin-2']);
});

test('an article can be edited and updated', function () {
    $article = Article::query()->create([
        ...articlePayload(),
        'slug' => 'artikel-lama',
    ]);

    $this->actingAs($this->admin)
        ->get(route('admin.articles.edit', $article))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Articles/Form')
            ->where('article.id', $article->id)
        );

    $this->actingAs($this->admin)
        ->put(route('admin.articles.update', $article), articlePayload([
            'title' => 'Judul Artikel Diperbarui',
            'slug' => '',
            'is_featured' => false,
            'is_published' => false,
        ]))
        ->assertRedirect(route('admin.articles.index'))
        ->assertSessionHas('success');

    $article->refresh();

    expect($article->title)->toBe('Judul Artikel Diperbarui')
        ->and($article->slug)->toBe('judul-artikel-diperbarui')
        ->and($article->is_featured)->toBeFalse()
        ->and($article->is_published)->toBeFalse();
});

test('an admin can toggle the published state', function () {
    $article = Article::query()->create([
        ...articlePayload(),
        'slug' => 'artikel-toggle',
    ]);

    $this->actingAs($this->admin)
        ->patch(route('admin.articles.toggle', $article))
        ->assertRedirect();

    expect($article->fresh()->is_published)->toBeFalse();
});

test('an admin can delete an article', function () {
    $article = Article::query()->create([
        ...articlePayload(),
        'slug' => 'artikel-hapus',
    ]);

    $this->actingAs($this->admin)
        ->delete(route('admin.articles.destroy', $article))
        ->assertRedirect(route('admin.articles.index'));

    $this->assertModelMissing($article);
});

test('article validation rejects invalid payloads', function (array $payload, string $invalidField) {
    $this->actingAs($this->admin)
        ->post(route('admin.articles.store'), articlePayload($payload))
        ->assertSessionHasErrors($invalidField);

    expect(Article::count())->toBe(0);
})->with([
    'title is required' => [['title' => ''], 'title'],
    'category is required' => [['category_id' => ''], 'category_id'],
    'excerpt is required' => [['excerpt' => ''], 'excerpt'],
    'body must be long enough' => [['body' => 'terlalu pendek'], 'body'],
    'author is required' => [['author' => ''], 'author'],
]);
