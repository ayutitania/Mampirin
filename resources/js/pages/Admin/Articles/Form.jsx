import React, { useRef, useState } from 'react';
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

export default function ArticleForm({ article = null, categories = [] }) {
    const isEdit = Boolean(article?.id);

    const { data, setData, post, put, processing, errors } = useForm({
        title: article?.title ?? '',
        slug: article?.slug ?? '',
        category_id: article?.category_id ? String(article.category_id) : '',
        excerpt: article?.excerpt ?? '',
        body: article?.body ?? '',
        image_url: article?.image_url ?? '',
        author: article?.author ?? 'Tim Mampirin',
        published_at: toDateTimeLocal(article?.published_at),
        is_featured: Boolean(article?.is_featured),
        is_published: article ? Boolean(article.is_published) : true,
        article_image: null,
    });

    const imageInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(article?.image_url ?? null);

    const selectImage = (event) => {
        const file = event.target.files?.[0] ?? null;

        setData('article_image', file);
        setImagePreview(
            file ? URL.createObjectURL(file) : (article?.image_url ?? null),
        );
    };

    const clearImage = () => {
        setData('article_image', null);
        setImagePreview(article?.image_url ?? null);

        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };

    const submit = (event) => {
        event.preventDefault();

        const options = {
            forceFormData: Boolean(data.article_image),
            onSuccess: () => {
                if (data.article_image) {
                    clearImage();
                }
            },
        };

        if (isEdit) {
            put(`/admin/articles/${article.id}`, options);
        } else {
            post('/admin/articles', options);
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Artikel' : 'Artikel Baru'}>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 gap-4 lg:grid-cols-3"
                noValidate
            >
                <div className="space-y-4 lg:col-span-2">
                    <div className="border border-gray-300 bg-white p-5">
                        <div className="mb-4">
                            <label htmlFor="title" className={labelClass}>
                                Judul *
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

                        <div className="mb-4">
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
                                placeholder="Dibuat otomatis dari judul jika dikosongkan"
                                className={inputClass}
                            />
                            <FieldError message={errors.slug} />
                        </div>

                        <div>
                            <label htmlFor="excerpt" className={labelClass}>
                                Ringkasan *
                            </label>
                            <textarea
                                id="excerpt"
                                rows={3}
                                value={data.excerpt}
                                onChange={(event) =>
                                    setData('excerpt', event.target.value)
                                }
                                className={inputClass}
                            />
                            <FieldError message={errors.excerpt} />
                        </div>
                    </div>

                    <div className="border border-gray-300 bg-white p-5">
                        <label htmlFor="body" className={labelClass}>
                            Isi Artikel *
                        </label>
                        <textarea
                            id="body"
                            rows={18}
                            value={data.body}
                            onChange={(event) =>
                                setData('body', event.target.value)
                            }
                            placeholder="Pisahkan paragraf dengan satu baris kosong."
                            className={`${inputClass} font-serif leading-relaxed`}
                        />
                        <FieldError message={errors.body} />
                        <p className="mt-1 text-xs text-gray-500">
                            Minimal 50 karakter. Setiap paragraf dipisahkan oleh
                            baris kosong.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="border border-gray-300 bg-white p-5">
                        <div className="mb-4">
                            <label htmlFor="category_id" className={labelClass}>
                                Kategori *
                            </label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(event) =>
                                    setData('category_id', event.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Pilih kategori</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <FieldError message={errors.category_id} />
                        </div>

                        <div>
                            <label htmlFor="author" className={labelClass}>
                                Penulis *
                            </label>
                            <input
                                id="author"
                                type="text"
                                value={data.author}
                                onChange={(event) =>
                                    setData('author', event.target.value)
                                }
                                className={inputClass}
                            />
                            <FieldError message={errors.author} />
                        </div>
                    </div>

                    <div className="border border-gray-300 bg-white p-5">
                        <div className="mb-4">
                            <label htmlFor="image_url" className={labelClass}>
                                URL Gambar Utama
                            </label>
                            <input
                                id="image_url"
                                type="url"
                                value={data.image_url}
                                onChange={(event) => {
                                    setData('image_url', event.target.value);
                                    setImagePreview(event.target.value || null);
                                }}
                                placeholder="https://... (atau unggah di bawah)"
                                className={inputClass}
                            />
                            <FieldError message={errors.image_url} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="article_image" className={labelClass}>
                                Unggah Gambar (opsional)
                            </label>
                            <input
                                ref={imageInputRef}
                                id="article_image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={selectImage}
                                className="block w-full text-sm text-gray-600 file:mr-3 file:border file:border-black file:bg-white file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:text-black file:uppercase hover:file:bg-black hover:file:text-white"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                JPG, PNG, atau WEBP, maksimal 4 MB. Unggahan
                                menggantikan URL di atas.
                            </p>
                            <FieldError message={errors.article_image} />
                        </div>

                        {imagePreview && (
                            <div className="mb-4 overflow-hidden border border-gray-200 bg-gray-100">
                                <img
                                    src={imagePreview}
                                    alt="Pratinjau"
                                    className="h-32 w-full object-cover"
                                />
                                {data.article_image && (
                                    <button
                                        type="button"
                                        onClick={clearImage}
                                        className="mt-2 w-full border border-gray-400 bg-white px-3 py-1.5 text-[10px] font-bold uppercase hover:border-black hover:bg-black hover:text-white"
                                    >
                                        Hapus Gambar
                                    </button>
                                )}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="published_at"
                                className={labelClass}
                            >
                                Tanggal Terbit
                            </label>
                            <input
                                id="published_at"
                                type="datetime-local"
                                value={data.published_at}
                                onChange={(event) =>
                                    setData('published_at', event.target.value)
                                }
                                className={inputClass}
                            />
                            <FieldError message={errors.published_at} />
                        </div>
                    </div>

                    <div className="space-y-3 border border-gray-300 bg-white p-5">
                        <label className="flex items-center gap-3 text-sm">
                            <input
                                type="checkbox"
                                checked={data.is_published}
                                onChange={(event) =>
                                    setData(
                                        'is_published',
                                        event.target.checked,
                                    )
                                }
                                className="h-4 w-4 border-gray-400"
                            />
                            <span>
                                <span className="font-bold">
                                    Publikasikan artikel
                                </span>
                                <span className="block text-xs text-gray-500">
                                    Jika tidak dicentang, artikel disimpan
                                    sebagai draft.
                                </span>
                            </span>
                        </label>

                        <label className="flex items-center gap-3 text-sm">
                            <input
                                type="checkbox"
                                checked={data.is_featured}
                                onChange={(event) =>
                                    setData('is_featured', event.target.checked)
                                }
                                className="h-4 w-4 border-gray-400"
                            />
                            <span>
                                <span className="font-bold">
                                    Artikel unggulan
                                </span>
                                <span className="block text-xs text-gray-500">
                                    Ditampilkan di bagian hero dan atas rubrik.
                                </span>
                            </span>
                        </label>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 bg-black px-4 py-3 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? 'Menyimpan...'
                                : isEdit
                                  ? 'Simpan Perubahan'
                                  : 'Buat Artikel'}
                        </button>
                        <Link
                            href="/admin/articles"
                            className="border border-gray-400 px-4 py-3 text-[10px] font-bold tracking-widest uppercase hover:border-black"
                        >
                            Batal
                        </Link>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
