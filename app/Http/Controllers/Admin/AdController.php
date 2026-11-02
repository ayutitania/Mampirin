<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdController extends Controller
{
    /**
     * Show the ad management table.
     */
    public function index(Request $request): Response
    {
        $search = trim((string) $request->input('search'));
        $placement = (string) $request->input('placement');
        $status = (string) $request->input('status');

        $ads = Ad::query()
            ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->when($placement !== '', fn ($query) => $query->where('placement', $placement))
            ->when($status === 'active', fn ($query) => $query->where('is_active', true))
            ->when($status === 'inactive', fn ($query) => $query->where('is_active', false))
            ->orderBy('placement')
            ->orderBy('sort_order')
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Ads/Index', [
            'ads' => $ads,
            'placements' => $this->placements(),
            'filters' => [
                'search' => $search,
                'placement' => $placement,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the create ad form.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Ads/Form', [
            'ad' => null,
            'placements' => $this->placements(),
        ]);
    }

    /**
     * Store a new ad.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        Ad::query()->create($this->payload($validated, $request));

        return redirect()->route('admin.ads.index')
            ->with('success', 'Iklan berhasil dibuat.');
    }

    /**
     * Show the edit ad form.
     */
    public function edit(Ad $ad): Response
    {
        return Inertia::render('Admin/Ads/Form', [
            'ad' => $ad->only([
                'id',
                'title',
                'image_url',
                'target_url',
                'placement',
                'is_active',
                'starts_at',
                'ends_at',
                'sort_order',
            ]),
            'placements' => $this->placements(),
        ]);
    }

    /**
     * Update an existing ad.
     */
    public function update(Request $request, Ad $ad): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        $ad->update($this->payload($validated, $request));

        return redirect()->route('admin.ads.index')
            ->with('success', 'Iklan berhasil diperbarui.');
    }

    /**
     * Toggle the active state of an ad.
     */
    public function toggle(Ad $ad): RedirectResponse
    {
        $ad->update(['is_active' => ! $ad->is_active]);

        return back()->with(
            'success',
            $ad->is_active
                ? 'Iklan diaktifkan dan akan tampil di situs.'
                : 'Iklan dinonaktifkan dari situs.',
        );
    }

    /**
     * Delete an ad.
     */
    public function destroy(Ad $ad): RedirectResponse
    {
        $ad->delete();

        return redirect()->route('admin.ads.index')
            ->with('success', 'Iklan berhasil dihapus.');
    }

    /**
     * Validation rules for creating or updating an ad.
     *
     * @return array<string, array<int, mixed>>
     */
    private function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'image_url' => ['nullable', 'string', 'max:2048'],
            'target_url' => ['nullable', 'string', 'max:2048'],
            'placement' => ['required', 'string', Rule::in(array_keys(Ad::PLACEMENTS))],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    /**
     * Build the attributes persisted to the database.
     *
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function payload(array $validated, Request $request): array
    {
        return [
            ...$validated,
            'is_active' => $request->boolean('is_active'),
            'starts_at' => $validated['starts_at'] ?? null,
            'ends_at' => $validated['ends_at'] ?? null,
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ];
    }

    /**
     * Get the placement options for the form and filters.
     *
     * @return array<int, array{value: string, label: string}>
     */
    private function placements(): array
    {
        return collect(Ad::PLACEMENTS)
            ->map(fn (string $label, string $value) => [
                'value' => $value,
                'label' => $label,
            ])
            ->values()
            ->all();
    }
}
