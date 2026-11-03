import React, { useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';
import Pagination from '../../../components/Pagination';
import { formatDate } from '../../../lib/articles';

const BADGE_CLASS = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
};

function SubmissionCard({ submission, categories, statuses }) {
    const [categoryId, setCategoryId] = useState(
        categories[0]?.id ? String(categories[0].id) : '',
    );
    const [publishNow, setPublishNow] = useState(true);
    const [featureIt, setFeatureIt] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    const coverInputRef = useRef(null);

    const statusLabel =
        statuses.find((item) => item.value === submission.status)?.label ??
        submission.status;
    const isApproved = Boolean(submission.article_id);

    const selectCover = (event) => {
        setCoverImage(event.target.files?.[0] ?? null);
    };

    const clearCover = () => {
        setCoverImage(null);

        if (coverInputRef.current) {
            coverInputRef.current.value = '';
        }
    };

    const approve = () => {
        if (!categoryId) {
            window.alert(
                'Pilih kategori terlebih dahulu sebelum menyetujui artikel.',
            );

            return;
        }

        const formData = new FormData();
        formData.append('category_id', categoryId);
        formData.append('is_published', publishNow ? '1' : '0');
        formData.append('is_featured', featureIt ? '1' : '0');

        if (coverImage) {
            formData.append('article_image', coverImage);
        }

        router.patch(
            `/admin/submissions/${submission.id}/approve`,
            formData,
            { preserveScroll: true },
        );
    };

    const reject = () => {
        if (
            !window.confirm(
                `Tolak kiriman "${submission.title}"? Kiriman bisa disetujui lagi nanti.`,
            )
        ) {
            return;
        }

        router.patch(
            `/admin/submissions/${submission.id}/reject`,
            {},
            { preserveScroll: true },
        );
    };

    return (
        <article className="border border-gray-300 bg-white">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 p-5">
                <div>
                    <h2 className="text-lg font-black">{submission.title}</h2>
                    <p className="mt-1 text-xs text-gray-500">
                        {submission.writer_name} &bull;{' '}
                        {submission.writer_email}
                        {submission.writer_phone
                            ? ` \u2022 ${submission.writer_phone}`
                            : ''}
                    </p>
                </div>
                <div className="text-right">
                    <span
                        className={`inline-block px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${
                            BADGE_CLASS[submission.status] ??
                            'bg-gray-200 text-gray-700'
                        }`}
                    >
                        {statusLabel}
                    </span>
                    <div className="mt-2 text-[10px] text-gray-500">
                        {formatDate(submission.created_at)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3">
                <div className="md:col-span-2">
                    <details>
                        <summary className="cursor-pointer text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-black">
                            Lihat isi tulisan
                        </summary>
                        <div className="mt-3 max-h-64 overflow-y-auto border-t border-gray-200 pt-3 font-serif text-sm leading-relaxed whitespace-pre-line text-gray-700">
                            {submission.body}
                        </div>
                    </details>
                </div>

                <div className="md:col-span-1">
                    {submission.image_path ? (
                        <a
                            href={`/storage/${submission.image_path}`}
                            target="_blank"
                            rel="noreferrer"
                            className="block border border-gray-200 bg-gray-100"
                        >
                            <img
                                src={`/storage/${submission.image_path}`}
                                alt={`Foto dari ${submission.writer_name}`}
                                className="h-40 w-full object-cover"
                                loading="lazy"
                            />
                            <span className="block px-3 py-2 text-[10px] font-bold tracking-widest uppercase hover:underline">
                                Buka foto asli
                            </span>
                        </a>
                    ) : (
                        <div className="flex h-40 items-center justify-center border border-dashed border-gray-300 text-xs text-gray-400">
                            Tanpa foto pendukung
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 p-5">
                {isApproved ? (
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-green-800">
                            Kiriman ini sudah disetujui dan sudah menjadi
                            artikel.
                        </p>
                        <div className="flex flex-wrap gap-3 text-[10px] font-bold tracking-widest uppercase">
                            {submission.article && (
                                <>
                                    <Link
                                        href={`/admin/articles/${submission.article.id}/edit`}
                                        className="border border-black px-3 py-2 hover:bg-black hover:text-white"
                                    >
                                        Edit Artikel
                                    </Link>
                                    <a
                                        href={`/article/${submission.article.slug}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="border border-gray-400 px-3 py-2 hover:border-black"
                                    >
                                        Lihat di Situs
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                ) : categories.length === 0 ? (
                    <p className="text-sm text-red-700">
                        Buat kategori terlebih dahulu sebelum menyetujui
                        kiriman.
                    </p>
                ) : (
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-end gap-3">
                            <div>
                                <label
                                    htmlFor={`category-${submission.id}`}
                                    className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                                >
                                    Kategori Artikel
                                </label>
                                <select
                                    id={`category-${submission.id}`}
                                    value={categoryId}
                                    onChange={(event) =>
                                        setCategoryId(event.target.value)
                                    }
                                    className="border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <label className="flex items-center gap-2 pb-2 text-xs text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={publishNow}
                                    onChange={(event) =>
                                        setPublishNow(event.target.checked)
                                    }
                                    className="h-4 w-4 border-gray-400"
                                />
                                Langsung terbitkan
                            </label>

                            <label className="flex items-center gap-2 pb-2 text-xs text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={featureIt}
                                    onChange={(event) =>
                                        setFeatureIt(event.target.checked)
                                    }
                                    className="h-4 w-4 border-gray-400"
                                />
                                Tandai sebagai unggulan
                            </label>
                        </div>

                        <div>
                            <span className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                Gambar Sampul Artikel (opsional)
                            </span>
                            <p className="mb-2 text-xs text-gray-500">
                                {submission.image_path
                                    ? 'Foto pembaca akan dipakai jika kamu tidak mengunggah gambar lain.'
                                    : 'Unggah gambar sampul agar artikel tampil lebih rapi (JPG/PNG/WEBP, maks 4 MB).'}
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                                <input
                                    ref={coverInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={selectCover}
                                    className="block w-full text-sm text-gray-600 file:mr-3 file:border file:border-black file:bg-white file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:text-black file:uppercase hover:file:bg-black hover:file:text-white"
                                />
                                {coverImage && (
                                    <div className="relative w-full max-w-[180px] shrink-0 border border-gray-300 bg-gray-100 p-1">
                                        <img
                                            src={URL.createObjectURL(coverImage)}
                                            alt="Pratinjau gambar sampul"
                                            className="h-24 w-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={clearCover}
                                            className="mt-1 w-full border border-gray-400 px-2 py-1 text-[10px] font-bold uppercase hover:border-black hover:bg-black hover:text-white"
                                        >
                                            Hapus Gambar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={approve}
                                className="bg-black px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                            >
                                Setujui &amp; Buat Artikel
                            </button>

                            <button
                                type="button"
                                onClick={reject}
                                className="border border-red-300 px-4 py-2 text-[10px] font-bold tracking-widest text-red-600 uppercase hover:border-red-600 hover:bg-red-50"
                            >
                                Tolak
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}

export default function SubmissionsIndex({
    submissions,
    categories = [],
    statuses = [],
    counts = {},
    filters = {},
}) {
    const filterByStatus = (nextStatus) => {
        router.get(
            '/admin/submissions',
            nextStatus ? { status: nextStatus } : {},
            { preserveScroll: true, replace: true },
        );
    };

    return (
        <AdminLayout title="Kiriman Pembaca">
            <p className="mb-6 text-sm text-gray-600">
                Setujui kiriman untuk menjadikannya artikel, atau tolak jika
                belum layak terbit. Foto pendukung otomatis dipakai sebagai
                gambar artikel.
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => filterByStatus('')}
                    className={`border px-3 py-2 text-[10px] font-bold tracking-widest uppercase ${
                        !filters.status
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white hover:border-black'
                    }`}
                >
                    Semua ({submissions.total})
                </button>
                {statuses.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() => filterByStatus(item.value)}
                        className={`border px-3 py-2 text-[10px] font-bold tracking-widest uppercase ${
                            filters.status === item.value
                                ? 'border-black bg-black text-white'
                                : 'border-gray-300 bg-white hover:border-black'
                        }`}
                    >
                        {item.label} ({counts[item.value] ?? 0})
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {submissions.data.length === 0 && (
                    <div className="border border-gray-300 bg-white px-5 py-10 text-center text-sm text-gray-500">
                        Belum ada kiriman dari pembaca.
                    </div>
                )}

                {submissions.data.map((submission) => (
                    <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        categories={categories}
                        statuses={statuses}
                    />
                ))}
            </div>

            <Pagination paginator={submissions} />
        </AdminLayout>
    );
}
