import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { adLinkProps } from './adLink';

const ROTATE_MS = 5000;

function SingleBanner({ banner, label = 'Ads', className = '' }) {
    const link = adLinkProps(banner.target_url);

    return (
        <section
            aria-label="Iklan"
            className={`group relative h-24 w-full overflow-hidden border-y border-gray-300 bg-black sm:h-28 md:h-32 dark:border-gray-700 ${className}`}
        >
            <a
                {...link}
                aria-label={
                    link.target === '_blank'
                        ? `${banner.title} (buka di tab baru)`
                        : banner.title
                }
                className="absolute inset-0 block"
            >
                {banner.image_url ? (
                    <img
                        src={banner.image_url}
                        alt={banner.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-black px-6 text-center text-lg font-black tracking-tight text-white uppercase">
                        {banner.title}
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-4 pb-3">
                    <span className="truncate text-sm font-bold tracking-wide text-white uppercase sm:text-base">
                        {banner.title}
                    </span>
                    <span className="shrink-0 bg-white px-2 py-1 text-[10px] font-bold tracking-widest text-black uppercase dark:bg-gray-800/90 dark:text-white">
                        {label}
                    </span>
                </div>
            </a>
        </section>
    );
}

export default function BannerAds({
    placement = 'top',
    interval = ROTATE_MS,
    className = '',
    hideWhenEmpty = false,
    stack = false,
}) {
    const banners = usePage().props.ads?.[placement] ?? [];
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || banners.length < 2 || stack) {
            return;
        }

        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % banners.length);
        }, interval);

        return () => window.clearInterval(timer);
    }, [paused, banners.length, interval, stack]);

    if (banners.length === 0) {
        if (hideWhenEmpty) {
            return null;
        }

        return (
            <div className="mb-2 flex h-10 items-center justify-center border-y border-gray-200 text-xs text-gray-400 dark:border-gray-700">
                [Banner Ads]
            </div>
        );
    }

    if (stack) {
        return (
            <div className={`space-y-2 ${className}`}>
                {banners.map((banner) => (
                    <SingleBanner key={banner.id} banner={banner} />
                ))}
            </div>
        );
    }

    const activeIndex = index % banners.length;

    return (
        <section
            aria-label="Iklan"
            aria-roledescription="carousel"
            className={`group relative mb-2 h-24 w-full overflow-hidden border-y border-gray-300 bg-black sm:h-28 md:h-32 dark:border-gray-700 ${className}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            {banners.map((banner, i) => {
                const isActive = i === activeIndex;
                const link = adLinkProps(banner.target_url);

                return (
                    <a
                        key={banner.id}
                        {...link}
                        aria-label={
                            link.target === '_blank'
                                ? `${banner.title} (buka di tab baru)`
                                : banner.title
                        }
                        tabIndex={isActive ? 0 : -1}
                        aria-hidden={isActive ? undefined : true}
                        className={`absolute inset-0 block transition-opacity duration-700 ease-in-out ${
                            isActive
                                ? 'z-10 opacity-100'
                                : 'pointer-events-none z-0 opacity-0'
                        }`}
                    >
                        {banner.image_url ? (
                            <img
                                src={banner.image_url}
                                alt={banner.title}
                                className="h-full w-full object-cover"
                                loading={i === 0 ? 'eager' : 'lazy'}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-black px-6 text-center text-lg font-black tracking-tight text-white uppercase">
                                {banner.title}
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-4 pb-3">
                            <span className="truncate text-sm font-bold tracking-wide text-white uppercase sm:text-base">
                                {banner.title}
                            </span>
                            <span className="shrink-0 bg-white px-2 py-1 text-[10px] font-bold tracking-widest text-black uppercase dark:bg-gray-800/90 dark:text-white">
                                Ads
                            </span>
                        </div>
                    </a>
                );
            })}

            {banners.length > 1 && (
                <div className="absolute top-2 right-2 z-20 flex gap-1.5">
                    {banners.map((banner, i) => (
                        <button
                            key={banner.id}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Tampilkan iklan ${i + 1}: ${banner.title}`}
                            aria-current={i === activeIndex}
                            className={`h-1.5 rounded-full transition-all ${
                                i === activeIndex
                                    ? 'w-6 bg-white dark:bg-gray-800'
                                    : 'w-1.5 bg-white hover:bg-white dark:bg-gray-800/50 dark:bg-gray-800/80'
                            }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
