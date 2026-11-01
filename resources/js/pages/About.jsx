import React from 'react';
import { Link } from '@inertiajs/react';

export default function About() {
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
        <Link href="/about" className="hover:text-black text-black">About</Link>

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
      <header className="text-center mb-12">
        <Link href="/">
          <h1 className="text-6xl font-black uppercase tracking-tighter">Mampirin Magazine</h1>
        </Link>
        <p className="text-xs tracking-[0.3em] mt-2 text-gray-500 uppercase">Mampir Dulu, Baca Berita</p>
      </header>

      {/* Layout Utama: Content Kiri & Sidebar Kanan */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t-[4px] border-black pt-8">

        {/* Konten Kiri (About) dengan pembatas garis vertikal di sebelah kanan */}
        <div className="md:col-span-2 space-y-6 md:border-r md:border-gray-400 md:pr-8">

          {/* Judul About */}
          <div className="text-center mb-8">
            <h2 className="text-[4rem] font-black uppercase tracking-tighter leading-none">About</h2>
            <p className="text-gray-500 font-serif italic mt-2">Get to know more about us</p>
          </div>

          <div className="text-gray-800 text-base leading-relaxed text-justify pb-10">

            {/* Gambar Mengambang (Float Left) */}
            <div className="float-left mr-6 mb-4 w-64">
              <div className="w-full h-48 mb-2 overflow-hidden bg-gray-200">
                <img src="https://picsum.photos/300/400?random=about" alt="About" className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] text-gray-500 italic leading-tight">
                Got time and tired. Town to town, up and down the dial.
              </p>
            </div>

            {/* Paragraf Teks About */}
            <p className="mb-4">
              Baby if you've ever wondered, wondered what ever became of me. I'm living on the air in Cincinnati, Cincinnati WKRP. Got time and tired of packing and unpacking. Town to town, up and down the dial. Maybe you and me were never meant to be, But baby think of me once in a while. I'm in WKRP in Cincinnati.
            </p>
            <p className="mb-4">
              They arrived in fifty mother ships, offering their friendship and advance technology to Earth. Skeptical of the visitors, <a href="#" className="underline font-bold hover:text-black text-gray-900">Mike Donovan</a> and Juliet Parrish infiltrated their ranks and soon discovered some startling secrets. The resistance is all that stands between us... and the visitors.
            </p>
            <p className="mb-8">
              Baby if you've ever wondered, wondered what ever became of me. I'm living on the air in Cincinnati, Cincinnati WKRP. Got time and tired of packing and unpacking. Town to town, up and down the dial. Maybe you and me were never meant to be, But baby think of me once in a while. I'm in WKRP in Cincinnati.
            </p>

            {/* Clear-fix agar elemen bawah tidak menabrak gambar float */}
            <div className="clear-both"></div>

            {/* Featured On */}
            <div className="mt-12 mb-8">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Featured on</h3>
              <p className="font-bold text-sm mb-4">
                Elle | NYTimes | Bazaar | BBC | Fox News
              </p>
              <p>
                We got a right to pick a little fight, Bonanza! If anyone fights anyone of us, he's gotta fight with me! We're not a one to saddle up and run, Bonanza! Anyone of us who starts a little fuss knows he can count on me! One for four, four for one, this we guarantee. We got a right to pick a little fight, Bonanza! If anyone fights anyone of us he's gotta fight with me!
              </p>
            </div>

          </div>
        </div>

        {/* Sidebar Kanan */}
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
