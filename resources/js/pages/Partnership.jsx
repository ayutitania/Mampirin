import React, { useEffect, useRef, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../components/AppLayout';

const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value ?? 0);

function FieldError({ message }) {
    if (!message) return null;

    return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export default function Partnership({
    packages = [],
    selectedPackage = null,
    selectedPackageId = null,
}) {
    const { flash } = usePage().props;
    const fileInput = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const preselected = String(
        selectedPackageId ??
            packages.find((pkg) => pkg.code === selectedPackage)?.id ??
            packages[0]?.id ??
            '',
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        partnership_package_id: preselected,
        company: '',
        contact_name: '',
        email: '',
        phone: '',
        message: '',
        ad_title: '',
        ad_target_url: '',
        ad_image: null,
    });

    // Ikuti paket yang diklik di halaman Ads, termasuk jika Inertia
    // mempertahankan state form saat berpindah halaman.
    useEffect(() => {
        if (preselected) {
            setData('partnership_package_id', preselected);
        }
    }, [preselected, setData]);

    const chosenPackage = packages.find(
        (pkg) => String(pkg.id) === String(data.partnership_package_id),
    );

    const selectImage = (event) => {
        const file = event.target.files?.[0] ?? null;

        setData('ad_image', file);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const clearImage = () => {
        setData('ad_image', null);
        setImagePreview(null);

        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    const submit = (event) => {
        event.preventDefault();

        post('/partnership', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                clearImage();
            },
        });
    };

    return (
        <AppLayout
            title="Partnership"
            description="Ajukan kerja sama dan paket publikasi bersama Mampirin Magazine. Tim redaksi akan menghubungi bisnismu."
        >
            <div className="mx-auto max-w-4xl border-t-[4px] border-black pt-8">
                <div className="mb-4 w-max bg-black px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                    Kemitraan &amp; Kerja Sama
                </div>
                <h2 className="mb-4 text-[3rem] leading-none font-black tracking-tighter uppercase">
                    Partnership Inquiry
                </h2>
                <p className="mb-10 border-b border-gray-300 dark:border-gray-700 pb-6 text-sm text-gray-700 dark:text-gray-300">
                    Sebelum mengajukan kerja sama, baca dulu{' '}
                    <Link href="/faq" className="underline">
                        ketentuan Ads
                    </Link>
                    .
                </p>

                {flash?.success && (
                    <div
                        role="status"
                        className="mb-8 border border-green-600 bg-green-50 px-4 py-3 text-sm text-green-800"
                    >
                        {flash.success}
                    </div>
                )}

                <form className="space-y-8" onSubmit={submit} noValidate>
                    {/* Pilihan Paket */}
                    <div>
                        <label
                            htmlFor="partnership_package_id"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Paket yang Diminati *
                        </label>
                        <select
                            id="partnership_package_id"
                            value={data.partnership_package_id}
                            onChange={(event) =>
                                setData(
                                    'partnership_package_id',
                                    event.target.value,
                                )
                            }
                            className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
                        >
                            <option value="" disabled>
                                Pilih paket kemitraan...
                            </option>
                            {packages.map((pkg) => (
                                <option key={pkg.id} value={pkg.id}>
                                    {pkg.label} — {pkg.name}
                                </option>
                            ))}
                        </select>
                        <FieldError message={errors.partnership_package_id} />
                    </div>

                    {chosenPackage && (
                        <div className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-4">
                            <div className="text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                                Paket dipilih
                            </div>
                            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                                <span className="text-lg font-black tracking-tight uppercase">
                                    {chosenPackage.name}
                                </span>
                                <span className="text-xl font-black tracking-tighter">
                                    {formatRupiah(chosenPackage.price)}{' '}
                                    <span className="text-xs font-normal tracking-normal text-gray-500 dark:text-gray-400">
                                        {chosenPackage.price_suffix}
                                    </span>
                                </span>
                            </div>
                            <p className="mt-2 font-serif text-sm text-gray-600 dark:text-gray-300">
                                {chosenPackage.description}
                            </p>
                        </div>
                    )}

                    {/* Nama Perusahaan */}
                    <div>
                        <label
                            htmlFor="company"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Nama Bisnis / Perusahaan:
                        </label>
                        <input
                            id="company"
                            type="text"
                            value={data.company}
                            onChange={(event) =>
                                setData('company', event.target.value)
                            }
                            className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.company} />
                    </div>

                    {/* Nama Kontak */}
                    <div>
                        <label
                            htmlFor="contact_name"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Nama Penanggung Jawab:
                        </label>
                        <input
                            id="contact_name"
                            type="text"
                            value={data.contact_name}
                            onChange={(event) =>
                                setData('contact_name', event.target.value)
                            }
                            className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.contact_name} />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(event) =>
                                setData('email', event.target.value)
                            }
                            className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.email} />
                    </div>

                    {/* Telepon */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Nomor WhatsApp / Telepon (opsional):
                        </label>
                        <input
                            id="phone"
                            type="text"
                            value={data.phone}
                            onChange={(event) =>
                                setData('phone', event.target.value)
                            }
                            className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.phone} />
                    </div>

                    {/* Pesan */}
                    <div>
                        <label
                            htmlFor="message"
                            className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                        >
                            Ceritakan Kebutuhanmu:
                        </label>
                        <textarea
                            id="message"
                            rows="6"
                            value={data.message}
                            onChange={(event) =>
                                setData('message', event.target.value)
                            }
                            placeholder="Contoh: kami ingin promosi menu baru untuk mahasiswa, target rilis bulan depan..."
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm focus:border-black focus:outline-none"
                        ></textarea>
                        <FieldError message={errors.message} />
                    </div>

                    {/* Detail Iklan */}
                    <div className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-5">
                        <div className="mb-4 text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                            Detail Iklan
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="ad_title"
                                    className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                                >
                                    Judul Iklan *
                                </label>
                                <input
                                    id="ad_title"
                                    type="text"
                                    value={data.ad_title}
                                    onChange={(event) =>
                                        setData('ad_title', event.target.value)
                                    }
                                    placeholder="Contoh: Promo Kopi Senja Jimbaran"
                                    className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                                />
                                <FieldError message={errors.ad_title} />
                            </div>

                            <div>
                                <label
                                    htmlFor="ad_target_url"
                                    className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                                >
                                    URL Tujuan Iklan (opsional):
                                </label>
                                <input
                                    id="ad_target_url"
                                    type="text"
                                    value={data.ad_target_url}
                                    onChange={(event) =>
                                        setData(
                                            'ad_target_url',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="https://instagram.com/... atau /partnership"
                                    className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                                />
                                <FieldError message={errors.ad_target_url} />
                            </div>

                            <div>
                                <label
                                    htmlFor="ad_image"
                                    className="mb-2 block text-sm text-gray-800 dark:text-gray-200"
                                >
                                    Gambar Iklan (opsional):
                                </label>
                                <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                                    Unggah gambar/banner iklanmu. Format JPG,
                                    PNG, atau WEBP maksimal 4 MB.
                                </p>

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                    <input
                                        ref={fileInput}
                                        id="ad_image"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={selectImage}
                                        className="block w-full text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:border file:border-black file:bg-white dark:bg-gray-800 file:px-4 file:py-2 file:text-xs file:font-bold file:text-black file:uppercase hover:file:bg-black hover:file:text-white"
                                    />

                                    {imagePreview && (
                                        <div className="relative w-full max-w-[220px] shrink-0 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-1">
                                            <img
                                                src={imagePreview}
                                                alt="Pratinjau gambar iklan"
                                                className="h-32 w-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={clearImage}
                                                className="mt-1 w-full border border-gray-400 dark:border-gray-600 px-2 py-1 text-[10px] font-bold uppercase hover:border-black hover:bg-black hover:text-white"
                                            >
                                                Hapus Gambar
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <FieldError message={errors.ad_image} />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="border-b border-gray-300 dark:border-gray-700 pb-10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-black px-8 py-2 text-sm text-white uppercase transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Mengirim...' : 'Kirim Pengajuan'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
