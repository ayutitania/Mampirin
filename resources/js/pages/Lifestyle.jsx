import React from 'react';
import Navbar from '../components/Navbar';
import BannerAds from '../components/BannerAds';
import SidebarAd from '../components/SidebarAd';
import { Link } from '@inertiajs/react';

export default function Lifestyle() {
  const categories = [
    { name: 'MSME', count: 5 },
    { name: 'MUSIC', count: 4 },
    { name: 'TECHNOLOGY', count: 8 },
    { name: 'ENTERTAINMENT', count: 4 },
    { name: 'SPORTS', count: 4 },
    { name: 'HISTORY', count: 3 },
  ];

  const popularPosts = [
    {
      id: 1,
      title: 'The Origin Of All Religions In The World',
      excerpt: 'Labores incorrupte vim an. Id augue populo alienum usu, has harum consectetuer ne, ne clita fuisset dignissim quo. Semper oportere assueverit eum',
      img: 'https://picsum.photos/400/250?random=pop-1'
    },
    {
      id: 2,
      title: 'The Fox – Redefine The Concept',
      excerpt: 'Justo fabulas singulis at pri, saepe luptatum mei an. Duo idque solet nullam, eam ne putant hendrerit.',
      img: 'https://picsum.photos/400/250?random=pop-2'
    },
    {
      id: 3,
      title: 'They arrived in fifty mother ships',
      excerpt: 'Ei mei scripta intellegat. Verear voluptaria eam at, consul putent eu vel. Pro saepe maluisset ne, audire.',
      img: 'https://picsum.photos/400/250?random=pop-3'
    }
  ];

  const listPosts = [
    {
      title: 'Despicable Me Trailer',
      excerpt: 'Quo natum nemore putant in, his te case habemus. Nulla detraxit explicari in vim. Id eam magna omnesque.',
      img: 'https://picsum.photos/400/300?random=list-1'
    },
    {
      title: 'This is a Post with Featured Slider',
      excerpt: 'Justo fabulas singulis at pri, saepe luptatum mei an. Duo idque solet nullam, eam ne putant hendrerit.',
      img: 'https://picsum.photos/400/300?random=list-2'
    },
    {
      title: 'A Vimeo Video',
      excerpt: 'Ei mei scripta intellegat. Verear voluptaria eam at, consul putent eu vel. Pro saepe maluisset ne, audire.',
      img: 'https://picsum.photos/400/300?random=list-3'
    },
    {
      title: 'This Is A Sample Audio Post',
      excerpt: 'Labores incorrupte vim an. Id augue populo alienum usu, has harum consectetuer ne, ne clita fuisset.',
      img: 'https://picsum.photos/400/300?random=list-4'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 font-sans text-gray-900 pb-10">

      <BannerAds />

      <Navbar />

      {/* Header */}
      <header className="text-center mb-8 border-b-[4px] border-black pb-8">
        <Link href="/">
          <h1 className="text-6xl font-black uppercase tracking-tighter">Mampirin Magazine</h1>
        </Link>
        <p className="text-xs tracking-[0.3em] mt-2 text-gray-500 uppercase">Mampir Dulu, Sukses Kemudian</p>
      </header>

      {/* Category Title Section */}
      <div className="text-center mb-12">
        <span className="bg-black text-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest">Category</span>
        <h2 className="text-[4rem] leading-none font-black uppercase mt-4 tracking-tighter scale-y-110">LIFESTYLE</h2>
        <p className="text-gray-600 font-serif text-sm max-w-2xl mx-auto mt-6 leading-relaxed">
          Gaya hidup, desain, kuliner, dan perjalanan yang menemani hari-harimu.
        </p>
      </div>

      {/* Top Featured Posts (Grid Layout: 2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

        {/* Post 1 */}
        <div className="group cursor-pointer">
          <Link href="/article">
            <div className="w-full h-[350px] overflow-hidden bg-gray-200 mb-4">
              <img src="https://picsum.photos/800/600?random=feat-1" alt="Featured 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-3xl font-black mb-2 group-hover:underline leading-tight tracking-tight">The Origin Of All Religions In The World</h3>
          </Link>
          <div className="text-[10px] font-bold mb-3 text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-gray-400 inline-block"></span> Mampirin • December 20, 2026
          </div>
          <p className="text-sm text-gray-700 font-serif leading-relaxed">
            Labores incorrupte vim an. Id augue populo alienum usu, has harum consectetuer ne, ne clita fuisset dignissim quo. Semper oportere assueverit eum.
          </p>
        </div>

        {/* Post 2 */}
        <div className="group cursor-pointer">
          <Link href="/article">
            <div className="w-full h-[350px] overflow-hidden bg-gray-200 mb-4">
              <img src="https://picsum.photos/800/600?random=feat-4" alt="Featured 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-3xl font-black mb-2 group-hover:underline leading-tight tracking-tight">San Francisco, Macabre?</h3>
          </Link>
          <div className="text-[10px] font-bold mb-3 text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-gray-400 inline-block"></span> Mampirin • Sep 18, 2026
          </div>
          <p className="text-sm text-gray-700 font-serif leading-relaxed">
            Ei mei scripta intellegat. Verear voluptaria eam at, consul putent eu vel. Pro saepe maluisset ne, audire.
          </p>
        </div>

      </div>

      {/* Main Content & Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-400 pt-10">

        {/* Left Column: Article List */}
        <div className="md:col-span-2 space-y-8 md:border-r md:border-gray-400 md:pr-8">
          {listPosts.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-6 group cursor-pointer border-b border-gray-300 pb-8 last:border-0">
              <div className="sm:w-1/2 h-48 shrink-0 overflow-hidden bg-gray-200">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="sm:w-1/2 flex flex-col justify-center">
                <div className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Lifestyle</div>
                <Link href="/article">
                  <h4 className="font-black text-2xl leading-tight group-hover:underline mb-3 tracking-tight">{item.title}</h4>
                </Link>
                <p className="text-sm text-gray-700 font-serif mb-4 line-clamp-3">{item.excerpt}</p>
                <div>
                  <button className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-gray-800 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sidebar */}
        <div className="md:col-span-1 md:pl-8 mt-10 md:mt-0">

          {/* Sidebar Widget: Categories */}
          <div className="mb-10">
            <div className="bg-black text-white text-center text-[11px] font-bold tracking-widest py-1 mb-2 uppercase">
              Categories
            </div>
            <ul className="text-sm font-serif text-gray-800">
              {categories.map((cat, idx) => (
                <li key={idx} className="flex justify-between border-b border-gray-400 py-2">
                  <span className="font-bold">{cat.name}</span>
                  <span>({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar Widget: Popular Posts */}
          <div className="mb-10">
            <div className="bg-black text-white text-center text-[11px] font-bold tracking-widest py-1 mb-6 uppercase">
              Popular
            </div>
            <div className="space-y-8">
              {popularPosts.map((post) => (
                <div key={post.id} className="group cursor-pointer">
                  <div className="relative mb-3">
                    <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
                    <span className="absolute bottom-1 right-3 text-white text-5xl font-serif italic drop-shadow-md">
                      {post.id}
                    </span>
                  </div>
                  <h5 className="font-black text-xl leading-tight hover:underline mb-2">{post.title}</h5>
                  <p className="text-sm text-gray-800 font-serif leading-relaxed border-b border-gray-400 pb-6">
                    {post.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <SidebarAd placement="article_sidebar" heightClass="h-80" />

        </div>

      </div>

      {/* Footer */}
      <footer id="footer-contact" className="border-t-[4px] border-black pt-8 mt-12 text-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Mampirin Magazine</h2>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Mampir Dulu, Sukses Kemudian</p>
        <div className="flex justify-center space-x-4 text-xs font-bold text-gray-600 mb-4">
          <Link href="/about" className="hover:text-black">About</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
          <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
        </div>
        <p className="text-xs text-gray-400">&copy; 2026 Mampirin Magazine. All rights reserved.</p>
      </footer>

    </div>
  );
}
