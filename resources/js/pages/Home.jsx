import React from 'react';
import { Link } from '@inertiajs/react';

export default function Home() {
  const gridPosts = [1, 2, 3, 4];
  const latestPosts = [1, 2, 3, 4, 5];

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
    }
  ];

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

        <Link href="/write-us" className="hover:text-gray-500">Write Us</Link>
        <Link href="/ads" className="hover:text-gray-500">Ads</Link>

        {/* Tombol Contact untuk Scroll */}
        <a href="#footer-contact" className="hover:text-gray-500">Contact</a>
      </nav>

      {/* Header */}
      <header className="text-center mb-8">
        <Link href="/">
          <h1 className="text-6xl font-black uppercase tracking-tighter">Mampirin Magazine</h1>
        </Link>
        <p className="text-xs tracking-[0.3em] mt-2 text-gray-500 uppercase">Mampir Dulu, Baca Berita</p>
      </header>

      {/* Hero Section */}
      <section className="mb-12 group cursor-pointer">
        <Link href="/article">
          <div className="w-full h-[500px] mb-4 overflow-hidden bg-gray-200">
            <img src="https://picsum.photos/1280/500?random=hero" alt="Hero" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <h2 className="text-5xl font-black mt-4 group-hover:underline">The MAMPIRIN – Redefine The Concept</h2>
        </Link>
        <p className="mt-4 text-gray-700 font-serif leading-relaxed text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </p>
        <Link href="/article">
          <button className="mt-4 bg-black text-white px-4 py-1 text-xs font-bold uppercase hover:bg-gray-800">
            Read More
          </button>
        </Link>
      </section>

      {/* The Entertainment Section */}
      <section className="mb-12 border-t-[4px] border-black pt-8">
        <h3 className="text-[5rem] leading-none font-black uppercase text-center mb-8 tracking-tighter scale-y-110">The Entertainment</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 md:divide-x divide-gray-400">
          {gridPosts.map((item) => (
            <div key={item} className="group cursor-pointer px-4 first:pl-0 last:pr-0 flex flex-col">
              <Link href="/article">
                <div className="w-full h-40 mb-3 overflow-hidden bg-gray-200">
                   <img src={`https://picsum.photos/400/300?random=ent-${item}`} alt="Entertainment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-[9px] font-bold mb-2 text-gray-500 uppercase tracking-widest">December 20, 2026</div>
                <h4 className="font-bold text-xl leading-tight group-hover:underline mb-2">The Origin Of All Religions In The World</h4>
              </Link>
              <p className="text-sm text-gray-700 font-serif leading-relaxed">
                Labores incorrupte vim an. Id augue populo alienum usu, has harum consectetuer ne, ne clita fuisset...
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 mb-4">
          <Link href="/article/entertainment" className="border border-gray-400 px-10 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-black hover:border-black transition-colors">
            View All &rarr;
          </Link>
        </div>
      </section>

      {/* History Section */}
      <section className="mb-12 border-t-[4px] border-black pt-8">
        <h3 className="text-[5rem] leading-none font-black uppercase text-center mb-8 tracking-tighter scale-y-110">History</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 md:divide-x divide-gray-400">
          {gridPosts.map((item) => (
            <div key={item} className="group cursor-pointer px-4 first:pl-0 last:pr-0 flex flex-col">
              <Link href="/article">
                <div className="w-full h-40 mb-3 overflow-hidden bg-gray-200">
                   <img src={`https://picsum.photos/400/300?random=hist-${item}`} alt="History" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-[9px] font-bold mb-2 text-gray-500 uppercase tracking-widest">January 11, 2019</div>
                <h4 className="font-bold text-xl leading-tight group-hover:underline mb-2">Masonry Gallery This Is A Sample Review</h4>
              </Link>
              <p className="text-sm text-gray-700 font-serif leading-relaxed">
                Labore nonumes te vel, vis id errem tantas tempor. Solet quidam salutatus at quo. Tantas comprehensam te sea...
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 mb-4">
          <Link href="/article/history" className="border border-gray-400 px-10 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-black hover:border-black transition-colors">
            View All &rarr;
          </Link>
        </div>
      </section>

      {/* Latest Section (With Sidebar) */}
      <section className="mb-12 border-t-[4px] border-black pt-8">
        <h3 className="text-[5rem] leading-none font-black uppercase text-center mb-8 tracking-tighter scale-y-110">Latest</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-400 pt-8">

          {/* Left Column: Latest Articles List dengan garis pembatas di sisi kanan */}
          <div className="md:col-span-2 space-y-6 md:border-r md:border-gray-400 md:pr-8">
            {latestPosts.map((item) => (
              <div key={item} className="flex gap-4 group cursor-pointer border-b border-gray-400 pb-6 last:border-0">
                <div className="w-48 h-32 flex-shrink-0 overflow-hidden bg-gray-200">
                  <img src={`https://picsum.photos/300/200?random=latest-${item}`} alt="Latest" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Category</div>
                  <Link href="/article">
                    <h4 className="font-bold text-xl leading-tight group-hover:underline mb-2">The Title of the Latest Article {item}</h4>
                  </Link>
                  <p className="text-sm text-gray-600 font-serif mb-2 line-clamp-2">Excerpt for the latest article. Vestibulum id ligula porta felis euismod semper.</p>
                  <div>
                    <button className="bg-black text-white px-3 py-1 text-[10px] font-bold uppercase hover:bg-gray-800">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sidebar */}
          <div className="md:col-span-1 md:pl-8">

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
            <div>
              <div className="bg-black text-white text-center text-[11px] font-bold tracking-widest py-1 mb-6 uppercase">
                Popular
              </div>
              <div className="space-y-8">
                {popularPosts.map((post) => (
                  <div key={post.id} className="group cursor-pointer">
                    <div className="relative mb-3">
                      <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
                      {/* Angka besar di pojok kanan bawah */}
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

            {/* Sidebar Widget: Ad Space */}
            <div className="mt-8 bg-gray-100 h-64 flex flex-col items-center justify-center border border-gray-300">
              <span className="text-xs font-bold text-gray-400 uppercase">Advertisement</span>
              <span className="text-2xl text-gray-300 mt-2">[300x250]</span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer dengan ID Target */}
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
