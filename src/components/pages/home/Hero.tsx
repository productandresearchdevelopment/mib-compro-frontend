"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
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

  // 5 panels — real people working in relevant field contexts
  const panels: PanelItem[] = [
    {
      id: "001",
      titleKey: "slide2_title", // Advanced AIoT & Intelligent Systems
      subtitleKey: "slide2_subtitle",
      bgImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
    {
      id: "002",
      titleKey: "slide_energy_title", // Energy & Utilities Smart Monitoring
      subtitleKey: "slide_energy_subtitle",
      bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
    {
      id: "003",
      titleKey: "slide3_title", // Smart Software & Enterprise Solutions
      subtitleKey: "slide3_subtitle",
      bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
    {
      id: "004",
      titleKey: "slide1_title", // Smart Field Operations & Logistics
      subtitleKey: "slide1_subtitle",
      bgImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
    {
      id: "005",
      titleKey: "slide4_title", // Comprehensive Managed Services & Support
      subtitleKey: "slide4_subtitle",
      bgImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    },
  ];

  // ─── Auto-slide timer: smooth cyclic slideshow ───
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % panels.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isLoaded, panels.length]);

  // ─── Word-by-word mask reveal (same as hero pattern) ───
  const splitTitleColorAndAnimate = (titleText: string, id: string) => {
    const words = titleText.split(" ");
    const half = Math.ceil(words.length / 2);

    const containerVariants: Variants = {
      hidden: {},
      visible: { transition: { staggerChildren: 0.06 } },
    };

    const itemVariants: Variants = {
      hidden: { y: "120%", rotate: 3 },
      visible: {
        y: 0,
        rotate: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      },
    };

    return (
      <motion.div
        key={id} // Force re-mount on slide change to trigger initial animations
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2"
      >
        <span className="overflow-hidden inline-block py-2 select-none mr-2 text-white/25 font-display font-bold text-2xl md:text-4xl">
          <motion.span variants={itemVariants} className="inline-block">
            /
          </motion.span>
        </span>
        {words.map((word, index) => (
          <span key={`word-${index}`} className="overflow-hidden inline-block py-1">
            <motion.span
              variants={itemVariants}
              className={`inline-block font-display font-black text-[26px] sm:text-4xl md:text-[62px] lg:text-[76px] tracking-[-1.5px] lg:tracking-[-2px] uppercase leading-[1.1] ${
                index < half ? "text-white" : "text-primary-500"
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
      className="relative bg-[#030712] w-full h-[100dvh] overflow-hidden"
    >
      <div className="w-full h-full flex items-center justify-center z-10 pt-12 relative">
        
        {/* Particle canvas (disabled on mobile inside component) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <InteractiveHeroBg />
          <div className="absolute inset-0 bg-[#030712]/30" />
        </motion.div>

        {/* Cinematic fading background images */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {panels.map((panel, idx) => (
            <motion.div
              key={`bg-${panel.id}`}
              style={{ backgroundImage: `url(${panel.bgImage})` }}
              animate={{
                opacity: activeIndex === idx ? 1 : 0,
                scale: activeIndex === idx ? 1.03 : 1.0,
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.2] brightness-[0.75]"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/20 to-[#030712]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/50 via-transparent to-[#030712]/50" />
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
                <div className="select-none text-center max-w-5xl mx-auto w-full -mt-12 lg:-mt-24">
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
                  className="lg:absolute lg:bottom-16 lg:left-8 max-w-[360px] text-center lg:text-left mt-4 lg:mt-0 px-4 lg:px-0"
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
                  className="lg:absolute lg:bottom-16 lg:right-16 flex flex-row items-center justify-center gap-3 w-full sm:w-auto mt-5 lg:mt-0 px-4 lg:px-0"
                >
                  <Button
                    asChild
                    className="group h-auto bg-primary-600 hover:bg-[#d61e1e] text-white px-4 py-2.5 lg:px-7 lg:py-3.5 rounded-[12px] text-sm lg:text-base font-semibold shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer flex-1 sm:flex-initial border border-transparent"
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
                    className="group h-auto border-white/20 hover:border-white text-white hover:text-white bg-transparent hover:bg-white/5 px-4 py-2.5 lg:px-7 lg:py-3.5 rounded-[12px] text-sm lg:text-base font-semibold transition-all duration-300 hover:scale-[1.03] cursor-pointer flex-1 sm:flex-initial"
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

        {/* Global slide dot navigator */}
        <div className="absolute bottom-10 lg:bottom-20 left-1/2 -translate-x-1/2 flex gap-2.5 z-40 select-none">
          {panels.map((p, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={`dot-${p.id}`}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? "w-6 bg-primary-600" : "w-1.5 bg-white/30 hover:bg-white/50"}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
