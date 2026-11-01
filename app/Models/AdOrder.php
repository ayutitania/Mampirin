<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdOrder extends Model
{
    protected $fillable = [
        'order_code',
        'package_type',
        'package_name',
        'package_price',
        'cafe_name',
        'owner_name',
        'whatsapp_number',
        'address',
        'maps_url',
        'social_media',
        'notes',
        'payment_status',
        'payment_method',
        'paid_at',
    ];

    protected $casts = [
        'package_price' => 'integer',
        'paid_at' => 'datetime',
    ];

    public static function packages(): array
    {
        return [
            'starter' => [
                'id' => 'starter',
                'name' => 'Starter UMKM Spotlight',
                'subtitle' => 'Paket 01 — Dasar (Pemula)',
                'price' => 750000,
                'price_label' => 'Rp 750.000',
                'duration' => '/ Konten',
                'description' => 'Beri visibilitas awal yang berkesan. Cocok untuk UMKM yang baru memulai penetrasi di segmen mahasiswa.',
                'badge' => 'Pemula',
                'features' => [
                    '1 Artikel Review Mendalam (SEO Optimized)',
                    'Listing Profil Permanen di Direktori Spot Terverifikasi',
                    '1x Instagram Story Amplification & Tag Lokasi Google Maps',
                ],
            ],
            'viral-buzz' => [
                'id' => 'viral-buzz',
                'name' => 'Viral Buzz Package',
                'subtitle' => 'Paket 02 — Maksimum Liputan',
                'price' => 1850000,
                'price_label' => 'Rp 1.850.000',
                'duration' => '/ Campaign',
                'description' => 'Dorongan visual penuh di lintas sosial media untuk menciptakan antrean riil dan exposure tinggi.',
                'badge' => 'Paling Diminati',
                'features' => [
                    'Artikel Liputan Utama + Featured Banner Beranda 2 Minggu',
                    '1 Video Kurasi Reels & TikTok (On-Site Shoot oleh Videografer)',
                    'Badge Khusus "Mampirin Approved - Best Place to Study / Hangout"',
                    '1x Siaran Broadcast ke WhatsApp Komunitas Mahasiswa (12K+)',
                    'Laporan Analytic Jangkauan & Interaksi Pembaca',
                ],
            ],
            'growth-partner' => [
                'id' => 'growth-partner',
                'name' => 'Growth Partner (Retainer)',
                'subtitle' => 'Paket 03 — Skala Perusahaan',
                'price' => 3500000,
                'price_label' => 'Rp 3.500.000',
                'duration' => '/ Bulan',
                'description' => 'Kemitraan strategis bulanan untuk menjaga brand mental presence UMKM Anda secara berkelanjutan.',
                'badge' => 'Enterprise / Retainer',
                'features' => [
                    'Kampanye Rutin Komunitas Bulanan (Event/Giveaway)',
                    'Pengelolaan Voucher Diskon Mahasiswa Eksklusif',
                    '2x Konten Video Fresh Reels/TikTok Tiap Bulan',
                    'Laporan Bulanan Lengkap (Klik Web, Kunjungan, Profil Pengunjung)',
                    'Dedicated Relationship Manager dari Tim Redaksi',
                ],
            ],
        ];
    }
}
