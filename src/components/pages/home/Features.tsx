"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Code, Server } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

// ── Word-by-word mask reveal ──────────────────────────────────────────────────
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { y: "110%", rotate: 2 },
    visible: { y: 0, rotate: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-1 ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block pb-1">
          <motion.span variants={item} className="inline-block">{word}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// ── Pillar definitions ────────────────────────────────────────────────────────
const PILLARS = [
  {
    number: "01",
    badgeKey: "aiotBadge",
    titleKey: "aiotTitle",
    descKey: "aiotDesc",
    href: "pillars/aiot-hardware",
    Icon: Cpu,
    logo: { src: "/images/logo-protectcube.png", alt: "ProtectQube", width: 140, height: 48 },
    // Relevant: High-tech / IoT / Cybersecurity
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    imageAlt: "High-tech IoT and Security Systems",
    accentFrom: "from-primary-600/20",
  },
  {
    number: "02",
    badgeKey: "softwareBadge",
    titleKey: "softwareSub",
    descKey: "softwareDesc",
    href: "pillars/software",
    Icon: Code,
    logo: { src: "/images/logo-qifess.png", alt: "QIFESS", width: 140, height: 48 },
    // Relevant: Field technician working
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    imageAlt: "Field Technician Working",
    accentFrom: "from-blue-600/20",
  },
  {
    number: "03",
    badgeKey: "servicesBadge",
    titleKey: "servicesTitle",
    descKey: "servicesDesc",
    href: "pillars/services",
    Icon: Server,
    logo: null,
    // Relevant: Customer support / technical helpdesk (wide shot)
    image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    imageAlt: "Customer Support Wide Shot",
    accentFrom: "from-emerald-600/20",
  },
];

// ── Individual sticky pillar panel ───────────────────────────────────────────
function PillarPanel({
  pillar,
  scrollProgress,
  rangeIn,
  zIndex,
  locale,
  t,
}: {
  pillar: (typeof PILLARS)[0];
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  rangeIn: [number, number];
  zIndex: number;
  locale: string;
  t: (k: string) => string;
}) {
  const y = useTransform(scrollProgress, rangeIn, ["100%", "0%"]);
  const opacity = useTransform(scrollProgress, rangeIn, [0, 1]);
  const imgScale = useTransform(scrollProgress, rangeIn, [1.08, 1]);

  return (
    <div className="sticky top-0 h-screen w-full" style={{ zIndex }}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-[#030712] flex flex-col lg:flex-row overflow-hidden"
      >
        {/* ── Left: Content ─────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 relative overflow-hidden">
          {/* Watermark number */}
          <span className="absolute -right-6 bottom-6 text-[220px] font-black text-white/[0.025] leading-none select-none pointer-events-none font-display">
            {pillar.number}
          </span>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-primary-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-500 font-mono flex items-center gap-2">
              <pillar.Icon size={11} />
              {t(pillar.badgeKey)}
            </span>
          </motion.div>

          {/* Large dim number */}
          <div className="text-8xl md:text-[110px] font-black text-primary-500/10 font-display leading-none mb-3 select-none">
            {pillar.number}
          </div>

          {/* Logo */}
          <div className="h-9 flex items-center mb-5">
            {pillar.logo ? (
              <Image src={pillar.logo.src} alt={pillar.logo.alt} width={pillar.logo.width} height={pillar.logo.height} className="object-contain max-h-8 brightness-0 invert opacity-70" />
            ) : (
              <div className="flex items-center gap-2">
                <Server size={16} className="text-primary-500" />
                <span className="text-white font-bold text-sm font-display tracking-tight">services</span>
              </div>
            )}
          </div>

          {/* Title — word-by-word */}
          <h3 className="text-3xl md:text-4xl xl:text-[52px] font-black leading-[1.1] mb-5 font-display uppercase tracking-tight">
            <WordReveal text={t(pillar.titleKey)} className="text-white" />
          </h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm mb-8"
          >
            {t(pillar.descKey)}
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            <Link
              href={`/${locale}/${pillar.href}`}
              className="group inline-flex items-center gap-2 text-white/50 hover:text-primary-400 text-sm font-semibold transition-colors duration-300"
            >
              <span>Explore Pillar</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Right: Real image ──────────────────────────────────────────── */}
        <div className="hidden lg:block lg:w-[48%] xl:w-[50%] relative overflow-hidden border-l border-white/8 shrink-0">
          <motion.div
            style={{ scale: imgScale }}
            className="absolute inset-0"
          >
            <img
              src={pillar.image}
              alt={pillar.imageAlt}
              className="w-full h-full object-cover grayscale-[30%] brightness-[0.7] contrast-[1.1]"
            />
          </motion.div>
          {/* Overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${pillar.accentFrom} to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-[#030712]/20" />
          {/* Bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary-500/60 via-primary-500/20 to-transparent" />
        </div>

        {/* Top separator line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Features() {
  const t = useTranslations("features");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Heading fades out as scroll begins
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  const panelRanges: [number, number][] = [
    [0, 0],       // Pillar 01: always visible from start
    [0.2, 0.42],  // Pillar 02: slides in at ~20% scroll
    [0.55, 0.75], // Pillar 03: slides in at ~55% scroll
  ];

  return (
    // overflow: clip is crucial — allows sticky children to work while preventing
    // content from painting outside section bounds (unlike overflow: hidden which breaks sticky)
    <section
      id="solution"
      ref={containerRef}
      className="relative bg-[#030712] h-[300vh]"
      style={{ overflow: "clip" }}
    >
      {/* Floating scroll hint label */}
      <motion.div
        style={{ opacity: headingOpacity, y: headingY }}
        className="absolute top-10 left-0 right-0 z-50 pointer-events-none flex justify-center"
      >
        <div className="flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="h-px w-8 bg-primary-500" />
          <span className="text-primary-500 text-xs font-bold uppercase tracking-[0.25em] font-mono">
            Our Core Pillars — Scroll to Explore
          </span>
          <div className="h-px w-8 bg-primary-500" />
        </div>
      </motion.div>

      {/* Stacked sticky panels */}
      {PILLARS.map((pillar, i) => (
        <PillarPanel
          key={pillar.number}
          pillar={pillar}
          scrollProgress={scrollYProgress}
          rangeIn={panelRanges[i]}
          zIndex={10 + i * 10}
          locale={locale}
          t={t}
        />
      ))}
    </section>
  );
}
