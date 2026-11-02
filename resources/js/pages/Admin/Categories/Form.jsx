import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';

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

export default function CategoryForm({ category = null }) {
    const isEdit = Boolean(category?.id);

    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name ?? '',
        slug: category?.slug ?? '',
        description: category?.description ?? '',
        image_url: category?.image_url ?? '',
        sort_order: category?.sort_order ?? 0,
        is_active: category ? Boolean(category.is_active) : true,
    });

    const submit = (event) => {
        event.preventDefault();

        if (isEdit) {
            put(`/admin/categories/${category.id}`);
        } else {
            post('/admin/categories');
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Kategori' : 'Kategori Baru'}>
            <form onSubmit={submit} className="max-w-2xl space-y-4" noValidate>
                <div className="space-y-4 border border-gray-300 bg-white p-5">
                    <div>
                        <label htmlFor="name" className={labelClass}>
                            Nama Kategori *
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(event) =>
                                setData('name', event.target.value)
                            }
                            className={inputClass}
                        />
                        <FieldError message={errors.name} />
                    </div>

                    <div>
                        <label htmlFor="slug" className={labelClass}>
                            Slug (opsional)
                        </label>
                        <input
                            id="slug"
                            type="text"
                            value={data.slug}
                            onChange={(event) =>
                                setData('slug', event.target.value)
                            }
                            placeholder="Dibuat otomatis dari nama jika dikosongkan"
                            className={inputClass}
                        />
                        <FieldError message={errors.slug} />
                    </div>

                    <div>
                        <label htmlFor="description" className={labelClass}>
                            Deskripsi
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            value={data.description}
                            onChange={(event) =>
                                setData('description', event.target.value)
                            }
                            className={inputClass}
                        />
                        <FieldError message={errors.description} />
                    </div>

                    <div>
                        <label htmlFor="image_url" className={labelClass}>
                            URL Gambar
                        </label>
                        <input
                            id="image_url"
                            type="url"
                            value={data.image_url}
                            onChange={(event) =>
                                setData('image_url', event.target.value)
                            }
                            placeholder="https://..."
                            className={inputClass}
                        />
                        <FieldError message={errors.image_url} />
                    </div>

                    {data.image_url && (
                        <div className="overflow-hidden border border-gray-200 bg-gray-100">
                            <img
                                src={data.image_url}
                                alt="Pratinjau"
                                className="h-40 w-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                        <label className="flex items-end gap-3 pb-2 text-sm">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(event) =>
                                    setData('is_active', event.target.checked)
                                }
                                className="h-4 w-4 border-gray-400"
                            />
                            <span>
                                <span className="font-bold">
                                    Kategori aktif
                                </span>
                                <span className="block text-xs text-gray-500">
                                    Tampil di navbar dan halaman artikel.
                                </span>
                            </span>
                        </label>
                    </div>
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
                              : 'Buat Kategori'}
                    </button>
                    <Link
                        href="/admin/categories"
                        className="border border-gray-400 px-5 py-3 text-[10px] font-bold tracking-widest uppercase hover:border-black"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
