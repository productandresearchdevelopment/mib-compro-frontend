"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import * as FreeIcons from "@hugeicons/core-free-icons";
import { SOLUTIONS_DATA, SolutionItem } from "@/data/solutionsData";

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

// -------------------------------------------------------------
// FSM SPECIALIZED LAYOUT COMPONENT (LIGHT THEME)
// -------------------------------------------------------------
function FsmSolutionLayout({ data, locale }: { data: SolutionItem; locale: string }) {
  const t = useTranslations("solution");
  const [activeStep, setActiveStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // iPhone interactive widget tickets state
  const [tickets, setTickets] = useState([
    {
      id: "2026975216",
      title: "ISP Site Inspection",
      location: "Tebing Tinggi Irian Supermarket",
      status: "ASSIGNED", // ASSIGNED -> ARRIVED -> WORK IN PROGRESS -> COMPLETED
      time: "09:30 AM"
    },
    {
      id: "2026975217",
      title: "EDC Counter Setup",
      location: "BSI Bekasi Timur",
      status: "ASSIGNED",
      time: "11:15 AM"
    },
    {
      id: "2026975218",
      title: "Router Swap & Maintenance",
      location: "Mandiri Bekasi Cyber Park",
      status: "ASSIGNED",
      time: "02:00 PM"
    }
  ]);

  // Handle iPhone interactive ticket status toggle
  const updateTicketStatus = (index: number) => {
    setTickets((prev) => {
      const copy = [...prev];
      const current = copy[index].status;
      if (current === "ASSIGNED") copy[index].status = "ARRIVED";
      else if (current === "ARRIVED") copy[index].status = "WORK IN PROGRESS";
      else if (current === "WORK IN PROGRESS") copy[index].status = "COMPLETED";
      else copy[index].status = "ASSIGNED";
      return copy;
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full bg-white text-[#100420] overflow-hidden relative pt-24 selection:bg-primary selection:text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/4 right-[-200px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-[-200px] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* --- HERO SECTION --- */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:py-32 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Use Case Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEEBEB] border border-[#FCD3D3] text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {data.badge[locale as "en" | "id"]}
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#100420] mb-6">
            {data.title[locale as "en" | "id"]}
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mb-8">
            {data.description[locale as "en" | "id"]}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="#contact-sales">
              <Button size="lg" className="bg-primary hover:bg-primary/95 text-white px-8 py-6 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group">
                {t("getDemo")}
                <HugeiconsIcon icon={FreeIcons.ArrowRight01Icon} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Illustration / Dashboard Preview (Light Theme) */}
        <motion.div 
          className="lg:col-span-5 relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none z-0" />
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-slate-400 font-mono tracking-wider">FSM_OPS_DESKTOP v2.6</span>
          </div>

          {/* Interactive UI Mockup Elements */}
          <div className="flex-1 flex flex-col justify-center gap-4 py-6 z-10">
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                  <HugeiconsIcon icon={FreeIcons.Location01Icon} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#100420]">Active Field Technicians</h4>
                  <p className="text-xs text-slate-400">Updating telemetry signals</p>
                </div>
              </div>
              <span className="text-emerald-600 text-xs font-bold px-2 py-1 rounded bg-emerald-50 border border-emerald-100 animate-pulse">48 ONLINE</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                  <HugeiconsIcon icon={FreeIcons.TaskDone01Icon} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#100420]">Completed SLA Tickets</h4>
                  <p className="text-xs text-slate-400">Real-time status confirmation</p>
                </div>
              </div>
              <span className="text-primary text-xs font-bold px-2 py-1 rounded bg-[#FEEBEB] border border-[#FCD3D3]">99.85% ACCURACY</span>
            </div>
          </div>

          <div className="z-10 flex justify-between items-center text-xs text-slate-400 border-t border-slate-200 pt-4">
            <span>Total Tickets Assigned: 1,482</span>
            <span>Uptime Speed: 99.98%</span>
          </div>
        </motion.div>
      </section>

      {/* --- STATS OVERVIEW --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 z-10 border-t border-b border-slate-200/60 bg-slate-50/50 rounded-[32px] my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-[#100420] mb-2 font-mono">
                {stat.value}
              </h2>
              <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">
                {stat.label[locale as "en" | "id"]}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CORE STRENGTHS GRID --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#100420] mb-4">Strengthen Field Performance at Scale</h2>
          <p className="text-slate-505 text-lg text-slate-500">
            A comprehensive set of digital tools built to optimize and scale operational field services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.coreStrengths.map((feat, idx) => {
            const Icon = getIconComponent(feat.icon);
            return (
              <motion.div
                key={idx}
                className="p-6 rounded-[32px] border border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <HugeiconsIcon icon={Icon} className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#100420] group-hover:text-primary transition-colors leading-snug">
                  {feat.title[locale as "en" | "id"]}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feat.description[locale as "en" | "id"]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- IPHONE APP MOCKUP & FOR TEAMS SECTION --- */}
      {data.teamsZone && (
        <section className="relative max-w-7xl mx-auto px-6 py-24 z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEEBEB] border border-[#FCD3D3] text-primary text-xs font-bold uppercase tracking-wider mb-6">
              {data.teamsZone.badge[locale as "en" | "id"]}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#100420] leading-tight mb-6">
              {data.teamsZone.title[locale as "en" | "id"]}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              {data.teamsZone.description[locale as "en" | "id"]}
            </p>

            <div className="space-y-6">
              {data.teamsZone.bullets.map((bullet, idx) => {
                const BulletIcon = getIconComponent(bullet.icon);
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                      <HugeiconsIcon icon={BulletIcon} className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#100420]">
                        {bullet.title[locale as "en" | "id"]}
                      </h4>
                      <p className="text-sm text-slate-505 text-slate-500 mt-1">
                        {bullet.description[locale as "en" | "id"]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Styled CSS iPhone Container */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              className="w-[300px] h-[600px] rounded-[50px] border-[10px] border-[#1e293b] bg-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-between"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[24px] bg-[#1e293b] rounded-b-2xl z-40 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-black shrink-0 mr-4" />
                <span className="w-10 h-[3px] rounded-full bg-slate-700 shrink-0" />
              </div>

              {/* Mobile Screen Content */}
              <div className="flex-1 flex flex-col bg-slate-50 pt-8 overflow-y-auto overflow-x-hidden relative">
                {/* Status Bar */}
                <div className="px-6 py-2 flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-100 bg-white">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-600">09:41 AM</span>
                  </div>
                  <span className="font-bold text-slate-600">4G LTE</span>
                </div>

                {/* Header Profile */}
                <div className="p-4 flex items-center gap-3 border-b border-slate-100 bg-white">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                    MT
                  </div>
                  <div>
                    <h5 className="text-[12px] font-bold text-[#100420]">MIB Technician App</h5>
                    <p className="text-[9px] text-slate-400">Live GPS tracking active</p>
                  </div>
                </div>

                {/* Simulated Task Cards */}
                <div className="p-4 flex-1 flex flex-col gap-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Work Orders</span>

                  {tickets.map((ticket, index) => (
                    <div 
                      key={ticket.id} 
                      className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-2 relative overflow-hidden shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] text-primary font-mono font-bold">#{ticket.id}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                          ticket.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600" :
                          ticket.status === "WORK IN PROGRESS" ? "bg-amber-50 text-amber-600" :
                          ticket.status === "ARRIVED" ? "bg-blue-50 text-blue-600" :
                          "bg-primary/10 text-primary"
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div>
                        <h6 className="text-[11px] font-bold text-[#100420] leading-tight">{ticket.title}</h6>
                        <p className="text-[9px] text-slate-500 mt-0.5">{ticket.location}</p>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-100 pt-2 mt-1">
                        <span className="text-[8px] text-slate-400">{ticket.time}</span>
                        <button 
                          onClick={() => updateTicketStatus(index)}
                          className="text-[9px] font-bold text-white bg-[#100420] hover:bg-primary px-2.5 py-1 rounded transition-colors active:scale-95 shadow-sm"
                        >
                          Update Progress
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* iPhone Home Bar */}
              <div className="h-[20px] w-full flex items-center justify-center bg-slate-900 border-t border-gray-800">
                <span className="w-24 h-[4px] rounded-full bg-slate-600" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* --- PERFORMANCE TRACKING SECTION --- */}
      {data.trackingZone && (
        <section className="relative max-w-7xl mx-auto px-6 py-24 z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-slate-100">
          {/* Dashboard Visual Container */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <motion.div 
              className="w-full max-w-[420px] rounded-3xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col gap-6 shadow-lg relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none rounded-3xl" />
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h4 className="text-sm font-bold tracking-wider uppercase text-slate-500">Operational Monitor</h4>
                <span className="text-[10px] text-emerald-600 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 font-bold">LIVE METRIC</span>
              </div>

              {/* Albert Flores Profile Card */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[#e11d48]/80 flex items-center justify-center font-black text-white shadow-md">
                    AF
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#100420]">Albert Flores</h5>
                    <p className="text-xs text-slate-400 font-semibold">Product Lead / On Duty</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-emerald-600 font-bold">Active</span>
                  <span className="text-[9px] text-slate-400 font-semibold">Bekasi Terminal</span>
                </div>
              </div>

              {/* Dynamic SLA Graph Mockup */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-slate-400 font-bold">SLA Completion Speed (Last 6 hours)</span>
                <div className="h-32 w-full flex items-end justify-between gap-1 pt-4 pb-2">
                  <div className="flex-1 bg-primary/5 border border-primary/10 rounded-t-lg h-[40%] flex items-center justify-center text-[10px] font-bold text-primary">40%</div>
                  <div className="flex-1 bg-primary/10 border border-primary/20 rounded-t-lg h-[65%] flex items-center justify-center text-[10px] font-bold text-primary">65%</div>
                  <div className="flex-1 bg-primary/20 border border-primary/30 rounded-t-lg h-[80%] flex items-center justify-center text-[10px] font-bold text-primary/80">80%</div>
                  <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-t-lg h-[95%] flex items-center justify-center text-[10px] font-bold text-emerald-600">95%</div>
                  <div className="flex-1 bg-emerald-500/20 border border-emerald-500/30 rounded-t-lg h-[98%] flex items-center justify-center text-[10px] font-bold text-emerald-600">98%</div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Dispatch Latency</span>
                  <p className="text-base font-extrabold text-[#100420] font-mono">0.45 Seconds</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Average SLA Uptime</span>
                  <p className="text-base font-extrabold text-emerald-600 font-mono">99.97% Uptime</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEEBEB] border border-[#FCD3D3] text-primary text-xs font-bold uppercase tracking-wider mb-6">
              {data.trackingZone.badge[locale as "en" | "id"]}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#100420] leading-tight mb-6">
              {data.trackingZone.title[locale as "en" | "id"]}
            </h2>
            <p className="text-slate-505 text-lg text-slate-500 leading-relaxed mb-8">
              {data.trackingZone.description[locale as "en" | "id"]}
            </p>

            <div className="space-y-6">
              {data.trackingZone.bullets.map((bullet, idx) => {
                const BulletIcon = getIconComponent(bullet.icon);
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0 mt-1">
                      <HugeiconsIcon icon={BulletIcon} className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#100420]">
                        {bullet.title[locale as "en" | "id"]}
                      </h4>
                      <p className="text-sm text-slate-505 text-slate-500 mt-1">
                        {bullet.description[locale as "en" | "id"]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* --- WHO BENEFITS SLIDER SECTION --- */}
      {data.whoBenefits && (
        <section className="relative max-w-7xl mx-auto px-6 py-24 z-10 border-t border-slate-100 bg-slate-50/20 rounded-[32px] my-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-[#100420] mb-4">
                {data.whoBenefits.title[locale as "en" | "id"]}
              </h2>
              <p className="text-slate-500 text-lg">
                {data.whoBenefits.subtitle[locale as "en" | "id"]}
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-4 mt-6 lg:mt-0">
              <button 
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : data.whoBenefits!.items.length - 1))}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
              >
                <HugeiconsIcon icon={FreeIcons.ArrowLeft01Icon} className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveStep((prev) => (prev < data.whoBenefits!.items.length - 1 ? prev + 1 : 0))}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
              >
                <HugeiconsIcon icon={FreeIcons.ArrowRight01Icon} className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Card Viewer */}
          <div className="relative min-h-[350px] w-full max-w-6xl mx-auto rounded-[32px] border border-slate-200 bg-white p-8 md:p-12 overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {data.whoBenefits.items.map((slide, index) => {
                if (index !== activeStep) return null;
                return (
                  <motion.div
                    key={index}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="lg:col-span-8">
                      <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-2">Benefit Profile 0{index + 1}</span>
                      <h3 className="text-2xl md:text-4xl font-bold text-[#100420] mb-4">{slide.title[locale as "en" | "id"]}</h3>
                      <h5 className="text-base md:text-lg text-primary font-bold mb-6">{slide.subtitle[locale as "en" | "id"]}</h5>
                      <p className="text-slate-55 text-slate-500 leading-relaxed text-base max-w-3xl">{slide.description[locale as "en" | "id"]}</p>
                    </div>

                    <div className="lg:col-span-4 flex justify-center lg:justify-end">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] bg-primary/5 border border-[#FCD3D3] flex items-center justify-center text-primary">
                        <HugeiconsIcon icon={FreeIcons.AwardIcon || FreeIcons.Tick01Icon} className="w-12 h-12 md:w-16 md:h-16" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex items-center gap-2 mt-8">
              {data.whoBenefits.items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activeStep ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FEATURE INSIGHT --- */}
      {data.featureInsight && (
        <section className="relative max-w-7xl mx-auto px-6 py-24 z-10 border-t border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side checklist */}
            <div className="lg:col-span-7">
              <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-4">Feature Insight</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#100420] leading-tight mb-8">
                {data.featureInsight.title[locale as "en" | "id"]}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-12">
                {data.featureInsight.subtitle[locale as "en" | "id"]}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.featureInsight.points.map((point, idx) => {
                  const PtIcon = getIconComponent(point.icon);
                  return (
                    <div key={idx} className="p-6 rounded-[32px] bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:bg-white">
                      <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-4">
                        <HugeiconsIcon icon={PtIcon} className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-[#100420] mb-2">{point.title[locale as "en" | "id"]}</h4>
                      <p className="text-sm text-slate-55 text-slate-500 leading-relaxed">{point.description[locale as "en" | "id"]}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side Blog Teaser Card */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                className="w-full max-w-[400px] rounded-[32px] overflow-hidden border border-slate-200 bg-white hover:border-slate-300 transition-all duration-300 group shadow-md hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
                {/* Styled Gradient Art Frame */}
                <div className="h-[240px] w-full bg-gradient-to-br from-[#100420] via-slate-900 to-[#100420] relative p-8 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                  <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FEEBEB] border border-[#FCD3D3] text-primary text-[10px] font-bold uppercase tracking-wider self-start">
                    {data.featureInsight.blogTeaser.category[locale as "en" | "id"]}
                  </div>

                  <div className="text-5xl font-extrabold text-white/5 select-none font-mono">FSM</div>

                  <span className="text-xs text-slate-400 font-mono tracking-wider">{data.featureInsight.blogTeaser.date}</span>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <h4 className="text-xl font-bold text-[#100420] group-hover:text-primary transition-colors leading-snug">
                    {data.featureInsight.blogTeaser.title[locale as "en" | "id"]}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Discover standard industry practices to tackle delayed response times, manual reports overhead, and scheduling latency in active mobile workforces.
                  </p>
                  <Link href="#blog-read" className="inline-flex items-center gap-2 text-primary text-xs font-bold hover:text-primary/80 transition-colors pt-2">
                    Read Article
                    <HugeiconsIcon icon={FreeIcons.ArrowRight01Icon} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* --- CONTACT REQUEST CTA --- */}
      <section id="contact-sales" className="relative max-w-7xl mx-auto px-6 py-24 z-10">
        <div className="relative rounded-[40px] border border-slate-200 bg-slate-50/50 p-12 md:p-20 text-center overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-primary/[0.01] pointer-events-none" />
          <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-4xl md:text-6xl font-black text-[#100420] mb-6 leading-tight">
            Take control of your field operations.
          </h2>
          <p className="text-slate-55 text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Ready to find out how our Field Service Management system can boost your efficiency up to 10x? Fill in your email and request a fully localized platform demo session.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your work email address"
              className="w-full px-5 py-4 rounded-xl bg-white border border-slate-300 text-[#100420] placeholder-slate-400 focus:outline-none focus:border-primary transition-colors text-sm shadow-sm"
            />
            <button className="w-full sm:w-auto shrink-0 bg-[#100420] text-white hover:bg-primary px-8 py-4 rounded-xl font-extrabold text-sm transition-all shadow-md active:scale-95">
              Request Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// STANDARD COMPONENT FOR FALLBACK SOLUTION (LIGHT THEME)
// -------------------------------------------------------------
function StandardSolutionLayout({ data, locale }: { data: SolutionItem; locale: string }) {
  const t = useTranslations("solution");

  return (
    <div className="w-full bg-white text-[#100420] overflow-hidden relative pt-24 min-h-screen">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/3 right-[-150px] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* --- HERO SECTION --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEEBEB] border border-[#FCD3D3] text-primary text-xs font-bold uppercase tracking-wider mb-6">
            {data.badge[locale as "en" | "id"]}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[#100420] leading-tight mb-6">
            {data.title[locale as "en" | "id"]}
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            {data.description[locale as "en" | "id"]}
          </p>

          <Link href="#contact">
            <Button size="lg" className="bg-primary hover:bg-primary/95 text-white px-8 py-6 rounded-xl font-bold transition-all flex items-center gap-2 group shadow-lg shadow-primary/20">
              {t("requestConsultation")}
              <HugeiconsIcon icon={FreeIcons.ArrowRight01Icon} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Hero image placeholder */}
        <motion.div 
          className="lg:col-span-5 relative w-full h-[320px] md:h-[400px] rounded-[32px] border border-slate-200 bg-slate-50/50 p-6 flex items-center justify-center shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="w-20 h-20 rounded-2xl bg-primary/5 border border-[#FCD3D3] flex items-center justify-center text-primary shadow-sm">
            <HugeiconsIcon icon={FreeIcons.PackageIcon} className="w-10 h-10" />
          </div>
        </motion.div>
      </section>

      {/* --- STATS SECTION --- */}
      {data.stats.length > 0 && (
        <section className="relative max-w-7xl mx-auto px-6 py-12 z-10 border-t border-b border-slate-100 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-[32px] border border-slate-200 shadow-sm">
                <h2 className="text-4xl md:text-5xl font-black text-primary mb-2 font-mono">{stat.value}</h2>
                <p className="text-xs text-slate-505 uppercase tracking-wider font-bold">{stat.label[locale as "en" | "id"]}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- CORE STRENGTHS --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#100420] mb-4">{t("coreStrengths")}</h2>
          <p className="text-slate-55 text-slate-500 text-sm">
            Discover the primary operational capabilities and strategic advantages delivered by this solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.coreStrengths.map((feat, idx) => {
            const StrIcon = getIconComponent(feat.icon);
            return (
              <div 
                key={idx} 
                className="p-6 rounded-[32px] bg-slate-50/50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0 mt-1">
                  <HugeiconsIcon icon={StrIcon} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-[#100420]">{feat.title[locale as "en" | "id"]}</h4>
                  <p className="text-sm text-slate-55 text-slate-500 leading-relaxed">{feat.description[locale as "en" | "id"]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- CONSULTATION FORM CALLOUT --- */}
      <section id="contact" className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        <div className="relative rounded-[40px] border border-slate-200 bg-slate-50/50 p-10 md:p-16 text-center max-w-3xl mx-auto shadow-sm">
          <h3 className="text-2xl md:text-3xl font-black text-[#100420] mb-4">Request a Customized System Consultation</h3>
          <p className="text-slate-505 text-slate-500 text-sm mb-8 leading-relaxed">
            Interested in implementing this digital solution? Send us your information and let our engineering team analyze your workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full px-5 py-3 rounded-xl bg-white border border-slate-300 text-[#100420] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm shadow-sm"
            />
            <button className="bg-primary hover:bg-primary/95 text-white px-6 py-3 rounded-xl font-bold text-sm shrink-0 transition-colors shadow-sm">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// DYNAMIC DETAIL SWITCHER PAGE ENTRY POINT (LIGHT THEME)
// -------------------------------------------------------------
export default function SolutionDetailPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = React.use(props.params);
  const tFooter = useTranslations("footer");

  // Search local database for the matching slug
  const solution = useMemo(() => {
    return SOLUTIONS_DATA.find((item) => item.slug === slug);
  }, [slug]);

  // If the solution does not exist, redirect to standard 404
  if (!solution) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen text-[#100420] font-sans flex flex-col justify-between selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-1">
        {solution.layoutTemplate === "fsm" ? (
          <FsmSolutionLayout data={solution} locale={locale} />
        ) : (
          <StandardSolutionLayout data={solution} locale={locale} />
        )}
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
