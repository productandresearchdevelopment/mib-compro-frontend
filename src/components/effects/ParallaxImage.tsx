"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number; // Speed offset in pixels (e.g. 50px of extra displacement)
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  speed = 40,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position relative to the container element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate the y translation.
  // When container is at bottom of viewport (scrollYProgress = 0) -> offset y by -speed.
  // When container is at top of viewport (scrollYProgress = 1) -> offset y by +speed.
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          height: `calc(100% + ${Math.abs(speed) * 2}px)`,
          top: `${-Math.abs(speed)}px`,
        }}
        className={`absolute w-full left-0 object-cover ${imgClassName}`}
      />
    </div>
  );
}
