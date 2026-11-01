<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Support\Slug;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Show the article management table.
     */
    public function index(Request $request): Response
    {
        $search = trim((string) $request->input('search'));
        $category = $request->integer('category');
        $status = (string) $request->input('status');

        $articles = Article::query()
            ->with('category:id,name,slug')
            ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->when($category > 0, fn ($query) => $query->where('category_id', $category))
            ->when($status === 'published', fn ($query) => $query->where('is_published', true))
            ->when($status === 'draft', fn ($query) => $query->where('is_published', false))
            ->latest('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'categories' => $this->categories(),
            'filters' => [
                'search' => $search,
                'category' => $category ?: '',
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the create article form.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Articles/Form', [
            'article' => null,
            'categories' => $this->categories(),
        ]);
    }

    /**
     * Store a new article.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        Article::query()->create($this->payload($validated, $request));

        return redirect()->route('admin.articles.index')
            ->with('success', 'Artikel berhasil dibuat.');
    }

    /**
     * Show the edit article form.
     */
    public function edit(Article $article): Response
    {
        return Inertia::render('Admin/Articles/Form', [
            'article' => $article->only([
                'id',
                'category_id',
                'title',
                'slug',
                'excerpt',
                'body',
                'image_url',
                'author',
                'is_featured',
                'is_published',
                'published_at',
            ]),
            'categories' => $this->categories(),
        ]);
    }

    /**
     * Update an existing article.
     */
    public function update(Request $request, Article $article): RedirectResponse
    {
        $validated = $request->validate($this->rules($article));

        $article->update($this->payload($validated, $request, $article));

        return redirect()->route('admin.articles.index')
            ->with('success', 'Artikel berhasil diperbarui.');
    }

    /**
     * Toggle the published state of an article.
     */
    public function toggle(Article $article): RedirectResponse
    {
        $article->update(['is_published' => ! $article->is_published]);

        return back()->with(
            'success',
            $article->is_published
                ? 'Artikel berhasil dipublikasikan.'
                : 'Artikel diubah menjadi draft.',
        );
    }

    /**
     * Delete an article.
     */
    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        return redirect()->route('admin.articles.index')
            ->with('success', 'Artikel berhasil dihapus.');
    }

    /**
     * Validation rules for creating or updating an article.
     *
     * @return array<string, array<int, mixed>>
     */
    private function rules(?Article $article = null): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('articles', 'slug')->ignore($article),
            ],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'excerpt' => ['required', 'string', 'max:600'],
            'body' => ['required', 'string', 'min:50'],
            'image_url' => ['nullable', 'string', 'max:2048'],
            'author' => ['required', 'string', 'max:255'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
        ];
    }

    /**
     * Build the attributes persisted to the database.
     *
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function payload(array $validated, Request $request, ?Article $article = null): array
    {
        return [
            ...$validated,
            'slug' => Slug::unique(
                (string) ($validated['slug'] ?: $validated['title']),
                Article::class,
                $article?->id,
            ),
            'is_featured' => $request->boolean('is_featured'),
            'is_published' => $request->boolean('is_published'),
            'published_at' => $validated['published_at'] ?? null,
        ];
    }

    /**
     * Get the category options for the form and filters.
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, Category>
     */
    private function categories()
    {
        return Category::query()
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug']);
    }
}
