<?php

namespace App\Http\Controllers;

use App\Models\PartnershipInquiry;
use App\Models\PartnershipPackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnershipController extends Controller
{
    /**
     * Show the partnership inquiry page.
     */
    public function index(Request $request): Response
    {
        $packages = PartnershipPackage::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get([
                'id',
                'code',
                'label',
                'name',
                'description',
                'price',
                'price_suffix',
            ]);

        $requested = trim((string) $request->query('package'));

        // Terima ?package=02 (kode paket) maupun ?package=2 (id paket).
        $selectedPackageId = $packages
            ->first(fn (PartnershipPackage $package) => $requested !== ''
                && ((string) $package->code === $requested
                    || (string) $package->id === $requested))
            ?->id;

        return Inertia::render('Partnership', [
            'packages' => $packages,
            'selectedPackage' => $requested !== '' ? $requested : null,
            'selectedPackageId' => $selectedPackageId,
        ]);
    }

    /**
     * Store a partnership inquiry.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'partnership_package_id' => ['required', 'integer', 'exists:partnership_packages,id'],
            'company' => ['required', 'string', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'message' => ['required', 'string', 'min:20'],
            'ad_title' => ['required', 'string', 'max:255'],
            'ad_target_url' => ['nullable', 'string', 'max:2048'],
            'ad_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        unset($validated['ad_image']);

        if ($request->hasFile('ad_image')) {
            $validated['ad_image_url'] = '/storage/'.$request->file('ad_image')->store('partnership-images', 'public');
        }

        PartnershipInquiry::create([
            ...$validated,
            'ad_target_url' => ($validated['ad_target_url'] ?? null) ?: null,
            'ad_image_url' => ($validated['ad_image_url'] ?? null) ?: null,
        ]);

        return back()->with(
            'success',
            'Terima kasih! Pengajuan kemitraanmu sudah kami terima. Tim kami akan menghubungi kamu.',
        );
    }
}
