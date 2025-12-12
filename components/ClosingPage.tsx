"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ContactModal from "./ContactModal";

export default function ClosingPage() {
  const [showText, setShowText] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: false });

  useEffect(() => {
    if (inView) {
      const timer = window.setTimeout(() => setShowText(true), 1500);
      return () => window.clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    if (showText) {
      const timer = window.setTimeout(() => setFooterVisible(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, [showText]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-screen pt-28 pb-0 sm:pt-32 sm:pb-2 bg-[#0b1a36] text-[#e8f7ff]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{ opacity: showText ? 0.35 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ClockBackground />
      </motion.div>

      <motion.div
        className="relative z-20 mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-start pt-6 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="font-['Russo_One',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]">
          it&apos;s time to
          <br />
          put your business
          <br />
          on the map
        </h1>
        <div className="mt-14 flex items-center justify-center">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/30" />
            <motion.button
              onHoverStart={() => setCtaHover(true)}
              onHoverEnd={() => setCtaHover(false)}
              whileHover={{ scale: 1.05, boxShadow: "0 18px 50px rgba(16,185,129,0.45)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={() => setContactOpen(true)}
              className="relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#2a9df4] via-[#1b8ce0] to-[#0c6fd4] text-white text-xs font-semibold uppercase tracking-[0.12em] shadow-[0_12px_30px_rgba(12,111,212,0.4)] transition-all duration-700"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#34d399] via-[#10b981] to-[#0f9a74]"
                animate={{ opacity: ctaHover ? 1 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <span className="relative z-10">get started</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} showTrigger={false} />

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-2 z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: footerVisible ? 1 : 0, y: footerVisible ? 0 : 12 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="relative mx-auto w-fit px-6 sm:px-10">
          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/85 sm:text-xs">
            <div className="flex flex-col gap-1 border-b sm:border-b-0 sm:border-r border-white/12 pb-3 sm:pb-0 sm:pr-4">
              <span className="text-[11px] text-white/60">Services</span>
              <span>Web Design</span>
              <span>Development</span>
              <span>Launch</span>
            </div>
            <div className="flex flex-col gap-1 border-b sm:border-b-0 sm:border-r border-white/12 py-3 sm:py-0 sm:px-4">
              <span className="text-[11px] text-white/60">Company</span>
              <span>About</span>
              <span>Process</span>
              <span>Careers</span>
            </div>
            <div className="flex flex-col gap-1 pt-3 sm:pt-0 sm:pl-4">
              <span className="text-[11px] text-white/60">Contact</span>
              <span>hello@sylo.studio</span>
              <span>+1 (310) 555-0123</span>
              <span>Los Angeles, CA</span>
            </div>
          </div>
        </div>
      </motion.div>
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
