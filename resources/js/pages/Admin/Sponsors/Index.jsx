import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';
import Pagination from '../../../components/Pagination';
import { formatDate } from '../../../lib/articles';

const BADGE_CLASS = {
    pending: 'bg-yellow-100 text-yellow-800',
    contacted: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
};

const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value ?? 0);

export default function SponsorsIndex({
    inquiries,
    statuses = [],
    counts = {},
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const applyFilters = (event) => {
        event.preventDefault();

        router.get(
            '/admin/sponsors',
            {
                search: search || undefined,
                status: status || undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const resetFilters = () => {
        setSearch('');
        setStatus('');
        router.get(
            '/admin/sponsors',
            {},
            { preserveState: true, replace: true },
        );
    };

    const updateStatus = (inquiry, nextStatus) => {
        router.patch(
            `/admin/sponsors/${inquiry.id}/status`,
            { status: nextStatus },
            { preserveScroll: true },
        );
    };

    const destroy = (inquiry) => {
        if (
            !window.confirm(
                `Hapus pengajuan dari "${inquiry.company}"? Tindakan ini tidak bisa dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/sponsors/${inquiry.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Sponsor Masuk">
            <p className="mb-6 text-sm text-gray-600">
                Pengajuan kemitraan yang dikirim lewat halaman /partnership.
                Tindak lanjuti dan ubah statusnya di sini.
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => {
                        setStatus('');
                        router.get(
                            '/admin/sponsors',
                            { search: search || undefined },
                            { preserveState: true, replace: true },
                        );
                    }}
                    className={`border px-3 py-2 text-[10px] font-bold tracking-widest uppercase ${
                        status === ''
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white hover:border-black'
                    }`}
                >
                    Semua ({inquiries.total})
                </button>
                {statuses.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                            setStatus(item.value);
                            router.get(
                                '/admin/sponsors',
                                {
                                    search: search || undefined,
                                    status: item.value,
                                },
                                { preserveState: true, replace: true },
                            );
                        }}
                        className={`border px-3 py-2 text-[10px] font-bold tracking-widest uppercase ${
                            status === item.value
                                ? 'border-black bg-black text-white'
                                : 'border-gray-300 bg-white hover:border-black'
                        }`}
                    >
                        {item.label} ({counts[item.value] ?? 0})
                    </button>
                ))}
            </div>

            <form
                onSubmit={applyFilters}
                className="mb-4 flex flex-col gap-3 border border-gray-300 bg-white p-4 sm:flex-row sm:items-end"
            >
                <div className="flex-1">
                    <label
                        htmlFor="search"
                        className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                    >
                        Cari Perusahaan / Kontak / Email
                    </label>
                    <input
                        id="search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Ketik nama perusahaan atau email..."
                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-black px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                    >
                        Cari
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

            <div className="space-y-4">
                {inquiries.data.length === 0 && (
                    <div className="border border-gray-300 bg-white px-5 py-10 text-center text-sm text-gray-500">
                        Belum ada pengajuan sponsor yang cocok.
                    </div>
                )}

                {inquiries.data.map((inquiry) => (
                    <article
                        key={inquiry.id}
                        className="border border-gray-300 bg-white"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 p-5">
                            <div>
                                <h2 className="text-lg font-black">
                                    {inquiry.company}
                                </h2>
                                <p className="mt-1 text-xs text-gray-500">
                                    {inquiry.contact_name}
                                    {inquiry.phone
                                        ? ` \u2022 ${inquiry.phone}`
                                        : ''}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-3 text-xs">
                                    <a
                                        href={`mailto:${inquiry.email}`}
                                        className="text-gray-700 underline hover:text-black"
                                    >
                                        {inquiry.email}
                                    </a>
                                    {inquiry.phone && (
                                        <a
                                            href={`tel:${inquiry.phone}`}
                                            className="text-gray-700 underline hover:text-black"
                                        >
                                            Telepon
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="text-right">
                                <span
                                    className={`inline-block px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${
                                        BADGE_CLASS[inquiry.status] ??
                                        'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {statuses.find(
                                        (item) => item.value === inquiry.status,
                                    )?.label ?? inquiry.status}
                                </span>
                                <div className="mt-2 text-[10px] text-gray-500">
                                    {formatDate(inquiry.created_at)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3">
                            <div className="md:col-span-2">
                                <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                    Pesan
                                </div>
                                <p className="border-l-[3px] border-gray-300 pl-4 font-serif text-sm leading-relaxed whitespace-pre-line text-gray-700">
                                    {inquiry.message}
                                </p>
                            </div>

                            <div className="md:col-span-1">
                                <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                    Paket
                                </div>
                                {inquiry.package ? (
                                    <div className="border border-gray-200 bg-gray-50 p-4">
                                        <div className="text-sm font-bold">
                                            {inquiry.package.name}
                                        </div>
                                        <div className="mt-1 text-xs text-gray-500">
                                            {formatRupiah(
                                                inquiry.package.price,
                                            )}{' '}
                                            {inquiry.package.price_suffix}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border border-dashed border-gray-300 p-4 text-xs text-gray-400">
                                        Belum memilih paket
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-5 py-3">
                            <div className="flex flex-wrap gap-2">
                                {statuses.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() =>
                                            updateStatus(inquiry, item.value)
                                        }
                                        disabled={inquiry.status === item.value}
                                        className={`border px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors ${
                                            inquiry.status === item.value
                                                ? 'cursor-default border-black bg-black text-white'
                                                : 'border-gray-300 bg-white hover:border-black'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => destroy(inquiry)}
                                className="text-[10px] font-bold tracking-widest text-red-600 uppercase underline hover:no-underline"
                            >
                                Hapus
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <Pagination paginator={inquiries} />
        </AdminLayout>
    );
}
