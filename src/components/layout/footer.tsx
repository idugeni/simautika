'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="font-bold">Simautika</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Aplikasi otomatisasi pengisian jurnal untuk Kementerian Imigrasi & Pemasyarakatan.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Tautan</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:text-foreground transition-colors">Fitur</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">Tentang</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">Kontak</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Kontak</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Email: admin@idugeni.id</li>
              <li>Telepon: (021) 123-4567</li>
              <li>Alamat: Jakarta, Indonesia</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">Kebijakan Privasi</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">Syarat & Ketentuan</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 md:pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Simautika. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </div>
    </footer>
  );
}