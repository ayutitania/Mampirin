<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\Umkm;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Akun admin awal. GANTI password ini setelah login pertama.
        $admin = User::unguarded(fn () => User::updateOrCreate(
            ['email' => 'admin@mampirin.test'],
            [
                'name' => 'Admin Mampirin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
            ]
        ));

        // Kategori
        $kategori = [
            'Kuliner' => 'kuliner',
            'Fesyen' => 'fesyen',
            'Kerajinan' => 'kerajinan',
            'Tips Usaha' => 'tips-usaha',
            'Event & Bazar' => 'event-bazar',
        ];

        foreach ($kategori as $nama => $slug) {
            Category::updateOrCreate(['slug' => $slug], ['name' => $nama]);
        }

        $kuliner = Category::where('slug', 'kuliner')->first();

        // UMKM contoh
        $umkm = Umkm::updateOrCreate(
            ['slug' => 'warung-contoh'],
            [
                'name' => 'Warung Contoh',
                'owner_name' => 'Ibu Contoh',
                'description' => 'Data contoh untuk pengujian.',
                'city' => 'Denpasar',
                'category_id' => $kuliner->id,
            ]
        );

        // Artikel contoh yang sudah terbit
        Article::updateOrCreate(
            ['slug' => 'warung-contoh-bertahan-di-era-digital'],
            [
                'title' => 'Warung Contoh Bertahan di Era Digital',
                'excerpt' => 'Cerita contoh tentang UMKM kuliner yang mulai berjualan online.',
                'content' => 'Ini adalah isi artikel contoh. Hapus atau ganti setelah data asli tersedia.',
                'user_id' => $admin->id,
                'category_id' => $kuliner->id,
                'umkm_id' => $umkm->id,
                'status' => 'published',
                'is_featured' => true,
                'published_at' => now(),
                'reviewed_by' => $admin->id,
                'reviewed_at' => now(),
            ]
        );

        // Kiriman pengunjung contoh yang masih menunggu persetujuan
        Article::updateOrCreate(
            ['slug' => 'kiriman-contoh-menunggu-persetujuan'],
            [
                'title' => 'Kiriman Contoh Menunggu Persetujuan',
                'excerpt' => 'Contoh kiriman dari form Write Us.',
                'content' => 'Isi kiriman contoh dari pengunjung.',
                'submitter_name' => 'Budi Contoh',
                'submitter_email' => 'budi@example.com',
                'category_id' => $kuliner->id,
                'status' => 'pending',
            ]
        );
    }
}