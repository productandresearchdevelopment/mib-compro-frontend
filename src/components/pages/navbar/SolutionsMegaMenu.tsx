"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import * as Hugeicons from "@hugeicons/core-free-icons";

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

  // Helper to safely get icon
  const getIcon = (name: string) => {
    if (name in Hugeicons) {
      return Hugeicons[name as keyof typeof Hugeicons];
    }
    return Hugeicons.PackageIcon;
  };

  const USE_CASES = [
    {
      name: "AIoT",
      icon: "CpuIcon",
      href: `${baseHref}/our-solution/aiot`
    },
    {
      name: locale === "id" ? "Pelacakan Aset" : "Asset Tracking",
      icon: "Location01Icon",
      href: `${baseHref}/our-solution/asset-tracking`
    },
    {
      name: "Field Service Management",
      icon: "TaskDone01Icon",
      href: `${baseHref}/our-solution/fsm`
    },
    {
      name: locale === "id" ? "Pelaporan & Analitik" : "Reporting & Analytics",
      icon: "Analytics01Icon",
      href: `${baseHref}/our-solution/analytics`
    },
    {
      name: locale === "id" ? "Energi & Utilitas" : "Energy & Utilities",
      icon: "FlashIcon",
      href: `${baseHref}/our-solution/energy`
    },
    {
      name: locale === "id" ? "Infrastruktur Cerdas" : "Smart Infrastructure",
      icon: "Building01Icon",
      href: `${baseHref}/our-solution/smart-infrastructure`
    }
  ];

  const INDUSTRIES = [
    {
      name: locale === "id" ? "Perbankan" : "Banking",
      icon: "BankIcon",
      href: `${baseHref}/our-solution/banking`
    },
    {
      name: locale === "id" ? "Logistik & Distribusi" : "Logistics & Distribution",
      icon: "DeliveryTruck01Icon",
      href: `${baseHref}/our-solution/logistics`
    },
    {
      name: locale === "id" ? "Manufaktur" : "Manufacturing",
      icon: "FactoryIcon",
      href: `${baseHref}/our-solution/manufacturing`
    },
    {
      name: locale === "id" ? "Energi & Utilitas" : "Energy & Utilities",
      icon: "FlashIcon",
      href: `${baseHref}/our-solution/energy-industry`
    }
  ];

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
        className="absolute top-[88px] left-6 right-6 max-w-[1232px] mx-auto bg-white border border-slate-100 rounded-3xl z-40 transition-all duration-300 hidden md:block before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-['']"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="px-10 py-12 grid grid-cols-12 gap-12">
          {/* LEFT COLUMN: Use Cases & Industries (col-span-7) */}
          <div className="col-span-7 flex flex-col gap-10">
            {/* by Use Case */}
            <div className="flex flex-col gap-4">
              <span className="text-[12px] font-bold tracking-widest text-slate-400 uppercase">
                {locale === "id" ? "Berdasarkan Penggunaan" : "by Use Case"}
              </span>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {USE_CASES.map((item, idx) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex items-center gap-3.5 group/item py-1 hover:text-primary transition-colors"
                      onClick={onClose}
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700 group-hover/item:bg-red-50 group-hover/item:text-primary transition-colors shrink-0">
                        <HugeiconsIcon icon={Icon} className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-slate-800 font-medium text-[15.5px] group-hover/item:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* by Industry */}
            <div className="flex flex-col gap-4">
              <span className="text-[12px] font-bold tracking-widest text-slate-400 uppercase">
                {locale === "id" ? "Berdasarkan Industri" : "by Industry"}
              </span>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {INDUSTRIES.map((item, idx) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex items-center gap-3.5 group/item py-1 hover:text-primary transition-colors"
                      onClick={onClose}
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700 group-hover/item:bg-red-50 group-hover/item:text-primary transition-colors shrink-0">
                        <HugeiconsIcon icon={Icon} className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-slate-800 font-medium text-[15.5px] group-hover/item:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Explore all solutions link */}
            <div className="mt-2 border-t border-slate-100 pt-6">
              <Link
                href={`${baseHref}/our-solution`}
                className="inline-flex items-center gap-2 text-[16px] font-bold text-slate-900 hover:text-primary transition-colors group/explore"
                onClick={onClose}
              >
                {locale === "id" ? "Jelajahi semua solusi" : "Explore all solutions"}
                <HugeiconsIcon icon={ArrowRight01Icon} className="w-4.5 h-4.5 group-hover/explore:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Featured solutions & Latest News (col-span-5) */}
          <div className="col-span-5 flex flex-col gap-8 border-l border-slate-100 pl-10">
            {/* Main Products */}
            <div className="flex flex-col gap-4">
              <span className="text-[12px] font-bold tracking-widest text-slate-400 uppercase">
                {locale === "id" ? "Produk Utama" : "Main Products"}
              </span>

              <div className="flex flex-col gap-3">
                {/* QIFESS Card */}
                <Link
                  href={`${baseHref}/product/qifess`}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all flex flex-col gap-2 group/qifess relative"
                  onClick={onClose}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="relative h-7 w-28">
                      <Image
                        src="/images/logo-qifess.png"
                        alt="QIFESS Logo"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover/qifess:text-primary group-hover/qifess:border-slate-300 transition-colors shrink-0">
                      <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed max-w-[280px]">
                    {locale === "id" 
                      ? "Platform lengkap untuk mengelola operasi lapangan, tim, dan aset."
                      : "All in one platform to manage field operations, teams, and assets."}
                  </p>
                </Link>

                {/* AI ATM Security Card */}
                <Link
                  href={`${baseHref}/product/surveillance-ai-atm`}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all flex flex-col gap-2 group/qube relative"
                  onClick={onClose}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="relative h-8 w-40">
                      <Image
                        src="/images/logo-protectcube.png"
                        alt="surveillance-ai-atm Logo"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover/qube:text-primary group-hover/qube:border-slate-300 transition-colors shrink-0">
                      <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed max-w-[280px]">
                    {locale === "id"
                      ? "Sistem pengawasan keamanan ATM berbasis AI dan computer vision."
                      : "AI-powered security and surveillance systems for ATM cabins."}
                  </p>
                </Link>
              </div>
            </div>

            {/* Latest Insights */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold tracking-widest text-slate-400 uppercase">
                  {locale === "id" ? "Insight Terbaru" : "Latest Insights"}
                </span>
                {/* Pagination Dots */}
                <div className="flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                </div>
              </div>

              {/* News Card Banner */}
              <Link
                href={`${baseHref}/insights`}
                className="relative aspect-[21/9] rounded-2xl overflow-hidden group/news shadow-md border border-slate-100 flex flex-col justify-end p-5"
                onClick={onClose}
              >
                <Image
                  src="/images/preview_video_bg.png"
                  alt="Latest News Banner"
                  fill
                  className="object-cover transition-transform duration-700 group-hover/news:scale-105"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="relative z-10 flex items-end justify-between gap-4 w-full">
                  <p className="text-[14px] md:text-[15px] font-semibold text-white leading-snug max-w-[260px] line-clamp-2">
                    {locale === "id"
                      ? "PT Qualita Indonesia Perkenalkan Energy Monitoring Dashboard Berbasis IoT"
                      : "PT Qualita Indonesia Introduces IoT-Based Energy Monitoring Dashboard"}
                  </p>
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-900 group-hover/news:scale-110 transition-transform shrink-0">
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
