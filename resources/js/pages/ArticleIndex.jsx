import React from 'react';
import { Link } from '@inertiajs/react';

export default function ArticleIndex() {
  const categories = [
    {
      title: 'Entertainment',
      desc: 'Berita hiburan, film, musik, dan kultur pop terkini.',
      link: '/article/entertainment',
      img: 'https://picsum.photos/600/400?random=cat-1'
    },
    {
      title: 'History',
      desc: 'Eksplorasi masa lalu, arsip sejarah, dan peristiwa penting.',
      link: '/article/history',
      img: 'https://picsum.photos/600/400?random=cat-2'
    },
    {
      title: 'Lifestyle',
      desc: 'Gaya hidup, desain, kuliner, dan perjalanan.',
      link: '/article/lifestyle',
      img: 'https://picsum.photos/600/400?random=cat-3'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 font-sans text-gray-900 pb-10">

      {/* Navbar Global */}
      <nav className="flex justify-center space-x-6 py-4 border-b border-gray-300 mb-6 text-sm font-bold uppercase tracking-widest relative z-20">
        <Link href="/" className="hover:text-gray-500">Home</Link>
        <Link href="/about" className="hover:text-gray-500">About</Link>

        {/* Dropdown Article */}
        <div className="relative group cursor-pointer">
          <Link href="/article" className="hover:text-black text-black flex items-center">
            Article
          </Link>
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 shadow-xl hidden group-hover:block z-30">
            <Link href="/article/entertainment" className="block px-4 py-3 hover:bg-gray-200 border-b border-gray-200 text-xs">Entertainment</Link>
            <Link href="/article/history" className="block px-4 py-3 hover:bg-gray-200 border-b border-gray-200 text-xs">History</Link>
            <Link href="/article/lifestyle" className="block px-4 py-3 hover:bg-gray-200 text-xs">Lifestyle</Link>
          </div>
        </div>

        <Link href="/write-us" className="hover:text-gray-500">Write Us</Link>
        <Link href="/ads" className="hover:text-gray-500">Ads</Link>
        <a href="#footer-contact" className="hover:text-gray-500">Contact</a>
      </nav>

      {/* Header */}
      <header className="text-center mb-12 border-b-[4px] border-black pb-8">
        <Link href="/">
          <h1 className="text-6xl font-black uppercase tracking-tighter">Mampirin Magazine</h1>
        </Link>
        <p className="text-xs tracking-[0.3em] mt-2 text-gray-500 uppercase">Mampir Dulu, Baca Berita</p>
      </header>

      {/* Pemilihan Kategori */}
      <section className="text-center mb-16">
        <h2 className="text-[3rem] font-black uppercase tracking-tighter leading-none mb-4">Pilih Kategori Artikel</h2>
        <p className="text-gray-500 font-serif italic mb-10">Jelajahi berbagai rubrik menarik yang telah kami kurasi.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <Link href={cat.link} key={index} className="group border border-gray-300 hover:border-black transition-colors block text-left">
              <div className="w-full h-48 overflow-hidden bg-gray-200">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:underline">{cat.title}</h3>
                <p className="text-sm text-gray-700 font-serif mb-6">{cat.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest border border-black px-4 py-2 group-hover:bg-black group-hover:text-white transition-colors">
                  Jelajahi &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
