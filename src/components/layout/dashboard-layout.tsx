'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FiMenu } from 'react-icons/fi';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/theme-toggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl flex h-12 md:h-14 items-center px-4 md:px-6">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold text-base md:text-lg">Admin Dashboard</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between md:justify-end space-x-2">
            <span className="md:hidden font-bold text-base">Admin Dashboard</span>
            <ThemeToggle />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <FiMenu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 w-[240px]">
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                <div className="flex flex-col space-y-2">
                  <a
                    href="/dashboard"
                    className="flex items-center space-x-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent active:bg-accent"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/users"
                    className="flex items-center space-x-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent active:bg-accent"
                  >
                    Users
                  </a>
                  {/* Add more menu items here */}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
          <aside className="hidden border-r bg-background md:block">
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
              <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                  <div className="space-y-1">
                    <a
                      href="/dashboard"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/users"
                      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                    >
                      Users
                    </a>
                    {/* Add more menu items here */}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </aside>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}