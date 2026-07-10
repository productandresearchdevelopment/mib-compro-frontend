"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import InteractiveHeroBg from "@/components/effects/InteractiveHeroBg";

interface PanelItem {
  id: string;
  titleKey: string;
  subtitleKey: string;
  bgImage: string;
}

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const tHero = useTranslations("hero");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 5 panels — real people working in relevant field contexts
  const panels: PanelItem[] = [
    {
      id: "001",
      titleKey: "slide2_title", // Advanced AIoT & Intelligent Systems
      subtitleKey: "slide2_subtitle",
      // Engineers monitoring security screens in a control room
      bgImage:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
    {
      id: "002",
      titleKey: "slide_energy_title", // Energy & Utilities Smart Monitoring
      subtitleKey: "slide_energy_subtitle",
      // Worker inspecting electrical infrastructure / power lines
      bgImage:
        "https://images.unsplash.com/photo-1548613053-22087dd8edb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
    {
      id: "003",
      titleKey: "slide3_title", // Smart Software & Enterprise Solutions
      subtitleKey: "slide3_subtitle",
      // Team of developers collaborating at computers in modern office
      bgImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
    {
      id: "004",
      titleKey: "slide1_title", // Smart Field Operations & Logistics
      subtitleKey: "slide1_subtitle",
      // Technician with tablet doing field inspection / maintenance
      bgImage:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
    {
      id: "005",
      titleKey: "slide4_title", // Comprehensive Managed Services & Support
      subtitleKey: "slide4_subtitle",
      // Operations team working together in NOC / service center
      bgImage:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Each panel occupies 0.80/5 = 0.16 of scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest / 0.16), 4);
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  // ─── Auto-slide timer: loops 1→2→3→4→5→1 ───
  useEffect(() => {
    if (!isLoaded) return;

    const timer = setInterval(() => {
      const currentScroll = window.scrollY;
      const heroEnd = 4.5 * window.innerHeight;

      // Only auto-slide while hero is in view and user is not hovering
      if (currentScroll > heroEnd || isHovered) return;

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;

      const nextIdx = (activeIndex + 1) % 5;
      // Loop back: when at last slide, scroll back to slide 1
      const scrollTarget = containerTop + window.innerHeight * nextIdx;
      window.scrollTo({ top: scrollTarget, behavior: "smooth" });
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex, isHovered, isLoaded]);

  // ─── Per-panel background opacity & scale (5 panels) ───
  const bgOpacity = [
    useTransform(scrollYProgress, [0, 0.12, 0.14, 0.16], [1, 1, 0, 0]),
    useTransform(scrollYProgress, [0.14, 0.16, 0.28, 0.30, 0.32], [0, 1, 1, 0, 0]),
    useTransform(scrollYProgress, [0.30, 0.32, 0.44, 0.46, 0.48], [0, 1, 1, 0, 0]),
    useTransform(scrollYProgress, [0.46, 0.48, 0.60, 0.62, 0.64], [0, 1, 1, 0, 0]),
    useTransform(scrollYProgress, [0.62, 0.64, 0.80], [0, 1, 1]),
  ];

  const bgScale = [
    useTransform(scrollYProgress, [0, 0.16], [1.02, 1.07]),
    useTransform(scrollYProgress, [0.16, 0.32], [1.02, 1.07]),
    useTransform(scrollYProgress, [0.32, 0.48], [1.02, 1.07]),
    useTransform(scrollYProgress, [0.48, 0.64], [1.02, 1.07]),
    useTransform(scrollYProgress, [0.64, 0.80], [1.02, 1.07]),
  ];

  const bgY = useTransform(scrollYProgress, [0, 0.80], ["-5%", "5%"]);

  // ─── Word-by-word mask reveal (same as hero pattern) ───
  const splitTitleColorAndAnimate = (titleText: string, id: string) => {
    const words = titleText.split(" ");
    const half = Math.ceil(words.length / 2);

    const containerVariants = {
      hidden: {},
      visible: { transition: { staggerChildren: 0.06 } },
      exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 as const } },
    };

    const itemVariants = {
      hidden: { y: "115%", rotate: 2 },
      visible: {
        y: 0,
        rotate: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      },
      exit: {
        y: "-115%",
        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
      },
    };

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2"
      >
        <span className="overflow-hidden inline-block py-2 select-none mr-1">
          <motion.span
            variants={itemVariants}
            className="inline-block font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary-500 tracking-wider"
          >
            {id}
          </motion.span>
        </span>
        <span className="overflow-hidden inline-block py-2 select-none mr-2 text-white/25 font-display font-bold text-2xl md:text-4xl">
          <motion.span variants={itemVariants} className="inline-block">/</motion.span>
        </span>
        {words.map((word, index) => (
          <span key={`word-${index}`} className="overflow-hidden inline-block py-2">
            <motion.span
              variants={itemVariants}
              className={`inline-block font-display font-black text-4xl sm:text-5xl md:text-[62px] lg:text-[76px] tracking-[-2px] uppercase leading-none ${
                index >= half ? "text-primary-500" : "text-white"
              }`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.div>
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[500vh] bg-[#030712] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-10 pt-12">

        {/* Particle canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <InteractiveHeroBg />
          <div className="absolute inset-0 bg-[#030712]/25" />
        </motion.div>

        {/* Parallax background images */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {panels.map((panel, idx) => (
            <motion.div
              key={`bg-${panel.id}`}
              style={{
                backgroundImage: `url(${panel.bgImage})`,
                opacity: bgOpacity[idx],
                scale: bgScale[idx],
                y: bgY,
              }}
              className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.2] brightness-[0.75]"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/85 via-[#030712]/10 to-[#030712]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/40 via-transparent to-[#030712]/40" />
        </div>

        {/* Panel content */}
        <div className="relative max-w-7xl mx-auto px-6 w-full h-full flex flex-col items-center justify-center z-20">
          <AnimatePresence mode="wait">
            {isLoaded && (
              <motion.div
                key={activeIndex}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full h-full flex flex-col items-center justify-center"
              >
                {/* Centered title */}
                <div className="select-none -mt-24 text-center max-w-5xl mx-auto w-full">
                  {splitTitleColorAndAnimate(
                    tHero(panels[activeIndex].titleKey),
                    panels[activeIndex].id
                  )}
                </div>

                {/* Bottom-left description */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
                  }}
                  className="lg:absolute lg:bottom-16 lg:left-8 max-w-[360px] text-center lg:text-left mt-6 lg:mt-0 px-4 lg:px-0"
                >
                  <p className="text-slate-400 text-xs md:text-[13px] leading-relaxed font-sans font-semibold uppercase tracking-widest">
                    {tHero(panels[activeIndex].subtitleKey)}
                  </p>
                </motion.div>

                {/* Bottom-right CTAs */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
                  }}
                  className="lg:absolute lg:bottom-16 lg:right-16 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-8 lg:mt-0 px-6 lg:px-0"
                >
                  <Button
                    asChild
                    className="group h-auto bg-primary-600 hover:bg-[#d61e1e] text-white px-7 py-3.5 rounded-[12px] text-base font-semibold shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto border border-transparent"
                  >
                    <Link href={`/${locale}/solution`} className="flex items-center justify-center gap-2">
                      {tHero("exploreSolutions")}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                      </svg>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="group h-auto border-white/20 hover:border-white text-white hover:text-white bg-transparent hover:bg-white/5 px-7 py-3.5 rounded-[12px] text-base font-semibold transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto"
                  >
                    <Link href={`/${locale}/product`} className="flex items-center justify-center gap-2">
                      {tHero("viewProduct")}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                      </svg>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated scroll-down mouse indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onClick={() => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const containerTop = rect.top + window.scrollY;
            window.scrollTo({ top: containerTop + window.innerHeight * 5, behavior: "smooth" });
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer select-none group"
        >
          <div className="w-6 h-10 border-2 border-white/25 group-hover:border-white/50 rounded-full flex justify-center pt-2 transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-primary-500 rounded-full"
            />
          </div>
          <span className="text-[10px] text-white/30 group-hover:text-white/50 tracking-[0.2em] font-mono uppercase mt-2 transition-colors duration-300">
            Scroll
          </span>
        </motion.div>

        {/* Side panel dot navigator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 hidden md:flex select-none">
          {panels.map((p, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={p.id}
                className="flex items-center gap-3 justify-end group cursor-pointer"
                onClick={() => {
                  if (!containerRef.current) return;
                  const rect = containerRef.current.getBoundingClientRect();
                  const containerTop = rect.top + window.scrollY;
                  window.scrollTo({ top: containerTop + window.innerHeight * idx, behavior: "smooth" });
                }}
              >
                <span className={`text-xs font-mono tracking-wider transition-colors duration-300 ${isActive ? "text-primary-500 font-bold" : "text-white/35 group-hover:text-white/70"}`}>
                  {p.id}
                </span>
                <div className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? "w-8 bg-primary-600" : "w-2 bg-white/20 group-hover:bg-white/40"}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
