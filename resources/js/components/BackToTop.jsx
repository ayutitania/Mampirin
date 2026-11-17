import React, { useEffect, useState } from 'react';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            title="Kembali ke atas"
            className={`fixed right-5 bottom-5 z-50 flex h-11 w-11 items-center justify-center border-2 border-black dark:border-gray-400 bg-white text-black shadow-[4px_4px_0_0_#000] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black dark:hover:bg-gray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                visible
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-4 opacity-0'
            }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
                className="h-5 w-5"
                aria-hidden="true"
            >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
            </svg>
        </button>
    );
}
