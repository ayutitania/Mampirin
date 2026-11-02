<?php

use Database\Seeders\CategorySeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(CategorySeeder::class);
});

$pages = [
    'home' => 'Home',
    'ads' => 'Ads',
    'write-us' => 'WriteUs',
    'about' => 'About',
    'article.index' => 'ArticleIndex',
    'article.entertainment' => 'ArticleCategory',
    'article.history' => 'ArticleCategory',
    'article.lifestyle' => 'ArticleCategory',
];

test('every page renders the expected Inertia component', function (string $route, string $component) {
    $this->get(route($route))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with(
    collect($pages)->map(fn (string $component, string $route) => [$route, $component])->values()
);

test('the generic category route renders the shared category page', function () {
    $this->get(route('article.category', ['slug' => 'entertainment']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ArticleCategory')
            ->where('category.slug', 'entertainment')
        );
});

test('an unknown category returns a 404 response', function () {
    $this->get(route('article.category', ['slug' => 'tidak-ada']))
        ->assertNotFound();
});
