"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Facebook01Icon,
  InstagramIcon,
  TwitterIcon,
  Linkedin01Icon,
  WhatsappIcon,
  Mail01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { useLocale } from "next-intl";

interface FooterProps {
  showCta?: boolean;
  ctaTitle?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

export default function Footer({
  showCta = true,
  ctaTitle = "Ready to Get Started?",
  ctaButtonText = "Lets Talk with us",
  ctaButtonHref = "/contact",
}: FooterProps) {
  const locale = useLocale();
  const baseHref = `/${locale}`;

  return (
    <footer className="w-full relative overflow-hidden bg-[#0f172a]">
      {/* Top Wave Divider with droplet notch (looks like top section dips into the dark footer) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none select-none">
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px]"
        >
          <path
            d="M 120 0 C 124 0, 127 3, 127 8 L 128 18 C 129 25, 131 34, 134 34 C 144 34, 165 0, 185 0 Z"
            className="fill-white dark:fill-background"
          />
        </svg>
      </div>
      {/* Right Abstract Visual Shape (Corner of the entire footer - Multi-layered Abstract Fluid Waves) */}
      <div className="absolute right-0 top-0 h-[480px] w-[35%] hidden lg:block pointer-events-none select-none z-0">
        <div className="relative w-full h-full">
          <svg
            viewBox="0 0 500 400"
            preserveAspectRatio="none"
            className="w-full h-full text-primary"
          >
            {/* Layer 1: Wide, Soft Ambient Back Wave */}
            <path
              d="M100 0 C160 120, 140 180, 260 220 C340 250, 320 320, 500 340 V0 Z"
              fill="currentColor"
              className="opacity-20 blur-[2px]"
            />

            {/* Layer 2: Intersecting Middle Fluid Wave */}
            <path
              d="M180 0 C240 140, 220 200, 330 240 C400 270, 380 340, 500 375 V0 Z"
              fill="currentColor"
              className="opacity-45"
            />

            {/* Layer 3: Solid Front Sweeping Wave */}
            <path
              d="M260 0 C300 160, 280 220, 380 260 C440 290, 420 360, 500 400 V0 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-[100px] pb-10 flex flex-col items-center relative z-10">
        {/* CTA Section */}
        {showCta && (
          <div className="w-full flex flex-col lg:flex-row items-center justify-between py-[60px] mb-20">
            {/* Left Content Area (Original floating layout) */}
            <div className="flex flex-col items-start gap-[60px] max-w-[800px]">
              <h2 className="text-white text-5xl md:text-[72px] font-semibold leading-[1.2] tracking-tight">
                {ctaTitle}
              </h2>

              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-7 py-3 h-auto text-base transition-colors duration-200"
              >
                <Link href={`${baseHref}${ctaButtonHref}`}>
                  {ctaButtonText}
                </Link>
              </Button>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-52">
          <div className="flex flex-col gap-10 max-w-md">
            <h3 className="text-white text-[32px] font-semibold leading-[40px]">
              PT. Mitra Inovasi Bisnis
            </h3>

            <div className="flex flex-col gap-8">
              <p className="text-white text-base leading-relaxed">
                Ruby commercial, Summarecon, Jl. Bulevar Selatan Blok TD No.19,
                Marga Mulya, Bekasi Utara, Kota Bekasi.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon
                    icon={WhatsappIcon}
                    className="w-6 h-6 text-white"
                  />
                  <span className="text-white text-base">Contact Sales</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    className="w-6 h-6 text-white"
                  />
                  <span className="text-white text-base">
                    contact@qualita-indonesia.com
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    className="w-6 h-6 text-white"
                  />
                  <span className="text-white text-base">
                    career@qualita-indonesia.com
                  </span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6 mt-2">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200 text-white"
              >
                <HugeiconsIcon icon={Linkedin01Icon} className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200 text-white"
              >
                <HugeiconsIcon icon={InstagramIcon} className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200 text-white"
              >
                <HugeiconsIcon icon={Facebook01Icon} className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-1 justify-between gap-12 flex-wrap items-start">
            <div className="flex flex-col gap-10">
              <h4 className="text-white text-xl font-semibold leading-[40px]">
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <Link
                  href={`${baseHref}`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href={`${baseHref}/about`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href={`${baseHref}/solution`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Our Solutions
                </Link>
                <Link
                  href={`${baseHref}/service`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Our Service
                </Link>
                <Link
                  href={`${baseHref}/contact`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href={`${baseHref}/insights`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Insights
                </Link>
                <Link
                  href={`${baseHref}/careers`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Careers
                </Link>
                <Link
                  href={`${baseHref}/profiles`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Profiles
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <h4 className="text-white text-xl font-semibold leading-[40px]">
                Certifications
              </h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5 text-white/90">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    className="w-5 h-5 text-white shrink-0"
                  />
                  <span className="text-white/90 text-sm">ISO 9001:2015</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div className="w-full mt-24 pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/80 text-base">
            © 2026 PT. QUALITA INDONESIA. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
            <Link
              href={`${baseHref}/disclaimer`}
              className="hover:text-white transition-colors"
            >
              Disclaimer
            </Link>
            <Link
              href={`${baseHref}/privacy`}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={`${baseHref}/terms`}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href={`${baseHref}/cookie`}
              className="hover:text-white transition-colors"
            >
              Cookie policy
            </Link>
            <button className="hover:text-white transition-colors">
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
