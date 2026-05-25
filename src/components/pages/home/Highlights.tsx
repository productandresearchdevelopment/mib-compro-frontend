"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { NEWS_DATA as GLOBAL_NEWS_DATA } from "@/data/newsData";

export default function Highlights() {
  const locale = useLocale();
  const t = useTranslations("highlights");

  // Dynamically select the 2 latest news items by sorting descending based on date (dd.mm.yyyy format)
  const latestNews = React.useMemo(() => {
    return [...GLOBAL_NEWS_DATA]
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split(".").map(Number);
        const [dayB, monthB, yearB] = b.date.split(".").map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 2);
  }, []);

  // Fallbacks if news items are missing (highly unlikely as NEWS_DATA contains 8 items)
  const leftItem = latestNews[0];
  const rightItem = latestNews[1];

  if (!leftItem || !rightItem) return null;

  return (
    <section className="bg-white py-20 md:py-32 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full space-y-16 md:space-y-24">
        {/* ----------------- CTA Section ----------------- */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-[54px] font-bold text-slate-900 tracking-[-1.5px] leading-[1.12] max-w-4xl mx-auto mb-10 select-none">
            {t("cta.headlinePart1")} <br className="hidden md:inline" />
            <span className="inline-flex items-center gap-2 align-middle">
              MIB
              <span className="inline-flex items-center justify-center text-primary">
                {/* Inline Hexagon Brand Icon utilizing Primary Color */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 sm:w-10 sm:h-10 animate-[spin_20s_linear_infinite]"
                >
                  <polygon
                    points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle cx="50" cy="50" r="14" fill="currentColor" />
                </svg>
              </span>
            </span>{" "}
            {t("cta.headlinePart2")} <br className="hidden md:inline" />
            {t("cta.headlinePart3")}
          </h2>

          {/* CTA Button */}
          <Link
            href={`/${locale}/solution`}
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 hover:border-primary/50 text-slate-800 hover:text-primary px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
          >
            {t("cta.button")}
            <span className="text-base font-normal">→</span>
          </Link>
        </div>

        {/* ----------------- News Highlights Section ----------------- */}
        <div>
          {/* Header Bullet */}
          <div className="flex items-center gap-2 mb-8 select-none">
            <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
              {t("featuredTitle")}
            </span>
          </div>

          {/* Two-Column Grid with 60% / 40% Split (3:2) on Medium+ Screens */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 lg:gap-16 items-stretch">
            
            {/* LEFT COLUMN (60% of width): Image Overlay Style (Full Image, Text Inside) */}
            <Link
              href={`/${locale}/news/${leftItem.slug}`}
              className="group relative block md:col-span-3 w-full h-[350px] sm:h-[400px] md:h-[420px] overflow-hidden rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-500"
            >
              {/* Background Image */}
              <img
                src={leftItem.image}
                alt={locale === "id" ? leftItem.title.id : leftItem.title.en}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Dark Legibility Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

              {/* Content Overlaid at the Bottom Left with responsive max-width layout */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-white">
                <div className="max-w-[85%] sm:max-w-[75%] lg:max-w-[70%]">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 tracking-wider">
                    <span>{locale === "id" ? leftItem.category_id : leftItem.category}</span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
                    <span>{leftItem.date}</span>
                  </div>
                  <h3 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug group-hover:text-slate-100 transition-colors line-clamp-2">
                    {locale === "id" ? leftItem.title.id : leftItem.title.en}
                  </h3>
                </div>
              </div>

              {/* Interactive Corner Arrow - Hidden by default (opacity-0, scale-75, translated) and slides/reveals on group-hover */}
              <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white opacity-0 scale-75 translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-lg">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </Link>

            {/* RIGHT COLUMN (40% of width): Split Style (Image at Top, Text Outside/Below) */}
            <div className="md:col-span-2 flex flex-col justify-between w-full h-full min-h-[350px] sm:min-h-[400px] md:min-h-[420px]">
              
              {/* Image Card Container */}
              <Link
                href={`/${locale}/news/${rightItem.slug}`}
                className="group relative block w-full h-[210px] sm:h-[250px] md:h-[270px] overflow-hidden rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-500 bg-slate-100"
              >
                {/* Image */}
                <img
                  src={rightItem.image}
                  alt={locale === "id" ? rightItem.title.id : rightItem.title.en}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </Link>

              {/* Metadata and Title Underneath the Image Card */}
              <div className="flex flex-col mt-6 md:mt-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 tracking-wider">
                  <span>{locale === "id" ? rightItem.category_id : rightItem.category}</span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
                  <span>{rightItem.date}</span>
                </div>
                <Link
                  href={`/${locale}/news/${rightItem.slug}`}
                  className="group mt-2.5 inline-block"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-3">
                    {locale === "id" ? rightItem.title.id : rightItem.title.en}
                  </h3>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
