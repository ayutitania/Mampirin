import React from 'react';
import { Link } from '@inertiajs/react';
import BannerAds from '../components/BannerAds';
import Navbar from '../components/Navbar';

const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);

function CtaLink({ href, className, children }) {
    if (/^https?:\/\//i.test(href || '')) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href || '#footer-contact'} className={className}>
            {children}
        </Link>
    );
}

export default function Ads({ packages = [] }) {
    return (
        <div className="mx-auto max-w-6xl px-4 pb-10 font-sans text-gray-900">
            {/* Top Banner / Ads */}
            <BannerAds />

            <Navbar />

            {/* Header */}
            <header className="mb-12 text-center">
                <Link href="/">
                    <h1 className="text-6xl font-black tracking-tighter uppercase">
                        Mampirin Magazine
                    </h1>
                </Link>
                <p className="mt-2 text-xs tracking-[0.3em] text-gray-500 uppercase">
                    Mampir Dulu, Baca Berita
                </p>
            </header>

            {/* Section 1: Hero Kemitraan */}
            <section className="mb-16 grid grid-cols-1 gap-10 border-t-[4px] border-black pt-8 md:grid-cols-2">
                {/* Kiri: Gambar Ilustrasi */}
                <div className="relative border-[3px] border-black p-2">
                    <div className="absolute top-4 left-4 z-10 bg-black px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                        Tahap Dokumentasi Artikel
                    </div>
                    <img
                        src="https://picsum.photos/600/400?random=ads"
                        alt="Suasana Cafe"
                        className="h-full w-full object-cover grayscale"
                    />
                </div>

                {/* Kanan: Teks Copywriting */}
                <div className="flex flex-col justify-center">
                    <div className="mb-4 w-max bg-black px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                        Bukan Sekadar Endorsement Biasa
                    </div>
                    <h2 className="mb-6 text-4xl leading-none font-black tracking-tighter uppercase md:text-5xl">
                        Komunitas Kami Mendatangi Tempat Karena Nilai, Bukan
                        Tren Sesaat.
                    </h2>
                    <p className="mb-8 border-l-[3px] border-gray-300 pl-4 font-serif leading-relaxed text-gray-700">
                        Kami membedah keunggulan spesifik tempat Anda;
                        kestabilan stopkontak, kecepatan koneksi WiFi, racikan
                        signature beans, hingga playlist yang mendukung fokus
                        belajar. Inilah kurasi yang dipercaya mahasiswa.
                    </p>
                    <div className="flex space-x-12">
                        <div>
                            <div className="text-4xl font-black tracking-tighter">
                                94.2%
                            </div>
                            <div className="mt-1 text-[9px] tracking-widest text-gray-500 uppercase">
                                Tingkat Retensi Pembaca Aktif
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-black tracking-tighter">
                                28.5K+
                            </div>
                            <div className="mt-1 text-[9px] tracking-widest text-gray-500 uppercase">
                                Jangkauan Mahasiswa Area Bukit
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Value Proposition */}
            <section className="mb-16 border-t border-gray-300 pt-12">
                <div className="mb-8 flex flex-col items-end justify-between md:flex-row">
                    <div>
                        <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                            Value Proposition
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter uppercase">
                            Mengapa Berpartner Dengan Mampirin?
                        </h3>
                    </div>
                    <p className="text-right font-serif text-sm text-gray-600 md:w-1/3">
                        Pendekatan kuratorial murni tanpa algoritma bayaran
                        pelan. Menghubungkan meja kosong Anda dengan pembeli
                        loyal harian.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Card 1 */}
                    <div className="flex flex-col justify-between border border-gray-400 p-6 transition-shadow hover:shadow-lg">
                        <div>
                            <div className="mb-4 text-5xl font-black tracking-tighter text-gray-300">
                                01
                            </div>
                            <h4 className="mb-3 text-lg font-bold tracking-tight uppercase">
                                Liputan Organik &amp; Kredibel
                            </h4>
                            <p className="mb-8 font-serif text-sm leading-relaxed text-gray-700">
                                Review jujur tanpa gimmick false influencer.
                                Ditulis dengan sudut pandang autentik oleh tim
                                jurnalisme mahasiswa yang paham betul apa yang
                                dicari pelanggan seumuran mereka.
                            </p>
                        </div>
                        <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                            &#9654; Bentuk Format Baca / Tonton
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col justify-between border border-gray-400 p-6 transition-shadow hover:shadow-lg">
                        <div>
                            <div className="mb-4 text-5xl font-black tracking-tighter text-gray-300">
                                02
                            </div>
                            <h4 className="mb-3 text-lg font-bold tracking-tight uppercase">
                                Audience Tepat Sasaran
                            </h4>
                            <p className="mb-8 font-serif text-sm leading-relaxed text-gray-700">
                                Menjangkau langsung jejaring mahasiswa aktif dan
                                eksekutif muda di koridor kampus utama (UNUD
                                Jimbaran, Poltek, Uluwatu, Nusa Dua). Fokus pada
                                daya beli lokal yang stabil &amp; berulang.
                            </p>
                        </div>
                        <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                            &#9654; Hyper Local Targeting Kampus Bukit
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col justify-between border border-gray-400 p-6 transition-shadow hover:shadow-lg">
                        <div>
                            <div className="mb-4 text-5xl font-black tracking-tighter text-gray-300">
                                03
                            </div>
                            <h4 className="mb-3 text-lg font-bold tracking-tight uppercase">
                                Paket Ramah Anggaran UMKM
                            </h4>
                            <p className="mb-8 font-serif text-sm leading-relaxed text-gray-700">
                                Struktur tarif transparan tanpa biaya siluman.
                                Diformulasikan khusus untuk skala kafe mandiri
                                dan UMKM. Dapatkan skala ROI positif agresif
                                melalui model voucher / sales tie-in.
                            </p>
                        </div>
                        <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                            &#9654; ROI Positif Lewat Kode Voucher &amp; Sales
                            Tap
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Pricing Packages (dari database) */}
            <section className="mb-16 border-t border-gray-300 pt-12">
                <div className="mb-12 text-center">
                    <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                        Transparansi Struktur Tarif
                    </div>
                    <h3 className="mb-2 text-4xl font-black tracking-tighter uppercase">
                        Pilihan Paket Kemitraan Resmi
                    </h3>
                    <p className="font-serif text-sm text-gray-600">
                        Pilih intensitas publikasi yang sesuai dengan fase
                        pertumbuhan bisnis Anda saat ini. Tanpa kontrak rumit.
                    </p>
                </div>

                {packages.length === 0 ? (
                    <p className="text-center font-serif text-sm text-gray-500">
                        Belum ada paket kemitraan yang aktif. Silakan cek
                        kembali nanti.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-3">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className={
                                    pkg.is_featured
                                        ? 'relative z-10 scale-105 border-[4px] border-black bg-white p-8 shadow-xl'
                                        : 'border border-gray-400 p-8'
                                }
                            >
                                {pkg.is_featured && (
                                    <div className="absolute top-0 left-1/2 w-max -translate-x-1/2 -translate-y-1/2 transform bg-black px-4 py-1 text-[9px] font-bold tracking-widest text-white uppercase">
                                        &#9733; Paling Diminati Pemilik Kafe
                                    </div>
                                )}

                                <div
                                    className={`mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase ${pkg.is_featured ? 'mt-2' : ''}`}
                                >
                                    {pkg.label}
                                </div>
                                <h4 className="mb-6 text-2xl font-black tracking-tight uppercase">
                                    {pkg.name}
                                </h4>
                                <p className="mb-6 font-serif text-sm text-gray-600">
                                    {pkg.description}
                                </p>

                                <div className="mb-6">
                                    <div className="text-[10px] tracking-widest text-gray-500 uppercase">
                                        Investasi Publikasi
                                    </div>
                                    <div className="text-4xl font-black tracking-tighter">
                                        {formatRupiah(pkg.price)}{' '}
                                        <span className="text-sm font-normal tracking-normal text-gray-500">
                                            {pkg.price_suffix}
                                        </span>
                                    </div>
                                </div>

                                <ul
                                    className={`mb-8 space-y-3 font-serif text-sm ${pkg.is_featured ? 'font-bold text-black' : 'text-gray-700'}`}
                                >
                                    {(pkg.features ?? []).map(
                                        (feature, index) => (
                                            <li
                                                key={index}
                                                className={`flex items-start ${feature.included ? '' : 'text-gray-400'}`}
                                            >
                                                <span className="mr-2">
                                                    {feature.included
                                                        ? pkg.is_featured
                                                            ? '■'
                                                            : '✓'
                                                        : '✕'}
                                                </span>
                                                {feature.text}
                                            </li>
                                        ),
                                    )}
                                </ul>

                                <CtaLink
                                    href={pkg.cta_url}
                                    className={
                                        pkg.is_featured
                                            ? 'block w-full bg-black py-4 text-center text-xs font-bold text-white uppercase transition-colors hover:bg-gray-800'
                                            : 'block w-full border-[2px] border-black py-3 text-center text-xs font-bold text-black uppercase transition-colors hover:bg-black hover:text-white'
                                    }
                                >
                                    {pkg.cta_label}
                                    {pkg.is_featured ? ' \u2192' : ''}
                                </CtaLink>
                            </div>
                        ))}
                    </div>
                )}

                {/* Disclaimer Banner */}
                <div className="mt-12 flex items-center justify-between border border-gray-300 bg-gray-50 p-4 font-serif text-xs text-gray-600">
                    <div className="flex items-center">
                        <span className="mr-3 text-lg font-bold">&#8505;</span>
                        <span>
                            Semua paket sudah termasuk sesi wawancara mendalam
                            dengan Anda (owner/founder) untuk merumuskan story
                            telling yang tepat sesuai visi media.
                        </span>
                    </div>
                    <div className="ml-4 shrink-0 border-l border-gray-400 pl-4 font-bold tracking-widest text-black uppercase">
                        Tanpa Biaya Tersembunyi
                    </div>
                </div>
            </section>

            {/* Footer (Format Sama) */}
            <footer
                id="footer-contact"
                className="mt-12 border-t-[2px] border-gray-300 pt-8 text-center"
            >
                <h2 className="mb-2 text-4xl font-black tracking-tighter uppercase">
                    Mampirin Magazine
                </h2>
                <div className="mt-4 mb-4 flex justify-center space-x-3">
                    <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-500 text-xs text-gray-600 transition hover:border-black hover:text-black">
                        f
                    </div>
                    <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-500 text-xs text-gray-600 transition hover:border-black hover:text-black">
                        X
                    </div>
                    <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-500 text-xs text-gray-600 transition hover:border-black hover:text-black">
                        ig
                    </div>
                </div>
                <p className="mb-1 text-[10px] text-gray-500">
                    &copy; 2026 — All rights reserved.
                </p>
                <p className="mb-4 text-[10px] text-gray-500">
                    Designed by The Fox Magazine WordPress Theme
                </p>

                <div className="flex justify-center space-x-4 text-[10px] font-bold tracking-widest text-gray-800 uppercase">
                    <Link href="/" className="hover:text-gray-500">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-gray-500">
                        About
                    </Link>
                    <Link href="/privacy" className="hover:text-gray-500">
                        Privacy
                    </Link>
                    <Link href="/ads" className="hover:text-gray-500">
                        Advertisement
                    </Link>
                    <a href="#footer-contact" className="hover:text-gray-500">
                        Contact
                    </a>
                </div>
            </footer>
        </div>
    );
}
