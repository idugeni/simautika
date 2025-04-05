'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/shared/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()

  React.useEffect(() => {
    if (!isMobile && open) {
      setOpen(false)
    }
  }, [isMobile, open])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between max-w-7xl px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="font-bold">Simautika</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/features" className="text-sm font-medium transition-colors hover:text-primary">
            Fitur
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            Tentang
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Kontak
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="hidden md:block">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Dashboard
            </Link>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[280px] p-6">
              <div className="flex flex-col space-y-6">
                <Link href="/features" className="text-sm font-medium transition-colors hover:text-primary">
                  Fitur
                </Link>
                <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                  Tentang
                </Link>
                <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                  Kontak
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}