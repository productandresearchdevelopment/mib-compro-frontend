"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ArrowUpRight01Icon, 
  Calendar02Icon, 
  Clock01Icon,
  FilterIcon
} from "@hugeicons/core-free-icons";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NEWS_DATA, NewsItem } from "@/data/newsData";

export default function NewsListingPage() {
  const locale = useLocale();
  const t = useTranslations("news");
  const [activeFilter, setActiveFilter] = useState<"All" | "News" | "Blog" | "Event">("All");

  // Filter Categories list
  const filterCategories = [
    { key: "All", label: t("filterAll") },
    { key: "News", label: t("filterNews") },
    { key: "Blog", label: t("filterBlog") },
    { key: "Event", label: t("filterEvent") }
  ] as const;

  // Filter dynamic news items
  const filteredNews = useMemo(() => {
    if (activeFilter === "All") return NEWS_DATA;
    return NEWS_DATA.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  // Featured News is the first item matching the current filter (if any exist)
  const featuredNews = useMemo(() => {
    // If we are filtering, we don't necessarily show a distinct featured layout if there are no items
    if (filteredNews.length === 0) return null;
    return filteredNews[0];
  }, [filteredNews]);

  // The rest of the news items for the grid
  const gridNews = useMemo(() => {
    if (filteredNews.length <= 1) return [];
    return filteredNews.slice(1);
  }, [filteredNews]);

  // Motion variants for container and card stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-primary selection:text-white">
      <Navbar />

      <main className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-12 md:gap-16">
          
          {/* Header Section */}
          <div className="flex flex-col gap-4 max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEEBEB] text-[#F22929] text-sm font-semibold w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F22929] animate-pulse" />
              {t("badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#100420] tracking-tight leading-tight">
              {t("title")}
            </h1>
            <p className="text-lg text-[#475569] font-normal leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Interactive Filters row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {filterCategories.map((category) => {
                const isActive = activeFilter === category.key;
                return (
                  <button
                    key={category.key}
                    onClick={() => setActiveFilter(category.key)}
                    className={`relative px-6 py-2.5 rounded-full text-base font-semibold transition-all duration-300 whitespace-nowrap shrink-0 ${
                      isActive 
                        ? "text-white bg-[#100420] shadow-md" 
                        : "text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <HugeiconsIcon icon={FilterIcon} className="w-4 h-4 text-slate-400" />
              <span>Showing {filteredNews.length} articles</span>
            </div>
          </div>

          {/* Grid and Listing Items */}
          <AnimatePresence mode="wait">
            {filteredNews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm text-center px-6"
              >
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                  <HugeiconsIcon icon={FilterIcon} className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-[#100420] mb-2">No Articles Found</h3>
                <p className="text-slate-500 max-w-sm">
                  We couldn't find any news articles in the "{activeFilter}" category. Please try selecting a different filter.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-8 md:gap-12"
              >
                {/* Row 1: Featured & Side Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Featured Large Article (Left) */}
                  {featuredNews && (
                    <motion.div 
                      variants={cardVariants}
                      className="lg:col-span-8 flex flex-col"
                    >
                      <Link 
                        href={`/${locale}/news/${featuredNews.slug}`}
                        className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 relative"
                      >
                        {/* Image banner with high-quality zoom */}
                        <div className="relative aspect-[16/9] lg:aspect-auto lg:h-[400px] w-full overflow-hidden">
                          <Image
                            src={featuredNews.image}
                            alt={featuredNews.title[locale as "en" | "id"]}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#100420]/80 via-[#100420]/20 to-transparent" />
                          
                          {/* Floating Badges on top of image */}
                          <div className="absolute top-6 left-6 flex gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FEEBEB] text-[#F22929]">
                              {locale === "id" ? featuredNews.category_id : featuredNews.category}
                            </span>
                          </div>

                          {/* Content overlay at the bottom of the image for desktop */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white flex flex-col gap-3">
                            <div className="flex items-center gap-4 text-white/80 text-sm">
                              <span className="flex items-center gap-1.5">
                                <HugeiconsIcon icon={Calendar02Icon} className="w-4 h-4" />
                                {featuredNews.date}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4" />
                                {locale === "en" ? featuredNews.readTimeEN : featuredNews.readTimeID}
                              </span>
                            </div>
                            <h2 className="text-xl md:text-3xl font-bold tracking-tight line-clamp-2 group-hover:text-white/95 transition-colors">
                              {featuredNews.title[locale as "en" | "id"]}
                            </h2>
                          </div>
                        </div>

                        {/* Bottom Info / Click indicator */}
                        <div className="p-6 md:p-8 bg-white border-t border-slate-50 flex items-center justify-between mt-auto">
                          <p className="text-slate-600 line-clamp-2 text-base max-w-xl">
                            {featuredNews.description[locale as "en" | "id"]}
                          </p>
                          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#100420] border border-slate-100 group-hover:bg-[#100420] group-hover:text-white transition-all duration-300 shrink-0 ml-4">
                            <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )}

                  {/* Secondary Card (Right) */}
                  {gridNews.length > 0 && (
                    <motion.div 
                      variants={cardVariants}
                      className="lg:col-span-4 flex flex-col"
                    >
                      <Link 
                        href={`/${locale}/news/${gridNews[0].slug}`}
                        className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={gridNews[0].image}
                            alt={gridNews[0].title[locale as "en" | "id"]}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute top-6 left-6">
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#FEEBEB] text-[#F22929] tracking-wider">
                              {locale === "id" ? gridNews[0].category_id : gridNews[0].category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow gap-4 justify-between">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
                              <span className="flex items-center gap-1">
                                <HugeiconsIcon icon={Calendar02Icon} className="w-3.5 h-3.5" />
                                {gridNews[0].date}
                              </span>
                              <span className="flex items-center gap-1">
                                <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5" />
                                {locale === "en" ? gridNews[0].readTimeEN : gridNews[0].readTimeID}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-[#100420] leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                              {gridNews[0].title[locale as "en" | "id"]}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-[#2068F7] font-semibold text-base mt-auto">
                            {t("readMore")}
                            <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Rows 2 & 3: Standard Three-Column Grid */}
                {gridNews.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridNews.slice(1).map((news) => (
                      <motion.div 
                        key={news.id} 
                        variants={cardVariants}
                        className="flex flex-col"
                      >
                        <Link 
                          href={`/${locale}/news/${news.slug}`}
                          className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden">
                            <Image
                              src={news.image}
                              alt={news.title[locale as "en" | "id"]}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6">
                              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#FEEBEB] text-[#F22929] tracking-wider">
                                {locale === "id" ? news.category_id : news.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6 flex flex-col flex-grow gap-4 justify-between">
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
                                <span className="flex items-center gap-1">
                                  <HugeiconsIcon icon={Calendar02Icon} className="w-3.5 h-3.5" />
                                  {news.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5" />
                                  {locale === "en" ? news.readTimeEN : news.readTimeID}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-[#100420] leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                                {news.title[locale as "en" | "id"]}
                              </h3>
                              <p className="text-slate-500 text-sm line-clamp-2">
                                {news.description[locale as "en" | "id"]}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-[#2068F7] font-semibold text-base mt-auto pt-2">
                              {t("readMore")}
                              <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer showCta={true} />
    </div>
  );
}
