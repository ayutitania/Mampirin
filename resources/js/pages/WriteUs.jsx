import React from 'react';
import { Link } from '@inertiajs/react';

export default function WriteUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 font-sans text-gray-900 pb-10">
      
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

      <h2 className="text-4xl font-bold mb-2 uppercase">Share Your Idea</h2>
      <p className="mb-8 text-sm border-b border-gray-300 pb-4">Pastikan kamu membaca syarat dan FAQ pengiriman artikel yang ada di sini</p>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 uppercase">Article Title:</label>
          <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" placeholder="Judul Artikel Anda..." />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2 uppercase">Article Body:</label>
          <textarea rows="10" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" placeholder="Ketik isi artikel Anda di sini..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase">Writer Name:</label>
          <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase">Writer Email:</label>
          <input type="email" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase">Writer Phone:</label>
          <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" />
        </div>

        <div className="border border-gray-300 p-4 w-64 flex items-center gap-3">
          <input type="checkbox" className="w-5 h-5" /> 
          <span className="text-sm font-bold">I'm not a robot</span>
        </div>

        <button type="button" className="bg-black text-white px-10 py-4 font-bold uppercase hover:bg-gray-800 transition">
          Submit Article
        </button>
      </form>
    </div>
  );
}