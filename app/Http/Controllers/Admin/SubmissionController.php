<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleSubmission;
use App\Models\Category;
use App\Support\Slug;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubmissionController extends Controller
{
    /**
     * Show articles submitted by readers.
     */
    public function index(Request $request): Response
    {
        $status = (string) $request->input('status');

        $submissions = ArticleSubmission::query()
            ->with('article:id,slug,title')
            ->when($status !== '', fn ($query) => $query->where('status', $status))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Submissions/Index', [
            'submissions' => $submissions,
            'categories' => Category::query()
                ->orderBy('sort_order')
                ->get(['id', 'name', 'slug']),
            'statuses' => $this->statuses(),
            'counts' => ArticleSubmission::query()
                ->selectRaw('status, count(*) as total')
                ->groupBy('status')
                ->pluck('total', 'status'),
            'filters' => [
                'status' => $status,
            ],
        ]);
    }

    /**
     * Approve a submission and turn it into an article.
     */
    public function approve(Request $request, ArticleSubmission $submission): RedirectResponse
    {
        if ($submission->article_id) {
            return back()->with(
                'error',
                'Kiriman ini sudah disetujui dan sudah menjadi artikel.',
            );
        }

        $validated = $request->validate([
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'is_published' => ['boolean'],
            'is_featured' => ['boolean'],
            'article_image' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        $article = Article::query()->create([
            'category_id' => $validated['category_id'],
            'title' => $submission->title,
            'slug' => Slug::unique($submission->title, Article::class),
            'excerpt' => $this->excerptFromFirstParagraph($submission->body),
            'body' => $submission->body,
            'image_url' => $this->resolveArticleImage($request, $submission),
            'author' => $submission->writer_name,
            'is_featured' => $request->boolean('is_featured'),
            'is_published' => $request->boolean('is_published'),
            'published_at' => now(),
        ]);

        $submission->update([
            'status' => 'approved',
            'article_id' => $article->id,
        ]);

        return back()->with(
            'success',
            $request->boolean('is_published')
                ? 'Kiriman disetujui dan artikel sudah terbit di situs.'
                : 'Kiriman disetujui dan disimpan sebagai draft artikel.',
        );
    }

    /**
     * Build the excerpt from the first paragraph of the submission body.
     *
     * Paragraphs are separated by newlines; the excerpt is the first
     * non-empty paragraph (whitespace flattened) capped at 600 characters
     * so it fits the `articles.excerpt` column.
     */
    private function excerptFromFirstParagraph(string $body): string
    {
        $paragraph = collect(
            array_filter(array_map('trim', preg_split('/\R+/', $body) ?: [])),
        )->first();

        $excerpt = trim((string) preg_replace('/\s+/', ' ', (string) $paragraph));

        return mb_substr($excerpt, 0, 600);
    }

    /**
     * Choose the article cover image.
     *
     * An image the admin uploads wins; otherwise the reader's supporting
     * photo is used; otherwise the article has no cover.
     */
    private function resolveArticleImage(Request $request, ArticleSubmission $submission): ?string
    {
        if ($request->hasFile('article_image')) {
            return '/storage/'.$request->file('article_image')->store('articles', 'public');
        }

        return $submission->image_path
            ? '/storage/'.$submission->image_path
            : null;
    }

    /**
     * Reject a submission.
     */
    public function reject(ArticleSubmission $submission): RedirectResponse
    {
        if ($submission->article_id) {
            return back()->with(
                'error',
                'Kiriman ini sudah menjadi artikel dan tidak bisa ditolak.',
            );
        }

        $submission->update(['status' => 'rejected']);

        return back()->with('success', 'Kiriman pembaca ditolak.');
    }

    /**
     * Get the status options for filters and badges.
     *
     * @return array<int, array{value: string, label: string}>
     */
    private function statuses(): array
    {
        return collect(ArticleSubmission::STATUSES)
            ->map(fn (string $label, string $value) => [
                'value' => $value,
                'label' => $label,
            ])
            ->values()
            ->all();
    }
}
