<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Support\ArticleFeed;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Show the category hub.
     */
    public function index(): Response
    {
        return Inertia::render('ArticleIndex');
    }

    /**
     * Show the entertainment category.
     */
    public function entertainment(): Response
    {
        return $this->category('entertainment');
    }

    /**
     * Show the history category.
     */
    public function history(): Response
    {
        return $this->category('history');
    }

    /**
     * Show the lifestyle category.
     */
    public function lifestyle(): Response
    {
        return $this->category('lifestyle');
    }

    /**
     * Show a category and its published articles.
     */
    public function category(string $slug): Response
    {
        $category = Category::query()
            ->active()
            ->where('slug', $slug)
            ->firstOrFail();

        $base = Article::query()
            ->published()
            ->with('category:id,name,slug')
            ->where('category_id', $category->id);

        $featured = (clone $base)
            ->featured()
            ->latest('published_at')
            ->take(2)
            ->get();

        $articles = (clone $base)
            ->when($featured->isNotEmpty(), fn ($query) => $query->whereKeyNot($featured->modelKeys()))
            ->latest('published_at')
            ->take(8)
            ->get();

        return Inertia::render('ArticleCategory', [
            'category' => $category,
            'featured' => $featured,
            'articles' => $articles,
            'popular' => ArticleFeed::popular(3),
        ]);
    }

    /**
     * Show a single article.
     */
    public function show(string $slug): Response
    {
        $article = Article::query()
            ->published()
            ->with('category:id,name,slug')
            ->where('slug', $slug)
            ->firstOrFail();

        $article->increment('views');

        $related = Article::query()
            ->published()
            ->with('category:id,name,slug')
            ->where('category_id', $article->category_id)
            ->whereKeyNot($article->id)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('ArticleShow', [
            'article' => $article,
            'related' => $related,
            'popular' => ArticleFeed::popular(3, $article->id),
        ]);
    }
}
