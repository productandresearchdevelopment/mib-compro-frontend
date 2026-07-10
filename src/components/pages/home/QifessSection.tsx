"use client";

import React from "react";
import { Zap, Cpu, Lock, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

export default function QifessSection() {
  const tQifess = useTranslations("qifess");
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yUpper = useTransform(scrollYProgress, [0, 1], [-30, 35]);
  const yBack = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl space-y-16 px-6">
        {/* Header Block matching provided structure but sized perfectly */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-slate-900 leading-tight lg:max-w-[680px]">
            {tQifess("title")}
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-[1.8] lg:max-w-[550px] lg:text-right md:ml-auto">
            {tQifess("subtitle")}
          </p>
        </div>

        {/* Central Mockup graphic - Exact layout from your code block */}
        <div ref={sectionRef} className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
          <div className="aspect-2/1 relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-50/50">
            <div className="bg-linear-to-t z-20 absolute inset-0 from-white to-transparent pointer-events-none"></div>
            
            <motion.img 
              src="https://tailark.com/_next/image?url=%2Fmail-upper.png&w=3840&q=75" 
              style={{ y: yUpper }}
              className="absolute inset-0 z-10 w-full h-full object-cover" 
              alt="payments illustration upper" 
            />
            
            <motion.img 
              src="https://tailark.com/_next/image?url=%2Fmail-back.png&w=3840&q=75" 
              style={{ y: yBack }}
              className="hidden dark:block absolute inset-0 w-full h-full object-cover" 
              alt="payments illustration dark back" 
            />
            
            <motion.img 
              src="https://tailark.com/_next/image?url=%2Fmail-back-light.png&w=3840&q=75" 
              style={{ y: yBack }}
              className="dark:hidden absolute inset-0 w-full h-full object-cover" 
              alt="payments illustration light back" 
            />
          </div>
        </div>

        {/* 4 Pillars Grid with exact spacing and size parameters */}
        <div className="relative mx-auto grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-10 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-primary" />
              <h3 className="text-base font-medium text-slate-900">{tQifess("features.fast.title")}</h3>
            </div>
            <p className="text-slate-500 text-sm">
              {tQifess("features.fast.desc")}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4 text-primary" />
              <h3 className="text-base font-medium text-slate-900">{tQifess("features.powerful.title")}</h3>
            </div>
            <p className="text-slate-500 text-sm">
              {tQifess("features.powerful.desc")}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-primary" />
              <h3 className="text-base font-medium text-slate-900">{tQifess("features.security.title")}</h3>
            </div>
            <p className="text-slate-500 text-sm">
              {tQifess("features.security.desc")}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h3 className="text-base font-medium text-slate-900">{tQifess("features.ai.title")}</h3>
            </div>
            <p className="text-slate-500 text-sm">
              {tQifess("features.ai.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
