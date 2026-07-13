"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

interface ProductsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ProductsMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: ProductsMegaMenuProps) {
  const locale = useLocale();
  const baseHref = `/${locale}`;

  const PARTNERSHIP_CARDS = [
    {
      name: "Aisino",
      desc: {
        en: "Smart Soundbox for instant voice payment verification.",
        id: "Soundbox Pintar untuk verifikasi pembayaran suara instan."
      },
      logo: "/images/partnership/aisino.png",
      logoWidth: "w-20",
      href: `${baseHref}/product/aisino`
    },
    {
      name: "Sunmi",
      desc: {
        en: "Next-gen smart POS and mobile EDC terminals.",
        id: "Terminal POS pintar dan EDC seluler generasi terbaru."
      },
      logo: "/images/partnership/sunmi.png",
      logoWidth: "w-16",
      href: `${baseHref}/product/sunmi`
    },
    {
      name: "Telpo",
      desc: {
        en: "Biometric and smart desktop POS terminals.",
        id: "Terminal POS meja pintar dan biometrik."
      },
      logo: "/images/partnership/telpo.png",
      logoWidth: "w-16",
      href: `${baseHref}/product/telpo`
    },
    {
      name: "Masterwork",
      desc: {
        en: "High-security Cash Deposit and recycling machines.",
        id: "Mesin Cash Deposit dan daur ulang uang berkeamanan tinggi."
      },
      logo: "/images/partnership/ma.png",
      logoWidth: "w-24",
      href: `${baseHref}/product/masterwork`
    },
    {
      name: "GND",
      desc: {
        en: "Automated high-speed cash counter & validator.",
        id: "Penghitung dan validator uang otomatis berkecepatan tinggi."
      },
      logo: "/images/partnership/gnd.png",
      logoWidth: "w-16",
      href: `${baseHref}/product/gnd`
    },
    {
      name: "Transsion",
      desc: {
        en: "Digital advertising campaign and mobile push ads.",
        id: "Kampanye iklan digital dan push ads seluler."
      },
      logo: "/images/partnership/transsion.png",
      logoWidth: "w-24",
      href: `${baseHref}/product/transsion`
    },
    {
      name: "Willowmore",
      desc: {
        en: "Keyless smartlock security and access control systems.",
        id: "Sistem kontrol akses dan keamanan smartlock tanpa kunci."
      },
      logo: "/images/partnership/willowmore.png",
      logoWidth: "w-24",
      href: `${baseHref}/product/willowmore`
    }
  ];

  const CASE_STUDIES = [
    {
      title: {
        en: "AI Surveillance: Smart Cabin Security Deployment for 1,200 ATM Sites",
        id: "AI Surveillance: Implementasi Keamanan Cabin Pintar di 1.200 Situs ATM"
      },
      image: "/images/preview_video_bg.png",
      href: `${baseHref}/insights`
    },
    {
      title: {
        en: "FSM Implementation: Optimizing Field Technician Schedules across East Java",
        id: "Implementasi FSM: Mengoptimalkan Jadwal Teknisi Lapangan di Jawa Timur"
      },
      image: "/images/usecase_logistics.png",
      href: `${baseHref}/insights`
    },
    {
      title: {
        en: "Energy Monitoring: Reducing Electricity Consumption by 18% in Manufacturing Plant",
        id: "Pemantauan Energi: Menurunkan Konsumsi Listrik sebesar 18% di Pabrik Manufaktur"
      },
      image: "/images/preview_video_bg.png",
      href: `${baseHref}/insights`
    },
    {
      title: {
        en: "AI HSE: Workplace Safety PPE Compliance at Off-shore Oil Drilling Site",
        id: "AI HSE: Kepatuhan APD Keselamatan Kerja di Lokasi Pengeboran Minyak Lepas Pantai"
      },
      image: "/images/usecase_logistics.png",
      href: `${baseHref}/insights`
    },
    {
      title: {
        en: "Smart EDC & Retail Integration: Boosting Transaction Speeds in 500+ Outlets",
        id: "Integrasi Ritel & EDC Pintar: Meningkatkan Kecepatan Transaksi di 500+ Outlet"
      },
      image: "/images/preview_video_bg.png",
      href: `${baseHref}/insights`
    }
  ];

  const [activeCaseIdx, setActiveCaseIdx] = React.useState(0);
  const [leftSlideIdx, setLeftSlideIdx] = React.useState(0);

  React.useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setActiveCaseIdx((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setLeftSlideIdx((prev) => (prev + 1) % 2);
    }, 40000);
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
        <div className="p-8 grid grid-cols-12 gap-8">
          {/* LEFT COLUMN: Main Products (col-span-7) */}
          <div className="col-span-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1 border-b border-slate-100 pb-2.5">
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                  {leftSlideIdx === 0 
                    ? (locale === "id" ? "Produk Unggulan" : "Featured Products")
                    : (locale === "id" ? "Produk Kemitraan" : "Partnership Products")}
                </span>
                {/* Dot indicators for left slider */}
                <div className="flex gap-1.5 items-center">
                  <button
                    onClick={() => setLeftSlideIdx(0)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      leftSlideIdx === 0 ? "w-4.5 bg-primary" : "w-1.5 bg-slate-200"
                    }`}
                    aria-label="View Featured Products"
                  />
                  <button
                    onClick={() => setLeftSlideIdx(1)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      leftSlideIdx === 1 ? "w-4.5 bg-primary" : "w-1.5 bg-slate-200"
                    }`}
                    aria-label="View Partnership Products"
                  />
                </div>
              </div>
            </div>

            {/* Sliding Product Content */}
            <div className="relative min-h-[285px] w-full">
              <AnimatePresence mode="wait">
                {leftSlideIdx === 0 ? (
                  <motion.div
                    key="featured"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-2 gap-5 w-full absolute inset-x-0"
                  >
                    {/* Field Service Management Card (QIFESS) */}
                    <Link
                      href={`${baseHref}/product/qifess`}
                      className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-100/50 hover:-translate-y-0.5 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary h-[285px]"
                      onClick={onClose}
                      aria-label="Learn more about QIFESS"
                    >
                      <div>
                        <div className="flex items-center justify-between w-full mb-4">
                          <div className="relative h-7 w-28">
                            <Image
                              src="/images/logo-qifess.png"
                              alt="QIFESS Logo"
                              fill
                              className="object-contain object-left"
                            />
                          </div>
                          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-all shrink-0">
                            <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4.5 h-4.5" />
                          </div>
                        </div>
                        <p className="text-[13.5px] text-slate-500 font-normal leading-relaxed mb-6">
                          {locale === "id" 
                            ? "Platform lengkap untuk mengelola operasi lapangan, tim, dan pelacakan aset secara real-time."
                            : "All in one platform to manage field operations, dispatch teams, and track assets in real-time."}
                        </p>
                      </div>
                      <span className="text-[12.5px] font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 flex items-center gap-1 mt-auto">
                        {locale === "id" ? "Selengkapnya" : "Learn More"} &rarr;
                      </span>
                    </Link>

                    {/* protectQube AI-based platform Card */}
                    <Link
                      href={`${baseHref}/product/surveillance-ai-atm`}
                      className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-100/50 hover:-translate-y-0.5 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary h-[285px]"
                      onClick={onClose}
                      aria-label="Learn more about protectQube"
                    >
                      <div>
                        <div className="flex items-center justify-between w-full mb-4">
                          <div className="relative h-8 w-36">
                            <Image
                              src="/images/logo-protectcube.png"
                              alt="protectQube Logo"
                              fill
                              className="object-contain object-left"
                            />
                          </div>
                          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-all shrink-0">
                            <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4.5 h-4.5" />
                          </div>
                        </div>
                        <p className="text-[13.5px] text-slate-500 font-normal leading-relaxed mb-6">
                          {locale === "id"
                            ? "Solusi AIoT menyeluruh untuk berbagai industri dengan pemantauan real-time, analitik, dan kemampuan respons otomatis untuk meningkatkan keandalan operasional."
                            : "End-to-end AIoT solutions for multi-industry environments with real-time monitoring, analytics, and automated response capabilities to improve operational reliability."}
                        </p>
                      </div>
                      <span className="text-[12.5px] font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 flex items-center gap-1 mt-auto">
                        {locale === "id" ? "Selengkapnya" : "Learn More"} &rarr;
                      </span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="partnership"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-4 gap-3 w-full absolute inset-x-0"
                  >
                    {PARTNERSHIP_CARDS.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 hover:shadow-md rounded-xl p-3.5 transition-all duration-200 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary h-[135px]"
                        onClick={onClose}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className={`relative h-4.5 ${item.logoWidth}`}>
                            <Image
                              src={item.logo}
                              alt={`${item.name} Logo`}
                              fill
                              className="object-contain object-left"
                            />
                          </div>
                          <div className="w-5.5 h-5.5 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-all shrink-0">
                            <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-3 h-3" />
                          </div>
                        </div>
                        
                        <p className="text-slate-500 text-[9.5px] leading-snug font-normal mt-2.5 mb-1.5 flex-grow">
                          {item.desc[locale as "en" | "id"]}
                        </p>

                        <span className="text-[9.5px] font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 flex items-center gap-0.5 mt-auto">
                          {locale === "id" ? "Selengkapnya" : "Learn More"} &rarr;
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: Featured Case Studies (col-span-5) */}
          <div className="col-span-5 flex flex-col gap-6 border-l border-slate-100 pl-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                {locale === "id" ? "Studi Kasus" : "Case Studies"}
              </span>
              {/* Slide Indicators */}
              <div className="flex gap-1.5 items-center">
                {CASE_STUDIES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCaseIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeCaseIdx ? "w-4.5 bg-primary" : "w-1.5 bg-slate-200"
                    }`}
                    aria-label={`Go to case study ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Sliding Card Banner */}
            <div className="relative aspect-[21/10] w-full rounded-2xl overflow-hidden shadow-md border border-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCaseIdx}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Link
                    href={CASE_STUDIES[activeCaseIdx].href}
                    className="relative w-full h-full flex flex-col justify-end p-5 group/news block"
                    onClick={onClose}
                    aria-label="View case study"
                  >
                    <Image
                      src={CASE_STUDIES[activeCaseIdx].image}
                      alt="Case Study Banner"
                      fill
                      className="object-cover transition-transform duration-700 group-hover/news:scale-105"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>
                    
                    <div className="relative z-10 flex items-end justify-between gap-4 w-full">
                      <p className="text-[13px] font-bold text-white leading-snug max-w-[280px] line-clamp-2">
                        {CASE_STUDIES[activeCaseIdx].title[locale as "en" | "id"]}
                      </p>
                      <div className="w-8.5 h-8.5 rounded-full bg-white flex items-center justify-center text-slate-900 group-hover/news:scale-110 transition-transform shrink-0 shadow-md">
                        <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
