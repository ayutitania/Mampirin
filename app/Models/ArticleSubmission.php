<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 * @property string $writer_name
 * @property string $writer_email
 * @property string|null $writer_phone
 * @property string|null $image_path
 * @property int|null $article_id
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'title',
    'body',
    'writer_name',
    'writer_email',
    'writer_phone',
    'image_path',
    'article_id',
    'status',
])]
class ArticleSubmission extends Model
{
    /**
     * Submission statuses and their Indonesian labels.
     *
     * @var array<string, string>
     */
    public const STATUSES = [
        'pending' => 'Menunggu',
        'approved' => 'Disetujui',
        'rejected' => 'Ditolak',
    ];

    /**
     * @return BelongsTo<Article, $this>
     */
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
