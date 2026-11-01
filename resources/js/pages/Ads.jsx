import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Ads() {
  const [selectedPackage, setSelectedPackage] = useState('viral-buzz');
  return (
    <div className="max-w-6xl mx-auto px-4 font-sans text-gray-900 pb-10">

      {/* Top Banner / Ads Placeholder */}
      <div className="flex justify-center space-x-2 py-2 text-xs text-gray-400 border-b border-gray-200">
        <span>[Banner Ads]</span>
        <span>[Banner Ads]</span>
        <span>[Banner Ads]</span>
      </div>

      {/* Navbar Global */}
      <nav className="flex justify-center space-x-6 py-4 border-b border-gray-300 mb-6 text-sm font-bold uppercase tracking-widest relative z-20">
        <Link href="/" className="hover:text-gray-500">Home</Link>
        <Link href="/about" className="hover:text-gray-500">About</Link>

        {/* Dropdown Article */}
        <div className="relative group cursor-pointer">
          <Link href="/article" className="hover:text-gray-500 flex items-center">
            Article
          </Link>
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 shadow-xl hidden group-hover:block z-30">
            <Link href="/article/entertainment" className="block px-4 py-3 hover:bg-gray-200 border-b border-gray-200 text-xs">Entertainment</Link>
            <Link href="/article/history" className="block px-4 py-3 hover:bg-gray-200 border-b border-gray-200 text-xs">History</Link>
            <Link href="/article/lifestyle" className="block px-4 py-3 hover:bg-gray-200 text-xs">Lifestyle</Link>
          </div>
        </div>

        <Link href="/write-us" className="hover:text-gray-500">Write Us</Link>
        <Link href="/ads" className="hover:text-black text-black">Ads</Link>
        <a href="#footer-contact" className="hover:text-gray-500">Contact</a>
      </nav>

      {/* Header */}
      <header className="text-center mb-12">
        <Link href="/">
          <h1 className="text-6xl font-black uppercase tracking-tighter">Mampirin Magazine</h1>
        </Link>
        <p className="text-xs tracking-[0.3em] mt-2 text-gray-500 uppercase">Mampir Dulu, Baca Berita</p>
      </header>

      {/* Section 1: Hero Kemitraan */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t-[4px] border-black pt-8 mb-16">
        {/* Kiri: Gambar Ilustrasi */}
        <div className="relative border-[3px] border-black p-2">
          <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-2 py-1 tracking-widest uppercase z-10">
            Tahap Dokumentasi Artikel
          </div>
          <img
            src="https://picsum.photos/600/400?random=ads"
            alt="Suasana Cafe"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Kanan: Teks Copywriting */}
        <div className="flex flex-col justify-center">
          <div className="bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase w-max mb-4">
            Bukan Sekadar Endorsement Biasa
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
            Komunitas Kami Mendatangi Tempat Karena Nilai, Bukan Tren Sesaat.
          </h2>
          <p className="text-gray-700 font-serif leading-relaxed mb-8 border-l-[3px] border-gray-300 pl-4">
            Kami membedah keunggulan spesifik tempat Anda; kestabilan stopkontak, kecepatan koneksi WiFi, racikan signature beans, hingga playlist yang mendukung fokus belajar. Inilah kurasi yang dipercaya mahasiswa.
          </p>
          <div className="flex space-x-12">
            <div>
              <div className="text-4xl font-black tracking-tighter">94.2%</div>
              <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Tingkat Retensi Pembaca Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-black tracking-tighter">28.5K+</div>
              <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Jangkauan Mahasiswa Area Bukit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Value Proposition */}
      <section className="mb-16 border-t border-gray-300 pt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Value Proposition</div>
            <h3 className="text-3xl font-black uppercase tracking-tighter">Mengapa Berpartner Dengan Mampirin?</h3>
          </div>
          <p className="text-sm font-serif text-gray-600 md:w-1/3 text-right">
            Pendekatan kuratorial murni tanpa algoritma bayaran pelan. Menghubungkan meja kosong Anda dengan pembeli loyal harian.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border border-gray-400 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="text-5xl font-black text-gray-300 mb-4 tracking-tighter">01</div>
              <h4 className="font-bold text-lg uppercase tracking-tight mb-3">Liputan Organik & Kredibel</h4>
              <p className="text-sm text-gray-700 font-serif leading-relaxed mb-8">
                Review jujur tanpa gimmick false influencer. Ditulis dengan sudut pandang autentik oleh tim jurnalisme mahasiswa yang paham betul apa yang dicari pelanggan seumuran mereka.
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              &#9654; Bentuk Format Baca / Tonton
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-400 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="text-5xl font-black text-gray-300 mb-4 tracking-tighter">02</div>
              <h4 className="font-bold text-lg uppercase tracking-tight mb-3">Audience Tepat Sasaran</h4>
              <p className="text-sm text-gray-700 font-serif leading-relaxed mb-8">
                Menjangkau langsung jejaring mahasiswa aktif dan eksekutif muda di koridor kampus utama (UNUD Jimbaran, Poltek, Uluwatu, Nusa Dua). Fokus pada daya beli lokal yang stabil & berulang.
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              &#9654; Hyper Local Targeting Kampus Bukit
            </div>
          </div>

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

      {/* Section 3: Pricing Packages */}
      <section className="mb-16 border-t border-gray-300 pt-12">
        <div className="text-center mb-12">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Transparansi Struktur Tarif</div>
          <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Pilihan Paket Kemitraan Resmi</h3>
          <p className="text-sm font-serif text-gray-600">
            Pilih intensitas publikasi yang sesuai dengan fase pertumbuhan bisnis Anda saat ini. Tanpa kontrak rumit.
          </p>
        </div>

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

        {/* Disclaimer Banner */}
        <div className="mt-12 border border-gray-300 bg-gray-50 p-4 flex justify-between items-center text-xs text-gray-600 font-serif">
          <div className="flex items-center">
            <span className="text-lg font-bold mr-3">&#8505;</span>
            <span>Semua paket sudah termasuk sesi wawancara mendalam dengan Anda (owner/founder) untuk merumuskan story telling yang tepat sesuai visi media.</span>
          </div>
          <div className="font-bold uppercase tracking-widest border-l border-gray-400 pl-4 ml-4 shrink-0 text-black">
            Tanpa Biaya Tersembunyi
          </div>
        </div>
      </section>

      {/* Footer (Format Sama) */}
      <footer id="footer-contact" className="pt-8 text-center mt-12 border-t-[2px] border-gray-300">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Mampirin Magazine</h2>
        <div className="flex justify-center space-x-3 mb-4 mt-4">
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600 hover:text-black hover:border-black cursor-pointer transition">f</div>
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600 hover:text-black hover:border-black cursor-pointer transition">X</div>
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600 hover:text-black hover:border-black cursor-pointer transition">ig</div>
        </div>
        <p className="text-[10px] text-gray-500 mb-1">&copy; 2026 — All rights reserved.</p>
        <p className="text-[10px] text-gray-500 mb-4">Designed by The Fox Magazine WordPress Theme</p>

        <div className="flex justify-center space-x-4 text-[10px] font-bold text-gray-800 uppercase tracking-widest">
          <Link href="/" className="hover:text-gray-500">Home</Link>
          <Link href="/about" className="hover:text-gray-500">About</Link>
          <Link href="/privacy" className="hover:text-gray-500">Privacy</Link>
          <Link href="/ads" className="hover:text-gray-500">Advertisement</Link>
          <a href="#footer-contact" className="hover:text-gray-500">Contact</a>
        </div>
      </footer>

    </div>
  );
}
