'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="container mx-auto max-w-7xl flex flex-col items-center justify-center gap-3 md:gap-4 px-4 py-6 md:px-6 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Simautika<br />Otomatisasi Pengisian Jurnal
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2 md:px-0">
        Platform otomatisasi pengisian jurnal untuk Kementerian Imigrasi & Pemasyarakatan
        yang mengoptimalkan efisiensi dan keamanan data pegawai.
        </p>
      </div>
      <div className="flex w-full flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 py-4 md:pb-10">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex h-10 md:h-11 items-center justify-center rounded-md bg-primary px-6 md:px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Mulai Sekarang
        </Link>
        <Link
          href="/features"
          className="w-full sm:w-auto inline-flex h-10 md:h-11 items-center justify-center rounded-md border border-input px-6 md:px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Pelajari Lebih Lanjut
        </Link>
      </div>
      <div className="py-6 md:py-8">
        <Image
          src="/preview.jpeg"
          alt="Dashboard Preview"
          width={1200}
          height={675}
          className="rounded-lg border bg-background shadow-xl"
          priority
        />
      </div>
    </section>
  );
}