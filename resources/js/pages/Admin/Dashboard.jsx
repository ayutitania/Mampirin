import React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '../../components/AdminLayout';
import { formatDate } from '../../lib/articles';

function StatCard({ label, value, hint }) {
    return (
        <div className="border border-gray-300 bg-white p-5">
            <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                {label}
            </div>
            <div className="mt-1 text-4xl font-black tracking-tighter">
                {value}
            </div>
            {hint && <div className="mt-1 text-xs text-gray-500">{hint}</div>}
        </div>
    );
}

function PendingList({ title, href, items, empty, renderItem }) {
    return (
        <div className="border border-gray-300 bg-white">
            <div className="flex items-center justify-between border-b border-gray-300 px-5 py-4">
                <h2 className="text-sm font-black tracking-widest uppercase">
                    {title}
                </h2>
                <Link
                    href={href}
                    className="text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-black"
                >
                    Lihat Semua &rarr;
                </Link>
            </div>

            {items.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-gray-500">
                    {empty}
                </p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <li key={item.id} className="px-5 py-4">
                            {renderItem(item)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function Dashboard({
    stats = {},
    recentArticles = [],
    pendingSubmissions = [],
    pendingInquiries = [],
}) {
    return (
        <AdminLayout title="Dashboard">
            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
                <StatCard
                    label="Artikel"
                    value={stats.articles ?? 0}
                    hint={`${stats.published ?? 0} sudah terbit`}
                />
                <StatCard label="Kategori" value={stats.categories ?? 0} />
                <StatCard
                    label="Kiriman Pembaca"
                    value={stats.submissions ?? 0}
                    hint="menunggu persetujuan"
                />
                <StatCard
                    label="Sponsor Masuk"
                    value={stats.inquiries ?? 0}
                    hint="menunggu tindak lanjut"
                />
                <StatCard
                    label="Iklan"
                    value={stats.ads ?? 0}
                    hint={`${stats.active_ads ?? 0} aktif di situs`}
                />
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
                <Link
                    href="/admin/articles/create"
                    className="bg-black px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                >
                    + Artikel Baru
                </Link>
                <Link
                    href="/admin/ads/create"
                    className="bg-black px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                >
                    + Iklan Baru
                </Link>
                <Link
                    href="/admin/categories/create"
                    className="border border-black px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white"
                >
                    + Kategori Baru
                </Link>
                <Link
                    href="/admin/submissions"
                    className="border border-gray-400 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:border-black"
                >
                    Kiriman Pembaca
                </Link>
                <Link
                    href="/admin/sponsors"
                    className="border border-gray-400 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:border-black"
                >
                    Sponsor Masuk
                </Link>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <PendingList
                    title="Artikel Menunggu ACC"
                    href="/admin/submissions"
                    items={pendingSubmissions}
                    empty="Tidak ada kiriman artikel yang menunggu."
                    renderItem={(submission) => (
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <Link
                                    href="/admin/submissions"
                                    className="text-sm font-bold hover:underline"
                                >
                                    {submission.title}
                                </Link>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    {submission.writer_name} &bull;{' '}
                                    {formatDate(submission.created_at)}
                                </p>
                            </div>
                            <Link
                                href="/admin/submissions"
                                className="shrink-0 border border-black px-2 py-1 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white"
                            >
                                Tinjau
                            </Link>
                        </div>
                    )}
                />

                <PendingList
                    title="Sponsor Menunggu"
                    href="/admin/sponsors"
                    items={pendingInquiries}
                    empty="Tidak ada pengajuan sponsor yang menunggu."
                    renderItem={(inquiry) => (
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="text-sm font-bold">
                                    {inquiry.company}
                                </div>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    {inquiry.contact_name}
                                    {inquiry.package?.name
                                        ? ` \u2022 ${inquiry.package.name}`
                                        : ''}
                                </p>
                            </div>
                            <Link
                                href="/admin/sponsors"
                                className="shrink-0 border border-black px-2 py-1 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white"
                            >
                                Tindak
                            </Link>
                        </div>
                    )}
                />
            </div>

            <div className="border border-gray-300 bg-white">
                <div className="flex items-center justify-between border-b border-gray-300 px-5 py-4">
                    <h2 className="text-sm font-black tracking-widest uppercase">
                        Artikel Terbaru
                    </h2>
                    <Link
                        href="/admin/articles"
                        className="text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-black"
                    >
                        Semua Artikel &rarr;
                    </Link>
                </div>

                {recentArticles.length === 0 ? (
                    <p className="px-5 py-8 text-center text-sm text-gray-500">
                        Belum ada artikel. Mulai dengan membuat artikel baru.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-[10px] tracking-widest text-gray-500 uppercase">
                                <tr>
                                    <th className="px-5 py-3">Judul</th>
                                    <th className="px-5 py-3">Kategori</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Tanggal</th>
                                    <th className="px-5 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentArticles.map((article) => (
                                    <tr key={article.id}>
                                        <td className="px-5 py-3 font-bold">
                                            {article.title}
                                        </td>
                                        <td className="px-5 py-3 text-gray-600">
                                            {article.category?.name ?? '-'}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`px-2 py-1 text-[10px] font-bold uppercase ${
                                                    article.is_published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-200 text-gray-700'
                                                }`}
                                            >
                                                {article.is_published
                                                    ? 'Terbit'
                                                    : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-500">
                                            {formatDate(
                                                article.published_at ??
                                                    article.created_at,
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <Link
                                                href={`/admin/articles/${article.id}/edit`}
                                                className="text-[10px] font-bold tracking-widest uppercase underline hover:no-underline"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
