<?php

use App\Http\Controllers\AdOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman Utama (Home)
Route::get('/', function () {
    return Inertia::render('Home'); // Sesuai nama file resources/js/Pages/Home.jsx
});

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

// Halaman Write Us
Route::get('/write-us', function () {
    return Inertia::render('WriteUs');
});

// Halaman About
Route::get('/about', function () {
    return Inertia::render('About');
});

// Halaman Utama Artikel (Hub Kategori)
Route::get('/article', function () {
    return Inertia::render('ArticleIndex');
});

// Halaman Kategori Spesifik
Route::get('/article/entertainment', function () {
    return Inertia::render('Entertainment');
});

// Halaman Kategori Spesifik
Route::get('/article/history', function () {
    return Inertia::render('History');
});

// Halaman Kategori Spesifik
Route::get('/article/lifestyle', function () {
    return Inertia::render('Lifestyle');
});
