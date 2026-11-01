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
