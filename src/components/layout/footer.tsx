'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto max-w-7xl py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="font-bold">Simautika</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Aplikasi otomatisasi pengisian jurnal untuk Kementerian Imigrasi & Pemasyarakatan.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Tautan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:text-foreground">Fitur</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">Tentang</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">Kontak</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Kontak</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: admin@idugeni.id</li>
              <li>Telepon: (021) 123-4567</li>
              <li>Alamat: Jakarta, Indonesia</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground">Kebijakan Privasi</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">Syarat & Ketentuan</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Simautika. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </div>
    </footer>
  );
}