<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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