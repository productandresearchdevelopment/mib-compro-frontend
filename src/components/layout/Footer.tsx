"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Facebook01Icon, 
  InstagramIcon, 
  TwitterIcon, 
  Linkedin01Icon, 
  WhatsappIcon, 
  Mail01Icon 
} from '@hugeicons/core-free-icons';
import { useLocale } from 'next-intl';

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
  ctaButtonHref = "/contact"
}: FooterProps) {
  const locale = useLocale();
  const baseHref = `/${locale}`;

  return (
    <footer className="w-full relative overflow-hidden bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6 pt-[100px] pb-10 flex flex-col items-center">
        {/* CTA Section */}
        {showCta && (
          <div className="w-full flex flex-col items-start gap-[60px] py-[60px] mb-20">
            <h2 className="text-white text-5xl md:text-[72px] font-semibold leading-[1.2] tracking-tight max-w-[800px]">
              {ctaTitle}
            </h2>
            <Button asChild size="lg" className="px-8 py-4 rounded-xl text-lg font-semibold bg-primary hover:bg-primary/90">
              <Link href={`${baseHref}${ctaButtonHref}`}>
                {ctaButtonText}
              </Link>
            </Button>
          </div>
        )}

        {/* Footer Main Content */}
        <div className="w-full flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
          
          {/* Company Info */}
          <div className="flex flex-col gap-10 max-w-md">
            <h3 className="text-white text-[32px] font-semibold leading-[40px]">
              PT. Mitra Inovasi Bisnis
            </h3>
            
            <div className="flex flex-col gap-8">
              <p className="text-white text-base leading-relaxed">
                Ruby commercial, Summarecon, Jl. Bulevar Selatan Blok TD No.19, Marga Mulya, Bekasi Utara, Kota Bekasi.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={WhatsappIcon} className="w-6 h-6 text-white" />
                  <span className="text-white text-base">Contact Sales</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={Mail01Icon} className="w-6 h-6 text-white" />
                  <span className="text-white text-base">contact@qualita-indonesia.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={Mail01Icon} className="w-6 h-6 text-white" />
                  <span className="text-white text-base">career@qualita-indonesia.com</span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6 mt-2">
              <a href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                <HugeiconsIcon icon={Linkedin01Icon} className="w-4 h-4" />
              </a>
              <a href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                <HugeiconsIcon icon={InstagramIcon} className="w-4 h-4" />
              </a>
              <a href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                <HugeiconsIcon icon={Facebook01Icon} className="w-4 h-4" />
              </a>
              <a href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                <HugeiconsIcon icon={TwitterIcon} className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="flex flex-1 justify-between gap-12 flex-wrap">
            <div className="flex flex-col gap-6">
              <h4 className="text-white text-xl font-semibold">Quick Links</h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <Link href={`${baseHref}`} className="text-white/90 hover:text-white transition-colors">Home</Link>
                <Link href={`${baseHref}/about`} className="text-white/90 hover:text-white transition-colors">About Us</Link>
                <Link href={`${baseHref}/solution`} className="text-white/90 hover:text-white transition-colors">Our Solutions</Link>
                <Link href={`${baseHref}/service`} className="text-white/90 hover:text-white transition-colors">Our Service</Link>
                <Link href={`${baseHref}/contact`} className="text-white/90 hover:text-white transition-colors">Contact Us</Link>
                <Link href={`${baseHref}/news`} className="text-white/90 hover:text-white transition-colors">News</Link>
                <Link href={`${baseHref}/career`} className="text-white/90 hover:text-white transition-colors">Career</Link>
                <Link href={`${baseHref}/profiles`} className="text-white/90 hover:text-white transition-colors">Profiles</Link>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-white text-xl font-semibold">Certifications</h4>
              <div className="flex flex-col gap-4">
                <span className="text-white/90 text-sm">ISO 9001:2015</span>
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
            <Link href={`${baseHref}/disclaimer`} className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href={`${baseHref}/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href={`${baseHref}/terms`} className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href={`${baseHref}/cookie`} className="hover:text-white transition-colors">Cookie policy</Link>
            <button className="hover:text-white transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
