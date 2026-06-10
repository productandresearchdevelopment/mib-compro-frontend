"use client";

import React from "react";
import { ArrowRight, Target, Award } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompanyHero() {
  const t = useTranslations("companyHero");
  const tHero = useTranslations("hero");
  const locale = useLocale();

  return (
    <section id="company-hero" className="w-full bg-white pt-24 md:pt-28">
      {/* Top Section: Split Title & Description Header */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Title */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              {t("title")}
            </h1>
          </div>

          {/* Right Side: Buttons & Subtitle */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="group h-auto bg-primary-600 hover:bg-[#d61e1e] text-white px-7 py-3.5 rounded-[12px] text-base font-medium shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto border border-transparent">
                <Link href={`/${locale}/solution`} className="flex items-center justify-center gap-2">
                  {tHero("exploreSolutions")}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Link>
              </Button>
              <Button asChild variant="outline" className="group h-auto border-slate-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 bg-transparent hover:bg-slate-50 px-7 py-3.5 rounded-[12px] text-base font-medium transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto">
                <Link href={`/${locale}/product`} className="flex items-center justify-center gap-2">
                  {tHero("viewProduct")}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Large Rounded Hero Image */}
      <div className="max-w-7xl mx-auto px-6 w-full mb-20">
        <div className="w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden relative shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
            alt="Mitrainovasi Team Workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />
        </div>
      </div>

      {/* Bottom Section: Slanted "Who We Are & What Drives Us" banner */}
      <div className="w-full overflow-hidden bg-slate-950 min-h-[640px] flex items-center relative py-16 md:py-0">
        {/* Absolute Cityscape Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
            alt="Cityscape Night Skyline"
            className="absolute inset-y-0 right-0 w-full md:w-3/5 h-full object-cover opacity-20 md:opacity-90 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        </div>

        {/* Slanted Red Shape Overlay */}
        <div 
          className="absolute inset-0 bg-primary z-10 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] md:[clip-path:polygon(0_0,45%_0,68%_100%,0_100%)] pointer-events-none"
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Side Content inside slanted red polygon */}
            <div className="md:col-span-8 lg:col-span-7 text-white py-8 md:py-16 space-y-8">
              
              {/* Who We Are block */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-white">
                  {t("whoWeAreTitle")}
                </h2>
                <p className="text-base md:text-lg text-white/95 leading-relaxed font-medium">
                  {t("whoWeAreP1")}
                </p>
                <p className="text-base md:text-lg text-white/95 leading-relaxed font-medium">
                  {t("whoWeAreP2")}
                </p>
              </div>

              {/* What Drives Us block */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-white">
                  {t("whatDrivesUsTitle")}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Mission item */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base md:text-lg font-extrabold uppercase tracking-wider text-white leading-none">
                        {t("missionTitle")}
                      </h3>
                      <p className="text-sm text-white/90 font-medium">
                        {t("missionText")}
                      </p>
                    </div>
                  </div>

                  {/* Values item */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base md:text-lg font-extrabold uppercase tracking-wider text-white leading-none">
                        {t("valuesTitle")}
                      </h3>
                      <p className="text-sm text-white/90 font-medium">
                        {t("valuesText")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Spacer column to let backdrop city show through */}
            <div className="hidden md:block md:col-span-4 lg:col-span-5 h-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
