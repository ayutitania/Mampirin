import React from 'react';
import { Link } from '@inertiajs/react';

export default function Entertainment() {
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

      <header className="py-4 text-center mb-8">
        <Link href="/">
          <h1 className="text-5xl font-extrabold uppercase tracking-tighter hover:text-gray-700">Mampirin Magazine</h1>
        </Link>
      </header>

      <div className="text-center mb-10 border-t border-b border-black py-6">
        <span className="bg-black text-white px-3 py-1 text-xs uppercase font-bold tracking-widest">Category</span>
        <h2 className="text-4xl font-black mt-4">ENTERTAINMENT</h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-4">
          These mostly part and view to stand window. Another think for another men in main underem male ready every all in mange.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <main className="w-full md:w-3/4">
          <Link href="/article" className="group">
            <div className="mb-10">
              <div className="bg-gray-200 w-full h-[400px] flex items-center justify-center text-gray-400 mb-4">
                [Gambar Highlight Entertainment]
              </div>
              <h3 className="text-3xl font-bold mb-2 group-hover:underline">The Origin Of All Religions In The World</h3>
              <p className="text-gray-700 text-sm">Every new part around our have long single the is point in its our well men a to our all have the up ready the we the is that a view every all is as its that...</p>
            </div>
          </Link>

          <div className="space-y-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-6 border-b border-gray-200 pb-6 group">
                <Link href="/article" className="w-1/3">
                  <div className="bg-gray-200 w-full h-40 flex items-center justify-center text-gray-400">
                    [Gambar List {item}]
                  </div>
                </Link>
                <div className="w-2/3">
                  <Link href="/article">
                    <h4 className="text-2xl font-bold mb-2 group-hover:underline">Berita Entertainment {item} Terbaru</h4>
                  </Link>
                  <p className="text-sm text-gray-600 mb-4">Every new part around our have long single the is point...</p>
                  <Link href="/article">
                    <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase hover:bg-gray-800">Read More</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="w-full md:w-1/4">
          <div className="mb-8">
            <h4 className="font-bold bg-black text-white px-2 py-1 mb-4 text-center uppercase">Popular</h4>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm border-b pb-2">
                 <span>Movies</span> <span className="font-bold">47</span>
               </div>
               <div className="flex justify-between items-center text-sm border-b pb-2">
                 <span>Music</span> <span className="font-bold">46</span>
               </div>
               <div className="flex justify-between items-center text-sm border-b pb-2">
                 <span>Lifestyle</span> <span className="font-bold">32</span>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}