<?php

namespace App\Http\Controllers;

use App\Models\AdOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdOrderController extends Controller
{
    /**
     * Tampilkan form pemesanan iklan (Inertia React)
     */
    public function create(Request $request)
    {
        $packages = AdOrder::packages();
        $selectedKey = $request->query('package', 'starter');

        if (!array_key_exists($selectedKey, $packages)) {
            $selectedKey = 'starter';
        }

        return Inertia::render('AdsOrder', [
            'selectedPackageKey' => $selectedKey,
            'packages' => $packages,
        ]);
    }

    /**
     * Simpan data pemesanan iklan ke database
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cafe_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:1000',
            'maps_url' => 'nullable|url|max:500',
            'social_media' => 'nullable|string|max:255',
            'package_type' => 'required|string|in:starter,viral-buzz,growth-partner',
            'notes' => 'nullable|string|max:2000',
        ], [
            'cafe_name.required' => 'Nama UMKM / Bisnis wajib diisi.',
            'owner_name.required' => 'Nama Pemilik / Penanggung Jawab wajib diisi.',
            'email.required' => 'Alamat email aktif wajib diisi.',
            'email.email' => 'Format email tidak valid (contoh: nama@domain.com).',
            'address.required' => 'Alamat lengkap UMKM wajib diisi.',
            'maps_url.url' => 'Format link Google Maps tidak valid (gunakan awalan http:// atau https://).',
            'package_type.required' => 'Paket promosi wajib dipilih.',
            'package_type.in' => 'Pilihan paket tidak valid.',
        ]);

        $packages = AdOrder::packages();
        $packageInfo = $packages[$validated['package_type']];

        $orderCode = 'MMPR-' . date('Ymd') . '-' . strtoupper(Str::random(5));

        $order = AdOrder::create([
            'order_code' => $orderCode,
            'package_type' => $validated['package_type'],
            'package_name' => $packageInfo['name'],
            'package_price' => $packageInfo['price'],
            'cafe_name' => $validated['cafe_name'],
            'owner_name' => $validated['owner_name'],
            'email' => $validated['email'],
            'whatsapp_number' => $request->input('whatsapp_number', null),
            'address' => $validated['address'],
            'maps_url' => $validated['maps_url'] ?? null,
            'social_media' => $validated['social_media'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'payment_status' => 'pending',
        ]);

        return redirect()->route('ads.payment', ['order' => $order->order_code]);
    }

    /**
     * Halaman simulasi pembayaran (Inertia React)
     */
    public function payment($order_code)
    {
        $order = AdOrder::where('order_code', $order_code)->firstOrFail();

        return Inertia::render('AdsPayment', [
            'order' => $order,
            'packages' => AdOrder::packages(),
        ]);
    }

    /**
     * Mockup / simulasi pembayaran berhasil
     */
    public function simulatePayment(Request $request, $order_code)
    {
        $order = AdOrder::where('order_code', $order_code)->firstOrFail();

        $paymentMethod = $request->input('payment_method', 'QRIS (Gopay/OVO/BCA)');

        $order->update([
            'payment_status' => 'paid',
            'payment_method' => $paymentMethod,
            'paid_at' => now(),
        ]);

        return redirect()->route('ads.payment', ['order' => $order->order_code])
            ->with('success', 'Pembayaran berhasil disimulasikan!');
    }

    // ==========================================
    // METODE UNTUK VERSI VIEW BLADE (TUGAS KULIAH)
    // ==========================================

    /**
     * Tampilkan form pemesanan versi Blade
     */
    public function createBlade(Request $request)
    {
        $packages = AdOrder::packages();
        $selectedKey = $request->query('package', 'starter');

        if (!array_key_exists($selectedKey, $packages)) {
            $selectedKey = 'starter';
        }

        return view('ads.order', [
            'selectedPackageKey' => $selectedKey,
            'packages' => $packages,
        ]);
    }

    /**
     * Simpan data via form Blade
     */
    public function storeBlade(Request $request)
    {
        $validated = $request->validate([
            'cafe_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:1000',
            'maps_url' => 'nullable|url|max:500',
            'social_media' => 'nullable|string|max:255',
            'package_type' => 'required|string|in:starter,viral-buzz,growth-partner',
            'notes' => 'nullable|string|max:2000',
        ]);

        $packages = AdOrder::packages();
        $packageInfo = $packages[$validated['package_type']];

        $orderCode = 'MMPR-' . date('Ymd') . '-' . strtoupper(Str::random(5));

        $order = AdOrder::create([
            'order_code' => $orderCode,
            'package_type' => $validated['package_type'],
            'package_name' => $packageInfo['name'],
            'package_price' => $packageInfo['price'],
            'cafe_name' => $validated['cafe_name'],
            'owner_name' => $validated['owner_name'],
            'email' => $validated['email'],
            'whatsapp_number' => $request->input('whatsapp_number', null),
            'address' => $validated['address'],
            'maps_url' => $validated['maps_url'] ?? null,
            'social_media' => $validated['social_media'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'payment_status' => 'pending',
        ]);

        return redirect()->route('blade.ads.payment', ['order' => $order->order_code]);
    }

    /**
     * Halaman pembayaran versi Blade
     */
    public function paymentBlade($order_code)
    {
        $order = AdOrder::where('order_code', $order_code)->firstOrFail();

        return view('ads.payment', [
            'order' => $order,
            'packages' => AdOrder::packages(),
        ]);
    }

    /**
     * Simulasi pembayaran versi Blade
     */
    public function simulatePaymentBlade(Request $request, $order_code)
    {
        $order = AdOrder::where('order_code', $order_code)->firstOrFail();

        $paymentMethod = $request->input('payment_method', 'QRIS (Gopay/OVO/BCA)');

        $order->update([
            'payment_status' => 'paid',
            'payment_method' => $paymentMethod,
            'paid_at' => now(),
        ]);

        return redirect()->route('blade.ads.payment', ['order' => $order->order_code])
            ->with('success', 'Pembayaran berhasil disimulasikan!');
    }
}
