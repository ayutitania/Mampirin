import React from 'react';
import { Link } from '@inertiajs/react';

export default function Home() {
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

      <header className="border-b-2 border-black py-4 text-center mb-8">
        <Link href="/">
          <h1 className="text-5xl font-extrabold uppercase tracking-tighter hover:text-gray-700">Mampirin Magazine</h1>
        </Link>
        <p className="text-sm tracking-widest mt-2">Mampir Dulu, Sukses Kemudian</p>
      </header>

      <section className="mb-12 cursor-pointer group">
        <Link href="/article">
          <div className="bg-gray-200 w-full h-96 flex items-center justify-center text-gray-400 mb-4">
            [Gambar Hero]
          </div>
          <h2 className="text-4xl font-bold mt-4 group-hover:underline">The MAMPIRIN – Redefine The Concept</h2>
        </Link>
        <p className="mt-2 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </section>

      <section className="mb-12">
        <h3 className="text-3xl font-black uppercase text-center border-t border-b border-black py-2 mb-6">The Entertainment</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group">
              <Link href="/article">
                <div className="bg-gray-200 w-full h-32 flex items-center justify-center text-gray-400 mb-2">
                   [Gambar {item}]
                </div>
                <h4 className="font-bold text-sm group-hover:underline">Post Title Here {item}</h4>
              </Link>
              <p className="text-xs text-gray-600 mt-1">Short excerpt goes here...</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}