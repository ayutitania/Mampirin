import React from 'react';
import { Link, useForm } from '@inertiajs/react';

function FieldError({ message }) {
    if (!message) return null;

    return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event) => {
        event.preventDefault();

        post('/admin/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 font-sans text-gray-900">
            <div className="w-full max-w-md border-t-[6px] border-black bg-white p-8 shadow-xl md:p-10">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-black tracking-tighter uppercase">
                        Mampirin
                    </h1>
                    <p className="mt-1 text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                        Panel Admin
                    </p>
                </div>

                <h2 className="mb-1 text-2xl font-black tracking-tight uppercase">
                    Masuk
                </h2>
                <p className="mb-8 border-b border-gray-300 pb-4 text-sm text-gray-600">
                    Kelola artikel, kategori, dan kiriman pembaca.
                </p>

                <form className="space-y-6" onSubmit={submit} noValidate>
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
                            autoComplete="email"
                            value={data.email}
                            onChange={(event) =>
                                setData('email', event.target.value)
                            }
                            className="w-full border-b border-gray-300 bg-transparent py-2 focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.email} />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm text-gray-800"
                        >
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(event) =>
                                setData('password', event.target.value)
                            }
                            className="w-full border-b border-gray-300 bg-transparent py-2 focus:border-black focus:outline-none"
                        />
                        <FieldError message={errors.password} />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(event) =>
                                setData('remember', event.target.checked)
                            }
                            className="h-4 w-4 border-gray-400"
                        />
                        Ingat saya
                    </label>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-black px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Memproses...' : 'Masuk ke Panel'}
                    </button>
                </form>

                <div className="mt-8 border-t border-gray-200 pt-4 text-center">
                    <Link
                        href="/"
                        className="text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-black"
                    >
                        &larr; Kembali ke Situs
                    </Link>
                </div>
            </div>
        </div>
    );
}
