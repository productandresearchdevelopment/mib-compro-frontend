"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function WhyChooseUs() {
  const tWhyChooseUs = useTranslations("whyChooseUs");
  const locale = useLocale();

  return (
    <section id="why-choose-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        
        <div className="flex flex-col gap-6">
          <div className="bg-[#feebeb] text-slate-900 px-4 py-2 rounded-full w-max text-sm font-medium flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
            {tWhyChooseUs("badge")}
          </div>
          <div className="flex flex-col gap-6 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
              {locale === "id" ? (
                <>Mengapa <span className="text-primary">MIB</span> adalah Pilihan Tepat untuk Bisnis Anda</>
              ) : (
                <>Why <span className="text-primary">MIB</span> is The Right Choice for Your Business</>
              )}
            </h2>
            <p className="text-lg text-slate-600">
              {tWhyChooseUs("subtitle")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 h-full">
            <div className="bg-[#ebf5fe] p-8 rounded-3xl flex-1 flex flex-col justify-center items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
              </div>
              <h3 className="text-2xl font-medium text-slate-900">{tWhyChooseUs("integrated.title")}</h3>
              <p className="text-sm text-slate-600">
                {tWhyChooseUs("integrated.description")}
              </p>
              <div className="w-16 h-1.5 bg-blue-200 mt-2 rounded-full"></div>
            </div>

            <div className="bg-[#ebf5fe] p-8 rounded-3xl flex-1 flex flex-col justify-center items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
              </div>
              <h3 className="text-2xl font-medium text-slate-900">{tWhyChooseUs("scalable.title")}</h3>
              <p className="text-sm text-slate-600">
                {tWhyChooseUs("scalable.description")}
              </p>
              <div className="w-16 h-1.5 bg-blue-200 mt-2 rounded-full"></div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="bg-[#dbeafe] p-8 rounded-3xl h-full flex flex-col justify-center items-start gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            </div>
            <h3 className="text-3xl font-medium text-slate-900">{tWhyChooseUs("reliable.title")}</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              {tWhyChooseUs("reliable.description")}
            </p>
            <div className="w-20 h-2 bg-blue-300 mt-2 rounded-full"></div>
          </div>

          {/* Column 3 - Red Banner */}
          <div className="bg-primary rounded-3xl h-full p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden text-white">
            <h3 className="text-3xl font-medium mb-4 relative z-10">{tWhyChooseUs("repairCentre.title")}</h3>
            <p className="text-base text-white/90 relative z-10 max-w-[200px]">
              {tWhyChooseUs("repairCentre.description")}
            </p>
            
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 border-[40px] border-white/10 rounded-full z-0"></div>
            <div className="absolute bottom-[-30px] left-[-30px] w-48 h-48 border-[20px] border-white/10 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
