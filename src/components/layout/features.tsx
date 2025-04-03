'use client';

import * as React from 'react';
import { FileText, Shield, Users2, BarChart3, Clock, Database } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Otomatisasi Jurnal',
    description: 'Sistem otomatisasi jurnal terintegrasi untuk Kementerian Imigrasi & Pemasyarakatan'
  },
  {
    icon: Users2,
    title: 'Manajemen Pegawai',
    description: 'Pengelolaan data pegawai Kementerian secara efisien dan terstruktur'
  },
  {
    icon: Shield,
    title: 'Keamanan Data',
    description: 'Sistem keamanan berlapis untuk melindungi data sensitif Kementerian'
  },
  {
    icon: Clock,
    title: 'Efisiensi Waktu',
    description: 'Percepat proses administrasi dengan sistem otomatisasi yang handal'
  },
  {
    icon: Database,
    title: 'Penyimpanan Terpusat',
    description: 'Basis data terpusat untuk kemudahan akses dan pengelolaan informasi'
  },
  {
    icon: BarChart3,
    title: 'Laporan & Statistik',
    description: 'Generasi laporan otomatis dan analisis data untuk pengambilan keputusan'
  }
];

export function Features() {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-12 lg:py-24">
      <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl">
          Fitur Unggulan
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground px-2 md:px-0">
          Solusi lengkap untuk otomatisasi jurnal dan pengelolaan data di lingkungan Kementerian Imigrasi & Pemasyarakatan
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 py-8 md:py-12 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-3 md:space-y-4 rounded-lg border p-4 md:p-6 transition-all hover:border-primary hover:bg-accent">
            <div className="rounded-full border p-2">
              <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
            <p className="text-center text-sm text-muted-foreground px-1 md:px-0">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}