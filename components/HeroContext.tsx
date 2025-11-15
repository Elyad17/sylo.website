'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type HeroHoverContextValue = {
  hovered: boolean;
  setHovered: (value: boolean) => void;
};

const HeroHoverContext = createContext<HeroHoverContextValue | null>(null);

export function HeroHoverProvider({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <HeroHoverContext.Provider value={{ hovered, setHovered }}>
      {children}
    </HeroHoverContext.Provider>
  );
}

export function useHeroHover() {
  const ctx = useContext(HeroHoverContext);
  if (!ctx) throw new Error('useHeroHover must be used inside HeroHoverProvider');
  return ctx;
}
