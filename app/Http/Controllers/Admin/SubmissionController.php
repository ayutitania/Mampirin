<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ArticleSubmission;
use Inertia\Inertia;
use Inertia\Response;

class SubmissionController extends Controller
{
    /**
     * Show articles submitted by readers.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Submissions/Index', [
            'submissions' => ArticleSubmission::query()
                ->latest()
                ->paginate(15),
        ]);
    }
}
