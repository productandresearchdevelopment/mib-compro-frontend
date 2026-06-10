"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft,
  Cpu, 
  Layout, 
  Smartphone, 
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRODUCTS_DATA, ProductItem } from "@/data/productsData";

const solutionNames: Record<string, { en: string; id: string }> = {
  fsm: { en: "Field Service Management", id: "Manajemen Operasi Lapangan" },
  aiot: { en: "AIoT & Connected IoT", id: "Kecerdasan Buatan & IoT" },
  "asset-tracking": { en: "Asset Tracking", id: "Pelacakan Aset" },
  analytics: { en: "Reporting & Analytics", id: "Pelaporan & Analitik" },
  manufacturing: { en: "Smart Factory", id: "Pabrik Pintar" },
  "energy-industry": { en: "Energy & Utilities", id: "Energi & Utilitas" },
  banking: { en: "Banking Systems", id: "Sistem Perbankan" },
  logistics: { en: "Fleet & Logistics", id: "Armada & Logistik" },
};

const getRelatedSolutions = (slug: string) => {
  switch (slug) {
    case "qifess":
      return ["fsm", "analytics"];
    case "simq":
      return ["banking", "analytics"];
    case "protectqube":
      return ["asset-tracking", "logistics", "manufacturing"];
    case "sensor-monitoring":
      return ["aiot", "manufacturing", "energy-industry"];
    case "edc":
    case "soundbox":
    case "mhu":
      return ["banking"];
    default:
      return [];
  }
};

interface ProductCategoryShowcaseProps {
  id: string;
  badge: string;
  title: string;
  description: string;
  products: any[];
  theme: "light" | "dark";
  locale: string;
}

function ProductCategoryShowcase({
  id,
  badge,
  title,
  description,
  products,
  theme,
  locale
}: ProductCategoryShowcaseProps) {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start start", "end end"]
  });

  const xTranslation = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  useEffect(() => {
    const calculateRange = () => {
      if (!trackRef.current) return;

      const originalTransform = trackRef.current.style.transform;
      trackRef.current.style.transform = "none";

      const rect = trackRef.current.getBoundingClientRect();
      const trackWidth = rect.width;
      const initialLeft = rect.left;
      const viewportWidth = window.innerWidth;

      trackRef.current.style.transform = originalTransform;

      if (trackWidth + initialLeft <= viewportWidth) {
        setScrollRange(0);
        return;
      }

      const range = trackWidth + 2 * initialLeft - viewportWidth;
      setScrollRange(range > 0 ? range : 0);
    };

    calculateRange();
    const timer = setTimeout(calculateRange, 150);

    window.addEventListener("resize", calculateRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateRange);
    };
  }, [products]);

  const sectionBg = theme === "dark" ? "bg-[#100420]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-[#100420]";
  const subtextColor = theme === "dark" ? "text-slate-400" : "text-slate-500";

  const getProductImage = (slug: string, defaultImage: string) => {
    switch (slug) {
      // Software
      case "qifess":
        return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
      case "simq":
        return "https://images.unsplash.com/photo-1563013544-824ae1d704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
      // IoT
      case "protectqube":
        return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
      case "sensor-monitoring":
        return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
      default:
        return defaultImage;
    }
  };

  return (
    <section
      ref={setScrollContainer}
      id={id}
      className={`relative h-[200vh] ${sectionBg}`}
    >
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center py-6 overflow-hidden">
        {/* Header Block */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-8 space-y-3 shrink-0 z-10">
          {/* Badge */}
          <div className="flex items-center gap-2 select-none">
            <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
            <span className={`text-xs sm:text-sm font-bold uppercase tracking-widest font-mono ${theme === "dark" ? "text-slate-200" : "text-slate-900"}`}>
              {badge}
            </span>
          </div>
          
          {/* Title */}
          <h2 className={`text-3xl md:text-[40px] font-semibold tracking-tight ${textColor} leading-tight`}>
            {title}
          </h2>
          
          {/* Subtitle */}
          <p className={`${subtextColor} text-base md:text-lg leading-relaxed max-w-4xl font-normal`}>
            {description}
          </p>
        </div>

        {/* Scrolling Panel Track */}
        <motion.div
          ref={trackRef}
          style={{ x: xTranslation }}
          className="flex gap-8 px-6 md:px-0 md:ml-[calc(max(1.5rem,(100vw-80rem)/2+1.5rem))] w-[max-content]"
        >
          {products.map((product) => {
            const titleText = typeof product.title === "string" ? product.title : product.title[locale as "en" | "id"];
            const descText = typeof product.description === "string" ? product.description : product.description[locale as "en" | "id"];
            const imageUrl = getProductImage(product.slug, product.heroImage);
            return (
              <Link
                key={product.slug}
                href={`/${locale}/product/${product.slug}`}
                className={`w-[80vw] sm:w-[320px] md:w-[340px] lg:w-[360px] h-[480px] flex flex-col justify-end group shrink-0 rounded-3xl border relative overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                  theme === "dark" 
                    ? "border-slate-800/80 bg-slate-900/40 hover:border-slate-700/60" 
                    : "border-slate-100 bg-slate-50 shadow-md hover:border-slate-200"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={imageUrl}
                  alt={titleText}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, 360px"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none z-10" />

                {/* Details Area */}
                <div className="flex flex-col gap-3 p-6 md:p-8 z-20 text-white relative justify-end">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight font-sans">
                    {titleText}
                  </h3>
                  
                  <p className="text-slate-205 text-slate-200 text-sm leading-relaxed line-clamp-3 font-normal">
                    {descText}
                  </p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default function ProductsPage() {
  const locale = useLocale();
  const t = useTranslations("product");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Separate data by categories
  const softwareProducts = useMemo(() => PRODUCTS_DATA.filter((p) => p.category === "software"), []);
  const iotProducts = useMemo(() => PRODUCTS_DATA.filter((p) => p.category === "iot"), []);
  const hardwareProducts = useMemo(() => PRODUCTS_DATA.filter((p) => p.category === "hardware"), []);

  const tHardware = useTranslations("hardwareShowcase");

  const hardwareProductsList = useMemo(() => [
    {
      slug: "padlock",
      title: tHardware("items.padlock.title"),
      description: tHardware("items.padlock.desc"),
      heroImage: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      slug: "soundbox",
      title: tHardware("items.soundbox.title"),
      description: tHardware("items.soundbox.desc"),
      heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      slug: "edc",
      title: tHardware("items.edc.title"),
      description: tHardware("items.edc.desc"),
      heroImage: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      slug: "mhu",
      title: tHardware("items.counter.title"),
      description: tHardware("items.counter.desc"),
      heroImage: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      slug: "pos",
      title: tHardware("items.pos.title"),
      description: tHardware("items.pos.desc"),
      heroImage: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      slug: "cctv",
      title: tHardware("items.cctv.title"),
      description: tHardware("items.cctv.desc"),
      heroImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      slug: "cash-deposit",
      title: tHardware("items.cash_deposit.title"),
      description: tHardware("items.cash_deposit.desc"),
      heroImage: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    }
  ], [tHardware]);



  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      <Navbar theme="light" />

      {/* Main Container */}
      <main className="flex-grow pt-28 md:pt-36 pb-32 relative">
        {/* Modern Accent Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
          
          {/* --- HERO SECTION (Modern Split Grid) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
            <div className="lg:col-span-7 space-y-4 text-left">
              {/* Short, focused headline matching solution page size and weights */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]"
              >
                {locale === "id" ? "Ekosistem Produk Terpadu Kami" : "Our Unified Product Ecosystem"}
              </motion.h1>
            </div>

            <div className="lg:col-span-5 text-left">
              {/* Description matching solution page layout */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-slate-600 text-lg leading-relaxed font-normal"
              >
                {locale === "id"
                  ? "Platform perangkat lunak terpadu, sistem sensor nirkabel IoT, dan perangkat keras tangguh yang dirancang bekerja sama untuk mengoptimalkan operasional ICT Anda."
                  : "Integrated software platforms, wireless IoT sensor systems, and rugged hardware endpoints designed to work together to optimize your ICT operations."}
              </motion.p>
            </div>
          </div>

          {/* 3 Type Product Category Switcher Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
          >
            {/* Card 1: Software */}
            <motion.div 
              variants={itemVariants}
              onClick={() => scrollToSection("software")}
              className="relative h-[340px] sm:h-[400px] rounded-[30px] p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:shadow-2xl border border-slate-800/40 hover:border-slate-700/60 bg-[#0b1220] overflow-hidden hover:-translate-y-1 select-none"
            >
              {/* Card Background Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/solution_software.png"
                  alt="Software Background"
                  fill
                  className="object-cover opacity-35 blur-[1px] transition-transform duration-750 group-hover:scale-[1.04] group-hover:opacity-45"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(32,104,247,0.15),transparent_60%)]" />
                {/* Dark Vignette/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/75 to-[#0b1220]/25" />
              </div>

              {/* Top Section */}
              <div className="relative z-10">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-blue-400 uppercase">
                  {locale === "id" ? "SOLUSI SOFTWARE" : "SOFTWARE"}
                </span>
              </div>

              {/* Bottom Section */}
              <div className="relative z-10 flex flex-col justify-end">
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight transition-colors">
                  {locale === "id" ? "Solusi Software" : "Software Solutions"}
                </h3>
                <p className="text-slate-300/90 text-xs sm:text-sm font-sans leading-relaxed max-w-[280px] max-h-0 opacity-0 overflow-hidden group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-in-out">
                  {locale === "id" 
                    ? "Platform perangkat lunak skalabel untuk mengelola operasional, tim, dan data dengan mudah." 
                    : "Scalable software platforms to manage operations, teams, and data with ease and accuracy."}
                </p>
              </div>
            </motion.div>

            {/* Card 2: IoT */}
            <motion.div 
              variants={itemVariants}
              onClick={() => scrollToSection("iot")}
              className="relative h-[340px] sm:h-[400px] rounded-[30px] p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:shadow-2xl border border-slate-800/40 hover:border-slate-700/60 bg-[#0b1220] overflow-hidden hover:-translate-y-1 select-none"
            >
              {/* Card Background Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/solution_iot.png"
                  alt="IoT Background"
                  fill
                  className="object-cover opacity-35 blur-[1px] transition-transform duration-750 group-hover:scale-[1.04] group-hover:opacity-45"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.12),transparent_60%)]" />
                {/* Dark Vignette/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/75 to-[#0b1220]/25" />
              </div>

              {/* Top Section */}
              <div className="relative z-10">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-emerald-400 uppercase">
                  {locale === "id" ? "SISTEM IOT" : "IOT SYSTEMS"}
                </span>
              </div>

              {/* Bottom Section */}
              <div className="relative z-10 flex flex-col justify-end">
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight transition-colors">
                  {locale === "id" ? "Sistem IoT" : "IoT Systems"}
                </h3>
                <p className="text-slate-300/90 text-xs sm:text-sm font-sans leading-relaxed max-w-[280px] max-h-0 opacity-0 overflow-hidden group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-in-out">
                  {locale === "id"
                    ? "Perangkat dan sensor terhubung yang memantau dan mengirim data secara real-time di mana saja."
                    : "Connected devices and sensors that monitor, track, and deliver real-time data anywhere."}
                </p>
              </div>
            </motion.div>

            {/* Card 3: Hardware */}
            <motion.div 
              variants={itemVariants}
              onClick={() => scrollToSection("hardware")}
              className="relative h-[340px] sm:h-[400px] rounded-[30px] p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:shadow-2xl border border-slate-800/40 hover:border-slate-700/60 bg-[#0b1220] overflow-hidden hover:-translate-y-1 select-none"
            >
              {/* Card Background Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/solution_hardware.png"
                  alt="Hardware Background"
                  fill
                  className="object-cover opacity-35 blur-[1px] transition-transform duration-750 group-hover:scale-[1.04] group-hover:opacity-45"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.12),transparent_60%)]" />
                {/* Dark Vignette/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/75 to-[#0b1220]/25" />
              </div>

              {/* Top Section */}
              <div className="relative z-10">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-red-400 uppercase">
                  {locale === "id" ? "PERANGKAT KERAS" : "HARDWARE"}
                </span>
              </div>

              {/* Bottom Section */}
              <div className="relative z-10 flex flex-col justify-end">
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight transition-colors">
                  {locale === "id" ? "Perangkat Keras" : "Hardware Devices"}
                </h3>
                <p className="text-slate-300/90 text-xs sm:text-sm font-sans leading-relaxed max-w-[280px] max-h-0 opacity-0 overflow-hidden group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-in-out">
                  {locale === "id"
                    ? "Perangkat keras berkualitas tinggi yang dirancang untuk mendukung operasional lapangan dan kantor."
                    : "High-quality hardware devices designed to support your operations in the field and office."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>


        {/* ================= IoT SYSTEMS SECTION (LIGHT BG) ================= */}
        <ProductCategoryShowcase
          id="iot"
          badge={locale === "id" ? "SISTEM IOT" : "IOT SYSTEMS"}
          title={t("iotTitle")}
          description={t("iotDesc")}
          products={iotProducts}
          theme="light"
          locale={locale}
        />

        {/* ================= SOFTWARE SOLUTIONS SECTION (DARK BLUE BG) ================= */}
        <ProductCategoryShowcase
          id="software"
          badge={locale === "id" ? "SOLUSI SOFTWARE" : "SOFTWARE SOLUTIONS"}
          title={t("softwareTitle")}
          description={t("softwareDesc")}
          products={softwareProducts}
          theme="dark"
          locale={locale}
        />

        {/* ================= HARDWARE DEVICES SECTION (LIGHT BG) ================= */}
        <ProductCategoryShowcase
          id="hardware"
          badge={locale === "id" ? "PERANGKAT KERAS" : "HARDWARE DEVICES"}
          title={t("hardwareTitle")}
          description={t("hardwareDesc")}
          products={hardwareProductsList}
          theme="light"
          locale={locale}
        />

      </main>

      <Footer showCta={false} />
    </div>
  );
}
