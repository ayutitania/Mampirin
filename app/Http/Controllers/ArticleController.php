<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    // Daftar berita (hanya yang sudah disetujui admin)
    public function index(): Response
    {
        $articles = Article::published()
            ->with('category:id,name,slug')
            ->latest('published_at')
            ->paginate(9)
            ->through(fn (Article $article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'category' => $article->category?->name,
                'published_at' => $article->published_at?->toIso8601String(),
            ]);

        return Inertia::render('berita/index', [
            'articles' => $articles,
        ]);
    }

    // Detail satu berita
    public function show(Article $article): Response
    {
        // Artikel yang belum disetujui tidak boleh bisa dibuka lewat URL
        abort_unless(
            $article->status === 'published'
                && $article->published_at !== null
                && $article->published_at->isPast(),
            404
        );

        $article->load(['category:id,name', 'umkm:id,name,city']);

        // Data pengirim (email, telepon) sengaja TIDAK dikirim ke halaman publik
        return Inertia::render('berita/show', [
            'article' => [
                'title' => $article->title,
                'content' => $article->content,
                'category' => $article->category?->name,
                'umkm' => $article->umkm
                    ? ['name' => $article->umkm->name, 'city' => $article->umkm->city]
                    : null,
                'author' => $article->submitter_name ?? $article->author?->name,
                'published_at' => $article->published_at?->toIso8601String(),
            ],
        ]);
    }
}
