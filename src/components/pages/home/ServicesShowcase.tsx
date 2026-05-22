"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Users,
  Layers,
  Truck,
  Wrench,
  Monitor,
  ShieldCheck,
} from "lucide-react";

interface ServiceItem {
  key: string;
  id: string;
  image: string;
  icon: React.ReactNode;
}

export default function ServicesShowcase() {
  const t = useTranslations("servicesShowcase");

  // Flagship Feature (Top - Full Width)
  const flagshipService: ServiceItem = useMemo(
    () => ({
      key: "full_managed",
      id: "01",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      icon: <Sparkles className="size-6 text-primary" />,
    }),
    [],
  );

  // Mid-Tier Features (Middle - 2 Columns Full Image with Hover-Reveal Details)
  const midTierServices: ServiceItem[] = useMemo(
    () => [
      {
        key: "managed",
        id: "02",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        icon: <Cpu className="size-6" />,
      },
      {
        key: "slm",
        id: "03",
        image:
          "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        icon: <Wrench className="size-6" />,
      },
    ],
    [],
  );

  // Foundation Services (Bottom - 5 Columns connected grid with Full Image & Hover-Reveal Details)
  const gridServices: ServiceItem[] = useMemo(
    () => [
      {
        key: "labor",
        id: "04",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        icon: <Users className="size-5" />,
      },
      {
        key: "staging",
        id: "05",
        image:
          "https://images.unsplash.com/photo-1581092921461-eab62e97a780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        icon: <Layers className="size-5" />,
      },
      {
        key: "delivery",
        id: "06",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        icon: <Truck className="size-5" />,
      },
      {
        key: "seat",
        id: "07",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        icon: <Monitor className="size-5" />,
      },
      {
        key: "site",
        id: "08",
        image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        icon: <ShieldCheck className="size-5" />,
      },
    ],
    [],
  );

  return (
    <section
      id="services-showcase"
      className="py-20 md:py-32 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-6 w-full space-y-16">
        {/* Section Header */}
        {/* <div className="max-w-3xl space-y-4 ">
          <div className="bg-red-50 text-primary border border-red-100 px-4 py-2 rounded-full w-max text-xs font-semibold flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {t("badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.2]">
            {t("title")}
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
        </div> */}
        <div className="max-w-7xl space-y-4 text-center">
          <div className="bg-red-50 text-primary border border-red-100 px-4 py-2 rounded-full w-max text-xs font-semibold flex items-center gap-2 font-mono mx-auto">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {t("badge")}
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.2]">
            {t("title")}
          </h2>

          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Unified Outer Connected Border Block */}
        <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 bg-white">
          {/* ========================================================================= */}
          {/* 1. TOP FLAGSHIP: FULL MANAGED SERVICES (FULL WIDTH SPLIT CARD)            */}
          {/* ========================================================================= */}
          <div className="group grid border-b border-slate-200 overflow-hidden transition-colors duration-500 ease-out hover:bg-slate-50/40 lg:grid-cols-2">
            {/* Left Content Area */}
            <div className="flex flex-col justify-between gap-12 p-8 md:p-16 lg:p-20">
              <div className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                {flagshipService.icon}
                {t(`items.${flagshipService.key}.title`)}
              </div>

              <div>
                <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest font-mono">
                  {flagshipService.id} // FLAGSHIP SLA COMMITMENT
                </span>

                <h3 className="mt-4 mb-6 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                  {t(`items.${flagshipService.key}.title`)}
                  <span className="font-medium text-slate-400 block mt-2 text-lg md:text-xl leading-relaxed">
                    {t(`items.${flagshipService.key}.desc`)}
                  </span>
                </h3>

                <div className="flex items-center gap-2 font-bold text-primary group-hover:gap-3.5 transition-all text-sm w-fit cursor-pointer">
                  {t("badge")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Right Visual Image Frame */}
            <div className="relative p-6 lg:p-12 bg-slate-50/50 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-200">
              <div className="relative w-full aspect-[14/9] border border-slate-200 bg-white p-2 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                <div className="h-full w-full overflow-hidden rounded-xl">
                  <img
                    src={flagshipService.image}
                    alt={t(`items.${flagshipService.key}.title`)}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. MIDDLE HIGH-TIER: MANAGED SERVICES & SLM (2 COLUMNS FULL IMAGE HOVER)  */}
          {/* ========================================================================= */}
          <div className="grid lg:grid-cols-2 border-b border-slate-200">
            {midTierServices.map((item, idx) => (
              <div
                key={item.key}
                className={`relative w-full h-[380px] sm:h-[420px] lg:h-[450px] overflow-hidden group bg-slate-900 ${
                  idx === 0
                    ? "border-b lg:border-b-0 lg:border-r border-slate-200"
                    : ""
                }`}
              >
                {/* Full Coverage Background Product Image */}
                <img
                  src={item.image}
                  alt={t(`items.${item.key}.title`)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Intelligently Dims and Darkens Gradient overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-all duration-500 z-10 group-hover:from-black/98 group-hover:via-black/75 group-hover:to-black/30 pointer-events-none" />

                {/* Content Overlay (Transitions on hover) */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20 text-white pointer-events-auto">
                  {/* Service Number Tag */}
                  <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-widest font-mono mb-2 group-hover:text-primary transition-colors">
                    {item.id} // HIGH-TIER SERVICE
                  </span>

                  {/* Title and Icon */}
                  <div className="flex items-center gap-3 text-xl md:text-2xl font-bold text-white transition-colors">
                    <div className="text-white group-hover:text-primary transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="group-hover:text-primary transition-colors">
                      {t(`items.${item.key}.title`)}
                    </h3>
                  </div>

                  {/* Hover-reveal sliding details */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-[220px] group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                    <p className="mt-4 text-slate-200 text-sm md:text-base leading-relaxed font-medium">
                      {t(`items.${item.key}.desc`)}
                    </p>

                    <div className="flex items-center gap-2 text-primary font-bold transition-all text-xs w-fit mt-6 group-hover:gap-3 cursor-pointer">
                      Read Details
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* 3. BOTTOM FOUNDATION: 5 GRID SERVICES (5 COLUMNS FULL IMAGE HOVER)         */}
          {/* ========================================================================= */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 bg-slate-900">
            {gridServices.map((item, idx) => (
              <div
                key={item.key}
                className={`relative w-full h-[320px] sm:h-[350px] overflow-hidden group bg-slate-900 ${
                  idx !== 0
                    ? "border-t md:border-t-0 md:border-l border-slate-200"
                    : ""
                }`}
              >
                {/* Full Coverage Background Operational Image */}
                <img
                  src={item.image}
                  alt={t(`items.${item.key}.title`)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Intelligently Dims and Darkens Gradient overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent transition-all duration-500 z-10 group-hover:from-black/98 group-hover:via-black/80 group-hover:to-black/40 pointer-events-none" />

                {/* Content Overlay (Transitions on hover) */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 text-white pointer-events-auto">
                  {/* Service Number Tag */}
                  <span className="text-[9px] font-semibold text-primary/80 uppercase tracking-widest font-mono mb-1 group-hover:text-primary transition-colors">
                    {item.id} // FIELD SERVICE
                  </span>

                  {/* Title and Icon */}
                  <div className="flex items-center gap-2.5 text-base md:text-lg font-bold text-white transition-colors">
                    <div className="text-white group-hover:text-primary transition-colors flex-shrink-0">
                      {item.icon}
                    </div>
                    <h4 className="group-hover:text-primary transition-colors leading-tight">
                      {t(`items.${item.key}.title`)}
                    </h4>
                  </div>

                  {/* Hover-reveal sliding details (compact style for 5 columns) */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-[180px] group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                    <p className="mt-3 text-slate-200 text-[11px] md:text-xs leading-relaxed font-medium line-clamp-4">
                      {t(`items.${item.key}.desc`)}
                    </p>

                    <div className="flex items-center gap-1.5 text-primary font-bold transition-all text-[10px] w-fit mt-4 group-hover:gap-2 cursor-pointer">
                      Read Details
                      <ArrowRight className="h-3 w-3 text-primary" />
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
