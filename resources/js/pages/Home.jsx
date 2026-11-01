import React from 'react';
import { Link } from '@inertiajs/react';
import BannerAds from '../components/BannerAds';
import CategoryList from '../components/CategoryList';
import Navbar from '../components/Navbar';
import PopularPosts from '../components/PopularPosts';
import SidebarAd from '../components/SidebarAd';
import { articleUrl, formatDate } from '../lib/articles';

function ArticleGrid({ posts }) {
  if (posts.length === 0) {
    return (
      <p className="py-8 text-center font-serif text-sm text-gray-500">
        Belum ada artikel di rubrik ini.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 divide-gray-400 md:grid-cols-4 md:divide-x">
      {posts.map((post) => (
        <div
          key={post.id}
          className="group flex flex-col px-4 first:pl-0 last:pr-0"
        >
          <Link href={articleUrl(post)}>
            <div className="mb-3 h-40 w-full overflow-hidden bg-gray-200">
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
            </div>
            <div className="mb-2 text-[9px] font-bold tracking-widest text-gray-500 uppercase">
              {formatDate(post.published_at)}
            </div>
            <h4 className="mb-2 text-xl leading-tight font-bold group-hover:underline">
              {post.title}
            </h4>
          </Link>
          <p className="line-clamp-3 font-serif text-sm leading-relaxed text-gray-700">
            {post.excerpt}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Home({
  hero = null,
  entertainment = [],
  history = [],
  latest = [],
  popular = [],
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 font-sans text-gray-900">
      <BannerAds />

      <Navbar />

      {/* Header */}
      <header className="mb-8 text-center">
        <Link href="/">
          <h1 className="text-6xl font-black tracking-tighter uppercase">
            Mampirin Magazine
          </h1>
        </Link>
        <p className="mt-2 text-xs tracking-[0.3em] text-gray-500 uppercase">
          Mampir Dulu, Baca Berita
        </p>
      </header>

      {/* Hero Section */}
      {hero ? (
        <section className="group mb-12">
          <Link href={articleUrl(hero)}>
            <div className="mb-4 h-[500px] w-full overflow-hidden bg-gray-200">
              {hero.image_url && (
                <img
                  src={hero.image_url}
                  alt={hero.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <h2 className="mt-4 text-5xl font-black group-hover:underline">
              {hero.title}
            </h2>
          </Link>
          <p className="mt-4 font-serif text-lg leading-relaxed text-gray-700">
            {hero.excerpt}
          </p>
          <Link
            href={articleUrl(hero)}
            className="mt-4 inline-block bg-black px-4 py-1 text-xs font-bold text-white uppercase hover:bg-gray-800"
          >
            Read More
          </Link>
        </section>
      ) : (
        <section className="mb-12 border-y border-gray-300 py-16 text-center font-serif text-gray-500">
          Belum ada artikel yang dipublikasikan. Tambahkan lewat panel admin.
        </section>
      )}

      {/* The Entertainment Section */}
      <section className="mb-12 border-t-[4px] border-black pt-8">
        <h3 className="mb-8 scale-y-110 text-center text-[5rem] leading-none font-black tracking-tighter uppercase">
          The Entertainment
        </h3>
        <ArticleGrid posts={entertainment} />
        <div className="mt-10 mb-4 flex justify-center">
          <Link
            href="/article/category/entertainment"
            className="border border-gray-400 px-10 py-3 text-[10px] font-bold tracking-widest text-gray-600 uppercase transition-colors hover:border-black hover:text-black"
          >
            View All &rarr;
          </Link>
        </div>
      </section>

      {/* History Section */}
      <section className="mb-12 border-t-[4px] border-black pt-8">
        <h3 className="mb-8 scale-y-110 text-center text-[5rem] leading-none font-black tracking-tighter uppercase">
          History
        </h3>
        <ArticleGrid posts={history} />
        <div className="mt-10 mb-4 flex justify-center">
          <Link
            href="/article/category/history"
            className="border border-gray-400 px-10 py-3 text-[10px] font-bold tracking-widest text-gray-600 uppercase transition-colors hover:border-black hover:text-black"
          >
            View All &rarr;
          </Link>
        </div>
      </section>

      {/* Latest Section (With Sidebar) */}
      <section className="mb-12 border-t-[4px] border-black pt-8">
        <h3 className="mb-8 scale-y-110 text-center text-[5rem] leading-none font-black tracking-tighter uppercase">
          Latest
        </h3>

        <div className="grid grid-cols-1 border-t border-gray-400 pt-8 md:grid-cols-3">
          {/* Left Column: Latest Articles List */}
          <div className="space-y-6 md:col-span-2 md:border-r md:border-gray-400 md:pr-8">
            {latest.length === 0 && (
              <p className="font-serif text-sm text-gray-500">
                Belum ada artikel terbaru.
              </p>
            )}

            {latest.map((post) => (
              <div
                key={post.id}
                className="group flex gap-4 border-b border-gray-400 pb-6 last:border-0"
              >
                <div className="h-32 w-48 flex-shrink-0 overflow-hidden bg-gray-200">
                  <Link href={articleUrl(post)}>
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </Link>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                    {post.category?.name ?? 'Artikel'}
                  </div>
                  <Link href={articleUrl(post)}>
                    <h4 className="mb-2 text-xl leading-tight font-bold group-hover:underline">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="mb-2 line-clamp-2 font-serif text-sm text-gray-600">
                    {post.excerpt}
                  </p>
                  <div>
                    <Link
                      href={articleUrl(post)}
                      className="bg-black px-3 py-1 text-[10px] font-bold text-white uppercase hover:bg-gray-800"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sidebar */}
          <div className="md:col-span-1 md:pl-8">
            <CategoryList className="mb-10" />

            <PopularPosts posts={popular} />

            <SidebarAd className="mt-8" />
          </div>
        </div>
      </section>

      {/* Footer dengan ID Target */}
      <footer
        id="footer-contact"
        className="mt-12 border-t-[4px] border-black pt-8 text-center"
      >
        <h2 className="mb-2 text-4xl font-black tracking-tighter uppercase">
          Mampirin Magazine
        </h2>
        <p className="mb-4 text-xs tracking-widest text-gray-500 uppercase">
          Mampir Dulu, Sukses Kemudian
        </p>
        <div className="mb-4 flex justify-center space-x-4 text-xs font-bold text-gray-600">
          <Link href="/about" className="hover:text-black">
            About
          </Link>
          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-black">
            Privacy Policy
          </Link>
        </div>
        <p className="text-xs text-gray-400">
          &copy; 2026 Mampirin Magazine. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

