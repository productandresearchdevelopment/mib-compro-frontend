"use client";

import React, { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon, PlayIcon } from "@hugeicons/core-free-icons";
import { useTranslations, useLocale } from "next-intl";

export default function LandingPage() {
  const tHero = useTranslations("hero");
  const tSolutions = useTranslations("solutions");
  const tWhyChooseUs = useTranslations("whyChooseUs");
  const tPreview = useTranslations("preview");
  const tHowWeWork = useTranslations("howWeWork");
  const tProducts = useTranslations("products");
  const tUseCases = useTranslations("useCases");
  const tNews = useTranslations("news");
  const tFaq = useTranslations("faq");
  const tFooter = useTranslations("footer");
  const locale = useLocale();

  // --- DYNAMIC LOCALIZED CONSTANTS ---
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

  const NEWS_DATA = useMemo(() => {
    return [
      {
        id: 1,
        title: locale === "id" ? "Bagaimana IoT Mengubah Operasi Industri di Tahun 2026" : "How IoT is Transforming Industrial Operations in 2026",
        date: "12 Oct 2026",
        image: "/images/news_thumb.png",
        link: "#"
      },
      {
        id: 2,
        title: locale === "id" ? "Masa Depan Manajemen Layanan Lapangan: Otomatisasi & AI" : "The Future of Field Service Management: Automation & AI",
        date: "05 Oct 2026",
        image: "/images/news_thumb.png",
        link: "#"
      },
      {
        id: 3,
        title: locale === "id" ? "Memaksimalkan Efisiensi dengan Analitik Data Real-time" : "Maximizing Efficiency with Real-time Data Analytics",
        date: "28 Sep 2026",
        image: "/images/news_thumb.png",
        link: "#"
      }
    ];
  }, [locale]);

  const FAQ_DATA = useMemo(() => {
    return [0, 1, 2, 3].map((index) => ({
      question: tFaq(`questions.${index}.question`),
      answer: tFaq(`questions.${index}.answer`),
    }));
  }, [tFaq]);

  // Solutions Section Sticky Scroll
  const solutionsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: solutionsScrollY } = useScroll({ target: solutionsRef });
  const solutionsX = useTransform(solutionsScrollY, [0, 1], ["0%", "-55%"]);

  // News Section Sticky Scroll
  const newsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: newsScrollY } = useScroll({ target: newsRef });
  const newsX = useTransform(newsScrollY, [0, 1], ["0%", "-40%"]);

  // State
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* 1. HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
              {locale === "id" ? (
                <>Rasakan Keunggulan <br className="hidden md:block" /> dalam Setiap Gerak</>
              ) : (
                <>Experience Excellence <br className="hidden md:block" /> in Motion</>
              )}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              {tHero("subtitle")}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild className="shadow-lg shadow-primary/30">
                <Link href={`/${locale}/solution`}>
                  {tHero("exploreSolutions")}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/${locale}/company`}>
                  {tHero("learnMore")}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 2. SOLUTIONS SECTION (STICKY HORIZONTAL SCROLL) */}
        <section ref={solutionsRef} id="solution" className="relative h-[300vh] bg-white">
          <div className="sticky top-0 h-[100dvh] flex flex-col justify-center pb-8 overflow-hidden">
            
            <div className="max-w-7xl mx-auto px-6 w-full mb-6 lg:mb-12 flex justify-between items-end shrink-0">
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
                  {tSolutions("title")}
                </h2>
                <p className="text-lg text-slate-600">
                  {tSolutions("subtitle")}
                </p>
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors">
                  <HugeiconsIcon icon={ArrowLeft01Icon} className="w-6 h-6" />
                </div>
                <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors">
                  <HugeiconsIcon icon={ArrowRight01Icon} className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Horizontal Scroll Content */}
            <motion.div style={{ x: solutionsX }} className="flex gap-6 px-6 md:px-0 md:ml-[calc(max(1.5rem,(100vw-80rem)/2+1.5rem))] w-[max-content]">
              {/* Card 1 */}
              <div className="w-[85vw] md:w-[350px] lg:w-[400px] xl:w-[435px] bg-slate-50 p-4 lg:p-6 rounded-[24px] lg:rounded-[32px] flex flex-col gap-4 lg:gap-6 shrink-0 border border-transparent">
                <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden shrink-0">
                  <Image src="/images/solution_iot.png" alt="IoT for Industries" fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-2 lg:gap-4 flex-1 justify-between">
                  <div>
                    <h3 className="text-2xl font-medium text-slate-900 mb-2">
                      {locale === "id" ? "IoT untuk Industri" : "IoT for Industries"}
                    </h3>
                    <p className="text-slate-400">IoT Solutions</p>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {locale === "id" 
                      ? "Solusi pemantauan dan otomatisasi komprehensif untuk berbagai aplikasi industri."
                      : "Comprehensive monitoring and automation solutions for various industrial applications."}
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-[85vw] md:w-[350px] lg:w-[400px] xl:w-[435px] bg-white border border-slate-200 p-4 lg:p-6 rounded-[24px] lg:rounded-[32px] flex flex-col gap-4 lg:gap-6 shrink-0">
                <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden shrink-0">
                  <Image src="/images/solution_software.png" alt="Software Solutions" fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-2 lg:gap-4 flex-1 justify-between">
                  <div>
                    <h3 className="text-2xl font-medium text-slate-900 mb-2">
                      {locale === "id" ? "Perangkat Lunak Perusahaan" : "Enterprise Software"}
                    </h3>
                    <p className="text-slate-400">Software Solutions</p>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {locale === "id"
                      ? "Dasbor dan perangkat lunak manajemen yang kuat untuk memvisualisasikan data dan meningkatkan pengambilan keputusan."
                      : "Powerful dashboard and management software to visualize data and improve decision-making."}
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="w-[85vw] md:w-[350px] lg:w-[400px] xl:w-[435px] bg-slate-50 p-4 lg:p-6 rounded-[24px] lg:rounded-[32px] flex flex-col gap-4 lg:gap-6 shrink-0 border border-transparent">
                <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden shrink-0">
                  <Image src="/images/solution_hardware.png" alt="Hardware Infrastructure" fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-2 lg:gap-4 flex-1 justify-between">
                  <div>
                    <h3 className="text-2xl font-medium text-slate-900 mb-2">
                      {locale === "id" ? "Infrastruktur Perangkat Keras" : "Hardware Infrastructure"}
                    </h3>
                    <p className="text-slate-400">IT Infrastructure</p>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {locale === "id"
                      ? "Pengaturan server, jaringan, dan infrastruktur fisik yang andal untuk mendukung operasi digital Anda."
                      : "Reliable server setups, networking, and physical infrastructure to support your digital operations."}
                  </p>
                </div>
              </div>
              
              {/* Spacer */}
              <div className="w-[10vw] md:w-[200px] shrink-0"></div>
            </motion.div>

            {/* Slider Cues */}
            <div className="flex gap-2 justify-center mt-6 lg:mt-12 w-full shrink-0">
              <div className="h-3 w-12 bg-primary rounded-full"></div>
              <div className="h-3 w-3 bg-slate-400 rounded-full"></div>
              <div className="h-3 w-3 bg-slate-400 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* 3. WHY CHOOSE US SECTION */}
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

        {/* 4. PREVIEW EXPERIENCE SECTION */}
        <section id="preview" className="bg-primary py-24 pb-32">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
            <div className="text-center flex flex-col gap-6 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                {tPreview("title")}
              </h2>
              <p className="text-lg text-white/90">
                {tPreview("subtitle")}
              </p>
            </div>

            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-black/20">
              <Image 
                src="/images/preview_video_bg.png"
                alt="Video Thumbnail"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-black/20 backdrop-blur-md border border-white/30 group-hover:bg-black/40 group-hover:scale-110 transition-all duration-300">
                  <HugeiconsIcon icon={PlayIcon} className="w-10 h-10 md:w-14 md:h-14 text-white ml-2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW WE WORK (Provide the best service) */}
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

        {/* 6. OUR PRODUCTS */}
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

        {/* 7. USE CASES */}
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

        {/* 8. LATEST NEWS (STICKY HORIZONTAL SCROLL) */}
        <section ref={newsRef} id="news" className="relative h-[250vh] bg-slate-50">
          <div className="sticky top-0 h-[100dvh] flex flex-col justify-center pb-8 overflow-hidden">
            
            <div className="max-w-7xl mx-auto px-6 w-full mb-6 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
                  {tNews("title")}
                </h2>
                <p className="text-lg text-slate-600">
                  {tNews("subtitle")}
                </p>
              </div>
              <Link href={`/${locale}/news`} className="flex items-center gap-2 font-semibold text-slate-900 border border-slate-300 bg-white hover:bg-slate-100 px-6 py-3 rounded-full transition-colors shrink-0">
                {tNews("viewAll")}
                <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
              </Link>
            </div>

            <motion.div style={{ x: newsX }} className="flex gap-8 px-6 md:px-0 md:ml-[calc(max(1.5rem,(100vw-80rem)/2+1.5rem))] w-[max-content]">
              {NEWS_DATA.map((news) => (
                <div key={news.id} className="w-[85vw] md:w-[400px] lg:w-[450px] flex flex-col group cursor-pointer shrink-0">
                  <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 shadow-md">
                    <Image src={news.image} alt={news.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col gap-4 px-2">
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{news.date}</span>
                    <h3 className="text-2xl font-medium text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {news.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-medium mt-2 group-hover:gap-3 transition-all">
                      {tNews("readMore")}
                      <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-[10vw] md:w-[200px] shrink-0"></div>
            </motion.div>
          </div>
        </section>

        {/* 9. FAQ */}
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

      </main>

      {/* FOOTER */}
      <Footer 
        showCta={true}
        ctaTitle={tFooter("cta.title")}
        ctaButtonText={tFooter("cta.button")}
        ctaButtonHref="/contact"
      />
    </div>
  );
}
