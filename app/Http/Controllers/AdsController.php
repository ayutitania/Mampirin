<?php

namespace App\Http\Controllers;

use App\Models\PartnershipPackage;
use Inertia\Inertia;
use Inertia\Response;

class AdsController extends Controller
{
    /**
     * Show the ads and partnership page.
     */
    public function index(): Response
    {
        return Inertia::render('Ads', [
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
                    'features',
                    'cta_label',
                    'cta_url',
                    'is_featured',
                    'sort_order',
                ]),
        ]);
    }
}
