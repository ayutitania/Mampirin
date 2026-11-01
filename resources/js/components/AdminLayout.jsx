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
];

export default function AdminLayout({ title, children }) {
    const { url, props } = usePage();
    const path = url.split('?')[0].replace(/\/+$/, '') || '/';
    const user = props.auth?.user;
    const { flash } = props;

    const logout = () => {
        router.post('/admin/logout');
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
            <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="w-full shrink-0 border-b border-gray-300 bg-black text-white md:min-h-screen md:w-64 md:border-r md:border-b-0">
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
                                            ? 'bg-white text-black'
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
                    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-300 bg-white px-4 py-4 md:px-8">
                        <div>
                            <h1 className="text-2xl font-black tracking-tight uppercase">
                                {title}
                            </h1>
                            <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                Mampirin Magazine CMS
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-sm font-bold">
                                    {user?.name}
                                </div>
                                <div className="text-[10px] text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={logout}
                                className="border border-black px-3 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white"
                            >
                                Keluar
                            </button>
                        </div>
                    </header>

                    <main className="p-4 md:p-8">
                        {flash?.success && (
                            <div
                                role="status"
                                className="mb-4 border border-green-600 bg-green-50 px-4 py-3 text-sm text-green-800"
                            >
                                {flash.success}
                            </div>
                        )}
                        {flash?.error && (
                            <div
                                role="alert"
                                className="mb-4 border border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800"
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
