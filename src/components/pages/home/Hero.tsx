"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

export default function Hero() {
  const tHero = useTranslations("hero");
  const locale = useLocale();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-[#030712] overflow-hidden pt-24 pb-16">
      {/* Animated Tech Grid Backdrop */}
      <div className="absolute inset-0 z-0">
        {/* Base Mesh Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,41,41,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,79,240,0.06)_0%,transparent_50%)]" />
        
        {/* Grid Line Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient connecting vector lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="12%" y1="18%" x2="28%" y2="38%" stroke="rgba(242,41,41,0.3)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="28%" y1="38%" x2="58%" y2="24%" stroke="rgba(242,41,41,0.15)" strokeWidth="1" />
          <line x1="58%" y1="24%" x2="82%" y2="52%" stroke="rgba(16,79,240,0.25)" strokeWidth="1" strokeDasharray="6 3" />
          <line x1="18%" y1="72%" x2="42%" y2="58%" stroke="rgba(16,79,240,0.3)" strokeWidth="1" />
          <line x1="42%" y1="58%" x2="72%" y2="78%" stroke="rgba(242,41,41,0.2)" strokeWidth="1" />
        </svg>

        {/* Floating Animated Dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { left: "12%", top: "18%", size: "4px", color: "bg-[#f22929]", delay: 0, duration: 4 },
            { left: "28%", top: "38%", size: "6px", color: "bg-[#f22929]", delay: 1, duration: 5 },
            { left: "58%", top: "24%", size: "5px", color: "bg-[#104ff0]", delay: 0.5, duration: 6 },
            { left: "82%", top: "52%", size: "7px", color: "bg-[#f22929]", delay: 2, duration: 4 },
            { left: "18%", top: "72%", size: "5px", color: "bg-[#104ff0]", delay: 1.5, duration: 5 },
            { left: "42%", top: "58%", size: "8px", color: "bg-[#f22929]", delay: 0.2, duration: 7 },
            { left: "72%", top: "78%", size: "4px", color: "bg-[#104ff0]", delay: 2.5, duration: 5 },
          ].map((node, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${node.color} blur-[0.5px]`}
              style={{
                left: node.left,
                top: node.top,
                width: node.size,
                height: node.size,
                boxShadow: node.color.includes('f22929') 
                  ? '0 0 10px rgba(242,41,41,0.8), 0 0 20px rgba(242,41,41,0.4)'
                  : '0 0 10px rgba(16,79,240,0.8), 0 0 20px rgba(16,79,240,0.4)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.9, 0.3],
                y: [0, -15, 0],
              }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                delay: node.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 text-center z-10 flex flex-col items-center"
      >
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-[74px] font-bold text-white tracking-[-1.11px] leading-[1.1] max-w-[1000px] mx-auto mb-6 whitespace-pre-wrap font-sans"
        >
          {locale === "id" ? (
            <>
              Menjembatani <span className="text-primary-600">Inovasi</span> dengan Kecerdasan <span className="text-primary-600">Dunia Nyata</span>
            </>
          ) : (
            <>
              Bridging <span className="text-primary-600">Innovation</span> with Real-World <span className="text-primary-600">Intelligence</span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-[18px] text-white/80 max-w-[576px] mx-auto mb-10 leading-[27px] font-normal"
        >
          {tHero("subtitle")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Button asChild className="group h-auto bg-primary-600 hover:bg-[#d61e1e] text-white px-7 py-3 rounded-[12px] text-base font-medium shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto border border-transparent">
            <Link href={`/${locale}/solution`} className="flex items-center justify-center gap-2">
              {tHero("exploreSolutions")}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Link>
          </Button>
          <Button asChild variant="outline" className="group h-auto border-white/20 hover:border-white text-white hover:text-white bg-transparent hover:bg-white/5 px-7 py-3 rounded-[12px] text-base font-medium transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto">
            <Link href={`/${locale}/product`} className="flex items-center justify-center gap-2">
              {tHero("viewProduct")}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
