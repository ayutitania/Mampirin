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

        $hero = (clone $published)
            ->featured()
            ->latest('published_at')
            ->first()
            ?? (clone $published)->latest('published_at')->first();

        return Inertia::render('Home', [
            'hero' => $hero,
            'entertainment' => ArticleFeed::byCategorySlug('entertainment'),
            'history' => ArticleFeed::byCategorySlug('history'),
            'latest' => (clone $published)->latest('published_at')->take(5)->get(),
            'popular' => ArticleFeed::popular(2),
        ]);
    }
}
