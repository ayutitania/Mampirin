import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function AdsPayment({ order, packages }) {
  const isPaid = order.payment_status === 'paid';
  const [selectedMethod, setSelectedMethod] = useState('QRIS Instant');
  const [copied, setCopied] = useState(false);

  const { post, processing } = useForm({
    payment_method: selectedMethod,
  });

  const handleSimulatePayment = () => {
    post(`/ads/payment/${order.order_code}/simulate`, {
      data: { payment_method: selectedMethod },
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(order.package_price);

  return (
    <div className="max-w-6xl mx-auto px-4 font-sans text-gray-900 pb-16">

      {/* Top Banner / Ads Placeholder */}
      <div className="flex justify-center space-x-2 py-2 text-xs text-gray-400 border-b border-gray-200">
        <span>[Banner Ads]</span>
        <span>[Banner Ads]</span>
        <span>[Banner Ads]</span>
      </div>

      {/* Navbar Global */}
      <nav className="flex justify-center space-x-6 py-4 border-b border-gray-300 mb-6 text-sm font-bold uppercase tracking-widest relative z-20">
        <Link href="/" className="hover:text-gray-500">Home</Link>
        <Link href="/about" className="hover:text-gray-500">About</Link>

        {/* Dropdown Article */}
        <div className="relative group cursor-pointer">
          <Link href="/article" className="hover:text-gray-500 flex items-center">
            Article
          </Link>
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 shadow-xl hidden group-hover:block z-30">
            <Link href="/article/entertainment" className="block px-4 py-3 hover:bg-gray-200 border-b border-gray-200 text-xs">Entertainment</Link>
            <Link href="/article/history" className="block px-4 py-3 hover:bg-gray-200 border-b border-gray-200 text-xs">History</Link>
            <Link href="/article/lifestyle" className="block px-4 py-3 hover:bg-gray-200 text-xs">Lifestyle</Link>
          </div>
        </div>

        <Link href="/write-us" className="hover:text-gray-500">Write Us</Link>
        <Link href="/ads" className="hover:text-black text-black">Ads</Link>
        <a href="#footer-contact" className="hover:text-gray-500">Contact</a>
      </nav>

      {/* Header */}
      <header className="text-center mb-10">
        <Link href="/">
          <h1 className="text-6xl font-black uppercase tracking-tighter">Mampirin Magazine</h1>
        </Link>
        <p className="text-xs tracking-[0.3em] mt-2 text-gray-500 uppercase">Mampir Dulu, Baca Berita</p>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-500 mb-8 border-b border-gray-200 pb-3">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/ads" className="hover:text-black">Kemitraan Iklan</Link>
        <span>/</span>
        <span className="text-black font-bold">Instruksi Pembayaran</span>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto border-t-[4px] border-black pt-8">

        {/* Status Notification */}
        {isPaid ? (
          <div className="border-[3px] border-black bg-black text-white p-6 mb-10 shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">&#10003;</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Pembayaran Berhasil Diverifikasi!
              </h2>
            </div>
            <p className="text-sm font-serif text-gray-200">
              Terima kasih! Pesanan iklan UMKM <strong>{order.cafe_name}</strong> telah lunas. Tim redaksi Mampirin segera menghubungi nomor WhatsApp <strong>{order.whatsapp_number}</strong> dalam 1x24 jam kerja untuk penjadwalan liputan.
            </p>
          </div>
        ) : (
          <div className="border-[3px] border-black bg-yellow-50 p-6 mb-10">
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500 animate-ping inline-block"></span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Menunggu Pembayaran
              </h2>
            </div>
            <p className="text-sm font-serif text-gray-700">
              Data pesanan Anda telah tersimpan dengan Kode Order: <span className="font-mono font-bold bg-white px-2 py-0.5 border border-gray-400">{order.order_code}</span>. Silakan selesaikan pembayaran melalui simulasi di bawah untuk melanjutkan ke proses peliputan.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Column: Order Summary Card */}
          <div className="md:col-span-1 border border-gray-300 p-6 bg-white self-start">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-2 mb-4">
              Ringkasan Pesanan
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Kode Invoice:</span>
                <span className="font-mono font-bold text-sm text-black">{order.order_code}</span>
              </div>

              <div>
                <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Nama UMKM / Bisnis:</span>
                <span className="font-bold text-gray-900">{order.cafe_name}</span>
              </div>

              <div>
                <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Pemilik / PIC:</span>
                <span className="text-gray-800">{order.owner_name}</span>
              </div>

              <div>
                <span className="text-gray-500 block uppercase tracking-wider text-[10px]">WhatsApp:</span>
                <span className="text-gray-800 font-mono">{order.whatsapp_number}</span>
              </div>

              <div>
                <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Sosial Media:</span>
                <span className="text-gray-800">{order.social_media || '-'}</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Paket Terpilih:</span>
                <span className="font-bold text-sm text-black block">{order.package_name}</span>
              </div>

              <div className="pt-3 border-t border-gray-300">
                <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Total Tagihan:</span>
                <span className="text-2xl font-black tracking-tight text-black block">{formattedPrice}</span>
              </div>

              <div>
                <span className="text-gray-500 block uppercase tracking-wider text-[10px]">Status:</span>
                {isPaid ? (
                  <span className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mt-1">
                    &#10003; LUNAS / PAID
                  </span>
                ) : (
                  <span className="inline-block bg-yellow-400 text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mt-1">
                    PENDING PAYMENT
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Payment Gateway Simulator */}
          <div className="md:col-span-2 border-[2px] border-black p-6 bg-white">

            {isPaid ? (
              /* Receipt State */
              <div className="space-y-6">
                <div className="border-b border-gray-300 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Bukti Transaksi Resmi
                  </span>
                  <h3 className="text-3xl font-black uppercase tracking-tight mt-1">
                    Invoice #{order.order_code}
                  </h3>
                  <p className="text-xs font-serif text-gray-600 mt-1">
                    Dibayar pada: {new Date(order.paid_at || Date.now()).toLocaleString('id-ID')} via {order.payment_method || 'Metode Pembayaran Online'}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-300 p-5 space-y-3 font-serif text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Alamat UMKM:</span>
                    <span className="text-right text-gray-900 max-w-xs">{order.address}</span>
                  </div>
                  {order.notes && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Catatan Khusus:</span>
                      <span className="text-right text-gray-900 italic max-w-xs">{order.notes}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 font-bold font-sans">
                    <span>Jumlah Dibayarkan:</span>
                    <span>{formattedPrice} (Lunas)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                      `Halo Redaksi Mampirin, saya sudah menyelesaikan pembayaran untuk pesanan iklan UMKM: ${order.cafe_name} dengan kode: ${order.order_code}. Mohon konfirmasi jadwalnya.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
                  >
                    Konfirmasi via WhatsApp Redaksi &rarr;
                  </a>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition"
                  >
                    Cetak Bukti Bayar
                  </button>
                </div>
              </div>
            ) : (
              /* Payment Options Simulator */
              <div>
                <div className="border-b border-gray-300 pb-4 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Simulasi Payment Gateway (Sandbox Mode)
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight mt-1">
                    Pilih Metode Pembayaran
                  </h3>
                  <p className="text-xs font-serif text-gray-600">
                    Ini adalah simulasi alur pembayaran interaktif untuk memvalidasi kelayakan user flow pemesanan iklan.
                  </p>
                </div>

                {/* Tabs / Method Selector */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {['QRIS Instant', 'Virtual Account BCA', 'Mandiri VA'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setSelectedMethod(method)}
                      className={`py-2 px-3 text-xs uppercase font-bold tracking-wider border transition-colors ${
                        selectedMethod === method
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-black'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {/* Method Display Card */}
                {selectedMethod === 'QRIS Instant' && (
                  <div className="border border-gray-300 p-6 text-center bg-gray-50 mb-6">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Scan QRIS Menggunakan Aplikasi Mobile Banking / e-Wallet
                    </div>
                    {/* Mockup QR Code Graphic */}
                    <div className="inline-block p-4 bg-white border-2 border-black mb-3 shadow-inner">
                      <div className="w-48 h-48 bg-gray-900 flex flex-col items-center justify-center text-white p-2">
                        <div className="border-4 border-white p-2 w-full h-full flex flex-col items-center justify-center text-center">
                          <span className="text-xs font-mono font-bold tracking-widest">QRIS MAMPIRIN</span>
                          <span className="text-[9px] font-mono mt-1 opacity-75">{order.order_code}</span>
                          <div className="mt-3 grid grid-cols-4 gap-1 w-24 h-24">
                            <div className="bg-white"></div>
                            <div className="bg-transparent"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-transparent"></div>
                            <div className="bg-white"></div>
                            <div className="bg-transparent"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-transparent"></div>
                            <div className="bg-white"></div>
                            <div className="bg-transparent"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold tracking-wide">
                      Total: {formattedPrice}
                    </div>
                    <div className="text-[11px] font-serif text-gray-500 mt-1">
                      Mendukung BCA, Mandiri, BRI, BNI, GoPay, OVO, ShopeePay, Dana.
                    </div>
                  </div>
                )}

                {selectedMethod.includes('Virtual Account') && (
                  <div className="border border-gray-300 p-6 bg-gray-50 mb-6">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Nomor Rekening Virtual Account
                    </div>
                    <div className="flex items-center justify-between bg-white border border-gray-400 p-3 mb-3">
                      <span className="font-mono font-bold text-lg tracking-wider">
                        8274 0812 9938 102
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('827408129938102')}
                        className="text-xs font-bold uppercase tracking-wider bg-gray-200 hover:bg-black hover:text-white px-3 py-1 transition"
                      >
                        {copied ? 'Tersalin!' : 'Salin'}
                      </button>
                    </div>
                    <ul className="text-xs font-serif text-gray-600 space-y-1">
                      <li>&bull; Masuk ke menu transfer Virtual Account pada m-banking Anda.</li>
                      <li>&bull; Masukkan nomor VA di atas, nominal akan otomatis tertera <strong>{formattedPrice}</strong>.</li>
                      <li>&bull; Konfirmasi nama penerima: <strong>Mampirin Ads - {order.cafe_name}</strong>.</li>
                    </ul>
                  </div>
                )}

                {selectedMethod === 'Mandiri VA' && (
                  <div className="border border-gray-300 p-6 bg-gray-50 mb-6">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Nomor Mandiri Bill Payment
                    </div>
                    <div className="flex items-center justify-between bg-white border border-gray-400 p-3 mb-3">
                      <span className="font-mono font-bold text-lg tracking-wider">
                        89372 0891 2283 491
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('8937208912283491')}
                        className="text-xs font-bold uppercase tracking-wider bg-gray-200 hover:bg-black hover:text-white px-3 py-1 transition"
                      >
                        {copied ? 'Tersalin!' : 'Salin'}
                      </button>
                    </div>
                    <div className="text-xs font-serif text-gray-600">
                      Kode Perusahaan Mampirin: <strong>89372</strong>
                    </div>
                  </div>
                )}

                {/* Simulation Button */}
                <div className="pt-4 border-t border-gray-300">
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={processing}
                    className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition flex items-center justify-center space-x-2"
                  >
                    <span>&#9654;</span>
                    <span>
                      {processing ? 'Memproses Simulasi...' : `Simulasikan Pembayaran Berhasil (${selectedMethod})`}
                    </span>
                  </button>
                  <p className="text-[11px] text-center text-gray-500 font-serif mt-2">
                    *Klik tombol di atas untuk mensimulasikan webhook dari payment gateway yang mengubah status pesanan menjadi Lunas secara instan.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Bottom Back Button */}
        <div className="mt-10 pt-6 border-t border-gray-300 flex justify-between items-center text-xs">
          <Link href="/ads" className="font-bold uppercase tracking-wider text-gray-600 hover:text-black">
            &larr; Kembali ke Halaman Ads
          </Link>
          <Link href="/" className="font-bold uppercase tracking-wider text-gray-600 hover:text-black">
            Ke Beranda Mampirin &rarr;
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer id="footer-contact" className="pt-8 text-center mt-16 border-t-[2px] border-gray-300">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Mampirin Magazine</h2>
        <div className="flex justify-center space-x-3 mb-4 mt-4">
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">f</div>
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">X</div>
          <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">ig</div>
        </div>
        <p className="text-[10px] text-gray-500 mb-1">&copy; 2026 — All rights reserved.</p>
        <p className="text-[10px] text-gray-500 mb-4">Desain dan Pengujian Berpusat pada Pengguna</p>
      </footer>

    </div>
  );
}
