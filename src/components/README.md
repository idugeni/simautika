# Struktur Komponen

Dokumentasi struktur dan panduan penggunaan komponen dalam aplikasi Simautika.

## Struktur Folder

```
components/
├── features/         # Komponen fitur spesifik aplikasi
│   ├── auth/        # Komponen terkait autentikasi
│   ├── dashboard/   # Komponen untuk dashboard
│   └── reports/     # Komponen untuk laporan
├── layout/          # Komponen tata letak utama
│   ├── header/      # Komponen header
│   ├── footer/      # Komponen footer
│   └── sidebar/     # Komponen sidebar
├── shared/          # Komponen yang dapat digunakan ulang
│   ├── buttons/     # Tombol kustom
│   ├── cards/       # Kartu dan kontainer
│   └── forms/       # Komponen form
└── ui/              # Komponen UI dasar dari shadcn/ui
```

## Panduan Penamaan

- Gunakan format PascalCase untuk nama komponen (contoh: `UserProfile.tsx`)
- Gunakan format kebab-case untuk nama folder (contoh: `user-profile/`)
- Setiap komponen harus memiliki satu fungsi ekspor default
- Komponen yang terkait dapat dikelompokkan dalam satu folder

## Panduan Penggunaan

### Komponen Features
Berisi komponen-komponen yang spesifik untuk fitur tertentu dalam aplikasi. Komponen ini biasanya memiliki logika bisnis yang kompleks dan terkait dengan fitur tertentu.

### Komponen Layout
Komponen yang membentuk struktur tata letak utama aplikasi. Komponen ini digunakan untuk membangun kerangka dasar halaman.

### Komponen Shared
Komponen yang dapat digunakan kembali di berbagai bagian aplikasi. Komponen ini bersifat generik dan tidak memiliki ketergantungan dengan fitur spesifik.

### Komponen UI
Komponen dasar dari shadcn/ui yang telah dikustomisasi sesuai dengan desain sistem aplikasi.

## Best Practices

1. Pisahkan komponen berdasarkan fungsi dan tanggung jawabnya
2. Gunakan TypeScript untuk type safety
3. Dokumentasikan props dan fungsi komponen
4. Ikuti prinsip Single Responsibility
5. Gunakan komponen UI dasar untuk konsistensi desain