import { Link, usePage } from '@inertiajs/react';
import { categoryUrl } from '../lib/articles';

const ACTIVE = 'hover:text-black text-black';
const INACTIVE = 'hover:text-gray-500';

export default function Navbar() {
    const { url, props } = usePage();
    const categories = props.siteCategories ?? [];
    const path = (
        url.split('?')[0].replace(/\/+$/, '') || '/'
    ).toLowerCase();

    const isArticle = path === '/article' || path.startsWith('/article/');
    const linkClass = (isActive) => (isActive ? ACTIVE : INACTIVE);

    return (
        <nav
            aria-label="Main navigation"
            className="relative z-20 mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2 border-b border-gray-300 py-4 text-sm font-bold tracking-widest uppercase"
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
                    Article
                </Link>
                <div className="absolute left-0 z-30 mt-2 hidden w-48 border border-gray-300 bg-white shadow-xl group-hover:block">
                    {categories.length === 0 && (
                        <span className="block px-4 py-3 text-xs text-gray-400">
                            Belum ada kategori
                        </span>
                    )}
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={categoryUrl(category)}
                            className="block border-b border-gray-200 px-4 py-3 text-xs last:border-0 hover:bg-gray-200"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>

            <Link
                href="/write-us"
                className={linkClass(path === '/write-us')}
            >
                Write Us
            </Link>
            <Link href="/ads" className={linkClass(path === '/ads')}>
                Ads
            </Link>

            {/* Tombol Contact untuk Scroll */}
            <a href="#footer-contact" className="hover:text-gray-500">
                Contact
            </a>
        </nav>
    );
}
