import React from 'react';
import AppLayout from '../components/AppLayout';
import CategoryList from '../components/CategoryList';
import PopularPosts from '../components/PopularPosts';
import SidebarAd from '../components/SidebarAd';

export default function About({ popular = [] }) {
    return (
        <AppLayout
            title="Tentang Kami"
            description="Mampirin lahir dari kebiasaan sederhana: mampir sebentar, duduk, lalu membaca cerita yang jujur dan dekat dengan keseharian."
        >
            {/* Layout Utama: Content Kiri & Sidebar Kanan */}
            <div className="grid grid-cols-1 border-t-[4px] border-black dark:border-gray-400 pt-8 md:grid-cols-3">
                {/* Konten Kiri (About) */}
                <div className="space-y-6 md:col-span-2 md:border-r md:border-gray-400 dark:border-gray-600 md:pr-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-5xl leading-none font-black tracking-tighter uppercase sm:text-6xl md:text-[4rem]">
                            Tentang
                        </h2>
                        <p className="mt-2 font-serif text-gray-500 dark:text-gray-400 italic">
                            Kenali kami lebih dekat
                        </p>
                    </div>

                    <div className="pb-10 text-justify text-base leading-relaxed text-gray-800 dark:text-gray-200">
                        {/* Gambar Mengambang (Float Left) */}
                        <div className="float-left mr-6 mb-4 w-40 sm:w-64">
                            <div className="mb-2 h-36 w-full overflow-hidden bg-gray-200 sm:h-48 dark:bg-gray-700">
                                <img
                                    src="https://picsum.photos/300/400?random=about"
                                    alt="Suasana redaksi Mampirin"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <p className="text-[10px] leading-tight text-gray-500 dark:text-gray-400 italic">
                                Sekilas suasana redaksi dan kegiatan kami di
                                lapangan.
                            </p>
                        </div>

                        <p className="mb-4">
                            Mampirin lahir dari kebiasaan sederhana:
                            mampir sebentar, duduk, lalu membaca. Kami percaya
                            cerita yang baik tidak harus rumit; ia cukup jujur,
                            dekat dengan keseharian, dan ditulis dengan rasa
                            ingin tahu.
                        </p>
                        <p className="mb-4">
                            Kami meliput hiburan, sejarah, dan gaya hidup dari
                            sudut pandang mahasiswa dan warga lokal. Setiap
                            artikel dikurasi oleh tim redaksi kecil yang bekerja
                            bersama komunitas di sekitar kampus dan pesisir
                            Bali.
                        </p>
                        <p className="mb-8">
                            Kalau kamu punya cerita, tempat favorit, atau ingin
                            bekerja sama, pintunya selalu terbuka. Mampir dulu,
                            baca berita, lalu ngobrol dengan kami.
                        </p>

                        <div className="clear-both"></div>

                        {/* Featured On */}
                        <div className="mt-12 mb-8">
                            <h3 className="mb-2 text-2xl font-black tracking-tighter uppercase sm:text-3xl">
                                Pernah Tampil Di
                            </h3>
                            <p className="mb-4 text-sm font-bold">
                                Elle | NYTimes | Bazaar | BBC | Fox News
                            </p>
                            <p>
                                Kami tidak mengejar algoritma. Yang kami kejar
                                adalah pembaca yang kembali karena percaya pada
                                kurasi kami. Dukungan dari komunitas, pemilik
                                kafe, dan pegiat lokal membuat ruang ini tetap
                                hidup.
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

        </AppLayout>
    );
}
