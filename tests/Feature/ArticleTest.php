<?php

use App\Models\Article;
use App\Models\Category;
use Database\Seeders\ArticleSeeder;
use Database\Seeders\CategorySeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(CategorySeeder::class);
});

function makeArticle(array $attributes = []): Article
{
    $category = Category::query()->firstOrFail();

    return Article::query()->create([
        'category_id' => $category->id,
        'title' => 'Artikel Uji Coba',
        'slug' => 'artikel-uji-coba',
        'excerpt' => 'Ringkasan artikel uji coba untuk pengujian.',
        'body' => str_repeat('Isi artikel yang cukup panjang. ', 10),
        'image_url' => 'https://example.com/gambar.jpg',
        'author' => 'Tim Mampirin',
        'is_featured' => false,
        'is_published' => true,
        'published_at' => now()->subDay(),
        ...$attributes,
    ]);
}

test('the home page receives the published feed from the database', function () {
    $this->seed(ArticleSeeder::class);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('hero')
            ->has('entertainment', 4)
            ->has('history', 4)
            ->has('latest', 5)
            ->has('popular', 2)
        );
});

test('a category page lists published articles in that category', function () {
    $article = makeArticle();

    $this->get(route('article.category', ['slug' => $article->category->slug]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ArticleCategory')
            ->where('category.slug', $article->category->slug)
            ->has('articles', 1)
            ->where('articles.0.slug', $article->slug)
        );
});

test('the legacy category routes still resolve to their categories', function (string $route, string $slug) {
    $this->get(route($route))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ArticleCategory')
            ->where('category.slug', $slug)
        );
})->with([
    ['article.entertainment', 'entertainment'],
    ['article.history', 'history'],
    ['article.lifestyle', 'lifestyle'],
]);

test('an article detail page can be opened and its views incremented', function () {
    $article = makeArticle();

    $this->get(route('article.show', ['slug' => $article->slug]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ArticleShow')
            ->where('article.slug', $article->slug)
            ->has('related')
            ->has('popular')
        );

    expect($article->fresh()->views)->toBe(1);
});

test('an unpublished article cannot be opened', function () {
    $article = makeArticle([
        'slug' => 'artikel-draft',
        'is_published' => false,
    ]);

    $this->get(route('article.show', ['slug' => $article->slug]))
        ->assertNotFound();
});

test('the article hub and sidebar receive active categories', function () {
    $this->get(route('article.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ArticleIndex')
            ->has('siteCategories', 3)
            ->where('siteCategories.0.slug', 'entertainment')
        );
});
