"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";

import Hero from "@/components/pages/company/Hero";
import Features from "@/components/pages/company/Features";
import WhyChooseUs from "@/components/pages/home/WhyChooseUs";
import Preview from "@/components/pages/home/Preview";
import HowWeWork from "@/components/pages/home/HowWeWork";
import Products from "@/components/pages/home/Products";
import UseCases from "@/components/pages/home/UseCases";
import News from "@/components/pages/home/News";
import Faq from "@/components/pages/home/Faq";
import Highlights from "@/components/pages/home/Highlights";
import HardwareShowcaseSection from "@/components/pages/home/HardwareShowcaseSection";
import ServicesShowcase from "@/components/pages/home/ServicesShowcase";
import QifessSection from "@/components/pages/home/QifessSection";
import ProtectQubeSection from "@/components/pages/home/ProtectQubeSection";
import CoverageSection from "@/components/pages/company/CoverageSection";
import MilestonesSection from "@/components/pages/company/MilestonesSection";

export default function CompanyPage() {
  const tFooter = useTranslations("footer");

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar theme set to light since the company hero top is white */}
      <Navbar theme="light" />

      <main>
        <Hero />
        <Features />
        <CoverageSection />
        <MilestonesSection />
        {/* <QifessSection />
        <ProtectQubeSection />
        <ServicesShowcase />
        <HardwareShowcaseSection /> */}
        <Highlights />
        {/* <WhyChooseUs />
        <Preview />
        <HowWeWork /> */}
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
