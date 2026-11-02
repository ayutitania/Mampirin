import React from 'react';
import { Link } from '@inertiajs/react';

function cleanLabel(label) {
    return label
        .replace('&laquo;', '\u00ab')
        .replace('&raquo;', '\u00bb')
        .replace('Previous', 'Sebelumnya')
        .replace('Next', 'Berikutnya');
}

export default function Pagination({ paginator }) {
    if (!paginator || !paginator.links || paginator.last_page <= 1) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-300 bg-white px-4 py-3">
            <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                Menampilkan {paginator.from ?? 0}&ndash;{paginator.to ?? 0} dari{' '}
                {paginator.total} data
            </p>

            <div className="flex flex-wrap items-center gap-1">
                {paginator.links.map((link, index) => {
                    const label = cleanLabel(link.label);
                    const isDisabled = !link.url;
                    const isActive = link.active;

                    if (isDisabled) {
                        return (
                            <span
                                key={index}
                                className="cursor-not-allowed border border-gray-200 px-2 py-1 text-[10px] font-bold text-gray-300"
                            >
                                {label}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            preserveScroll
                            className={`border px-2 py-1 text-[10px] font-bold transition-colors ${
                                isActive
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
                            }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
