<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
            'statuses' => $this->statuses(),
            'counts' => PartnershipInquiry::query()
                ->selectRaw('status, count(*) as total')
                ->groupBy('status')
                ->pluck('total', 'status'),
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
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
