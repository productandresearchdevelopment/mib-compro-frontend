"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  MapPin, 
  Activity, 
  Calendar, 
  Clock, 
  Download, 
  Settings, 
  Cpu, 
  Lock, 
  TrendingUp, 
  Sliders, 
  Shield,
  Smartphone,
  CheckCircle,
  FileText,
  Thermometer,
  AlertTriangle,
  Wifi,
  CheckSquare,
  Zap,
  ChevronRight,
  Sparkles,
  Award,
  Maximize2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRODUCTS_DATA, ProductItem } from "@/data/productsData";

// Dynamically map icon strings to Lucide components
const IconMap: Record<string, React.ComponentType<any>> = {
  MapPin, Activity, Calendar, Clock, Download, Settings, Cpu, Lock, TrendingUp, Sliders, Shield,
  Smartphone, CheckCircle, FileText, Thermometer, AlertTriangle, Wifi, CheckSquare, Zap, Sparkles
};

export default function ProductDetailPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const params = React.use(props.params);
  const locale = params.locale;
  const slug = params.slug;

  const t = useTranslations("product");
  const tFooter = useTranslations("footer");

  // Find product in static seed
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);

  // States for interactive layouts
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hideBack, setHideBack] = useState(false);
  
  // Check if we should hide back link when accessed from SolutionsDetail
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("hideBack") === "true") {
        setHideBack(true);
      }
    }
  }, []);
  
  // Real-time IoT simulator states
  const [simulatedValues, setSimulatedValues] = useState<Record<string, string>>({});

  // Trigger telemetry fluctuation simulation
  useEffect(() => {
    if (!product || product.category !== "iot" || !product.telemetrySim) return;
    
    // Set initial values
    const vals: Record<string, string> = {};
    product.telemetrySim.forEach((t) => {
      vals[t.label.en] = t.value;
    });
    setSimulatedValues(vals);

    // Fluctuate every 3.5 seconds
    const interval = setInterval(() => {
      setSimulatedValues((prev) => {
        const next = { ...prev };
        if (slug === "surveillance-ai-atm") {
          if (next["Vibration Level"]) {
            const val = (0.01 + Math.random() * 0.03).toFixed(2);
            next["Vibration Level"] = `${val} G`;
          }
        } else if (slug === "sensor-node") {
          if (next["Heat Index"]) {
            const temp = (parseFloat(next["Heat Index"]) + (Math.random() * 0.6 - 0.3)).toFixed(1);
            next["Heat Index"] = `${temp} °C`;
          }
          if (next["Ambient Humidity"]) {
            const hum = Math.min(100, Math.max(0, Math.round(parseFloat(next["Ambient Humidity"]) + (Math.random() * 4 - 2))));
            next["Ambient Humidity"] = `${hum} %`;
          }
          if (next["Vibration G-Force"]) {
            const val = (0.01 + Math.random() * 0.01).toFixed(2);
            next["Vibration G-Force"] = `${val} g`;
          }
        } else if (slug === "hse") {
          if (next["Vest Compliance"]) {
            const val = Math.min(100, Math.max(90, Math.round(parseFloat(next["Vest Compliance"]) + (Math.random() * 2 - 1))));
            next["Vest Compliance"] = `${val} %`;
          }
        } else if (slug === "smart-monitoring") {
          if (next["Live FPS"]) {
            const val = Math.round(29 + Math.random() * 2);
            next["Live FPS"] = `${val} fps`;
          }
        } else if (slug === "voiceguard") {
          if (next["Word Error Rate"]) {
            const val = (2.0 + Math.random() * 0.8).toFixed(1);
            next["Word Error Rate"] = `${val} %`;
          }
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [product, slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md mb-6 border border-slate-100 text-red-500">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-[#100420] mb-2">{locale === "id" ? "Produk Tidak Ditemukan" : "Product Not Found"}</h1>
        <p className="text-slate-500 max-w-md mb-8">{locale === "id" ? "Produk yang Anda cari tidak tersedia." : "The product you are looking for is not listed in our database."}</p>
        <Link href={`/${locale}/product`} className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/95 transition-all">
          {t("backToList")}
        </Link>
      </div>
    );
  }

  const isSimq = product.slug === "simq";

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const 
      } 
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-white text-[#100420] selection:bg-primary selection:text-white">
      <Navbar />

      <main className="pt-24 md:pt-32 overflow-hidden">
        
        {/* ================= 1. COMMON HERO SECTION ================= */}
        <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 md:gap-16 border-b border-slate-100">
          {!hideBack && (
            <div className="absolute top-6 left-6">
              <Link 
                href={`/${locale}/product`}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-[#100420] font-semibold text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("backToList")}</span>
              </Link>
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex flex-col items-start text-left gap-6 md:gap-8 max-w-2xl mt-6 md:mt-0"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEEBEB] border border-[#FCD3D3] text-primary text-sm font-bold tracking-wide">
              <span>{t("badge")}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f22929]" />
              <span className="uppercase text-xs tracking-wider font-extrabold">{product.slug}</span>
            </div>

            {/* Dynamic Title */}
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.15] text-[#100420]">
              {product.title[locale as "en" | "id"]}
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-500 font-normal leading-relaxed">
              {product.description[locale as "en" | "id"]}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href={`/${locale}/contact`}
                className="px-6 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/95 transition-all shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("getStarted")}
              </Link>
              <Link 
                href={`/${locale}/contact`}
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("requestDemo")}
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 relative w-full aspect-[4/3] max-w-[580px] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100/50"
          >
            <Image 
              src={product.heroImage} 
              alt={product.title[locale as "en" | "id"]} 
              fill 
              priority
              className="object-cover"
            />
          </motion.div>
        </section>


        {/* ================= 2. SOFTWARE SPECIFIC LAYOUT ================= */}
        {product.category === "software" && (
          <>
            {/* WORKFLOWS SECTION (DARK NAVY) */}
            <section className="bg-[#100420] text-white py-20 md:py-28 relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
              
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
                
                {/* Accordion list */}
                <div className="flex-1 flex flex-col gap-6 w-full">
                  <div className="flex flex-col gap-3">
                    <span className="text-[#2068F7] text-sm font-bold uppercase tracking-wider">
                      {locale === "id" ? "UNTUK BISNIS SOLUSI" : "FOR SOLUTION BUSINESS"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                      {locale === "id" ? "Dirancang untuk beberapa alur kerja operasional" : "Built for multiple operational workflow"}
                    </h2>
                  </div>

                  <div className="flex flex-col gap-4 mt-6">
                    {product.workflows?.map((wf, idx) => {
                      const isActive = idx === activeWorkflowIndex;
                      return (
                        <div 
                          key={idx}
                          onClick={() => setActiveWorkflowIndex(idx)}
                          className={`rounded-2xl border p-6 cursor-pointer transition-all ${
                            isActive 
                              ? "bg-slate-900 border-[#2068F7] shadow-lg shadow-[#2068F7]/5" 
                              : "bg-transparent border-slate-800 hover:border-slate-700 hover:bg-slate-900/30"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <h3 className={`text-xl font-bold transition-colors ${isActive ? "text-[#2068F7]" : "text-white"}`}>
                              {wf.title[locale as "en" | "id"]}
                            </h3>
                            <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? "rotate-90 text-[#2068F7]" : "text-slate-500"}`} />
                          </div>
                          
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-slate-400 leading-relaxed font-normal text-base">
                                  {wf.description[locale as "en" | "id"]}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live image corresponding to selected workflow */}
                <div className="flex-1 w-full relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border border-slate-800">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeWorkflowIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={product.workflows?.[activeWorkflowIndex]?.image || "/images/usecase_main.png"} 
                        alt="Active Workflow Simulation" 
                        fill 
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </section>

            {/* MOBILE APPLICATION APP ZONE (RED CONTAINER) */}
            <section className="bg-primary text-white py-20 md:py-28 relative overflow-hidden">
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-[96px]" />
              
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
                
                <div className="flex-1 flex flex-col gap-6 md:gap-8 max-w-2xl text-left">
                  <span className="text-white/80 text-sm font-bold uppercase tracking-wider">
                    {locale === "id" ? "UNTUK TIM LAPANGAN" : "FOR TEAMS"}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    {locale === "id" ? "Berikan tim lapangan Anda kendali penuh" : "Give your field teams full control on the ground"}
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed font-normal">
                    {locale === "id"
                      ? "Memungkinkan tim Anda menerima tugas, memperbarui kemajuan, dan melaporkan pekerjaan secara langsung dari lapangan dengan sistem yang sederhana dan intuitif."
                      : "Enable your teams to receive tasks, update progress, and report work directly from the field with a simple and intuitive system—ensuring better coordination."}
                  </p>

                  {/* Highlights list */}
                  <div className="flex flex-col gap-5 mt-6">
                    {product.mobileHighlights?.map((mh, idx) => {
                      const IconComp = IconMap[mh.icon] || CheckCircle;
                      return (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-white">{mh.title[locale as "en" | "id"]}</h3>
                            <p className="text-white/70 leading-relaxed text-sm">{mh.description[locale as "en" | "id"]}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* iPhone Frame CSS Container */}
                <div className="flex-1 flex justify-center items-center w-full">
                  <div className="relative w-[320px] h-[640px] rounded-[52px] bg-slate-950 border-[12px] border-slate-900 shadow-2xl overflow-hidden group">
                    {/* Status Bar */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-slate-950 flex justify-between items-center px-6 z-30 text-[10px] text-white font-medium">
                      <span>9:41</span>
                      <div className="w-16 h-3 rounded-full bg-black mx-auto" />
                      <div className="flex items-center gap-1">
                        <Wifi className="w-3 h-3" />
                        <div className="w-4 h-2 border border-white rounded-[2px]" />
                      </div>
                    </div>

                    {/* Simulated App Screen Dashboard */}
                    <div className="absolute inset-0 pt-8 pb-4 px-4 bg-slate-50 flex flex-col gap-4 overflow-y-auto no-scrollbar">
                      {/* Nav header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mt-2">
                        <span className="text-[10px] font-bold text-[#100420] tracking-wider">{product.slug === "simq" ? "SIMQ WAREHOUSE" : "QIFESS MOBILE"}</span>
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[8px] font-black">{product.slug === "simq" ? "SQ" : "PM"}</div>
                      </div>

                      {/* Search box */}
                      <div className="bg-white border border-slate-200 rounded-lg p-2 flex items-center shadow-xs">
                        <div className="w-3 h-3 rounded-full border border-slate-400 mr-2" />
                        <span className="text-[9px] text-slate-400">{product.slug === "simq" ? "Search inventory stock..." : "Search task tickets..."}</span>
                      </div>

                      {/* Ticket header title */}
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span>{product.slug === "simq" ? "INCOMING ITEMS" : "ONGOING TICKET"}</span>
                        <span>{product.slug === "simq" ? "3 Items" : "2 Total"}</span>
                      </div>

                      {/* Ticket cards */}
                      <div className={`bg-white border border-slate-150 rounded-xl p-3 flex flex-col gap-2.5 shadow-sm border-l-4 ${product.slug === "simq" ? "border-l-emerald-500" : "border-l-orange-500"}`}>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-slate-800">{product.slug === "simq" ? "ITM-98213" : "TKT-20268571"}</span>
                          <span className={`px-2 py-0.5 text-[8px] rounded font-extrabold ${product.slug === "simq" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"}`}>{product.slug === "simq" ? "STAGED" : "ARRIVED"}</span>
                        </div>
                        <div className="flex flex-col gap-1 text-[9px] text-slate-600">
                          <span className="font-bold text-slate-800">{product.slug === "simq" ? "EDC Verifone X990" : "Site ISP Inspection"}</span>
                          <span>{product.slug === "simq" ? "Qty: 15 units - Repair Center" : "Ruby Summarecon TD 19"}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[8px] text-slate-400">
                          <span>{product.slug === "simq" ? "PIC: Budi Hartono" : "Engineer: Gogon Santoso"}</span>
                          <span className="text-primary font-bold">{product.slug === "simq" ? "View Stock" : "View Detail"}</span>
                        </div>
                      </div>

                      <div className={`bg-white border border-slate-150 rounded-xl p-3 flex flex-col gap-2.5 shadow-sm border-l-4 ${product.slug === "simq" ? "border-l-amber-500" : "border-l-blue-500"}`}>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-slate-800">{product.slug === "simq" ? "ITM-98215" : "TKT-20269714"}</span>
                          <span className={`px-2 py-0.5 text-[8px] rounded font-extrabold ${product.slug === "simq" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{product.slug === "simq" ? "REPAIRING" : "HANDLING"}</span>
                        </div>
                        <div className="flex flex-col gap-1 text-[9px] text-slate-600">
                          <span className="font-bold text-slate-800">{product.slug === "simq" ? "Soundbox MIB S2" : "Field Maintenance EDC"}</span>
                          <span>{product.slug === "simq" ? "Faulty Audio Board Replacement" : "Tebing Tinggi Irian Supermarket"}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[8px] text-slate-400">
                          <span>{product.slug === "simq" ? "Tech: Agus Prasetyo" : "Engineer: Saputra"}</span>
                          <span className="text-primary font-bold">{product.slug === "simq" ? "View Ticket" : "View Detail"}</span>
                        </div>
                      </div>

                      {product.slug === "simq" && (
                         <div className="bg-white border border-slate-150 rounded-xl p-3 flex flex-col gap-2.5 shadow-sm border-l-4 border-l-blue-500">
                           <div className="flex justify-between items-center">
                             <span className="text-[9px] font-black text-slate-800">ITM-98218</span>
                             <span className="px-2 py-0.5 text-[8px] rounded bg-blue-100 text-blue-700 font-extrabold">IN TRANSIT</span>
                           </div>
                           <div className="flex flex-col gap-1 text-[9px] text-slate-600">
                             <span className="font-bold text-slate-800">ATM Cash Roller Parts</span>
                             <span>Qty: 50 pcs - Dispatching to Depot</span>
                           </div>
                           <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[8px] text-slate-400">
                             <span>Courier: Sicepat Express</span>
                             <span className="text-primary font-bold">Track</span>
                           </div>
                         </div>
                       )}

                      {/* Floating bottom action button */}
                      <div className="mt-auto py-2">
                        <button className="w-full py-2.5 rounded-lg bg-primary text-white text-[10px] font-bold shadow-md shadow-primary/20">
                          {product.slug === "simq" ? "Scan Barcode / QR" : "Update Progress"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* HOW IT WORKS TIMELINE STEPS */}
            <section className="bg-white py-20 md:py-28">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col gap-4 mb-16 text-left max-w-3xl">
                  <span className="text-[#2068F7] text-sm font-bold uppercase tracking-wider">
                    {t("howItWorks")}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-[#100420] tracking-tight leading-tight">
                    {locale === "id" ? "Visibilitas lengkap. Di setiap langkahnya." : "Complete visibility. Every step of the way."}
                  </h2>
                  <p className="text-lg text-slate-500 leading-relaxed font-normal">
                    {locale === "id"
                      ? "Dari pembuatan tiket hingga pelaporan akhir, sistem kami menjaga agar operasi lapangan Anda tetap teratur dan terhubung."
                      : "From ticket creation to final reporting, keeping your field operations organized, transparent, and fully connected."}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                  {/* Left steps triggers */}
                  <div className="flex-1 flex flex-col gap-6 w-full">
                    {product.steps?.map((step, idx) => {
                      const isActive = idx === activeStepIndex;
                      return (
                        <div 
                          key={idx}
                          onMouseEnter={() => setActiveStepIndex(idx)}
                          onClick={() => setActiveStepIndex(idx)}
                          className={`flex gap-6 items-start p-6 rounded-2xl cursor-pointer transition-all border ${
                            isActive 
                              ? "bg-slate-50 border-slate-200/60 shadow-sm" 
                              : "bg-transparent border-transparent hover:bg-slate-50/50"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                            isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            {step.number}
                          </div>
                          <div className="flex flex-col gap-2">
                            <h3 className={`text-xl font-bold ${isActive ? "text-[#100420]" : "text-slate-600"}`}>
                              {step.title[locale as "en" | "id"]}
                            </h3>
                            <p className="text-slate-500 font-normal leading-relaxed text-base">
                              {step.description[locale as "en" | "id"]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right steps image container */}
                  <div className="flex-1 w-full relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStepIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <Image 
                          src={product.steps?.[activeStepIndex]?.image || "/images/usecase_main.png"} 
                          alt="Active Step Illustration" 
                          fill 
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </section>
          </>
        )}


        {/* ================= 3. IoT SPECIFIC LAYOUT ================= */}
        {product.category === "iot" && (
          <>
            {/* ACTIVE LIVE TELEMETRY SIMULATOR CONTAINER */}
            <section className="bg-slate-50 py-20 md:py-28 border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                  
                  {/* Left Column: Telemetry list */}
                  <div className="flex-1 flex flex-col gap-6 md:gap-8 text-left max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold uppercase tracking-wider w-fit">
                      <Sliders className="w-3 h-3" />
                      <span>{t("telemetry")}</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-[#100420]">
                      {locale === "id" ? "Konfirmasi Status Sensor Real-Time" : "Real-Time Sensor Telemetry Status"}
                    </h2>
                    
                    <p className="text-lg text-slate-500 font-normal leading-relaxed">
                      {locale === "id"
                        ? "Sensor nirkabel kami memantau dan memperbarui metrik secara real-time. Rasakan bagaimana data berfluktuasi untuk mencerminkan status perangkat yang sebenarnya."
                        : "Our smart wireless sensors monitor and update telemetry metrics in real-time. Witness live data fluctuations reflecting exact physical sensor device telemetry inputs."}
                    </p>

                    {/* Sensor inputs panel */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-md flex flex-col gap-4 mt-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-400">
                        <span>SENSOR PARAMETER</span>
                        <span>LIVE VALUE</span>
                      </div>

                      {product.telemetrySim?.map((tel, idx) => {
                        const currentVal = simulatedValues[tel.label.en] || tel.value;
                        return (
                          <div key={idx} className="flex justify-between items-center py-2">
                            <span className="text-base font-bold text-[#100420]">{tel.label[locale as "en" | "id"]}</span>
                            <div className="flex items-center gap-3">
                              <motion.span 
                                key={currentVal}
                                initial={{ opacity: 0.5, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-base font-black text-slate-900 font-mono"
                              >
                                {currentVal}
                              </motion.span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Deployment Map simulation */}
                  <div className="flex-1 w-full relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl bg-[#100420] p-8 flex flex-col justify-between border border-slate-800 text-white">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[96px]" />
                    
                    {/* Header */}
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">{t("liveFeed")}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {product.slug.toUpperCase()}-HUB992</span>
                    </div>

                    {/* Simulated Geolocation Map grid */}
                    <div className="relative my-8 flex-1 border border-slate-800 rounded-2xl bg-slate-950/60 overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
                      
                      {/* Pulse Node 1 */}
                      <div className="absolute top-[40%] left-[30%] flex items-center justify-center">
                        <span className="absolute inline-flex h-12 w-12 rounded-full bg-emerald-500/20 animate-ping" />
                        <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md z-10" />
                        <span className="absolute top-6 left-2 bg-slate-900 text-[8px] font-bold px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap">
                          {product.slug === "protectqube" ? "Qube Node 01" : "Sensor Hub 01"}
                        </span>
                      </div>

                      {/* Pulse Node 2 */}
                      <div className="absolute top-[60%] left-[70%] flex items-center justify-center">
                        <span className="absolute inline-flex h-12 w-12 rounded-full bg-emerald-500/20 animate-ping" />
                        <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md z-10" />
                        <span className="absolute top-6 left-2 bg-slate-900 text-[8px] font-bold px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap">
                          {product.slug === "protectqube" ? "Qube Node 02" : "Sensor Hub 02"}
                        </span>
                      </div>
                    </div>

                    {/* Footer stats */}
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono z-10 pt-4 border-t border-slate-900">
                      <span>Uptime: 99.98%</span>
                      <span>Signal: 4G LTE Good</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </>
        )}


        {/* ================= 4. HARDWARE SPECIFIC LAYOUT ================= */}
        {product.category === "hardware" && (
          <>
            {/* TECHNICAL SPECIFICATIONS TABLE & DIMENSIONS */}
            <section className="bg-slate-50 py-20 md:py-28 border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
                  
                  {/* Left Column: Specifications table */}
                  <div className="flex-1 flex flex-col gap-6 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-primary border border-red-100 text-xs font-bold uppercase tracking-wider w-fit">
                      <Award className="w-3 h-3" />
                      <span>{t("specifications")}</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#100420]">
                      {locale === "id" ? "Spesifikasi Teknis Premium" : "Premium Technical Specifications"}
                    </h2>

                    {/* Specs List Cards */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-md flex flex-col gap-4 mt-6">
                      {product.specifications?.map((spec, idx) => (
                        <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
                          <span className="text-slate-500 font-bold text-base">{spec.name[locale as "en" | "id"]}</span>
                          <span className="text-slate-900 font-black text-base text-right max-w-md">{spec.value[locale as "en" | "id"]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Dimensions Panel & Certifications */}
                  <div className="flex-1 flex flex-col gap-8 justify-between">
                    
                    {/* Isometric Dimensions Box */}
                    {product.dimensions && (
                      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-md text-left flex flex-col gap-6 flex-1">
                        <div className="flex items-center gap-2">
                          <Maximize2 className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-black text-[#100420]">{t("dimensions")}</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                          <div className="flex flex-col gap-1 border-r border-slate-100">
                            <span className="text-xs font-bold text-slate-400">WIDTH</span>
                            <span className="text-lg font-black text-slate-900 font-mono">{product.dimensions.width}</span>
                          </div>
                          <div className="flex flex-col gap-1 border-r border-slate-100">
                            <span className="text-xs font-bold text-slate-400">HEIGHT</span>
                            <span className="text-lg font-black text-slate-900 font-mono">{product.dimensions.height}</span>
                          </div>
                          <div className="flex flex-col gap-1 border-r border-slate-100">
                            <span className="text-xs font-bold text-slate-400">DEPTH</span>
                            <span className="text-lg font-black text-slate-900 font-mono">{product.dimensions.depth}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-400">WEIGHT</span>
                            <span className="text-lg font-black text-primary font-mono">{product.dimensions.weight}</span>
                          </div>
                        </div>

                        {/* Simulated isometric device box preview */}
                        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-8 mt-4 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />
                          <div className="w-32 h-44 rounded-2xl bg-white border border-slate-200 shadow-xl flex flex-col items-center justify-center gap-3 relative transform hover:rotate-3 hover:scale-105 transition-all">
                            <div className="w-20 h-10 rounded-lg bg-slate-950 flex items-center justify-center text-white text-[8px] font-bold">MIB</div>
                            <div className="w-20 h-6 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-[7px] text-slate-400 font-mono">Dynamic QRIS</div>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-[10px] mt-2">QR</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Certifications Block */}
                    <div className="bg-[#100420] text-white rounded-3xl p-8 shadow-xl flex flex-col gap-6">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-xl font-black text-white">{t("certifications")}</h3>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {product.certifications?.map((cert, idx) => (
                          <div key={idx} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-sm font-semibold flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>
          </>
        )}


        {/* ================= 5. COMMON DYNAMIC FEATURES GRID ================= */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-4 mb-16 text-center items-center max-w-3xl mx-auto">
              <span className="text-[#2068F7] text-sm font-bold uppercase tracking-wider">
                {t("features")}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#100420] tracking-tight leading-tight">
                {locale === "id" ? "Teknologi Canggih untuk Operasi Maksimal" : "Advanced Technology Built for Performance"}
              </h2>
            </div>

            <motion.div 
              variants={staggerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {product.features.map((feature, idx) => {
                const IconComp = IconMap[feature.icon] || Cpu;
                return (
                  <motion.div 
                    key={idx}
                    variants={fadeInVariants}
                    className="bg-slate-50 border border-slate-100/50 p-8 rounded-3xl flex flex-col gap-5 hover:shadow-xl hover:bg-white hover:border-slate-200 transition-all group duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2068F7] group-hover:bg-[#2068F7] group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-[#100420] group-hover:text-[#2068F7] transition-colors">{feature.title[locale as "en" | "id"]}</h3>
                      <p className="text-slate-500 font-normal leading-relaxed text-sm">{feature.description[locale as "en" | "id"]}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>


        {/* ================= 6. COMMON DYNAMIC KEY BENEFITS GRID ================= */}
        <section className="py-20 md:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-4 mb-16 text-center items-center max-w-3xl mx-auto">
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                {t("keyBenefits")}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#100420] tracking-tight leading-tight">
                {locale === "id" ? "Manfaat Nyata bagi Bisnis Anda" : "Real Strategic Business Benefits"}
              </h2>
            </div>

            <motion.div 
              variants={staggerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {product.benefits.map((benefit, idx) => {
                const IconComp = IconMap[benefit.icon] || CheckCircle;
                return (
                  <motion.div 
                    key={idx}
                    variants={fadeInVariants}
                    className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col gap-5 hover:shadow-xl hover:border-slate-200 transition-all group duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FEEBEB] border border-[#FCD3D3] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-[#100420] group-hover:text-primary transition-colors">{benefit.title[locale as "en" | "id"]}</h3>
                      <p className="text-slate-500 font-normal leading-relaxed text-sm">{benefit.description[locale as "en" | "id"]}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

      </main>

      <Footer
        showCta={true}
        ctaTitle={tFooter("cta.productTitle")}
        ctaButtonText={tFooter("cta.productButton")}
        ctaButtonHref="/contact"
      />
    </div>
  );
}
