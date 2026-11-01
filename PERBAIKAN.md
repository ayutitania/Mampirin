# Ringkasan Perbaikan — Mampirin Magazine

Hasil audit singkat proyek (`D:\ucd\ucd`) — Laravel 13 + Inertia 3 + React 19.

Status saat ini: **prototipe front-end**. Tampilan dan navigasi sudah ada, tetapi lapisan data,
form, dan struktur komponen belum siap produksi.

## Status perbaikan

| # | Temuan | Status |
|---|---|---|
| 1 | `@vite` memuat halaman `.tsx` yang tidak ada | ✅ Selesai |
| 2 | Form "Write Us" tidak berfungsi | ✅ Selesai |
| 3 | Navbar/header/footer diduplikasi | 🟡 Navbar selesai |
| 4 | Kategori Home tidak konsisten dengan route | 🟡 Sebagian |
| 5 | Belum ada backend / CMS | 🟡 Sebagian |
| 6 | Konfigurasi & lokasi database | ✅ Selesai (pindah ke MySQL) |
| 7 | `welcome.tsx` sisa starter kit | ✅ Selesai |
| 8 | Test masih kosong | ✅ Selesai |
| 9 | `APP_NAME`, SEO, metadata | 🟡 Sebagian |
| 10 | Halaman Ads & slot iklan belum dari database | ✅ Selesai |

**Bug tambahan yang ditemukan & diperbaiki:** route `/article/lifestyle` merujuk komponen
`Lifestyle` yang file-nya tidak ada (`Lifestyle.jsx` belum dibuat). Halaman itu pasti error;
sekarang sudah dibuatkan.

**Ringkasan yang sudah dikerjakan:**

- `resources/views/app.blade.php` — `@vite` hanya memuat `app.css` + `app.tsx`.
- `ArticleSubmission` — migrasi `article_submissions`, model, controller, route `POST /write-us`
  dengan validasi (judul, isi min. 50 karakter, nama, email; telepon opsional).
- `WriteUs.jsx` — memakai `useForm`, menampilkan error per field, status sukses, tombol
  disabled saat mengirim.
- `HandleInertiaRequests` — membagikan `flash.success` ke semua halaman.
- Route diberi nama (`home`, `article.index`, dst.).
- `Lifestyle.jsx` dibuat; `routes/web.php` dirapikan.
- **Navbar dipusatkan** ke `resources/js/components/Navbar.jsx`; status aktif otomatis dari URL,
  dipakai oleh 8 halaman.
- **Ads dinamis dari database**: tabel `ads` (banner atas, sidebar, sidebar artikel) + tabel
  `partnership_packages`; banner atas berupa gambar yang berputar otomatis seperti iklan majalah;
  komponen `BannerAds` dan `SidebarAd`; halaman `/ads` merender paket dari DB.
- **Halaman kemitraan sendiri** di `/partnership` (form pengajuan tersimpan di
  `partnership_inquiries`), CTA paket mengarah ke sana dengan paket sudah terpilih.
- `.gitignore` — `db_ucd` dan `database/*.sqlite` diabaikan; `db_ucd` di-untrack dari git.
- **Database dipindah ke MySQL/MariaDB XAMPP** (`db_ucd`), semua migrasi dijalankan; phpMyAdmin
  siap dipakai di <http://localhost/phpmyadmin>.
- `welcome.tsx` dihapus; `APP_NAME` menjadi "Mampirin Magazine".
- Test: 27 test lulus (semua halaman render komponen Inertia yang benar + validasi & simpan
  pengajuan artikel, pengajuan kemitraan, serta data iklan/paket).
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

## 4. 🟠 Kategori di Home tidak konsisten dengan route

**Lokasi:** `resources/js/pages/Home.jsx` vs `routes/web.php`

Home menampilkan 6 kategori: MSME, Music, Technology, Entertainment, Sports, History.
Route yang tersedia hanya `entertainment`, `history`, dan `lifestyle`.

**Perbaikan:** samakan sumber daftar kategori. Idealnya kategori disimpan di DB
(tabel `categories`) dan dikirim sebagai props dari server, bukan array hardcoded.
Jika belum pakai DB, minimal buat satu konstanta bersama di `resources/js/lib/categories.js`.

---

## 5. 🟡 Backend/CMS artikel belum ada

**Sudah ada backend:** pengajuan artikel (`article_submissions`) dan data iklan/paket kemitraan
(`ads`, `partnership_packages`).

**Belum ada:**

- Model & migrasi `articles` dan `categories` — konten artikel masih array dummy di React.
- Halaman admin/login untuk mengelola artikel.

**Perbaikan bertahap yang disarankan:**

1. Migrasi: `categories`, `articles`, `contact_messages`.
2. Model + relasi (`Category hasMany Article`).
3. `ArticleController` / `PageController` + route ke controller.
4. Kirim data sebagai props Inertia, render dengan `.map()`.
5. Admin panel (bisa pakai Filament atau halaman Inertia sendiri).

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

## Urutan pengerjaan yang disarankan

| # | Tugas | Status |
|---|---|---|
| 1 | Perbaiki `@vite` di `app.blade.php` | ✅ |
| 2 | Fungsikan form Write Us + route + validasi | ✅ |
| 3 | Navbar bersama | ✅ |
| 4 | Ads, banner berputar, & paket kemitraan dari database | ✅ |
| 4b | Halaman `/partnership` + simpan pengajuan kemitraan | ✅ |
| 5 | Layout bersama untuk header/footer | ⏳ |
| 6 | Migrasi + model artikel/kategori, ganti data dummy | ⏳ |
| 7 | Samakan daftar kategori (satu sumber) | 🟡 |
| 8 | Halaman admin / CMS | ⏳ |
| 9 | SEO & aksesibilitas | 🟡 |

---

_Dibuat dari audit kode pada 1 November 2026._
