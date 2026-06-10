"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Server,
  ShieldCheck,
  Clock,
  Workflow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ServicesShowcase from "@/components/pages/home/ServicesShowcase";

interface ServicesPillarProps {
  locale: string;
  showBackLink?: boolean;
}
export default function ServicesPillar({ locale, showBackLink = true }: ServicesPillarProps) {
  const tFeatures = useTranslations("features");

  return (
    <div className="w-full bg-white pt-24 md:pt-28">
      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
        {showBackLink && (
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold text-sm mb-8 transition-colors group"
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
              {locale === "id" ? "Layanan Kelolaan & Operasional" : "Managed Services & Operations"}
            </h1>
          </div>

          {/* Right Side: Description & Exploration Button */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-slate-550 text-slate-500 text-base md:text-lg leading-relaxed">
              {tFeatures("servicesDesc")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="group h-auto bg-red-600 hover:bg-red-550 text-white px-7 py-3.5 rounded-[12px] text-base font-medium shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto border border-transparent">
                <Link href="#services-showcase" className="flex items-center justify-center gap-2">
                  {locale === "id" ? "Daftar Layanan" : "View Services List"}
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
              src="https://images.unsplash.com/photo-1521898284481-a5ec348cb555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Managed Services"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {locale === "id" ? "Layanan Kelolaan 24/7" : "24/7 Managed Services"}
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="md:col-span-6 h-[360px] sm:h-[400px] rounded-3xl overflow-hidden relative shadow-xl group cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Staging & Deployment"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight pr-4">
                {locale === "id" ? "Demo Penyiapan & Penerapan" : "Staging & Deployment Demo"}
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
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Guaranteed SLA Fulfillment"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {locale === "id" ? "Pemenuhan SLA Terjamin" : "Guaranteed SLA Fulfillment"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* --- SERVICES SHOWCASE --- */}
      <ServicesShowcase />
    </div>
  );
}
