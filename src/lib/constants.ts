// Konstanta untuk data dropdown

/**
 * Opsi Pangkat dan Golongan Ruang Pegawai Negeri Sipil (PNS).
 * Diurutkan dari tertinggi ke terendah.
 */
export const PANGKAT_GOLONGAN_OPTIONS = [
  'Pembina Utama (IV/e)',
  'Pembina Utama Madya (IV/d)',
  'Pembina Utama Muda (IV/c)',
  'Pembina Tingkat I (IV/b)',
  'Pembina (IV/a)',
  'Penata Tingkat I (III/d)',
  'Penata (III/c)',
  'Penata Muda Tingkat I (III/b)',
  'Penata Muda (III/a)',
  'Pengatur Tingkat I (II/d)',
  'Pengatur (II/c)',
  'Pengatur Muda Tingkat I (II/b)',
  'Pengatur Muda (II/a)',
  'Juru Tingkat I (I/d)', // Ditambahkan
  'Juru (I/c)',           // Ditambahkan
  'Juru Muda Tingkat I (I/b)', // Ditambahkan
  'Juru Muda (I/a)',        // Ditambahkan
] as const;

/**
 * Opsi Jabatan struktural atau fungsional.
 * Daftar ini mungkin perlu disesuaikan dengan struktur organisasi spesifik.
 */
export const JABATAN_OPTIONS = [
  'Kepala Rutan/Lapas/Kantor', // Lebih generik
  'Kepala Bagian',             // Ditambahkan
  'Kepala Seksi',
  'Kepala Sub Bagian',         // Ditambahkan
  'Kepala Sub Seksi',
  'Kepala Urusan',
  'Pejabat Fungsional Tertentu (Analis, Pemeriksa, dll.)', // Lebih deskriptif
  'Pejabat Fungsional Umum (Staf)', // Lebih deskriptif, menggantikan 'Staff'
  'Komandan Jaga', // Contoh spesifik untuk Rutan/Lapas
  'Anggota Jaga',  // Contoh spesifik untuk Rutan/Lapas
] as const;

/**
 * Opsi Unit Kerja atau Bagian dalam organisasi.
 * Contoh ini didasarkan pada struktur umum Rutan/Lapas, perlu penyesuaian.
 */
export const UNIT_BAGIAN_OPTIONS = [
  // Bagian (Level lebih tinggi)
  'Bagian Tata Usaha', // Contoh penamaan lain
  'Bagian Pembinaan', // Contoh
  'Bagian Keamanan dan Ketertiban',
  'Bagian Pelayanan Tahanan/Narapidana',
  'Bagian Kegiatan Kerja', // Contoh
  'Bagian Pengelolaan',
  // Sub Bagian / Seksi / Urusan (Level di bawah Bagian)
  'Sub Bagian Umum',
  'Sub Bagian Kepegawaian dan Keuangan', // Bisa digabung atau dipisah
  'Seksi Administrasi Keamanan dan Tata Tertib', // Contoh
  'Seksi Registrasi dan Bimbingan Kemasyarakatan', // Contoh
  'Seksi Pengelolaan dan Perawatan', // Contoh
  'Urusan Umum', // Contoh
  'Urusan Kepegawaian', // Contoh
  'Urusan Keuangan', // Contoh
  // Lainnya
  'Kesatuan Pengamanan Rutan/Lapas (KPR/KPLP)', // Unit spesifik
  'Klinik', // Jika ada
] as const;

/**
 * Opsi Peran (Role) pengguna dalam sistem aplikasi.
 * Ini menentukan hak akses atau fungsi dalam aplikasi.
 */
export const ROLE_OPTIONS = [
  'Staff Administrasi',
  'Regu Pengamanan',
] as const;

// Contoh tipe data yang dihasilkan oleh 'as const' (opsional, hanya untuk ilustrasi)
export type PangkatGolongan = typeof PANGKAT_GOLONGAN_OPTIONS[number];
export type Jabatan = typeof JABATAN_OPTIONS[number];
export type UnitBagian = typeof UNIT_BAGIAN_OPTIONS[number];
export type Role = typeof ROLE_OPTIONS[number];