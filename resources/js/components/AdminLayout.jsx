import React, { useEffect, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

const NAV = [
    { href: '/admin', label: 'Dashboard', match: (path) => path === '/admin' },
    {
        href: '/admin/articles',
        label: 'Artikel',
        match: (path) => path.startsWith('/admin/articles'),
    },
    {
        href: '/admin/categories',
        label: 'Kategori',
        match: (path) => path.startsWith('/admin/categories'),
    },
    {
        href: '/admin/submissions',
        label: 'Kiriman Pembaca',
        match: (path) => path.startsWith('/admin/submissions'),
    },
    {
        href: '/admin/ads',
        label: 'Iklan',
        match: (path) => path.startsWith('/admin/ads'),
    },
    {
        href: '/admin/sponsors',
        label: 'Sponsor',
        match: (path) => path.startsWith('/admin/sponsors'),
    },
];

export default function AdminLayout({ title, children }) {
    const { url, props } = usePage();
    const path = url.split('?')[0].replace(/\/+$/, '') || '/';
    const user = props.auth?.user;
    const { flash } = props;

    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = window.localStorage.getItem('admin-dark-mode');
        const initial =
            stored !== null
                ? stored === 'true'
                : window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDark(initial);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.classList.toggle('dark', dark);
        window.localStorage.setItem('admin-dark-mode', String(dark));
    }, [dark, mounted]);

    const logout = () => {
        router.post('/admin/logout');
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900 dark:bg-gray-950 dark:text-white">
            <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="w-full shrink-0 border-b border-gray-300 bg-black text-white md:sticky md:top-0 md:h-screen md:w-64 md:overflow-y-auto md:border-r md:border-b-0 dark:border-gray-800">
                    <div className="px-6 py-6">
                        <Link href="/admin" className="block">
                            <span className="text-2xl font-black tracking-tighter uppercase">
                                Mampirin
                            </span>
                            <span className="mt-1 block text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
                                Panel Admin
                            </span>
                        </Link>
                    </div>

                    <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:flex-col md:overflow-visible">
                        {NAV.map((item) => {
                            const active = item.match(path);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`shrink-0 px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
                                        active
                                            ? 'bg-white text-black dark:bg-gray-100'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden border-t border-gray-800 px-6 py-4 md:block">
                        <Link
                            href="/"
                            className="text-[10px] font-bold tracking-widest text-gray-400 uppercase hover:text-white"
                        >
                            &larr; Lihat Situs
                        </Link>
                    </div>
                </aside>

                {/* Main */}
                <div className="min-w-0 flex-1">
                    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-300 bg-white px-4 py-4 md:px-8 dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDark((value) => !value)}
                                aria-label={
                                    dark
                                        ? 'Aktifkan mode terang'
                                        : 'Aktifkan mode gelap'
                                }
                                title={dark ? 'Mode terang' : 'Mode gelap'}
                                className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-300 bg-gray-100 text-base text-gray-900 transition-colors hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
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
                            <div>
                                <h1 className="text-2xl font-black tracking-tight uppercase">
                                    {title}
                                </h1>
                                <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                                    Mampirin Magazine CMS
                                </p>
                            </div>
                        </div>

                        <div className="ml-auto flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-sm font-bold">
                                    {user?.name}
                                </div>
                                <div className="text-[10px] text-gray-500 dark:text-gray-400">
                                    {user?.email}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={logout}
                                className="border border-black px-3 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                Keluar
                            </button>
                        </div>
                    </header>

                    <main className="p-4 md:p-8">
                        {flash?.success && (
                            <div
                                role="status"
                                className="mb-4 border border-green-600 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-950 dark:text-green-300"
                            >
                                {flash.success}
                            </div>
                        )}
                        {flash?.warning && (
                            <div
                                role="alert"
                                className="mb-4 border border-yellow-500 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-600 dark:bg-yellow-950 dark:text-yellow-300"
                            >
                                {flash.warning}
                            </div>
                        )}
                        {flash?.error && (
                            <div
                                role="alert"
                                className="mb-4 border border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-300"
                            >
                                {flash.error}
                            </div>
                        )}

                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
