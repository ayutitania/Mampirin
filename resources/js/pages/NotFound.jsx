import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../components/AppLayout';

export default function NotFound() {
    return (
        <AppLayout
            title="Halaman Tidak Ditemukan"
            description="Halaman yang kamu cari tidak tersedia di Mampirin Magazine."
        >
            <section className="mx-auto max-w-2xl border-t-[4px] border-black dark:border-gray-400 py-20 text-center">
                <div className="mb-4 text-[6rem] leading-none font-black tracking-tighter text-gray-300">
                    404
                </div>
                <h2 className="mb-4 text-4xl leading-none font-black tracking-tighter uppercase">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="mx-auto mb-8 max-w-md font-serif text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    Sepertinya tautan yang kamu buka sudah dipindahkan, dihapus,
                    atau tidak pernah ada. Kembali ke beranda untuk melanjutkan
                    membaca.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        href="/"
                        className="bg-black px-5 py-3 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                    >
                        Kembali ke Beranda
                    </Link>
                    <Link
                        href="/article"
                        className="border border-gray-400 dark:border-gray-600 px-5 py-3 text-[10px] font-bold tracking-widest uppercase hover:border-black dark:border-gray-400"
                    >
                        Jelajahi Artikel
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
