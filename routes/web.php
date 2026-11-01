<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Admin\SubmissionReviewController;
use App\Http\Middleware\EnsureUserIsStaff;
use App\Http\Controllers\SubmissionController;

// Halaman Utama (Home)
Route::get('/', function () {
    return Inertia::render('Home'); // Sesuai nama file resources/js/Pages/Home.jsx
});

// Halaman Ads / Kemitraan
Route::get('/ads', function () {
    return Inertia::render('Ads'); 
});

// Halaman Detail Artikel
Route::get('/article', function () {
    return Inertia::render('ArticleDetail');
});

// Halaman Write Us
Route::get('/write-us', function () {
    return Inertia::render('WriteUs');
});

// Halaman Kategori Entertainment
Route::get('/entertainment', function () {
    return Inertia::render('Entertainment');
});

// Halaman Berita (dari database)
Route::get('/berita', [ArticleController::class, 'index'])->name('articles.index');

// Penerima kiriman artikel dari form Write Us
Route::post('/write-us', [SubmissionController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('write-us.store');
Route::get('/berita/{article}', [ArticleController::class, 'show'])->name('articles.show');

Route::middleware(['auth', EnsureUserIsStaff::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/submissions', [SubmissionReviewController::class, 'index'])->name('submissions.index');
        Route::get('/submissions/{article}', [SubmissionReviewController::class, 'show'])->name('submissions.show');
        Route::post('/submissions/{article}/approve', [SubmissionReviewController::class, 'approve'])->name('submissions.approve');
        Route::post('/submissions/{article}/reject', [SubmissionReviewController::class, 'reject'])->name('submissions.reject');
    });