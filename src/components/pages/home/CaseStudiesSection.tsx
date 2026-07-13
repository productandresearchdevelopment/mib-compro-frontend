"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { NEWS_DATA, NewsItem } from "@/data/newsData";

export default function CaseStudiesSection() {
  const locale = useLocale();
  const baseHref = `/${locale}`;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const caseStudies = NEWS_DATA;

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollLimits = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
      
      const cardWidth = 380;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollLimits);
      checkScrollLimits();
    }
    return () => el?.removeEventListener("scroll", checkScrollLimits);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const cardWidth = 380; 
      const newScrollLeft = direction === "left" 
        ? scrollLeft - cardWidth 
        : scrollLeft + cardWidth;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="studi-kasus"
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
                {locale === "id" ? "Studi Kasus & Wawasan" : "Case Studies & Insights"}
              </span>
            </div>
            <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-slate-900 leading-tight font-display uppercase">
              {locale === "id" ? "Studi Kasus Terbaru" : "Latest Case Studies"}
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              {locale === "id"
                ? "Menelusuri bagaimana solusi taktis dan perangkat pintar MIB memecahkan kendala operasional nyata di lapangan."
                : "Exploring how MIB's tactical solutions and smart hardware solve real-world operational challenges."}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-6 select-none justify-between md:justify-end">
            <Link
              href={`${baseHref}/insights`}
              className="text-slate-500 hover:text-primary-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-200 shrink-0 pb-2 border-b border-transparent hover:border-primary-500"
            >
              <span>{locale === "id" ? "Semua Studi Kasus" : "All Case Studies"}</span>
              <ArrowRight size={14} />
            </Link>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollLeft
                    ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-800 shadow-sm"
                    : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                }`}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollRight
                    ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-800 shadow-sm"
                    : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                }`}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Bento Sized Card Deck */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 w-full overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {caseStudies.map((study, idx) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              locale={locale}
              delay={idx * 0.04}
            />
          ))}
        </div>

        {/* Carousel slide indicators */}
        <div className="flex justify-center gap-2 mt-8 select-none">
          {caseStudies.map((_, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={`dot-${idx}`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: idx * 380,
                      behavior: "smooth"
                    });
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? "w-6 bg-primary-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ── Individual Case Study Card Component (Bento style) ───────────────────────────
function CaseStudyCard({
  study,
  locale,
  delay,
}: {
  study: NewsItem;
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

  const title = study.title[locale as "id" | "en"];
  const desc = study.description[locale as "id" | "en"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className="relative group overflow-hidden border border-slate-200/40 rounded-[2rem] hover:shadow-[0_25px_60px_rgba(3,7,18,0.1)] hover:scale-[1.005] transition-all duration-500 cursor-pointer w-[290px] sm:w-[380px] min-h-[385px] h-auto shrink-0 snap-start flex flex-col justify-between"
    >
      {/* Interactive spotlight */}
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

      {/* Background Graphic */}
      <img
        src={study.image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[1200ms] z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-95" />

      {/* Content */}
      <div className="p-8 relative z-25 flex flex-col justify-end h-full w-full space-y-3 pointer-events-none flex-1 mt-16">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-1.5 select-none">
          <span className="text-red-400 group-hover:scale-115 transition-transform duration-300">
            <BookOpen size={11} />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-300 font-mono">
            {study.category_id}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight font-display tracking-tight group-hover:text-primary-400 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white text-xs sm:text-[13px] leading-relaxed line-clamp-2">
          {desc}
        </p>

        {/* Actions Button Block */}
        <div className="pt-2 pointer-events-auto w-full">
          <Link
            href={`/${locale}/insights/${study.slug}`}
            className="bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-primary-600/15 text-center block w-full"
          >
            {locale === "id" ? "Baca Selengkapnya" : "Read More"}
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
