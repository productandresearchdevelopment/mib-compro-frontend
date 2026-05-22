"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useTranslations, useLocale } from "next-intl";

export default function UseCases() {
  const tUseCases = useTranslations("useCases");
  const locale = useLocale();
  const [activeUseCase, setActiveUseCase] = useState(0);

  const INDUSTRIES = useMemo(() => {
    const keys = ["banking", "manufacturing", "logistics", "energy"] as const;
    const icons = [
      "/images/usecase_banking.png",
      "/images/usecase_manufacturing.png",
      "/images/usecase_logistics.png",
      "/images/usecase_energy.png",
    ];
    const images = [
      "/images/usecase_main.png",
      "/images/prod_iot.png",
      "/images/prod_fsm.png",
      "/images/usecase_main.png",
    ];

    return keys.map((key, index) => ({
      id: `0${index + 1}`,
      name: tUseCases(`industries.${key}.name`),
      description: tUseCases(`industries.${key}.description`),
      icon: icons[index],
      image: images[index],
      features: [
        tUseCases(`industries.${key}.features.0`),
        tUseCases(`industries.${key}.features.1`),
        tUseCases(`industries.${key}.features.2`),
      ],
    }));
  }, [tUseCases]);

  return (
    <section id="use-cases" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        <div className="flex flex-col gap-10 lg:w-1/2">
          <div className="flex flex-col gap-6">
            <div className="bg-[#feebeb] text-slate-900 px-4 py-2 rounded-full w-max text-sm font-medium flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              {tUseCases("badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
              {locale === "id" ? (
                <>Solusi yang Dibuat untuk <br /> Setiap <span className="text-primary">Industri</span></>
              ) : (
                <>Solutions Built for <br /> Every <span className="text-primary">Industry</span></>
              )}
            </h2>
          </div>

          <div className="flex flex-col border-t border-slate-200">
            {INDUSTRIES.map((industry, index) => {
              const isActive = activeUseCase === index;
              return (
                <div key={industry.id} className={`flex flex-col border-b border-slate-200 cursor-pointer transition-all duration-300 ${isActive ? 'pb-8' : ''}`} onClick={() => setActiveUseCase(index)}>
                  <div className="flex items-center justify-between py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden relative shrink-0">
                        <Image src={industry.icon} alt={industry.name} fill className="object-cover" />
                      </div>
                      <h3 className="text-2xl font-medium text-slate-900">{industry.name}</h3>
                    </div>
                    <span className="text-slate-400 font-medium">{industry.id}</span>
                  </div>
                  <div className={`flex flex-col gap-6 overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-slate-600 leading-relaxed text-lg">{industry.description}</p>
                    <ul className="flex flex-col gap-3">
                      {industry.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span className="text-slate-900 font-medium">{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-blue-600 font-medium mt-2 hover:text-blue-700 w-max group">
                      {tUseCases("learnMore")}
                      <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:w-1/2 relative h-[500px] lg:h-auto min-h-[600px] rounded-[32px] overflow-hidden bg-slate-100 shadow-xl transition-all duration-500">
          {INDUSTRIES.map((industry, index) => (
            <div key={industry.id} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeUseCase === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <Image src={industry.image} alt={industry.name} fill className="object-cover" priority={index === 0} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
