<?php

namespace App\Http\Controllers;

use App\Models\ArticleSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ArticleSubmissionController extends Controller
{
    /**
     * Store an article submission sent from the "Write Us" page.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'min:50'],
            'writer_name' => ['required', 'string', 'max:255'],
            'writer_email' => ['required', 'string', 'email', 'max:255'],
            'writer_phone' => ['nullable', 'string', 'max:30'],
        ]);

        ArticleSubmission::create($validated);

        return back()->with(
            'success',
            'Terima kasih! Tulisanmu sudah kami terima dan akan ditinjau oleh tim redaksi.',
        );
    }
}
