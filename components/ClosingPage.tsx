"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "./Footer";

export default function ClosingPage() {
  const [showText, setShowText] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: false });

  useEffect(() => {
    if (inView) {
      const timer = window.setTimeout(() => setShowText(true), 2000);
      return () => window.clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-32 pb-32 sm:pt-36 sm:pb-36 min-h-[180vh] bg-[#0b1a36] text-[#e8f7ff]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{ opacity: showText ? 0.35 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ClockBackground />
      </motion.div>

      <motion.div
        className="relative z-20 mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-start pt-6 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]">
          it's time to
          <br />
          put your business
          <br />
          on the map
        </h1>
        <div className="mt-10 flex items-center justify-center">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/30" />
            <button className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#2a9df4] to-[#0c6fd4] text-white text-xs font-semibold uppercase tracking-[0.12em] shadow-[0_12px_30px_rgba(12,111,212,0.4)]">
              get started
            </button>
          </div>
        </div>
      </motion.div>

      <div className="relative z-20 mt-16 px-6 sm:px-10">
        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center text-[#e8f7ff] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur sm:px-8 sm:py-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 text-sm sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">Sylo Agency</p>
              <p className="text-white">Launch bold web experiences.</p>
            </div>
            <div className="flex flex-wrap gap-6 text-white/85">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Contact</p>
                <p>hello@sylo.studio</p>
                <p>+1 (310) 555-0123</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Links</p>
                <p>Work</p>
                <p>Process</p>
                <p>About</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Social</p>
                <p>Instagram</p>
                <p>LinkedIn</p>
                <p>Dribbble</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <div className="h-32 md:h-48" aria-hidden />
    </section>
  );
}

function ClockBackground() {
  const hourRef = useRef<SVGLineElement | null>(null);
  const minuteRef = useRef<SVGLineElement | null>(null);
  const secondRef = useRef<SVGLineElement | null>(null);

  useEffect(() => {
    let frame: number;
    const tick = () => {
      const now = new Date();
      const hr = now.getHours() % 12;
      const min = now.getMinutes();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const hourDeg = (360 / 12) * (hr + min / 60);
      const minDeg = (360 / 60) * (min + sec / 60);
      const secDeg = (360 / 60) * sec;
      if (hourRef.current) hourRef.current.setAttribute("transform", `rotate(${hourDeg} 100 100)`);
      if (minuteRef.current) minuteRef.current.setAttribute("transform", `rotate(${minDeg} 100 100)`);
      if (secondRef.current) secondRef.current.setAttribute("transform", `rotate(${secDeg} 100 100)`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <svg
        width="110vmin"
        height="110vmin"
        viewBox="0 0 200 200"
        fill="none"
        className="absolute left-1/2 -top-6 -translate-x-1/2"
      >
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * Math.PI * 2;
          const long = i % 5 === 0;
          const rOuter = 96;
          const rInner = long ? 86 : 90;
          const fmt = (n: number) => n.toFixed(3);
          const x1 = fmt(100 + rOuter * Math.cos(angle));
          const y1 = fmt(100 + rOuter * Math.sin(angle));
          const x2 = fmt(100 + rInner * Math.cos(angle));
          const y2 = fmt(100 + rInner * Math.sin(angle));
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={long ? "#f0f0c9" : "#0f0e0e"}
              strokeWidth={long ? 2.5 : 1.5}
              strokeLinecap="round"
              opacity={0.9}
            />
          );
        })}

        <line ref={hourRef} x1="100" y1="100" x2="100" y2="58" stroke="#ffffff" strokeWidth={7} strokeLinecap="round" />
        <line ref={minuteRef} x1="100" y1="100" x2="100" y2="42" stroke="#ffffff" strokeWidth={4} strokeLinecap="round" />
        <line ref={secondRef} x1="100" y1="100" x2="100" y2="32" stroke="#f5e342" strokeWidth={2} strokeLinecap="round" />

        <circle cx="100" cy="100" r="6" fill="#7b0828" stroke="white" strokeWidth={2} />
      </svg>
    </div>
  );
}
