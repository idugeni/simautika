'use client';

import * as React from 'react';
import { FileText, Shield, Clock, Users, Database, LineChart } from 'lucide-react';

const features = [
  {
    name: 'Manajemen Jurnal Digital',
    description: 'Kelola jurnal harian dengan mudah melalui antarmuka digital yang intuitif dan terorganisir.',
    icon: FileText,
  },
  {
    name: 'Otomatisasi Pengisian',
    description: 'Sistem cerdas yang membantu mengisi jurnal secara otomatis berdasarkan aktivitas dan jadwal.',
    icon: Clock,
  },
  {
    name: 'Keamanan Data',
    description: 'Perlindungan data tingkat tinggi dengan enkripsi dan kontrol akses yang ketat.',
    icon: Shield,
  },
  {
    name: 'Manajemen Pengguna',
    description: 'Kelola akses dan peran pengguna dengan sistem hierarki yang terstruktur.',
    icon: Users,
  },
  {
    name: 'Integrasi Database',
    description: 'Sinkronisasi data real-time dengan database pusat Kementerian.',
    icon: Database,
  },
  {
    name: 'Analisis & Pelaporan',
    description: 'Generasi laporan otomatis dan analisis data untuk pengambilan keputusan.',
    icon: LineChart,
  },
];

export function Features() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-12">
      <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
        <h2 className="font-bold text-3xl leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">Fitur Unggulan</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Solusi lengkap untuk otomatisasi dan manajemen jurnal di lingkungan Kementerian Imigrasi & Pemasyarakatan
        </p>
      </div>
      <div className="mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-16">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8 hover:bg-muted/50 transition-colors">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
              <feature.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{feature.name}</h3>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}