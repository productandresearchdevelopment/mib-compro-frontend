"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Shield, 
  Mic, 
  LayoutDashboard, 
  Zap, 
  Cpu, 
  BatteryCharging, 
  Landmark, 
  Factory, 
  Truck,
  ArrowRight,
  Store,
  Wrench,
  Megaphone
} from "lucide-react";

interface SolutionsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function SolutionsMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: SolutionsMegaMenuProps) {
  const locale = useLocale();
  const baseHref = `/${locale}`;

  const INDUSTRIES_CARDS = [
    {
      name: { en: "Banking", id: "Perbankan" },
      desc: {
        en: "ATM security, Cash Deposit solutions, payment platforms, and smart EDC transactions.",
        id: "Keamanan ATM, solusi Cash Deposit, platform pembayaran, dan transaksi EDC pintar."
      },
      icon: Landmark,
      href: `${baseHref}/our-solution/banking`
    },
    {
      name: { en: "Retail", id: "Ritel" },
      desc: {
        en: "Integrated POS systems, retail payment, and store analytics.",
        id: "Sistem POS terintegrasi, pembayaran ritel, dan analitik toko."
      },
      icon: Store,
      href: `${baseHref}/our-solution/retail`
    },
    {
      name: { en: "Logistics & Distribution", id: "Logistik & Distribusi" },
      desc: {
        en: "Fleet management & real-time distribution tracking.",
        id: "Manajemen armada (Fleet) & pelacakan distribusi real-time."
      },
      icon: Truck,
      href: `${baseHref}/our-solution/logistics`
    },
    {
      name: { en: "Manufacturing", id: "Manufaktur" },
      desc: {
        en: "Production line monitoring and machine telemetry.",
        id: "Pemantauan lini produksi dan telemetri mesin."
      },
      icon: Factory,
      href: `${baseHref}/our-solution/manufacturing`
    }
  ];

  const AI_BASED_CARDS = [
    {
      name: { en: "AI Surveillance", id: "AI Surveillance" },
      desc: { 
        en: "Intelligent surveillance to improve security, safety, and operational efficiency.", 
        id: "Pengawasan cerdas untuk meningkatkan keamanan, keselamatan, dan efisiensi operasional." 
      },
      icon: Camera,
      href: `${baseHref}/our-solution/aiot#surveillance`
    },
    {
      name: { en: "AI HSE", id: "AI HSE" },
      desc: { 
        en: "Workplace safety with PPE detection.", 
        id: "Keselamatan kerja dengan deteksi APD." 
      },
      icon: Shield,
      href: `${baseHref}/our-solution/aiot#hse`
    },
    {
      name: { en: "AI Voice Guard", id: "AI Voice Guard" },
      desc: { 
        en: "Real-time voice fraud and deepfake detection.", 
        id: "Deteksi penipuan suara (fraud) dan deepfake real-time." 
      },
      icon: Mic,
      href: `${baseHref}/our-solution/aiot#voice`
    },
    {
      name: { en: "AI Smart Monitoring", id: "AI Smart Monitoring" },
      desc: { 
        en: "Centralized dashboard for monitoring all connected assets.", 
        id: "Dasbor terpusat untuk memantau semua aset." 
      },
      icon: LayoutDashboard,
      href: `${baseHref}/our-solution/aiot#smart-monitoring`
    }
  ];

  const ENERGY_MONITORING_CARDS = [
    {
      name: { en: "Power Consumption", id: "Konsumsi Listrik" },
      desc: { 
        en: "Real-time energy usage & power quality analytics.", 
        id: "Analitik kualitas daya & penggunaan energi real-time." 
      },
      icon: Zap,
      href: `${baseHref}/our-solution/energy#electricity`
    },
    {
      name: { en: "Genset Monitoring", id: "Monitoring Genset" },
      desc: { 
        en: "Status, runtime, alarms, and electrical parameters.", 
        id: "Status generator, waktu kerja, alarm, & parameter." 
      },
      icon: Cpu,
      href: `${baseHref}/our-solution/energy#genset`
    },
    {
      name: { en: "UPS Monitoring", id: "Monitoring UPS" },
      desc: { 
        en: "UPS health and battery status monitoring.", 
        id: "Kesehatan UPS dan status baterai." 
      },
      icon: BatteryCharging,
      href: `${baseHref}/our-solution/energy#ups`
    }
  ];

  const OPERATIONS_CARDS = [
    {
      name: { en: "Smart Field Service / FSM", id: "Smart Field Service / FSM" },
      desc: { 
        en: "Optimize field agent dispatching, scheduling, and asset tracking.", 
        id: "Optimalkan pengiriman agen lapangan, penjadwalan, dan pelacakan aset." 
      },
      icon: Wrench,
      href: `${baseHref}/our-solution/fsm`
    }
  ];

  const ADVERTISING_CARDS = [
    {
      name: { en: "Campaign", id: "Kampanye" },
      desc: { 
        en: "Targeted CPC, CPI, and CPM ad campaigns to maximize conversion.", 
        id: "Kampanye iklan CPC, CPI, dan CPM tertarget untuk memaksimalkan konversi." 
      },
      icon: Megaphone,
      href: `${baseHref}/our-solution/advertising`
    }
  ];

  const CASE_STUDIES = [
    {
      title: {
        en: "AI Surveillance: Smart Cabin Security Deployment for 1,200 ATM Sites",
        id: "AI Surveillance: Implementasi Keamanan Cabin Pintar di 1.200 Situs ATM"
      },
      href: `${baseHref}/insights`
    },
    {
      title: {
        en: "FSM Implementation: Optimizing Field Technician Schedules across East Java",
        id: "Implementasi FSM: Mengoptimalkan Jadwal Teknisi Lapangan di Jawa Timur"
      },
      href: `${baseHref}/insights`
    },
    {
      title: {
        en: "Energy Monitoring: Reducing Electricity Consumption by 18% in Manufacturing Plant",
        id: "Pemantauan Energi: Menurunkan Konsumsi Listrik sebesar 18% di Pabrik Manufaktur"
      },
      href: `${baseHref}/insights`
    },
    {
      title: {
        en: "AI HSE: Workplace Safety PPE Compliance at Off-shore Oil Drilling Site",
        id: "AI HSE: Kepatuhan APD Keselamatan Kerja di Lokasi Pengeboran Minyak Lepas Pantai"
      },
      href: `${baseHref}/insights`
    },
    {
      title: {
        en: "Smart EDC & Retail Integration: Boosting Transaction Speeds in 500+ Outlets",
        id: "Integrasi Ritel & EDC Pintar: Meningkatkan Kecepatan Transaksi di 500+ Outlet"
      },
      href: `${baseHref}/insights`
    }
  ];

  const [activeCaseIdx, setActiveCaseIdx] = React.useState(0);

  React.useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setActiveCaseIdx((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Gray background overlay outside the floating box */}
      <div
        className="fixed inset-x-0 top-20 bottom-0 bg-black/8 z-30 transition-all duration-300 animate-in fade-in hidden md:block"
        onMouseEnter={onClose}
      />

      {/* Floating White Card Container */}
      <div
        className="absolute top-[88px] left-6 right-6 max-w-[1232px] mx-auto bg-white border border-slate-100 rounded-3xl z-40 transition-all duration-300 hidden md:block before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-[''] shadow-xl"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="px-8 py-5 flex flex-col gap-4">
          {/* Section Introduction */}
          <div className="border-b border-slate-100 pb-2.5">
            <h3 className="text-slate-900 font-extrabold text-[16px] tracking-tight mb-0.5">
              {locale === "id" ? "Solusi Digital untuk Bisnis Modern" : "Digital Solutions for Modern Businesses"}
            </h3>
            <p className="text-slate-500 text-[12px] leading-relaxed max-w-[620px] font-normal">
              {locale === "id"
                ? "Kami menyediakan solusi AIoT, Pemantauan Energi, dan Solusi Enterprise untuk membantu perusahaan memantau, mengotomatisasi, dan mengoptimalkan operasional mereka."
                : "We provide AIoT, Energy Monitoring, and Enterprise Solutions to help companies monitor, automate, and optimize their operations."}
            </p>
          </div>

          {/* Main Content Layout Grid */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: By Industry (col-span-3) */}
            <div className="col-span-3 flex flex-col gap-2.5">
              <span className="text-[9.5px] font-extrabold tracking-widest text-slate-400 uppercase border-b border-slate-100 pb-1 block">
                {locale === "id" ? "Berdasarkan Industri" : "by Industry"}
              </span>
              <div className="flex flex-col gap-1.5">
                {INDUSTRIES_CARDS.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 hover:shadow-md rounded-xl p-1.5 px-2.5 transition-all duration-200 flex items-start gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    onClick={onClose}
                    aria-label={`Learn more about ${item.name.en}`}
                  >
                    <div className="w-6.5 h-6.5 rounded-lg bg-slate-100 group-hover:bg-red-50 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors shrink-0 mt-0.5">
                      <item.icon className="w-3 h-3" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-slate-800 font-bold text-[12.5px] group-hover:text-primary transition-colors flex items-center gap-1 leading-snug">
                        {item.name[locale as "en" | "id"]}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 text-primary" />
                      </h4>
                      <p className="text-slate-400 text-[10px] leading-snug font-normal mt-0.5">
                        {item.desc[locale as "en" | "id"]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: By Use Case (col-span-9) */}
            <div className="col-span-9 flex flex-col gap-2.5 border-l border-slate-100 pl-6">
              <span className="text-[9.5px] font-extrabold tracking-widest text-slate-400 uppercase border-b border-slate-100 pb-1 block">
                {locale === "id" ? "Berdasarkan Penggunaan" : "by Use Case"}
              </span>

              {/* Sub-grid of AIoT Based, Energy Monitoring, Operations, and Advertising */}
              <div className="grid grid-cols-3 gap-5">
                
                {/* AIoT Based Sub-column */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5 block">
                    AIoT Based
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {AI_BASED_CARDS.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 hover:shadow-md rounded-xl p-1.5 px-2.5 transition-all duration-200 flex items-start gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        onClick={onClose}
                        aria-label={`Learn more about ${item.name.en}`}
                      >
                        <div className="w-6.5 h-6.5 rounded-lg bg-slate-100 group-hover:bg-red-50 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors shrink-0 mt-0.5">
                          <item.icon className="w-3 h-3" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-slate-800 font-bold text-[12.5px] group-hover:text-primary transition-colors flex items-center gap-1 leading-snug">
                            {item.name[locale as "en" | "id"]}
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 text-primary" />
                          </h4>
                          <p className="text-slate-400 text-[10px] leading-snug font-normal mt-0.5">
                            {item.desc[locale as "en" | "id"]}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Energy Monitoring Sub-column */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5 block">
                    Energy Monitoring
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {ENERGY_MONITORING_CARDS.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 hover:shadow-md rounded-xl p-1.5 px-2.5 transition-all duration-200 flex items-start gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        onClick={onClose}
                        aria-label={`Learn more about ${item.name.en}`}
                      >
                        <div className="w-6.5 h-6.5 rounded-lg bg-slate-100 group-hover:bg-red-50 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors shrink-0 mt-0.5">
                          <item.icon className="w-3 h-3" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-slate-800 font-bold text-[12.5px] group-hover:text-primary transition-colors flex items-center gap-1 leading-snug">
                            {item.name[locale as "en" | "id"]}
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 text-primary" />
                          </h4>
                          <p className="text-slate-400 text-[10px] leading-snug font-normal mt-0.5">
                            {item.desc[locale as "en" | "id"]}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: Stacked Operations & Advertising */}
                <div className="flex flex-col gap-3">
                  
                  {/* Operations Block */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5 block">
                      Operations
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {OPERATIONS_CARDS.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 hover:shadow-md rounded-xl p-1.5 px-2.5 transition-all duration-200 flex items-start gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                          onClick={onClose}
                          aria-label={`Learn more about ${item.name.en}`}
                        >
                          <div className="w-6.5 h-6.5 rounded-lg bg-slate-100 group-hover:bg-red-50 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <item.icon className="w-3 h-3" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <h4 className="text-slate-800 font-bold text-[12.5px] group-hover:text-primary transition-colors flex items-center gap-1 leading-snug">
                              {item.name[locale as "en" | "id"]}
                              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 text-primary" />
                            </h4>
                            <p className="text-slate-400 text-[10px] leading-snug font-normal mt-0.5">
                              {item.desc[locale as "en" | "id"]}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Advertising Block */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5 block">
                      Advertising
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {ADVERTISING_CARDS.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 hover:shadow-md rounded-xl p-1.5 px-2.5 transition-all duration-200 flex items-start gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                          onClick={onClose}
                          aria-label={`Learn more about ${item.name.en}`}
                        >
                          <div className="w-6.5 h-6.5 rounded-lg bg-slate-100 group-hover:bg-red-50 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors shrink-0 mt-0.5">
                            <item.icon className="w-3 h-3" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <h4 className="text-slate-800 font-bold text-[12.5px] group-hover:text-primary transition-colors flex items-center gap-1 leading-snug">
                              {item.name[locale as "en" | "id"]}
                              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 text-primary" />
                            </h4>
                            <p className="text-slate-400 text-[10px] leading-snug font-normal mt-0.5">
                              {item.desc[locale as "en" | "id"]}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* Footer Bar: Rotating Case Studies slideshow & Explore solutions */}
          <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-6">
            
            {/* Left Side: Dynamic Rotating Case Study Title */}
            <div className="flex items-center gap-2.5 overflow-hidden min-w-0 flex-1">
              <span className="bg-red-50 text-primary text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide shrink-0">
                {locale === "id" ? "Studi Kasus" : "Case Study"}
              </span>
              <div className="relative h-5 overflow-hidden flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCaseIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center"
                  >
                    <Link
                      href={CASE_STUDIES[activeCaseIdx].href}
                      className="text-[12.5px] font-semibold text-slate-600 hover:text-primary transition-colors truncate block w-full focus-visible:outline-none"
                      onClick={onClose}
                    >
                      {CASE_STUDIES[activeCaseIdx].title[locale as "en" | "id"]}
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Explore Solutions link */}
            <Link
              href={`${baseHref}/our-solution`}
              className="inline-flex items-center gap-2 text-[13.5px] font-bold text-slate-900 hover:text-primary transition-colors group/explore focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
              onClick={onClose}
            >
              {locale === "id" ? "Jelajahi semua solusi" : "Explore all solutions"}
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 group-hover/explore:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
