"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Warehouse as WarehouseIcon, Wrench, Monitor, MapPin } from "lucide-react";
import { INDONESIA_PROVINCES } from "@/data/indonesiaPaths";

interface Marker {
  city: string;
  x: number;
  y: number;
}

const MARKERS: Marker[] = [
  { city: "Medan", x: 65, y: 75 },
  { city: "Pekanbaru", x: 115, y: 120 },
  { city: "Palembang", x: 155, y: 185 },
  { city: "Jakarta", x: 190, y: 235 },
  { city: "Bandung", x: 210, y: 242 },
  { city: "Semarang", x: 255, y: 246 },
  { city: "Surabaya", x: 300, y: 250 },
  { city: "Denpasar", x: 345, y: 272 },
  { city: "Pontianak", x: 250, y: 140 },
  { city: "Balikpapan", x: 345, y: 155 },
  { city: "Makassar", x: 422, y: 212 },
  { city: "Manado", x: 480, y: 105 },
  { city: "Ambon", x: 540, y: 210 },
  { city: "Sorong", x: 590, y: 155 },
  { city: "Jayapura", x: 750, y: 165 },
];

export default function CoverageSection() {
  const t = useTranslations("coverage");
  const locale = useLocale();

  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 12,
    });
  };

  const stats = [
    {
      key: "warehouse",
      value: "36+",
      icon: WarehouseIcon,
    },
    {
      key: "fieldEngineer",
      value: "500+",
      icon: Wrench,
    },
    {
      key: "repairCenter",
      value: "10+",
      icon: Monitor,
    },
    {
      key: "servicePoints",
      value: "188+",
      icon: MapPin,
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* Header Block */}
        <div className="max-w-7xl mx-auto w-full mb-10 space-y-5 shrink-0 z-10">
          {/* Badge at the top */}
          <div className="flex items-center gap-2 select-none">
            <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
              {t("badge")}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-slate-900 leading-tight">
            {t("title")}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-4xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Stack 1: Full-Width Interactive Map (Bare, aligned to max-w-7xl) */}
        <div className="relative w-full">
          <div
            className="relative w-full aspect-[793/288] select-none cursor-default"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredProvince(null)}
          >
            {/* SVG Map of Indonesia */}
            <svg
              viewBox="0 29 793 288"
              className="w-full h-full text-slate-200 dark:text-slate-700 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.015)]"
              aria-label="Map of Indonesia"
            >
              {INDONESIA_PROVINCES.map((prov) => (
                <path
                  key={prov.id}
                  id={prov.id}
                  name={prov.name}
                  d={prov.d}
                  className="fill-slate-200 dark:fill-slate-700 stroke-white dark:stroke-slate-900 stroke-[0.4] transition-colors duration-200 cursor-pointer hover:fill-red-500/15 dark:hover:fill-red-500/15"
                  onMouseEnter={() => setHoveredProvince(prov.name)}
                />
              ))}
            </svg>

            {/* Pulsing City Markers */}
            {MARKERS.map((marker, idx) => (
              <div
                key={idx}
                className="absolute group z-20 cursor-pointer"
                style={{
                  left: `${(marker.x / 793) * 100}%`,
                  top: `${((marker.y - 29) / 288) * 100}%`,
                }}
              >
                {/* Outer Ring Animation */}
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-primary/30 rounded-full animate-ping" />
                {/* Inner Glow Ring */}
                <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-primary/20 rounded-full" />
                {/* Core Dot */}
                <div className="absolute -left-1 -top-1 w-2 h-2 bg-primary rounded-full border border-white shadow-sm" />

                {/* City Marker Tooltip */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30 border border-slate-800">
                  {marker.city}
                </div>
              </div>
            ))}

            {/* Province Interactive Hover Tooltip */}
            <AnimatePresence>
              {hoveredProvince && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="absolute z-10 pointer-events-none bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg whitespace-nowrap text-xs font-bold text-[#100420] dark:text-white"
                  style={{
                    left: tooltipPos.x,
                    top: tooltipPos.y,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  {hoveredProvince}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Stack 2: 4-Grid flat statistics elements matching Qifess style */}
        <div className="relative mx-auto justify-between grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-10 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            const valueStr = stat.value;
            const numPart = valueStr.replace("+", "");
            const plusPart = valueStr.includes("+") ? "+" : "";

            return (
              <div key={stat.key} className="space-y-3">
                <div className="flex items-center gap-2">
                  <IconComp className="size-4 text-primary" />
                  <h3 className="text-base font-medium text-slate-900">
                    {t(`stats.${stat.key}.title`)}
                  </h3>
                </div>
                <div className="text-3xl font-extrabold text-[#100420] tracking-tight flex items-baseline gap-0.5">
                  <span>{numPart}</span>
                  <span className="text-primary-500 font-extrabold">
                    {plusPart}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t(`stats.${stat.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
