<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Support\ArticleFeed;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the magazine home page.
     */
    public function index(): Response
    {
        $published = Article::query()->published()->with('category:id,name,slug');

        $featuredQuery = Article::query()->published()->featured()->with('category:id,name,slug');
        $featuredCount = (clone $featuredQuery)->count();
        $featured = $featuredCount > 5
            ? (clone $featuredQuery)->inRandomOrder()->take(5)->get()
            : (clone $featuredQuery)->latest('published_at')->take(5)->get();

        $hero = $featured->first()
            ?? (clone $published)->latest('published_at')->first();

        return Inertia::render('Home', [
            'hero' => $hero,
            'featured' => $featured,
            'entertainment' => ArticleFeed::byCategorySlug('entertainment'),
            'history' => ArticleFeed::byCategorySlug('history'),
            'lifestyle' => ArticleFeed::byCategorySlug('lifestyle'),
            'latest' => (clone $published)->latest('published_at')->take(5)->get(),
            'popular' => ArticleFeed::popular(2),
        ]);
    }
}
