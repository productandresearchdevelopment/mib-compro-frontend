"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Shield, 
  Mic, 
  LayoutDashboard, 
  Zap, 
  Cpu, 
  BatteryCharging, 
  Landmark, 
  Store, 
  Truck, 
  Factory, 
  Wrench, 
  ArrowRight 
} from "lucide-react";

interface SolutionItem {
  id: string;
  name: { en: string; id: string };
  desc: { en: string; id: string };
  icon: React.ComponentType<any>;
  href: string;
  image: string;
  gridClass: string;
}

interface Category {
  id: string;
  name: { en: string; id: string };
  items: SolutionItem[];
}

export default function SolutionsGridSection() {
  const locale = useLocale();
  const baseHref = `/${locale}`;
  const [activeTab, setActiveTab] = useState("aiot");

  const CATEGORIES: Category[] = [
    {
      id: "aiot",
      name: { en: "AIoT Solutions", id: "Solusi AIoT" },
      items: [
        {
          id: "surveillance",
          name: { en: "AI Surveillance", id: "AI Surveillance" },
          desc: { 
            en: "Intelligent monitoring and analytics to improve security, safety, and business operations.", 
            id: "Pengawasan cerdas untuk meningkatkan keamanan, keselamatan, dan efisiensi operasional bisnis." 
          },
          icon: Camera,
          href: `${baseHref}/our-solution/aiot#surveillance`,
          image: "https://images.unsplash.com/photo-1557597774-9d2736f5dfa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-2 h-[360px]"
        },
        {
          id: "hse",
          name: { en: "AI HSE Safety Check", id: "AI HSE APD Otomatis" },
          desc: { 
            en: "Improve workplace safety with automatic PPE check and hazard notification systems.", 
            id: "Keselamatan kerja terjamin dengan deteksi penggunaan APD dan hazard peringatan otomatis." 
          },
          icon: Shield,
          href: `${baseHref}/our-solution/aiot#hse`,
          image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-1 h-[360px]"
        },
        {
          id: "voice",
          name: { en: "AI Voice Guard", id: "AI Voice Guard" },
          desc: { 
            en: "Real-time voice verification, security matching, and deepfake audio fraud prevention.", 
            id: "Deteksi keaslian suara (fraud) dan penipuan audio deepfake real-time untuk audit transaksi." 
          },
          icon: Mic,
          href: `${baseHref}/our-solution/aiot#voice`,
          image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-1 h-[360px]"
        },
        {
          id: "smart-monitoring",
          name: { en: "AI Smart Monitoring Dashboard", id: "Dasbor AI Smart Monitoring" },
          desc: { 
            en: "Consolidated enterprise operations metrics, diagnostic telemetry, and asset control hubs.", 
            id: "Dasbor terpusat real-time untuk memantau performa jaringan, telemetri, dan kontrol seluruh aset." 
          },
          icon: LayoutDashboard,
          href: `${baseHref}/our-solution/aiot#smart-monitoring`,
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-2 h-[360px]"
        }
      ]
    },
    {
      id: "energy",
      name: { en: "Energy Monitoring", id: "Pemantauan Energi" },
      items: [
        {
          id: "power",
          name: { en: "Electricity Consumption", id: "Konsumsi Daya Listrik" },
          desc: { 
            en: "Analytical dashboard for power utilization, line quality monitoring, and load management.", 
            id: "Analitik kualitas daya kelistrikan, deteksi kebocoran, dan efisiensi energi real-time." 
          },
          icon: Zap,
          href: `${baseHref}/our-solution/energy#electricity`,
          image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-2 h-[360px]"
        },
        {
          id: "genset",
          name: { en: "Genset Status Monitoring", id: "Pemantauan Status Genset" },
          desc: { 
            en: "Track generator output, running hours, fuel levels, alarms, and electrical diagnostics.", 
            id: "Status generator cadangan, bahan bakar solar, waktu kerja mesin, & parameter kelistrikan." 
          },
          icon: Cpu,
          href: `${baseHref}/our-solution/energy#genset`,
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-1 h-[360px]"
        },
        {
          id: "ups",
          name: { en: "UPS & Backup Battery Status", id: "Pemantauan Status Baterai UPS" },
          desc: { 
            en: "Continuous health checks, current load levels, temperature alerts, and critical staging diagnostics for uninterruptible power units.", 
            id: "Kesehatan baterai UPS penyuplai daya darurat, level beban arus, suhu ruang, & alert kegagalan." 
          },
          icon: BatteryCharging,
          href: `${baseHref}/our-solution/energy#ups`,
          image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-3 h-[360px]"
        }
      ]
    },
    {
      id: "industries",
      name: { en: "Industry & Operations", id: "Industri & Operasional" },
      items: [
        {
          id: "banking",
          name: { en: "Secure Banking Solutions", id: "Solusi Perbankan Aman" },
          desc: { 
            en: "ATM cabinet surveillance, Cash Deposit machine security, payment networks, and smart EDCs.", 
            id: "Keamanan brankas ATM/CDM, integrasi platform pembayaran, & mesin EDC terintegrasi." 
          },
          icon: Landmark,
          href: `${baseHref}/our-solution/banking`,
          image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-1 h-[360px]"
        },
        {
          id: "retail",
          name: { en: "Retail & Stores Ecosystem", id: "Ekosistem Retail & Toko" },
          desc: { 
            en: "Cloud POS solutions, integrated payment soundbox terminals, and store visitor traffic analytics.", 
            id: "Sistem kasir POS awan, soundbox transaksi ritel, & analitik konversi pengunjung toko." 
          },
          icon: Store,
          href: `${baseHref}/our-solution/retail`,
          image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-2 h-[360px]"
        },
        {
          id: "logistics",
          name: { en: "Logistics & Distribution", id: "Solusi Logistik & Distribusi" },
          desc: { 
            en: "Real-time dispatch control, vehicle coordinates tracker, fleet routing, and stock analytics.", 
            id: "Manajemen armada distribusi (Fleet), optimalisasi rute jalan, & pelacakan kiriman real-time." 
          },
          icon: Truck,
          href: `${baseHref}/our-solution/logistics`,
          image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-1 h-[360px]"
        },
        {
          id: "manufacturing",
          name: { en: "Smart Manufacturing", id: "Pabrik Manufaktur Pintar" },
          desc: { 
            en: "Factory production line diagnostics, device telemetry, and predictive maintenance protocols.", 
            id: "Pemantauan lini produksi pabrik otomatis, telemetri sensor getar mesin, & pemeliharaan prediktif." 
          },
          icon: Factory,
          href: `${baseHref}/our-solution/manufacturing`,
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-1 h-[360px]"
        },
        {
          id: "fsm",
          name: { en: "Field Service Management", id: "Smart Field Service / FSM" },
          desc: { 
            en: "SLA ticket dispatching, tech scheduler automation, site logs, and real-time operations.", 
            id: "Penjadwalan tiket perbaikan lapangan, laporan staging teknisi, & kepatuhan SLA pelanggan." 
          },
          icon: Wrench,
          href: `${baseHref}/our-solution/fsm`,
          image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
          gridClass: "md:col-span-1 h-[360px]"
        }
      ]
    }
  ];

  const activeCategory = CATEGORIES.find((cat) => cat.id === activeTab) || CATEGORIES[0];

  return (
    <section
      id="layanan-solusi"
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
        
        {/* Section Header: Aligned layout matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2 select-none">
              <span className="w-2.5 h-2.5 bg-primary-500 rounded-[2px]" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
                {locale === "id" ? "Produk & Solusi" : "Products & Solutions"}
              </span>
            </div>
            <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-slate-900 leading-tight font-display uppercase">
              {locale === "id" ? "Produk & Solusi Bisnis" : "Products & Business Solutions"}
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              {locale === "id" 
                ? "Menyajikan platform digital, sensor IoT pintar, dan ekosistem terpadu untuk efisiensi bisnis Anda."
                : "Providing digital platforms, smart IoT sensors, and integrated ecosystems for your business efficiency."}
            </p>
          </div>

          {/* Top-Right "Diskusi Solusi" link */}
          <Link
            href={`/${locale}/contact`}
            className="text-slate-500 hover:text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-200 shrink-0 select-none pb-2 border-b border-transparent hover:border-primary-500"
          >
            <span>{locale === "id" ? "Diskusi Solusi" : "Solution Discussion"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Categories Tabs Navigator */}
        <div className="flex flex-wrap items-center gap-3 select-none pb-2 border-b border-slate-200/50">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border transition-all duration-355 cursor-pointer ${
                  isActive
                    ? "bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/15"
                    : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                }`}
              >
                {cat.name[locale as "id" | "en"]}
              </button>
            );
          })}
        </div>

        {/* Staggered Bento Grid */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            >
              {activeCategory.items.map((item, idx) => (
                <SolutionCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  delay={idx * 0.04}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

// ── Individual Solution Card Component ───────────────────────────────────────────
function SolutionCard({
  item,
  locale,
  delay,
}: {
  item: SolutionItem;
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
            {locale === "id" ? "Produk Solusi" : "Solution Product"}
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

        {/* Actions Button Block: side-by-side matching reference layout */}
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
