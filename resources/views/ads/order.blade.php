<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Form Pemesanan Iklan - Mampirin Magazine</title>
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
            <span class="text-black font-bold">Form Pemesanan (Blade View)</span>
        </div>

        <!-- Main Container -->
        <div class="max-w-4xl mx-auto border-t-[4px] border-black pt-8">

            <!-- Title Section -->
            <div class="mb-8">
                <span class="bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase inline-block mb-3">
                    Form Kemitraan Promosi UMKM & Bisnis
                </span>
                <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3">
                    Daftarkan UMKM Anda
                </h2>
                <p class="text-sm font-serif text-gray-700 leading-relaxed">
                    Isi formulir verifikasi data UMKM di bawah ini. Tim kurasi redaksi Mampirin akan menganalisis brief Anda dan menyiapkan paket publikasi yang disepakati.
                </p>
            </div>

            @php
                $activePackage = $packages[$selectedPackageKey] ?? $packages['starter'];
            @endphp

            <!-- Package Selection Cards with Visual Cue -->
            <div class="mb-12">
                <div class="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2">
                    Pilihan Paket Promosi UMKM (Klik untuk beralih paket):
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-3">
                    @foreach ($packages as $key => $pkg)
                        @php
                            $isSelected = $selectedPackageKey === $key;
                        @endphp
                        <a
                            href="{{ route('blade.ads.order', ['package' => $key]) }}"
                            class="block p-6 relative transition-all duration-300 {{ $isSelected ? 'border-[4px] border-black shadow-2xl scale-105 bg-white z-10' : 'border border-gray-300 bg-gray-50 hover:border-black hover:bg-white hover:shadow-md' }}"
                        >
                            @if ($isSelected)
                                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 w-max shadow-sm">
                                    ★ Paket Terpilih ({{ $pkg['badge'] }})
                                </div>
                            @endif

                            <div class="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1 mt-1">
                                {{ $pkg['subtitle'] }}
                            </div>
                            <h3 class="text-xl font-black uppercase tracking-tight mb-2">
                                {{ $pkg['name'] }}
                            </h3>
                            <div class="mb-3">
                                <span class="text-2xl font-black tracking-tight text-black">
                                    {{ $pkg['price_label'] }}
                                </span>
                                <span class="text-xs text-gray-500 ml-1">{{ $pkg['duration'] }}</span>
                            </div>
                            <p class="text-xs font-serif text-gray-600 mb-4 leading-relaxed">
                                {{ $pkg['description'] }}
                            </p>

                            <ul class="text-xs font-serif space-y-2 mb-6">
                                @foreach (array_slice($pkg['features'], 0, 3) as $feat)
                                    <li class="flex items-start {{ $isSelected ? 'text-black font-semibold' : 'text-gray-700' }}">
                                        <span class="mr-1.5 font-bold">{{ $isSelected ? '■' : '✓' }}</span>
                                        <span>{{ $feat }}</span>
                                    </li>
                                @endforeach
                            </ul>

                            <div class="text-center w-full py-2.5 text-xs font-bold uppercase tracking-wider transition-colors {{ $isSelected ? 'bg-black text-white shadow-md' : 'border border-black text-black hover:bg-black hover:text-white' }}">
                                {{ $isSelected ? '✓ Paket Aktif' : 'Pilih Paket Ini' }}
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>

            <!-- Order Form -->
            <form action="{{ route('blade.ads.order.store') }}" method="POST" class="space-y-8">
                @csrf

                <!-- Hidden Package Type Field -->
                <input type="hidden" name="package_type" value="{{ $selectedPackageKey }}">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- 1. Nama UMKM / Bisnis -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                            1. Nama UMKM / Bisnis <span class="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="cafe_name"
                            value="{{ old('cafe_name') }}"
                            placeholder="Contoh: Titik Kumpul Coffee Roastery"
                            class="w-full border-b @error('cafe_name') border-red-500 @else border-gray-300 @enderror py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors"
                            required
                        >
                        @error('cafe_name')
                            <p class="text-red-600 text-xs mt-1.5">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 2. Nama Pemilik / Penanggung Jawab -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                            2. Nama Pemilik / Penanggung Jawab <span class="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="owner_name"
                            value="{{ old('owner_name') }}"
                            placeholder="Contoh: Arya Daniswara"
                            class="w-full border-b @error('owner_name') border-red-500 @else border-gray-300 @enderror py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors"
                            required
                        >
                        @error('owner_name')
                            <p class="text-red-600 text-xs mt-1.5">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- 3. Nomor WhatsApp Aktif -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                            3. Nomor WhatsApp Aktif <span class="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="whatsapp_number"
                            value="{{ old('whatsapp_number') }}"
                            placeholder="Contoh: 081234567890"
                            class="w-full border-b @error('whatsapp_number') border-red-500 @else border-gray-300 @enderror py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors"
                            required
                        >
                        <span class="text-[11px] text-gray-400 block mt-1">
                            Akan dihubungi tim redaksi untuk konfirmasi jadwal liputan on-site.
                        </span>
                        @error('whatsapp_number')
                            <p class="text-red-600 text-xs mt-1.5">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 4. Akun Media Sosial -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                            4. Akun Instagram / TikTok UMKM (Opsional)
                        </label>
                        <input
                            type="text"
                            name="social_media"
                            value="{{ old('social_media') }}"
                            placeholder="Contoh: @titikkumpul.coffee (Boleh kosong jika belum ada)"
                            class="w-full border-b @error('social_media') border-red-500 @else border-gray-300 @enderror py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors"
                        >
                        <span class="text-[11px] text-gray-400 block mt-1">
                            Boleh dikosongkan jika UMKM Anda belum memiliki akun media sosial.
                        </span>
                        @error('social_media')
                            <p class="text-red-600 text-xs mt-1.5">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- 5. Alamat Lengkap & Link Google Maps UMKM -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                            5. Alamat Lengkap UMKM <span class="text-red-600">*</span>
                        </label>
                        <textarea
                            rows="3"
                            name="address"
                            placeholder="Contoh: Jl. Kampus UNUD No. 18, Jimbaran, Kec. Kuta Selatan, Kabupaten Badung, Bali 80361"
                            class="w-full border @error('address') border-red-500 @else border-gray-300 @enderror p-3 focus:outline-none focus:border-black bg-white text-sm transition-colors"
                            required
                        >{{ old('address') }}</textarea>
                        @error('address')
                            <p class="text-red-600 text-xs mt-1.5">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                            Link Google Maps UMKM (Opsional)
                        </label>
                        <input
                            type="url"
                            name="maps_url"
                            value="{{ old('maps_url') }}"
                            placeholder="https://maps.app.goo.gl/..."
                            class="w-full border-b @error('maps_url') border-red-500 @else border-gray-300 @enderror py-2.5 px-1 focus:outline-none focus:border-black bg-transparent text-sm transition-colors"
                        >
                        @error('maps_url')
                            <p class="text-red-600 text-xs mt-1.5">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- 6. Paket Yang Dipilih (Visual Locked Confirmation) -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                        6. Paket Terpilih (Sistem Auto-Lock)
                    </label>
                    <div class="border border-gray-300 bg-gray-100 p-3 flex justify-between items-center text-sm">
                        <div class="font-bold uppercase tracking-wide">
                            {{ $activePackage['name'] }} ({{ $activePackage['subtitle'] }})
                        </div>
                        <div class="bg-black text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                            Terkonfirmasi: {{ $activePackage['price_label'] }}
                        </div>
                    </div>
                </div>

                <!-- 7. Catatan / Brief Khusus Promosi -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                        7. Catatan / Brief Khusus Promosi
                    </label>
                    <textarea
                        rows="4"
                        name="notes"
                        placeholder="Ceritakan keunggulan tempat Anda, misalnya: Signature menu kopi gula aren, colokan tiap meja, view sunset, diskon khusus mahasiswa 15%, dll."
                        class="w-full border border-gray-300 p-3 focus:outline-none focus:border-black bg-white text-sm"
                    >{{ old('notes') }}</textarea>
                    <span class="text-[11px] text-gray-400 block mt-1 font-serif">
                        Tim penulis kami akan menggunakan catatan ini sebagai bahan penyusunan draft liputan.
                    </span>
                </div>

                <!-- Verification Box -->
                <div class="border border-gray-200 bg-gray-50 p-4 text-xs font-serif text-gray-600 space-y-2">
                    <div class="flex items-center text-black font-bold uppercase tracking-wider text-[11px]">
                        <span class="mr-2 text-base">&#9888;</span> Ketentuan Alur Pemesanan
                    </div>
                    <p>
                        Setelah formulir ini dikirimkan, Anda akan diarahkan ke halaman simulasi pembayaran. Pesanan Anda akan tercatat dengan status <strong>Pending</strong> hingga pembayaran terverifikasi.
                    </p>
                </div>

                <!-- Action Buttons -->
                <div class="pt-6 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a
                        href="/ads"
                        class="text-xs uppercase font-bold tracking-widest text-gray-600 hover:text-black"
                    >
                        &larr; Kembali ke Pilihan Paket
                    </a>

                    <button
                        type="submit"
                        class="w-full sm:w-auto bg-black text-white px-10 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
                    >
                        Lanjutkan ke Pembayaran &rarr;
                    </button>
                </div>

            </form>

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
