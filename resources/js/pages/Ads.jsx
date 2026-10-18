import React from 'react';
import { Link } from '@inertiajs/react';

export default function Ads() {
  return (
    <div className="max-w-6xl mx-auto px-4 font-sans text-gray-900 pb-10">
      
      {/* Navbar Global */}
      <nav className="flex justify-center space-x-6 py-4 border-b border-gray-300 mb-6 text-sm font-bold uppercase tracking-widest">
        <Link href="/" className="hover:text-gray-500">Home</Link>
        <Link href="/article" className="hover:text-gray-500">Article</Link>
        <Link href="/entertainment" className="hover:text-gray-500">Entertainment</Link>
        <Link href="/write-us" className="hover:text-gray-500">Write Us</Link>
        <Link href="/ads" className="hover:text-gray-500">Ads</Link>
      </nav>

      <header className="py-4 text-center mb-8 border-b-2 border-black">
        <Link href="/">
          <h1 className="text-5xl font-extrabold uppercase tracking-tighter hover:text-gray-700">Mampirin Magazine</h1>
        </Link>
      </header>

      <div className="mb-12 relative">
        <div className="bg-gray-200 w-full h-96 flex items-center justify-center text-gray-400">
            [Gambar Suasana Komunitas]
        </div>
        <div className="absolute top-10 right-10 bg-white p-6 max-w-sm border border-gray-200 shadow-lg">
          <h2 className="text-2xl font-black uppercase mb-2">Komunitas Kami Mendatangi Tempat Karena Nilai, Bukan Tren Sesaat.</h2>
          <p className="text-sm text-gray-700">Kami membedah keunggulan spesifik kafe anda, kecepatan koneksi wifi...</p>
        </div>
      </div>

      <section className="mb-12 text-center">
        <h3 className="text-3xl font-black uppercase mb-8">Mengapa Berpartner Dengan Mampirin?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-black p-6 text-left">
            <h4 className="text-xl font-bold mb-4">01 Liputan Organik & Kredibel</h4>
            <p className="text-sm">Review jujur tanpa gimmick yang dipercaya komunitas mahasiswa.</p>
          </div>
          <div className="border border-black p-6 text-left">
            <h4 className="text-xl font-bold mb-4">02 Audience Tepat Sasaran</h4>
            <p className="text-sm">Menjangkau langsung mahasiswa aktif dan kreator kampus.</p>
          </div>
          <div className="border border-black p-6 text-left">
            <h4 className="text-xl font-bold mb-4">03 Paket Ramah Anggaran UMKM</h4>
            <p className="text-sm">Struktur harga transparan tanpa biaya siluman untuk pelaku bisnis lokal.</p>
          </div>
        </div>
      </section>
    </div>
  );
}