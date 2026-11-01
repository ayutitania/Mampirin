<?php

use Inertia\Testing\AssertableInertia as Assert;

$pages = [
    'home' => 'Home',
    'ads' => 'Ads',
    'write-us' => 'WriteUs',
    'about' => 'About',
    'article.index' => 'ArticleIndex',
    'article.entertainment' => 'Entertainment',
    'article.history' => 'History',
    'article.lifestyle' => 'Lifestyle',
];

test('every page renders the expected Inertia component', function (string $route, string $component) {
    $this->get(route($route))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with(
    collect($pages)->map(fn (string $component, string $route) => [$route, $component])->values()
);
