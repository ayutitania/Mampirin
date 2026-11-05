import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';

export default function CategoriesIndex({ categories = [] }) {
    const destroy = (category) => {
        if (
            !window.confirm(
                `Hapus kategori "${category.name}"? Tindakan ini tidak bisa dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/categories/${category.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Kategori">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Kategori dipakai oleh menu navigasi dan halaman rubrik.
                </p>
                <Link
                    href="/admin/categories/create"
                    className="bg-black px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                >
                    + Kategori Baru
                </Link>
            </div>

            <div className="border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
                {categories.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                        Belum ada kategori. Buat kategori pertama kamu.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-[10px] tracking-widest text-gray-500 uppercase dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="w-16 px-4 py-3">Urutan</th>
                                    <th className="px-4 py-3">Nama</th>
                                    <th className="px-4 py-3">Slug</th>
                                    <th className="px-4 py-3">Artikel</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                                            {category.sort_order}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {category.image_url ? (
                                                    <img
                                                        src={category.image_url}
                                                        alt={category.name}
                                                        className="h-10 w-14 border border-gray-200 object-cover dark:border-gray-700"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-14 border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-700" />
                                                )}
                                                <div>
                                                    <div className="font-bold">
                                                        {category.name}
                                                    </div>
                                                    <div className="max-w-md truncate text-xs text-gray-500 dark:text-gray-400">
                                                        {category.description ??
                                                            'Belum ada deskripsi'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                                            {category.slug}
                                        </td>
                                        <td className="px-4 py-3">
                                            {category.articles_count ?? 0}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 text-[10px] font-bold uppercase ${
                                                    category.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                                }`}
                                            >
                                                {category.is_active
                                                    ? 'Aktif'
                                                    : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-3 text-[10px] font-bold tracking-widest uppercase">
                                                <Link
                                                    href={`/admin/categories/${category.id}/edit`}
                                                    className="underline hover:no-underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        destroy(category)
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
            </div>

            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Kategori yang masih memiliki artikel tidak dapat dihapus.
                Pindahkan artikelnya terlebih dahulu.
            </p>
        </AdminLayout>
    );
}
