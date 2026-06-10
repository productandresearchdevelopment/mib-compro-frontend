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
            <div className="flex items-center gap-2 select-none">
              <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
                {t("badge")}
              </span>
            </div>
            <h1 className="text-3xl md:text-[40px] font-semibold text-black tracking-tight leading-tight">
              {t("title")}
            </h1>
          </div>

          {/* Interactive Filters row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1">
              {filterCategories.map((category) => {
                const isActive = activeFilter === category.key;
                return (
                  <button
                    key={category.key}
                    onClick={() => setActiveFilter(category.key)}
                    className={`
                      whitespace-nowrap shrink-0 transition-all duration-300 text-base font-semibold cursor-pointer
                      ${
                        isActive
                          ? "bg-primary-600 hover:bg-[#d61e1e] text-white px-8 py-2.5 rounded-[12px]  "
                          : "text-slate-500 hover:text-slate-900 bg-transparent px-3 py-2"
                      }
                    `}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Showing Data Info */}
            <div className="text-sm text-slate-500 font-medium shrink-0 self-start md:self-auto select-none">
              {t("showing", { count: filteredNews.length, total: NEWS_DATA.length })}
            </div>
          </div>

          {/* Grid and Listing Items */}
          <AnimatePresence mode="wait">
            {filteredNews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center px-6"
              >
                <HugeiconsIcon
                  icon={FilterIcon}
                  className="w-12 h-12 text-slate-300 mb-4"
                />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No Articles Found
                </h3>
                <p className="text-slate-500 max-w-md text-sm">
                  We couldn't find any news articles in the "{activeFilter}"
                  category. Please try selecting a different filter.
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
                {/* Row 1: Featured & Side Grid (Custom 5-column Layout) */}
                {featuredNews && (
                  <motion.div
                    variants={cardVariants}
                    className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 lg:gap-16 items-stretch"
                  >
                    {/* LEFT COLUMN (60% of width): Image Overlay Style (Full Image, Text Inside) */}
                    <Link
                      href={`/${locale}/insights/${featuredNews.slug}`}
                      className={`group relative block w-full h-[350px] sm:h-[400px] md:h-[420px] overflow-hidden rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-500 ${
                        gridNews.length > 0 ? "md:col-span-3" : "md:col-span-5"
                      }`}
                    >
                      {/* Background Image */}
                      <img
                        src={featuredNews.image}
                        alt={locale === "id" ? featuredNews.title.id : featuredNews.title.en}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      {/* Dark Legibility Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                      {/* Content Overlaid at the Bottom Left with responsive max-width layout */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-white">
                        <div className="max-w-[85%] sm:max-w-[75%] lg:max-w-[70%]">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 tracking-wider">
                            <span>{locale === "id" ? featuredNews.category_id : featuredNews.category}</span>
                            <span className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
                            <span>{featuredNews.date}</span>
                          </div>
                          <h3 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug group-hover:text-slate-100 transition-colors line-clamp-2">
                            {locale === "id" ? featuredNews.title.id : featuredNews.title.en}
                          </h3>
                        </div>
                      </div>

                      {/* Interactive Corner Arrow */}
                      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white opacity-0 scale-75 translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-lg">
                        <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-5 h-5" />
                      </div>
                    </Link>

                    {/* RIGHT COLUMN (40% of width): Split Style (Entire block is clickable) */}
                    {gridNews.length > 0 && (
                      <Link
                        href={`/${locale}/insights/${gridNews[0].slug}`}
                        className="group md:col-span-2 flex flex-col justify-between w-full h-full min-h-[350px] sm:min-h-[400px] md:min-h-[420px]"
                      >
                        {/* Image Card Container */}
                        <div className="relative w-full h-[210px] sm:h-[250px] md:h-[270px] overflow-hidden rounded-xl md:rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-500 bg-slate-100">
                          {/* Image */}
                          <img
                            src={gridNews[0].image}
                            alt={locale === "id" ? gridNews[0].title.id : gridNews[0].title.en}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                        </div>

                        {/* Metadata and Title Underneath the Image Card */}
                        <div className="flex flex-col mt-6 md:mt-0">
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 tracking-wider">
                            <span>{locale === "id" ? gridNews[0].category_id : gridNews[0].category}</span>
                            <span className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
                            <span>{gridNews[0].date}</span>
                          </div>
                          <h3 className="mt-2.5 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-3">
                            {locale === "id" ? gridNews[0].title.id : gridNews[0].title.en}
                          </h3>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                )}

                {/* Rows 2 & 3: Standard Three-Column Grid */}
                {gridNews.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {gridNews.slice(1).map((news) => (
                      <motion.div
                        key={news.id}
                        variants={cardVariants}
                        className="flex flex-col"
                      >
                        <Link
                          href={`/${locale}/insights/${news.slug}`}
                          className="group flex flex-col w-full h-full"
                        >
                          {/* Image Card Container */}
                          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl md:rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-500 bg-slate-100">
                            {/* Image */}
                            <Image
                              src={news.image}
                              alt={locale === "id" ? news.title.id : news.title.en}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                          </div>

                          {/* Metadata and Title Underneath the Image Card */}
                          <div className="flex flex-col mt-6">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 tracking-wider">
                              <span>{locale === "id" ? news.category_id : news.category}</span>
                              <span className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
                              <span>{news.date}</span>
                            </div>
                            <h3 className="mt-2.5 text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-3">
                              {locale === "id" ? news.title.id : news.title.en}
                            </h3>
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
