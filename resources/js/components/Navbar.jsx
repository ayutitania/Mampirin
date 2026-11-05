import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { categoryUrl } from '../lib/articles';

const ACTIVE =
    'hover:text-black dark:hover:text-white text-black dark:text-white dark:hover:text-white';
const INACTIVE = 'hover:text-gray-500 dark:text-gray-300 dark:hover:text-white';

export default function Navbar() {
    const { url, props } = usePage();
    const categories = props.siteCategories ?? [];
    const path = (url.split('?')[0].replace(/\/+$/, '') || '/').toLowerCase();

    const isArticle = path === '/article' || path.startsWith('/article/');

    const showSearch =
        path === '/' || path === '/article' || path.startsWith('/article/');

    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

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
    const linkClass = (isActive) => (isActive ? ACTIVE : INACTIVE);

    return (
        <nav
            aria-label="Main navigation"
            className="relative z-20 mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b border-gray-300 py-4 text-sm font-bold tracking-widest uppercase dark:border-gray-700"
        >
            <Link href="/" className={linkClass(path === '/')}>
                Home
            </Link>
            <Link href="/about" className={linkClass(path === '/about')}>
                About
            </Link>

            {/* Dropdown Article */}
            <div className="group relative cursor-pointer">
                <Link
                    href="/article"
                    className={`${linkClass(isArticle)} flex items-center`}
                >
                    ARTICLE
                </Link>
                <div className="absolute left-0 z-30 mt-2 hidden w-48 border border-gray-300 bg-white shadow-xl group-hover:block dark:border-gray-700 dark:bg-gray-800">
                    {categories.length === 0 && (
                        <span className="block px-4 py-3 text-xs text-gray-400 dark:text-gray-400 dark:text-gray-500">
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

            <Link href="/write-us" className={linkClass(path === '/write-us')}>
                Write Us
            </Link>
            <Link href="/ads" className={linkClass(path === '/ads')}>
                Ads
            </Link>

            {/* Tombol Contact untuk Scroll */}
            <a
                href="#footer-contact"
                className="hover:text-gray-500 dark:text-gray-400"
            >
                Contact
            </a>

            {showSearch && (
                <form
                    role="search"
                    action="/search"
                    method="get"
                    className="absolute top-1/2 right-16 flex -translate-y-1/2 items-center"
                >
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
                            className="w-28 border border-gray-300 bg-white py-1 pr-2 pl-7 text-xs text-gray-900 transition-all placeholder:text-gray-500 focus:w-40 focus:border-black focus:outline-none dark:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:text-gray-400 dark:placeholder:text-gray-400"
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
            <button
                type="button"
                onClick={() => setDark((value) => !value)}
                aria-label={
                    dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'
                }
                title={dark ? 'Mode terang' : 'Mode gelap'}
                className="absolute top-1/2 right-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-gray-300 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
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
        </nav>
    );
}
