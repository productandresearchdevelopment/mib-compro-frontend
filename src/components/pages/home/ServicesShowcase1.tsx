"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Clock, Workflow } from "lucide-react";

interface ServiceItem {
  key: string;
  id: string;
  image: string;
  variant: "dark" | "light-photo" | "photo-bg";
}

export default function ServicesShowcase() {
  const t = useTranslations("servicesShowcase");

  // Row 1: Top row (3 columns) — SLM (dark), Labor (light-photo), Staging (dark)
  const row1Services: ServiceItem[] = useMemo(
    () => [
      {
        key: "slm",
        id: "01",
        variant: "dark",
        image: "/images/services/card01-slm.png",
      },
      {
        key: "labor",
        id: "02",
        variant: "light-photo",
        image: "/images/services/card02-labor.png",
      },
      {
        key: "staging",
        id: "03",
        variant: "dark",
        image: "/images/services/card03-staging.png",
      },
    ],
    [],
  );

  // Row 3: Bottom row (3 columns) — Delivery, Seat, Site (all photo-bg)
  const row3Services: ServiceItem[] = useMemo(
    () => [
      {
        key: "delivery",
        id: "06",
        variant: "photo-bg",
        image: "/images/services/card06-delivery.png",
      },
      {
        key: "seat",
        id: "07",
        variant: "photo-bg",
        image: "/images/services/card07-seat.png",
      },
      {
        key: "site",
        id: "08",
        variant: "photo-bg",
        image: "/images/services/card08-site.png",
      },
    ],
    [],
  );

  /* ─── Card Badge (adapts color based on dark/light) ─── */
  const CardBadge = ({
    id,
    category,
    dark = false,
  }: {
    id: string;
    category: string;
    dark?: boolean;
  }) => (
    <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold shrink-0">
        {id}
      </span>
      <span
        className={`text-xs font-bold uppercase tracking-widest ${
          dark ? "text-primary-300" : "text-primary"
        }`}
      >
        {category}
      </span>
    </div>
  );

  return (
    <section
      id="services-showcase"
      className="py-20 md:py-32 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full space-y-10 relative z-10">
        {/* Section Header — Badge only */}
        <div className="flex items-center gap-2 select-none">
          <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
          <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
            {t("badge")}
          </span>
        </div>

        {/* ══════ BENTO GRID: 3 – 2 – 3 ══════ */}
        <div className="w-full space-y-4 md:space-y-5">

          {/* ── ROW 1: 3 COLUMNS (individually designed) ─────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

            {/* Card 01: Second Level Maintenance — DARK with world map overlay */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 cursor-pointer h-[380px] lg:h-[420px] transition-transform duration-300 hover:scale-[1.02]">
              {/* Dark world map / network visualization background */}
              <img
                src="/images/services/card01-slm.png"
                alt={t("items.slm.title")}
                className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Red glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
                <div>
                  <CardBadge id="01" category={t("items.slm.category")} dark />
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {t("items.slm.title")}
                  </h3>
                </div>
                <div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[90%]">
                    {t("items.slm.desc")}
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold text-sm mt-4">
                    {t("readDetails")}
                    <ArrowRight className="w-4 h-4 text-primary-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 02: Labor Outsourcing — LIGHT with person photo on right + red geometric accent */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white cursor-pointer h-[380px] lg:h-[420px] transition-transform duration-300 hover:scale-[1.02]">
              {/* Red geometric chevron/triangle accent behind the photo */}
              <div className="absolute right-0 top-0 w-[55%] h-full overflow-hidden">
                {/* Red angular shape */}
                <div className="absolute -right-4 -top-4 w-[120%] h-[120%] bg-primary origin-center rotate-6 translate-x-[15%] -translate-y-[5%]" />
                {/* Person photo on top of the red shape */}
                <img
                  src="/images/services/card02-labor.png"
                  alt={t("items.labor.title")}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Soft fade to white on left edge */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent pointer-events-none w-[40%]" />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
                <div>
                  <CardBadge id="02" category={t("items.labor.category")} />
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight max-w-[55%]">
                    {t("items.labor.title")}
                  </h3>
                </div>
                <div>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[60%]">
                    {t("items.labor.desc")}
                  </p>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mt-4">
                    {t("readDetails")}
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 03: Staging & Deployment — DARK with red-tinted tech/hardware image */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 cursor-pointer h-[380px] lg:h-[420px] transition-transform duration-300 hover:scale-[1.02]">
              {/* Tech / circuit / hardware imagery with red tint */}
              <img
                src="/images/services/card03-staging.png"
                alt={t("items.staging.title")}
                className="absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Red color overlay for the tech-red look */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
                <div>
                  <CardBadge id="03" category={t("items.staging.category")} dark />
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {t("items.staging.title")}
                  </h3>
                </div>
                <div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[90%]">
                    {t("items.staging.desc")}
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold text-sm mt-4">
                    {t("readDetails")}
                    <ArrowRight className="w-4 h-4 text-primary-300" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── ROW 2: 2 COLUMNS (LARGER CARDS) ──────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">

            {/* Card 04: Full Managed Services (light with stats) */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white cursor-pointer h-[440px] lg:h-[480px] transition-transform duration-300 hover:scale-[1.02]">
              {/* Background image (right side) */}
              <div className="absolute right-0 top-0 w-[50%] h-full overflow-hidden">
                <img
                  src="/images/services/card04-fullmanaged.png"
                  alt={t("items.full_managed.title")}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
                <div>
                  <CardBadge id="04" category={t("items.full_managed.category")} />
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight max-w-[70%]">
                    {t("items.full_managed.title")}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-4 max-w-[65%]">
                    {t("items.full_managed.desc")}
                  </p>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mt-4 cursor-pointer">
                    {t("readDetails")}
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-6 pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">99.9%</p>
                      <p className="text-[11px] text-slate-400">SLA Commitment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">24/7</p>
                      <p className="text-[11px] text-slate-400">Monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">End-to-End</p>
                      <p className="text-[11px] text-slate-400">Operations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 05: Managed Services (dark variant) */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 cursor-pointer h-[440px] lg:h-[480px] transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/images/services/card05-managed.png"
                alt={t("items.managed.title")}
                className="absolute inset-0 w-full h-full object-cover opacity-25 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/5 pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
                <div>
                  <CardBadge id="05" category={t("items.managed.category")} dark />
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-[75%]">
                    {t("items.managed.title")}
                  </h3>
                </div>
                <div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[80%]">
                    {t("items.managed.desc")}
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold text-sm mt-4 cursor-pointer">
                    {t("readDetails")}
                    <ArrowRight className="w-4 h-4 text-primary-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 3: 3 COLUMNS (PHOTO BG CARDS) ────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {row3Services.map((item) => (
              <div
                key={item.key}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 cursor-pointer h-[380px] lg:h-[420px] transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* Full background image */}
                <img
                  src={item.image}
                  alt={t(`items.${item.key}.title`)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Heavy left-side white gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
                  <div>
                    <CardBadge id={item.id} category={t(`items.${item.key}.category`)} />
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight max-w-[75%]">
                      {t(`items.${item.key}.title`)}
                    </h3>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-[80%]">
                      {t(`items.${item.key}.desc`)}
                    </p>
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mt-4 cursor-pointer">
                      {t("readDetails")}
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
