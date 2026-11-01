import React from 'react';
import { Link } from '@inertiajs/react';
import BannerAds from '../components/BannerAds';
import CategoryList from '../components/CategoryList';
import Navbar from '../components/Navbar';
import PopularPosts from '../components/PopularPosts';
import SidebarAd from '../components/SidebarAd';

export default function About({ popular = [] }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 font-sans text-gray-900">
      <BannerAds />

      <Navbar />

      {/* Header */}
      <header className="mb-12 text-center">
        <Link href="/">
          <h1 className="text-6xl font-black tracking-tighter uppercase">
            Mampirin Magazine
          </h1>
        </Link>
        <p className="mt-2 text-xs tracking-[0.3em] text-gray-500 uppercase">
          Mampir Dulu, Baca Berita
        </p>
      </header>

      {/* Layout Utama: Content Kiri & Sidebar Kanan */}
      <div className="grid grid-cols-1 border-t-[4px] border-black pt-8 md:grid-cols-3">
        {/* Konten Kiri (About) */}
        <div className="space-y-6 md:col-span-2 md:border-r md:border-gray-400 md:pr-8">
          <div className="mb-8 text-center">
            <h2 className="text-[4rem] leading-none font-black tracking-tighter uppercase">
              About
            </h2>
            <p className="mt-2 font-serif text-gray-500 italic">
              Get to know more about us
            </p>
          </div>

          <div className="pb-10 text-justify text-base leading-relaxed text-gray-800">
            {/* Gambar Mengambang (Float Left) */}
            <div className="float-left mr-6 mb-4 w-64">
              <div className="mb-2 h-48 w-full overflow-hidden bg-gray-200">
                <img
                  src="https://picsum.photos/300/400?random=about"
                  alt="About"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-[10px] leading-tight text-gray-500 italic">
                Got time and tired. Town to town, up and down the dial.
              </p>
            </div>

            <p className="mb-4">
              Mampirin Magazine lahir dari kebiasaan sederhana: mampir sebentar,
              duduk, lalu membaca. Kami percaya cerita yang baik tidak harus
              rumit; ia cukup jujur, dekat dengan keseharian, dan ditulis dengan
              rasa ingin tahu.
            </p>
            <p className="mb-4">
              Kami meliput hiburan, sejarah, dan gaya hidup dari sudut pandang
              mahasiswa dan warga lokal. Setiap artikel dikurasi oleh tim
              redaksi kecil yang bekerja bersama komunitas di sekitar kampus
              dan pesisir Bali.
            </p>
            <p className="mb-8">
              Kalau kamu punya cerita, tempat favorit, atau ingin bekerja sama,
              pintunya selalu terbuka. Mampir dulu, baca berita, lalu ngobrol
              dengan kami.
            </p>

            <div className="clear-both"></div>

            {/* Featured On */}
            <div className="mt-12 mb-8">
              <h3 className="mb-2 text-3xl font-black tracking-tighter uppercase">
                Featured on
              </h3>
              <p className="mb-4 text-sm font-bold">
                Elle | NYTimes | Bazaar | BBC | Fox News
              </p>
              <p>
                Kami tidak mengejar algoritma. Yang kami kejar adalah pembaca
                yang kembali karena percaya pada kurasi kami. Dukungan dari
                komunitas, pemilik kafe, dan pegiat lokal membuat ruang ini
                tetap hidup.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Kanan */}
        <aside className="md:col-span-1 md:pl-8">
          <CategoryList className="mb-10" />

          <PopularPosts posts={popular} />

          <SidebarAd className="mt-8" />
        </aside>
      </div>

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
