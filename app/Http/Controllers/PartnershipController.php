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
        return Inertia::render('Partnership', [
            'packages' => PartnershipPackage::query()
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
                ]),
            'selectedPackage' => $request->query('package'),
        ]);
    }

    /**
     * Store a partnership inquiry.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'partnership_package_id' => ['nullable', 'integer', 'exists:partnership_packages,id'],
            'company' => ['required', 'string', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'message' => ['required', 'string', 'min:20'],
        ]);

        PartnershipInquiry::create($validated);

        return back()->with(
            'success',
            'Terima kasih! Pengajuan kemitraanmu sudah kami terima. Tim kami akan menghubungi kamu.',
        );
    }
}
