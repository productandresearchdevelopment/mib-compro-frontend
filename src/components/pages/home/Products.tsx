"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

export default function Products() {
  const tProducts = useTranslations("products");
  const locale = useLocale();

  return (
    <section id="products" className="py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
        
        <div className="flex flex-col gap-4 text-center max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            {tProducts("title")}
          </h2>
          <p className="text-lg text-slate-600">
            {tProducts("subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-12 w-full">
          
          {/* Product 1: FSM */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-slate-50 border border-slate-100 rounded-[32px] p-8 lg:p-12 w-full">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl mb-2">FSM</div>
              <div className="flex flex-col gap-4">
                <h3 className="text-3xl font-medium text-slate-900">{tProducts("fsm.title")}</h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  {tProducts("fsm.description")}
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {[0, 1, 2, 3].map((idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 text-primary flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-slate-600 text-base">{tProducts(`fsm.features.${idx}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mt-6">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 text-base font-bold">
                  {locale === "id" ? "Pelajari Selengkapnya" : "Learn More"}
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-900 rounded-xl px-8 h-12 text-base font-bold">
                  {locale === "id" ? "Coba Demo" : "Try Demo"}
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl">
              <Image src="/images/prod_fsm.png" alt="FSM Dashboard" fill className="object-cover" />
            </div>
          </div>

          {/* Product 2: IoT */}
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 bg-white border border-slate-200 rounded-[32px] p-8 lg:p-12 w-full">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-2">IoT</div>
              <div className="flex flex-col gap-4">
                <h3 className="text-3xl font-medium text-slate-900">{tProducts("iot.title")}</h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  {tProducts("iot.description")}
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {[0, 1, 2, 3].map((idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-slate-600 text-base">{tProducts(`iot.features.${idx}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mt-6">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 text-base font-bold">
                  {locale === "id" ? "Pelajari Selengkapnya" : "Learn More"}
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-900 rounded-xl px-8 h-12 text-base font-bold">
                  {locale === "id" ? "Coba Demo" : "Try Demo"}
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl">
              <Image src="/images/prod_iot.png" alt="IoT Dashboard" fill className="object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
