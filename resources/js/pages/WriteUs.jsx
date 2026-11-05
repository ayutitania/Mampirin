import React, { useRef, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../components/AppLayout';
import DropZone from '../components/DropZone';

function FieldError({ message }) {
    if (!message) return null;

    return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export default function WriteUs() {
    const { flash } = usePage().props;
    const fileInput = useRef(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        body: '',
        writer_name: '',
        writer_email: '',
        writer_phone: '',
        photo: null,
    });

    const selectPhoto = (input) => {
        const file =
            input instanceof File ? input : (input?.target?.files?.[0] ?? null);

        setData('photo', file);
        setPhotoPreview(file ? URL.createObjectURL(file) : null);
    };

    const clearPhoto = () => {
        setData('photo', null);
        setPhotoPreview(null);

        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    const submit = (event) => {
        event.preventDefault();

        post('/write-us', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                clearPhoto();
            },
        });
    };

    return (
        <AppLayout
            title="Write Us"
            description="Kirim tulisan, cerita, atau ide liputanmu ke Mampirin Magazine. Sertakan foto pendukung agar ceritamu lebih hidup."
        >
            {/* Form Section */}
            <div className="mx-auto max-w-4xl border-t-[4px] border-black pt-8">
                {/* Title & Subtitle */}
                <h2 className="mb-4 text-[3rem] leading-none font-black tracking-tighter uppercase">
                    Share Your Idea
                </h2>
                <p className="mb-10 border-b border-gray-300 dark:border-gray-700 pb-6 text-sm text-gray-700 dark:text-gray-300">
                    Pastikan kamu membaca syarat dan FAQ pengiriman artikel yang
                    ada di{' '}
                    <Link href="/faq" className="underline">
                        sini
                    </Link>
                </p>

                {flash?.success && (
                    <div
                        role="status"
                        className="mb-8 border border-green-600 bg-green-50 px-4 py-3 text-sm text-green-800"
                    >
                        {flash.success}
                    </div>
                )}

                <form className="space-y-10" onSubmit={submit} noValidate>
                    {/* Article Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Article Title:
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(event) =>
                                setData('title', event.target.value)
                            }
                            className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.title} />
                    </div>

                    {/* Article Body (WYSIWYG Mockup) */}
                    <div>
                        <label
                            htmlFor="body"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Article Body:
                        </label>
                        <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                            {/* Textarea */}
                            <textarea
                                id="body"
                                rows="10"
                                value={data.body}
                                onChange={(event) =>
                                    setData('body', event.target.value)
                                }
                                placeholder="Tulis isi artikelmu di sini..."
                                className="w-full bg-white dark:bg-gray-800 p-4 text-sm focus:outline-none"
                            ></textarea>
                        </div>
                        <FieldError message={errors.body} />
                    </div>

                    {/* Writer Name */}
                    <div>
                        <label
                            htmlFor="writer_name"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Writer Name:
                        </label>
                        <input
                            id="writer_name"
                            type="text"
                            value={data.writer_name}
                            onChange={(event) =>
                                setData('writer_name', event.target.value)
                            }
                            className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.writer_name} />
                    </div>

                    {/* Writer Email */}
                    <div>
                        <label
                            htmlFor="writer_email"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Writer Email:
                        </label>
                        <input
                            id="writer_email"
                            type="email"
                            value={data.writer_email}
                            onChange={(event) =>
                                setData('writer_email', event.target.value)
                            }
                            className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.writer_email} />
                    </div>

                    {/* Writer Phone */}
                    <div>
                        <label
                            htmlFor="writer_phone"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Writer Phone:
                        </label>
                        <input
                            id="writer_phone"
                            type="text"
                            value={data.writer_phone}
                            onChange={(event) =>
                                setData('writer_phone', event.target.value)
                            }
                            className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.writer_phone} />
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label
                            htmlFor="photo"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Foto Pendukung (opsional):
                        </label>
                        <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                            Unggah foto suasana, tempat, atau ilustrasi
                            pendukung. Format JPG, PNG, atau WEBP maksimal 4 MB.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            <DropZone
                                inputRef={fileInput}
                                onFile={selectPhoto}
                                accept="image/jpeg,image/png,image/webp"
                            >
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Seret &amp; lepas foto di sini, atau klik
                                    tombol di bawah.
                                </p>
                            </DropZone>

                            {photoPreview && (
                                <div className="relative w-full max-w-[220px] shrink-0 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-1">
                                    <img
                                        src={photoPreview}
                                        alt="Pratinjau foto"
                                        className="h-32 w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={clearPhoto}
                                        className="mt-1 w-full border border-gray-400 dark:border-gray-600 px-2 py-1 text-[10px] font-bold uppercase hover:border-black hover:bg-black hover:text-white"
                                    >
                                        Hapus Foto
                                    </button>
                                </div>
                            )}
                        </div>

                        <FieldError message={errors.photo} />
                    </div>

                    {/* Submit Button */}
                    <div className="border-b border-gray-300 dark:border-gray-700 pb-10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-black px-8 py-2 text-sm text-white uppercase transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Mengirim...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
