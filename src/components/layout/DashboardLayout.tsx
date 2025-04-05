'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { FiMenu, FiHome, FiUsers, FiFileText, FiBarChart2, FiSettings, FiBell, FiUser } from 'react-icons/fi';
import { ThemeToggle } from '@/components/shared/theme/ThemeToggle';
import { DialogTitle } from '@radix-ui/react-dialog';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  return (
    <div className="relative w-full flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 md:h-14 items-center px-0">
          <div className="hidden md:flex md:w-[220px] md:items-center md:justify-center md:border-r md:px-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Simautika Logo" className="h-6 w-6" width={24} height={24} />
              <span className="font-bold text-base md:text-lg text-foreground">SIMAUTIKA</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between px-4">
            <div className="flex items-center space-x-2 md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <FiMenu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0 w-[240px]">
                  <DialogTitle className="px-2 py-4 flex items-center space-x-2">
                    <span className="font-bold text-lg">SIMAUTIKA</span>
                  </DialogTitle>
                  <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent active:bg-accent"
                      >
                        <FiHome className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/users"
                        className="flex items-center space-x-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent active:bg-accent"
                      >
                        <FiUsers className="h-4 w-4" />
                        <span>Pengguna</span>
                      </Link>
                      <Link
                        href="/dashboard/documents"
                        className="flex items-center space-x-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent active:bg-accent"
                      >
                        <FiFileText className="h-4 w-4" />
                        <span>Dokumen</span>
                      </Link>
                      <Link
                        href="/dashboard/reports"
                        className="flex items-center space-x-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent active:bg-accent"
                      >
                        <FiBarChart2 className="h-4 w-4" />
                        <span>Laporan</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center space-x-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent active:bg-accent"
                      >
                        <FiSettings className="h-4 w-4" />
                        <span>Pengaturan</span>
                      </Link>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="Simautika Logo" className="h-5 w-5" width={20} height={20} />
                <span className="font-bold text-base text-foreground">SIMAUTIKA</span>
              </Link>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center justify-end space-x-2 md:space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <FiBell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">3</Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <FiUser className="h-5 w-5" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
          <aside className="hidden border-r border-border bg-card md:block">
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
              <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                  <div className="space-y-1">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      <FiHome className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/dashboard/users"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      <FiUsers className="h-4 w-4" />
                      <span>Pengguna</span>
                    </Link>
                    <Link
                      href="/dashboard/documents"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      <FiFileText className="h-4 w-4" />
                      <span>Dokumen</span>
                    </Link>
                    <Link
                      href="/dashboard/reports"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      <FiBarChart2 className="h-4 w-4" />
                      <span>Laporan</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      <FiSettings className="h-4 w-4" />
                      <span>Pengaturan</span>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </aside>
          <main className="flex-1 p-4 md:p-6">
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">Halaman Saat Ini</span>
            </div>
            {children}
          </main>
        </div>
      </div>
      <footer className="border-t bg-card">
        <div className="px-4 md:px-6 flex flex-col md:flex-row items-center justify-between py-4 md:h-14 space-y-2 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Simautika. Hak Cipta Dilindungi.
          </p>
          <nav className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">Tentang</Link>
            <Link href="/privacy" className="hover:underline">Privasi</Link>
            <Link href="/terms" className="hover:underline">Ketentuan</Link>
            <Link href="/contact" className="hover:underline">Kontak</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}