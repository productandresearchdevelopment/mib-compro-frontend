"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollMarqueeProps {
  text: string;
  direction?: "left" | "right";
  speedMultiplier?: number;
}

export default function ScrollMarquee({
  text,
  direction = "left",
  speedMultiplier = 1.5,
}: ScrollMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const baseRange = [150 * speedMultiplier, -300 * speedMultiplier];
  const range = direction === "left" ? baseRange : [-baseRange[0], -baseRange[1]];
  const x = useTransform(scrollYProgress, [0, 1], range);

  // Split the incoming text dynamically into words
  const wordsList = text.split(" • ");
  // Repeat to fill wide screens
  const repeatedWords = Array(4).fill(wordsList).flat();

  if (isMobile) {
    const animationDuration = 30 / speedMultiplier;
    return (
      <div
        ref={containerRef}
        className="w-full overflow-hidden bg-primary-600 py-4 border-y border-red-700/20 select-none relative z-10 flex items-center"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-mobile-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-mobile-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-mobile-left {
            display: flex;
            width: max-content;
            animation: marquee-mobile-left ${animationDuration}s linear infinite;
          }
          .animate-marquee-mobile-right {
            display: flex;
            width: max-content;
            animation: marquee-mobile-right ${animationDuration}s linear infinite;
          }
        ` }} />
        <div className={direction === "left" ? "animate-marquee-mobile-left" : "animate-marquee-mobile-right"}>
          {/* First block */}
          <div className="inline-flex items-center">
            {repeatedWords.map((word, idx) => (
              <span key={`w1-${idx}`} className="inline-flex items-center font-display">
                <span className="text-white select-none px-4 text-3xl sm:text-4xl font-black uppercase">{word}</span>
                <span className="text-white/50 select-none">•</span>
              </span>
            ))}
          </div>
          {/* Second identical block for seamless loop */}
          <div className="inline-flex items-center">
            {repeatedWords.map((word, idx) => (
              <span key={`w2-${idx}`} className="inline-flex items-center font-display">
                <span className="text-white select-none px-4 text-3xl sm:text-4xl font-black uppercase">{word}</span>
                <span className="text-white/50 select-none">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-primary-600 py-6 md:py-8 border-y border-red-700/20 select-none relative z-10 flex items-center"
    >
      <motion.div
        style={{ x }}
        className="whitespace-nowrap text-6xl md:text-[100px] font-black tracking-tighter uppercase flex items-center"
      >
        {repeatedWords.map((word, idx) => (
          <span key={`${word}-${idx}`} className="inline-flex items-center font-display">
            <span className="text-white select-none px-6">{word}</span>
            <span className="text-white/50 select-none">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
