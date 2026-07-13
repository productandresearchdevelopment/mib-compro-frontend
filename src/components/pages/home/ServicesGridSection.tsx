"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { 
  Users, 
  Settings, 
  Truck, 
  Wrench, 
  Layers, 
  ArrowRight 
} from "lucide-react";

interface ServiceItem {
  id: string;
  name: { en: string; id: string };
  desc: { en: string; id: string };
  icon: React.ComponentType<any>;
  href: string;
  image: string;
  gridClass: string;
}

export default function ServicesGridSection() {
  const locale = useLocale();
  const baseHref = `/${locale}`;

  const SERVICES: ServiceItem[] = [
    {
      id: "full-managed",
      name: { en: "Full Managed Services", id: "Full Managed Services" },
      desc: { 
        en: "Comprehensive end-to-end IT infrastructure management backed by high-level SLA guarantees.", 
        id: "Layanan pengelolaan infrastruktur IT secara menyeluruh (end-to-end) dengan jaminan SLA tingkat tinggi." 
      },
      icon: Layers,
      href: `${baseHref}/our-solution/fsm`,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
      gridClass: "md:col-span-2 h-[360px]"
    },
    {
      id: "labor",
      name: { en: "Labor Outsourcing", id: "Labor Outsourcing" },
      desc: { 
        en: "Providing IT experts, field technicians, and professional helpdesk resources to support your daily operations.", 
        id: "Penyediaan tenaga ahli IT, teknisi lapangan, dan helpdesk profesional untuk mendukung operasional harian perusahaan." 
      },
      icon: Users,
      href: `${baseHref}/our-solution/fsm`,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
      gridClass: "md:col-span-1 h-[360px]"
    },
    {
      id: "staging",
      name: { en: "Staging & Deployment", id: "Staging & Deployment" },
      desc: { 
        en: "Preparation, configuration, hardware and software testing, and rapid on-site system installation.", 
        id: "Persiapan, konfigurasi, pengujian perangkat keras dan lunak, serta instalasi sistem secara cepat di lokasi klien." 
      },
      icon: Settings,
      href: `${baseHref}/our-solution/fsm`,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
      gridClass: "md:col-span-1 h-[360px]"
    },
    {
      id: "delivery",
      name: { en: "Delivery Management", id: "Delivery Management" },
      desc: { 
        en: "Managing secure and scheduled logistics delivery of hardware equipment across Indonesia.", 
        id: "Pengelolaan logistik pengiriman perangkat keras secara aman dan terjadwal ke seluruh wilayah Indonesia." 
      },
      icon: Truck,
      href: `${baseHref}/our-solution/fsm`,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
      gridClass: "md:col-span-1 h-[360px]"
    },
    {
      id: "maintenance",
      name: { en: "Seat & Site Maintenance", id: "Seat & Site Maintenance" },
      desc: { 
        en: "Routine preventive and corrective maintenance for work terminals (seats) and site locations.", 
        id: "Pemeliharaan preventif dan korektif rutin untuk perangkat kerja (seat) dan infrastruktur lokasi situs Anda." 
      },
      icon: Wrench,
      href: `${baseHref}/our-solution/fsm`,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
      gridClass: "md:col-span-1 h-[360px]"
    }
  ];

  return (
    <section
      id="layanan-solusi-baru"
      className="relative bg-slate-50 py-20 md:py-28 overflow-hidden border-b border-slate-100"
    >
      {/* Background Technical Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(239, 68, 68, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2 select-none">
              <span className="w-2.5 h-2.5 bg-primary-500 rounded-[2px]" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
                {locale === "id" ? "Layanan & Solusi" : "Services & Solutions"}
              </span>
            </div>
            <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-slate-900 leading-tight font-display uppercase">
              {locale === "id" ? "Layanan & Operasional Bisnis" : "Services & Business Operations"}
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              {locale === "id" 
                ? "Dukungan penuh tim ahli lapangan, manajemen staging, pengiriman, serta pemeliharaan situs korporasi Anda."
                : "Full field team support, staging management, delivery, and corporate site maintenance."}
            </p>
          </div>

          {/* Top-Right Link */}
          <Link
            href={`/${locale}/contact`}
            className="text-slate-500 hover:text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-200 shrink-0 select-none pb-2 border-b border-transparent hover:border-primary-500"
          >
            <span>{locale === "id" ? "Diskusi Layanan" : "Service Discussion"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Staggered Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {SERVICES.map((item, idx) => (
            <ServiceCard
              key={item.id}
              item={item}
              locale={locale}
              delay={idx * 0.04}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Individual Service Card Component ────────────────────────────────────────────
function ServiceCard({
  item,
  locale,
  delay,
}: {
  item: ServiceItem;
  locale: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={`relative group overflow-hidden border border-slate-200/40 rounded-[2rem] hover:shadow-[0_25px_60px_rgba(3,7,18,0.1)] hover:scale-[1.005] transition-all duration-500 cursor-pointer ${item.gridClass}`}
    >
      {/* Interactive mouse light gradient */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute inset-0 z-20 w-full h-full"
      >
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-15"
            style={{
              background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(239, 68, 68, 0.06), transparent 85%)`,
            }}
          />
        )}
      </div>

      {/* Graphic background */}
      <img
        src={item.image}
        alt={item.name[locale as "id" | "en"]}
        className="absolute inset-0 w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[1200ms] z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-95" />

      {/* Content */}
      <div className="p-8 relative z-25 flex flex-col justify-end h-full w-full space-y-3 pointer-events-none">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-1.5 select-none">
          <span className="text-red-400 group-hover:scale-115 transition-transform duration-300">
            <item.icon size={11} />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-300 font-mono">
            {locale === "id" ? "Layanan Operasional" : "Operational Service"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight uppercase font-display tracking-tight group-hover:text-primary-400 transition-colors duration-300">
          {item.name[locale as "id" | "en"]}
        </h3>

        {/* Description */}
        <p className="text-white text-xs sm:text-[13px] leading-relaxed max-w-xl">
          {item.desc[locale as "id" | "en"]}
        </p>

        {/* Actions Button Block */}
        <div className="flex items-center gap-3 pt-2 pointer-events-auto">
          
          {/* Konsultasi */}
          <Link
            href={`/${locale}/contact`}
            className="bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-primary-600/15"
          >
            {locale === "id" ? "Konsultasi" : "Consultation"}
          </Link>

          {/* Pelajari */}
          <Link
            href={item.href}
            className="bg-white/10 text-white hover:bg-white/15 border border-white/15 hover:border-white/35 font-extrabold text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md"
          >
            {locale === "id" ? "Pelajari" : "Learn"}
          </Link>

        </div>

      </div>
    </motion.div>
  );
}
