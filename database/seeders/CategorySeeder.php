<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Seed the article categories shown across the site.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Entertainment',
                'slug' => 'entertainment',
                'description' => 'Berita hiburan, film, musik, dan kultur pop terkini.',
                'image_url' => 'https://picsum.photos/600/400?random=cat-1',
                'sort_order' => 1,
            ],
            [
                'name' => 'History',
                'slug' => 'history',
                'description' => 'Eksplorasi masa lalu, arsip sejarah, dan peristiwa penting.',
                'image_url' => 'https://picsum.photos/600/400?random=cat-2',
                'sort_order' => 2,
            ],
            [
                'name' => 'Lifestyle',
                'slug' => 'lifestyle',
                'description' => 'Gaya hidup, desain, kuliner, dan perjalanan yang menemani hari-harimu.',
                'image_url' => 'https://picsum.photos/600/400?random=cat-3',
                'sort_order' => 3,
            ],
        ];

        foreach ($categories as $category) {
            Category::query()->updateOrCreate(
                ['slug' => $category['slug']],
                $category + ['is_active' => true],
            );
        }
    }
}
