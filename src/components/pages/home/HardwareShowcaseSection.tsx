"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export default function HardwareShowcaseSection() {
  const tHardware = useTranslations("hardwareShowcase");
  const locale = useLocale();

  // State-based ref to avoid Framer Motion hydration warning
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Framer motion scroll configuration for the horizontal hardware showcase
  const { scrollYProgress } = useScroll({
    target: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start start", "end end"]
  });

  // Slide translation for horizontal scrolling cards (pixel-based mapping)
  const xTranslation = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  useEffect(() => {
    const calculateRange = () => {
      if (!trackRef.current) return;

      // Temporarily reset transform to get original bounding rect
      const originalTransform = trackRef.current.style.transform;
      trackRef.current.style.transform = "none";

      const rect = trackRef.current.getBoundingClientRect();
      const trackWidth = rect.width;
      const initialLeft = rect.left;
      const viewportWidth = window.innerWidth;

      // Restore transform
      trackRef.current.style.transform = originalTransform;

      if (trackWidth + initialLeft <= viewportWidth) {
        setScrollRange(0);
        return;
      }

      // We want the last card to align with the right edge of the max-w-7xl container,
      // which has a margin equivalent to initialLeft on both sides.
      // So target scroll range in pixels:
      const range = trackWidth + 2 * initialLeft - viewportWidth;
      setScrollRange(range > 0 ? range : 0);
    };

    calculateRange();

    // A tiny timeout to ensure browser layouts and Locale translations are fully populated
    const timer = setTimeout(calculateRange, 150);

    window.addEventListener("resize", calculateRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateRange);
    };
  }, []);

  const hardwareItems: ShowcaseItem[] = [
    {
      id: "padlock",
      title: tHardware("items.padlock.title"),
      description: tHardware("items.padlock.desc"),
      href: `/${locale}/product/padlock?hideBack=true`,
      image: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "soundbox",
      title: tHardware("items.soundbox.title"),
      description: tHardware("items.soundbox.desc"),
      href: `/${locale}/product/soundbox?hideBack=true`,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "edc",
      title: tHardware("items.edc.title"),
      description: tHardware("items.edc.desc"),
      href: `/${locale}/product/edc?hideBack=true`,
      image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "counter",
      title: tHardware("items.counter.title"),
      description: tHardware("items.counter.desc"),
      href: `/${locale}/product/mhu?hideBack=true`,
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "pos",
      title: tHardware("items.pos.title"),
      description: tHardware("items.pos.desc"),
      href: `/${locale}/product/pos?hideBack=true`,
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "cctv",
      title: tHardware("items.cctv.title"),
      description: tHardware("items.cctv.desc"),
      href: `/${locale}/product/cctv?hideBack=true`,
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "cash_deposit",
      title: tHardware("items.cash_deposit.title"),
      description: tHardware("items.cash_deposit.desc"),
      href: `/${locale}/product/cash-deposit?hideBack=true`,
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
  ];

  return (
    <section
      ref={setScrollContainer}
      id="hardware-showcase"
      className="relative h-[250vh] bg-white"
    >
      {/* h-[100dvh] container carefully configured to ensure zero clipping on laptop screens */}
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center py-6 overflow-hidden">
        {/* Header Block: aligned to match ServicesShowcase format exactly */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-10 space-y-5 shrink-0 z-10">
          {/* Badge at the top */}
          <div className="flex items-center gap-2 select-none">
            <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
              {tHardware("badge")}
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-slate-900 leading-tight">
            {tHardware("title")}
          </h2>
          
          {/* Subtitle */}
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-4xl">
            {tHardware("subtitle")}
          </p>
        </div>

        {/* Scrolling Panel Track - Perfectly proportioned and aligned to avoid cuts */}
        <motion.div
          ref={trackRef}
          style={{ x: xTranslation }}
          className="flex gap-8 px-6 md:px-0 md:ml-[calc(max(1.5rem,(100vw-80rem)/2+1.5rem))] w-[max-content]"
        >
          {hardwareItems.map((hardware) => (
            <Link
              key={hardware.id}
              href={hardware.href}
              className="w-[80vw] sm:w-[320px] md:w-[340px] lg:w-[360px] h-[480px] flex flex-col justify-end group shrink-0 rounded-3xl border border-slate-100 shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.01] cursor-pointer"
            >
              {/* Visual Area: crisp absolute background image */}
              <img
                src={hardware.image}
                alt={hardware.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay to ensure flawless white text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />

              {/* Details Area: rendered on top of absolute image overlay */}
              <div className="flex flex-col gap-3 p-6 md:p-8 z-20 text-white relative">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                  {hardware.title}
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed line-clamp-3 font-medium">
                  {hardware.description}
                </p>

                <div className="flex items-center gap-2 text-white font-bold transition-all text-sm w-fit mt-1 group-hover:gap-3.5">
                  {tHardware("viewMore")}
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
