<?php

use App\Models\Article;
use App\Models\ArticleSubmission;
use App\Models\Category;
use App\Models\User;
use Database\Seeders\CategorySeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(CategorySeeder::class);
    $this->admin = User::factory()->create();
});

function pendingSubmission(array $overrides = []): ArticleSubmission
{
    return ArticleSubmission::query()->create([
        'title' => 'Cerita dari Kota Tua',
        'body' => str_repeat('Isi kiriman pembaca yang layak terbit. ', 4),
        'writer_name' => 'Budi Santoso',
        'writer_email' => 'budi@example.com',
        'writer_phone' => '081234567890',
        'status' => 'pending',
        ...$overrides,
    ]);
}

test('the submission index can be filtered by status', function () {
    pendingSubmission();
    pendingSubmission([
        'title' => 'Kiriman Ditolak',
        'status' => 'rejected',
    ]);

    $this->actingAs($this->admin)
        ->get(route('admin.submissions.index', ['status' => 'pending']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Submissions/Index')
            ->has('submissions.data', 1)
            ->where('submissions.data.0.title', 'Cerita dari Kota Tua')
            ->has('categories', 3)
            ->has('statuses', 3)
            ->where('counts.pending', 1)
            ->where('counts.rejected', 1)
        );
});

test('approving a submission creates a published article', function () {
    $submission = pendingSubmission([
        'body' => 'Paragraf pertama kiriman pembaca yang menjadi excerpt.'."\n\n"
            .str_repeat('Isi paragraf kedua yang tidak dipakai untuk ringkasan. ', 3),
        'image_path' => 'submissions/foto-pendukung.jpg',
    ]);
    $category = Category::query()->where('slug', 'lifestyle')->firstOrFail();

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => $category->id,
            'is_published' => true,
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    $submission->refresh();
    $article = $submission->article;

    expect($article)->not->toBeNull()
        ->and($article->title)->toBe('Cerita dari Kota Tua')
        ->and($article->slug)->toBe('cerita-dari-kota-tua')
        ->and($article->category_id)->toBe($category->id)
        ->and($article->author)->toBe('Budi Santoso')
        ->and($article->image_url)->toBe('/storage/submissions/foto-pendukung.jpg')
        ->and($article->is_published)->toBeTrue()
        ->and($article->is_featured)->toBeFalse()
        ->and($article->excerpt)->toBe('Paragraf pertama kiriman pembaca yang menjadi excerpt.')
        ->and($submission->article_id)->toBe($article->id)
        ->and($submission->status)->toBe('approved');
});

test('a submission can be approved as a draft article', function () {
    $submission = pendingSubmission();

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => Category::query()->value('id'),
            'is_published' => false,
        ])
        ->assertSessionHas('success');

    $article = $submission->fresh()->article;

    expect($article->is_published)->toBeFalse()
        ->and($article->published_at)->toBeNull();
});

test('an approved submission immediately appears on the public site', function () {
    $submission = pendingSubmission([
        'title' => 'Cerita Baru yang Langsung Terbit',
        'body' => 'Paragraf pertama yang akan tampil sebagai ringkasan. '.str_repeat('Isi lengkap cerita pembaca. ', 4),
    ]);
    $category = Category::query()->where('slug', 'lifestyle')->firstOrFail();

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => $category->id,
            'is_published' => true,
        ])
        ->assertSessionHas('success');

    $slug = $submission->fresh()->article->slug;

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('latest.0.slug', $slug)
            ->where('siteCategories.2.slug', 'lifestyle')
            ->where('siteCategories.2.articles_count', 1)
        );

    $this->get(route('article.category', ['slug' => 'lifestyle']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ArticleCategory')
            ->where('articles.0.slug', $slug)
        );

    $this->get(route('article.show', ['slug' => $slug]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ArticleShow')
            ->where('article.slug', $slug)
            ->where('article.category.slug', 'lifestyle')
        );
});

test('a submission cannot be approved twice', function () {
    $submission = pendingSubmission();
    $categoryId = Category::query()->value('id');

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => $categoryId,
            'is_published' => true,
        ]);

    $articleId = $submission->fresh()->article_id;

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => $categoryId,
            'is_published' => true,
        ])
        ->assertRedirect()
        ->assertSessionHas('error');

    expect(Article::count())->toBe(1)
        ->and($submission->fresh()->article_id)->toBe($articleId);
});

test('approving a submission requires a valid category', function () {
    $submission = pendingSubmission();

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => 999,
            'is_published' => true,
        ])
        ->assertSessionHasErrors('category_id');

    expect(Article::count())->toBe(0)
        ->and($submission->fresh()->status)->toBe('pending');
});

test('an admin can reject a submission', function () {
    $submission = pendingSubmission();

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.reject', $submission))
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($submission->fresh()->status)->toBe('rejected')
        ->and(Article::count())->toBe(0);
});

test('an approved submission cannot be rejected', function () {
    $submission = pendingSubmission();
    $categoryId = Category::query()->value('id');

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => $categoryId,
            'is_published' => true,
        ]);

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.reject', $submission))
        ->assertRedirect()
        ->assertSessionHas('error');

    expect($submission->fresh()->status)->toBe('approved');
});

test('an admin upload of a cover image wins over the reader photo', function () {
    Storage::fake('public');

    $submission = pendingSubmission([
        'image_path' => 'submissions/foto-pembaca.jpg',
    ]);
    $category = Category::query()->where('slug', 'history')->firstOrFail();

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => $category->id,
            'is_published' => true,
            'article_image' => UploadedFile::fake()->create('sampul-admin.jpg', 200, 'image/jpeg'),
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    $article = $submission->fresh()->article;

    expect($article)->not->toBeNull()
        ->and($article->image_url)->toStartWith('/storage/articles/')
        ->and($article->is_published)->toBeTrue();

    $path = substr($article->image_url, strlen('/storage/'));
    Storage::disk('public')->assertExists($path);
});

test('an approved submission can be marked as featured', function () {
    $submission = pendingSubmission();
    $category = Category::query()->value('id');

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => $category,
            'is_published' => true,
            'is_featured' => true,
        ])
        ->assertSessionHas('success');

    expect($submission->fresh()->article->is_featured)->toBeTrue();
});

test('a non-image upload is rejected on approval', function () {
    Storage::fake('public');

    $submission = pendingSubmission();
    $category = Category::query()->value('id');

    $this->actingAs($this->admin)
        ->patch(route('admin.submissions.approve', $submission), [
            'category_id' => $category,
            'is_published' => true,
            'article_image' => UploadedFile::fake()->create('dokumen.pdf', 20, 'application/pdf'),
        ])
        ->assertSessionHasErrors('article_image');

    expect($submission->fresh()->article_id)->toBeNull()
        ->and($submission->fresh()->status)->toBe('pending');
});
