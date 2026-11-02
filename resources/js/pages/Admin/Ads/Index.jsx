import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';
import Pagination from '../../../components/Pagination';
import { formatDate } from '../../../lib/articles';

const STATUS_OPTIONS = [
    { value: '', label: 'Semua Status' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Nonaktif' },
];

function placementLabel(placements, value) {
    return placements.find((item) => item.value === value)?.label ?? value;
}

function scheduleLabel(ad) {
    if (!ad.starts_at && !ad.ends_at) {
        return 'Selalu tampil';
    }

    const start = ad.starts_at ? formatDate(ad.starts_at) : 'Sekarang';
    const end = ad.ends_at ? formatDate(ad.ends_at) : 'Seterusnya';

    return `${start} \u2013 ${end}`;
}

export default function AdsIndex({ ads, placements = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [placement, setPlacement] = useState(filters.placement ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const applyFilters = (event) => {
        event.preventDefault();

        router.get(
            '/admin/ads',
            {
                search: search || undefined,
                placement: placement || undefined,
                status: status || undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const resetFilters = () => {
        setSearch('');
        setPlacement('');
        setStatus('');
        router.get('/admin/ads', {}, { preserveState: true, replace: true });
    };

    const toggleActive = (ad) => {
        router.patch(
            `/admin/ads/${ad.id}/toggle`,
            {},
            { preserveScroll: true },
        );
    };

    const destroy = (ad) => {
        if (
            !window.confirm(
                `Hapus iklan "${ad.title}"? Tindakan ini tidak bisa dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/ads/${ad.id}`, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Iklan">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                    Kelola banner dan iklan sidebar. Iklan aktif langsung tampil
                    di situs sesuai jadwal.
                </p>
                <Link
                    href="/admin/ads/create"
                    className="bg-black px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                >
                    + Iklan Baru
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
                        placeholder="Ketik judul iklan..."
                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="placement"
                        className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                    >
                        Penempatan
                    </label>
                    <select
                        id="placement"
                        value={placement}
                        onChange={(event) => setPlacement(event.target.value)}
                        className="w-full border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
                    >
                        <option value="">Semua Penempatan</option>
                        {placements.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
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
                {ads.data.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-500">
                        Tidak ada iklan yang cocok dengan filter.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-[10px] tracking-widest text-gray-500 uppercase">
                                <tr>
                                    <th className="px-4 py-3">Iklan</th>
                                    <th className="px-4 py-3">Penempatan</th>
                                    <th className="px-4 py-3">Jadwal</th>
                                    <th className="px-4 py-3">Urutan</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {ads.data.map((ad) => (
                                    <tr key={ad.id}>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {ad.image_url ? (
                                                    <img
                                                        src={ad.image_url}
                                                        alt={ad.title}
                                                        className="h-12 w-20 border border-gray-200 bg-gray-100 object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-20 items-center justify-center border border-dashed border-gray-300 text-[9px] text-gray-400">
                                                        Tanpa gambar
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold">
                                                        {ad.title}
                                                    </div>
                                                    {ad.target_url && (
                                                        <div className="max-w-xs truncate text-[10px] text-gray-500">
                                                            {ad.target_url}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {placementLabel(
                                                placements,
                                                ad.placement,
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-500">
                                            {scheduleLabel(ad)}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {ad.sort_order}
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                type="button"
                                                onClick={() => toggleActive(ad)}
                                                title="Klik untuk mengubah status"
                                                className={`px-2 py-1 text-[10px] font-bold uppercase ${
                                                    ad.is_active
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                {ad.is_active
                                                    ? 'Aktif'
                                                    : 'Nonaktif'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-3 text-[10px] font-bold tracking-widest uppercase">
                                                <Link
                                                    href={`/admin/ads/${ad.id}/edit`}
                                                    className="underline hover:no-underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => destroy(ad)}
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

                <Pagination paginator={ads} />
            </div>
        </AdminLayout>
    );
}
