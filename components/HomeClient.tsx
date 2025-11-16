'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomeClient() {
  const [heroHovered, setHeroHovered] = useState(false);

  return (
    <>
      <Hero onHoverChange={setHeroHovered} />
      <WhyUs heroHovered={heroHovered} />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
