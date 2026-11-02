import React from 'react';
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

export default function Partnership({ packages = [], selectedPackage = null }) {
    const { flash } = usePage().props;
    const preselected =
        packages.find((pkg) => pkg.code === selectedPackage)?.id ?? '';

    const { data, setData, post, processing, errors, reset } = useForm({
        partnership_package_id: preselected,
        company: '',
        contact_name: '',
        email: '',
        phone: '',
        message: '',
    });

    const chosenPackage = packages.find(
        (pkg) => String(pkg.id) === String(data.partnership_package_id),
    );

    const submit = (event) => {
        event.preventDefault();

        post('/partnership', {
            preserveScroll: true,
            onSuccess: () => reset(),
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
                <p className="mb-10 border-b border-gray-300 pb-6 text-sm text-gray-700">
                    Isi formulir di bawah dan tim redaksi Mampirin akan
                    menghubungi kamu untuk membahas paket yang paling sesuai
                    dengan kebutuhan bisnismu. Bisa juga langsung memilih paket
                    di halaman{' '}
                    <Link href="/ads" className="underline">
                        Ads
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
                            className="mb-2 block text-sm text-gray-800"
                        >
                            Paket yang Diminati:
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
                            className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:border-black focus:outline-none"
                        >
                            <option value="">
                                Belum menentukan / konsultasi dulu
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
                        <div className="border border-gray-300 bg-gray-50 p-4">
                            <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                Paket dipilih
                            </div>
                            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                                <span className="text-lg font-black tracking-tight uppercase">
                                    {chosenPackage.name}
                                </span>
                                <span className="text-xl font-black tracking-tighter">
                                    {formatRupiah(chosenPackage.price)}{' '}
                                    <span className="text-xs font-normal tracking-normal text-gray-500">
                                        {chosenPackage.price_suffix}
                                    </span>
                                </span>
                            </div>
                            <p className="mt-2 font-serif text-sm text-gray-600">
                                {chosenPackage.description}
                            </p>
                        </div>
                    )}

                    {/* Nama Perusahaan */}
                    <div>
                        <label
                            htmlFor="company"
                            className="mb-2 block text-sm text-gray-800"
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
                            className="w-full border-b border-gray-300 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.company} />
                    </div>

                    {/* Nama Kontak */}
                    <div>
                        <label
                            htmlFor="contact_name"
                            className="mb-2 block text-sm text-gray-800"
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
                            className="w-full border-b border-gray-300 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.contact_name} />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm text-gray-800"
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
                            className="w-full border-b border-gray-300 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.email} />
                    </div>

                    {/* Telepon */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="mb-2 block text-sm text-gray-800"
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
                            className="w-full border-b border-gray-300 bg-transparent py-2 transition-colors focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.phone} />
                    </div>

                    {/* Pesan */}
                    <div>
                        <label
                            htmlFor="message"
                            className="mb-2 block text-sm text-gray-800"
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
                            className="w-full border border-gray-300 bg-white p-4 text-sm focus:border-black focus:outline-none"
                        ></textarea>
                        <FieldError message={errors.message} />
                    </div>

                    {/* Submit */}
                    <div className="border-b border-gray-300 pb-10">
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
