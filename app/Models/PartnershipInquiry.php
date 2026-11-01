<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $partnership_package_id
 * @property string $company
 * @property string $contact_name
 * @property string $email
 * @property string|null $phone
 * @property string $message
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
    'status',
])]
class PartnershipInquiry extends Model
{
    /**
     * @return BelongsTo<PartnershipPackage, $this>
     */
    public function package(): BelongsTo
    {
        return $this->belongsTo(PartnershipPackage::class);
    }
}
