"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TRACK1_CLIENTS = [
  "ci-1.png", "ci-2.png", "ci-3.png", "ci-4.png", "ci-5.png",
  "ci-6.png", "ci-7.png", "ci-8.png", "ci-9.png", "ci-10.png",
  "ci-11.png", "ci-12.png", "ci-13.png", "ci-14.png", "ci-15.png"
];

const TRACK2_CLIENTS = [
  "ci-16.png", "ci-17.png", "ci-18.png", "ci-19.png", "ci-20.png",
  "ci-21.png", "ci-22.png", "ci-23.png", "ci-24.png", "ci-25.png",
  "ci-26.png", "ci-27.png", "ci-28.png", "ci-29.png", "ci-30.png",
  "ci-31.png", "ci-33.png", "ci-34.png", "ci-36.png", "ci-37.png", "ci-39.png"
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Track 1 moves left on scroll (locomotive split effect)
  const track1X = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  // Track 2 moves right on scroll (opposite direction)
  const track2X = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      ref={sectionRef}
      className="pt-4 pb-8 bg-slate-50 relative overflow-hidden border-b border-slate-100"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 45s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 45s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Marquee Tracks Wrapper — wrapped in Framer Motion for locomotive parallax */}
      <div className="flex flex-col gap-6 relative w-full">
        {/* Fading overlay gradients on boundary edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 via-slate-50/60 to-transparent z-10 pointer-events-none" />

        {/* Track 1: Scroll Left — with locomotive offset */}
        <motion.div style={{ x: track1X }} className="overflow-hidden">
          <div className="animate-marquee-left">
            {[...TRACK1_CLIENTS, ...TRACK1_CLIENTS].map((logo, idx) => (
              <div
                key={`t1-${idx}`}
                className="mx-6 flex-shrink-0 flex items-center justify-center w-[120px] h-[52px] grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={`/images/client/${logo}`}
                  alt={`Client ${idx + 1}`}
                  className="max-h-[40px] max-w-[110px] w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Track 2: Scroll Right — with locomotive offset */}
        <motion.div style={{ x: track2X }} className="overflow-hidden">
          <div className="animate-marquee-right">
            {[...TRACK2_CLIENTS, ...TRACK2_CLIENTS].map((logo, idx) => (
              <div
                key={`t2-${idx}`}
                className="mx-6 flex-shrink-0 flex items-center justify-center w-[120px] h-[52px] grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={`/images/client/${logo}`}
                  alt={`Client ${idx + 1}`}
                  className="max-h-[40px] max-w-[110px] w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
