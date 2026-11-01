<?php

namespace App\Support;

use App\Models\Article;
use Illuminate\Database\Eloquent\Collection;

class ArticleFeed
{
    /**
     * Get the most read published articles.
     *
     * @return Collection<int, Article>
     */
    public static function popular(int $limit = 3, ?int $excludeId = null): Collection
    {
        return Article::query()
            ->published()
            ->with('category:id,name,slug')
            ->when($excludeId, fn ($query) => $query->whereKeyNot($excludeId))
            ->orderByDesc('views')
            ->take($limit)
            ->get();
    }

    /**
     * Get the latest published articles in a category.
     *
     * @return Collection<int, Article>
     */
    public static function byCategorySlug(string $slug, int $limit = 4): Collection
    {
        return Article::query()
            ->published()
            ->with('category:id,name,slug')
            ->whereHas('category', fn ($query) => $query->where('slug', $slug))
            ->latest('published_at')
            ->take($limit)
            ->get();
    }
}
