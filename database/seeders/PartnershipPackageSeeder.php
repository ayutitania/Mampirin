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
                'price' => 200000,
                'price_suffix' => '/ Konten',
                'features' => [
                    ['text' => '1 Artikel Ulasan Mendalam (Dioptimalkan untuk SEO & Peringkat Kata Kunci)', 'included' => true],
                    ['text' => 'Profil Permanen di Direktori Tempat Terverifikasi', 'included' => true],
                    ['text' => '1x Amplifikasi Instagram Story & Tag Lokasi Google Maps', 'included' => true],
                    ['text' => 'Tanpa video produksi TikTok/Reels', 'included' => false],
                    ['text' => 'Tanpa penempatan Banner Unggulan', 'included' => false],
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
                'price' => 550000,
                'price_suffix' => '/ Campaign',
                'features' => [
                    ['text' => 'Artikel Liputan Utama + Masuk Banner Unggulan Beranda selama 2 Minggu', 'included' => true],
                    ['text' => '1 Video Kurasi Reels & TikTok (Pengambilan Gambar di Lokasi oleh Videografer)', 'included' => true],
                    ['text' => 'Badge Khusus "Mampirin Approved — Tempat Terbaik untuk Belajar / Nongkrong"', 'included' => true],
                    ['text' => '1x Siaran Broadcast ke WhatsApp Komunitas Mahasiswa (12 Ribu+ Anggota)', 'included' => true],
                    ['text' => 'Laporan Analitik Jangkauan & Interaksi Pembaca', 'included' => true],
                    ['text' => 'Kunjungan redaksi untuk ulasan atau wawancara (dilakukan online jika di luar daerah)', 'included' => true],
                    ['text' => 'Add-on ulasan atau wawancara offline maupun online', 'included' => true],
                ],
                'cta_label' => 'Pilih Paket Viral Buzz',
                'cta_url' => '/partnership?package=02',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'code' => '03',
                'label' => 'Paket 03 — Skala Perusahaan',
                'name' => 'Growth Partner (Retainer)',
                'description' => 'Kemitraan strategis bulanan untuk menjaga kehadiran merek kafe Anda di benak audiens secara berkelanjutan.',
                'price' => 850000,
                'price_suffix' => '/ Bulan',
                'features' => [
                    ['text' => 'Kampanye Rutin Komunitas Bulanan (Bisa Jam / Acara / Giveaway)', 'included' => true],
                    ['text' => 'Pengelolaan Voucher Diskon Mahasiswa Eksklusif', 'included' => true],
                    ['text' => '2x Konten Video Baru Reels/TikTok Tiap Bulan', 'included' => true],
                    ['text' => 'Laporan Bulanan Lengkap (Klik Web, Kunjungan, & Profil Pengunjung)', 'included' => true],
                    ['text' => 'Manajer Hubungan Khusus dari Tim Redaksi', 'included' => true],
                    ['text' => 'Kunjungan redaksi untuk ulasan atau wawancara (dilakukan online jika di luar daerah)', 'included' => true],
                    ['text' => 'Add-on ulasan atau wawancara offline maupun online', 'included' => true],
                ],
                'cta_label' => 'Pilih Paket Retainer',
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
