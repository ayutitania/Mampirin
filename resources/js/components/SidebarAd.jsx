import { usePage } from '@inertiajs/react';
import { adLinkProps } from './adLink';

export default function SidebarAd({
    placement = 'sidebar',
    className = '',
    heightClass = 'h-64',
    label = 'Advertisement',
}) {
    const ad = (usePage().props.ads?.[placement] ?? [])[0];

    if (!ad) {
        return (
            <div
                className={`${className} ${heightClass} flex flex-col items-center justify-center border border-gray-300 bg-gray-100`}
            >
                <span className="text-xs font-bold text-gray-400 uppercase">
                    {label}
                </span>
                <span className="mt-2 text-2xl text-gray-300">[Iklan]</span>
            </div>
        );
    }

    const link = adLinkProps(ad.target_url);

    return (
        <a
            {...link}
            aria-label={
                link.target === '_blank'
                    ? `${ad.title} (buka di tab baru)`
                    : ad.title
            }
            className={`${className} ${heightClass} relative block overflow-hidden border border-gray-300 bg-gray-100`}
        >
            {ad.image_url ? (
                <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                />
            ) : (
                <span className="flex h-full items-center justify-center px-4 text-center text-sm text-gray-600">
                    {ad.title}
                </span>
            )}
            <span className="absolute bottom-3 left-3 bg-white/85 px-2 py-1 text-[10px] font-bold text-black uppercase">
                {label}
            </span>
        </a>
    );
}
