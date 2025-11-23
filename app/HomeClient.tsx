'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import { ProcessSection } from '@/components/process/ProcessSection';

export default function HomeClient() {
  const [heroHovered, setHeroHovered] = useState(false);

  return (
    <>
      <Hero hovered={heroHovered} setHovered={setHeroHovered} />
      <WhyUs heroHovered={heroHovered} />
      <ProcessSection />
    </>
  );
}
