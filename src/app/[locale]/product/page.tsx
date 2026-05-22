"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft,
  Cpu, 
  Layout, 
  Smartphone, 
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpRight
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRODUCTS_DATA, ProductItem } from "@/data/productsData";

export default function ProductsPage() {
  const locale = useLocale();
  const t = useTranslations("product");

  // Separate data by categories
  const softwareProducts = PRODUCTS_DATA.filter((p) => p.category === "software");
  const iotProducts = PRODUCTS_DATA.filter((p) => p.category === "iot");
  const hardwareProducts = PRODUCTS_DATA.filter((p) => p.category === "hardware");

  // Slider refs and states
  const [softwareIndex, setSoftwareIndex] = useState(0);
  const [iotIndex, setIotIndex] = useState(0);
  const [hardwareIndex, setHardwareIndex] = useState(0);

  const handleNext = (category: "software" | "iot" | "hardware", max: number, currentIndex: number, setIndex: React.Dispatch<React.SetStateAction<number>>) => {
    if (currentIndex < max - 1) {
      setIndex(currentIndex + 1);
    } else {
      setIndex(0); // Loop back
    }
  };

  const handlePrev = (category: "software" | "iot" | "hardware", max: number, currentIndex: number, setIndex: React.Dispatch<React.SetStateAction<number>>) => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    } else {
      setIndex(max - 1); // Loop to end
    }
  };

  // Scroll handler for category links
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 18 }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#100420] selection:bg-primary selection:text-white">
      <Navbar />

      {/* Main Container */}
      <main className="pt-28 md:pt-36 overflow-hidden">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col items-start text-left gap-6 md:gap-8 max-w-2xl"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEEBEB] border border-[#FCD3D3] text-primary text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>{t("badge")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#100420]">
              {t("heroTitle")}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#475569] font-normal leading-relaxed">
              {t("heroSubtitle")}
            </p>

            {/* CTA Button */}
            <button 
              onClick={() => scrollToSection("categories")}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>{t("exploreMore")}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right-side Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 relative w-full aspect-[4/3] max-w-[620px] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100/50 group"
          >
            <Image 
              src="/images/preview_video_bg.png" 
              alt="Mitra Inovasi Bisnis Ecosystem Platform" 
              fill 
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#100420]/30 to-transparent mix-blend-multiply" />
          </motion.div>
        </section>


        {/* ================= CATEGORY SWITCHER GRID ROW ================= */}
        <section id="categories" className="bg-slate-50 border-y border-slate-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {/* Card 1: Software */}
              <motion.div 
                variants={itemVariants}
                onClick={() => scrollToSection("software")}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 cursor-pointer transition-all flex flex-col gap-6 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2068F7]">
                  <Layout className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-[#100420]">{locale === "id" ? "Solusi Software" : "Software Solutions"}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    {locale === "id" 
                      ? "Platform perangkat lunak skalabel untuk mengelola operasional, tim, dan data dengan mudah." 
                      : "Scalable software platforms to manage operations, teams, and data with ease and accuracy."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[#2068F7] font-bold mt-auto group-hover:gap-2.5 transition-all text-base">
                  <span>{t("exploreSoftware")}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </motion.div>

              {/* Card 2: IoT */}
              <motion.div 
                variants={itemVariants}
                onClick={() => scrollToSection("iot")}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 cursor-pointer transition-all flex flex-col gap-6 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Cpu className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-[#100420]">{locale === "id" ? "Sistem IoT" : "IoT Systems"}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    {locale === "id"
                      ? "Perangkat dan sensor terhubung yang memantau dan mengirim data secara real-time di mana saja."
                      : "Connected devices and sensors that monitor, track, and deliver real-time data anywhere."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold mt-auto group-hover:gap-2.5 transition-all text-base">
                  <span>{t("exploreIot")}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </motion.div>

              {/* Card 3: Hardware */}
              <motion.div 
                variants={itemVariants}
                onClick={() => scrollToSection("hardware")}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 cursor-pointer transition-all flex flex-col gap-6 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-[#100420]">{locale === "id" ? "Perangkat Keras" : "Hardware Devices"}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    {locale === "id"
                      ? "Perangkat keras berkualitas tinggi yang dirancang untuk mendukung operasional lapangan dan kantor."
                      : "High-quality hardware devices designed to support your operations in the field and office."}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-primary font-bold mt-auto group-hover:gap-2.5 transition-all text-base">
                  <span>{t("exploreHardware")}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* ================= IoT SYSTEMS SECTION (LIGHT BG) ================= */}
        <section id="iot" className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="flex flex-col gap-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold uppercase tracking-wider w-fit">
                  {locale === "id" ? "SISTEM IOT" : "IOT SYSTEMS"}
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#100420]">
                  {t("iotTitle")}
                </h2>
                <p className="text-lg text-slate-500 font-normal leading-relaxed">
                  {t("iotDesc")}
                </p>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handlePrev("iot", iotProducts.length, iotIndex, setIotIndex)}
                  className="w-12 h-12 rounded-full border border-slate-200 hover:border-[#100420] flex items-center justify-center text-slate-600 hover:text-[#100420] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleNext("iot", iotProducts.length, iotIndex, setIotIndex)}
                  className="w-12 h-12 rounded-full border border-slate-200 hover:border-[#100420] flex items-center justify-center text-slate-600 hover:text-[#100420] transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Grid display with animation */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {iotProducts.map((product, idx) => {
                  const isVisible = idx === iotIndex || (idx === (iotIndex + 1) % iotProducts.length);
                  return (
                    <motion.div 
                      key={product.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100/50 shadow-sm flex flex-col group hover:shadow-xl hover:border-slate-200/50 transition-all duration-300"
                    >
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] w-full bg-slate-200 overflow-hidden">
                        <Image 
                          src={product.heroImage}
                          alt={product.title[locale as "en" | "id"]}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-10 flex flex-col gap-6 flex-1">
                        <div className="flex flex-col gap-3">
                          <span className="text-[#2068F7] text-sm font-bold uppercase tracking-wider">{product.tagline[locale as "en" | "id"]}</span>
                          <h3 className="text-2xl md:text-3xl font-black text-[#100420] group-hover:text-primary transition-colors leading-tight">
                            {product.slug === "protectqube" ? "ProtectQube" : "Sensor Monitoring"}
                          </h3>
                          <p className="text-slate-500 leading-relaxed font-normal text-base line-clamp-3">
                            {product.description[locale as "en" | "id"]}
                          </p>
                        </div>

                        {/* Card Link */}
                        <div className="mt-auto pt-6 border-t border-slate-200/60 flex items-center justify-between">
                          <Link 
                            href={`/${locale}/product/${product.slug}`}
                            className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all"
                          >
                            <span>{t("learnMore")}</span>
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center items-center gap-2 mt-12">
                {iotProducts.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setIotIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === iotIndex ? "w-8 bg-emerald-600" : "w-2.5 bg-slate-200"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ================= SOFTWARE SOLUTIONS SECTION (DARK BLUE BG) ================= */}
        <section id="software" className="py-20 md:py-28 bg-[#100420] text-white border-b border-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="flex flex-col gap-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[#2068F7] border border-blue-500/20 text-xs font-bold uppercase tracking-wider w-fit">
                  {locale === "id" ? "SOLUSI SOFTWARE" : "SOFTWARE SOLUTIONS"}
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  {t("softwareTitle")}
                </h2>
                <p className="text-lg text-slate-400 font-normal leading-relaxed">
                  {t("softwareDesc")}
                </p>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handlePrev("software", softwareProducts.length, softwareIndex, setSoftwareIndex)}
                  className="w-12 h-12 rounded-full border border-slate-700 hover:border-white flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleNext("software", softwareProducts.length, softwareIndex, setSoftwareIndex)}
                  className="w-12 h-12 rounded-full border border-slate-700 hover:border-white flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Grid display with animation */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {softwareProducts.map((product, idx) => {
                  return (
                    <motion.div 
                      key={product.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="bg-slate-900/40 rounded-[32px] overflow-hidden border border-slate-800 shadow-xl flex flex-col group hover:shadow-2xl hover:border-slate-700 transition-all duration-300"
                    >
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] w-full bg-slate-800 overflow-hidden">
                        <Image 
                          src={product.heroImage}
                          alt={product.title[locale as "en" | "id"]}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-10 flex flex-col gap-6 flex-1">
                        <div className="flex flex-col gap-3">
                          <span className="text-[#2068F7] text-sm font-bold uppercase tracking-wider">{product.tagline[locale as "en" | "id"]}</span>
                          <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors leading-tight">
                            {product.slug.toUpperCase()}
                          </h3>
                          <p className="text-slate-400 leading-relaxed font-normal text-base line-clamp-3">
                            {product.description[locale as "en" | "id"]}
                          </p>
                        </div>

                        {/* Card Link */}
                        <div className="mt-auto pt-6 border-t border-slate-800/80 flex items-center justify-between">
                          <Link 
                            href={`/${locale}/product/${product.slug}`}
                            className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all"
                          >
                            <span>{t("learnMore")}</span>
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center items-center gap-2 mt-12">
                {softwareProducts.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setSoftwareIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === softwareIndex ? "w-8 bg-[#2068F7]" : "w-2.5 bg-slate-800"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ================= HARDWARE DEVICES SECTION (LIGHT BG) ================= */}
        <section id="hardware" className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="flex flex-col gap-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-primary border border-red-100 text-xs font-bold uppercase tracking-wider w-fit">
                  {locale === "id" ? "PERANGKAT KERAS" : "HARDWARE DEVICES"}
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#100420] leading-tight">
                  {t("hardwareTitle")}
                </h2>
                <p className="text-lg text-slate-500 font-normal leading-relaxed">
                  {t("hardwareDesc")}
                </p>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handlePrev("hardware", hardwareProducts.length, hardwareIndex, setHardwareIndex)}
                  className="w-12 h-12 rounded-full border border-slate-200 hover:border-[#100420] flex items-center justify-center text-slate-600 hover:text-[#100420] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleNext("hardware", hardwareProducts.length, hardwareIndex, setHardwareIndex)}
                  className="w-12 h-12 rounded-full border border-slate-200 hover:border-[#100420] flex items-center justify-center text-slate-600 hover:text-[#100420] transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Grid display with animation */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {hardwareProducts.map((product, idx) => {
                  return (
                    <motion.div 
                      key={product.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100/50 shadow-sm flex flex-col group hover:shadow-xl hover:border-slate-200/50 transition-all duration-300"
                    >
                      {/* Card Image */}
                      <div className="relative aspect-[4/3] w-full bg-slate-200 overflow-hidden">
                        <Image 
                          src={product.heroImage}
                          alt={product.title[locale as "en" | "id"]}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col gap-6 flex-1">
                        <div className="flex flex-col gap-3">
                          <span className="text-[#2068F7] text-sm font-bold uppercase tracking-wider">{product.tagline[locale as "en" | "id"]}</span>
                          <h3 className="text-2xl font-black text-[#100420] group-hover:text-primary transition-colors leading-tight">
                            {product.slug.toUpperCase()}
                          </h3>
                          <p className="text-slate-500 leading-relaxed font-normal text-base line-clamp-3">
                            {product.description[locale as "en" | "id"]}
                          </p>
                        </div>

                        {/* Card Link */}
                        <div className="mt-auto pt-6 border-t border-slate-200/60 flex items-center justify-between">
                          <Link 
                            href={`/${locale}/product/${product.slug}`}
                            className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all"
                          >
                            <span>{t("learnMore")}</span>
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Slider Dots */}
              <div className="flex justify-center items-center gap-2 mt-12">
                {hardwareProducts.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setHardwareIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === hardwareIndex ? "w-8 bg-primary" : "w-2.5 bg-slate-200"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ================= ECOSYSTEM READY CTA SECTION (NAVY) ================= */}
        <section className="bg-[#100420] py-20 md:py-28 text-white text-center relative overflow-hidden">
          {/* Subtle background gradients */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/25 rounded-full blur-[128px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#2068F7]/25 rounded-full blur-[128px]" />

          <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8 md:gap-10">
            <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-tight max-w-3xl">
              {t("ctaTitle")}
            </h2>
            
            <Link 
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 hover:scale-[1.03] active:scale-[0.98] text-lg"
            >
              <span>{t("ctaBtn")}</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </section>

      </main>

      <Footer showCta={false} />
    </div>
  );
}
