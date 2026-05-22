"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";

import Hero from "@/components/pages/home/Hero";
import Features from "@/components/pages/home/Features";
import WhyChooseUs from "@/components/pages/home/WhyChooseUs";
import Preview from "@/components/pages/home/Preview";
import HowWeWork from "@/components/pages/home/HowWeWork";
import Products from "@/components/pages/home/Products";
import UseCases from "@/components/pages/home/UseCases";
import News from "@/components/pages/home/News";
import Faq from "@/components/pages/home/Faq";

export default function CompanyPage() {
  const tFooter = useTranslations("footer");

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar theme set to dark by default */}
      <Navbar theme="dark" />
      
      <main>
        <Hero />
        <Features />
        <WhyChooseUs />
        <Preview />
        <HowWeWork />
        <Products />
        <UseCases />
        <News />
        <Faq />
      </main>

      {/* Footer with high-converting CTA */}
      <Footer 
        showCta={true}
        ctaTitle={tFooter("cta.title")}
        ctaButtonText={tFooter("cta.button")}
        ctaButtonHref="/contact"
      />
    </div>
  );
}
