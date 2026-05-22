"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useTranslations, useLocale } from "next-intl";
import { NEWS_DATA as GLOBAL_NEWS_DATA } from "@/data/newsData";

export default function News() {
  const tNews = useTranslations("news");
  const locale = useLocale();

  // State-based ref to avoid Framer Motion "Target ref is defined but not hydrated" warnings
  const [container, setContainer] = useState<HTMLElement | null>(null);
  
  const { scrollYProgress: newsScrollY } = useScroll({
    target: container ? { current: container } : undefined,
    offset: ["start start", "end end"]
  });

  const newsX = useTransform(newsScrollY, [0, 1], ["0%", "-40%"]);

  const NEWS_DATA = useMemo(() => {
    // Take 3 high-quality articles from global news data for the home page slider
    return GLOBAL_NEWS_DATA.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title[locale as "en" | "id"],
      date: item.date,
      image: item.image,
      link: `/${locale}/news/${item.slug}`
    }));
  }, [locale]);

  return (
    <section 
      ref={setContainer} 
      id="news" 
      className="relative h-[250vh] bg-slate-50"
    >
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center pb-8 overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6 w-full mb-6 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              {tNews("title")}
            </h2>
            <p className="text-lg text-slate-600">
              {tNews("subtitle")}
            </p>
          </div>
          <Link href={`/${locale}/news`} className="flex items-center gap-2 font-semibold text-slate-900 border border-slate-300 bg-white hover:bg-slate-100 px-6 py-3 rounded-full transition-colors shrink-0">
            {tNews("viewAll")}
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
          </Link>
        </div>

        <motion.div style={{ x: newsX }} className="flex gap-8 px-6 md:px-0 md:ml-[calc(max(1.5rem,(100vw-80rem)/2+1.5rem))] w-[max-content]">
          {NEWS_DATA.map((news) => (
            <Link href={news.link} key={news.id} className="w-[85vw] md:w-[400px] lg:w-[450px] flex flex-col group cursor-pointer shrink-0">
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 shadow-md">
                <Image src={news.image} alt={news.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-4 px-2">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{news.date}</span>
                <h3 className="text-2xl font-medium text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {news.title}
                </h3>
                <div className="flex items-center gap-2 text-primary font-medium mt-2 group-hover:gap-3 transition-all">
                  {tNews("readMore")}
                  <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
          <div className="w-[10vw] md:w-[200px] shrink-0"></div>
        </motion.div>
      </div>
    </section>
  );
}
