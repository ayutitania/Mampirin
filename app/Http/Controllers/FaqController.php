<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Show the FAQ page (syarat & FAQ pengiriman tulisan / kemitraan).
     */
    public function index(): Response
    {
        return Inertia::render('Faq');
    }
}
