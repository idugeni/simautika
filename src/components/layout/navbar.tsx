'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center max-w-7xl">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="font-bold">Simautika</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex-1 md:flex md:justify-center">
            <div className="hidden items-center space-x-4 md:flex">
              <Link href="/features" className="text-sm font-medium transition-colors hover:text-primary">
                Fitur
              </Link>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                Tentang
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                Kontak
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}