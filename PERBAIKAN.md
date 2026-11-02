# Ringkasan Perbaikan — Mampirin Magazine

Hasil audit singkat proyek (`D:\ucd\ucd`) — Laravel 13 + Inertia 3 + React 19.

Status saat ini: **CMS selesai**. Konten artikel/kategori sudah dari MySQL, panel admin
tersedia lengkap dengan persetujuan kiriman pembaca, pengelolaan iklan, dan sponsor masuk,
serta form Write Us mendukung unggah foto pendukung.

## Status perbaikan

| # | Temuan | Status |
|---|---|---|
| 1 | `@vite` memuat halaman `.tsx` yang tidak ada | ✅ Selesai |
| 2 | Form "Write Us" tidak berfungsi | ✅ Selesai |
| 3 | Navbar/header/footer diduplikasi | 🟡 Navbar selesai |
| 4 | Kategori Home tidak konsisten dengan route | ✅ Selesai (satu sumber dari DB) |
| 5 | Belum ada backend / CMS | ✅ Selesai (artikel, kategori, admin) |
| 6 | Konfigurasi & lokasi database | ✅ Selesai (pindah ke MySQL) |
| 7 | `welcome.tsx` sisa starter kit | ✅ Selesai |
| 8 | Test masih kosong | ✅ Selesai (66 test) |
| 9 | `APP_NAME`, SEO, metadata | 🟡 Sebagian |
| 10 | Halaman Ads & slot iklan belum dari database | ✅ Selesai |
| 11 | Konten artikel masih array dummy & belum ada admin | ✅ Selesai |
| 12 | Write Us belum bisa unggah foto | ✅ Selesai |
| 13 | Kiriman pembaca belum bisa di-ACC dari admin | ✅ Selesai |
| 14 | Iklan belum bisa dikelola dari admin | ✅ Selesai |
| 15 | Pengajuan sponsor belum bisa ditindaklanjuti | ✅ Selesai |

**Bug tambahan yang ditemukan & diperbaiki:** route `/article/lifestyle` sempat merujuk komponen
`Lifestyle` yang file-nya belum ada. Kini halaman `Entertainment`, `History`, dan `Lifestyle`
yang masih berisi array dummy sudah dihapus; semuanya memakai satu halaman
`ArticleCategory.jsx` yang datanya berasal dari database.

**Ringkasan yang sudah dikerjakan:**

- `resources/views/app.blade.php` — `@vite` hanya memuat `app.css` + `app.tsx`.
- `ArticleSubmission` — migrasi `article_submissions`, model, controller, route `POST /write-us`
  dengan validasi (judul, isi min. 50 karakter, nama, email; telepon opsional).
- `WriteUs.jsx` — memakai `useForm`, menampilkan error per field, status sukses, tombol
  disabled saat mengirim. **Baru:** input foto pendukung dengan pratinjau, tombol hapus foto,
  validasi JPG/PNG/WEBP maksimal 4 MB, dan penyimpanan ke disk `public` (`storage/app/public/submissions`).
- **Model & migrasi `categories` dan `articles`** — kategori dan artikel tidak lagi hardcoded
  di React. Tersedia scope `active`, `published`, dan `featured`, relasi
  `Category hasMany Article`, serta seeder 3 kategori + 13 artikel berbahasa Indonesia.
- **Halaman publik dari database** — `Home`, `ArticleIndex`, `ArticleCategory`, `ArticleShow`,
  `About`, sidebar kategori, dan popular posts membaca data dari MySQL. URL lama
  `/article/entertainment|history|lifestyle` tetap berfungsi, ditambah URL generik
  `/article/category/{slug}` dan detail `/article/{slug}`.
- **Panel admin** di `/admin` — login/logout dengan session Laravel, dashboard statistik,
  CRUD artikel (buat, edit, hapus, toggle terbit/draft, filter pencarian/kategori/status),
  CRUD kategori, persetujuan/penolakan kiriman pembaca, CRUD iklan + toggle aktif, serta
  pengelolaan status sponsor/pengajuan kemitraan.
- **Foto pendukung Write Us** — kolom baru `article_submissions.image_path`; foto tampil di
  halaman admin kiriman pembaca dan bisa dibuka ukuran asli.
- `.gitignore` — `db_ucd` dan `database/*.sqlite` diabaikan; `db_ucd` di-untrack dari git.
- **Database dipindah ke MySQL/MariaDB XAMPP** (`db_ucd`), semua migrasi dijalankan; phpMyAdmin
  siap dipakai di <http://localhost/phpmyadmin>.
- `welcome.tsx` dihapus; `APP_NAME` menjadi "Mampirin Magazine".
- Test: **89 test lulus** (halaman publik, artikel & kategori, auth admin, CRUD admin,
  persetujuan kiriman pembaca, CRUD/toggle iklan, status sponsor, foto Write Us, pengajuan
  artikel/kemitraan, serta data iklan/paket).
- `npm run build` berhasil untuk semua halaman.

---

## Rincian per temuan

Legenda prioritas:

- 🔴 **Kritis** — berpotensi membuat halaman gagal tampil / fitur tidak berfungsi
- 🟠 **Penting** — menyulitkan pengembangan & menimbulkan inkonsistensi
- 🟡 **Peningkatan** — kualitas kode, keamanan, dan pemeliharaan

---

## 1. ✅ `@vite` memuat halaman `.tsx` padahal file-nya `.jsx`

**Lokasi:** `resources/views/app.blade.php` (baris `@vite([...])`)

```blade
@vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
```

Semua halaman utama berekstensi `.jsx` (`Home.jsx`, `About.jsx`, dst.), hanya `welcome.tsx`
yang `.tsx`. Akibatnya Vite gagal me-resolve `resources/js/pages/Home.tsx` dan halaman tidak
bisa dirender dengan benar.

**Pilih salah satu perbaikan:**

- **Opsi A (disarankan):** hapus entri page dari `@vite`, cukup entry utama:
  ```blade
  @vite(['resources/css/app.css', 'resources/js/app.tsx'])
  ```
- **Opsi B:** ubah semua page menjadi `.tsx` dan tetap pertahankan pola saat ini.

---

## 2. ✅ Form "Write Us" belum berfungsi

**Lokasi:** `resources/js/pages/WriteUs.jsx` (sekitar baris 54–148)

`<form>` tidak punya `onSubmit`, `action`, maupun `method`. Saat tombol **Submit** ditekan,
browser melakukan submit default (reload halaman) dan seluruh isian hilang.

**Yang perlu ditambahkan:**

- Handler submit (mis. `useForm` dari `@inertiajs/react`):
  ```jsx
  const { data, setData, post, processing, errors } = useForm({ ... });

  const submit = (e) => {
      e.preventDefault();
      post('/write-us');
  };
  ```
- Route `POST /write-us` + controller (simpan ke DB atau kirim email).
- Validasi server-side (dan tampilkan `errors` di form).
- State sukses/gagal + nonaktifkan tombol saat `processing`.
- Label/`htmlFor` untuk setiap input (aksesibilitas).

---

## 3. 🟡 Navbar sudah dipusatkan, header/footer belum

**Navbar: ✅ selesai.** Sebelumnya nav disalin manual di tiap halaman dengan status aktif
yang berbeda-beda. Sekarang ada satu komponen:

- `resources/js/components/Navbar.jsx` — satu sumber untuk menu Home / About / Article
  (dropdown Entertainment, History, Lifestyle) / Write Us / Ads / Contact.
- Status link aktif ditentukan otomatis dari `usePage().url`, jadi tidak perlu prop manual:
  `/about` → About aktif, `/article/*` → Article aktif, dst.
- Kedelapan halaman memakai `<Navbar />`: Home, About, Ads, WriteUs, ArticleIndex,
  Entertainment, History, Lifestyle.
- Verifikasi: build sukses dan 16 test tetap lulus.

**Belum:** header (judul "Mampirin Magazine") dan footer masih ditulis ulang di setiap
halaman, dan footer punya dua varian berbeda. Langkah berikutnya: buat `AppLayout` yang
membungkus header + `<Navbar />` + konten + footer.

---

## 4. ✅ Kategori di Home tidak konsisten dengan route

**Lokasi:** `resources/js/pages/Home.jsx` vs `routes/web.php`

Dulu Home menampilkan 6 kategori hardcoded: MSME, Music, Technology, Entertainment, Sports,
History, sementara route hanya menyediakan `entertainment`, `history`, dan `lifestyle`.

**Perbaikan:** kategori kini disimpan di tabel `categories` dan menjadi satu sumber untuk
navbar, sidebar, halaman artikel, dan panel admin. `HandleInertiaRequests` membagikan
`siteCategories` (beserta jumlah artikel terbit) ke semua halaman. Kategori yang tidak aktif
otomatis tidak tampil.

---

## 5. ✅ Backend/CMS artikel sudah tersedia

**Sudah ada backend:** pengajuan artikel (`article_submissions`) dan data iklan/paket kemitraan
(`ads`, `partnership_packages`).

**Yang sudah dikerjakan:**

1. Migrasi `categories` dan `articles` (foreign key `category_id`, slug unik, status terbit,
   unggulan, jumlah views, tanggal terbit).
2. Model `Category` dan `Article` + relasi, scope `active` / `published` / `featured`.
3. `HomeController`, `AboutController`, dan `ArticleController` mengirim data sebagai props
   Inertia; React merender dengan `.map()` tanpa array dummy.
4. Halaman kategori generik `/article/category/{slug}` dan detail `/article/{slug}`.
5. Panel admin Inertia di `/admin` untuk CRUD artikel/kategori dan daftar kiriman pembaca.
6. Seeder `CategorySeeder`, `ArticleSeeder`, dan `AdminSeeder` (idempoten, aman dijalankan ulang).

---

## 6. ✅ File database & konfigurasi koneksi

Awalnya proyek memakai SQLite `db_ucd` di root proyek (path relatif + ikut ter-commit).

Sekarang proyek memakai **MySQL/MariaDB dari XAMPP**:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_ucd
DB_USERNAME=root
DB_PASSWORD=
```

- Database MySQL `db_ucd` sudah dibuat dan seluruh migrasi dijalankan.
- phpMyAdmin: <http://localhost/phpmyadmin> (Apache + MySQL harus jalan dari XAMPP).
- `db_ucd` (file SQLite lama) dan `database/database.sqlite` sudah tidak dipakai; keduanya
  di-`gitignore` dan aman dihapus.
- Test otomatis tetap memakai SQLite in-memory (`phpunit.xml`), tidak terpengaruh.

Catatan: `php artisan db:show` bisa error `performance_schema.session_status` pada MariaDB
XAMPP — ini keterbatasan MariaDB, bukan masalah koneksi aplikasi.

---

## 7. ✅ Sisa halaman starter kit

`resources/js/pages/welcome.tsx` (±40 KB) adalah halaman default Laravel dan tidak dipakai
oleh route mana pun. Hapus agar repo lebih bersih (cek dulu referensi ke `Welcome`).

---

## 8. ✅ Test masih kosong

Hanya ada `tests/Feature/ExampleTest.php` dan `tests/Unit/ExampleTest.php` bawaan.

**Minimal yang layak diuji:**

- Semua route utama mengembalikan status 200 dan komponen Inertia yang benar
  (`assertInertia(fn ($page) => $page->component('Home'))`).
- Submit form Write Us: validasi gagal & sukses.

**Status sekarang:** 89 test lulus, mencakup halaman publik, artikel & kategori, auth admin,
CRUD admin, persetujuan kiriman pembaca, CRUD/toggle iklan, status sponsor, unggah foto
Write Us, pengajuan artikel/kemitraan, dan data iklan/paket.

---

## 9. 🟡 SEO, metadata, dan detail kecil

- `APP_NAME=Laravel` di `.env` → ganti menjadi `Mampirin Magazine`.
- Belum ada meta description / Open Graph / canonical per halaman.
- Semua gambar memakai placeholder `picsum.photos` dengan `alt` generik.
- Tautan `Contact` memakai anchor `#footer-contact` — pastikan `id` tersebut ada di semua page
  (saat ini bergantung pada footer yang diduplikasi).
- Tidak ada halaman 404 kustom.

---

## 10. ✅ Halaman Ads, iklan berputar, & kemitraan dari database

**Tabel baru:**

- `ads` — `title`, `image_url`, `target_url`, `placement` (`top`, `sidebar`,
  `article_sidebar`), `is_active`, `starts_at`, `ends_at`, `sort_order`.
- `partnership_packages` — `code`, `label`, `name`, `description`, `price`,
  `price_suffix`, `features` (JSON), `cta_label`, `cta_url`, `is_featured`, `is_active`,
  `sort_order`.
- `partnership_inquiries` — `partnership_package_id`, `company`, `contact_name`, `email`,
  `phone`, `message`, `status`.

**Alur data:**

- `HandleInertiaRequests` membagikan iklan aktif (dengan jadwal `starts_at`/`ends_at`) ke semua
  halaman sebagai prop `ads`, dikelompokkan per `placement`.
- `resources/js/components/BannerAds.jsx` — banner gambar di atas navbar yang **berputar otomatis**
  tiap 5 detik (berhenti saat kursor di atasnya, ada titik navigasi, label "Iklan"). Setiap banner
  membuka `target_url`-nya sendiri; URL eksternal dibuka di tab baru.
- `resources/js/components/SidebarAd.jsx` — slot iklan sidebar 300x250 dan 300x400 dengan perilaku
  tautan yang sama (menggantikan placeholder di Home, About, Entertainment, History, Lifestyle).
- `AdsController` + route `GET /ads` mengirim `packages` dari database.
- Halaman `Ads.jsx` merender kartu paket secara dinamis: label, nama, deskripsi, harga
  (`Rp 750.000`), daftar fitur (✓/✕), badge unggulan, dan CTA dari `cta_url`.
- **Halaman `/partnership`** (`PartnershipController`) — form pengajuan kemitraan dengan pilihan
  paket (otomatis terpilih lewat `?package=01|02|03`), validasi, dan konfirmasi sukses. Data masuk
  ke tabel `partnership_inquiries` dan bisa dilihat lewat phpMyAdmin.
- Seeder tersedia: `AdsSeeder`, `PartnershipPackageSeeder` (memakai `updateOrCreate`, jadi aman
  dijalankan ulang).

**Mengubah konten:** cukup edit baris di tabel `ads`, `partnership_packages`, atau lihat
`partnership_inquiries` lewat phpMyAdmin (<http://localhost/phpmyadmin>, database `db_ucd`) —
halaman langsung mengikuti tanpa mengubah kode. Isi `target_url` iklan dengan URL tujuan
(misalnya `https://instagram.com/...`); iklan akan membuka URL itu, bukan halaman `/ads`.

---

## 11. ✅ CMS artikel, kategori, dan panel admin

**Tabel baru:**

- `categories` — `name`, `slug` (unik), `description`, `image_url`, `sort_order`, `is_active`.
- `articles` — `category_id` (nullable, `nullOnDelete`), `title`, `slug` (unik), `excerpt`,
  `body`, `image_url`, `author`, `views`, `is_featured`, `is_published`, `published_at`.

**Akun admin awal:**

| Email | Password |
|---|---|
| `admin@mampirin.test` | `mampirin123` |

> Segera ganti password ini setelah login pertama. Akun dibuat oleh `AdminSeeder`.

**Halaman admin (butuh login):**

| URL | Fungsi |
|---|---|
| `/admin/login` | Form login admin |
| `/admin` | Dashboard statistik + artikel terbaru |
| `/admin/articles` | Daftar artikel, filter, toggle terbit/draft, hapus |
| `/admin/articles/create` | Form artikel baru |
| `/admin/articles/{id}/edit` | Form edit artikel |
| `/admin/categories` | Daftar kategori + jumlah artikel |
| `/admin/categories/create` | Form kategori baru |
| `/admin/categories/{id}/edit` | Form edit kategori |
| `/admin/submissions` | Kiriman pembaca: setujui/tolak + pilih kategori & status terbit |
| `/admin/ads` | Daftar iklan, filter, toggle aktif, hapus |
| `/admin/ads/create` | Form iklan baru (gambar, URL tujuan, penempatan, jadwal) |
| `/admin/ads/{id}/edit` | Form edit iklan |
| `/admin/sponsors` | Pengajuan sponsor masuk: filter, ubah status, hapus |

**Perilaku penting:**

- Slug artikel/kategori dibuat otomatis dari judul/nama (`App\Support\Slug::unique`), dan
  otomatis diberi akhiran `-2`, `-3`, dst. jika sudah dipakai.
- Kategori yang masih memiliki artikel tidak bisa dihapus; pindahkan artikelnya dulu.
- Artikel draft atau bertanggal terbit di masa depan tidak tampil di halaman publik.
- Halaman detail artikel menambah kolom `views` setiap kali dibuka.
- **Persetujuan kiriman pembaca** — admin memilih kategori dan opsi "langsung terbitkan",
  lalu sistem membuat baris `articles` dan menautkannya lewat `article_submissions.article_id`.
  Foto pendukung otomatis menjadi `image_url` artikel (`/storage/...`). Kiriman yang sudah
  disetujui tidak bisa disetujui dua kali atau ditolak.
- **Iklan** — status aktif/nonaktif (`is_active`) menjadi bentuk persetujuan tayang. Iklan aktif
  mengikuti jadwal `starts_at`/`ends_at` dan langsung muncul di slot `top`, `sidebar`, atau
  `article_sidebar`.
- **Sponsor** — status pengajuan kemitraan: `pending`, `contacted`, `approved`, `rejected`.
  Admin dapat mengubah status dan menghapus pengajuan dari `/admin/sponsors`.

**Nomor rute publik terkait:**

- `/article` — hub kategori.
- `/article/category/{slug}` — kategori generik.
- `/article/entertainment`, `/article/history`, `/article/lifestyle` — URL lama, tetap didukung.
- `/article/{slug}` — detail artikel.

---

## 12. ✅ Foto pendukung pada form Write Us

- Kolom baru `article_submissions.image_path` (nullable).
- Form Write Us memiliki input file, pratinjau gambar, dan tombol **Hapus Foto**.
- Validasi: `image`, format `jpg/jpeg/png/webp`, maksimal 4 MB.
- File disimpan di disk `public` pada folder `submissions/`; jalankan
  `php artisan storage:link` sekali agar foto bisa diakses lewat `/storage/...`.
- Admin dapat melihat foto pada halaman **Kiriman Pembaca** dan membukanya ukuran asli.

---

## 13. ✅ Persetujuan kiriman, manajemen iklan, & sponsor masuk

**Persetujuan kiriman pembaca:**

- Halaman `/admin/submissions` menampilkan isi tulisan, foto pendukung, dan filter status
  (Menunggu / Disetujui / Ditolak) beserta jumlahnya.
- Admin memilih kategori lalu menekan **Setujui & Buat Artikel**; opsi **Langsung terbitkan**
  menentukan apakah artikel langsung tampil atau disimpan sebagai draft.
- Sistem membuat artikel baru (slug otomatis, excerpt dari isi tulisan, penulis = nama pengirim)
  dan menyimpan relasinya di kolom baru `article_submissions.article_id`.
- Kiriman yang sudah disetujui menampilkan tautan **Edit Artikel** dan **Lihat di Situs**.
- Tombol **Tolak** hanya tersedia untuk kiriman yang belum menjadi artikel.

**Manajemen iklan (`/admin/ads`):**

- CRUD lengkap: judul, URL gambar (dengan pratinjau), URL tujuan, penempatan, jadwal tayang,
  urutan tampil, dan status aktif.
- Filter pencarian judul, penempatan, dan status; badge status bisa diklik untuk toggle
  aktif/nonaktif tanpa membuka form.
- Perilaku publik tidak berubah: banner berputar, setiap iklan membuka `target_url` sendiri,
  dan CTA paket tetap menuju `/partnership?package=...`.

**Sponsor masuk (`/admin/sponsors`):**

- Menampilkan pengajuan dari halaman `/partnership`: perusahaan, kontak, email/telepon, pesan,
  paket yang dipilih, dan tanggal masuk.
- Filter berdasarkan status dan pencarian perusahaan/kontak/email.
- Status dapat diubah menjadi `pending`, `contacted`, `approved`, atau `rejected`; pengajuan
  juga bisa dihapus.
- Dashboard menampilkan statistik iklan, jumlah kiriman/sponsor yang menunggu, serta daftar
  pintasan untuk meninjau keduanya.

**Database:**

- Migrasi baru `2026_11_02_000001_add_article_id_to_article_submissions_table.php`.
- Semua perubahan dijalankan di MySQL `db_ucd`; data lama tetap aman.

---

## Urutan pengerjaan yang disarankan

| # | Tugas | Status |
|---|---|---|
| 1 | Perbaiki `@vite` di `app.blade.php` | ✅ |
| 2 | Fungsikan form Write Us + route + validasi | ✅ |
| 3 | Navbar bersama | ✅ |
| 4 | Ads, banner berputar, & paket kemitraan dari database | ✅ |
| 4b | Halaman `/partnership` + simpan pengajuan kemitraan | ✅ |
| 5 | Layout bersama untuk header/footer | ⏳ |
| 6 | Migrasi + model artikel/kategori, ganti data dummy | ✅ |
| 7 | Samakan daftar kategori (satu sumber) | ✅ |
| 8 | Halaman admin / CMS | ✅ |
| 9 | SEO & aksesibilitas | 🟡 |
| 10 | Unggah foto pendukung di Write Us | ✅ |
| 11 | Persetujuan kiriman pembaca dari dashboard admin | ✅ |
| 12 | Manajemen iklan + toggle aktif | ✅ |
| 13 | Pengelolaan sponsor/pengajuan kemitraan | ✅ |

---

_Diperbarui dari audit kode pada 2 November 2026._
