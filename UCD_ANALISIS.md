# Analisis Penerapan User-Centered Design (UCD) — Mampirin Magazine

Dokumen ini menganalisis prinsip **User-Centered Design (UCD)** yang sudah
diterapkan pada website Mampirin Magazine, serta area yang berpotensi ditingkatkan
agar pengalaman pengguna semakin baik.

---

## 1. Ringkasan

Mampirin Magazine adalah portal berita/magazine berbasis Laravel + Inertia + React
dengan dua kelompok pengguna utama:

- **Pembaca** (mahasiswa & warga lokal) — membaca artikel, mengirim tulisan,
  mengajukan kemitraan.
- **Admin/redaksi** — mengelola artikel, kategori, iklan, kiriman pembaca, dan
  sponsor.

Secara umum, website sudah menerapkan sebagian besar prinsip UCD, terutama pada
aspek **konsistensi**, **feedback**, **aksesibilitas dasar**, dan **responsivitas**.
Namun masih ada ruang untuk perbaikan pada aksesibilitas lanjutan, performa
persepsi, dan personalisasi.

---

## 2. Prinsip UCD yang Sudah Diterapkan

### 2.1 Fokus pada Pengguna & Tugas (User Tasks)

| Tugas Pengguna | Implementasi |
|---|---|
| Membaca artikel | `ArticleShow` dengan tipografi nyaman, waktu baca, kategori, penulis |
| Menjelajah rubrik | `ArticleCategory`, `ArticleIndex` dengan grid kategori + jumlah artikel |
| Menemukan konten populer | `PopularPosts` di sidebar, `related` di detail artikel |
| Mengirim tulisan | `WriteUs` dengan validasi, unggah foto, preview |
| Mengajukan kemitraan | `Partnership` dengan pilihan paket, form detail iklan |
| Admin menyetujui kiriman | Dashboard quick-approve + halaman Submissions dengan upload sampul |
| Admin mengelola iklan | CRUD iklan, toggle aktif, filter, jadwal tayang |

### 2.2 Konsistensi & Standar (Consistency)

- **Layout bersama** (`AppLayout.jsx`): `BannerAds` + `Navbar` + header + footer
  tunggal. Tidak ada duplikasi header/footer antar halaman.
- **Navbar tunggal** (`Navbar.jsx`): status link aktif otomatis dari `usePage().url`.
- **Admin layout tunggal** (`AdminLayout.jsx`): sidebar navigasi, header, flash
  message konsisten.
- **Design token**: kelas `inputClass`, `labelClass`, `FieldError` dipakai ulang di
  semua form admin.
- **Komponen reusable**: `BannerAds`, `SidebarAd`, `Pagination`, `CategoryList`,
  `PopularPosts`, `BackToTop`, `FieldError`.

### 2.3 Feedback & Status (Visibility of System Status)

- **Flash message** sukses/error di admin (role `status`/`alert`).
- **State processing**: tombol dinonaktifkan (`disabled={processing}`) dan label
  berubah ("Menyimpan...", "Mengirim...").
- **Validasi server-side** dengan pesan error per field (Inertia `errors`).
- **Konfirmasi destruktif**: `window.confirm` sebelum hapus.
- **Badge status** warna berbeda (pending/contacted/approved/rejected).
- **Indikator iklan**: carousel titik navigasi, `aria-current`.
- **BackToTop** muncul setelah scroll > 400px.

### 2.4 Aksesibilitas (Accessibility)

- **ARIA**: `aria-label` pada nav, carousel, tombol iklan; `aria-hidden` pada
  slide non-aktif; `aria-roledescription="carousel"`; `aria-current`.
- **Alt text** pada semua gambar konten/iklan (`alt={title}`).
- **Label form** dengan `htmlFor` dan `id` yang cocok.
- **Focus style**: `focus:border-black focus:outline-none`, `focus-visible:ring-2`.
- **Skip anchor**: tautan "Contact" → `#footer-contact`.
- **Role semantik**: `role="status"`, `role="alert"`.
- **Keyboard**: tombol carousel dapat diklik; form submit standar.

### 2.5 Responsivitas & Multi-Device

- Tailwind responsive prefixes (`md:`, `sm:`) di grid, navbar, sidebar.
- Layout 1 kolom di mobile, 2–3 kolom di desktop.
- Gambar `object-cover` + `max-h` agar tidak pecah.
- `loading="lazy"` pada gambar non-kritis.

### 2.6 Performa Persepsi

- Pagination (15 item) pada daftar artikel/kiriman/sponsor.
- `loading="lazy"` untuk gambar.
- `loading="eager"` hanya untuk slide iklan pertama.
- Preload font di `<head>`.
- Query terbatas kolom (`select([...])`) dan eager loading relasi.

### 2.7 Konten yang Relevan & Personal

- **Rubrik dinamis** dari database (bukan hardcode).
- **Popular posts** & **related articles** di sidebar/detail.
- **Excerpt** dari paragraf pertama isi artikel.
- **Penulis** ditampilkan (nama pengirim untuk kiriman).
- **Jumlah artikel per kategori** (`articles_count`) untuk orientasi.

### 2.8 Kontrol & Kebebasan Pengguna (User Control)

- Filter pencarian + status + kategori di admin.
- Reset filter.
- Toggle aktif/nonaktif iklan tanpa buka form.
- Edit/hapus dengan konfirmasi.
- Opsi "draft vs langsung terbit" saat approve kiriman.

### 2.9 Pencegahan & Pemulihan Error (Error Prevention & Recovery)

- Validasi server-side + pesan per field.
- Field wajib ditandai `*`.
- Kiriman yang sudah disetujui tidak bisa disetujui dua kali.
- Kategori yang masih punya artikel tidak bisa dihapus.
- `ConvertEmptyStringsToNull` untuk field opsional.

### 2.10 SEO & Discoverability (mendukung temuan pengguna)

- Meta description, Open Graph, Twitter card, canonical URL.
- `APP_NAME` konsisten.
- Halaman 404 kustom yang ramah.
- URL bersih (`/article/entertainment`, `/article/{slug}`).

---

## 3. Analisis Gap & Rekomendasi Penambahan

### 3.1 Aksesibilitas Lanjutan (prioritas tinggi)

| Gap | Dampak | Rekomendasi |
|---|---|---|
| Tidak ada **skip link** "Lewati ke konten" | Pengguna screen reader harus melewati navbar setiap halaman | Tambah `<a href="#main-content" class="sr-only focus:not-sr-only">` di `AppLayout` |
| Tidak ada `lang="id"` di `<html>` | Pembaca layar salah pengucapan | Set `lang="id"` di `resources/views/app.blade.php` |
| Tidak ada **aria-live** untuk flash message | Perubahan status tidak diumumkan | Tambah `aria-live="polite"` pada container flash |
| Dropdown kategori hanya `:hover` (CSS) | Tidak bisa diakses dengan keyboard (Tab/Enter) | Ubah jadi komponen dropdown dengan `aria-expanded`, `onKeyDown` |
| Tidak ada **focus trap** di modal/form | Fokus bisa lari ke background | Gunakan `focus-trap` atau dialog native |
| Kontras warna abu-abu muda (`text-gray-400`) | Mungkin gagal WCAG AA pada latar putih | Audit kontras, gunakan `text-gray-600` minimum |
| Tidak ada **prefers-reduced-motion** | Animasi carousel bisa mengganggu | Hormati `prefers-reduced-motion: reduce` |

### 3.2 Navigasi & Orientasi

| Gap | Rekomendasi |
|---|---|
| Tidak ada **breadcrumb** di halaman detail artikel | Tambah breadcrumb: Home > Kategori > Judul Artikel |
| Tidak ada **pencarian global** (search bar) | Tambah search input di navbar yang mencari judul artikel |
| Tidak ada **halaman 404** yang punya tautan kembali (sudah ada, tapi bisa diperkaya) | Tambah tautan ke Home, kategori populer |
| Mobile navbar tidak collapse (dropdown kategori hover) | Implementasi hamburger menu untuk mobile |

### 3.3 Feedback & Performa Persepsi

| Gap | Rekomendasi |
|---|---|
| Tidak ada **skeleton loading** | Tambah skeleton saat data Inertia dimuat (terutama dashboard) |
| Tidak ada **progress bar** saat navigasi Inertia | Aktifkan `progress` di `app.tsx` (`progress: { color: ... }`) |
| Gambar tanpa **placeholder blur** | Tambah `blurDataURL` atau warna placeholder |
| Tidak ada **optimistic UI** pada toggle aktif iklan | Update state lokal sebelum respons server |

### 3.4 Konten & Personalisasi

| Gap | Rekomendasi |
|---|---|
| Tidak ada **simpan/bookmark** artikel | Tambah fitur "Simpan" (localStorage atau DB) |
| Tidak ada **komentar** pembaca | Tambah sistem komentar (moderasi admin) |
| Tidak ada **newsletter/subscribe** | Form langganan email di footer |
| Tidak ada **rekomendasi** berbasis riwayat baca | "Artikel yang mungkin kamu suka" |
| Tidak ada **dark mode** | Toggle tema (Tailwind `dark:`) |

### 3.5 Form & Input

| Gap | Rekomendasi |
|---|---|
| Tidak ada `autocomplete` pada input | Tambah `autocomplete="name"`, `autocomplete="email"`, dll. |
| Tidak ada **validasi inline real-time** | Validasi saat blur (mis. email format) |
| Tidak ada **konfirmasi sebelum meninggalkan form** yang belum disimpan | `beforeunload` handler |
| Upload gambar tanpa **crop/preview** yang baik | Preview sudah ada; tambah validasi dimensi |

### 3.6 Admin UX

| Gap | Rekomendasi |
|---|---|
| Tidak ada **bulk action** (hapus/publish banyak artikel) | Checkbox + aksi massal |
| Tidak ada **drag-and-drop** urutan kategori/iklan | Sortable dengan `@dnd-kit` |
| Tidak ada **preview artikel** sebelum publish | Tombol "Preview" membuka halaman dengan draft |
| Tidak ada **riwayat perubahan** (audit log) | Tabel `activity_log` |
| Dashboard tidak ada **grafik tren** (views, kiriman per hari) | Chart sederhana (Chart.js) |

### 3.7 Pengukuran & Iterasi (UCD berkelanjutan)

| Gap | Rekomendasi |
|---|---|
| Tidak ada **analytics** (page views, bounce rate) | Google Analytics / Plausible |
| Tidak ada **feedback widget** ("Apakah halaman ini membantu?") | Tambah tombol feedback di footer artikel |
| Tidak ada **user testing** formal | Lakukan usability testing dengan 5–8 mahasiswa |
| Tidak ada **A/B testing** untuk CTA | Uji variasi tombol "Kirim Tulisan" |

---

## 4. Rekomendasi Prioritas

### Quick Wins (1–2 hari)
1. Tambah `lang="id"` dan skip link di `app.blade.php`.
2. Aktifkan progress bar Inertia di `app.tsx`.
3. Tambah `autocomplete` pada form Write Us & Partnership.
4. Tambah `aria-live` pada flash message admin.
5. Hormati `prefers-reduced-motion` pada carousel.

### Medium (1 minggu)
6. Breadcrumb di halaman detail artikel.
7. Search bar global di navbar.
8. Hamburger menu untuk mobile.
9. Skeleton loading di dashboard.
10. Dropdown kategori yang keyboard-accessible.

### Long-term (1 bulan+)
11. Bookmark/simpan artikel.
12. Dark mode.
13. Sistem komentar dengan moderasi.
14. Newsletter subscribe.
15. Analytics + feedback widget.

---

## 5. Kesimpulan

Mampirin Magazine sudah menerapkan **fondasi UCD yang solid**: layout konsisten,
feedback yang jelas, validasi, aksesibilitas dasar, responsivitas, dan kontrol
pengguna. Gap terbesar ada pada **aksesibilitas lanjutan** (skip link, keyboard
dropdown, kontras) dan **fitur personalisasi** (bookmark, komentar, newsletter).

Dengan mengeksekusi *quick wins* terlebih dahulu, website dapat meningkatkan
skor aksesibilitas dan kenyamanan pengguna secara signifikan tanpa perubahan
arsitektur besar.
