<?php

namespace Database\Seeders;

use App\Models\PartnershipPackage;
use Illuminate\Database\Seeder;

class PartnershipPackageSeeder extends Seeder
{
    /**
     * Seed the partnership packages shown on the ads page.
     */
    public function run(): void
    {
        $packages = [
            [
                'code' => '01',
                'label' => 'Paket 01 — Dasar (Pemula)',
                'name' => 'Starter UMKM Spotlight',
                'description' => 'Beri visibilitas awal yang berkesan. Cocok untuk kafe yang baru memulai penetrasi di segmen mahasiswa.',
                'price' => 750000,
                'price_suffix' => '/ Konten',
                'features' => [
                    ['text' => '1 Artikel Review Mendalam (SEO Optimized & High Keyword Ranking)', 'included' => true],
                    ['text' => 'Listing Profil Permanen di Direktori Spot Terverifikasi', 'included' => true],
                    ['text' => '1x Instagram Story Amplification & Tag Lokasi Google Maps', 'included' => true],
                    ['text' => 'Tidak termasuk video produksi TikTok/Reels', 'included' => false],
                    ['text' => 'Tanpa penempatan Featured Banner', 'included' => false],
                ],
                'cta_label' => 'Pilih Paket Starter',
                'cta_url' => '/partnership?package=01',
                'is_featured' => false,
                'sort_order' => 1,
            ],
            [
                'code' => '02',
                'label' => 'Paket 02 — Maksimum Liputan',
                'name' => 'Viral Buzz Package',
                'description' => 'Dorongan visual penuh di lintas sosial media untuk menciptakan antrean riil dan exposure tinggi.',
                'price' => 1850000,
                'price_suffix' => '/ Campaign',
                'features' => [
                    ['text' => 'Artikel Liputan Utama + Masuk Featured Banner Beranda 2 Minggu', 'included' => true],
                    ['text' => '1 Video Kurasi Reels & TikTok (On-Site Shoot oleh Videografer)', 'included' => true],
                    ['text' => 'Badge Khusus "Mampirin Approved — Best Place to Study / Hangout"', 'included' => true],
                    ['text' => '1x Siaran Broadcast ke WhatsApp Komunitas Mahasiswa (12K+ Anggota)', 'included' => true],
                    ['text' => 'Laporan Analytic Jangkauan & Interaksi Pembaca', 'included' => true],
                ],
                'cta_label' => 'Klaim Paket Viral Buzz',
                'cta_url' => '/partnership?package=02',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'code' => '03',
                'label' => 'Paket 03 — Skala Perusahaan',
                'name' => 'Growth Partner (Retainer)',
                'description' => 'Kemitraan strategis bulanan untuk menjaga brand mental presence kafe Anda di benak audiens secara berkelanjutan.',
                'price' => 3500000,
                'price_suffix' => '/ Bulan',
                'features' => [
                    ['text' => 'Kampanye Rutin Komunitas Bulanan (Bisa Jam / Acara / Giveaway)', 'included' => true],
                    ['text' => 'Pengelolaan Voucher Diskon Mahasiswa Eksklusif', 'included' => true],
                    ['text' => '2x Konten Video Fresh Reels/TikTok Tiap Bulan', 'included' => true],
                    ['text' => 'Laporan Bulanan Lengkap (Klik Web, Kunjungan, & Profil Pengunjung)', 'included' => true],
                    ['text' => 'Dedicated Relationship Manager dari Tim Redaksi', 'included' => true],
                ],
                'cta_label' => 'Konsultasikan Retainer',
                'cta_url' => '/partnership?package=03',
                'is_featured' => false,
                'sort_order' => 3,
            ],
        ];

        foreach ($packages as $package) {
            PartnershipPackage::query()->updateOrCreate(
                ['code' => $package['code']],
                $package + ['is_active' => true],
            );
        }
    }
}
