import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';

function toDateTimeLocal(value) {
    if (!value) {
        return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const pad = (number) => String(number).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate(),
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function FieldError({ message }) {
    if (!message) {
        return null;
    }

    return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

const inputClass =
    'w-full border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none';
const labelClass =
    'mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase';

export default function AdForm({ ad = null, placements = [] }) {
    const isEdit = Boolean(ad?.id);

    const { data, setData, post, put, processing, errors } = useForm({
        title: ad?.title ?? '',
        image_url: ad?.image_url ?? '',
        target_url: ad?.target_url ?? '',
        placement: ad?.placement ?? placements[0]?.value ?? 'top',
        starts_at: toDateTimeLocal(ad?.starts_at),
        ends_at: toDateTimeLocal(ad?.ends_at),
        sort_order: ad?.sort_order ?? 0,
        is_active: ad ? Boolean(ad.is_active) : true,
    });

    const submit = (event) => {
        event.preventDefault();

        if (isEdit) {
            put(`/admin/ads/${ad.id}`);
        } else {
            post('/admin/ads');
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Iklan' : 'Iklan Baru'}>
            <form onSubmit={submit} className="max-w-3xl space-y-4" noValidate>
                <div className="space-y-4 border border-gray-300 bg-white p-5">
                    <div>
                        <label htmlFor="title" className={labelClass}>
                            Judul Iklan *
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(event) =>
                                setData('title', event.target.value)
                            }
                            className={inputClass}
                        />
                        <FieldError message={errors.title} />
                    </div>

                    <div>
                        <label htmlFor="image_url" className={labelClass}>
                            URL Gambar
                        </label>
                        <input
                            id="image_url"
                            type="text"
                            value={data.image_url}
                            onChange={(event) =>
                                setData('image_url', event.target.value)
                            }
                            placeholder="https://... atau /storage/..."
                            className={inputClass}
                        />
                        <FieldError message={errors.image_url} />
                        <p className="mt-1 text-xs text-gray-500">
                            Kosongkan untuk menampilkan judul sebagai teks
                            banner.
                        </p>
                    </div>

                    {data.image_url && (
                        <div className="overflow-hidden border border-gray-200 bg-gray-100">
                            <img
                                src={data.image_url}
                                alt="Pratinjau iklan"
                                className="h-40 w-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="target_url" className={labelClass}>
                            URL Tujuan
                        </label>
                        <input
                            id="target_url"
                            type="text"
                            value={data.target_url}
                            onChange={(event) =>
                                setData('target_url', event.target.value)
                            }
                            placeholder="https://instagram.com/... atau /partnership"
                            className={inputClass}
                        />
                        <FieldError message={errors.target_url} />
                        <p className="mt-1 text-xs text-gray-500">
                            Iklan akan membuka URL ini saat diklik, bukan
                            halaman /ads.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="placement" className={labelClass}>
                                Penempatan *
                            </label>
                            <select
                                id="placement"
                                value={data.placement}
                                onChange={(event) =>
                                    setData('placement', event.target.value)
                                }
                                className={inputClass}
                            >
                                {placements.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            <FieldError message={errors.placement} />
                        </div>

                        <div>
                            <label htmlFor="sort_order" className={labelClass}>
                                Urutan Tampil
                            </label>
                            <input
                                id="sort_order"
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(event) =>
                                    setData('sort_order', event.target.value)
                                }
                                className={inputClass}
                            />
                            <FieldError message={errors.sort_order} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="starts_at" className={labelClass}>
                                Mulai Tayang
                            </label>
                            <input
                                id="starts_at"
                                type="datetime-local"
                                value={data.starts_at}
                                onChange={(event) =>
                                    setData('starts_at', event.target.value)
                                }
                                className={inputClass}
                            />
                            <FieldError message={errors.starts_at} />
                        </div>

                        <div>
                            <label htmlFor="ends_at" className={labelClass}>
                                Berakhir
                            </label>
                            <input
                                id="ends_at"
                                type="datetime-local"
                                value={data.ends_at}
                                onChange={(event) =>
                                    setData('ends_at', event.target.value)
                                }
                                className={inputClass}
                            />
                            <FieldError message={errors.ends_at} />
                        </div>
                    </div>

                    <label className="flex items-center gap-3 text-sm">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(event) =>
                                setData('is_active', event.target.checked)
                            }
                            className="h-4 w-4 border-gray-400"
                        />
                        <span>
                            <span className="font-bold">Aktifkan iklan</span>
                            <span className="block text-xs text-gray-500">
                                Iklan nonaktif tidak akan tampil di situs.
                            </span>
                        </span>
                    </label>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-black px-5 py-3 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing
                            ? 'Menyimpan...'
                            : isEdit
                              ? 'Simpan Perubahan'
                              : 'Buat Iklan'}
                    </button>
                    <Link
                        href="/admin/ads"
                        className="border border-gray-400 px-5 py-3 text-[10px] font-bold tracking-widest uppercase hover:border-black"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
