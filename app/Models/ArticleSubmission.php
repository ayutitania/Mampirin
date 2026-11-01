<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 * @property string $writer_name
 * @property string $writer_email
 * @property string|null $writer_phone
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['title', 'body', 'writer_name', 'writer_email', 'writer_phone', 'status'])]
class ArticleSubmission extends Model
{
    //
}
