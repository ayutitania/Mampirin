<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubmissionRequest extends FormRequest
{
    // Form "Write Us" terbuka untuk umum, tidak perlu login
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Data pengirim
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string', 'max:255'],

            // Data artikel
            'title' => ['required', 'string', 'max:200'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'excerpt' => ['nullable', 'string', 'max:300'],
            'content' => ['required', 'string', 'min:50', 'max:20000'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], // maks 2 MB

            // Kolom jebakan untuk bot: manusia tidak melihatnya, jadi harus kosong
            'company_url' => ['prohibited'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'title.required' => 'Judul wajib diisi.',
            'category_id.required' => 'Pilih kategori.',
            'category_id.exists' => 'Kategori tidak valid.',
            'content.required' => 'Isi artikel wajib diisi.',
            'content.min' => 'Isi artikel minimal 50 karakter.',
            'thumbnail.image' => 'File harus berupa gambar.',
            'thumbnail.max' => 'Ukuran gambar maksimal 2 MB.',
        ];
    }
}
