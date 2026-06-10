"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

export interface MilestoneItem {
  key: string;
  year: string;
  image: string;
}

export default function MilestonesSection() {
  const t = useTranslations("milestones");
  const locale = useLocale();

  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
    null,
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll tracking container hook
  const { scrollYProgress } = useScroll({
    target: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start start", "end end"],
  });

  // Map vertical page scroll [0, 1] to horizontal translation [0, -scrollRange]
  const xTranslation = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Sync scroll progress with active milestone dot highlight
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const index = Math.min(Math.round(latest * 4), 4);
      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const calculateRange = () => {
      if (!trackRef.current) return;

      // Temporarily reset transformation for accurate layout size measurement
      const originalTransform = trackRef.current.style.transform;
      trackRef.current.style.transform = "none";

      const rect = trackRef.current.getBoundingClientRect();
      const trackWidth = rect.width;
      const initialLeft = rect.left || 24; // fallback to px-6 padding default if 0
      const viewportWidth = window.innerWidth;

      // Restore transformation
      trackRef.current.style.transform = originalTransform;

      if (trackWidth + initialLeft <= viewportWidth) {
        setScrollRange(0);
        return;
      }

      // Range maps the track's width offset so the last card aligns with the screen edge
      const range = trackWidth + 2 * initialLeft - viewportWidth;
      setScrollRange(range > 0 ? range : 0);
    };

    calculateRange();

    // Small delay to ensure browser layout is painted and resources are loaded
    const timer = setTimeout(calculateRange, 200);

    window.addEventListener("resize", calculateRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateRange);
    };
  }, []);

  const milestones: MilestoneItem[] = [
    {
      key: "founding",
      year: "2016",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
    {
      key: "hardware",
      year: "2018",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
    {
      key: "qifess",
      year: "2020",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
    {
      key: "protectqube",
      year: "2022",
      image:
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
    {
      key: "scale",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
  ];

  // Interactive helper to smooth-scroll page to targeted milestone
  const scrollToMilestone = (index: number) => {
    if (!scrollContainer) return;
    const containerTop = scrollContainer.offsetTop;
    const containerHeight = scrollContainer.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Segment positions corresponding to progress ticks
    const scrollPos =
      containerTop + (index / 4) * (containerHeight - viewportHeight);
    window.scrollTo({
      top: scrollPos,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToMilestone(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < milestones.length - 1) {
      scrollToMilestone(activeIndex + 1);
    }
  };

  return (
    <section
      ref={setScrollContainer}
      id="milestones-section"
      className="relative h-[250vh] bg-[#0f172a]"
    >
      {/* Sticky container matching screen size */}
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center py-6 overflow-hidden">
        {/* Header Block aligned to margins */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-8 space-y-4 shrink-0 z-10">
          {/* <div className="flex items-center gap-2 select-none">
            <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
            <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">
              {t("badge")}
            </span>
          </div> */}
          <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-white leading-tight">
            {t("title")}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Arrows overlay for navigation */}
        <div className="absolute left-6 right-6 top-[60%] -translate-y-1/2 flex justify-between pointer-events-none z-20">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`pointer-events-auto w-12 h-12 rounded-full border border-slate-800 bg-slate-900/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary shadow-lg transition-all ${
              activeIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            aria-label="Previous milestone"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === milestones.length - 1}
            className={`pointer-events-auto w-12 h-12 rounded-full border border-slate-800 bg-slate-900/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary shadow-lg transition-all ${
              activeIndex === milestones.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            aria-label="Next milestone"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Card Sliders Track */}
        <motion.div
          ref={trackRef}
          style={{ x: xTranslation }}
          className="flex gap-8 px-6 md:px-0 md:ml-[calc(max(1.5rem,(100vw-80rem)/2+1.5rem))] w-[max-content]"
        >
          {milestones.map((milestone) => (
            <div
              key={milestone.key}
              className="group w-[85vw] sm:w-[500px] md:w-[600px] lg:w-[680px] h-[360px] md:h-[400px] flex shrink-0 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl relative transition-all duration-300 hover:scale-[1.01]"
            >
              {/* Left Half: Photography */}
              <div className="w-2/5 md:w-1/2 h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-slate-900/70 z-10 pointer-events-none" />
                <img
                  src={milestone.image}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500"
                  alt={t(`items.${milestone.key}.title`)}
                />
              </div>

              {/* Right Half: Details */}
              <div className="w-3/5 md:w-1/2 h-full flex flex-col justify-between p-6 md:p-8 text-white relative bg-slate-900/40">
                {/* Year Header */}
                <div className="text-6xl sm:text-7xl md:text-8xl font-extralight text-primary-600 tracking-tighter leading-none select-none">
                  {milestone.year}
                </div>

                {/* Info block */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide leading-snug">
                    {t(`items.${milestone.key}.title` as any)}
                  </h3>
                  <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mt-1">
                    {t(`items.${milestone.key}.desc` as any)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Static Bottom Progress Axis Timeline (Horizontal Progress Bar) */}
        <div className="max-w-7xl mx-auto px-6 w-full mt-12 shrink-0 z-10 relative pointer-events-auto">
          <div className="relative h-14">
            {/* Timeline Base Line (spanning infinitely to viewport edges) */}
            <div className="absolute h-[1.5px] bg-slate-800 pointer-events-none left-[-100vw] right-[-100vw] bottom-[15px]" />

            {/* Timeline Progress Line (starts at first dot center, ends at last dot center, scales with scroll) */}
            <div className="absolute left-8 right-8 h-[1.5px] pointer-events-none bottom-[15px]">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                className="w-full h-full bg-primary"
              />
            </div>

            {/* Timeline Markers */}
            <div className="absolute inset-0 flex justify-between items-center">
              {milestones.map((milestone, idx) => {
                const isActive = activeIndex === idx;
                const isPassed = activeIndex > idx;

                return (
                  <button
                    key={milestone.key}
                    onClick={() => scrollToMilestone(idx)}
                    className="flex flex-col items-center cursor-pointer group focus:outline-none relative h-full w-16 pointer-events-auto"
                  >
                    {/* Year text label */}
                    <span
                      className={`text-xs md:text-sm font-bold tracking-wider font-mono transition-all duration-300 absolute top-1 ${
                        isActive
                          ? "text-primary scale-110"
                          : isPassed
                          ? "text-primary/60 group-hover:text-primary/80"
                          : "text-slate-500 group-hover:text-slate-350"
                      }`}
                    >
                      {milestone.year}
                    </span>

                    {/* Highlight Circle Indicator */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 z-10 absolute bottom-[8px] ${
                        isActive
                          ? "bg-primary border-primary scale-125 shadow-[0_0_12px_rgba(242,41,41,0.5)]"
                          : isPassed
                          ? "bg-primary-400 border-primary/50"
                          : "bg-[#0f172a] border-slate-700 group-hover:border-primary"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
