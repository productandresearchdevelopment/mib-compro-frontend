"use client";

import React, { useMemo } from "react";
import { ArrowRight, MapPin, Smartphone, Activity, Calendar, Clock, Download } from "lucide-react";

interface FeatureShowcaseItem {
  key: string;
  title: {
    en: string;
    id: string;
  };
  desc: {
    en: string;
    id: string;
  };
  icon: React.ComponentType<any>;
  image: string;
}

interface QifessFeaturesShowcaseProps {
  locale: string;
}

export default function QifessFeaturesShowcase({ locale }: QifessFeaturesShowcaseProps) {
  const features: FeatureShowcaseItem[] = useMemo(
    () => [
      {
        key: "tracking",
        title: {
          en: "Real-Time Technician Tracking",
          id: "Pelacakan Teknisi Real-Time",
        },
        desc: {
          en: "Track technician location and status live on an interactive map to optimize daily dispatching.",
          id: "Lacak lokasi dan status teknisi secara langsung di peta interaktif untuk mengoptimalkan pengiriman harian.",
        },
        icon: MapPin,
        image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      },
      {
        key: "mobile",
        title: {
          en: "Active Mobile Dashboard",
          id: "Dasbor Seluler Aktif",
        },
        desc: {
          en: "Empower field technicians with tasks checklists, navigation routes, and reporting tools.",
          id: "Berdayakan teknisi lapangan dengan daftar tugas, rute navigasi, dan alat pelaporan digital.",
        },
        icon: Smartphone,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      },
      {
        key: "performance",
        title: {
          en: "Performance & Dispatching",
          id: "Kinerja & Pengiriman",
        },
        desc: {
          en: "Measure field response times and calculate completion rates with beautiful dashboards.",
          id: "Ukur waktu respons lapangan dan hitung tingkat penyelesaian dengan dasbor yang indah.",
        },
        icon: Activity,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      },
      {
        key: "schedule",
        title: {
          en: "Automated Work Order Schedule",
          id: "Jadwal Kerja Otomatis",
        },
        desc: {
          en: "Generate work orders automatically from customer requests and sync directly with technician calendars.",
          id: "Buat perintah kerja secara otomatis dari permintaan pelanggan dan sinkronkan langsung dengan kalender teknisi.",
        },
        icon: Calendar,
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      },
      {
        key: "sla",
        title: {
          en: "General Ticket Dynamic SLA Monitor",
          id: "Pemantau SLA Tiket Dinamis",
        },
        desc: {
          en: "Ensure compliance with client SLAs through automated color-coded reminders and escalations.",
          id: "Pastikan kepatuhan terhadap SLA klien melalui pengingat berkode warna otomatis dan eskalasi.",
        },
        icon: Clock,
        image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      },
      {
        key: "report",
        title: {
          en: "Customized Standard & Export Report",
          id: "Laporan Standar & Ekspor Kustom",
        },
        desc: {
          en: "Export clean operational, technician performance, and client reports in CSV, Excel, or PDF format.",
          id: "Ekspor laporan operasional, kinerja teknisi, dan laporan klien yang bersih dalam format CSV, Excel, atau PDF.",
        },
        icon: Download,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      },
    ],
    []
  );

  // Divide features into rows for Bento style
  const primaryFeatures = useMemo(() => features.slice(0, 2), [features]);
  const secondaryFeatures = useMemo(() => features.slice(2, 6), [features]);

  return (
    <section id="qifess-features" className="pt-12 md:pt-16 pb-20 md:pb-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-7xl space-y-5">
          <div className="flex items-center gap-2 mb-5 select-none">
            <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
              QIFESS FEATURES
            </span>
          </div>
          <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-slate-900 leading-tight">
            {locale === "id" ? "Fitur Unggulan Platform QIFESS" : "QIFESS Platform Key Features"}
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-4xl">
            {locale === "id"
              ? "Kelola teknisi lapangan, pantau status tiket, staging aset, dan analisis kinerja tim operasional secara instan dalam satu platform terpadu."
              : "Equip your operations with real-time technician tracking, interactive dashboards, dynamic SLA compliance monitors, and custom automated reporting."}
          </p>
        </div>

        {/* Bento Grid: 2 Primary (larger) - 4 Secondary (medium) Schema */}
        <div className="w-full space-y-4 md:space-y-5">
          
          {/* ROW 1: PRIMARY HIGHLIGHTS (2 COLUMNS) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            {primaryFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-slate-100 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.01] cursor-pointer h-[400px] lg:h-[480px]"
                >
                  <img
                    src={item.image}
                    alt={item.title[locale as "en" | "id"]}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                  <div className="flex flex-col p-8 md:p-10 z-20 text-white relative w-full">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                      <Icon className="w-6 h-6 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono text-white/80">Key Feature</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                      {item.title[locale as "en" | "id"]}
                    </h3>
                    
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out w-full">
                      <div className="overflow-hidden">
                        <div className="pt-3 space-y-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                          <p className="text-slate-200 text-base leading-relaxed line-clamp-3 font-medium">
                            {item.desc[locale as "en" | "id"]}
                          </p>
                          <div className="flex items-center gap-2 text-white font-bold transition-all text-sm w-fit mt-1 group-hover:gap-3.5">
                            {locale === "id" ? "Selengkapnya" : "Read Details"}
                            <ArrowRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ROW 2: MID-TIER CORE FEATURES (4 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {secondaryFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-slate-100 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.01] cursor-pointer h-[320px] lg:h-[400px]"
                >
                  <img
                    src={item.image}
                    alt={item.title[locale as "en" | "id"]}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
                  <div className="flex flex-col p-6 z-20 text-white relative w-full">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                      {item.title[locale as "en" | "id"]}
                    </h4>
                    
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out w-full">
                      <div className="overflow-hidden">
                        <div className="pt-2 space-y-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                          <p className="text-slate-200 text-xs leading-relaxed line-clamp-3 font-medium">
                            {item.desc[locale as "en" | "id"]}
                          </p>
                          <div className="flex items-center gap-1.5 text-white font-bold transition-all text-xs w-fit mt-1 group-hover:gap-2.5">
                            {locale === "id" ? "Selengkapnya" : "Read Details"}
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
