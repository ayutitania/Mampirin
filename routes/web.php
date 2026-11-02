<?php

<<<<<<< HEAD
use App\Http\Controllers\AdOrderController;
=======
use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\AdController as AdminAdController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\SponsorController as AdminSponsorController;
use App\Http\Controllers\Admin\SubmissionController as AdminSubmissionController;
use App\Http\Controllers\AdsController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleSubmissionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PartnershipController;
>>>>>>> 62615dd5e97dcd0940efb1f3344e82374a064630
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman Utama (Home)
Route::get('/', [HomeController::class, 'index'])->name('home');

// Halaman About
Route::get('/about', [AboutController::class, 'index'])->name('about');

<<<<<<< HEAD
// Halaman Ads / Kemitraan (Katalog Paket)
Route::get('/ads', function () {
    return Inertia::render('Ads');
})->name('ads');

// Alur Pemesanan Iklan & Simulasi Pembayaran (Inertia React)
Route::get('/ads/order', [AdOrderController::class, 'create'])->name('ads.order');
Route::post('/ads/order', [AdOrderController::class, 'store'])->name('ads.order.store');
Route::get('/ads/payment/{order}', [AdOrderController::class, 'payment'])->name('ads.payment');
Route::post('/ads/payment/{order}/simulate', [AdOrderController::class, 'simulatePayment'])->name('ads.payment.simulate');

// Alur Pemesanan Iklan (Versi View Blade)
Route::get('/blade/ads/order', [AdOrderController::class, 'createBlade'])->name('blade.ads.order');
Route::post('/blade/ads/order', [AdOrderController::class, 'storeBlade'])->name('blade.ads.order.store');
Route::get('/blade/ads/payment/{order}', [AdOrderController::class, 'paymentBlade'])->name('blade.ads.payment');
Route::post('/blade/ads/payment/{order}/simulate', [AdOrderController::class, 'simulatePaymentBlade'])->name('blade.ads.payment.simulate');
=======
// Halaman Ads / Kemitraan
Route::get('/ads', [AdsController::class, 'index'])->name('ads');

// Halaman Pengajuan Kemitraan
Route::get('/partnership', [PartnershipController::class, 'index'])
    ->name('partnership.index');

// Kirim pengajuan kemitraan
Route::post('/partnership', [PartnershipController::class, 'store'])
    ->name('partnership.store');
>>>>>>> 62615dd5e97dcd0940efb1f3344e82374a064630

// Halaman Write Us
Route::get('/write-us', function () {
    return Inertia::render('WriteUs');
})->name('write-us');

// Kirim artikel dari halaman Write Us
Route::post('/write-us', [ArticleSubmissionController::class, 'store'])
    ->name('write-us.store');

// Halaman Utama Artikel (Hub Kategori)
Route::get('/article', [ArticleController::class, 'index'])->name('article.index');

// Halaman Kategori Spesifik (URL lama tetap didukung)
Route::get('/article/entertainment', [ArticleController::class, 'entertainment'])
    ->name('article.entertainment');

Route::get('/article/history', [ArticleController::class, 'history'])
    ->name('article.history');

Route::get('/article/lifestyle', [ArticleController::class, 'lifestyle'])
    ->name('article.lifestyle');

// Halaman Kategori generik (termasuk kategori baru dari admin)
Route::get('/article/category/{slug}', [ArticleController::class, 'category'])
    ->name('article.category');

// Detail Artikel
Route::get('/article/{slug}', [ArticleController::class, 'show'])
    ->name('article.show');

// Panel Admin
Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AdminAuthController::class, 'showLogin'])
            ->name('login');
        Route::post('/login', [AdminAuthController::class, 'login'])
            ->middleware('throttle:6,1')
            ->name('login.store');
    });

    Route::middleware('auth')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout'])
            ->name('logout');

        Route::get('/', [AdminDashboardController::class, 'index'])
            ->name('dashboard');

        Route::patch('/articles/{article}/toggle', [AdminArticleController::class, 'toggle'])
            ->name('articles.toggle');
        Route::resource('/articles', AdminArticleController::class)
            ->except('show')
            ->names('articles');

        Route::resource('/categories', AdminCategoryController::class)
            ->except('show')
            ->names('categories');

        Route::patch('/submissions/{submission}/approve', [AdminSubmissionController::class, 'approve'])
            ->name('submissions.approve');
        Route::patch('/submissions/{submission}/reject', [AdminSubmissionController::class, 'reject'])
            ->name('submissions.reject');
        Route::get('/submissions', [AdminSubmissionController::class, 'index'])
            ->name('submissions.index');

        Route::patch('/ads/{ad}/toggle', [AdminAdController::class, 'toggle'])
            ->name('ads.toggle');
        Route::resource('/ads', AdminAdController::class)
            ->except('show')
            ->names('ads');

        Route::get('/sponsors', [AdminSponsorController::class, 'index'])
            ->name('sponsors.index');
        Route::patch('/sponsors/{inquiry}/status', [AdminSponsorController::class, 'updateStatus'])
            ->name('sponsors.status');
        Route::delete('/sponsors/{inquiry}', [AdminSponsorController::class, 'destroy'])
            ->name('sponsors.destroy');
    });
});
