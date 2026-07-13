"use client";

import React, { useRef, useState } from "react";
import { Cpu, Code, Server } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";

// ── Pillar definitions ────────────────────────────────────────────────────────
const PILLARS = [
  {
    number: "01",
    badgeKey: "aiotBadge",
    titleKey: "aiotTitle",
    descKey: "aiotDesc",
    href: "pillars/aiot-hardware",
    Icon: Cpu,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    imageAlt: "High-tech IoT and Security Systems",
    accentFrom: "from-primary-600/35",
  },
  {
    number: "02",
    badgeKey: "softwareBadge",
    titleKey: "softwareSub",
    descKey: "softwareDesc",
    href: "pillars/software",
    Icon: Code,
    image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    imageAlt: "Customer Support Wide Shot",
    accentFrom: "from-emerald-600/35",
  },
  {
    number: "03",
    badgeKey: "servicesBadge",
    titleKey: "servicesTitle",
    descKey: "servicesDesc",
    href: "pillars/services",
    Icon: Server,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    imageAlt: "Field Technician Working",
    accentFrom: "from-blue-600/35",
  },
];

// ── Individual Pillar Card Component ───────────────────────────────────────────
function PillarCard({
  pillar,
  locale,
  t,
  gridClass,
  delay = 0,
}: {
  pillar: (typeof PILLARS)[0];
  locale: string;
  t: (k: string) => string;
  gridClass: string;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={gridClass}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-col relative group cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(239,68,68,0.12)] hover:scale-[1.005] rounded-[2rem] border border-slate-200/40 z-10 h-full w-full"
      >
        {/* Mouse Spotlight Background */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-15"
            style={{
              background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(239, 68, 68, 0.08), transparent 85%)`,
            }}
          />
        )}

        {/* Full-card Graphic Background */}
        <img
          src={pillar.image}
          alt={pillar.imageAlt}
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[1200ms] z-0"
        />
        
        {/* Bottom-to-top rich dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/15 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-95" />
        <div className={`absolute inset-0 bg-gradient-to-tr ${pillar.accentFrom} to-transparent opacity-20 z-10 pointer-events-none`} />

        {/* Bottom Content Area */}
        <div className="p-8 sm:p-10 relative z-20 flex flex-col justify-end h-full w-full space-y-4">
          {/* Watermark Index Number in Top Right */}
          <span className="absolute right-8 bottom-32 text-[80px] font-black text-white/[0.03] select-none pointer-events-none font-display">
            {pillar.number}
          </span>

          {/* Eyebrow / Badge */}
          <div className="flex items-center gap-2 select-none">
            <span className="text-red-400 group-hover:scale-110 transition-transform duration-300">
              <pillar.Icon size={12} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 font-mono">
              {t(pillar.badgeKey)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase font-display tracking-tight group-hover:text-primary-400 transition-colors duration-300">
            {t(pillar.titleKey)}
          </h3>

          <p className="text-white text-sm leading-relaxed max-w-xl">
            {t(pillar.descKey)}
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            {/* Explore Button */}
            <Link
              href={`/${locale}/${pillar.href}`}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-lg shadow-primary-600/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{locale === "id" ? "Eksplorasi" : "Explore"}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>

            {/* Consultation Button */}
            <Link
              href={`/${locale}/contact`}
              className="bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 font-bold text-xs py-3 px-6 rounded-xl transition-all inline-flex items-center gap-1.5 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{locale === "id" ? "Konsultasi" : "Consultation"}</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Features() {
  const t = useTranslations("features");
  const locale = useLocale();

  return (
    <section
      id="solution"
      className="relative bg-white py-20 md:py-28 overflow-hidden border-b border-slate-100"
    >
      {/* Background Grid Pattern (Ichibot.id style - subtle light-red technical grid) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(239, 68, 68, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 select-none">
            <span className="w-2.5 h-2.5 bg-primary-500 rounded-[2px]" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
              {t("badge") || "Our Pillars"}
            </span>
          </div>
          <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-slate-900 leading-tight font-display uppercase">
            {t("title") || "Our Core Pillars"}
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-4xl">
            {t("subtitle") || "Supporting digital transformation through dynamic smart hardware, advanced software systems, and managed operations."}
          </p>
        </motion.div>

        {/* Asymmetric Bento Grid (Rapih Acak) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full relative z-10">
          {/* Card 01: AIoT (Wide, top-left) */}
          <PillarCard
            pillar={PILLARS[0]}
            locale={locale}
            t={t}
            gridClass="md:col-span-2 h-[380px] sm:h-[420px]"
            delay={0}
          />

          {/* Card 02: Software (Tall, right, spans 2 rows) */}
          <PillarCard
            pillar={PILLARS[1]}
            locale={locale}
            t={t}
            gridClass="md:col-span-1 md:row-span-2 h-[380px] sm:h-full min-h-[460px]"
            delay={0.15}
          />

          {/* Card 03: Services (Wide, bottom-left) */}
          <PillarCard
            pillar={PILLARS[2]}
            locale={locale}
            t={t}
            gridClass="md:col-span-2 h-[380px] sm:h-[420px]"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
