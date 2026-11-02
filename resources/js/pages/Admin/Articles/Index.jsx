import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';
import Pagination from '../../../components/Pagination';
import { formatDate } from '../../../lib/articles';

const STATUS_OPTIONS = [
    { value: '', label: 'Semua Status' },
    { value: 'published', label: 'Terbit' },
    { value: 'draft', label: 'Draft' },
];

export default function ArticlesIndex({
    articles,
    categories = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const applyFilters = (event) => {
        event.preventDefault();

        router.get(
            '/admin/articles',
            {
                search: search || undefined,
                category: category || undefined,
                status: status || undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const resetFilters = () => {
        setSearch('');
        setCategory('');
        setStatus('');
        router.get(
            '/admin/articles',
            {},
            { preserveState: true, replace: true },
        );
    };

    const togglePublished = (article) => {
        router.patch(
            `/admin/articles/${article.id}/toggle`,
            {},
            { preserveScroll: true },
        );
    };

    const destroy = (article) => {
        if (
            !window.confirm(
                `Hapus artikel "${article.title}"? Tindakan ini tidak bisa dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/articles/${article.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Artikel">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                    Kelola semua artikel yang tampil di situs.
                </p>
                <Link
                    href="/admin/articles/create"
                    className="bg-black px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                >
                    + Artikel Baru
                </Link>
            </div>

            <form
                onSubmit={applyFilters}
                className="mb-4 grid grid-cols-1 gap-3 border border-gray-300 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4"
            >
                <div>
                    <label
                        htmlFor="search"
                        className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                    >
                        Cari Judul
                    </label>
                    <input
                        id="search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Ketik judul artikel..."
                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="category"
                        className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                    >
                        Kategori
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="w-full border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="status"
                        className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        className="w-full border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
                    >
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-end gap-2">
                    <button
                        type="submit"
                        className="bg-black px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                    >
                        Terapkan
                    </button>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="border border-gray-300 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:border-black"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <div className="border border-gray-300 bg-white">
                {articles.data.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-500">
                        Tidak ada artikel yang cocok dengan filter.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-[10px] tracking-widest text-gray-500 uppercase">
                                <tr>
                                    <th className="px-4 py-3">Judul</th>
                                    <th className="px-4 py-3">Kategori</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Terbit</th>
                                    <th className="px-4 py-3 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {articles.data.map((article) => (
                                    <tr key={article.id}>
                                        <td className="px-4 py-3">
                                            <Link
                                                href={`/article/${article.slug}`}
                                                className="font-bold hover:underline"
                                            >
                                                {article.title}
                                            </Link>
                                            <div className="mt-0.5 text-[10px] text-gray-400">
                                                /{article.slug}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {article.category?.name ?? '-'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePublished(article)
                                                }
                                                title="Klik untuk mengubah status"
                                                className={`px-2 py-1 text-[10px] font-bold uppercase ${
                                                    article.is_published
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                {article.is_published
                                                    ? 'Terbit'
                                                    : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {formatDate(
                                                article.published_at ??
                                                    article.created_at,
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-3 text-[10px] font-bold tracking-widest uppercase">
                                                <Link
                                                    href={`/admin/articles/${article.id}/edit`}
                                                    className="underline hover:no-underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        destroy(article)
                                                    }
                                                    className="text-red-600 underline hover:no-underline"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <Pagination paginator={articles} />
            </div>
        </AdminLayout>
    );
}
