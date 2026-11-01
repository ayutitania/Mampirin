import React from 'react';
import { Link } from '@inertiajs/react';
import BannerAds from '../components/BannerAds';
import CategoryList from '../components/CategoryList';
import Navbar from '../components/Navbar';
import PopularPosts from '../components/PopularPosts';
import SidebarAd from '../components/SidebarAd';
import { articleUrl, formatDate } from '../lib/articles';

export default function ArticleCategory({
  category,
  featured = [],
  articles = [],
  popular = [],
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 font-sans text-gray-900">
      <BannerAds />

      <Navbar />

      {/* Header */}
      <header className="mb-8 border-b-[4px] border-black pb-8 text-center">
        <Link href="/">
          <h1 className="text-6xl font-black tracking-tighter uppercase">
            Mampirin Magazine
          </h1>
        </Link>
        <p className="mt-2 text-xs tracking-[0.3em] text-gray-500 uppercase">
          Mampir Dulu, Sukses Kemudian
        </p>
      </header>

      {/* Category Title Section */}
      <div className="mb-12 text-center">
        <span className="bg-black px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
          Category
        </span>
        <h2 className="mt-4 scale-y-110 text-[4rem] leading-none font-black tracking-tighter uppercase">
          {category.name}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-sm leading-relaxed text-gray-600">
          {category.description}
        </p>
      </div>

      {/* Top Featured Posts */}
      {featured.length > 0 && (
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {featured.map((post) => (
            <article key={post.id} className="group">
              <Link href={articleUrl(post)}>
                <div className="mb-4 h-[350px] w-full overflow-hidden bg-gray-200">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="mb-2 text-3xl leading-tight font-black tracking-tight group-hover:underline">
                  {post.title}
                </h3>
              </Link>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                <span className="inline-block h-4 w-4 rounded-full bg-gray-400"></span>
                {post.author} &bull; {formatDate(post.published_at)}
              </div>
              <p className="font-serif text-sm leading-relaxed text-gray-700">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* Main Content & Sidebar */}
      <div className="grid grid-cols-1 border-t border-gray-400 pt-10 md:grid-cols-3">
        {/* Left Column: Article List */}
        <div className="space-y-8 md:col-span-2 md:border-r md:border-gray-400 md:pr-8">
          {articles.length === 0 && featured.length === 0 && (
            <p className="py-8 text-center font-serif text-sm text-gray-500">
              Belum ada artikel di rubrik ini.
            </p>
          )}

          {articles.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col gap-6 border-b border-gray-300 pb-8 last:border-0 sm:flex-row"
            >
              <div className="h-48 flex-shrink-0 overflow-hidden bg-gray-200 sm:w-1/2">
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
              <div className="flex flex-col justify-center sm:w-1/2">
                <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  {post.category?.name ?? category.name}
                </div>
                <Link href={articleUrl(post)}>
                  <h4 className="mb-3 text-2xl leading-tight font-black tracking-tight group-hover:underline">
                    {post.title}
                  </h4>
                </Link>
                <p className="mb-4 line-clamp-3 font-serif text-sm text-gray-700">
                  {post.excerpt}
                </p>
                <div>
                  <Link
                    href={articleUrl(post)}
                    className="bg-black px-4 py-2 text-[10px] font-bold text-white uppercase transition-colors hover:bg-gray-800"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right Column: Sidebar */}
        <div className="mt-10 md:col-span-1 md:mt-0 md:pl-8">
          <CategoryList className="mb-10" />

          <PopularPosts posts={popular} className="mb-10" />

          <SidebarAd placement="article_sidebar" heightClass="h-80" />
        </div>
      </div>

      {/* Footer */}
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
