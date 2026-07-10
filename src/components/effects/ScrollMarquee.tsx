"use client";

import React, { useRef } from "react";
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

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-[#030712] py-6 md:py-8 border-y border-white/5 select-none relative z-10 flex items-center"
    >
      <motion.div
        style={{ x }}
        className="whitespace-nowrap text-6xl md:text-[100px] font-black tracking-tighter uppercase flex items-center"
      >
        {repeatedWords.map((word, idx) => (
          <span key={`${word}-${idx}`} className="inline-flex items-center font-display">
            <span className="text-white select-none px-6">{word}</span>
            <span className="text-primary-500 select-none">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
