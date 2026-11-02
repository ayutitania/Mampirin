<?php

use App\Models\ArticleSubmission;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('an article submission can be stored', function () {
    $response = $this
        ->from(route('write-us'))
        ->post(route('write-us.store'), [
            'title' => 'Cerita dari Kota Tua',
            'body' => str_repeat('Isi artikel yang cukup panjang untuk lolos validasi. ', 3),
            'writer_name' => 'Budi Santoso',
            'writer_email' => 'budi@example.com',
            'writer_phone' => '081234567890',
        ]);

    $response
        ->assertRedirect(route('write-us'))
        ->assertSessionHas('success');

    $this->assertDatabaseHas('article_submissions', [
        'title' => 'Cerita dari Kota Tua',
        'writer_email' => 'budi@example.com',
        'status' => 'pending',
    ]);

    expect(ArticleSubmission::count())->toBe(1);
});

test('the writer phone number is optional', function () {
    $this->post(route('write-us.store'), [
        'title' => 'Tanpa Nomor Telepon',
        'body' => str_repeat('Isi artikel yang cukup panjang untuk lolos validasi. ', 3),
        'writer_name' => 'Siti Aminah',
        'writer_email' => 'siti@example.com',
        'writer_phone' => '',
    ])->assertSessionHasNoErrors();

    expect(ArticleSubmission::first()->writer_phone)->toBeNull();
});

test('a supporting photo is stored on the public disk', function () {
    Storage::fake('public');

    $photo = UploadedFile::fake()->create('foto-pendukung.jpg', 200, 'image/jpeg');

    $this->post(route('write-us.store'), [
        'title' => 'Cerita dengan Foto',
        'body' => str_repeat('Isi artikel yang cukup panjang untuk lolos validasi. ', 3),
        'writer_name' => 'Budi Santoso',
        'writer_email' => 'budi@example.com',
        'photo' => $photo,
    ])->assertSessionHasNoErrors();

    $submission = ArticleSubmission::query()->firstOrFail();

    expect($submission->image_path)->not->toBeNull()
        ->and($submission->image_path)->toStartWith('submissions/');

    Storage::disk('public')->assertExists($submission->image_path);
});

test('the supporting photo must be a valid image', function () {
    Storage::fake('public');

    $this->post(route('write-us.store'), [
        'title' => 'Cerita dengan Berkas Salah',
        'body' => str_repeat('Isi artikel yang cukup panjang untuk lolos validasi. ', 3),
        'writer_name' => 'Budi Santoso',
        'writer_email' => 'budi@example.com',
        'photo' => UploadedFile::fake()->create('dokumen.pdf', 20, 'application/pdf'),
    ])->assertSessionHasErrors('photo');

    expect(ArticleSubmission::count())->toBe(0);
});

test('the admin submissions page lists reader submissions', function () {
    Storage::fake('public');

    ArticleSubmission::query()->create([
        'title' => 'Kiriman Pembaca',
        'body' => str_repeat('Isi kiriman pembaca. ', 5),
        'writer_name' => 'Siti Aminah',
        'writer_email' => 'siti@example.com',
        'status' => 'pending',
    ]);

    $this->actingAs(User::factory()->create())
        ->get(route('admin.submissions.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Submissions/Index')
            ->has('submissions.data', 1)
            ->where('submissions.data.0.title', 'Kiriman Pembaca')
        );
});

test('required fields are validated', function (array $payload, string $invalidField) {
    $this->post(route('write-us.store'), $payload)
        ->assertSessionHasErrors($invalidField);

    expect(ArticleSubmission::count())->toBe(0);
})->with([
    'title is required' => [['title' => '', 'body' => str_repeat('konten ', 20), 'writer_name' => 'A', 'writer_email' => 'a@example.com'], 'title'],
    'body is required' => [['title' => 'Judul', 'body' => '', 'writer_name' => 'A', 'writer_email' => 'a@example.com'], 'body'],
    'writer name is required' => [['title' => 'Judul', 'body' => str_repeat('konten ', 20), 'writer_name' => '', 'writer_email' => 'a@example.com'], 'writer_name'],
    'email must be valid' => [['title' => 'Judul', 'body' => str_repeat('konten ', 20), 'writer_name' => 'A', 'writer_email' => 'bukan-email'], 'writer_email'],
]);
