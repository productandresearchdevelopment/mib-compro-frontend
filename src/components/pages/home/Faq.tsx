"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

export default function Faq() {
  const tFaq = useTranslations("faq");
  const locale = useLocale();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const FAQ_DATA = useMemo(() => {
    return [0, 1, 2, 3].map((index) => ({
      question: tFaq(`questions.${index}.question`),
      answer: tFaq(`questions.${index}.answer`),
    }));
  }, [tFaq]);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        <div className="flex flex-col gap-8 lg:w-5/12 lg:sticky lg:top-32">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            {tFaq("title")}
          </h2>
          <p className="text-lg text-slate-600">
            {tFaq("subtitle")}
          </p>
          <div className="flex items-center gap-6 mt-4">
            <Button variant="outline" className="border-slate-300 text-slate-900 rounded-xl px-8 h-12 text-base font-bold">
              {tFaq("moreQuestions")}
            </Button>
            <Link href={`/${locale}/contact`} className="font-semibold text-slate-900 underline underline-offset-4 decoration-2 hover:text-primary transition-colors">
              {tFaq("contactUs")}
            </Link>
          </div>
        </div>

        <div className="lg:w-7/12 w-full flex flex-col border-t border-slate-300">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="flex flex-col border-b border-slate-300">
                <button onClick={() => toggleFaq(index)} className="flex items-center justify-between py-6 w-full text-left focus:outline-none group">
                  <span className="text-xl font-medium text-slate-900 group-hover:text-primary transition-colors pr-8">
                    {faq.question}
                  </span>
                  <div className={`relative w-6 h-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <div className="absolute inset-0 bg-slate-900 rounded-sm h-[2px] top-1/2 -translate-y-1/2 transition-colors group-hover:bg-primary"></div>
                    <div className={`absolute inset-0 bg-slate-900 rounded-sm w-[2px] left-1/2 -translate-x-1/2 transition-all duration-300 group-hover:bg-primary ${isOpen ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'}`}></div>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                      <p className="text-lg text-slate-600 pb-8 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
