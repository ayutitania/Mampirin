import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../components/AppLayout';

const FAQS = [
    {
        question: 'Syarat kirim tulisan lewat Write Us',
        answer:
            'Isi judul, isi artikel (minimal 50 karakter), nama pengirim, dan email yang aktif. Telepon bersifat opsional. Kamu boleh menyertakan foto pendukung (JPG/PNG/WEBP, maksimal 4 MB) agar cerita lebih hidup.',
    },
    {
        question: 'Seberapa lama kiriman ditinjau?',
        answer:
            'Tim redaksi meninjau kiriman secara berkala. Kalau disetujui, tulisanmu dipublikasikan lengkap dengan foto pilihanmu (atau sampul yang disiapkan tim redaksi). Kamu bisa menandai tulisan sebagai unggulan.',
    },
    {
        question: 'Apakah tulisan harus orisinal?',
        answer:
            'Ya. Tulisankan harus orisinal dari pengirim. Tulisan yang jiplak atau mengarang nama tokoh tanpa izin akan kami tolak. Hak cipta tetap milik penulis; Mampirin hanya menerbitkannya sebagai liputan.',
    },
    {
        question: 'Bagaimana flow kemitraan iklan (paket di halaman Ads)?',
        answer:
            'Pilih paket di halaman Ads, lalu isi form di halaman Partnership. Tim kami akan menghubungimu, dan setelah disetujui, iklanmu langsung dibuat oleh admin dan tampil di banner atas / sidebar situs tanpa input manual.',
    },
    {
        question: 'Apakah ada opsi "belum menentukan paket" / konsultasi?',
        answer:
            'Tidak. Setiap pengajuan kemitraan harus memilih salah satu paket (Starter, Viral Buzz, atau Growth Partner). Jika masih ragu, tulis detail kebutuhanmu di pesan form — tim redaksi akan merekomendasikan paket yang sesuai.',
    },
    {
        question: 'Berapa lama iklan tayang setelah disetujui?',
        answer:
            'Begitu admin menyetujui pengajuan sponsor, iklanmu langsung aktif (sesuai jadwal Mulai/Berakhir Tayang yang dipilih) dan tampil di slot iklan yang kamu tentukan.',
    },
];

export default function Faq() {
    return (
        <AppLayout
            title="FAQ & Syarat Pengiriman"
            description="Syarat kirim tulisan, alur tinjauan kiriman pembaca, dan alur kemitraan iklan di Mampirin Magazine."
        >
            <div className="mx-auto max-w-4xl border-t-[4px] border-black pt-8">
                <div className="mb-4 w-max bg-black px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                    FAQ
                </div>
                <h2 className="mb-4 text-[3rem] leading-none font-black tracking-tighter uppercase">
                    Syarat &amp; FAQ
                </h2>
                <p className="mb-10 border-b border-gray-300 dark:border-gray-700 pb-6 text-sm text-gray-700 dark:text-gray-300">
                    Semua yang perlu kamu ketahui sebelum mengirim tulisan atau
                    mengajukan kemitraan iklan.
                </p>

                <dl className="mb-12 divide-y divide-gray-300">
                    {FAQS.map((item) => (
                        <div key={item.question} className="space-y-2 py-6">
                            <dt className="text-lg font-black tracking-tight uppercase">
                                {item.question}
                            </dt>
                            <dd className="font-serif text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                {item.answer}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="flex flex-wrap gap-4 border-t border-gray-300 dark:border-gray-700 pt-6">
                    <Link
                        href="/write-us"
                        className="bg-black px-6 py-3 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-gray-800"
                    >
                        Kirim Tulisan
                    </Link>
                    <Link
                        href="/partnership"
                        className="border-[2px] border-black px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-black hover:text-white"
                    >
                        Ajukan Kemitraan
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
