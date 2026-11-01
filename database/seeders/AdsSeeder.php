<?php

namespace Database\Seeders;

use App\Models\Ad;
use Illuminate\Database\Seeder;

class AdsSeeder extends Seeder
{
    /**
     * Seed the ad slots shown across the site.
     */
    public function run(): void
    {
        $ads = [
            [
                'title' => 'Kopi Senja Jimbaran — Promo Mahasiswa',
                'image_url' => 'https://picsum.photos/1200/300?random=ad-top-1',
                'target_url' => 'https://example.com/kopi-senja-jimbaran',
                'placement' => 'top',
                'sort_order' => 1,
            ],
            [
                'title' => 'Sewa Kostum Mulai Rp 50K',
                'image_url' => 'https://picsum.photos/1200/300?random=ad-top-2',
                'target_url' => 'https://example.com/sewa-kostum',
                'placement' => 'top',
                'sort_order' => 2,
            ],
            [
                'title' => 'Pasang Iklan Anda di Sini',
                'image_url' => 'https://picsum.photos/1200/300?random=ad-top-3',
                'target_url' => 'https://example.com/pasang-iklan',
                'placement' => 'top',
                'sort_order' => 3,
            ],
            [
                'title' => 'Advertisement 300x250',
                'image_url' => 'https://picsum.photos/300/250?random=ad-sidebar',
                'target_url' => 'https://example.com/promo-sidebar',
                'placement' => 'sidebar',
                'sort_order' => 1,
            ],
            [
                'title' => 'Advertisement 300x400',
                'image_url' => 'https://picsum.photos/300/400?random=ad-article',
                'target_url' => 'https://example.com/promo-article',
                'placement' => 'article_sidebar',
                'sort_order' => 1,
            ],
        ];

        foreach ($ads as $ad) {
            Ad::query()->updateOrCreate(
                ['placement' => $ad['placement'], 'title' => $ad['title']],
                $ad + ['is_active' => true],
            );
        }
    }
}
