'use client';
import { createContext, useContext, useState } from 'react';

const HeroContext = createContext<any>(null);

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <HeroContext.Provider value={{ hovered, setHovered }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  return useContext(HeroContext);
}
