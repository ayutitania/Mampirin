import { Link, usePage } from '@inertiajs/react';
import { categoryUrl } from '../lib/articles';

export default function CategoryList({ className = '' }) {
    const categories = usePage().props.siteCategories ?? [];

    return (
        <div className={className}>
            <div className="mb-2 bg-black py-1 text-center text-[11px] font-bold tracking-widest text-white uppercase">
                Categories
            </div>
            <ul className="font-serif text-sm text-gray-800">
                {categories.length === 0 && (
                    <li className="border-b border-gray-400 py-2 text-gray-500">
                        Belum ada kategori.
                    </li>
                )}

                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="border-b border-gray-400 py-2"
                    >
                        <Link
                            href={categoryUrl(category)}
                            className="flex justify-between hover:text-black hover:underline"
                        >
                            <span className="font-bold uppercase">
                                {category.name}
                            </span>
                            <span>({category.articles_count ?? 0})</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
