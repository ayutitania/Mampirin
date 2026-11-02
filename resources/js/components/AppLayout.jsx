import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import BannerAds from './BannerAds';
import Navbar from './Navbar';

const DEFAULT_DESCRIPTION =
    'Mampirin Magazine - Mampir Dulu, Baca Berita. Rubrik hiburan, sejarah, dan gaya hidup dari sudut pandang mahasiswa dan warga lokal.';

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
    const canonical = `${appUrl}${url.startsWith('/') ? url : `/${url}`}`;
    const fullTitle = title
        ? `${title} - Mampirin Magazine`
        : 'Mampirin Magazine';
    const imageUrl = image
        ? image.startsWith('http')
            ? image
            : `${appUrl}${image}`
        : null;

    return (
        <div className="mx-auto max-w-6xl px-4 pb-10 font-sans text-gray-900">
            <Head>
                <title>{fullTitle}</title>
                <meta
                    head-key="description"
                    name="description"
                    content={description}
                />
                <meta head-key="og:title" property="og:title" content={fullTitle} />
                <meta
                    head-key="og:description"
                    property="og:description"
                    content={description}
                />
                <meta head-key="og:type" property="og:type" content={type} />
                <meta
                    head-key="og:site_name"
                    property="og:site_name"
                    content="Mampirin Magazine"
                />
                <meta
                    head-key="og:url"
                    property="og:url"
                    content={canonical}
                />
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
                    <h1 className="text-6xl font-black tracking-tighter uppercase">
                        Mampirin Magazine
                    </h1>
                </Link>
                <p className="mt-2 text-xs tracking-[0.3em] text-gray-500 uppercase">
                    Mampir Dulu, Baca Berita
                </p>
            </header>

            {children}

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
                    <Link href="/partnership" className="hover:text-black">
                        Partnership
                    </Link>
                    <Link href="/ads" className="hover:text-black">
                        Ads
                    </Link>
                    <a href="#footer-contact" className="hover:text-black">
                        Contact
                    </a>
                </div>
                <p className="text-xs text-gray-400">
                    &copy; 2026 Mampirin Magazine. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
