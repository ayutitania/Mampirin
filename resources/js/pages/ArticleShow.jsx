import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../components/AppLayout';
import CategoryList from '../components/CategoryList';
import PopularPosts from '../components/PopularPosts';
import SidebarAd from '../components/SidebarAd';
import {
    articleUrl,
    categoryUrl,
    formatDate,
    readingTime,
} from '../lib/articles';

export default function ArticleShow({ article, related = [], popular = [] }) {
    const paragraphs = (article.body ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    return (
        <AppLayout
            title={article.title}
            description={article.excerpt}
            image={article.image_url}
            type="article"
        >
            <div className="grid grid-cols-1 border-t border-gray-400 pt-8 md:grid-cols-3">
                {/* Article */}
                <article className="md:col-span-2 md:border-r md:border-gray-400 md:pr-8">
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                        {article.category && (
                            <Link
                                href={categoryUrl(article.category)}
                                className="bg-black px-3 py-1 text-white hover:bg-gray-800"
                            >
                                {article.category.name}
                            </Link>
                        )}
                        <span className="text-gray-500">
                            {formatDate(article.published_at)}
                        </span>
                        <span className="text-gray-400">
                            &bull; {readingTime(article.body)} menit baca
                        </span>
                    </div>

                    <h1 className="mb-4 text-4xl leading-none font-black tracking-tighter uppercase md:text-5xl">
                        {article.title}
                    </h1>

                    <div className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                        <span className="inline-block h-4 w-4 rounded-full bg-gray-400"></span>
                        {article.author} &bull; {article.views} kali dibaca
                    </div>

                    {article.image_url && (
                        <div className="mb-8 w-full overflow-hidden bg-gray-200">
                            <img
                                src={article.image_url}
                                alt={article.title}
                                className="max-h-[520px] w-full object-cover"
                            />
                        </div>
                    )}

                    <p className="mb-8 border-l-[3px] border-gray-300 pl-4 font-serif text-lg leading-relaxed text-gray-700">
                        {article.excerpt}
                    </p>

                    <div className="space-y-5 font-serif text-base leading-relaxed text-gray-800">
                        {paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-300 pt-6">
                        {article.category && (
                            <Link
                                href={categoryUrl(article.category)}
                                className="border border-black px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white"
                            >
                                &larr; Semua {article.category.name}
                            </Link>
                        )}
                        <Link
                            href="/article"
                            className="text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-black"
                        >
                            Hub Artikel
                        </Link>
                    </div>
                </article>

                {/* Sidebar */}
                <aside className="mt-10 md:col-span-1 md:mt-0 md:pl-8">
                    <CategoryList className="mb-10" />

                    <PopularPosts posts={popular} className="mb-10" />

                    <SidebarAd placement="article_sidebar" heightClass="h-80" />
                </aside>
            </div>

            {/* Related */}
            {related.length > 0 && (
                <section className="mt-16 border-t-[4px] border-black pt-8">
                    <h2 className="mb-8 text-3xl font-black tracking-tighter uppercase">
                        Baca Juga
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {related.map((post) => (
                            <article key={post.id} className="group">
                                <Link href={articleUrl(post)}>
                                    <div className="mb-3 h-44 w-full overflow-hidden bg-gray-200">
                                        {post.image_url && (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                    <div className="mb-1 text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                                        {formatDate(post.published_at)}
                                    </div>
                                    <h3 className="text-xl leading-tight font-black group-hover:underline">
                                        {post.title}
                                    </h3>
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            )}

        </AppLayout>
    );
}
