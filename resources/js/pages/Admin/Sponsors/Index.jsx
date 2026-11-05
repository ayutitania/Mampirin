import React, { useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';
import DropZone from '../../../components/DropZone';
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

function FieldError({ message }) {
    if (!message) return null;

    return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

const inputClass =
    'w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-black focus:outline-none dark:text-gray-100';
const labelClass =
    'mb-1 block text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase';

function AdApproveForm({ inquiry, placements }) {
    const { errors } = usePage().props;
    const defaultTitle = inquiry.ad_title || inquiry.company;
    const [adTitle, setAdTitle] = useState(defaultTitle);
    const [adImageUrl, setAdImageUrl] = useState(inquiry.ad_image_url ?? '');
    const [adImage, setAdImage] = useState(null);
    const [adTargetUrl, setAdTargetUrl] = useState(inquiry.ad_target_url ?? '');
    const [adPlacement, setAdPlacement] = useState(
        placements[0]?.value ?? 'top',
    );
    const [adStartsAt, setAdStartsAt] = useState('');
    const [adEndsAt, setAdEndsAt] = useState('');
    const [adSortOrder, setAdSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const imageInputRef = useRef(null);

    const resetForm = () => {
        setAdTitle(defaultTitle);
        setAdImageUrl(inquiry.ad_image_url ?? '');
        setAdImage(null);
        setAdTargetUrl(inquiry.ad_target_url ?? '');
        setAdPlacement(placements[0]?.value ?? 'top');
        setAdStartsAt('');
        setAdEndsAt('');
        setAdSortOrder(0);
        setIsActive(true);

        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };

    const approve = (event) => {
        event.preventDefault();

        const data = {
            ad_title: adTitle,
            ad_image_url: adImageUrl,
            ad_target_url: adTargetUrl,
            ad_placement: adPlacement,
            ad_starts_at: adStartsAt || null,
            ad_ends_at: adEndsAt || null,
            ad_sort_order: adSortOrder,
            ad_is_active: isActive ? '1' : '0',
        };

        if (adImage) {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value !== null) {
                    formData.append(key, value);
                }
            });
            formData.append('ad_image', adImage);

            router.post(`/admin/sponsors/${inquiry.id}/approve`, formData, {
                preserveScroll: true,
                onFinish: () => resetForm(),
            });

            return;
        }

        router.post(`/admin/sponsors/${inquiry.id}/approve`, data, {
            preserveScroll: true,
            onFinish: () => resetForm(),
        });
    };

    return (
        <form
            onSubmit={approve}
            className="border-t border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-700"
            noValidate
        >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[10px] font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                    Iklan yang Akan Dibuat
                </h3>
                <span className="text-[10px] text-gray-400">
                    Judul, URL tujuan & gambar sudah terisi dari form sponsor
                    (gambar diunggah sponsor) — langsung masuk tabel iklan
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                    <label
                        htmlFor={`ad-title-${inquiry.id}`}
                        className={labelClass}
                    >
                        Judul Iklan *
                    </label>
                    <input
                        id={`ad-title-${inquiry.id}`}
                        type="text"
                        value={adTitle}
                        onChange={(event) => setAdTitle(event.target.value)}
                        className={inputClass}
                    />
                    <FieldError message={errors.ad_title} />
                </div>

                <div>
                    <label
                        htmlFor={`ad-placement-${inquiry.id}`}
                        className={labelClass}
                    >
                        Penempatan *
                    </label>
                    <select
                        id={`ad-placement-${inquiry.id}`}
                        value={adPlacement}
                        onChange={(event) => setAdPlacement(event.target.value)}
                        className={inputClass}
                    >
                        {placements.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    <FieldError message={errors.ad_placement} />
                </div>

                <div>
                    <label
                        htmlFor={`ad-url-${inquiry.id}`}
                        className={labelClass}
                    >
                        URL Tujuan Iklan
                    </label>
                    <input
                        id={`ad-url-${inquiry.id}`}
                        type="text"
                        value={adTargetUrl}
                        onChange={(event) => setAdTargetUrl(event.target.value)}
                        placeholder="https://instagram.com/... atau /partnership"
                        className={inputClass}
                    />
                    <FieldError message={errors.ad_target_url} />
                </div>

                <div>
                    <label
                        htmlFor={`ad-image-${inquiry.id}`}
                        className={labelClass}
                    >
                        URL Gambar
                    </label>
                    <input
                        id={`ad-image-${inquiry.id}`}
                        type="text"
                        value={adImageUrl}
                        onChange={(event) => setAdImageUrl(event.target.value)}
                        placeholder="https://... atau unggah di bawah"
                        className={inputClass}
                    />
                    {adImageUrl && (
                        <img
                            src={adImageUrl}
                            alt="Pratinjau gambar iklan"
                            className="mt-2 h-24 w-full max-w-[240px] border border-gray-300 bg-white object-cover dark:border-gray-700 dark:bg-gray-800"
                        />
                    )}
                    <FieldError message={errors.ad_image_url} />
                </div>

                <div>
                    <label
                        htmlFor={`ad-image-file-${inquiry.id}`}
                        className={labelClass}
                    >
                        Unggah Gambar (opsional)
                    </label>
                    <DropZone
                        inputRef={imageInputRef}
                        onFile={(file) => setAdImage(file)}
                        accept="image/jpeg,image/png,image/webp"
                    >
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Seret &amp; lepas gambar di sini, atau klik tombol
                            di bawah.
                        </p>
                    </DropZone>
                    <FieldError message={errors.ad_image} />
                </div>

                <div>
                    <label
                        htmlFor={`ad-sort-${inquiry.id}`}
                        className={labelClass}
                    >
                        Urutan Tampil
                    </label>
                    <input
                        id={`ad-sort-${inquiry.id}`}
                        type="number"
                        min="0"
                        value={adSortOrder}
                        onChange={(event) => setAdSortOrder(event.target.value)}
                        className={inputClass}
                    />
                    <FieldError message={errors.ad_sort_order} />
                </div>

                <div>
                    <label
                        htmlFor={`ad-start-${inquiry.id}`}
                        className={labelClass}
                    >
                        Mulai Tayang
                    </label>
                    <input
                        id={`ad-start-${inquiry.id}`}
                        type="datetime-local"
                        value={adStartsAt}
                        onChange={(event) => setAdStartsAt(event.target.value)}
                        className={inputClass}
                    />
                    <FieldError message={errors.ad_starts_at} />
                </div>

                <div>
                    <label
                        htmlFor={`ad-end-${inquiry.id}`}
                        className={labelClass}
                    >
                        Berakhir
                    </label>
                    <input
                        id={`ad-end-${inquiry.id}`}
                        type="datetime-local"
                        value={adEndsAt}
                        onChange={(event) => setAdEndsAt(event.target.value)}
                        className={inputClass}
                    />
                    <FieldError message={errors.ad_ends_at} />
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(event) => setIsActive(event.target.checked)}
                        className="h-4 w-4 border-gray-400 dark:border-gray-600"
                    />
                    <span className="font-bold">Aktifkan iklan</span>
                </label>

                <button
                    type="submit"
                    className="bg-black px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                >
                    Setujui &amp; Buat Iklan
                </button>
            </div>
        </form>
    );
}

function SponsorCard({ inquiry, placements, statuses, bankAccount = {} }) {
    // Tetap tampilkan form jika pengajuan sudah "approved" tetapi iklannya
    // belum pernah dibuat (mis. status diubah manual sebelum ada iklan).
    const showApprove = inquiry.status !== 'approved' || !inquiry.ad;

    const updateStatus = (nextStatus) => {
        router.patch(
            `/admin/sponsors/${inquiry.id}/status`,
            { status: nextStatus },
            { preserveScroll: true },
        );
    };

    const destroy = () => {
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

    const packageName = inquiry.package?.name ?? 'paket kemitraan';

    const contactTemplate = [
        `Halo ${inquiry.contact_name},`,
        '',
        `Terima kasih atas pengajuan kemitraan dari ${inquiry.company} untuk paket ${packageName}.`,
        '',
        'Untuk melanjutkan, silakan lakukan pembayaran ke rekening berikut:',
        `Bank: ${bankAccount.bank_name ?? '-'}`,
        `No. Rekening: ${bankAccount.account_number ?? '-'}`,
        `Atas Nama: ${bankAccount.account_holder ?? '-'}`,
        `Cabang: ${bankAccount.branch ?? '-'}`,
        '',
        'Setelah pembayaran, mohon kirimkan bukti transfer ke email ini. Iklan akan langsung',
        'tayang setelah disetujui oleh tim redaksi.',
        '',
        'Salam,',
        'Tim Redaksi Mampirin Magazine',
    ].join('\n');

    const chatTemplate = [
        `Halo ${inquiry.contact_name} 👋`,
        '',
        `Terima kasih sudah mengajukan kemitraan Mampirin Magazine untuk paket ${packageName}.`,
        '',
        'Untuk pembayaran, silakan transfer ke:',
        `🏦 ${bankAccount.bank_name ?? '-'}`,
        `💳 ${bankAccount.account_number ?? '-'}`,
        `👤 a.n. ${bankAccount.account_holder ?? '-'}`,
        '',
        'Setelah transfer, kirim bukti ke sini ya. Iklan langsung tayang setelah disetujui ✅',
        '',
        'Salam, Tim Mampirin',
    ].join('\n');

    const emailHref = `mailto:${inquiry.email}?subject=${encodeURIComponent(
        `Kemitraan Iklan Mampirin Magazine - ${inquiry.company}`,
    )}&body=${encodeURIComponent(contactTemplate)}`;

    const phoneDigits = (inquiry.phone ?? '').replace(/\D/g, '');
    const whatsAppHref = phoneDigits
        ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(chatTemplate)}`
        : null;

    const copyTemplate = async () => {
        try {
            await navigator.clipboard.writeText(chatTemplate);
            window.alert('Template chat berhasil disalin.');
        } catch {
            window.alert('Gagal menyalin template. Silakan salin manual.');
        }
    };

    return (
        <article className="border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 p-5 dark:border-gray-700">
                <div>
                    <h2 className="text-lg font-black">{inquiry.company}</h2>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {inquiry.contact_name}
                        {inquiry.phone ? ` • ${inquiry.phone}` : ''}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs">
                        <a
                            href={`mailto:${inquiry.email}`}
                            className="text-gray-700 underline hover:text-black dark:text-gray-300"
                        >
                            {inquiry.email}
                        </a>
                        {inquiry.phone && (
                            <a
                                href={`tel:${inquiry.phone}`}
                                className="text-gray-700 underline hover:text-black dark:text-gray-300"
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
                            'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                    >
                        {statuses.find((item) => item.value === inquiry.status)
                            ?.label ?? inquiry.status}
                    </span>
                    <div className="mt-2 text-[10px] text-gray-500 dark:text-gray-400">
                        {formatDate(inquiry.created_at)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3">
                <div className="md:col-span-2">
                    <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                        Pesan
                    </div>
                    <p className="border-l-[3px] border-gray-300 pl-4 font-serif text-sm leading-relaxed whitespace-pre-line text-gray-700 dark:border-gray-700 dark:text-gray-300">
                        {inquiry.message}
                    </p>
                </div>

                <div className="md:col-span-1">
                    <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                        Paket
                    </div>
                    {inquiry.package ? (
                        <div className="border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700">
                            <div className="text-sm font-bold">
                                {inquiry.package.name}
                            </div>
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {formatRupiah(inquiry.package.price)}{' '}
                                {inquiry.package.price_suffix}
                            </div>
                        </div>
                    ) : (
                        <div className="border border-dashed border-gray-300 p-4 text-xs text-gray-400 dark:border-gray-700">
                            Belum memilih paket
                        </div>
                    )}
                </div>
            </div>

            {showApprove && (
                <AdApproveForm inquiry={inquiry} placements={placements} />
            )}

            <div className="flex flex-wrap gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-700 dark:bg-gray-700">
                <a
                    href={emailHref}
                    className="border border-gray-400 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase hover:border-black dark:border-gray-600"
                >
                    Hubungi via Email
                </a>
                {whatsAppHref && (
                    <a
                        href={whatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-green-600 px-3 py-1.5 text-[10px] font-bold tracking-widest text-green-700 uppercase hover:bg-green-600 hover:text-white"
                    >
                        Chat WhatsApp
                    </a>
                )}
                <button
                    type="button"
                    onClick={copyTemplate}
                    className="border border-gray-400 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase hover:border-black dark:border-gray-600"
                >
                    Salin Template Chat
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-700 dark:bg-gray-700">
                <div className="flex flex-wrap gap-2">
                    {statuses
                        .filter((item) => item.value !== 'approved')
                        .map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => updateStatus(item.value)}
                                disabled={inquiry.status === item.value}
                                className={`border px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors ${
                                    inquiry.status === item.value
                                        ? 'cursor-default border-black bg-black text-white'
                                        : 'border-gray-300 bg-white hover:border-black dark:border-gray-700 dark:bg-gray-800'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    {inquiry.status === 'approved' && (
                        <>
                            <span className="text-[10px] font-bold tracking-widest text-green-700 uppercase">
                                Sudah Disetujui
                            </span>
                            {inquiry.ad && (
                                <Link
                                    href={`/admin/ads/${inquiry.ad.id}/edit`}
                                    className="border border-gray-400 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase hover:border-black dark:border-gray-600"
                                >
                                    Edit Iklan
                                </Link>
                            )}
                        </>
                    )}
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
    );
}

export default function SponsorsIndex({
    inquiries,
    placements = [],
    statuses = [],
    counts = {},
    filters = {},
    bankAccount = {},
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

    return (
        <AdminLayout title="Sponsor Masuk">
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
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
                            : 'border-gray-300 bg-white hover:border-black dark:border-gray-700 dark:bg-gray-800'
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
                                : 'border-gray-300 bg-white hover:border-black dark:border-gray-700 dark:bg-gray-800'
                        }`}
                    >
                        {item.label} ({counts[item.value] ?? 0})
                    </button>
                ))}
            </div>

            <form
                onSubmit={applyFilters}
                className="mb-4 flex flex-col gap-3 border border-gray-300 bg-white p-4 sm:flex-row sm:items-end dark:border-gray-700 dark:bg-gray-800"
            >
                <div className="flex-1">
                    <label
                        htmlFor="search"
                        className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400"
                    >
                        Cari Perusahaan / Kontak / Email
                    </label>
                    <input
                        id="search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Ketik nama perusahaan atau email..."
                        className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none dark:border-gray-700 dark:text-gray-100"
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
                        className="border border-gray-300 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:border-black dark:border-gray-700"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                {inquiries.data.length === 0 && (
                    <div className="border border-gray-300 bg-white px-5 py-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                        Belum ada pengajuan sponsor yang cocok.
                    </div>
                )}

                {inquiries.data.map((inquiry) => (
                    <SponsorCard
                        key={inquiry.id}
                        inquiry={inquiry}
                        placements={placements}
                        statuses={statuses}
                        bankAccount={bankAccount}
                    />
                ))}
            </div>

            <Pagination paginator={inquiries} />
        </AdminLayout>
    );
}
