"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import * as FreeIcons from "@hugeicons/core-free-icons";
import { SOLUTIONS_DATA } from "@/data/solutionsData";

// Safe dynamic icon resolver
const getIconComponent = (name: string) => {
  if (name in FreeIcons) {
    return FreeIcons[name as keyof typeof FreeIcons];
  }
  // Fallbacks
  if (name === "Send") return FreeIcons.SentIcon || FreeIcons.ArrowUpRight01Icon;
  if (name === "Activity") return FreeIcons.ActivityIcon || FreeIcons.Analytics01Icon;
  if (name === "MapPin") return FreeIcons.Location01Icon;
  if (name === "FileText") return FreeIcons.TaskDone01Icon;
  if (name === "CheckCircle") return FreeIcons.Tick01Icon;
  if (name === "Zap") return FreeIcons.FlashIcon;
  if (name === "Smartphone") return FreeIcons.SmartPhone01Icon;
  if (name === "Navigation") return FreeIcons.Navigation01Icon;
  if (name === "BarChart") return FreeIcons.Analytics01Icon;
  if (name === "PieChart") return FreeIcons.Analytics01Icon;
  if (name === "Users") return FreeIcons.UserGroupIcon || FreeIcons.UserIcon;
  if (name === "Eye") return FreeIcons.ViewIcon || FreeIcons.EyeIcon;
  if (name === "Cpu") return FreeIcons.CpuIcon;
  if (name === "Shield") return FreeIcons.ShieldIcon;
  if (name === "Thermometer") return (FreeIcons as any).TemperatureIcon || (FreeIcons as any).TemperatureCelsiusIcon || FreeIcons.PackageIcon;
  
  return FreeIcons.PackageIcon;
};

export default function SolutionsCatalogPage() {
  const t = useTranslations("solution");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Active globally connected telemetry status ticker simulation
  const [telemetryPulse, setTelemetryPulse] = useState({
    activeFsmTickets: 1482,
    activeIotGateways: 894,
    averageSlaAccuracy: "99.87%"
  });

  useEffect(() => {
    setIsMounted(true);
    // Dynamic ticker fluctuation
    const timer = setInterval(() => {
      setTelemetryPulse((prev) => ({
        activeFsmTickets: prev.activeFsmTickets + Math.floor(Math.random() * 5 - 2),
        activeIotGateways: prev.activeIotGateways + Math.floor(Math.random() * 3 - 1),
        averageSlaAccuracy: (99.8 + Math.random() * 0.15).toFixed(2) + "%"
      }));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Filter categories helper
  const categories = useMemo(() => [
    { id: "all", label: locale === "id" ? "Semua Solusi" : "All Solutions" },
    { id: "industry", label: locale === "id" ? "Solusi Industri" : "Industry Solutions" },
    { id: "technology", label: locale === "id" ? "Solusi Teknologi" : "Technology Solutions" },
    { id: "operational", label: locale === "id" ? "Solusi Operasional" : "Operational Solutions" }
  ], [locale]);

  // Filter solutions list
  const filteredSolutions = useMemo(() => {
    // Unique solutions lookup (prevent duplicate alternative paths like energy / energy-industry in the catalog grid)
    const uniqueSlugs = new Set();
    const uniqueList = SOLUTIONS_DATA.filter((item) => {
      if (item.slug === "energy-industry") return false; // Hide duplicate slug in main listing
      if (uniqueSlugs.has(item.slug)) return false;
      uniqueSlugs.add(item.slug);
      return true;
    });

    return uniqueList.filter((item) => {
      // Search matches
      const titleText = item.title[locale as "en" | "id"].toLowerCase();
      const descText = item.description[locale as "en" | "id"].toLowerCase();
      const badgeText = item.badge[locale as "en" | "id"].toLowerCase();
      const query = searchQuery.toLowerCase();
      
      const matchesSearch = titleText.includes(query) || descText.includes(query) || badgeText.includes(query);
      if (!matchesSearch) return false;

      // Category matches
      if (selectedCategory === "all") return true;
      if (selectedCategory === "industry") {
        return item.badge.en.includes("Industry") || item.layoutTemplate === "standard";
      }
      if (selectedCategory === "technology") {
        return item.badge.en.includes("Technology") || item.slug === "aiot" || item.slug === "analytics";
      }
      if (selectedCategory === "operational") {
        return item.badge.en.includes("Operation") || item.slug === "fsm" || item.slug === "asset-tracking";
      }
      return true;
    });
  }, [selectedCategory, searchQuery, locale]);

  return (
    <div className="bg-white min-h-screen text-[#100420] font-sans flex flex-col justify-between selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-grow pt-28 md:pt-36 pb-24 relative overflow-hidden">
        {/* Soft Background Accent Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-0" />
        <div className="absolute top-1/3 right-[-250px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 left-[-250px] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* --- HERO SECTION --- */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEEBEB] border border-[#FCD3D3] text-primary text-sm font-bold tracking-wide mb-6"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              {locale === "id" ? "Optimalkan & Skalakan Operasi" : "Optimize & Scale Operations"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#100420] mb-8"
            >
              {locale === "id" 
                ? "Solusi Strategis untuk Infrastruktur & Lapangan Cerdas"
                : "Strategic Solutions for Smart Field & Infrastructure"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-[#475569] font-normal leading-relaxed max-w-3xl mx-auto mb-10"
            >
              {locale === "id"
                ? "Hubungkan data lapangan, lacak pergerakan aset penting, deteksi anomali peralatan, dan otomatisasi alur kerja tim seluler Anda di satu dasbor terpusat."
                : "Seamlessly connect field telemetry data, map critical asset tracking pathways, predict equipment health anomaly curves, and empower field teams in one platform."}
            </motion.p>

            {/* Simulated Live Global Telemetry Ticker (Light Theme styled) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 max-w-2xl mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm text-xs font-mono text-slate-700"
            >
              <div className="flex flex-col items-center border-r border-slate-200 py-1">
                <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Live Dispatches</span>
                <span className="text-sm font-bold text-[#100420] mt-0.5">{telemetryPulse.activeFsmTickets} Tickets</span>
              </div>
              <div className="flex flex-col items-center border-r border-slate-200 py-1">
                <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Connected IoT</span>
                <span className="text-sm font-bold text-[#100420] mt-0.5">{telemetryPulse.activeIotGateways} Gateways</span>
              </div>
              <div className="flex flex-col items-center py-1">
                <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Avg SLA Accuracy</span>
                <span className="text-sm font-bold text-emerald-600 mt-0.5">{telemetryPulse.averageSlaAccuracy}</span>
              </div>
            </motion.div>
          </div>

          {/* --- SEARCH & CATEGORY FILTER BAR --- */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-16">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#100420]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Dynamic Search Box */}
            <div className="relative w-full md:w-80">
              <HugeiconsIcon 
                icon={FreeIcons.Search01Icon || FreeIcons.ViewIcon} 
                className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" 
              />
              <input
                type="text"
                placeholder={locale === "id" ? "Cari solusi..." : "Search solutions..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#100420] placeholder-slate-400 text-sm focus:outline-none focus:border-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* --- PORTFOLIO SOLUTIONS GRID --- */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredSolutions.map((item, index) => {
                const StrIcon = getIconComponent(item.coreStrengths[0]?.icon || "Package");
                return (
                  <motion.div
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/30 to-transparent pointer-events-none rounded-[32px]" />
                    
                    <div>
                      {/* Badge / Category Pill */}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded bg-[#FEEBEB] border border-[#FCD3D3] inline-block mb-6">
                        {item.badge[locale as "en" | "id"]}
                      </span>

                      {/* Icon & Title */}
                      <div className="flex gap-4 items-center mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                          <HugeiconsIcon icon={StrIcon} className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-[#100420] group-hover:text-primary transition-colors leading-snug">
                          {item.slug === "fsm" 
                            ? (locale === "id" ? "Field Service Management" : "Field Service Management") 
                            : item.title[locale as "en" | "id"].split(".")[0]}
                        </h3>
                      </div>

                      {/* Localized Short Description */}
                      <p className="text-sm text-slate-500 leading-relaxed mb-8">
                        {item.description[locale as "en" | "id"]}
                      </p>
                    </div>

                    {/* Stats details & CTA footer */}
                    <div>
                      {item.stats.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 mb-6">
                          {item.stats.slice(0, 2).map((stat, sIdx) => (
                            <div key={sIdx}>
                              <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider block mb-1">
                                {stat.label[locale as "en" | "id"]}
                              </span>
                              <span className="text-base font-extrabold text-[#100420] font-mono block">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <Link href={`/${locale}/solution/${item.slug}`}>
                        <Button className="w-full py-5 rounded-xl bg-white border border-slate-200 hover:bg-primary hover:text-white hover:border-primary text-[#100420] font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-md">
                          {locale === "id" ? "Pelajari Solusi" : "Explore Solution"}
                          <HugeiconsIcon 
                            icon={FreeIcons.ArrowRight01Icon} 
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                          />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty Search Fallback */}
          {filteredSolutions.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto mb-6">
                <HugeiconsIcon icon={FreeIcons.PackageIcon} className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#100420]">No solutions found</h3>
              <p className="text-slate-500 text-sm">Try tweaking your search term or selecting a different category filter.</p>
            </motion.div>
          )}
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
