<?php

use App\Models\ArticleSubmission;

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
