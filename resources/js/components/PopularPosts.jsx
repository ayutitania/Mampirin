import { Link } from '@inertiajs/react';
import { articleUrl } from '../lib/articles';

export default function PopularPosts({ posts = [], className = '' }) {
    if (posts.length === 0) {
        return null;
    }

    return (
        <div className={className}>
            <div className="mb-6 bg-black py-1 text-center text-[11px] font-bold tracking-widest text-white uppercase">
                Popular
            </div>
            <div className="space-y-8">
                {posts.map((post, index) => (
                    <article key={post.id} className="group">
                        <Link href={articleUrl(post)}>
                            <div className="relative mb-3 overflow-hidden bg-gray-200">
                                {post.image_url && (
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                )}
                                <span className="absolute right-3 bottom-1 font-serif text-5xl text-white italic drop-shadow-md">
                                    {index + 1}
                                </span>
                            </div>
                            <h5 className="mb-2 text-xl leading-tight font-black group-hover:underline">
                                {post.title}
                            </h5>
                        </Link>
                        <p className="border-b border-gray-400 pb-6 font-serif text-sm leading-relaxed text-gray-800">
                            {post.excerpt}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
}
