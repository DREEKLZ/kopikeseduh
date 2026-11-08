# Kopi Keseduh — Online Coffee Store

Website katalog dan pemesanan online untuk **biji kopi utuh** serta **kopi bubuk siap seduh**.

## Menjalankan website
1. Extract folder `kopi-keseduh`.
2. Buka folder di Visual Studio Code.
3. Jalankan `index.html` dengan ekstensi Live Server, atau buka langsung di browser.

## Fitur
- Tema dark coffee premium yang responsif untuk desktop dan ponsel.
- Katalog produk biji kopi dan kopi bubuk.
- Filter jenis produk, pencarian, dan pengurutan harga.
- Detail produk, keranjang belanja, ubah jumlah, dan subtotal.
- Keranjang tersimpan di browser menggunakan localStorage.
- Checkout dan formulir kontak membuat pesan WhatsApp otomatis.

## Pengaturan sebelum dipublikasikan
- Buka `script.js`, ubah `WA_NUMBER` menjadi nomor WhatsApp toko dengan format internasional tanpa tanda `+` (contoh format: `62812...`).
- Periksa nama produk, asal kopi, deskripsi, berat, foto, dan harga pada array `products` di `script.js`. Data produk/harga saat ini adalah contoh awal dan harus disesuaikan dengan stok serta harga tokomu.
- Ganti akun Instagram dan jam layanan pada `index.html` jika diperlukan.
- Foto produk pada katalog inventori disimpan lokal di folder `assets` agar tetap tampil tanpa koneksi ke server gambar eksternal. Ganti dengan foto produk asli bila tersedia.

## Catatan
Website ini menyiapkan alur katalog, keranjang, dan checkout melalui WhatsApp. Pembayaran online otomatis, ongkir real-time, dan manajemen stok belum terhubung ke backend/payment gateway.

## Pembaruan katalog dan foto
- Ikon keranjang diperbarui menjadi ikon cangkir kopi.
- Katalog diisi 6 contoh produk biji kopi dan kopi bubuk.
- Dua foto kemasan dari pemilik website dipakai sebagai referensi visual produk pertama dan kedua.
- Empat foto kemasan produk lainnya sudah disediakan sebagai aset lokal agar gambar katalog tidak bergantung pada tautan eksternal.
- Nama, berat, deskripsi, dan harga keenam produk adalah contoh awal; sesuaikan dengan stok dan harga jual sebenarnya.


## Fitur tambahan
- Halaman Info Toko berisi kebijakan pengiriman, retur/komplain, privasi, dan pembayaran.
- Form ulasan pembeli tersimpan pada browser/perangkat yang digunakan (belum menjadi ulasan publik lintas perangkat).
- Detail produk menampilkan jenis/asal, isi paket, berat, dan keterangan konfirmasi stok.
- Tautan Instagram serta kolom email dan kota toko.
- Informasi pembayaran aman dan legalitas disampaikan secara transparan; website belum terhubung payment gateway dan NIB belum diisi.
- Website dapat dipasang pada domain dengan HTTPS melalui layanan hosting yang menyediakan SSL. Domain dan sertifikat HTTPS harus diaktifkan saat deployment.

## Data yang wajib dilengkapi pemilik sebelum publikasi
- Ganti nomor WhatsApp contoh `6281234567890` dengan nomor resmi toko.
- Isi email dan kota/alamat operasional toko.
- Pastikan akun Instagram benar.
- Isi NIB hanya berdasarkan dokumen resmi yang dimiliki.
- Perbarui harga dan stok produk sesuai kondisi sebenarnya.
- Tentukan metode pembayaran/rekening resmi dan kebijakan retur final.


## Revisi stok, ulasan, dan WhatsApp
- Stok awal contoh per produk: Salut Ethiopia 12, Memorable Colombia 8, Gayo Wine Process 10, Temanggung Robusta 15, Arabika Flores 7, House Blend Keseduh 9 pcs. Sesuaikan dengan stok gudang sebenarnya di `script.js`.
- Jumlah stok tampil di kartu dan detail produk; keranjang membatasi jumlah sesuai stok.
- Detail produk menampilkan tiga ulasan contoh. Ulasan ini hanya contoh tampilan, bukan testimoni pelanggan terverifikasi; ganti dengan ulasan asli sebelum publikasi.
- WhatsApp toko telah diatur ke 089669085603 (format tautan internasional: 6289669085603).


## Penyempurnaan tampilan HP
- Layout responsif untuk lebar layar kecil, termasuk 360 px.
- Mencegah halaman melebar ke samping (horizontal overflow).
- Modal detail produk dan keranjang dapat digulir di layar pendek.
- Form, gambar, kartu produk, navigasi, dan tombol menyesuaikan lebar layar.
