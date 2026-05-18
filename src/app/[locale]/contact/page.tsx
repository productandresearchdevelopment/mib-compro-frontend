"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Facebook01Icon, 
  InstagramIcon, 
  TwitterIcon,
  ArrowUpRight01Icon,
  ArrowDown01Icon
} from "@hugeicons/core-free-icons";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <Navbar />

      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-16 md:gap-20">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="flex flex-col gap-4 md:gap-6">
              <span className="text-slate-600 text-xl md:text-2xl font-normal">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight max-w-3xl leading-tight">
                Let's Talk About Your Needs
              </h1>
            </div>

            {/* Social Media Circular Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                <HugeiconsIcon icon={Facebook01Icon} className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                <HugeiconsIcon icon={InstagramIcon} className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                <HugeiconsIcon icon={TwitterIcon} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Form Section */}
          <form className="flex flex-col gap-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Row 1 */}
              <div className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors relative group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-transparent text-xl md:text-2xl text-slate-900 placeholder:text-slate-900 outline-none"
                />
              </div>
              <div className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors relative group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent text-xl md:text-2xl text-slate-900 placeholder:text-slate-900 outline-none"
                />
              </div>

              {/* Row 2 */}
              <div className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors relative group">
                <input 
                  type="text" 
                  placeholder="Company" 
                  className="w-full bg-transparent text-xl md:text-2xl text-slate-900 placeholder:text-slate-900 outline-none"
                />
              </div>
              <div className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors relative group">
                <input 
                  type="tel" 
                  placeholder="Phone Number (optional)" 
                  className="w-full bg-transparent text-xl md:text-2xl text-slate-900 placeholder:text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Row 3 - Subject / Dropdown */}
            <div className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors relative group flex items-center justify-between cursor-pointer">
              <input 
                type="text" 
                placeholder="Subject / Interested" 
                className="w-full bg-transparent text-xl md:text-2xl text-slate-900 placeholder:text-slate-900 outline-none cursor-pointer"
                readOnly
              />
              <HugeiconsIcon icon={ArrowDown01Icon} className="w-6 h-6 text-slate-900" />
            </div>

            {/* Row 4 - Message */}
            <div className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors relative group">
              <textarea 
                placeholder="Message" 
                rows={4}
                className="w-full bg-transparent text-xl md:text-2xl text-slate-900 placeholder:text-slate-900 outline-none resize-none pt-2"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button size="lg" className="px-8 py-6 rounded-3xl text-lg group">
                Leave us a Message
                <HugeiconsIcon 
                  icon={ArrowUpRight01Icon} 
                  className="w-5 h-5 ml-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" 
                />
              </Button>
            </div>
          </form>

        </div>
      </main>

      <Footer showCta={true}
        ctaTitle="Ready to Get Started?"
        ctaButtonText="Lets Talk with us"
        ctaButtonHref="/contact"/>
    </div>
  );
}
