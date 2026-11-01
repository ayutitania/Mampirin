<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Seed the articles that used to live as hardcoded arrays in React.
     */
    public function run(): void
    {
        $categories = Category::query()->pluck('id', 'slug');

        $articles = [
            [
                'category' => 'lifestyle',
                'title' => 'Kafe Kerja Remote di Bukit yang Wajib Dicoba',
                'slug' => 'kafe-kerja-remote-di-bukit',
                'excerpt' => 'Stopkontak di tiap meja, WiFi yang stabil, dan menu kopi yang serius. Ini tiga tempat favorit mahasiswa untuk bekerja remote di area Bukit.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-1',
                'author' => 'Ayu Pramesti',
                'is_featured' => true,
                'days_ago' => 1,
                'views' => 905,
                'body' => <<<'TEXT'
Bekerja remote dari kafe bukan lagi sekadar tren, tapi kebutuhan sehari-hari bagi banyak mahasiswa dan pekerja lepas di Jimbaran. Yang dicari bukan hanya kopi enak, melainkan meja yang nyaman, colokan listrik, dan koneksi yang tidak membuat presentasi online terputus di tengah jalan.

Tempat pertama yang layak dicoba adalah kafe kecil di Jalan Raya Uluwatu. Suasananya tenang pada pagi hari, dengan meja panjang yang memang dirancang untuk bekerja. Kopi manual brew-nya konsisten, dan staf tidak keberatan kalau kamu duduk cukup lama asal tetap memesan minuman.

Dua tempat lain menawarkan kelebihan masing-masing: satu punya ruang semi-tertutup untuk panggilan video, satu lagi punya taman belakang yang cocok untuk istirahat sejenak. Saran kami, datang sebelum jam sepuluh pagi agar masih mendapat meja dekat colokan.

Yang paling penting, jangan lupa membawa earphone dan tetap menjaga suasana agar nyaman untuk semua pengunjung. Kafe yang baik tumbuh dari pelanggan yang saling menghormati ruang bersama.
TEXT,
            ],
            [
                'category' => 'lifestyle',
                'title' => 'Panduan Literasi Kopi untuk Pemula',
                'slug' => 'panduan-literasi-kopi-untuk-pemula',
                'excerpt' => 'Dari arabika dan robusta sampai proses natural dan washed. Kenali istilah dasar kopi tanpa harus jadi barista.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-2',
                'author' => 'Tim Mampirin',
                'is_featured' => true,
                'days_ago' => 6,
                'views' => 720,
                'body' => <<<'TEXT'
Mencintai kopi tidak harus dimulai dari peralatan mahal. Justru sebaliknya: semakin kita memahami dasar-dasarnya, semakin mudah menikmati secangkir kopi tanpa merasa harus mengikuti tren yang sedang ramai.

Hal pertama yang perlu diketahui adalah perbedaan arabika dan robusta. Arabika cenderung lebih asam, aromatik, dan ringan, sementara robusta lebih pahit, pekat, dan sering dipakai untuk campuran espresso. Keduanya tidak lebih baik satu sama lain; semuanya tergantung selera.

Selanjutnya, kenali proses pengolahan biji. Proses washed menghasilkan rasa yang lebih bersih, sedangkan natural memberi karakter buah yang lebih kuat. Kalau baru mulai, cobalah memesan dua kopi dengan proses berbeda di tempat yang sama untuk merasakan perbedaannya.

Jangan takut bertanya kepada barista. Kebanyakan dari mereka senang menjelaskan asal biji dan cara seduh yang dipakai. Rasa penasaran itulah yang membuat perjalanan menikmati kopi jadi menyenangkan.
TEXT,
            ],
            [
                'category' => 'lifestyle',
                'title' => 'Rute Pagi: Bersepeda dari Jimbaran ke Nusa Dua',
                'slug' => 'rute-pagi-bersepeda-jimbaran-nusa-dua',
                'excerpt' => 'Rute santai sepanjang pesisir dengan udara pagi, tikungan landai, dan beberapa titik berhenti untuk sarapan.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-3',
                'author' => 'Bagus Wirawan',
                'is_featured' => false,
                'days_ago' => 18,
                'views' => 540,
                'body' => <<<'TEXT'
Kalau kamu mencari olahraga ringan yang tetap terasa seperti liburan, rute Jimbaran ke Nusa Dua bisa jadi pilihan. Jaraknya tidak terlalu jauh, medannya relatif datar, dan pemandangan pesisir membuat setiap kayuhan terasa lebih ringan.

Mulailah sekitar pukul enam pagi dari arah pantai Jimbaran. Jalan masih sepi, udara belum panas, dan warung sarapan mulai buka. Bawa botol minum serta uang tunai secukupnya karena tidak semua titik di rute ini menerima pembayaran digital.

Di tengah perjalanan ada beberapa tanjakan pendek yang cukup menantang. Turunkan gigi dan jangan memaksakan kecepatan; tujuan rute ini adalah menikmati perjalanan, bukan mengejar waktu. Berhenti sebentar di area pandang untuk berfoto atau sekadar mengatur napas.

Setibanya di Nusa Dua, sempatkan sarapan sebelum kembali. Pilih menu yang ringan tetapi mengenyangkan, lalu jangan lupa melakukan peregangan sebelum bersepeda pulang.
TEXT,
            ],
            [
                'category' => 'lifestyle',
                'title' => 'Menu Sarapan Lokal yang Membantu Fokus',
                'slug' => 'menu-sarapan-lokal-yang-membantu-fokus',
                'excerpt' => 'Tidak perlu menu mahal untuk memulai hari. Kombinasi karbohidrat, protein, dan buah lokal ini cukup untuk menemani aktivitas pagi.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-4',
                'author' => 'Nadia Kusuma',
                'is_featured' => false,
                'days_ago' => 29,
                'views' => 410,
                'body' => <<<'TEXT'
Sarapan sering dilewatkan karena buru-buru, padahal menu sederhana bisa membantu menjaga fokus sampai jam makan siang. Kuncinya bukan porsi besar, melainkan keseimbangan antara karbohidrat, protein, dan serat.

Nasi merah dengan telur, tempe, dan sayur tumis adalah pilihan yang mudah ditemukan. Kalau ingin lebih ringan, bubur dengan tambahan kacang hijau dan potongan pisang juga cukup mengenyangkan tanpa membuat mengantuk.

Hindari sarapan yang terlalu manis karena lonjakan gula darah bisa membuat tubuh cepat lelah. Ganti minuman manis dengan air putih atau teh tanpa gula, lalu tambahkan satu porsi buah segar seperti pepaya atau jeruk.

Yang paling penting adalah konsistensi. Sarapan tidak harus mewah; yang perlu adalah kebiasaan untuk memberi bahan bakar pada tubuh sebelum memulai hari.
TEXT,
            ],
            [
                'category' => 'entertainment',
                'title' => 'Film Lokal yang Wajib Ditonton Tahun Ini',
                'slug' => 'film-lokal-wajib-ditonton-tahun-ini',
                'excerpt' => 'Dari drama keluarga sampai horor rakyat, perfilman Indonesia kembali menemukan ritmenya. Ini lima judul yang layak masuk daftar tontonanmu.',
                'image_url' => 'https://picsum.photos/1280/720?random=art-5',
                'author' => 'Nadia Kusuma',
                'is_featured' => true,
                'days_ago' => 2,
                'views' => 842,
                'body' => <<<'TEXT'
Tahun ini perfilman Indonesia kembali menunjukkan geliatnya. Selain judul besar yang ramai dibicarakan, ada banyak film kecil dengan cerita yang rapi dan pemain yang meyakinkan. Sayangnya, tidak semuanya mendapat layar yang cukup luas.

Salah satu yang paling menarik adalah film drama keluarga yang mengambil latar sebuah pasar tradisional. Ceritanya sederhana, tetapi cara kamera menangkap keseharian membuat penonton merasa ikut tinggal di sana. Konfliknya tidak dilebih-lebihkan, dan justru itu yang membuatnya kuat.

Di genre horor, ada film yang berhasil memanfaatkan cerita rakyat tanpa bergantung pada jump scare berlebihan. Atmosfer dibangun perlahan, didukung tata suara yang sabar. Hasilnya, ketegangan terasa lebih lama dan meninggalkan kesan setelah layar gelap.

Sisanya adalah film komedi dan coming-of-age yang cocok ditonton bersama teman. Sebelum memilih, cek jadwal di bioskop lokal dan dukung filmnya di pekan pertama. Angka penonton di minggu pertama masih sangat menentukan nasib sebuah film.
TEXT,
            ],
            [
                'category' => 'entertainment',
                'title' => 'Konser Kampus Kembali Menggema di Jimbaran',
                'slug' => 'konser-kampus-kembali-menggema-di-jimbaran',
                'excerpt' => 'Setelah lama sepi, panggung musik mahasiswa kembali ramai. Ini yang membuat konser kampus tetap relevan bagi generasi baru.',
                'image_url' => 'https://picsum.photos/1280/720?random=art-6',
                'author' => 'Ayu Pramesti',
                'is_featured' => true,
                'days_ago' => 8,
                'views' => 691,
                'body' => <<<'TEXT'
Panggung musik kampus memang sempat redup beberapa tahun terakhir. Namun akhir pekan lalu, lapangan di kawasan Jimbaran kembali penuh oleh penonton yang datang membawa tikar, teman, dan antusiasme yang tidak kalah dari konser besar.

Yang menarik, sebagian besar penampil adalah band mahasiswa yang selama ini hanya aktif di kanal daring. Mereka membawakan materi sendiri dengan aransemen yang cukup matang. Ada juga kolaborasi antar-unit kegiatan yang membuat panggung terasa lebih hidup.

Selain musik, area konser diisi oleh tenant makanan dan pasar karya mahasiswa. Konsep ini membuat konser bukan hanya soal pertunjukan, tetapi juga ruang bertemu. Banyak pengunjung datang lebih awal hanya untuk mencoba makanan dan melihat produk lokal.

Semoga tradisi ini berlanjut. Konser kampus adalah tempat yang tepat untuk belajar mengelola acara, menguji materi baru, dan merayakan karya sendiri tanpa tekanan industri.
TEXT,
            ],
            [
                'category' => 'entertainment',
                'title' => 'Di Balik Layar Serial Musik Mahasiswa',
                'slug' => 'di-balik-layar-serial-musik-mahasiswa',
                'excerpt' => 'Tiga mahasiswa, satu kamera pinjaman, dan semangat bercerita. Begini proses produksi serial musik independen yang sedang ramai di kampus.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-7',
                'author' => 'Bagus Wirawan',
                'is_featured' => false,
                'days_ago' => 14,
                'views' => 512,
                'body' => <<<'TEXT'
Serial musik mahasiswa yang sedang ramai di kampus tidak lahir dari ruang produksi besar. Semuanya dimulai dari tiga mahasiswa yang bosan dengan konten seragam dan ingin menampilkan proses bermusik secara jujur.

Mereka merekam di kamar kos, aula kampus, dan kadang di tepi pantai. Peralatan yang dipakai juga sederhana: satu kamera pinjaman, mikrofon murah, dan lampu belajar. Justru keterbatasan itu membuat hasilnya terasa dekat dengan penonton.

Proses editing memakan waktu paling lama. Setiap episode berdurasi sekitar sepuluh menit, tetapi rekamannya bisa sampai dua jam. Mereka memilih momen yang paling manusiawi, termasuk saat nada fals atau ketika lagu harus diulang.

Episode berikutnya akan mengangkat tema musik tradisional dan kolaborasi dengan komunitas gamelan kampus. Kalau kamu penasaran, serial ini bisa ditonton gratis di kanal mereka.
TEXT,
            ],
            [
                'category' => 'entertainment',
                'title' => 'Tren Vinyl di Kalangan Gen Z Bali',
                'slug' => 'tren-vinyl-di-kalangan-gen-z-bali',
                'excerpt' => 'Toko vinyl kecil di Denpasar kini ramai dikunjungi anak muda. Ada apa di balik kembalinya piringan hitam?',
                'image_url' => 'https://picsum.photos/1200/800?random=art-8',
                'author' => 'Tim Mampirin',
                'is_featured' => false,
                'days_ago' => 25,
                'views' => 480,
                'body' => <<<'TEXT'
Di sudut Kota Denpasar, sebuah toko vinyl berukuran tidak lebih dari tiga kali lima meter selalu ramai pada akhir pekan. Pengunjungnya bukan kolektor senior, melainkan anak muda yang baru mengenal piringan hitam.

Ketertarikan ini tidak lepas dari pengalaman mendengarkan musik secara fisik. Memilih sleeve, mengeluarkan vinyl, dan meletakkannya di turntable memberi ritme tersendiri. Banyak yang mengaku lebih fokus mendengarkan album utuh dibandingkan melompat-lompat di platform streaming.

Harga vinyl memang tidak murah, terutama untuk rilisan impor. Karena itu, pasar second-hand dan tukar koleksi menjadi semakin hidup. Beberapa komunitas bahkan mengadakan sesi mendengarkan bersama di kafe atau studio kecil.

Tren ini tidak harus dimaknai sebagai perlawanan terhadap digital. Banyak pendengar tetap memakai streaming untuk menemukan musik baru, lalu membeli vinyl untuk karya yang benar-benar mereka cintai.
TEXT,
            ],
            [
                'category' => 'entertainment',
                'title' => 'Podcast Komedi yang Sedang Naik Daun',
                'slug' => 'podcast-komedi-yang-sedang-naik-daun',
                'excerpt' => 'Tanpa studio mahal, podcast komedi lokal tumbuh dari obrolan warung kopi. Ini beberapa kanal yang layak disimak.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-9',
                'author' => 'Nadia Kusuma',
                'is_featured' => false,
                'days_ago' => 34,
                'views' => 377,
                'body' => <<<'TEXT'
Podcast komedi lokal sedang menemukan pendengarnya. Berbeda dari format wawancara formal, banyak kanal baru memilih gaya obrolan santai yang terdengar seperti percakapan di warung kopi.

Kekuatan podcast jenis ini ada pada kedekatan. Pendengar merasa ikut duduk di meja yang sama, mendengarkan cerita keseharian yang tidak selalu penting tetapi menghibur. Topiknya bisa apa saja, dari salah masuk jurusan sampai pengalaman naik motor ke pantai.

Produksi mereka juga sederhana. Satu mikrofon kondensor, laptop, dan ruangan dengan karpet sudah cukup. Yang lebih penting adalah konsistensi jadwal dan kemampuan menjaga obrolan tetap mengalir.

Kalau ingin mulai mendengarkan, pilih episode bertema yang paling dekat dengan hidupmu. Podcast yang baik tidak harus selalu lucu; yang penting jujur dan tidak memaksakan lelucon.
TEXT,
            ],
            [
                'category' => 'history',
                'title' => 'Jejak Pasar Beringkit: Jantung Ekonomi Badung',
                'slug' => 'jejak-pasar-beringkit-jantung-ekonomi-badung',
                'excerpt' => 'Pasar Beringkit sudah lama menjadi titik temu pedagang dan pembeli. Sejarahnya menyimpan cerita tentang jaringan dagang dan kehidupan warga Badung.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-10',
                'author' => 'Bagus Wirawan',
                'is_featured' => true,
                'days_ago' => 5,
                'views' => 733,
                'body' => <<<'TEXT'
Pasar bukan hanya tempat jual beli. Di Bali, pasar tradisional sering menjadi simpul pertemuan antarwilayah, tempat informasi berpindah lebih cepat daripada surat resmi. Pasar Beringkit adalah salah satu contohnya.

Sejak puluhan tahun lalu, pasar ini menjadi tempat pedagang dari berbagai desa bertemu. Hasil bumi, kain, dan kebutuhan rumah tangga dipertukarkan setiap pagi. Dari aktivitas sederhana itu, terbentuk jaringan sosial yang bertahan sampai hari ini.

Seiring waktu, wajah pasar berubah. Bangunan diperbarui, akses jalan dibuka, dan transaksi mulai memakai pembayaran digital. Namun pola interaksinya masih sama: tawar-menawar, sapaan akrab, dan informasi tentang harga yang menyebar dari mulut ke mulut.

Menelusuri sejarah pasar berarti juga menelusuri sejarah ekonomi warga sehari-hari. Bukan kisah raja dan istana, melainkan kisah orang biasa yang menjaga denyut kehidupan kota.
TEXT,
            ],
            [
                'category' => 'history',
                'title' => 'Ketika Kerajaan Badung Berdagang di Pesisir',
                'slug' => 'ketika-kerajaan-badung-berdagang-di-pesisir',
                'excerpt' => 'Jaringan dagang maritim Badung menghubungkan pelabuhan kecil dengan pasar regional. Ini peran pesisir dalam perekonomian masa lalu.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-11',
                'author' => 'Tim Mampirin',
                'is_featured' => true,
                'days_ago' => 12,
                'views' => 610,
                'body' => <<<'TEXT'
Kawasan pesisir Badung punya peran penting dalam sejarah perdagangan Bali. Meski tidak sebesar pelabuhan-pelabuhan besar di Jawa, pelabuhan kecil di pesisir selatan menjadi titik singgah kapal dan tempat bertemunya pedagang dari berbagai daerah.

Komoditas yang diperdagangkan tidak hanya barang mewah. Beras, kopi, garam, dan hasil laut menjadi bagian dari lalu lintas ekonomi yang menghidupi banyak keluarga. Jalur ini juga membawa pengaruh budaya yang kemudian melebur dengan tradisi lokal.

Catatan sejarah menunjukkan bahwa penguasa lokal memberi perhatian besar pada akses ke laut. Perahu, dermaga sederhana, dan jalur darat menuju pasar menjadi bagian dari tata kelola wilayah. Semua itu dibangun perlahan, bukan dalam semalam.

Sisa-sisa jejaknya bisa ditelusuri lewat nama tempat, cerita lisan, dan bangunan lama di sekitar pesisir. Memahami sejarah maritim membantu kita melihat Bali bukan hanya sebagai destinasi wisata, tetapi juga wilayah dengan jaringan dagang yang panjang.
TEXT,
            ],
            [
                'category' => 'history',
                'title' => 'Arsitektur Pura dan Cerita di Baliknya',
                'slug' => 'arsitektur-pura-dan-cerita-di-baliknya',
                'excerpt' => 'Setiap ukiran dan tata ruang pura menyimpan makna. Menelusuri arsitektur sakral Bali lewat cerita para pengrajinnya.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-12',
                'author' => 'Ayu Pramesti',
                'is_featured' => false,
                'days_ago' => 21,
                'views' => 455,
                'body' => <<<'TEXT'
Arsitektur pura di Bali bukan sekadar susunan batu dan atap. Tata ruangnya mengikuti konsep arah, hirarki, dan hubungan antara manusia dengan alam. Setiap bagian punya nama, fungsi, dan cerita.

Para pengrajin biasanya mewarisi pengetahuan dari generasi sebelumnya. Mereka tidak hanya menghafal motif, tetapi memahami kapan dan di mana motif itu boleh dipakai. Kesalahan menempatkan ukiran bisa dianggap tidak sesuai dengan aturan adat.

Bahan bangunan juga dipilih dengan pertimbangan tertentu. Batu paras, kayu, dan ijuk mempunyai karakter yang berbeda. Perawatannya pun tidak bisa disamakan dengan bangunan modern.

Menjaga arsitektur pura berarti merawat pengetahuan yang hidup di baliknya. Generasi muda perlu diajak melihat bahwa bangunan sakral bukan hanya latar foto, tetapi warisan yang menuntut pemahaman dan rasa hormat.
TEXT,
            ],
            [
                'category' => 'history',
                'title' => 'Kopi Bali: Perjalanan dari Kebun ke Cangkir',
                'slug' => 'kopi-bali-perjalanan-dari-kebun-ke-cangkir',
                'excerpt' => 'Kopi sudah lama menjadi bagian dari ekonomi dan budaya Bali. Menelusuri perjalanannya dari kebun dataran tinggi sampai kedai di kota.',
                'image_url' => 'https://picsum.photos/1200/800?random=art-13',
                'author' => 'Nadia Kusuma',
                'is_featured' => false,
                'days_ago' => 40,
                'views' => 398,
                'body' => <<<'TEXT'
Kopi Bali punya perjalanan panjang yang tidak selalu tercatat dalam buku sejarah. Dari kebun di dataran tinggi, biji kopi berpindah melalui tangan petani, penyortir, dan pedagang sebelum akhirnya sampai ke cangkir.

Di masa lalu, kopi menjadi salah satu komoditas penting yang menghubungkan Bali dengan pasar luar pulau. Sistem tanam paksa pernah mengubah lanskap pertanian, tetapi pengetahuan lokal tentang budidaya tetap bertahan.

Hari ini, banyak kedai di kota mencoba menampilkan kopi Bali dengan pendekatan baru. Mereka bekerja sama langsung dengan petani, memperkenalkan proses pengolahan yang lebih baik, dan menceritakan asal biji kepada pelanggan.

Menikmati kopi Bali sebaiknya disertai kesadaran akan rantai panjang di belakangnya. Harga yang layak bagi petani adalah bagian dari keberlanjutan yang tidak kalah penting dari rasa di cangkir.
TEXT,
            ],
        ];

        foreach ($articles as $article) {
            $categorySlug = $article['category'];
            $daysAgo = $article['days_ago'];
            unset($article['category'], $article['days_ago']);

            Article::query()->updateOrCreate(
                ['slug' => $article['slug']],
                $article + [
                    'category_id' => $categories[$categorySlug] ?? null,
                    'is_published' => true,
                    'published_at' => now()->subDays($daysAgo)->setTime(9, 0),
                ],
            );
        }
    }
}
