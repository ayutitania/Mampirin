<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $partnership_package_id
 * @property string $company
 * @property string $contact_name
 * @property string $email
 * @property string|null $phone
 * @property string $message
 * @property string $ad_title
 * @property string|null $ad_target_url
 * @property string|null $ad_image_url
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'partnership_package_id',
    'company',
    'contact_name',
    'email',
    'phone',
    'message',
    'ad_title',
    'ad_target_url',
    'ad_image_url',
    'status',
])]
class PartnershipInquiry extends Model
{
    /**
     * Inquiry statuses and their Indonesian labels.
     *
     * @var array<string, string>
     */
    public const STATUSES = [
        'pending' => 'Menunggu',
        'contacted' => 'Dihubungi',
        'approved' => 'Disetujui',
        'rejected' => 'Ditolak',
    ];

    /**
     * @return BelongsTo<PartnershipPackage, $this>
     */
    public function package(): BelongsTo
    {
        return $this->belongsTo(
            PartnershipPackage::class,
            'partnership_package_id',
        );
    }

    /**
     * Get the ad created when this inquiry was approved.
     *
     * @return HasOne<Ad, $this>
     */
    public function ad(): HasOne
    {
        return $this->hasOne(Ad::class);
    }
}
