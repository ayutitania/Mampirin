<?php

namespace App\Support;

use Illuminate\Support\Str;

class Slug
{
    /**
     * Build a unique slug for the given model.
     *
     * @param  class-string<\Illuminate\Database\Eloquent\Model>  $model
     */
    public static function unique(string $value, string $model, ?int $ignoreId = null): string
    {
        $base = Str::slug($value) ?: Str::lower(Str::random(8));
        $slug = $base;
        $suffix = 2;

        while ($model::query()
            ->where('slug', $slug)
            ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
            ->exists()) {
            $slug = $base.'-'.$suffix++;
        }

        return $slug;
    }
}
