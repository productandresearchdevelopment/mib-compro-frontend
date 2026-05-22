"use client";

import React from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon } from "@hugeicons/core-free-icons";
import { useTranslations } from "next-intl";

export default function HowWeWork() {
  const tHowWeWork = useTranslations("howWeWork");

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-[48px] font-semibold tracking-tight text-slate-900 leading-[1.3] lg:max-w-[680px]">
            {tHowWeWork("title")}
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-[1.8] lg:max-w-[550px]">
            {tHowWeWork("subtitle")}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[400px]">
          {/* Card 1: 100+ Projects */}
          <div className="bg-[#010205] rounded-[30px] p-10 flex flex-col justify-between relative overflow-hidden lg:w-[400px] shrink-0 h-[382px]">
            <div className="relative z-10 flex flex-col gap-4">
              <h3 className="text-[84px] font-bold text-white tracking-tight leading-none">100<span className="text-[#99cf63]">+</span></h3>
              <p className="text-lg text-slate-400 font-medium">{tHowWeWork("projectsCount")}</p>
            </div>
            <div className="relative z-10 flex -space-x-4 mt-auto">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-[70px] h-[70px] rounded-full border-4 border-[#010205] bg-slate-300 relative overflow-hidden">
                   <Image src={`/images/usecase_banking.png`} alt="User" fill className="object-cover" />
                 </div>
               ))}
               <div className="w-[70px] h-[70px] rounded-full border-4 border-[#010205] bg-slate-800 flex items-center justify-center text-white text-3xl font-bold pb-2">+</div>
            </div>
          </div>

          {/* Card 2: How We Work Video */}
          <div className="bg-slate-100 rounded-[30px] p-10 flex items-center justify-center relative overflow-hidden flex-1 group cursor-pointer shadow-inner h-[382px]">
             <h3 className="text-4xl md:text-[48px] font-bold text-white tracking-[12px] z-10 text-center uppercase mix-blend-difference">
               {tHowWeWork("howWeWork")}
             </h3>
             {/* Play Button */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary rounded-full flex items-center justify-center border-[12px] border-white group-hover:scale-110 transition-transform duration-300 z-20 shadow-xl">
                <HugeiconsIcon icon={PlayIcon} className="w-10 h-10 text-white ml-2" />
             </div>
             <Image src="/images/preview_video_bg.png" alt="How we work bg" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
