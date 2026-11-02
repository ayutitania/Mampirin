import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../components/AppLayout';

<<<<<<< HEAD
export default function Ads() {
  const [selectedPackage, setSelectedPackage] = useState('viral-buzz');
  return (
    <div className="max-w-6xl mx-auto px-4 font-sans text-gray-900 pb-10">
=======
const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);
>>>>>>> 62615dd5e97dcd0940efb1f3344e82374a064630

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
        <AppLayout
            title="Advertisement & Kemitraan"
            description="Peluang kemitraan dan paket publikasi Mampirin Magazine untuk bisnis, kafe, dan UMKM di sekitar kampus."
        >
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

<<<<<<< HEAD
          {/* Card 3 */}
          <div className="border border-gray-400 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="text-5xl font-black text-gray-300 mb-4 tracking-tighter">03</div>
              <h4 className="font-bold text-lg uppercase tracking-tight mb-3">Paket Ramah Anggaran UMKM</h4>
              <p className="text-sm text-gray-700 font-serif leading-relaxed mb-8">
                Struktur tarif transparan tanpa biaya siluman. Diformulasikan khusus untuk skala bisnis mandiri dan UMKM. Dapatkan skala ROI positif agresif melalui model voucher / sales tie-in.
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              &#9654; ROI Positif Lewat Kode Voucher & Sales Tap
            </div>
          </div>
        </div>
      </section>
=======
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
>>>>>>> 62615dd5e97dcd0940efb1f3344e82374a064630

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

<<<<<<< HEAD
        {/* Visual Cue Hint */}
        <p className="text-center text-xs text-gray-500 font-serif mb-6">
          *Klik kartu paket untuk melihat visualisasi paket terpilih atau langsung klik tombol konfirmasi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {[
            {
              id: 'starter',
              subtitle: 'Paket 01 — Dasar (Pemula)',
              name: 'Starter UMKM Spotlight',
              description: 'Beri visibilitas awal yang berkesan. Cocok untuk UMKM yang baru memulai penetrasi di segmen mahasiswa.',
              price: 'Rp 750.000',
              duration: '/ Konten',
              badge: '★ Rekomendasi Pemula',
              features: [
                { text: '1 Artikel Review Mendalam (SEO Optimized & High Keyword Ranking)', included: true },
                { text: 'Listing Profil Permanen di Direktori Spot Terverifikasi', included: true },
                { text: '1x Instagram Story Amplification & Tag Lokasi Google Maps', included: true },
                { text: 'Tidak termasuk video produksi TikTok/Reels', included: false },
                { text: 'Tanpa penempatan Featured Banner', included: false },
              ],
              buttonText: 'Pilih Paket Starter →',
            },
            {
              id: 'viral-buzz',
              subtitle: 'Paket 02 — Maksimum Liputan',
              name: 'Viral Buzz Package',
              description: 'Dorongan visual penuh di lintas sosial media untuk menciptakan antrean riil dan exposure tinggi.',
              price: 'Rp 1.850.000',
              duration: '/ Campaign',
              badge: '★ Paling Diminati Pemilik UMKM',
              features: [
                { text: 'Artikel Liputan Utama + Masuk Featured Banner Beranda 2 Minggu', included: true },
                { text: '1 Video Kurasi Reels & TikTok (On-Site Shoot oleh Videografer)', included: true },
                { text: 'Badge Khusus "Mampirin Approved - Best Place to Study / Hangout"', included: true },
                { text: '1x Siaran Broadcast ke WhatsApp Komunitas Mahasiswa (12K+ Anggota)', included: true },
                { text: 'Laporan Analytic Jangkauan & Interaksi Pembaca', included: true },
              ],
              buttonText: 'Klaim Paket Viral Buzz →',
            },
            {
              id: 'growth-partner',
              subtitle: 'Paket 03 — Skala Perusahaan',
              name: 'Growth Partner (Retainer)',
              description: 'Kemitraan strategis bulanan untuk menjaga brand mental presence UMKM Anda di benak audiens secara berkelanjutan.',
              price: 'Rp 3.500.000',
              duration: '/ Bulan',
              badge: '★ Skala Bisnis (Retainer)',
              features: [
                { text: 'Kampanye Rutin Komunitas Bulanan (Bisa Jam / Acara / Giveaway)', included: true },
                { text: 'Pengelolaan Voucher Diskon Mahasiswa Eksklusif', included: true },
                { text: '2x Konten Video Fresh Reels/TikTok Tiap Bulan', included: true },
                { text: 'Laporan Bulanan Lengkap (Klik Web, Kunjungan, & Profil Pengunjung)', included: true },
                { text: 'Dedicated Relationship Manager dari Tim Redaksi', included: true },
              ],
              buttonText: 'Pilih Paket Retainer →',
            },
          ].map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`p-8 relative transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[4px] border-black shadow-2xl scale-105 bg-white z-10'
                    : 'border border-gray-400 bg-white hover:border-black hover:shadow-md'
                }`}
              >
                {/* Floating Top Badge when selected */}
                {isSelected && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1 w-max shadow-sm">
                    {pkg.badge}
                  </div>
                )}

                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 mt-2">
                  {pkg.subtitle}
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-6">
                  {pkg.name}
                </h4>
                <p className="text-sm text-gray-600 font-serif mb-6">
                  {pkg.description}
                </p>
                <div className="mb-6">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Investasi Publikasi
                  </div>
                  <div className="text-4xl font-black tracking-tighter">
                    {pkg.price}{' '}
                    <span className="text-sm font-normal text-gray-500 tracking-normal">
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                <ul
                  className={`text-sm font-serif space-y-3 mb-8 ${
                    isSelected ? 'text-black font-bold' : 'text-gray-700'
                  }`}
                >
                  {pkg.features.map((item, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start ${
                        item.included ? '' : 'text-gray-400 font-normal'
                      }`}
                    >
                      <span className="mr-2">
                        {item.included ? (isSelected ? '■' : '✓') : '✕'}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/ads/order?package=${pkg.id}`}
                  className={`block text-center w-full font-bold uppercase text-xs transition-colors ${
                    isSelected
                      ? 'bg-black text-white py-4 hover:bg-gray-800 shadow-md'
                      : 'border-[2px] border-black text-black py-3 hover:bg-black hover:text-white'
                  }`}
                >
                  {pkg.buttonText}
                </Link>
              </div>
            );
          })}
        </div>

      </section>
=======
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
>>>>>>> 62615dd5e97dcd0940efb1f3344e82374a064630

        </AppLayout>
    );
}
