"use client";

import React, { useRef } from "react";
import { useLocale } from "next-intl";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import {
  Telescope,
  Map,
  Pencil,
  Code2,
  HeadphonesIcon,
} from "lucide-react";

interface Step {
  id: number;
  phase: { en: string; id: string };
  title: { en: string; id: string };
  desc: { en: string; id: string };
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const STEPS: Step[] = [
  {
    id: 1,
    phase: { en: "Discovery", id: "Discovery" },
    title: { en: "Understanding Requirements", id: "Memahami Kebutuhan" },
    desc: {
      en: "We dive deep into your business pain points, map operational gaps, and document technical requirements to form a clear project scope.",
      id: "Kami menggali kebutuhan bisnis Anda, memetakan kesenjangan operasional, dan mendokumentasikan kebutuhan teknis untuk membentuk lingkup proyek yang jelas.",
    },
    icon: Telescope,
  },
  {
    id: 2,
    phase: { en: "Planning", id: "Planning" },
    title: { en: "Survey & Planning", id: "Survei & Planning" },
    desc: {
      en: "Our engineers conduct on-site surveys to assess infrastructure, electrical capacity, and network topology, then craft a detailed deployment roadmap.",
      id: "Tim insinyur kami melakukan survei lapangan untuk menilai infrastruktur, kapasitas listrik, dan topologi jaringan, lalu menyusun peta jalan deployment yang detail.",
    },
    icon: Map,
  },
  {
    id: 3,
    phase: { en: "Design", id: "Design" },
    title: { en: "Solution Design", id: "Desain Solusi" },
    desc: {
      en: "We architect the full system — hardware topology, IoT sensor placement, platform integrations, and UI/UX workflows — before a single device is installed.",
      id: "Kami merancang sistem secara menyeluruh — topologi hardware, penempatan sensor IoT, integrasi platform, dan alur UI/UX — sebelum satu perangkat pun dipasang.",
    },
    icon: Pencil,
  },
  {
    id: 4,
    phase: { en: "Deploy", id: "Deploy" },
    title: { en: "Development & Testing", id: "Development & Testing" },
    desc: {
      en: "Certified MIB engineers carry out hardware installation, configure firmware, run stress tests, and commission the system in a controlled staging environment.",
      id: "Insinyur bersertifikat MIB melakukan instalasi hardware, konfigurasi firmware, uji stres, dan komisioning sistem di lingkungan staging sebelum go-live.",
    },
    icon: Code2,
  },
  {
    id: 5,
    phase: { en: "Support", id: "Support" },
    title: { en: "Go Live, Training & Support", id: "Go Live, Training & Dukungan" },
    desc: {
      en: "After handover, we train your internal team, provide full documentation, and deliver proactive 24/7 SLA support to keep systems running at peak performance.",
      id: "Setelah serah terima, kami melatih tim internal Anda, menyediakan dokumentasi lengkap, dan memberikan dukungan SLA 24/7 proaktif agar sistem berjalan optimal.",
    },
    icon: HeadphonesIcon,
  },
];

// SVG straight vertical line down the center
const verticalPath = "M 50 0 L 50 1000";

// Each card's reveal threshold as fraction of scroll (0→1)
// 5 steps evenly placed: 0.1, 0.3, 0.5, 0.7, 0.9
const THRESHOLDS = [0.08, 0.26, 0.46, 0.66, 0.86];

export default function ProjectExecutionSection() {
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Scroll progress linked to the timeline section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  // Smooth spring for the line fill
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section
      id="alur-kerja"
      className="relative bg-white py-20 md:py-28 overflow-hidden border-b border-slate-100"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(239,68,68,0.05) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="flex items-center justify-center gap-2 select-none">
            <span className="w-2.5 h-2.5 bg-primary-500 rounded-[2px]" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
              {locale === "id" ? "Alur Proses Kerja" : "Process Workflow"}
            </span>
          </div>
          <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-slate-900 leading-tight font-display uppercase">
            {locale === "id"
              ? "Alur Kerja & Proses Implementasi"
              : "Project Implementation Workflow"}
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            {locale === "id"
              ? "Lima tahap terstandarisasi untuk menjamin kualitas integrasi dan performa SLA jangka panjang."
              : "Five standardized stages to guarantee integration quality and long-term SLA performance."}
          </p>
        </div>

        {/* Timeline */}
        <div ref={sectionRef} className="relative">

          {/* SVG scroll-linked vertical line */}
          <svg
            ref={svgRef}
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0"
            aria-hidden
          >
            {/* Grey track */}
            <path
              d={verticalPath}
              fill="none"
              stroke="rgba(203,213,225,0.45)"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
            {/* Glow fill — scroll-linked */}
            <motion.path
              d={verticalPath}
              fill="none"
              stroke="rgba(239,68,68,0.12)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength: lineProgress }}
            />
            {/* Main red fill — scroll-linked */}
            <motion.path
              d={verticalPath}
              fill="none"
              stroke="rgba(220,38,38,0.7)"
              strokeWidth="0.8"
              strokeLinecap="round"
              style={{ pathLength: lineProgress }}
            />
          </svg>

          {/* Steps */}
          <div className="flex flex-col">
            {STEPS.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              const title = step.title[locale as "en" | "id"];
              const desc = step.desc[locale as "en" | "id"];
              const phase = step.phase[locale as "en" | "id"];
              const StepIcon = step.icon;
              const threshold = THRESHOLDS[idx];

              return (
                <div
                  key={step.id}
                  className="relative flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-0 py-8 md:py-0 md:h-[200px]"
                >
                  {/* LEFT SLOT */}
                  <div className="w-full md:w-[42%] flex items-center md:py-8 md:justify-end md:pr-8">
                    {isLeft ? (
                      <ScrollLinkedCard
                        scrollYProgress={scrollYProgress}
                        threshold={threshold}
                        direction="left"
                        phase={phase}
                        stepId={step.id}
                        title={title}
                        desc={desc}
                        StepIcon={StepIcon}
                      />
                    ) : (
                      <div className="hidden md:block w-full" />
                    )}
                  </div>

                  {/* CENTER connector dot */}
                  <div className="hidden md:flex md:w-[16%] items-center justify-center z-10">
                    <ScrollLinkedDot
                      scrollYProgress={scrollYProgress}
                      threshold={threshold}
                    />
                  </div>

                  {/* RIGHT SLOT */}
                  <div className="w-full md:w-[42%] flex items-center md:py-8 md:justify-start md:pl-8">
                    {!isLeft ? (
                      <ScrollLinkedCard
                        scrollYProgress={scrollYProgress}
                        threshold={threshold}
                        direction="right"
                        phase={phase}
                        stepId={step.id}
                        title={title}
                        desc={desc}
                        StepIcon={StepIcon}
                      />
                    ) : (
                      <div className="hidden md:block w-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Scroll-linked card ─────────────────────────────── */
function ScrollLinkedCard({
  scrollYProgress,
  threshold,
  direction,
  phase,
  stepId,
  title,
  desc,
  StepIcon,
}: {
  scrollYProgress: MotionValue<number>;
  threshold: number;
  direction: "left" | "right";
  phase: string;
  stepId: number;
  title: string;
  desc: string;
  StepIcon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const fadeStart = threshold - 0.06;
  const fadeEnd   = threshold + 0.06;
  const xFrom = direction === "left" ? -24 : 24;

  const opacity = useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, 1]);
  const x       = useTransform(scrollYProgress, [fadeStart, fadeEnd], [xFrom, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-primary-600 border border-primary-500 hover:bg-primary-700 rounded-2xl p-6 w-full cursor-default transition-colors duration-300"
    >
      {/* Icon + phase */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0">
          <StepIcon size={16} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold tracking-widest text-primary-200">
            {String(stepId).padStart(2, "0")}
          </span>
          <span className="h-px w-4 shrink-0 bg-white/30" />
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-white/75">
            {phase}
          </span>
        </div>
      </div>

      <h3 className="font-extrabold text-base md:text-lg tracking-tight font-display mb-2 text-white">
        {title}
      </h3>
      <p className="text-xs md:text-sm leading-relaxed text-white/75">{desc}</p>
    </motion.div>
  );
}

/* ─── Scroll-linked connector dot ────────────────────── */
function ScrollLinkedDot({
  scrollYProgress,
  threshold,
}: {
  scrollYProgress: MotionValue<number>;
  threshold: number;
}) {
  const scale   = useTransform(scrollYProgress, [threshold - 0.04, threshold + 0.04], [0.3, 1]);
  const opacity = useTransform(scrollYProgress, [threshold - 0.04, threshold + 0.04], [0, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="w-3.5 h-3.5 rounded-full bg-primary-600 border-2 border-primary-400 shadow-sm"
    />
  );
}
