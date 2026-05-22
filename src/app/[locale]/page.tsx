"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";

import Hero from "@/components/pages/home/Hero";
import Features from "@/components/pages/home/Features";
import SolutionsDetail from "@/components/pages/home/SolutionsDetail";
import ServicesShowcase from "@/components/pages/home/ServicesShowcase";
import WhyChooseUs from "@/components/pages/home/WhyChooseUs";
import Preview from "@/components/pages/home/Preview";
import HowWeWork from "@/components/pages/home/HowWeWork";
import Products from "@/components/pages/home/Products";
import UseCases from "@/components/pages/home/UseCases";
import News from "@/components/pages/home/News";
import Faq from "@/components/pages/home/Faq";

export default function LandingPage() {
  const tFooter = useTranslations("footer");

  return (
    <div className="min-h-screen bg-white">
      <Navbar theme="dark" />

      <main>
        <Hero />
        <Features />
        <SolutionsDetail />
        <ServicesShowcase />
        {/* <WhyChooseUs /> */}
        {/* <Preview /> */}
        {/* <HowWeWork /> */}
        {/* <Products /> */}
        {/* <UseCases />
        <News />
        <Faq /> */}
      </main>

      <Footer
        showCta={true}
        ctaTitle={tFooter("cta.title")}
        ctaButtonText={tFooter("cta.button")}
        ctaButtonHref="/contact"
      />
    </div>
  );
}
