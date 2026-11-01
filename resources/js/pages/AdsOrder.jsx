import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function AdsOrder({ selectedPackageKey, packages }) {
  const currentPackage = packages[selectedPackageKey] || packages['starter'];

  const { data, setData, post, processing, errors } = useForm({
    cafe_name: '',
    owner_name: '',
    whatsapp_number: '',
    address: '',
    maps_url: '',
    social_media: '',
    package_type: currentPackage.id,
    notes: '',
  });

  const [activePackageKey, setActivePackageKey] = useState(currentPackage.id);

  const handleSelectPackage = (key) => {
    setActivePackageKey(key);
    setData('package_type', key);
  };

  const activePackageData = packages[activePackageKey] || currentPackage;

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/ads/order');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 font-sans text-gray-900 pb-16">

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
      <header className="text-center mb-10">
        <Link href="/">
          <h1 className="text-6xl font-black uppercase tracking-tighter">Mampirin Magazine</h1>
        </Link>
        <p className="text-xs tracking-[0.3em] mt-2 text-gray-500 uppercase">Mampir Dulu, Baca Berita</p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-500 mb-8 border-b border-gray-200 pb-3">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/ads" className="hover:text-black">Kemitraan Iklan</Link>
        <span>/</span>
        <span className="text-black font-bold">Form Pemesanan</span>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto border-t-[4px] border-black pt-8">

        {/* Title Section */}
        <div className="mb-8">
          <span className="bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase inline-block mb-3">
            Form Kemitraan Promosi UMKM & Bisnis
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3">
            Daftarkan UMKM Anda
          </h2>
          <p className="text-sm font-serif text-gray-700 leading-relaxed">
            Isi formulir verifikasi data UMKM di bawah ini. Tim kurasi redaksi Mampirin akan menganalisis brief Anda dan menyiapkan paket publikasi yang disepakati.
          </p>
        </div>

        {/* Package Selection Cards with Visual Cue */}
        <div className="mb-12">
          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2">
            Pilihan Paket Promosi UMKM (Klik untuk beralih paket):
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-3">
            {Object.entries(packages).map(([key, pkg]) => {
              const isSelected = activePackageKey === key;
              return (
                <div
                  key={key}
                  onClick={() => handleSelectPackage(key)}
                  className={`p-6 relative transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[4px] border-black shadow-2xl scale-105 bg-white z-10'
                      : 'border border-gray-300 bg-gray-50 hover:border-black hover:bg-white hover:shadow-md'
                  }`}
                >
                  {/* Floating Top Badge when selected */}
                  {isSelected && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 w-max shadow-sm">
                      ★ Paket Terpilih ({pkg.badge})
                    </div>
                  )}

                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1 mt-1">
                    {pkg.subtitle}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                    {pkg.name}
                  </h3>
                  <div className="mb-3">
                    <span className="text-2xl font-black tracking-tight text-black">
                      {pkg.price_label}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">{pkg.duration}</span>
                  </div>
                  <p className="text-xs font-serif text-gray-600 mb-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  <ul className="text-xs font-serif space-y-2 mb-6">
                    {pkg.features.slice(0, 3).map((feat, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start ${
                          isSelected ? 'text-black font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span className="mr-1.5 font-bold">
                          {isSelected ? '■' : '✓'}
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPackage(key);
                    }}
                    className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      isSelected
                        ? 'bg-black text-white shadow-md'
                        : 'border border-black text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {isSelected ? '✓ Paket Aktif' : 'Pilih Paket Ini'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Hidden / Locked Package Field */}
          <input type="hidden" name="package_type" value={data.package_type} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. Nama UMKM / Bisnis */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                1. Nama UMKM / Bisnis <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={data.cafe_name}
                onChange={(e) => setData('cafe_name', e.target.value)}
                placeholder="Contoh: Titik Kumpul Coffee Roastery"
                className={`w-full border-b ${
                  errors.cafe_name ? 'border-red-500' : 'border-gray-300'
                } py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors`}
              />
              {errors.cafe_name && (
                <p className="text-red-600 text-xs mt-1.5">{errors.cafe_name}</p>
              )}
            </div>

            {/* 2. Nama Pemilik / Penanggung Jawab */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                2. Nama Pemilik / Penanggung Jawab <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={data.owner_name}
                onChange={(e) => setData('owner_name', e.target.value)}
                placeholder="Contoh: Arya Daniswara"
                className={`w-full border-b ${
                  errors.owner_name ? 'border-red-500' : 'border-gray-300'
                } py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors`}
              />
              {errors.owner_name && (
                <p className="text-red-600 text-xs mt-1.5">{errors.owner_name}</p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* 3. Nomor WhatsApp Aktif */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                3. Nomor WhatsApp Aktif <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={data.whatsapp_number}
                onChange={(e) => setData('whatsapp_number', e.target.value)}
                placeholder="Contoh: 081234567890"
                className={`w-full border-b ${
                  errors.whatsapp_number ? 'border-red-500' : 'border-gray-300'
                } py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors`}
              />
              <span className="text-[11px] text-gray-400 block mt-1">
                Akan dihubungi tim redaksi untuk konfirmasi jadwal liputan on-site.
              </span>
              {errors.whatsapp_number && (
                <p className="text-red-600 text-xs mt-1.5">{errors.whatsapp_number}</p>
              )}
            </div>

            {/* 4. Akun Media Sosial */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                4. Akun Instagram / TikTok UMKM (Opsional)
              </label>
              <input
                type="text"
                value={data.social_media}
                onChange={(e) => setData('social_media', e.target.value)}
                placeholder="Contoh: @titikkumpul.coffee (Boleh kosong jika belum ada)"
                className={`w-full border-b ${
                  errors.social_media ? 'border-red-500' : 'border-gray-300'
                } py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors`}
              />
              <span className="text-[11px] text-gray-400 block mt-1">
                Boleh dikosongkan jika UMKM Anda belum memiliki akun media sosial.
              </span>
              {errors.social_media && (
                <p className="text-red-600 text-xs mt-1.5">{errors.social_media}</p>
              )}
            </div>

          </div>

          {/* 5. Alamat Lengkap & Link Google Maps UMKM */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                5. Alamat Lengkap UMKM <span className="text-red-600">*</span>
              </label>
              <textarea
                rows="3"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                placeholder="Contoh: Jl. Kampus UNUD No. 18, Jimbaran, Kec. Kuta Selatan, Kabupaten Badung, Bali 80361"
                className={`w-full border ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                } p-3 focus:outline-none focus:border-black bg-white text-sm transition-colors`}
              ></textarea>
              {errors.address && (
                <p className="text-red-600 text-xs mt-1.5">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                Link Google Maps UMKM (Opsional)
              </label>
              <input
                type="url"
                value={data.maps_url}
                onChange={(e) => setData('maps_url', e.target.value)}
                placeholder="https://maps.app.goo.gl/..."
                className={`w-full border-b ${
                  errors.maps_url ? 'border-red-500' : 'border-gray-300'
                } py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors`}
              />
              {errors.maps_url && (
                <p className="text-red-600 text-xs mt-1.5">{errors.maps_url}</p>
              )}
            </div>
          </div>

          {/* 6. Paket Yang Dipilih (Visual Locked Confirmation) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
              6. Paket Terpilih (Sistem Auto-Lock)
            </label>
            <div className="border border-gray-300 bg-gray-100 p-3 flex justify-between items-center text-sm">
              <div className="font-bold uppercase tracking-wide">
                {activePackageData.name} ({activePackageData.subtitle})
              </div>
              <div className="bg-black text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                Terkonfirmasi: {activePackageData.price_label}
              </div>
            </div>
          </div>

          {/* 7. Catatan / Brief Khusus Promosi */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
              7. Catatan / Brief Khusus Promosi
            </label>
            <textarea
              rows="4"
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
              placeholder="Ceritakan keunggulan tempat Anda, misalnya: Signature menu kopi gula aren, colokan tiap meja, view sunset, promo diskon khusus mahasiswa 15%, dll."
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black bg-white text-sm"
            ></textarea>
            <span className="text-[11px] text-gray-400 block mt-1 font-serif">
              Tim penulis kami akan menggunakan catatan ini sebagai bahan penyusunan draft liputan.
            </span>
          </div>

          {/* Verification Box */}
          <div className="border border-gray-200 bg-gray-50 p-4 text-xs font-serif text-gray-600 space-y-2">
            <div className="flex items-center text-black font-bold uppercase tracking-wider text-[11px]">
              <span className="mr-2 text-base">&#9888;</span> Ketentuan Alur Pemesanan
            </div>
            <p>
              Setelah formulir ini dikirimkan, Anda akan diarahkan ke halaman simulasi pembayaran. Pesanan Anda akan tercatat dengan status <strong>Pending</strong> hingga pembayaran terverifikasi.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/ads"
              className="text-xs uppercase font-bold tracking-widest text-gray-600 hover:text-black"
            >
              &larr; Kembali ke Pilihan Paket
            </Link>

            <button
              type="submit"
              disabled={processing}
              className={`w-full sm:w-auto bg-black text-white px-10 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition ${
                processing ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {processing ? 'Menyimpan Pesanan...' : 'Lanjutkan ke Pembayaran \u2192'}
            </button>
          </div>

        </form>

      </div>

      {/* Footer */}
      <footer id="footer-contact" className="pt-8 text-center mt-16 border-t-[2px] border-gray-300">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Mampirin Magazine</h2>
        <div className="flex justify-center space-x-3 mb-4 mt-4">
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">f</div>
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">X</div>
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">ig</div>
        </div>
        <p className="text-[10px] text-gray-500 mb-1">&copy; 2026 — All rights reserved.</p>
        <p className="text-[10px] text-gray-500 mb-4">Desain dan Pengujian Berpusat pada Pengguna</p>
      </footer>

    </div>
  );
}
