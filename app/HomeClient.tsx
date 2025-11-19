'use client';

import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { ProcessSection } from '@/components/process/ProcessSection';

export default function HomeClient() {
  const [heroHovered, setHeroHovered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return () => {
      window.history.scrollRestoration = previous ?? 'auto';
    };
  }, []);

  return (
    <>
      <Hero hovered={heroHovered} setHovered={setHeroHovered} />
      <WhyUs heroHovered={heroHovered} />
      <ProcessSection />
      <Contact />
      <Footer />
    </>
  );
}
