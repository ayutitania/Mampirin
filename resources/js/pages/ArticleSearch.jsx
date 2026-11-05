import React, { useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '../components/AppLayout';
import { articleUrl, categoryUrl, formatDate } from '../lib/articles';

export default function ArticleSearch({ query = '', results = [] }) {
    const { flash } = usePage().props;
    const inputRef = useRef(null);

    const submit = (event) => {
        event.preventDefault();
        const value = inputRef.current?.value?.trim() ?? '';
        router.get('/search', { q: value || undefined }, { preserveState: true });
    };

    return (
        <AppLayout
            title={query ? `Pencarian: ${query}` : 'Pencarian Artikel'}
            description="Cari artikel di Mampirin Magazine berdasarkan judul atau isi."
        >
            <div className="mx-auto max-w-4xl border-t-[4px] border-black dark:border-gray-400 pt-8">
                <div className="mb-4 w-max bg-black px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                    Pencarian
                </div>
                <h2 className="mb-6 text-[3rem] leading-none font-black tracking-tighter uppercase">
                    Cari Artikel
                </h2>

                <form
                    role="search"
                    onSubmit={submit}
                    className="mb-10 flex flex-col gap-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:flex-row sm:items-end"
                >
                    <div className="flex-1">
                        <label
                            htmlFor="search-q"
                            className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase"
                        >
                            Kata Kunci
                        </label>
                        <input
                            ref={inputRef}
                            id="search-q"
                            type="search"
                            defaultValue={query}
                            placeholder="Ketik judul atau isi artikel..."
                            aria-label="Kata kunci pencarian"
                            className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:border-black dark:border-gray-400 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-black px-5 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                    >
                        Cari
                    </button>
                </form>

                {query === '' ? (
                    <p className="border-b border-gray-300 dark:border-gray-700 pb-6 font-serif text-sm text-gray-500 dark:text-gray-400">
                        Masukkan kata kunci untuk mencari artikel di Mampirin
                        Magazine.
                    </p>
                ) : results.length === 0 ? (
                    <div className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-5 py-10 text-center">
                        <p className="font-serif text-sm text-gray-600 dark:text-gray-300">
                            Tidak ada artikel yang cocok dengan "
                            <span className="font-bold">{query}</span>".
                        </p>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Coba kata kunci lain atau jelajahi kategori.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <Link
                                href="/article/category/entertainment"
                                className="border border-black dark:border-gray-400 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black dark:hover:bg-gray-700 hover:text-white"
                            >
                                Entertainment
                            </Link>
                            <Link
                                href="/article/category/history"
                                className="border border-black dark:border-gray-400 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black dark:hover:bg-gray-700 hover:text-white"
                            >
                                History
                            </Link>
                            <Link
                                href="/article/category/lifestyle"
                                className="border border-black dark:border-gray-400 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black dark:hover:bg-gray-700 hover:text-white"
                            >
                                Lifestyle
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="mb-6 text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                            {results.length} hasil untuk "{query}"
                        </p>
                        <div className="space-y-6">
                            {results.map((article) => (
                                <article
                                    key={article.id}
                                    className="group flex gap-4 border-b border-gray-300 dark:border-gray-700 pb-6 last:border-0"
                                >
                                    <div className="h-24 w-36 flex-shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        <Link href={articleUrl(article)}>
                                            {article.image_url && (
                                                <img
                                                    src={article.image_url}
                                                    alt={article.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            )}
                                        </Link>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="mb-1 text-[9px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                                            {article.category?.name ?? 'Artikel'}{' '}
                                            &bull; {formatDate(article.published_at)}
                                        </div>
                                        <Link href={articleUrl(article)}>
                                            <h3 className="mb-1 text-lg leading-tight font-black group-hover:underline">
                                                {article.title}
                                            </h3>
                                        </Link>
                                        <p className="line-clamp-2 font-serif text-sm text-gray-600 dark:text-gray-300">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
