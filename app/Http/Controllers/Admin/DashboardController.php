<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use App\Models\Article;
use App\Models\ArticleSubmission;
use App\Models\Category;
use App\Models\PartnershipInquiry;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'articles' => Article::query()->count(),
                'published' => Article::query()->published()->count(),
                'categories' => Category::query()->count(),
                'ads' => Ad::query()->count(),
                'active_ads' => Ad::query()->active()->count(),
                'submissions' => ArticleSubmission::query()
                    ->where('status', 'pending')
                    ->count(),
                'inquiries' => PartnershipInquiry::query()
                    ->where('status', 'pending')
                    ->count(),
            ],
            'recentArticles' => Article::query()
                ->with('category:id,name,slug')
                ->latest('created_at')
                ->take(5)
                ->get(['id', 'category_id', 'title', 'slug', 'is_published', 'published_at', 'created_at']),
            'featuredArticles' => Article::query()
                ->published()
                ->where('is_featured', true)
                ->with('category:id,name,slug')
                ->latest('published_at')
                ->take(5)
                ->get(['id', 'category_id', 'title', 'slug', 'views', 'published_at']),
            'popularArticles' => Article::query()
                ->published()
                ->with('category:id,name,slug')
                ->orderByDesc('views')
                ->take(5)
                ->get(['id', 'category_id', 'title', 'slug', 'views', 'published_at']),
            'featuredPopularArticles' => Article::query()
                ->published()
                ->where('is_featured', true)
                ->with('category:id,name,slug')
                ->orderByDesc('views')
                ->take(5)
                ->get(['id', 'category_id', 'title', 'slug', 'views', 'published_at']),
            'pendingSubmissions' => ArticleSubmission::query()
                ->where('status', 'pending')
                ->latest()
                ->take(3)
                ->get(['id', 'title', 'writer_name', 'created_at']),
            'categories' => Category::query()
                ->orderBy('sort_order')
                ->get(['id', 'name', 'slug']),
            'pendingInquiries' => PartnershipInquiry::query()
                ->with('package:id,name')
                ->where('status', 'pending')
                ->latest()
                ->take(3)
                ->get(['id', 'partnership_package_id', 'company', 'contact_name', 'created_at']),
        ]);
    }
}
