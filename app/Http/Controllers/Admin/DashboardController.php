<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        ]);
    }
}
