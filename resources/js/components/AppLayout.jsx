import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import BackToTop from './BackToTop';
import BannerAds from './BannerAds';
import Navbar from './Navbar';

const DEFAULT_DESCRIPTION =
    'Mampirin - Mampir Dulu, Baca Berita. Rubrik hiburan, sejarah, dan gaya hidup dari sudut pandang mahasiswa dan warga lokal.';

export default function AppLayout({
    title,
    description = DEFAULT_DESCRIPTION,
    image = null,
    type = 'website',
    children,
}) {
    const { url, props } = usePage();
    const appUrl = (props.appUrl ?? 'http://localhost:8000').replace(
        /\/+$/,
        '',
    );
    const path = url.split('?')[0] || '/';
    const canonical = `${appUrl}${path.startsWith('/') ? path : `/${path}`}`;
    const fullTitle = title
        ? `${title} - Mampirin`
        : 'Mampirin';
    const imageUrl = image
        ? String(image).startsWith('http')
            ? String(image)
            : `${appUrl}${String(image)}`
        : null;

    return (
        <div className="mx-auto max-w-6xl px-4 pb-10 font-sans text-gray-900 dark:text-white">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-black focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-white focus:uppercase"
            >
                Lewati ke konten
            </a>

            <Head>
                <title>{fullTitle}</title>
                <meta
                    head-key="description"
                    name="description"
                    content={description}
                />
                <meta
                    head-key="og:title"
                    property="og:title"
                    content={fullTitle}
                />
                <meta
                    head-key="og:description"
                    property="og:description"
                    content={description}
                />
                <meta head-key="og:type" property="og:type" content={type} />
                <meta
                    head-key="og:site_name"
                    property="og:site_name"
                    content="Mampirin"
                />
                <meta head-key="og:url" property="og:url" content={canonical} />
                <meta
                    head-key="twitter:card"
                    name="twitter:card"
                    content="summary_large_image"
                />
                <link head-key="canonical" rel="canonical" href={canonical} />
                {imageUrl && (
                    <meta
                        head-key="og:image"
                        property="og:image"
                        content={imageUrl}
                    />
                )}
                {imageUrl && (
                    <meta
                        head-key="twitter:image"
                        name="twitter:image"
                        content={imageUrl}
                    />
                )}
            </Head>

            <BannerAds />

            <Navbar />

            <header className="mb-8 text-center">
                <Link href="/">
                    <h1 className="text-4xl leading-none font-black tracking-tighter uppercase sm:text-5xl md:text-6xl">
                        Mampirin
                    </h1>
                </Link>
                <p className="mt-2 text-[10px] tracking-[0.25em] text-gray-500 uppercase sm:text-xs sm:tracking-[0.3em] dark:text-gray-400">
                    Mampir Dulu, Baca Berita
                </p>
            </header>

            <main id="main-content">{children}</main>

            <footer
                id="footer-contact"
                className="mt-12 border-t-[4px] border-black pt-8 text-center dark:border-gray-400"
            >
                <h2 className="mb-2 text-3xl font-black tracking-tighter uppercase sm:text-4xl">
                    Mampirin
                </h2>
                <p className="mb-4 text-xs tracking-widest text-gray-500 uppercase dark:text-gray-400">
                    Mampir Dulu, Sukses Kemudian
                </p>
                <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold text-gray-600 dark:text-gray-300">
                    <Link href="/about" className="hover:text-black dark:hover:text-white">
                        Tentang
                    </Link>
                    <Link href="/faq" className="hover:text-black dark:hover:text-white">
                        FAQ
                    </Link>
                    <Link href="/partnership" className="hover:text-black dark:hover:text-white">
                        Kemitraan
                    </Link>
                    <Link href="/ads" className="hover:text-black dark:hover:text-white">
                        Iklan
                    </Link>
                    <a href="#footer-contact" className="hover:text-black dark:hover:text-white">
                        Kontak
                    </a>
                </div>
                <p className="text-xs text-gray-400">
                    &copy; 2026 Mampirin. Seluruh hak cipta dilindungi.
                </p>
            </footer>

            <BackToTop />
        </div>
    );
}
