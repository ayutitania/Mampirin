import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../components/AdminLayout';
import { formatDate } from '../../lib/articles';

function StatCard({ label, value, hint }) {
    return (
        <div className="border border-gray-300 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                {label}
            </div>
            <div className="mt-1 text-4xl font-black tracking-tighter">
                {value}
            </div>
            {hint && (
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {hint}
                </div>
            )}
        </div>
    );
}

function PendingList({ title, href, items, empty, renderItem }) {
    return (
        <div className="border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-300 px-5 py-4 dark:border-gray-700">
                <h2 className="text-sm font-black tracking-widest uppercase">
                    {title}
                </h2>
                <Link
                    href={href}
                    className="text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-black dark:text-gray-400"
                >
                    Lihat Semua &rarr;
                </Link>
            </div>

            {items.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
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

function PendingSubmissionItem({ submission, categories }) {
    const [categoryId, setCategoryId] = useState(
        categories[0]?.id ? String(categories[0].id) : '',
    );
    const [publishNow, setPublishNow] = useState(true);

    const approve = () => {
        if (!categoryId) {
            window.alert(
                'Buat kategori terlebih dahulu sebelum menyetujui artikel.',
            );

            return;
        }

        router.patch(
            `/admin/submissions/${submission.id}/approve`,
            {
                category_id: categoryId,
                is_published: publishNow,
            },
            { preserveScroll: true },
        );
    };

    return (
        <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <Link
                        href="/admin/submissions"
                        className="text-sm font-bold hover:underline"
                    >
                        {submission.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        {submission.writer_name} &bull;{' '}
                        {formatDate(submission.created_at)}
                    </p>
                </div>
                <Link
                    href="/admin/submissions"
                    className="shrink-0 border border-gray-400 px-2 py-1 text-[10px] font-bold tracking-widest uppercase hover:border-black dark:border-gray-600"
                >
                    Tinjau
                </Link>
            </div>

            {categories.length === 0 ? (
                <p className="text-xs text-red-600">
                    Buat kategori dulu untuk menyetujui kiriman.
                </p>
            ) : (
                <div className="flex flex-wrap items-center gap-2">
                    <select
                        value={categoryId}
                        onChange={(event) => setCategoryId(event.target.value)}
                        aria-label={`Kategori untuk ${submission.title}`}
                        className="border border-gray-300 bg-white px-2 py-1 text-xs focus:border-black focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <label className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                        <input
                            type="checkbox"
                            checked={publishNow}
                            onChange={(event) =>
                                setPublishNow(event.target.checked)
                            }
                            className="h-3.5 w-3.5 border-gray-400 dark:border-gray-600"
                        />
                        Terbitkan
                    </label>

                    <button
                        type="button"
                        onClick={approve}
                        className="bg-black px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                    >
                        ACC &amp; Simpan
                    </button>
                </div>
            )}
        </div>
    );
}

function ArticleRow({ article, badge }) {
    return (
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-4 py-3 last:border-0">
            <div className="min-w-0">
                <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="block truncate text-sm font-bold hover:underline"
                >
                    {article.title}
                </Link>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {article.category?.name ?? '-'}
                    {article.published_at
                        ? ` \u2022 ${formatDate(article.published_at)}`
                        : ''}
                </p>
            </div>
            <span className="shrink-0 bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-700 uppercase dark:bg-gray-900 dark:text-gray-300">
                {badge}
            </span>
        </div>
    );
}

function ArticleList({ title, hint, items = [], empty, renderItem }) {
    return (
        <div className="border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-300 px-5 py-4 dark:border-gray-700">
                <h2 className="text-sm font-black tracking-widest uppercase">
                    {title}
                </h2>
                {hint && (
                    <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                        {hint}
                    </p>
                )}
            </div>
            {items.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    {empty}
                </p>
            ) : (
                <div>{items.map((item) => renderItem(item))}</div>
            )}
        </div>
    );
}

export default function Dashboard({
    stats = {},
    recentArticles = [],
    featuredArticles = [],
    popularArticles = [],
    featuredPopularArticles = [],
    pendingSubmissions = [],
    pendingInquiries = [],
    categories = [],
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
                    className="border border-black px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                >
                    + Kategori Baru
                </Link>
                <Link
                    href="/admin/submissions"
                    className="border border-gray-400 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:border-black dark:border-gray-600"
                >
                    Kiriman Pembaca
                </Link>
                <Link
                    href="/admin/sponsors"
                    className="border border-gray-400 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:border-black dark:border-gray-600"
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
                        <PendingSubmissionItem
                            submission={submission}
                            categories={categories}
                        />
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
                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                    {inquiry.contact_name}
                                    {inquiry.package?.name
                                        ? ` \u2022 ${inquiry.package.name}`
                                        : ''}
                                </p>
                            </div>
                            <Link
                                href="/admin/sponsors"
                                className="shrink-0 border border-black px-2 py-1 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                Tindak
                            </Link>
                        </div>
                    )}
                />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <ArticleList
                    title="5 Unggulan di Home"
                    hint="Artikel unggulan yang tampil di Home (maks 5, acak jika lebih)"
                    items={featuredArticles}
                    empty="Belum ada artikel unggulan yang terbit."
                    renderItem={(article) => (
                        <ArticleRow article={article} badge="Unggulan" />
                    )}
                />
                <ArticleList
                    title="Artikel Populer"
                    hint="Berdasarkan jumlah views"
                    items={popularArticles}
                    empty="Belum ada data views."
                    renderItem={(article) => (
                        <ArticleRow
                            article={article}
                            badge={`${article.views ?? 0} views`}
                        />
                    )}
                />
                <ArticleList
                    title="Unggulan &amp; Populer"
                    hint="Artikel unggulan yang juga paling banyak dibaca"
                    items={featuredPopularArticles}
                    empty="Belum ada artikel unggulan yang populer."
                    renderItem={(article) => (
                        <ArticleRow
                            article={article}
                            badge={`${article.views ?? 0} views`}
                        />
                    )}
                />
            </div>

            <div className="border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between border-b border-gray-300 px-5 py-4 dark:border-gray-700">
                    <h2 className="text-sm font-black tracking-widest uppercase">
                        Artikel Terbaru
                    </h2>
                    <Link
                        href="/admin/articles"
                        className="text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-black dark:text-gray-400"
                    >
                        Semua Artikel &rarr;
                    </Link>
                </div>

                {recentArticles.length === 0 ? (
                    <p className="px-5 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Belum ada artikel. Mulai dengan membuat artikel baru.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-[10px] tracking-widest text-gray-500 uppercase dark:bg-gray-700 dark:text-gray-400">
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
                                        <td className="px-5 py-3 text-gray-600 dark:text-gray-300">
                                            {article.category?.name ?? '-'}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`px-2 py-1 text-[10px] font-bold uppercase ${
                                                    article.is_published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                                }`}
                                            >
                                                {article.is_published
                                                    ? 'Terbit'
                                                    : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-500 dark:text-gray-400">
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
