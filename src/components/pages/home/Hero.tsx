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
    <section id="home" className="relative min-h-screen flex items-center bg-[#030712] overflow-hidden pt-24 pb-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/vidio/testes.mp4" type="video/mp4" />
        </video>
        {/* Gradients to ensure text readability on the left, and pure video visibility elsewhere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/90 via-[#030712]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/60 via-transparent to-[#030712]" />
        
        {/* Subtle grid line overlay for tech theme, kept very low opacity to show video clearly */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-8 flex flex-col items-start text-left"
        >
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-[74px] font-bold text-white tracking-[-1.5px] leading-[1.05] max-w-[800px] mb-6 whitespace-pre-wrap font-sans"
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
            className="text-lg md:text-[18px] text-white/80 max-w-[576px] mb-10 leading-[27px] font-normal"
          >
            {tHero("subtitle")}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-start gap-4 w-full sm:w-auto"
          >
            <Button asChild className="group h-auto bg-primary-600 hover:bg-[#d61e1e] text-white px-7 py-3.5 rounded-[12px] text-base font-medium shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto border border-transparent">
              <Link href={`/${locale}/solution`} className="flex items-center justify-center gap-2">
                {tHero("exploreSolutions")}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </Link>
            </Button>
            <Button asChild variant="outline" className="group h-auto border-white/20 hover:border-white text-white hover:text-white bg-transparent hover:bg-white/5 px-7 py-3.5 rounded-[12px] text-base font-medium transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto">
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
        
        {/* Right side is intentionally left blank on desktop to showcase the video */}
        <div className="hidden lg:block lg:col-span-4" />
      </div>
    </section>
  );
}
