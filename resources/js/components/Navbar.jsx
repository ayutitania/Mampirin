import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { categoryUrl } from '../lib/articles';

const ACTIVE =
    'hover:text-black dark:hover:text-white text-black dark:text-white dark:hover:text-white';
const INACTIVE = 'hover:text-gray-500 dark:text-gray-300 dark:hover:text-white';

const NAV_LINKS = [
    { href: '/', label: 'Beranda', match: (path) => path === '/' },
    { href: '/about', label: 'Tentang', match: (path) => path === '/about' },
    {
        href: '/write-us',
        label: 'Kirim Tulisan',
        match: (path) => path === '/write-us',
    },
    { href: '/ads', label: 'Iklan', match: (path) => path === '/ads' },
];

export default function Navbar() {
    const { url, props } = usePage();
    const categories = props.siteCategories ?? [];
    const path = (url.split('?')[0].replace(/\/+$/, '') || '/').toLowerCase();

    const isArticle = path === '/article' || path.startsWith('/article/');
    const showSearch =
        path === '/' || path === '/article' || path.startsWith('/article/');

    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileArticleOpen, setMobileArticleOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = window.localStorage.getItem('site-dark-mode');
        const initial =
            stored !== null
                ? stored === 'true'
                : window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDark(initial);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.classList.toggle('dark', dark);
        window.localStorage.setItem('site-dark-mode', String(dark));
    }, [dark, mounted]);

    // Tutup menu seluler setiap kali halaman berubah.
    useEffect(() => {
        setMenuOpen(false);
        setMobileArticleOpen(false);
    }, [url]);

    const linkClass = (isActive) => (isActive ? ACTIVE : INACTIVE);

    const darkButton = (
        <button
            type="button"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            title={dark ? 'Mode terang' : 'Mode gelap'}
            className="flex h-9 w-9 items-center justify-center border border-gray-300 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        >
            {mounted && dark ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );

    return (
        <nav
            aria-label="Navigasi utama"
            className="relative z-20 mb-6 border-b border-gray-300 dark:border-gray-700"
        >
            <div className="relative flex min-h-12 items-center justify-center py-3">
                {/* Menu desktop */}
                <div className="hidden items-center gap-x-6 gap-y-2 text-sm font-bold tracking-widest uppercase md:flex">
                    <Link href="/" className={linkClass(path === '/')}>
                        Beranda
                    </Link>
                    <Link
                        href="/about"
                        className={linkClass(path === '/about')}
                    >
                        Tentang
                    </Link>

                    {/* Dropdown Artikel */}
                    <div className="group relative">
                        <Link
                            href="/article"
                            className={`${linkClass(isArticle)} flex items-center`}
                            aria-haspopup="true"
                        >
                            Artikel
                        </Link>
                        <div className="invisible absolute top-full left-0 z-30 w-56 pt-2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                            <div className="border border-gray-300 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                                {categories.length === 0 && (
                                    <span className="block px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                                        Belum ada kategori
                                    </span>
                                )}
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={categoryUrl(category)}
                                        className="block border-b border-gray-200 px-4 py-3 text-xs text-gray-800 last:border-0 hover:bg-gray-200 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/write-us"
                        className={linkClass(path === '/write-us')}
                    >
                        Kirim Tulisan
                    </Link>
                    <Link href="/ads" className={linkClass(path === '/ads')}>
                        Iklan
                    </Link>

                    <a
                        href="#footer-contact"
                        className="hover:text-gray-500 dark:text-gray-400"
                    >
                        Kontak
                    </a>
                </div>

                {/* Pencarian & mode gelap desktop */}
                <div className="absolute right-0 hidden items-center gap-2 md:flex">
                    {showSearch && (
                        <form role="search" action="/search" method="get">
                            <label htmlFor="nav-search" className="sr-only">
                                Cari artikel
                            </label>
                            <div className="relative">
                                <input
                                    id="nav-search"
                                    type="search"
                                    name="q"
                                    placeholder="Cari..."
                                    aria-label="Cari artikel"
                                    className="w-28 border border-gray-300 bg-white py-1 pr-2 pl-7 text-xs text-gray-900 transition-all placeholder:text-gray-500 focus:w-40 focus:border-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    className="pointer-events-none absolute top-1/2 left-2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                >
                                    <circle cx="8.5" cy="8.5" r="5.5" />
                                    <line x1="12.5" y1="12.5" x2="17" y2="17" />
                                </svg>
                            </div>
                        </form>
                    )}
                    {darkButton}
                </div>

                {/* Kontrol mobile */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((value) => !value)}
                    aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    className="absolute left-0 flex h-9 w-9 items-center justify-center border border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 md:hidden"
                >
                    {menuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase md:hidden dark:text-gray-400">
                    Menu
                </span>

                <div className="absolute right-0 md:hidden">{darkButton}</div>
            </div>

            {/* Menu seluler */}
            {menuOpen && (
                <div
                    id="mobile-menu"
                    className="border-t border-gray-300 bg-white pb-4 md:hidden dark:border-gray-700 dark:bg-gray-900"
                >
                    <div className="flex flex-col text-sm font-bold tracking-widest uppercase">
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${linkClass(item.match(path))} border-b border-gray-200 px-4 py-3 dark:border-gray-700`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <button
                            type="button"
                            onClick={() =>
                                setMobileArticleOpen((value) => !value)
                            }
                            aria-expanded={mobileArticleOpen}
                            className={`${linkClass(isArticle)} flex items-center justify-between border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700`}
                        >
                            <span>Artikel</span>
                            <span aria-hidden="true">
                                {mobileArticleOpen ? '−' : '+'}
                            </span>
                        </button>

                        {mobileArticleOpen && (
                            <div className="border-b border-gray-200 bg-gray-50 py-1 dark:border-gray-700 dark:bg-gray-800">
                                <Link
                                    href="/article"
                                    className="block px-8 py-2 text-xs text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    Semua Artikel
                                </Link>
                                {categories.length === 0 && (
                                    <span className="block px-8 py-2 text-xs text-gray-500 dark:text-gray-400">
                                        Belum ada kategori
                                    </span>
                                )}
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={categoryUrl(category)}
                                        className="block px-8 py-2 text-xs text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <a
                            href="#footer-contact"
                            onClick={() => setMenuOpen(false)}
                            className="border-b border-gray-200 px-4 py-3 hover:text-gray-500 dark:border-gray-700 dark:text-gray-300"
                        >
                            Kontak
                        </a>
                    </div>

                    {showSearch && (
                        <form
                            role="search"
                            action="/search"
                            method="get"
                            className="px-4 pt-4"
                        >
                            <label htmlFor="mobile-search" className="sr-only">
                                Cari artikel
                            </label>
                            <input
                                id="mobile-search"
                                type="search"
                                name="q"
                                placeholder="Cari artikel..."
                                aria-label="Cari artikel"
                                className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                            />
                        </form>
                    )}
                </div>
            )}
        </nav>
    );
}
