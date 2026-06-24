"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Tick01Icon,
  Location01Icon,
  Home01Icon,
  Settings01Icon,
  UserIcon
} from "@hugeicons/core-free-icons";



export default function SolutionsOverviewPage() {
  const locale = useLocale();
  const tFooter = useTranslations("footer");

  // Content for both languages
  const columns = useMemo(() => [
    {
      title: "Managed Services",
      image: "/images/services/card05-managed.png",
      themeColor: "text-red-650 text-red-500",
      bgColor: "bg-red-500",
      iconBg: "bg-red-500/10",
      bulletColor: "#EF4444",
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bullets: locale === "id" ? [
        "Penyediaan Tenaga Kerja",
        "Staging & Deployment",
        "Manajemen Pengiriman",
        "Pemeliharaan Tingkat Dua",
        "Seat Management",
        "Pemeliharaan Lokasi",
        "Managed Services",
        "Layanan Terkelola Penuh"
      ] : [
        "Labor Outsourcing",
        "Staging & Deployment",
        "Delivery Management",
        "Second Level Maintenance",
        "Seat Management",
        "Site Maintenance",
        "Managed Services",
        "Full Managed Services"
      ],
      exploreHref: `/${locale}/our-solution?category=operational`
    },
    {
      title: "Hardware Solutions",
      image: "/images/solution_hardware.png",
      themeColor: "text-blue-600",
      bgColor: "bg-blue-500",
      iconBg: "bg-blue-500/10",
      bulletColor: "#3B82F6",
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bullets: locale === "id" ? [
        "Manajemen ATM & Kas",
        "Solusi POS & Pembayaran",
        "Kios & Terminal Mandiri",
        "IoT Gateway & Perangkat Edge",
        "Soundbox Pembayaran"
      ] : [
        "ATM & Cash Management",
        "POS & Payment Solutions",
        "Kiosk & Self-Service Terminal",
        "IoT Gateway & Edge Devices",
        "Soundbox"
      ],
      exploreHref: `/${locale}/our-solution?category=industry`
    },
    {
      title: "AIoT Solutions",
      image: "/images/solution_iot.png",
      themeColor: "text-emerald-650 text-emerald-600",
      bgColor: "bg-emerald-500",
      iconBg: "bg-emerald-500/10",
      bulletColor: "#10B981",
      icon: (
        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bullets: locale === "id" ? [
        "Pemantauan ATM AI",
        "Kepatuhan K3 (HSE) AI",
        "Kontrol Kualitas AI",
        "Platform Pemantauan Cerdas",
        "Sensor Pintar & Perangkat Edge",
        "Sistem Pemantauan Energi"
      ] : [
        "AI ATM Monitoring",
        "AI HSE Compliance",
        "AI Quality Control",
        "Smart Monitoring Platform",
        "Smart Sensors & Edge Devices",
        "Energy Monitoring System"
      ],
      exploreHref: `/${locale}/our-solution?category=technology`
    },
    {
      title: locale === "id" ? "Digital Advertising" : "Digital Advertising Solutions",
      image: "/images/product/padlock.jpeg",
      themeColor: "text-violet-600",
      bgColor: "bg-violet-500",
      iconBg: "bg-violet-500/10",
      bulletColor: "#8B5CF6",
      isAdColumn: true,
      icon: (
        <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      description: locale === "id"
        ? "Jangkau jutaan pengguna ponsel pintar Infinix, Tecno, dan itel melalui kampanye bertarget dengan CPC, CPM, CPA, dan lainnya untuk mendorong pertumbuhan bisnis nyata."
        : "Reach millions of Infinix, Tecno, and itel smartphone users through targeted campaigns with CPC, CPM, CPA, and more to drive real business growth.",
      badges: [
        { label: locale === "id" ? "Target Presisi" : "Precise Targeting", icon: "🎯" },
        { label: locale === "id" ? "Harga Fleksibel" : "Flexible Pricing", icon: "📊" },
        { label: locale === "id" ? "Jangkauan Luas" : "Massive Reach", icon: "👥" }
      ],
      exploreHref: `/${locale}/our-solution?category=technology`
    },
    {
      title: "Software Solutions",
      image: "/images/solution_software.png",
      themeColor: "text-rose-600",
      bgColor: "bg-rose-500",
      iconBg: "bg-rose-500/10",
      bulletColor: "#F43F5E",
      icon: (
        <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      bullets: locale === "id" ? [
        "Platform WILLOWMORE",
        "Manajemen Hubungan Pelanggan (CRM)",
        "Manajemen Operasi Lapangan",
        "Manajemen Inventaris & Aset",
        "Dashboard Eksekutif & Analitik"
      ] : [
        "WILLOWMORE Platform",
        "CRM & Sales Management",
        "Field Operations Management",
        "Inventory & Asset Management",
        "Executive Dashboard & Analytics"
      ],
      exploreHref: `/${locale}/our-solution?category=technology`
    }
  ], [locale]);

  return (
    <div className="bg-slate-50 min-h-screen text-[#0f172a] font-sans flex flex-col justify-between selection:bg-primary selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
      `}} />
      <Navbar theme="light" />

      {/* Main Container */}
      <main className="flex-grow pt-24 md:pt-32 pb-24 relative overflow-hidden">
        {/* World Connection Network Map SVG in Top Right */}
        <div className="absolute top-10 right-0 w-[45%] opacity-15 pointer-events-none select-none hidden lg:block z-0">
          <svg viewBox="0 0 800 400" fill="none" stroke="#2563eb" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="100" r="4" fill="#2563eb" />
            <circle cx="450" cy="70" r="4" fill="#2563eb" />
            <circle cx="600" cy="180" r="4" fill="#2563eb" />
            <circle cx="350" cy="240" r="4" fill="#2563eb" />
            <circle cx="150" cy="300" r="4" fill="#2563eb" />
            <path d="M200 100 L450 70 L600 180 L350 240 L150 300 L200 100 L350 240 L450 70 M200 100 L350 240" />
            <circle cx="300" cy="150" r="3" fill="#ef4444" />
            <circle cx="500" cy="220" r="3" fill="#ef4444" />
            <line x1="300" y1="150" x2="450" y2="70" stroke="#ef4444" />
            <line x1="300" y1="150" x2="350" y2="240" stroke="#ef4444" />
            <line x1="500" y1="220" x2="600" y2="180" stroke="#ef4444" />
          </svg>
        </div>

        {/* Header Block Container - standard max-w-7xl */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12">
          {/* Header Block */}
          <div className="flex flex-col gap-4 md:gap-6 text-left">
            <div className="flex items-center gap-2 select-none">
              <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
                {locale === "id" ? "EKOSISTEM TEKNOLOGI KAMI" : "OUR TECHNOLOGY ECOSYSTEM"}
              </span>
            </div>
            <h1 className="text-3xl md:text-[40px] font-semibold text-slate-900 tracking-tight max-w-3xl leading-tight">
              {locale === "id" ? "Ekosistem Teknologi Terpadu Kami" : "Our Unified Technology Ecosystem"}
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed">
              {locale === "id"
                ? "Solusi terintegrasi, teknologi canggih, dan layanan andal untuk mempercepat transformasi bisnis Anda."
                : "Integrated solutions, powerful technologies, and reliable services to accelerate your business transformation."}
            </p>
          </div>
        </div>

        {/* 5-Column Solutions Grid Container - Widened to 1440px to extend beyond the layout boundaries */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative z-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {columns.map((col, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 85, damping: 15, delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)] hover:border-blue-500/20 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 flex flex-col justify-between overflow-hidden group min-h-[520px]"
              >
                <div>
                  {/* Top Image Frame */}
                  <div className="h-[170px] w-full relative overflow-hidden">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-900/10 pointer-events-none" />
                    
                    {/* Floating Icon */}
                    {/* <div className={`absolute top-4 left-4 w-9 h-9 rounded-xl ${col.iconBg} backdrop-blur-md bg-white flex items-center justify-center shadow-md`}>
                      {col.icon}
                    </div> */}

                    {/* Image Branding for Ad Column */}
                    {col.isAdColumn && (
                      <div className="absolute top-4 right-4 flex flex-col gap-1 items-end bg-black/40 px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
                        <span className="text-[7.5px] text-white/95 font-bold tracking-widest font-mono">Infinix</span>
                        <span className="text-[7.5px] text-white/95 font-bold tracking-widest font-mono">TECNO</span>
                        <span className="text-[7.5px] text-white/95 font-bold tracking-widest font-mono">itel</span>
                      </div>
                    )}

                    {/* Overlay Title */}
                    <h3 className="absolute bottom-4 left-5 text-white text-lg md:text-xl font-bold tracking-tight leading-tight select-none">
                      {col.title}
                    </h3>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {col.isAdColumn ? (
                      /* Ad Column Text & Badges */
                      <div className="space-y-4">
                        <p className="text-slate-600 text-xs leading-relaxed font-normal">
                          {col.description}
                        </p>
                        <div className="space-y-2.5 pt-2">
                          {col.badges?.map((badge, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors duration-200">
                              <span className="text-sm shrink-0">{badge.icon}</span>
                              <span className="text-[11.5px] font-bold text-slate-700">{badge.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Standard Bullets List */
                      <ul className="space-y-3.5">
                        {col.bullets?.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-2.5 items-start text-[13px] text-slate-650 leading-relaxed font-medium">
                            <span className="mt-0.5 shrink-0 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-slate-50 border border-slate-100">
                              <HugeiconsIcon icon={Tick01Icon} className="w-3 h-3" style={{ color: col.bulletColor }} />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="p-6 pt-0 mt-auto">
                  <Link
                    href={col.exploreHref}
                    className={`inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 hover:border-slate-200 transition-all duration-300 ${col.themeColor} group/btn`}
                  >
                    <span>{locale === "id" ? "Jelajahi Solusi" : "Explore Solutions"}</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats, Map & Partnership Details Container - standard max-w-7xl */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* --- STATUS STATS BAR (Middle Bar) --- */}
          <div className="mt-20 bg-white border border-slate-100 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 md:p-12 relative overflow-hidden group">
            {/* Soft decorative background glows */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Heading and Info */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  {locale === "id" ? "Solusi End-to-End. Dukungan Nasional." : "End-to-End Solutions. Nationwide Support."}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                  {locale === "id"
                    ? "Dari teknologi hingga operasional, kami mengirimkan solusi terintegrasi dan layanan andal yang menjaga bisnis Anda tetap berjalan—di mana saja di Indonesia."
                    : "From technology to operations, we deliver integrated solutions and reliable services that keep your business running—anywhere in Indonesia."}
                </p>
              </div>

              {/* Right Column: Stat Cards Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full">
                {/* Card 1 */}
                <div className="bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-100 hover:border-red-500/10 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_30px_rgba(239,68,68,0.06)] hover:-translate-y-1 group/stat">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center shadow-sm group-hover/stat:scale-110 transition-transform duration-300">
                    <HugeiconsIcon icon={Location01Icon} className="w-6 h-6" />
                  </div>
                  <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-4 font-mono">188+</span>
                  <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 whitespace-nowrap">
                    {locale === "id" ? "Titik Layanan" : "Service Points"}
                  </span>
                </div>

                {/* Card 2 */}
                <div className="bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-100 hover:border-emerald-500/10 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_30px_rgba(16,185,129,0.06)] hover:-translate-y-1 group/stat">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-sm group-hover/stat:scale-110 transition-transform duration-300">
                    <HugeiconsIcon icon={Home01Icon} className="w-6 h-6" />
                  </div>
                  <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-4 font-mono">36+</span>
                  <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 whitespace-nowrap">
                    {locale === "id" ? "Gudang" : "Warehouses"}
                  </span>
                </div>

                {/* Card 3 */}
                <div className="bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-100 hover:border-blue-500/10 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_30px_rgba(59,130,246,0.06)] hover:-translate-y-1 group/stat">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-sm group-hover/stat:scale-110 transition-transform duration-300">
                    <HugeiconsIcon icon={Settings01Icon} className="w-6 h-6" />
                  </div>
                  <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-4 font-mono">9+</span>
                  <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 whitespace-nowrap">
                    {locale === "id" ? "Pusat Perbaikan" : "Repair Centers"}
                  </span>
                </div>

                {/* Card 4 */}
                <div className="bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-100 hover:border-violet-500/10 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_30px_rgba(139,92,246,0.06)] hover:-translate-y-1 group/stat">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center shadow-sm group-hover/stat:scale-110 transition-transform duration-300">
                    <HugeiconsIcon icon={UserIcon} className="w-6 h-6" />
                  </div>
                  <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-4 font-mono">500+</span>
                  <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 whitespace-nowrap">
                    {locale === "id" ? "Teknisi Lapangan" : "Field Engineers"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- STRATEGIC PARTNERSHIPS BAR (Bottom Bar) --- */}
          <div className="mt-16 border-t border-slate-200/60 pt-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-left shrink-0">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                {locale === "id" ? "Kemitraan Strategis" : "Strategic Partnerships"}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mt-2 font-normal">
                {locale === "id"
                  ? "Kemitraan kuat yang memberdayakan inovasi, memperluas jangkauan, dan menciptakan dampak lebih besar."
                  : "Strong partnerships that empower innovation, expand reach, and create greater impact."}
              </p>
            </div>

            {/* Logo List Marquee Wrapper with fading gradients on boundaries */}
            <div className="relative flex-grow overflow-hidden max-w-full lg:max-w-xl xl:max-w-2xl py-2">
              {/* Fade overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 via-slate-50/70 to-transparent z-10 pointer-events-none" />
              
              {/* Marquee viewport */}
              <div className="overflow-hidden w-full">
                <div className="animate-marquee-infinite gap-x-12 select-none">
                  {/* Set 1 */}
                  <div className="flex items-center gap-x-12 shrink-0">
                    <img src="/images/partnership/willowmore.png" alt="Willowmore" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/transsion.png" alt="Transsion" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/sunmi.png" alt="Sunmi" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/gnd.png" alt="Giesecke+Devrient" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/ma.png" alt="Masterwork" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/telpo.png" alt="Telpo" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/aisino.png" alt="Aisino" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                  </div>
                  {/* Set 2 (Duplicate for seamless loop) */}
                  <div className="flex items-center gap-x-12 shrink-0">
                    <img src="/images/partnership/willowmore.png" alt="Willowmore" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/transsion.png" alt="Transsion" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/sunmi.png" alt="Sunmi" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/gnd.png" alt="Giesecke+Devrient" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/ma.png" alt="Masterwork" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/telpo.png" alt="Telpo" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                    <img src="/images/partnership/aisino.png" alt="Aisino" className="h-5 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.08]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer
        showCta={true}
        ctaTitle={tFooter("cta.solutionTitle")}
        ctaButtonText={tFooter("cta.solutionButton")}
        ctaButtonHref="/contact"
      />
    </div>
  );
}
