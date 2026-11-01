<?php

namespace App\Http\Middleware;

use App\Models\Ad;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'siteCategories' => fn () => Category::query()
                ->active()
                ->withCount(['articles as articles_count' => fn ($query) => $query->published()])
                ->orderBy('sort_order')
                ->get(['id', 'name', 'slug', 'description', 'image_url'])
                ->map(fn (Category $category) => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                    'image_url' => $category->image_url,
                    'articles_count' => (int) $category->getAttribute('articles_count'),
                ])
                ->all(),
            'ads' => fn () => Ad::query()
                ->active()
                ->orderBy('sort_order')
                ->get(['id', 'title', 'image_url', 'target_url', 'placement'])
                ->groupBy('placement')
                ->map(fn ($items) => $items->values()->all())
                ->all(),
        ];
    }
}
