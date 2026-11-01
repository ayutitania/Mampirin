<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $code
 * @property string $label
 * @property string $name
 * @property string $description
 * @property int $price
 * @property string $price_suffix
 * @property array<int, array{text: string, included: bool}> $features
 * @property string $cta_label
 * @property string|null $cta_url
 * @property bool $is_featured
 * @property bool $is_active
 * @property int $sort_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'code',
    'label',
    'name',
    'description',
    'price',
    'price_suffix',
    'features',
    'cta_label',
    'cta_url',
    'is_featured',
    'is_active',
    'sort_order',
])]
class PartnershipPackage extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'price' => 'integer',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
