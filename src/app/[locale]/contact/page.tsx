"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Facebook01Icon,
  InstagramIcon,
  Linkedin02Icon,
  ArrowUpRight01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function InputField({ className = "", ...props }: InputFieldProps) {
  return (
    <div className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors">
      <input
        {...props}
        className={`
          w-full
          bg-transparent
          text-xl
          md:text-2xl
          text-[var(--black)]
          placeholder:text-slate-400
          outline-none
          ${className}
        `}
      />
    </div>
  );
}

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function TextareaField({ className = "", ...props }: TextareaFieldProps) {
  return (
    <div className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors">
      <textarea
        {...props}
        className={`
          w-full
          bg-transparent
          text-xl
          md:text-2xl
          text-[var(--black)]
          placeholder:text-slate-400
          outline-none
          resize-none
          pt-2
          ${className}
        `}
      />
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <Navbar />

      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-16 md:gap-20">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-10">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex items-center gap-2 select-none">
                <span className="w-2.5 h-2.5 bg-primary rounded-[2px]" />

                <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
                  {t("badge")}
                </span>
              </div>

              <h1 className="text-3xl md:text-[40px] font-semibold text-[var(--black)] tracking-tight max-w-3xl leading-tight">
                {t("title")}
              </h1>
            </div>

            {/* Social Media Vertical Icons */}
            <div className="flex flex-col items-center gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <HugeiconsIcon icon={Facebook01Icon} className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <HugeiconsIcon icon={InstagramIcon} className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <HugeiconsIcon icon={Linkedin02Icon} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Form Section */}
          <form className="flex flex-col gap-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Row 1 */}
              <InputField type="text" placeholder={t("form.name")} />

              <InputField type="email" placeholder={t("form.email")} />

              {/* Row 2 */}
              <InputField type="text" placeholder={t("form.company")} />

              <InputField type="tel" placeholder={t("form.phone")} />
            </div>

            {/* Row 3 - Subject / Dropdown */}
            <div className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors relative group flex items-center justify-between cursor-pointer">
              <input
                type="text"
                placeholder={t("form.subject")}
                className="
                  w-full
                  bg-transparent
                  text-xl
                  md:text-2xl
                  text-[var(--black)]
                  placeholder:text-slate-400
                  outline-none
                  cursor-pointer
                "
                readOnly
              />

              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className="w-6 h-6 text-[var(--black)]"
              />
            </div>

            {/* Row 4 - Message */}
            <TextareaField placeholder={t("form.message")} rows={4} />

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                asChild
                className="group h-auto bg-primary-600 hover:bg-[#d61e1e] text-white px-7 py-3 rounded-[12px] text-base font-medium shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto border border-transparent"
              >
                <Link
                  href={``}
                  className="flex items-center justify-center gap-2"
                >
                  {t("form.submit")}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>

                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Link>
              </Button>
            </div>
          </form>
        </div>
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
