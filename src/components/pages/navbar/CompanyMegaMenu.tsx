"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import * as Hugeicons from "@hugeicons/core-free-icons";

interface CompanyMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function CompanyMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: CompanyMegaMenuProps) {
  const locale = useLocale();
  const baseHref = `/${locale}`;

  // Helper to safely get icon
  const getIcon = (name: string) => {
    if (name in Hugeicons) {
      return Hugeicons[name as keyof typeof Hugeicons];
    }
    return Hugeicons.PackageIcon;
  };

  const COMPANY_LINKS = [
    {
      name: locale === "id" ? "Tentang Kami" : "About Us",
      icon: "Building01Icon",
      href: `${baseHref}/company`
    },
    {
      name: locale === "id" ? "Karir" : "Careers",
      icon: "Briefcase01Icon",
      href: `${baseHref}/careers`
    },
    {
      name: locale === "id" ? "Berita Terbaru" : "News",
      icon: "NewspaperIcon",
      href: `${baseHref}/news`
    },
    {
      name: locale === "id" ? "Hubungi Kami" : "Contact Us",
      icon: "ContactIcon",
      href: `${baseHref}/contact`
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
          {/* LEFT COLUMN: Company Info (col-span-6) */}
          <div className="col-span-6 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <span className="text-[12px] font-bold tracking-widest text-slate-400 uppercase">
                {locale === "id" ? "Perusahaan Kami" : "Our Company"}
              </span>

              <div className="flex flex-col gap-2">
                {COMPANY_LINKS.map((item, idx) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex items-center gap-4 group/item py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                      onClick={onClose}
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover/item:bg-red-50 group-hover/item:text-primary transition-colors shrink-0">
                        <HugeiconsIcon icon={Icon} className="w-5 h-5" />
                      </div>
                      <span className="text-slate-800 font-semibold text-[16px] group-hover/item:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Explore Solutions Link */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <Link
                href={`${baseHref}/solution`}
                className="inline-flex items-center gap-2 text-[16px] font-bold text-slate-900 hover:text-primary transition-colors group/explore"
                onClick={onClose}
              >
                {locale === "id" ? "Jelajahi Solusi" : "Explore Solutions"}
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="w-4.5 h-4.5 group-hover/explore:translate-x-1.5 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Latest News (col-span-6) */}
          <div className="col-span-6 flex flex-col gap-4 border-l border-slate-100 pl-10">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold tracking-widest text-slate-400 uppercase">
                {locale === "id" ? "Berita Terbaru" : "Latest News"}
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
              href={`${baseHref}/news`}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden group/news shadow-md border border-slate-100 flex flex-col justify-end p-6 w-full h-[230px]"
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
                <p className="text-[15px] font-semibold text-white leading-snug max-w-[320px] line-clamp-2">
                  {locale === "id"
                    ? "PT Qualita Indonesia Perkenalkan Energy Monitoring Dashboard Berbasis IoT"
                    : "PT Qualita Indonesia Introduces IoT-Based Energy Monitoring Dashboard"}
                </p>
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-900 group-hover/news:scale-110 transition-transform shrink-0">
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
