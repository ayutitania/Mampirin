<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property string|null $image_url
 * @property string|null $target_url
 * @property string $placement
 * @property bool $is_active
 * @property Carbon|null $starts_at
 * @property Carbon|null $ends_at
 * @property int $sort_order
 * @property int|null $partnership_inquiry_id
 */
#[Fillable(['title', 'image_url', 'target_url', 'placement', 'is_active', 'starts_at', 'ends_at', 'sort_order', 'partnership_inquiry_id'])]
class Ad extends Model
{
    /**
     * Available ad placements and their Indonesian labels.
     *
     * @var array<string, string>
     */
    public const PLACEMENTS = [
        'top' => 'Banner Atas',
        'sidebar' => 'Sidebar',
        'article_sidebar' => 'Sidebar Artikel',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'sort_order' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<PartnershipInquiry, $this>
     */
    public function partnershipInquiry(): BelongsTo
    {
        return $this->belongsTo(PartnershipInquiry::class);
    }

    /**
     * Limit the query to ads that are currently allowed to be shown.
     *
     * @param  Builder<Ad>  $query
     */
    public function scopeActive(Builder $query): void
    {
        $query
            ->where('is_active', true)
            ->where(fn (Builder $query) => $query
                ->whereNull('starts_at')
                ->orWhere('starts_at', '<=', now()))
            ->where(fn (Builder $query) => $query
                ->whereNull('ends_at')
                ->orWhere('ends_at', '>=', now()));
    }
}
