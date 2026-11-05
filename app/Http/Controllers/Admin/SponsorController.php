<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use App\Models\PartnershipInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SponsorController extends Controller
{
    /**
     * Show incoming partnership inquiries.
     */
    public function index(Request $request): Response
    {
        $search = trim((string) $request->input('search'));
        $status = (string) $request->input('status');

        $inquiries = PartnershipInquiry::query()
            ->with('package:id,code,name,price,price_suffix')
            ->with('ad:id,title,placement,partnership_inquiry_id')
            ->when($search !== '', fn ($query) => $query->where(
                fn ($query) => $query
                    ->where('company', 'like', "%{$search}%")
                    ->orWhere('contact_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%"),
            ))
            ->when($status !== '', fn ($query) => $query->where('status', $status))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Sponsors/Index', [
            'inquiries' => $inquiries,
            'placements' => collect(Ad::PLACEMENTS)
                ->map(fn (string $label, string $value) => [
                    'value' => $value,
                    'label' => $label,
                ])
                ->values()
                ->all(),
            'statuses' => $this->statuses(),
            'counts' => PartnershipInquiry::query()
                ->selectRaw('status, count(*) as total')
                ->groupBy('status')
                ->pluck('total', 'status'),
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'bankAccount' => config('bank'),
        ]);
    }

    /**
     * Update the follow-up status of an inquiry.
     */
    public function updateStatus(Request $request, PartnershipInquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', Rule::in(array_keys(PartnershipInquiry::STATUSES))],
        ]);

        $inquiry->update($validated);

        return back()->with(
            'success',
            'Status sponsor diperbarui menjadi '.PartnershipInquiry::STATUSES[$validated['status']].'.',
        );
    }

    /**
     * Approve an inquiry and create its ad in one step.
     *
     * The ad fields come from the same form, so the banner lands in the
     * `ads` table (and shows on the site) without any manual DB entry.
     */
    public function approve(Request $request, PartnershipInquiry $inquiry): RedirectResponse
    {
        if ($inquiry->ad()->exists()) {
            return back()->with(
                'error',
                'Pengajuan ini sudah disetujui dan iklannya sudah dibuat.',
            );
        }

        $validated = $request->validate([
            'ad_title' => ['required', 'string', 'max:255'],
            'ad_image_url' => ['nullable', 'string', 'max:2048'],
            'ad_image' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'ad_target_url' => ['nullable', 'string', 'max:2048'],
            'ad_placement' => ['required', 'string', Rule::in(array_keys(Ad::PLACEMENTS))],
            'ad_starts_at' => ['nullable', 'date'],
            'ad_ends_at' => ['nullable', 'date', 'after_or_equal:ad_starts_at'],
            'ad_sort_order' => ['nullable', 'integer', 'min:0'],
            'ad_is_active' => ['boolean'],
        ]);

        $imagePath = null;

        if ($request->hasFile('ad_image')) {
            $imagePath = $request->file('ad_image')->store('ads', 'public');
        }

        Ad::query()->create([
            'title' => $validated['ad_title'],
            'image_url' => $imagePath
                ? '/storage/'.$imagePath
                : (($validated['ad_image_url'] ?? null) ?: $inquiry->ad_image_url),
            'target_url' => (($validated['ad_target_url'] ?? null) ?: $inquiry->ad_target_url),
            'placement' => $validated['ad_placement'],
            'is_active' => $request->boolean('ad_is_active'),
            'starts_at' => $validated['ad_starts_at'] ?? null,
            'ends_at' => $validated['ad_ends_at'] ?? null,
            'sort_order' => (int) ($validated['ad_sort_order'] ?? 0),
            'partnership_inquiry_id' => $inquiry->id,
        ]);

        $inquiry->update(['status' => 'approved']);

        return redirect()->route('admin.sponsors.index')
            ->with(
                'success',
                'Sponsor disetujui; iklan "'.e($validated['ad_title']).'" sudah dibuat dan masuk ke tabel iklan.',
            );
    }

    /**
     * Delete an inquiry.
     */
    public function destroy(PartnershipInquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return redirect()->route('admin.sponsors.index')
            ->with('success', 'Pengajuan sponsor berhasil dihapus.');
    }

    /**
     * Get the status options for filters and actions.
     *
     * @return array<int, array{value: string, label: string}>
     */
    private function statuses(): array
    {
        return collect(PartnershipInquiry::STATUSES)
            ->map(fn (string $label, string $value) => [
                'value' => $value,
                'label' => $label,
            ])
            ->values()
            ->all();
    }
}
