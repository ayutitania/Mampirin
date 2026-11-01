<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Instruksi Pembayaran Iklan - Mampirin Magazine</title>
    @vite(['resources/css/app.css'])
</head>
<body class="font-sans antialiased text-gray-900 bg-white">

    <div class="max-w-6xl mx-auto px-4 font-sans text-gray-900 pb-16">

        <!-- Top Banner / Ads Placeholder -->
        <div class="flex justify-center space-x-2 py-2 text-xs text-gray-400 border-b border-gray-200">
            <span>[Banner Ads]</span>
            <span>[Banner Ads]</span>
            <span>[Banner Ads]</span>
        </div>

        <!-- Navbar Global -->
        <nav class="flex justify-center space-x-6 py-4 border-b border-gray-300 mb-6 text-sm font-bold uppercase tracking-widest relative z-20">
            <a href="/" class="hover:text-gray-500">Home</a>
            <a href="/about" class="hover:text-gray-500">About</a>
            <a href="/article" class="hover:text-gray-500">Article</a>
            <a href="/write-us" class="hover:text-gray-500">Write Us</a>
            <a href="/ads" class="hover:text-black text-black">Ads</a>
            <a href="#footer-contact" class="hover:text-gray-500">Contact</a>
        </nav>

        <!-- Header -->
        <header class="text-center mb-10">
            <a href="/">
                <h1 class="text-6xl font-black uppercase tracking-tighter">Mampirin Magazine</h1>
            </a>
            <p class="text-xs tracking-[0.3em] mt-2 text-gray-500 uppercase">Mampir Dulu, Baca Berita</p>
        </header>

        <!-- Breadcrumb Navigation -->
        <div class="flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-500 mb-8 border-b border-gray-200 pb-3">
            <a href="/" class="hover:text-black">Home</a>
            <span>/</span>
            <a href="/ads" class="hover:text-black">Kemitraan Iklan</a>
            <span>/</span>
            <span class="text-black font-bold">Instruksi Pembayaran (Blade View)</span>
        </div>

        @php
            $isPaid = $order->payment_status === 'paid';
            $formattedPrice = 'Rp ' . number_format($order->package_price, 0, ',', '.');
        @endphp

        <!-- Main Container -->
        <div class="max-w-4xl mx-auto border-t-[4px] border-black pt-8">

            <!-- Status Notification -->
            @if ($isPaid)
                <div class="border-[3px] border-black bg-black text-white p-6 mb-10 shadow-lg">
                    <div class="flex items-center space-x-3 mb-2">
                        <span class="text-2xl">&#10003;</span>
                        <h2 class="text-2xl md:text-3xl font-black uppercase tracking-tight">
                            Pembayaran Berhasil Diverifikasi!
                        </h2>
                    </div>
                    <p class="text-sm font-serif text-gray-200">
                        Terima kasih! Pesanan iklan UMKM <strong>{{ $order->cafe_name }}</strong> telah lunas. Tim redaksi Mampirin segera menghubungi nomor WhatsApp <strong>{{ $order->whatsapp_number }}</strong> dalam 1x24 jam kerja untuk penjadwalan liputan.
                    </p>
                </div>
            @else
                <div class="border-[3px] border-black bg-yellow-50 p-6 mb-10">
                    <div class="flex items-center space-x-3 mb-2">
                        <span class="w-3 h-3 rounded-full bg-yellow-500 animate-ping inline-block"></span>
                        <h2 class="text-2xl md:text-3xl font-black uppercase tracking-tight">
                            Menunggu Pembayaran
                        </h2>
                    </div>
                    <p class="text-sm font-serif text-gray-700">
                        Data pesanan Anda telah tersimpan dengan Kode Order: <span class="font-mono font-bold bg-white px-2 py-0.5 border border-gray-400">{{ $order->order_code }}</span>. Silakan selesaikan pembayaran melalui simulasi di bawah untuk melanjutkan ke proses peliputan.
                    </p>
                </div>
            @endif

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                <!-- Left Column: Order Summary Card -->
                <div class="md:col-span-1 border border-gray-300 p-6 bg-white self-start">
                    <div class="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-2 mb-4">
                        Ringkasan Pesanan
                    </div>

                    <div class="space-y-4 text-xs">
                        <div>
                            <span class="text-gray-500 block uppercase tracking-wider text-[10px]">Kode Invoice:</span>
                            <span class="font-mono font-bold text-sm text-black">{{ $order->order_code }}</span>
                        </div>

                        <div>
                            <span class="text-gray-500 block uppercase tracking-wider text-[10px]">Nama UMKM / Bisnis:</span>
                            <span class="font-bold text-gray-900">{{ $order->cafe_name }}</span>
                        </div>

                        <div>
                            <span class="text-gray-500 block uppercase tracking-wider text-[10px]">Pemilik / PIC:</span>
                            <span class="text-gray-800">{{ $order->owner_name }}</span>
                        </div>

                        <div>
                            <span class="text-gray-500 block uppercase tracking-wider text-[10px]">WhatsApp:</span>
                            <span class="text-gray-800 font-mono">{{ $order->whatsapp_number }}</span>
                        </div>

                        <div>
                            <span class="text-gray-500 block uppercase tracking-wider text-[10px]">Sosial Media:</span>
                            <span class="text-gray-800">{{ $order->social_media ?? '-' }}</span>
                        </div>

                        <div class="pt-3 border-t border-gray-200">
                            <span class="text-gray-500 block uppercase tracking-wider text-[10px]">Paket Terpilih:</span>
                            <span class="font-bold text-sm text-black block">{{ $order->package_name }}</span>
                        </div>

                        <div class="pt-3 border-t border-gray-300">
                            <span class="text-gray-500 block uppercase tracking-wider text-[10px]">Total Tagihan:</span>
                            <span class="text-2xl font-black tracking-tight text-black block">{{ $formattedPrice }}</span>
                        </div>

                        <div>
                            <span class="text-gray-500 block uppercase tracking-wider text-[10px]">Status:</span>
                            @if ($isPaid)
                                <span class="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mt-1">
                                    &#10003; LUNAS / PAID
                                </span>
                            @else
                                <span class="inline-block bg-yellow-400 text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mt-1">
                                    PENDING PAYMENT
                                </span>
                            @endif
                        </div>
                    </div>
                </div>

                <!-- Right Column: Payment Gateway Simulator -->
                <div class="md:col-span-2 border-[2px] border-black p-6 bg-white">

                    @if ($isPaid)
                        <!-- Receipt State -->
                        <div class="space-y-6">
                            <div class="border-b border-gray-300 pb-4">
                                <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    Bukti Transaksi Resmi
                                </span>
                                <h3 class="text-3xl font-black uppercase tracking-tight mt-1">
                                    Invoice #{{ $order->order_code }}
                                </h3>
                                <p class="text-xs font-serif text-gray-600 mt-1">
                                    Dibayar pada: {{ optional($order->paid_at)->format('d M Y, H:i') ?? date('d M Y, H:i') }} via {{ $order->payment_method ?? 'Metode Pembayaran Online' }}
                                </p>
                            </div>

                            <div class="bg-gray-50 border border-gray-300 p-5 space-y-3 font-serif text-sm">
                                <div class="flex justify-between border-b border-gray-200 pb-2">
                                    <span class="text-gray-600">Alamat UMKM:</span>
                                    <span class="text-right text-gray-900 max-w-xs">{{ $order->address }}</span>
                                </div>
                                @if ($order->notes)
                                    <div class="flex justify-between border-b border-gray-200 pb-2">
                                        <span class="text-gray-600">Catatan Khusus:</span>
                                        <span class="text-right text-gray-900 italic max-w-xs">{{ $order->notes }}</span>
                                    </div>
                                @endif
                                <div class="flex justify-between pt-1 font-bold font-sans">
                                    <span>Jumlah Dibayarkan:</span>
                                    <span>{{ $formattedPrice }} (Lunas)</span>
                                </div>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-3 pt-4">
                                <a
                                    href="https://wa.me/6281234567890?text={{ urlencode('Halo Redaksi Mampirin, saya sudah menyelesaikan pembayaran pesanan iklan UMKM ' . $order->cafe_name . ' dengan invoice ' . $order->order_code . '.') }}"
                                    target="_blank"
                                    rel="noreferrer"
                                    class="flex-1 text-center bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
                                >
                                    Konfirmasi via WhatsApp Redaksi &rarr;
                                </a>
                                <button
                                    type="button"
                                    onclick="window.print()"
                                    class="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition"
                                >
                                    Cetak Bukti Bayar
                                </button>
                            </div>
                        </div>
                    @else
                        <!-- Payment Options Simulator -->
                        <div>
                            <div class="border-b border-gray-300 pb-4 mb-6">
                                <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    Simulasi Payment Gateway (Sandbox Mode)
                                </span>
                                <h3 class="text-2xl font-black uppercase tracking-tight mt-1">
                                    Pilih Metode Pembayaran
                                </h3>
                                <p class="text-xs font-serif text-gray-600">
                                    Ini adalah simulasi alur pembayaran interaktif untuk memvalidasi kelayakan user flow pemesanan iklan.
                                </p>
                            </div>

                            <!-- QRIS Mockup Box -->
                            <div class="border border-gray-300 p-6 text-center bg-gray-50 mb-6">
                                <div class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Scan QRIS Nasional
                                </div>
                                <div class="inline-block p-4 bg-white border-2 border-black mb-3 shadow-inner">
                                    <div class="w-44 h-44 bg-gray-900 flex flex-col items-center justify-center text-white p-2">
                                        <div class="border-4 border-white p-2 w-full h-full flex flex-col items-center justify-center text-center">
                                            <span class="text-xs font-mono font-bold tracking-widest">QRIS MAMPIRIN</span>
                                            <span class="text-[9px] font-mono mt-1 opacity-75">{{ $order->order_code }}</span>
                                            <div className="mt-2 text-xs">[QR MATRIX]</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-sm font-bold tracking-wide">
                                    Total: {{ $formattedPrice }}
                                </div>
                                <div class="text-[11px] font-serif text-gray-500 mt-1">
                                    Mendukung BCA, Mandiri, BRI, BNI, GoPay, OVO, ShopeePay, Dana.
                                </div>
                            </div>

                            <!-- Simulation Form -->
                            <form action="{{ route('blade.ads.payment.simulate', $order->order_code) }}" method="POST" class="pt-4 border-t border-gray-300">
                                @csrf
                                <input type="hidden" name="payment_method" value="QRIS Instant (Simulator)">

                                <button
                                    type="submit"
                                    class="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition flex items-center justify-center space-x-2"
                                >
                                    <span>&#9654;</span>
                                    <span>Simulasikan Pembayaran Berhasil (QRIS / Instant)</span>
                                </button>
                                <p class="text-[11px] text-center text-gray-500 font-serif mt-2">
                                    *Klik tombol di atas untuk mensimulasikan webhook dari payment gateway yang mengubah status pesanan menjadi Lunas secara instan.
                                </p>
                            </form>
                        </div>
                    @endif

                </div>

            </div>

            <!-- Bottom Back Button -->
            <div class="mt-10 pt-6 border-t border-gray-300 flex justify-between items-center text-xs">
                <a href="/ads" class="font-bold uppercase tracking-wider text-gray-600 hover:text-black">
                    &larr; Kembali ke Halaman Ads
                </a>
                <a href="/" class="font-bold uppercase tracking-wider text-gray-600 hover:text-black">
                    Ke Beranda Mampirin &rarr;
                </a>
            </div>

        </div>

        <!-- Footer -->
        <footer id="footer-contact" class="pt-8 text-center mt-16 border-t-[2px] border-gray-300">
            <h2 class="text-4xl font-black uppercase tracking-tighter mb-2">Mampirin Magazine</h2>
            <div class="flex justify-center space-x-3 mb-4 mt-4">
                <div class="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">f</div>
                <div class="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">X</div>
                <div class="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-600">ig</div>
            </div>
            <p class="text-[10px] text-gray-500 mb-1">&copy; 2026 — All rights reserved.</p>
            <p class="text-[10px] text-gray-500 mb-4">Desain dan Pengujian Berpusat pada Pengguna</p>
        </footer>

    </div>

</body>
</html>
