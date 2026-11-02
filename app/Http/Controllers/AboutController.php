<?php

namespace App\Http\Controllers;

use App\Support\ArticleFeed;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Show the about page.
     */
    public function index(): Response
    {
        return Inertia::render('About', [
            'popular' => ArticleFeed::popular(2),
        ]);
    }
}
