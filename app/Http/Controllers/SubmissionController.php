<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubmissionRequest;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class SubmissionController extends Controller
{
    public function store(StoreSubmissionRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $thumbnail = $request->hasFile('thumbnail')
            ? $request->file('thumbnail')->store('articles', 'public')
            : null;

        $title = strip_tags($data['title']);
        $content = strip_tags($data['content']);

        // status SENGAJA ditulis di sini, bukan dari input pengunjung,
        // sehingga kiriman selalu masuk sebagai pending
        Article::create([
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::lower(Str::random(6)),
            'excerpt' => $data['excerpt'] ?? Str::limit($content, 200),
            'content' => $content,
            'thumbnail' => $thumbnail,
            'category_id' => $data['category_id'],
            'submitter_name' => strip_tags($data['name']),
            'submitter_email' => $data['email'],
            'submitter_phone' => $data['phone'] ?? null,
            'submitter_address' => $data['address'] ?? null,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Terima kasih! Artikel Anda sudah dikirim dan akan ditinjau admin.');
    }
}
