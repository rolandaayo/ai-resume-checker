import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Companies from '@/components/Companies';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#118F9A]">
      <Navbar />
      <Hero />
      <Features />
      <Companies />
      <Footer />
    </main>
  );
}
