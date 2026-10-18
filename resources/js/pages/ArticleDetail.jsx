import React from 'react';
import { Link } from '@inertiajs/react';

export default function ArticleDetail() {
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

      <div className="flex flex-col md:flex-row gap-8">
        <main className="w-full md:w-3/4">
          <h2 className="text-4xl font-bold mb-4">The Origin Of All Religions In The World</h2>
          <div className="bg-gray-200 w-full h-[500px] flex items-center justify-center text-gray-400 mb-6">
            [Gambar Artikel Utama]
          </div>
          <div className="prose max-w-none text-gray-800 leading-relaxed">
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique lacus eget metus venenatis, vel tincidunt lacus pellentesque.</p>
            <h3 className="text-2xl font-bold mb-2 mt-6">This is heading H2</h3>
            <p className="mb-4">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Quisque in sapien in purus auctor sollicitudin.</p>
            <blockquote className="border-l-4 border-black pl-4 my-6 italic text-xl text-gray-600">
              "Running pace within the galaxy is no minor ship, fly and turn it we sale is the places."
            </blockquote>
            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          </div>
        </main>

        <aside className="w-full md:w-1/4">
          <div className="mb-8">
            <h4 className="font-bold bg-black text-white px-2 py-1 mb-4 text-center uppercase">Latest Posts</h4>
            <ul className="text-sm space-y-6">
              {[1, 2, 3].map((item) => (
                <li key={item} className="group">
                  <Link href="/article">
                    <div className="bg-gray-200 w-full h-32 flex items-center justify-center text-gray-400 mb-2">
                      [Thumb {item}]
                    </div>
                    <span className="font-bold group-hover:underline">The Origin Of All Religions Part {item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}