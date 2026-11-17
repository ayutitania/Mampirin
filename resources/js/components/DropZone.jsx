import React, { useRef, useState } from 'react';

export default function DropZone({
    onFile,
    accept = 'image/*',
    children,
    className = '',
    inputRef,
}) {
    const [dragging, setDragging] = useState(false);
    const internalRef = useRef(null);
    const ref = inputRef || internalRef;

    const handleFiles = (files) => {
        const file = files?.[0];
        if (file && file.type.startsWith('image/')) {
            onFile(file);
            if (ref.current) {
                ref.current.value = '';
            }
        }
    };

    return (
        <div
            onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                handleFiles(event.dataTransfer.files);
            }}
            className={`relative flex min-h-[140px] flex-col items-center justify-center border-2 border-dashed p-6 text-center transition-colors ${
                dragging
                    ? 'border-black bg-gray-100 dark:border-white dark:bg-gray-700'
                    : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800'
            } ${className}`}
        >
            {children}
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                Seret &amp; lepas gambar di sini
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                atau klik tombol di bawah (JPG, PNG, WEBP)
            </p>
            <input
                ref={ref}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(event) => handleFiles(event.target.files)}
            />
            <button
                type="button"
                onClick={() => ref.current?.click()}
                className="mt-3 border border-gray-400 bg-white px-4 py-2 text-[10px] font-bold uppercase hover:border-black hover:bg-black hover:text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
                Pilih File
            </button>
        </div>
    );
}
