<?php

use App\Models\Ad;
use App\Models\Article;
use App\Models\Category;
use Database\Seeders\AdsSeeder;
use Database\Seeders\CategorySeeder;
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
            ->has('ads.home_inline', 3)
            ->where('ads.top.0.target_url', 'https://example.com/kopi-senja-jimbaran')
        );
});

test('article pages receive both sidebar ad slots', function () {
    $this->seed([CategorySeeder::class, AdsSeeder::class]);

    $category = Category::query()->firstOrFail();

    $article = Article::query()->create([
        'category_id' => $category->id,
        'title' => 'Artikel dengan Iklan Samping',
        'slug' => 'artikel-dengan-iklan-samping',
        'excerpt' => 'Ringkasan artikel untuk pengujian iklan sidebar.',
        'body' => str_repeat('Isi artikel yang cukup panjang. ', 10),
        'image_url' => 'https://example.com/gambar.jpg',
        'author' => 'Tim Mampirin',
        'is_featured' => false,
        'is_published' => true,
        'published_at' => now()->subDay(),
    ]);

    $this->get(route('article.show', ['slug' => $article->slug]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('ads.article_sidebar', 1)
            ->has('ads.article_inline', 1)
            ->where('ads.article_sidebar.0.placement', 'article_sidebar')
        );

    $this->get(route('article.category', ['slug' => $category->slug]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('ads.article_sidebar', 1)
            ->has('ads.article_inline', 1)
        );
});

test('inactive ads are not shared', function () {
    $this->seed(AdsSeeder::class);

    Ad::query()->where('placement', 'top')->update(['is_active' => false]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->missing('ads.top'));
});
