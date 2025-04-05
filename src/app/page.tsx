import { Navbar } from '@/components/layout/header/Navbar';
import { Hero } from '@/components/layout/hero/Hero';
import { Features } from '@/components/layout/features/Features';
import { Footer } from '@/components/layout/footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
