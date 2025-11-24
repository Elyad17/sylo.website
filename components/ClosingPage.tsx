"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "./Footer";

export default function ClosingPage() {
  const [showText, setShowText] = useState(false);
  const timerRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: false });

  const startSequence = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowText(false);
    timerRef.current = window.setTimeout(() => setShowText(true), 3000);
  };

  useEffect(() => {
    startSequence();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startSequence();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (timerRef.current) clearTimeout(timerRef.current);
      setShowText(false);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      startSequence();
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-16 min-h-screen bg-[#0b1a36] text-[#e8f7ff]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{ opacity: showText ? 0.35 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ClockBackground />
      </motion.div>

      <motion.div
        className="relative z-20 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-start pt-6 px-6 text-center pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]">
          its time to
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

      <div className="relative z-20 mt-10">
        <Footer />
      </div>
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
