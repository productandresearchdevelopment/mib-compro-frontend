"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Telescope, Map, Pencil, Code2, HeadphonesIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

interface WorkflowStep {
  key: string;
  stepNumber: string;
  phase: { en: string; id: string };
  title: { en: string; id: string };
  desc: { en: string; id: string };
  image: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function WorkflowSection() {
  const locale = useLocale();

  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
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

  const steps: WorkflowStep[] = [
    {
      key: "discovery",
      stepNumber: "01",
      phase: { en: "Discovery", id: "Discovery" },
      title: { en: "Understanding Requirements", id: "Memahami Kebutuhan" },
      desc: {
        en: "We dive deep into your business pain points, map operational gaps, and document technical requirements to form a clear project scope.",
        id: "Kami menggali kebutuhan bisnis Anda, memetakan kesenjangan operasional, dan mendokumentasikan kebutuhan teknis untuk membentuk lingkup proyek yang jelas.",
      },
      image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      icon: Telescope,
    },
    {
      key: "planning",
      stepNumber: "02",
      phase: { en: "Planning", id: "Planning" },
      title: { en: "Survey & Planning", id: "Survei & Planning" },
      desc: {
        en: "Our engineers conduct on-site surveys to assess infrastructure, electrical capacity, and network topology, then craft a detailed deployment roadmap.",
        id: "Tim insinyur kami melakukan survei lapangan untuk menilai infrastruktur, kapasitas listrik, dan topologi jaringan, lalu menyusun peta jalan deployment yang detail.",
      },
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      icon: Map,
    },
    {
      key: "design",
      stepNumber: "03",
      phase: { en: "Design", id: "Design" },
      title: { en: "Solution Design", id: "Desain Solusi" },
      desc: {
        en: "We architect the full system — hardware topology, IoT sensor placement, platform integrations, and UI/UX workflows — before a single device is installed.",
        id: "Kami merancang sistem secara menyeluruh — topologi hardware, penempatan sensor IoT, integrasi platform, dan alur UI/UX — sebelum satu perangkat pun dipasang.",
      },
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      icon: Pencil,
    },
    {
      key: "deploy",
      stepNumber: "04",
      phase: { en: "Deploy", id: "Deploy" },
      title: { en: "Development & Testing", id: "Development & Testing" },
      desc: {
        en: "Certified MIB engineers carry out hardware installation, configure firmware, run stress tests, and commission the system in a controlled staging environment.",
        id: "Insinyur bersertifikat MIB melakukan instalasi hardware, konfigurasi firmware, uji stres, dan komisioning sistem di lingkungan staging sebelum go-live.",
      },
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      icon: Code2,
    },
    {
      key: "support",
      stepNumber: "05",
      phase: { en: "Support", id: "Support" },
      title: { en: "Go Live, Training & Support", id: "Go Live, Training & Dukungan" },
      desc: {
        en: "After handover, we train your internal team, provide full documentation, and deliver proactive 24/7 SLA support to keep systems running at peak performance.",
        id: "Setelah serah terima, kami melatih tim internal Anda, menyediakan dokumentasi lengkap, dan memberikan dukungan SLA 24/7 proaktif agar sistem berjalan optimal.",
      },
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      icon: HeadphonesIcon,
    },
  ];

  // Interactive helper to smooth-scroll page to targeted milestone
  const scrollToStep = (index: number) => {
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
      scrollToStep(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < steps.length - 1) {
      scrollToStep(activeIndex + 1);
    }
  };

  return (
    <section
      ref={setScrollContainer}
      id="workflow-timeline-section"
      className="relative h-[250vh] bg-[#0f172a]"
    >
      {/* Sticky container matching screen size */}
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center py-6 overflow-hidden">
        {/* Header Block aligned to margins */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-8 space-y-4 shrink-0 z-10">
          <div className="flex items-center gap-2 select-none">
            <span className="w-2.5 h-2.5 bg-primary-500 rounded-[2px]" />
            <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">
              {locale === "id" ? "Alur Proses Kerja" : "Process Workflow"}
            </span>
          </div>
          <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-white leading-tight">
            {locale === "id"
              ? "Alur Kerja & Proses Implementasi"
              : "Project Implementation Workflow"}
          </h2>
          <p className="text-white text-sm sm:text-base leading-relaxed max-w-3xl">
            {locale === "id"
              ? "Lima tahap terstandarisasi untuk menjamin kualitas integrasi dan performa SLA jangka panjang."
              : "Five standardized stages to guarantee integration quality and long-term SLA performance."}
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
            aria-label="Previous step"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === steps.length - 1}
            className={`pointer-events-auto w-12 h-12 rounded-full border border-slate-800 bg-slate-900/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary shadow-lg transition-all ${
              activeIndex === steps.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            aria-label="Next step"
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
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const stepTitle = step.title[locale as "en" | "id"];
            const stepDesc = step.desc[locale as "en" | "id"];
            const stepPhase = step.phase[locale as "en" | "id"];

            return (
              <div
                key={step.key}
                className="group w-[85vw] sm:w-[500px] md:w-[600px] lg:w-[680px] h-[360px] md:h-[400px] flex shrink-0 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl relative transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Left Half: Photography */}
                <div className="w-2/5 md:w-1/2 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-slate-900/70 z-10 pointer-events-none" />
                  <img
                    src={step.image}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500"
                    alt={stepTitle}
                  />
                </div>

                {/* Right Half: Details */}
                <div className="w-3/5 md:w-1/2 h-full flex flex-col justify-between p-6 md:p-8 text-white relative bg-slate-900/40">
                  {/* Step Number Header */}
                  <div className="flex justify-between items-start">
                    <div className="text-6xl sm:text-7xl md:text-8xl font-extralight text-primary-600 tracking-tighter leading-none select-none">
                      {step.stepNumber}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/80 group-hover:border-primary-500/50 group-hover:bg-primary-950/20 transition-all duration-300">
                      <StepIcon className="w-6 h-6 text-primary-500 group-hover:scale-110 transition-transform duration-350" />
                    </div>
                  </div>

                  {/* Info block */}
                  <div className="flex flex-col gap-2">
                    <div className="text-xs uppercase font-mono tracking-widest text-primary-500 font-semibold">
                      {stepPhase}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide leading-snug">
                      {stepTitle}
                    </h3>
                    <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mt-1">
                      {stepDesc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
              {steps.map((step, idx) => {
                const isActive = activeIndex === idx;
                const isPassed = activeIndex > idx;
                const stepPhase = step.phase[locale as "en" | "id"];

                return (
                  <button
                    key={step.key}
                    onClick={() => scrollToStep(idx)}
                    className="flex flex-col items-center cursor-pointer group focus:outline-none relative h-full w-24 pointer-events-auto"
                  >
                    {/* Phase text label */}
                    <span
                      className={`text-[10px] md:text-xs font-bold tracking-wider font-mono transition-all duration-300 absolute top-1 text-center whitespace-nowrap ${
                        isActive
                          ? "text-primary scale-105"
                          : isPassed
                          ? "text-primary/65 group-hover:text-primary/85"
                          : "text-slate-500 group-hover:text-slate-355"
                      }`}
                    >
                      <span className="md:hidden">{step.stepNumber}</span>
                      <span className="hidden md:inline">{step.stepNumber} - {stepPhase}</span>
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
