"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Search01Icon, 
  ArrowUpRight01Icon,
  CircleArrowRightIcon,
  Briefcase01Icon,
  Location01Icon,
  FilterIcon
} from "@hugeicons/core-free-icons";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CAREERS_DATA, CareerItem } from "@/data/careersData";

export default function CareersPage() {
  const locale = useLocale();
  const t = useTranslations("careers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  // Get all unique departments for tab filtering
  const departments = useMemo(() => {
    const depts = new Set<string>();
    CAREERS_DATA.forEach(item => {
      depts.add(item.department[locale as "en" | "id"]);
    });
    return ["All", ...Array.from(depts)];
  }, [locale]);

  // Filter careers dynamically based on search query & department selection
  const filteredCareers = useMemo(() => {
    return CAREERS_DATA.filter((job) => {
      const title = job.title[locale as "en" | "id"].toLowerCase();
      const department = job.department[locale as "en" | "id"].toLowerCase();
      const location = job.location[locale as "en" | "id"].toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesSearch = title.includes(query) || department.includes(query) || location.includes(query);
      const matchesDept = selectedDept === "All" || job.department[locale as "en" | "id"] === selectedDept;

      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept, locale]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <Navbar />

      <main className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-16 md:gap-20">
          
          {/* 1. Hero Team Banner Container */}
          <div className="relative w-full h-[360px] md:h-[420px] rounded-[32px] overflow-hidden flex flex-col justify-center items-center p-6 text-center shadow-lg border border-slate-100">
            {/* Darkened group image overlay background */}
            <Image 
              src="/images/usecase_main.png" 
              alt="MIB Group Team Banner" 
              fill 
              priority
              className="object-cover transition-transform duration-1000 scale-105"
            />
            <div className="absolute inset-0 bg-[#100420]/75 backdrop-blur-[2px]" />

            {/* Inner Content */}
            <div className="relative z-10 max-w-4xl flex flex-col items-center gap-6">
              <h1 className="text-3xl md:text-[40px] font-semibold text-white tracking-tight leading-tight whitespace-pre-line">
                {t("bannerTitle")}
              </h1>
              
              <Link 
                href={`/${locale}#faq`} 
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white text-white font-bold transition-all hover:scale-105"
              >
                <span>{t("bannerBtn")}</span>
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* 2. Headline & Dynamic Job Board */}
          <div className="flex flex-col gap-12">
            
            {/* Title & Desc */}
            <div className="flex flex-col gap-4 max-w-4xl">
              <h2 className="text-3xl md:text-[40px] font-semibold text-[#100420] tracking-tight leading-tight">
                {t("title")}
              </h2>
              <p className="text-lg text-[#475569] font-normal leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            {/* Real-time Search input */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] flex items-center px-4 py-3 shadow-sm hover:border-[#cbd5e1] focus-within:border-[#100420] focus-within:shadow-md transition-all">
              <HugeiconsIcon icon={Search01Icon} className="w-6 h-6 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-lg text-slate-900 bg-transparent placeholder-slate-400 border-none outline-none focus:ring-0"
              />
            </div>

            {/* Department Tab Filter & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
              {/* Tabs list */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {departments.map((dept) => {
                  const isActive = selectedDept === dept;
                  return (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`px-5 py-2 rounded-full text-base font-semibold transition-all shrink-0 border ${
                        isActive 
                          ? "text-white bg-[#100420] border-[#100420] shadow-sm" 
                          : "text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900 border-slate-200"
                      }`}
                    >
                      {dept === "All" ? (locale === "id" ? "Semua" : "All") : dept}
                    </button>
                  );
                })}
              </div>

              {/* Stats count */}
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <HugeiconsIcon icon={FilterIcon} className="w-4 h-4 text-slate-400" />
                <span>
                  {filteredCareers.length === 1 
                    ? t("jobFoundSingular") 
                    : t("jobFoundPlural", { count: filteredCareers.length })}
                </span>
              </div>
            </div>

            {/* 3. Job Vacancies Interactive Row List */}
            <AnimatePresence mode="wait">
              {filteredCareers.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-slate-100 text-center px-6"
                >
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm text-slate-300">
                    <HugeiconsIcon icon={Briefcase01Icon} className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#100420] mb-2">{t("noJobs")}</h3>
                  <p className="text-slate-500 max-w-md">{t("noJobsDesc")}</p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedDept + searchQuery}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col"
                >
                  {filteredCareers.map((job) => (
                    <motion.div
                      key={job.id}
                      variants={itemVariants}
                      className="border-b border-[#e5e7eb] py-6 first:pt-2 last:border-b-0 hover:bg-slate-50/50 transition-colors group rounded-2xl px-4 -mx-4"
                    >
                      <Link 
                        href={`/${locale}/careers/${job.slug}`}
                        className="flex items-center justify-between gap-6"
                      >
                        {/* Title & metadata column */}
                        <div className="flex flex-col gap-2 items-start">
                          <h3 className="text-xl md:text-2xl font-bold text-[#090914] group-hover:text-primary transition-colors leading-tight">
                            {job.title[locale as "en" | "id"]}
                          </h3>
                          
                          {/* Metadata row */}
                          <div className="flex items-center gap-3 text-slate-400 text-base md:text-lg">
                            <span className="flex items-center gap-1.5 font-medium text-slate-500">
                              <HugeiconsIcon icon={Briefcase01Icon} className="w-4 h-4 text-slate-400" />
                              {job.department[locale as "en" | "id"]}
                            </span>
                            
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f22929] shrink-0" />
                            
                            <span className="flex items-center gap-1.5 text-slate-400">
                              <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-slate-400" />
                              {job.location[locale as "en" | "id"]}
                            </span>

                            <span className="hidden md:inline w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                            
                            <span className="hidden md:inline px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
                              {job.type[locale as "en" | "id"]}
                            </span>
                          </div>
                        </div>

                        {/* Arrow Link Button */}
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:scale-110 transition-all shrink-0">
                          <HugeiconsIcon icon={CircleArrowRightIcon} className="w-10 h-10" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </main>

      <Footer showCta={true} />
    </div>
  );
}
