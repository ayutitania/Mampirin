import React from 'react';
import { Link } from '@inertiajs/react';

export default function WriteUs() {
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

        <Link href="/write-us" className="hover:text-black text-black">Write Us</Link>
        <Link href="/ads" className="hover:text-gray-500">Ads</Link>
        <a href="#footer-contact" className="hover:text-gray-500">Contact</a>
      </nav>

      {/* Header */}
      <header className="text-center mb-12">
        <Link href="/">
          <h1 className="text-6xl font-black uppercase tracking-tighter">Mampirin Magazine</h1>
        </Link>
        <p className="text-xs tracking-[0.3em] mt-2 text-gray-500 uppercase">Mampir Dulu, Baca Berita</p>
      </header>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto border-t-[4px] border-black pt-8">

        {/* Title & Subtitle */}
        <h2 className="text-[3rem] font-black uppercase tracking-tighter leading-none mb-4">Share Your Idea</h2>
        <p className="mb-10 text-sm text-gray-700 border-b border-gray-300 pb-6">
          Pastikan kamu membaca syarat dan FAQ pengiriman artikel yang ada di <a href="#" className="underline">sini</a>
        </p>

        <form className="space-y-10">

          {/* Article Title */}
          <div>
            <label className="block text-sm text-gray-800 mb-2">Article Title:</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black bg-transparent transition-colors"
            />
          </div>

          {/* Article Body (WYSIWYG Mockup) */}
          <div>
            <label className="block text-sm text-gray-800 mb-2">Article Body:</label>
            <div className="border border-gray-300 bg-white">

              {/* Tabs Visual / Text */}
              <div className="flex justify-end border-b border-gray-300 px-2 py-1 bg-gray-50 space-x-1">
                <button type="button" className="px-3 py-1 text-xs bg-white border border-gray-300 shadow-sm text-gray-700">Visual</button>
                <button type="button" className="px-3 py-1 text-xs text-gray-500 hover:text-gray-800">Text</button>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex items-center space-x-4 border-b border-gray-300 px-4 py-2 bg-gray-50 text-gray-600 text-sm font-serif">
                <div className="flex space-x-3">
                  <button type="button" className="font-bold hover:text-black">B</button>
                  <button type="button" className="italic hover:text-black">I</button>
                  <button type="button" className="underline hover:text-black">U</button>
                  <button type="button" className="line-through hover:text-black">S</button>
                </div>
                <div className="border-l border-gray-300 h-4"></div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-black">
                  <span className="font-sans text-xs">16</span>
                  <span className="text-[10px]">▼</span>
                </div>
                <div className="border-l border-gray-300 h-4"></div>
                <button type="button" className="font-bold text-yellow-500 bg-yellow-100 px-1">A ▼</button>
              </div>

              {/* Textarea */}
              <textarea
                rows="10"
                className="w-full p-4 focus:outline-none bg-white text-sm"
                defaultValue="Initial content for the editor."
              ></textarea>
            </div>
          </div>

          {/* Writer Name */}
          <div>
            <label className="block text-sm text-gray-800 mb-2">Writer Name:</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black bg-transparent transition-colors"
            />
          </div>

          {/* Writer Email */}
          <div>
            <label className="block text-sm text-gray-800 mb-2">Writer Email:</label>
            <input
              type="email"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black bg-transparent transition-colors"
            />
          </div>

          {/* Writer Phone */}
          <div>
            <label className="block text-sm text-gray-800 mb-2">Writer Phone:</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black bg-transparent transition-colors"
            />
          </div>

          {/* reCAPTCHA Mockup */}
          <div className="border border-gray-300 bg-gray-50 p-4 w-72 flex items-center justify-between rounded-sm shadow-sm mt-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-6 h-6 border-gray-400 rounded-sm cursor-pointer" />
              <span className="text-sm text-gray-800">I'm not a robot</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA logo" className="w-8 h-8 opacity-80" />
              <span className="text-[8px] text-gray-500 mt-1">reCAPTCHA</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pb-10 border-b border-gray-300">
            <button type="button" className="bg-black text-white px-8 py-2 text-sm uppercase hover:bg-gray-800 transition">
              Submit
            </button>
          </div>

        </form>
      </div>

      {/* Footer */}
      <footer id="footer-contact" className="pt-8 text-center mt-12">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Mampirin Magazine</h2>
        <div className="flex justify-center space-x-3 mb-4 mt-4">
          {/* Social Icons Placeholder */}
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">f</div>
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">X</div>
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">ig</div>
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
