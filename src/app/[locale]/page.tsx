"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";

import Hero from "@/components/pages/home/Hero";
import Features from "@/components/pages/company/Features";
import ServicesShowcase from "@/components/pages/home/ServicesShowcase";
import Highlights from "@/components/pages/home/Highlights";
import QifessSection from "@/components/pages/home/QifessSection";
import ProtectQubeSection from "@/components/pages/home/ProtectQubeSection";
import HardwareShowcaseSection from "@/components/pages/home/HardwareShowcaseSection";
import Features2 from "@/components/pages/home/Features";

export default function LandingPage() {
  const tFooter = useTranslations("footer");

  return (
    <div className="min-h-screen bg-white">
      <Navbar theme="dark" />

      <main>
        <Hero />
        <Features2 />
        {/* <QifessSection />
        <ProtectQubeSection />
        <ServicesShowcase />
        <HardwareShowcaseSection />
        <Highlights /> */}
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
