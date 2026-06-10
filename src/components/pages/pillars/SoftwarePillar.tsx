"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  MapPin,
  CheckCircle
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import QifessSection from "@/components/pages/home/QifessSection";
import QifessFeaturesShowcase from "./QifessFeaturesShowcase";

interface SoftwarePillarProps {
  locale: string;
  showBackLink?: boolean;
}

export default function SoftwarePillar({ locale, showBackLink = true }: SoftwarePillarProps) {
  const tQifess = useTranslations("qifess");
  const tFeatures = useTranslations("features");

  return (
    <div className="w-full bg-white pt-24 md:pt-28">
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
        {showBackLink && (
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-slate-550 text-slate-500 hover:text-slate-900 font-semibold text-sm mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{locale === "id" ? "Kembali ke Beranda" : "Back to Home"}</span>
          </Link>
        )}

        {/* Split Title & Description Header (matching Company Hero style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Title */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              {locale === "id" ? "Platform & Sistem Perangkat Lunak" : "Software Platforms & Systems"}
            </h1>
          </div>

          {/* Right Side: Description & Action Button */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-slate-650 text-slate-600 text-base md:text-lg leading-relaxed">
              {tQifess("subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="group h-auto bg-primary-600 hover:bg-primary-550 text-white px-7 py-3.5 rounded-[12px] text-base font-medium shadow-lg shadow-primary-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto border border-transparent">
                <Link href={`/${locale}/contact`} className="flex items-center justify-center gap-2">
                  {locale === "id" ? "Minta Akses Demo" : "Request Demo Access"}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Middle Section: Three Rounded Hero Image Cards (matching the uploaded reference screenshot) */}
      <div className="max-w-7xl mx-auto px-6 w-full mb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 */}
          <div className="md:col-span-3 h-[360px] sm:h-[400px] rounded-3xl overflow-hidden relative shadow-xl group cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Cloud Operations"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {locale === "id" ? "Operasi Lapangan Awan FSM" : "FSM Operations Cloud"}
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="md:col-span-6 h-[360px] sm:h-[400px] rounded-3xl overflow-hidden relative shadow-xl group cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Qifess Platform"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight pr-4">
                {locale === "id" ? "Demo Platform QIFESS" : "QIFESS Platform Demo"}
              </h3>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 fill-slate-950 text-slate-950 ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="md:col-span-3 h-[360px] sm:h-[400px] rounded-3xl overflow-hidden relative shadow-xl group cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="SLA Field Orchestration"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {locale === "id" ? "Otomatisasi Kepatuhan SLA" : "SLA Field Orchestration"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* --- QIFESS SECTION --- */}
      <QifessSection />

      {/* --- QIFESS FEATURES SHOWCASE (Bento Grid) --- */}
      <QifessFeaturesShowcase locale={locale} />

      {/* --- WHY CHOOSE QIFESS (Bento Grid) --- */}
      <section id="why-choose-qifess" className="pt-12 md:pt-16 pb-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 w-full space-y-12">
          
          {/* Heading */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 select-none">
              <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
                {locale === "id" ? "Mengapa Memilih Qifess" : "Why Choose Qifess"}
              </span>
            </div>
            <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-slate-900 leading-tight">
              {locale === "id" ? "Mengapa Memilih QIFESS?" : "Why Choose QIFESS?"}
            </h2>
            <p className="text-slate-550 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
              {locale === "id"
                ? "Solusi terintegrasi, kustomisasi fleksibel, dan kemitraan strategis untuk merampingkan seluruh operasional lapangan Anda."
                : "Expert system, proven strategies, flexible customization, and dedicated support to help your operations thrive and grow."}
            </p>
          </div>

          {/* Grid Layout (mimics user's screenshot) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Left Column (spans 8 cols on desktop): Grid of 5 cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Card 1: Unified Application (Spans 7 cols on desktop, primary background) */}
              <div className="md:col-span-7 bg-primary-600 text-white p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 min-h-[260px] group cursor-default hover:scale-[1.01]">
                <span className="text-4xl font-extrabold font-mono tracking-tight text-white/95">95%</span>
                <div className="space-y-2.5 mt-8">
                  <h3 className="text-xl font-bold leading-none">
                    {locale === "id" ? "Aplikasi Terpadu" : "Unified Application"}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed font-medium">
                    {locale === "id"
                      ? "Menyediakan solusi terintegrasi yang memungkinkan teknisi menggunakan hanya satu aplikasi untuk semua proyek lapangan."
                      : "QIFESS provides an integrated solution that allows technicians to use just one application for all projects."}
                  </p>
                </div>
              </div>

              {/* Card 2: Flexible Customization (Spans 5 cols on desktop, white/gray background) */}
              <div className="md:col-span-5 bg-slate-50 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 min-h-[260px] group cursor-default hover:scale-[1.01]">
                <span className="text-4xl font-extrabold font-mono tracking-tight text-primary-600">100%</span>
                <div className="space-y-2.5 mt-8">
                  <h3 className="text-xl font-bold text-slate-900 leading-none">
                    {locale === "id" ? "Kustomisasi Fleksibel" : "Flexible Customization"}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {locale === "id"
                      ? "Dapat disesuaikan untuk memenuhi kebutuhan spesifik setiap proyek guna efisiensi optimal."
                      : "Tailored to meet the specific needs of each project, ensuring optimal operational efficiency."}
                  </p>
                </div>
              </div>

              {/* Card 4: Real-time Monitoring (Spans 4 cols on desktop, white/gray background) */}
              <div className="md:col-span-4 bg-slate-50 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 min-h-[260px] group cursor-default hover:scale-[1.01]">
                <span className="text-4xl font-extrabold font-mono tracking-tight text-primary-600">24/7</span>
                <div className="space-y-2.5 mt-8">
                  <h3 className="text-xl font-bold text-slate-900 leading-none">
                    {locale === "id" ? "Pemantauan Real-time" : "Real-time Monitoring"}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {locale === "id"
                      ? "Memantau produktivitas teknisi lapangan dan kemajuan tugas secara langsung."
                      : "Equipped with real-time monitoring to track technician productivity and task progress live."}
                  </p>
                </div>
              </div>

              {/* Card 5: Analytics Dashboard (Spans 5 cols on desktop, white/gray background) */}
              <div className="md:col-span-5 bg-slate-50 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 min-h-[260px] group cursor-default hover:scale-[1.01]">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-bold text-primary-600 uppercase tracking-widest font-mono">Building Lasting Success</h4>
                  <p className="text-slate-600 leading-relaxed text-sm italic font-medium">
                    {locale === "id"
                      ? "\"Semua data dapat diakses dari Kantor Pusat melalui Dasbor yang intuitif untuk analisis dan keputusan tepat.\""
                      : "\"All data is accessible from the Head Office through an intuitive Dashboard for analysis and decision-making.\""}
                  </p>
                </div>
                <div className="border-t border-slate-200/50 pt-3 mt-4 flex items-center justify-between text-xs text-slate-400 font-bold tracking-wide">
                  <span>Analytics Dashboard</span>
                  <span>QIFESS Platform</span>
                </div>
              </div>

              {/* Card 6: Location Tracking (Spans 3 cols on desktop, soft red background) */}
              <div className="md:col-span-3 bg-[#feebeb]/50 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 min-h-[260px] group cursor-default hover:scale-[1.01]">
                <span className="text-4xl font-extrabold font-mono tracking-tight text-primary-600">50%</span>
                <div className="space-y-2.5 mt-8">
                  <h3 className="text-lg font-bold text-slate-900 leading-none">
                    {locale === "id" ? "Pelacakan Lokasi" : "Location Tracking"}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    {locale === "id"
                      ? "Memantau lokasi teknisi dan status kerja lapangan dengan akurat."
                      : "Easily monitor technician locations and work status efficiently."}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Strategic Partnership (Spans 4 cols on desktop, tall image card) */}
            <div className="lg:col-span-4 relative rounded-3xl overflow-hidden transition-all duration-300 min-h-[350px] lg:min-h-full flex flex-col justify-end p-8 text-white group hover:scale-[1.01]">
              {/* Cover Image */}
              <Image 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" 
                alt="Strategic Partnership" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none z-10" />
              
              {/* Content overlay */}
              <div className="relative z-20 space-y-3">
                <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-xs font-semibold w-max block">
                  {locale === "id" ? "Mitra Utama" : "Strategic Partner"}
                </span>
                <h3 className="text-2xl font-bold leading-tight">
                  {locale === "id" ? "Kemitraan Strategis" : "Strategic Partnership"}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  {locale === "id"
                    ? "QIFESS lebih dari sekadar alat—ini adalah mitra strategis untuk menyederhanakan operasi lapangan Anda."
                    : "QIFESS is more than just a tool—it is a strategic partner for businesses looking to streamline their field operations."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
