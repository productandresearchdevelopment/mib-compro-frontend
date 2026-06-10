"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Search01Icon, PackageIcon } from "@hugeicons/core-free-icons";

interface SolutionCard {
  slug: string;
  categoryKey: "industry" | "technology" | "operational";
  navTitle: string;
  badge: string;
  title: string;
  description: string;
  image: string;
}

export default function SolutionsCatalogPage() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [activeCard, setActiveCard] = useState("fsm");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = useMemo(() => [
    { id: "all", label: locale === "id" ? "Semua Solusi" : "All Solutions" },
    { id: "industry", label: locale === "id" ? "Solusi Industri" : "Industry Solutions" },
    { id: "technology", label: locale === "id" ? "Solusi Teknologi" : "Technology Solutions" },
    { id: "operational", label: locale === "id" ? "Solusi Operasional" : "Operational Solutions" }
  ], [locale]);

  const displaySolutions: SolutionCard[] = useMemo(() => {
    const dataMap: Record<string, { categoryKey: "industry" | "technology" | "operational"; navTitle: { en: string; id: string }; title: { en: string; id: string }; desc: { en: string; id: string }; badge: { en: string; id: string }; image: string }> = {
      fsm: {
        categoryKey: "operational",
        navTitle: { en: "Field Service Management", id: "Manajemen Operasi Lapangan" },
        title: {
          en: "Smart Field Service & Operations Management",
          id: "Manajemen Operasional Lapangan & Teknisi Cerdas"
        },
        badge: { en: "Field Operations", id: "Operasional Lapangan" },
        desc: {
          en: "Managing field operations requires speed, coordination, and real-time visibility. Our system helps you assign tasks, track teams, and automate reporting in one platform.",
          id: "Mengelola operasional lapangan membutuhkan kecepatan, koordinasi, dan visibilitas real-time secara bersamaan. Sistem kami membantu Anda menetapkan tugas, melacak tim, dan mengotomatiskan pelaporan dalam satu platform."
        },
        image: "/images/preview_video_bg.png"
      },
      aiot: {
        categoryKey: "technology",
        navTitle: { en: "AIoT", id: "AIoT" },
        title: {
          en: "Artificial Intelligence & Connected IoT",
          id: "Kecerdasan Buatan & Internet of Things"
        },
        badge: { en: "Technology Solutions", id: "Solusi Teknologi" },
        desc: {
          en: "Deploy smart machine sensors, process edge-computing values, and trigger automated operational actions in real time for boundless efficiency.",
          id: "Terapkan sensor mesin cerdas, proses nilai komputasi tepi (edge computing), dan picu tindakan operasional otomatis secara real-time untuk efisiensi tak terbatas."
        },
        image: "/images/prod_iot.png"
      },
      "asset-tracking": {
        categoryKey: "operational",
        navTitle: { en: "Asset Tracking", id: "Pelacakan Aset" },
        title: {
          en: "Next-Gen Asset Tracking & Geolocation Telemetry",
          id: "Pelacakan Aset Generasi Baru & Telemetri"
        },
        badge: { en: "Operational Solutions", id: "Solusi Operasional" },
        desc: {
          en: "Track locations of industrial machines, container cargo, and fleet vehicles in real time with compact rugged GPS transceivers.",
          id: "Lacak lokasi mesin industri, kargo kontainer, dan armada kendaraan secara real-time dengan pemancar GPS kokoh yang ringkas."
        },
        image: "/images/usecase_logistics.png"
      },
      analytics: {
        categoryKey: "technology",
        navTitle: { en: "Reporting & Analytics", id: "Pelaporan & Analitik" },
        title: {
          en: "Enterprise Reporting & Interactive Analytics",
          id: "Pelaporan Perusahaan & Analitik Dasbor Interaktif"
        },
        badge: { en: "Enterprise Intelligence", id: "Kecerdasan Perusahaan" },
        desc: {
          en: "Translate field telemetry inputs and technician logs into actionable executive dashboards and automated optimization schedules.",
          id: "Terjemahkan masukan telemetri lapangan dan log teknisi menjadi dasbor eksekutif yang dapat ditindaklanjuti dan jadwal optimasi otomatis."
        },
        image: "/images/prod_fsm.png"
      },
      manufacturing: {
        categoryKey: "industry",
        navTitle: { en: "Smart Factory", id: "Pabrik Pintar" },
        title: {
          en: "Predictive Maintenance & Smart Factory Infrastructure",
          id: "Pemeliharaan Prediktif & Operasional Pabrik Pintar"
        },
        badge: { en: "Industry Solutions", id: "Solusi Industri" },
        desc: {
          en: "Connect manufacturing equipment to centralized dashboards, detect operational anomalies early, and schedule routine maintenance automatically.",
          id: "Hubungkan peralatan manufaktur ke dasbor terpusat, deteksi anomali operasional sejak dini, dan jadwalkan pemeliharaan secara otomatis."
        },
        image: "/images/why-choose-us.jpg"
      },
      "energy-industry": {
        categoryKey: "industry",
        navTitle: { en: "Energy & Utilities", id: "Energi & Utilitas" },
        title: {
          en: "Unified Remote Infrastructure & Smart Grid Control",
          id: "Infrastruktur Jarak Jauh Terpadu & Utilitas Pintar"
        },
        badge: { en: "Industry Solutions", id: "Solusi Industri" },
        desc: {
          en: "Oversee gas, power grid, and water distribution networks with rugged industrial telemetry gateways and automatic alert thresholds.",
          id: "Pantau jaringan gas, listrik, dan distribusi air dengan gerbang telemetri industri yang kokoh dan ambang batas peringatan otomatis."
        },
        image: "/images/about-us.jpg"
      },
      banking: {
        categoryKey: "industry",
        navTitle: { en: "Banking Systems", id: "Sistem Perbankan" },
        title: {
          en: "Secure & High-Speed Systems for Banking Operations",
          id: "Sistem Teknologi Aman & Cepat untuk Operasional Perbankan"
        },
        badge: { en: "Industry Solutions", id: "Solusi Industri" },
        desc: {
          en: "Enhance transaction processing speeds, maximize data security compliance, and automate resource coordination across branch counter networks.",
          id: "Tingkatkan kecepatan pemrosesan transaksi, maksimalkan kepatuhan keamanan data, dan otomatisasi koordinasi sumber daya di seluruh jaringan loket kantor cabang."
        },
        image: "/images/usecase_main.png"
      },
      logistics: {
        categoryKey: "industry",
        navTitle: { en: "Fleet & Logistics", id: "Armada & Logistik" },
        title: {
          en: "Fleet Performance & Real-Time Logistics Optimization",
          id: "Armada & Logistik Optimasi Real-Time"
        },
        badge: { en: "Industry Solutions", id: "Solusi Industri" },
        desc: {
          en: "Track vehicle positions live, optimize delivery dispatches routes, and guarantee cold chain cargo integrity with smart IoT sensors.",
          id: "Lacak posisi kendaraan secara langsung, optimalkan rute pengiriman, dan jamin integritas kargo rantai dingin dengan sensor IoT cerdas."
        },
        image: "/images/preview_video_bg.png"
      }
    };

    return Object.entries(dataMap).map(([slug, details]) => ({
      slug,
      categoryKey: details.categoryKey,
      navTitle: details.navTitle[locale as "en" | "id"],
      title: details.title[locale as "en" | "id"],
      badge: details.badge[locale as "en" | "id"],
      description: details.desc[locale as "en" | "id"],
      image: details.image
    }));
  }, [locale]);

  const filteredSolutions = useMemo(() => {
    return displaySolutions.filter((item) => {
      let matchesCategory = true;
      if (selectedCategory !== "all") {
        matchesCategory = item.categoryKey === selectedCategory;
      }

      let matchesSearch = true;
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const titleText = item.title.toLowerCase();
        const descText = item.description.toLowerCase();
        const badgeText = item.badge.toLowerCase();
        const navTitleText = item.navTitle.toLowerCase();
        
        matchesSearch = titleText.includes(query) || 
                        descText.includes(query) || 
                        badgeText.includes(query) || 
                        navTitleText.includes(query);
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, displaySolutions]);

  // Render glassmorphic progress gauge helper
  const renderGauge = (percentage: number, scoreText: string, label: string, desc: string) => {
    const radius = 50;
    const strokeWidth = 10;
    const circumference = Math.PI * radius; // 157.08
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-white flex flex-col items-center justify-center w-52 shadow-2xl z-20"
      >
        <div className="relative w-28 h-16 flex items-center justify-center">
          <svg className="w-28 h-28 absolute top-0" viewBox="0 0 120 120">
            <path
              d="M 10 70 A 50 50 0 0 1 110 70"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d="M 10 70 A 50 50 0 0 1 110 70"
              fill="none"
              stroke="#bef264"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1s ease-in-out"
              }}
            />
          </svg>
          <div className="absolute bottom-2 flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight">{scoreText}</span>
          </div>
        </div>
        <div className="text-center mt-3 space-y-1 select-none">
          <span className="text-xs font-bold uppercase tracking-wider block text-white/90">{label}</span>
          <span className="text-[10px] text-white/60 block font-normal leading-tight">{desc}</span>
        </div>
      </motion.div>
    );
  };

  // Popular solutions for the expanding cards accordion
  const popularSlides = useMemo(() => [
    {
      slug: "fsm",
      badge: locale === "id" ? "OPERASIONAL LAPANGAN" : "FIELD OPERATIONS",
      title: locale === "id" 
        ? "Smart Field Service & Operations" 
        : "Smart Field Service & Operations",
      desc: locale === "id"
        ? "Mengelola operasional lapangan secara terpusat, merampingkan penugasan, dan mempercepat respons tugas teknisi."
        : "Manage field dispatches centrally, streamline assignments, and accelerate technician response rates.",
      image: "/images/preview_video_bg.png",
      gauge: renderGauge(88, "88%", locale === "id" ? "Penyelesaian Tugas" : "Task Completion", locale === "id" ? "Kinerja tim lapangan optimal" : "Optimal field performance")
    },
    {
      slug: "aiot",
      badge: locale === "id" ? "SOLUSI TEKNOLOGI" : "TECHNOLOGY SOLUTIONS",
      title: locale === "id"
        ? "Artificial Intelligence & Connected IoT"
        : "Artificial Intelligence & Connected IoT",
      desc: locale === "id"
        ? "Koneksikan telemetri sensor pintar untuk analisis getaran mesin secara langsung dan otomatisasi ambang batas cerdas."
        : "Connect smart sensor telemetry live for predictive vibrational analysis and automated thresholds.",
      image: "/images/prod_iot.png",
      gauge: renderGauge(57, "57/100", locale === "id" ? "Kesehatan Mesin" : "Machine Health", locale === "id" ? "Skor getaran mesin normal" : "Normal vibration telemetry")
    },
    {
      slug: "asset-tracking",
      badge: locale === "id" ? "SOLUSI OPERASIONAL" : "OPERATIONAL SOLUTIONS",
      title: locale === "id"
        ? "Next-Gen Asset Tracking & Telemetry"
        : "Next-Gen Asset Tracking & Telemetry",
      desc: locale === "id"
        ? "Pantau posisi geografis unit kargo dan armada kendaraan secara langsung pada peta interaktif dengan sensor GPS."
        : "Pinpoint valuable cargo and fleet machinery locations in real time on interactive maps with rugged transceivers.",
      image: "/images/usecase_logistics.png",
      gauge: renderGauge(98, "98%", locale === "id" ? "Akurasi Rute" : "Route Accuracy", locale === "id" ? "Armada dalam koridor aman" : "Fleet on safe corridors")
    },
    {
      slug: "analytics",
      badge: locale === "id" ? "KECERDASAN PERUSAHAAN" : "ENTERPRISE INTELLIGENCE",
      title: locale === "id"
        ? "Enterprise Reporting & Dashboards"
        : "Enterprise Reporting & Dashboards",
      desc: locale === "id"
        ? "Terjemahkan masukan telemetri lapangan dan log teknisi menjadi dasbor eksekutif interaktif yang mudah dipahami."
        : "Translate field telemetry inputs and technician logs into actionable executive dashboards and automated schedules.",
      image: "/images/prod_fsm.png",
      gauge: renderGauge(92, "92%", locale === "id" ? "Akurasi SLA" : "SLA Accuracy", locale === "id" ? "Pelaporan waktu nyata teratur" : "Real-time dispatch schedules")
    }
  ], [locale]);

  return (
    <div className="bg-white min-h-screen text-[#100420] font-sans flex flex-col justify-between selection:bg-primary selection:text-white">
      <Navbar theme="light" />

      <main className="flex-grow pt-28 md:pt-36 pb-32 relative">
        {/* Modern Accent Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* --- HERO SECTION (Modern Split Grid) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                {locale === "id" ? "Jelajahi Solusi Terbaik Kami" : "Explore Our Solutions"}
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p className="text-slate-600 text-lg leading-relaxed font-normal">
                {locale === "id"
                  ? "Hubungkan data lapangan, lacak pergerakan aset penting, deteksi anomali peralatan, dan otomatisasi alur kerja tim seluler Anda di satu dasbor terpusat."
                  : "Seamlessly connect field telemetry data, map critical asset tracking pathways, predict equipment health anomaly curves, and empower field teams in one platform."}
              </p>
            </div>
          </div>

          {/* --- EXPANDING ACCORDION CARDS (POPULAR SOLUTIONS) --- */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row gap-4 w-full h-[650px] md:h-[450px] lg:h-[480px]">
              {popularSlides.map((slide) => {
                const isActive = activeCard === slide.slug;
                return (
                  <motion.div
                    key={slide.slug}
                    layout
                    onClick={() => setActiveCard(slide.slug)}
                    className={`relative rounded-[24px] overflow-hidden flex flex-col justify-end p-6 md:p-8 cursor-pointer border border-slate-100 transition-all duration-500 group select-none ${
                      isActive 
                        ? "flex-[3.5] sm:flex-[4] lg:flex-[4.5] shadow-xl border-slate-200" 
                        : "flex-[1] shadow-sm bg-slate-900 border-transparent hover:shadow-md"
                    }`}
                  >
                    {/* Background Image */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    
                    {/* Dark/Gradient Overlay */}
                    <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${
                      isActive 
                        ? "bg-gradient-to-t from-black/90 via-black/45 to-black/15 opacity-100" 
                        : "bg-black/60 group-hover:bg-black/50 opacity-100"
                    }`} />

                    {/* Content Area */}
                    <div className="relative z-20 w-full text-white flex flex-col justify-between h-full pointer-events-none">
                      
                      {/* Top content (Only visible when active) */}
                      <div className={`transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none absolute"}`}>
                        <span className="text-[10px] sm:text-xs font-bold tracking-wider opacity-90 block uppercase bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 w-fit">
                          {slide.badge}
                        </span>
                      </div>

                      {/* Bottom / Middle content */}
                      <div className="mt-auto space-y-3">
                        <h3 className={`font-extrabold leading-tight tracking-tight transition-all duration-350 ${
                          isActive 
                            ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl" 
                            : "text-base sm:text-lg md:text-xl line-clamp-3"
                        }`}>
                          {slide.title}
                        </h3>
                        
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.85, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="text-xs sm:text-sm leading-relaxed max-w-xl font-normal hidden sm:block"
                          >
                            {slide.desc}
                          </motion.p>
                        )}
                        
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="pt-2 pointer-events-auto animate-fade-in"
                          >
                            <Link href={`/${locale}/solution/${slide.slug}`}>
                              <Button className="bg-[#bef264] hover:bg-[#a3e635] text-[#020b05] font-bold px-5 py-2.5 rounded-xl text-xs md:text-sm transition-all shadow-md flex items-center gap-1.5 border border-transparent cursor-pointer">
                                <span>{locale === "id" ? "Pelajari Solusi" : "Explore Solution"}</span>
                                <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
                              </Button>
                            </Link>
                          </motion.div>
                        )}
                      </div>

                      {/* Floating Glassmorphic Progress Gauge Overlay (Active Card Only, on Desktop) */}
                      {isActive && slide.gauge && (
                        <div className="absolute right-0 bottom-0 pointer-events-auto hidden lg:block">
                          {slide.gauge}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* --- TWO-COLUMN STORIES WORKSPACE --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sticky Sidebar (Search & Categories) */}
            <div className="lg:col-span-4 lg:sticky lg:top-[120px] space-y-8 pr-4 h-fit pb-10 lg:pb-0">
              {/* Search Box */}
              <div className="relative w-full">
                <HugeiconsIcon 
                  icon={Search01Icon} 
                  className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" 
                />
                <input
                  type="text"
                  placeholder={locale === "id" ? "Cari solusi..." : "Search solutions..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 rounded-full border border-slate-200 text-[#100420] placeholder-slate-400 text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-350 transition-all shadow-sm"
                />
              </div>

              {/* Categories list */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                  {locale === "id" ? "Kategori" : "Categories"}
                </h3>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center text-left py-1.5 text-base font-semibold transition-all cursor-pointer select-none ${
                          isActive 
                            ? "text-slate-900 font-bold" 
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {isActive ? (
                          <span className="w-2 h-2 bg-primary rounded-[1.5px] mr-2.5 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 mr-2.5 shrink-0" />
                        )}
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Storytelling Solutions Showcase Column (2-Column Grid) */}
            <div className="lg:col-span-8">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredSolutions.map((sol) => (
                    <motion.div
                      key={sol.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="group flex flex-col justify-between h-full"
                    >
                      <Link 
                        href={`/${locale}/solution/${sol.slug}`}
                        className="flex flex-col w-full"
                      >
                        {/* Featured Image */}
                        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 mb-5 group-hover:shadow-md transition-shadow duration-300">
                          <img
                            src={sol.image}
                            alt={sol.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          />
                        </div>

                        {/* Category Badge */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 tracking-wider mb-2">
                          <span>{sol.badge}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-[#100420] tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {sol.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-500 leading-relaxed font-normal line-clamp-3 mb-4">
                          {sol.description}
                        </p>
                      </Link>

                      {/* Explore Solution Button Link */}
                      <Link 
                        href={`/${locale}/solution/${sol.slug}`}
                        className="inline-flex items-center gap-1.5 text-slate-700 font-bold hover:text-primary transition-colors text-sm w-fit group/btn mt-auto"
                      >
                        <span>{locale === "id" ? "Pelajari Solusi" : "Explore Solution"}</span>
                        <HugeiconsIcon 
                          icon={ArrowRight01Icon} 
                          className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                        />
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty Search Fallback */}
              {filteredSolutions.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-400 mx-auto mb-4 shadow-sm">
                    <HugeiconsIcon icon={PackageIcon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-[#100420]">
                    {locale === "id" ? "Solusi tidak ditemukan" : "No solutions found"}
                  </h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto px-6">
                    {locale === "id" 
                      ? "Coba ubah kata kunci pencarian Anda atau pilih kategori lain."
                      : "Try tweaking your search term or selecting a different category filter."}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
