"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import ParallaxImage from "@/components/effects/ParallaxImage";

interface ServiceItem {
  key: string;
  id: string;
  image: string;
}

export default function ServicesShowcase() {
  const t = useTranslations("servicesShowcase");

  // Row 1: Primary Services (First 2 flagship items)
  const primaryServices: ServiceItem[] = useMemo(
    () => [
      {
        key: "full_managed",
        id: "01",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      },
      {
        key: "managed",
        id: "02",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      },
    ],
    [],
  );

  // Row 2: Secondary Services (3 items)
  const row2Services: ServiceItem[] = useMemo(
    () => [
      {
        key: "slm",
        id: "03",
        image:
          "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      },
      {
        key: "labor",
        id: "04",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      },
      {
        key: "staging",
        id: "05",
        image:
          "https://images.unsplash.com/photo-1581092921461-eab62e97a780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      },
    ],
    [],
  );

  // Row 3: Foundational Operations (3 items)
  const row3Services: ServiceItem[] = useMemo(
    () => [
      {
        key: "delivery",
        id: "06",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      },
      {
        key: "seat",
        id: "07",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      },
      {
        key: "site",
        id: "08",
        image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      },
    ],
    [],
  );

  return (
    <section
      id="services-showcase"
      className="py-20 md:py-32 bg-white relative overflow-hidden"
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
      <div className="max-w-7xl mx-auto px-6 w-full space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-7xl space-y-5">
          <div className="flex items-center gap-2 mb-5 select-none">
            <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
              {t("badge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-slate-900 leading-tight font-display uppercase">
            {t("title")}
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-4xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Bento Grid: 2 - 3 - 3 Schema */}
        <div className="w-full space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {row2Services.map((item) => (
              <div
                key={item.key}
                className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-slate-100 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.01] cursor-pointer h-[320px] lg:h-[400px]"
              >
                <ParallaxImage
                  src={item.image}
                  alt={t(`items.${item.key}.title`)}
                  className="absolute inset-0 w-full h-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  speed={25}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                <div className="flex flex-col p-6 md:p-8 z-20 text-white relative w-full">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                    {t(`items.${item.key}.title`)}
                  </h4>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out w-full">
                    <div className="overflow-hidden">
                      <div className="pt-3 space-y-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        <p className="text-slate-200 text-sm leading-relaxed line-clamp-3 font-medium">
                          {t(`items.${item.key}.desc`)}
                        </p>
                        <div className="flex items-center gap-2 text-white font-bold transition-all text-sm w-fit mt-1 group-hover:gap-3.5">
                          {t("readDetails")}
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* ROW 1: PRIMARY HIGHLIGHTS (2 COLUMNS) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            {primaryServices.map((item) => (
              <div
                key={item.key}
                className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-slate-100 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.01] cursor-pointer h-[400px] lg:h-[480px]"
              >
                <ParallaxImage
                  src={item.image}
                  alt={t(`items.${item.key}.title`)}
                  className="absolute inset-0 w-full h-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  speed={35}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                <div className="flex flex-col p-8 md:p-10 z-20 text-white relative w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out w-full">
                    <div className="overflow-hidden">
                      <div className="pt-3 space-y-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        <p className="text-slate-200 text-base leading-relaxed line-clamp-3 font-medium">
                          {t(`items.${item.key}.desc`)}
                        </p>
                        <div className="flex items-center gap-2 text-white font-bold transition-all text-sm w-fit mt-1 group-hover:gap-3.5">
                          {t("readDetails")}
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ROW 2: MID-TIER CORE FEATURES (3 COLUMNS) */}

          {/* ROW 3: FOUNDATIONAL OPERATIONS (3 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {row3Services.map((item) => (
              <div
                key={item.key}
                className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-slate-100 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.01] cursor-pointer h-[320px] lg:h-[400px]"
              >
                <ParallaxImage
                  src={item.image}
                  alt={t(`items.${item.key}.title`)}
                  className="absolute inset-0 w-full h-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  speed={25}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                <div className="flex flex-col p-6 md:p-8 z-20 text-white relative w-full">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                    {t(`items.${item.key}.title`)}
                  </h4>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out w-full">
                    <div className="overflow-hidden">
                      <div className="pt-3 space-y-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        <p className="text-slate-200 text-sm leading-relaxed line-clamp-3 font-medium">
                          {t(`items.${item.key}.desc`)}
                        </p>
                        <div className="flex items-center gap-2 text-white font-bold transition-all text-sm w-fit mt-1 group-hover:gap-3.5">
                          {t("readDetails")}
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
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
