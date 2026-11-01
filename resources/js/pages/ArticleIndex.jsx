import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Navbar from '../components/Navbar';
import { categoryUrl } from '../lib/articles';

export default function ArticleIndex() {
  const categories = usePage().props.siteCategories ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 font-sans text-gray-900">
      <Navbar />

      {/* Header */}
      <header className="mb-12 border-b-[4px] border-black pb-8 text-center">
        <Link href="/">
          <h1 className="text-6xl font-black tracking-tighter uppercase">
            Mampirin Magazine
          </h1>
        </Link>
        <p className="mt-2 text-xs tracking-[0.3em] text-gray-500 uppercase">
          Mampir Dulu, Baca Berita
        </p>
      </header>

      {/* Pemilihan Kategori */}
      <section className="mb-16 text-center">
        <h2 className="mb-4 text-[3rem] leading-none font-black tracking-tighter uppercase">
          Pilih Kategori Artikel
        </h2>
        <p className="mb-10 font-serif text-gray-500 italic">
          Jelajahi berbagai rubrik menarik yang telah kami kurasi.
        </p>

        {categories.length === 0 ? (
          <p className="font-serif text-sm text-gray-500">
            Belum ada kategori artikel. Tambahkan lewat panel admin.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={categoryUrl(category)}
                className="group block border border-gray-300 text-left transition-colors hover:border-black"
              >
                <div className="h-48 w-full overflow-hidden bg-gray-200">
                  {category.image_url && (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-black tracking-tight uppercase group-hover:underline">
                      {category.name}
                    </h3>
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      {category.articles_count ?? 0} artikel
                    </span>
                  </div>
                  <p className="mb-6 font-serif text-sm text-gray-700">
                    {category.description}
                  </p>
                  <span className="border border-black px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors group-hover:bg-black group-hover:text-white">
                    Jelajahi &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
