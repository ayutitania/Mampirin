<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubmissionReviewController extends Controller
{
    // Daftar kiriman, bisa difilter: ?status=pending|published|rejected
    public function index(Request $request): Response
    {
        $status = in_array($request->query('status'), ['pending', 'published', 'rejected'], true)
            ? $request->query('status')
            : 'pending';

        $submissions = Article::where('status', $status)
            ->with('category:id,name')
            ->latest()
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Article $article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'category' => $article->category?->name,
                'submitter_name' => $article->submitter_name,
                'submitter_email' => $article->submitter_email,
                'status' => $article->status,
                'created_at' => $article->created_at?->toIso8601String(),
            ]);

        return Inertia::render('admin/submissions/index', [
            'submissions' => $submissions,
            'status' => $status,
            'counts' => [
                'pending' => Article::where('status', 'pending')->count(),
                'published' => Article::where('status', 'published')->count(),
                'rejected' => Article::where('status', 'rejected')->count(),
            ],
        ]);
    }

    // Detail satu kiriman, termasuk data kontak pengirim (khusus admin)
    public function show(Article $article): Response
    {
        $article->load(['category:id,name', 'reviewer:id,name']);

        return Inertia::render('admin/submissions/show', [
            'submission' => [
                'id' => $article->id,
                'slug' => $article->slug,
                'title' => $article->title,
                'excerpt' => $article->excerpt,
                'content' => $article->content,
                'category' => $article->category?->name,
                'status' => $article->status,
                'submitter' => [
                    'name' => $article->submitter_name,
                    'email' => $article->submitter_email,
                    'phone' => $article->submitter_phone,
                    'address' => $article->submitter_address,
                ],
                'reviewed_by' => $article->reviewer?->name,
                'reviewed_at' => $article->reviewed_at?->toIso8601String(),
                'rejection_note' => $article->rejection_note,
                'created_at' => $article->created_at?->toIso8601String(),
            ],
        ]);
    }

    // Setujui: artikel langsung terbit
    public function approve(Request $request, Article $article): RedirectResponse
    {
        $article->update([
            'status' => 'published',
            'published_at' => now(),
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
            'rejection_note' => null,
        ]);

        return redirect()
            ->route('admin.submissions.index')
            ->with('success', 'Artikel disetujui dan sudah terbit.');
    }

    // Tolak: wajib menyertakan alasan
    public function reject(Request $request, Article $article): RedirectResponse
    {
        $data = $request->validate([
            'rejection_note' => ['required', 'string', 'max:1000'],
        ], [
            'rejection_note.required' => 'Alasan penolakan wajib diisi.',
        ]);

        $article->update([
            'status' => 'rejected',
            'published_at' => null,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
            'rejection_note' => $data['rejection_note'],
        ]);

        return redirect()
            ->route('admin.submissions.index')
            ->with('success', 'Artikel ditolak.');
    }
}
