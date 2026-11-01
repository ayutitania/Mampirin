import React from 'react';
import { Link } from '@inertiajs/react';

export default function Ads() {
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
                Struktur tarif transparan tanpa biaya siluman. Diformulasikan khusus untuk skala kafe mandiri dan UMKM. Dapatkan skala ROI positif agresif melalui model voucher / sales tie-in.
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

          {/* Package 1 */}
          <div className="border border-gray-400 p-8">
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Paket 01 — Dasar (Pemula)</div>
            <h4 className="text-2xl font-black uppercase tracking-tight mb-6">Starter UMKM Spotlight</h4>
            <p className="text-sm text-gray-600 font-serif mb-6">Beri visibilitas awal yang berkesan. Cocok untuk kafe yang baru memulai penetrasi di segmen mahasiswa.</p>
            <div className="mb-6">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Investasi Publikasi</div>
              <div className="text-4xl font-black tracking-tighter">Rp 750.000 <span className="text-sm font-normal text-gray-500 tracking-normal">/ Konten</span></div>
            </div>
            <ul className="text-sm font-serif text-gray-700 space-y-3 mb-8">
              <li className="flex items-start"><span className="mr-2">&#10003;</span> 1 Artikel Review Mendalam (SEO Optimized & High Keyword Ranking)</li>
              <li className="flex items-start"><span className="mr-2">&#10003;</span> Listing Profil Permanen di Direktori Spot Terverifikasi</li>
              <li className="flex items-start"><span className="mr-2">&#10003;</span> 1x Instagram Story Amplification & Tag Lokasi Google Maps</li>
              <li className="flex items-start text-gray-400"><span className="mr-2">&#10005;</span> Tidak termasuk video produksi TikTok/Reels</li>
              <li className="flex items-start text-gray-400"><span className="mr-2">&#10005;</span> Tanpa penempatan Featured Banner</li>
            </ul>
            <button className="w-full border-[2px] border-black text-black font-bold uppercase text-xs py-3 hover:bg-black hover:text-white transition-colors">
              Pilih Paket Starter
            </button>
          </div>

          {/* Package 2 (Highlighted) */}
          <div className="border-[4px] border-black p-8 relative shadow-xl scale-105 bg-white z-10">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1 w-max">
              &#9733; Paling Diminati Pemilik Kafe
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 mt-2">Paket 02 — Maksimum Liputan</div>
            <h4 className="text-2xl font-black uppercase tracking-tight mb-6">Viral Buzz Package</h4>
            <p className="text-sm text-gray-600 font-serif mb-6">Dorongan visual penuh di lintas sosial media untuk menciptakan antrean riil dan exposure tinggi.</p>
            <div className="mb-6">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Investasi Publikasi</div>
              <div className="text-4xl font-black tracking-tighter">Rp 1.850.000 <span className="text-sm font-normal text-gray-500 tracking-normal">/ Campaign</span></div>
            </div>
            <ul className="text-sm font-serif text-black font-bold space-y-3 mb-8">
              <li className="flex items-start"><span className="mr-2">&#9632;</span> Artikel Liputan Utama + Masuk Featured Banner Beranda 2 Minggu</li>
              <li className="flex items-start"><span className="mr-2">&#9632;</span> 1 Video Kurasi Reels & TikTok (On-Site Shoot oleh Videografer)</li>
              <li className="flex items-start"><span className="mr-2">&#9632;</span> Badge Khusus "Mampirin Approved - Best Place to Study / Hangout"</li>
              <li className="flex items-start"><span className="mr-2">&#9632;</span> 1x Siaran Broadcast ke WhatsApp Komunitas Mahasiswa (12K+ Anggota)</li>
              <li className="flex items-start"><span className="mr-2">&#9632;</span> Laporan Analytic Jangkauan & Interaksi Pembaca</li>
            </ul>
            <button className="w-full bg-black text-white font-bold uppercase text-xs py-4 hover:bg-gray-800 transition-colors">
              Klaim Paket Viral Buzz &rarr;
            </button>
          </div>

          {/* Package 3 */}
          <div className="border border-gray-400 p-8">
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Paket 03 — Skala Perusahaan</div>
            <h4 className="text-2xl font-black uppercase tracking-tight mb-6">Growth Partner (Retainer)</h4>
            <p className="text-sm text-gray-600 font-serif mb-6">Kemitraan strategis bulanan untuk menjaga brand mental presence kafe Anda di benak audiens secara berkelanjutan.</p>
            <div className="mb-6">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Investasi Publikasi</div>
              <div className="text-4xl font-black tracking-tighter">Rp 3.500.000 <span className="text-sm font-normal text-gray-500 tracking-normal">/ Bulan</span></div>
            </div>
            <ul className="text-sm font-serif text-gray-700 space-y-3 mb-8">
              <li className="flex items-start"><span className="mr-2">&#10003;</span> Kampanye Rutin Komunitas Bulanan (Bisa Jam / Acara / Giveaway)</li>
              <li className="flex items-start"><span className="mr-2">&#10003;</span> Pengelolaan Voucher Diskon Mahasiswa Eksklusif</li>
              <li className="flex items-start"><span className="mr-2">&#10003;</span> 2x Konten Video Fresh Reels/TikTok Tiap Bulan</li>
              <li className="flex items-start"><span className="mr-2">&#10003;</span> Laporan Bulanan Lengkap (Klik Web, Kunjungan, & Profil Pengunjung)</li>
              <li className="flex items-start"><span className="mr-2">&#10003;</span> Dedicated Relationship Manager dari Tim Redaksi</li>
            </ul>
            <button className="w-full border-[2px] border-black text-black font-bold uppercase text-xs py-3 hover:bg-black hover:text-white transition-colors">
              Konsultasikan Retainer
            </button>
          </div>

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
