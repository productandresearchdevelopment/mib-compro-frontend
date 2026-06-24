"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Facebook01Icon,
  InstagramIcon,
  Linkedin02Icon,
  ArrowUpRight01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { showSuccessToast, showErrorToast } from "@/utils/toast";

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
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const subjects = locale === "id"
    ? [
        "Kemitraan / Kerja Sama",
        "Demo Field Service Management (QIFESS)",
        "Solusi Smart AIoT (Surveillance, HSE, Sensor Node)",
        "Pertanyaan Produk & Perangkat Keras",
        "Karir / Pekerjaan",
        "Pertanyaan Umum / Lainnya"
      ]
    : [
        "Partnership / Collaboration",
        "Field Service Management (QIFESS) Demo",
        "Smart AIoT Solutions (Surveillance, HSE, Sensor Node)",
        "Product & Hardware Inquiry",
        "Careers / Jobs",
        "General Inquiry / Other"
      ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showErrorToast(
        locale === "id"
          ? "Nama, email, dan pesan wajib diisi."
          : "Name, email, and message are required."
      );
      return;
    }

    // reCAPTCHA check bypassed for now
    /*
    if (!recaptchaToken) {
      showErrorToast(
        locale === "id"
          ? "Silakan verifikasi bahwa Anda bukan robot."
          : "Please verify that you are not a robot."
      );
      return;
    }
    */

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaToken || "bypass" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form.");
      }

      showSuccessToast(
        locale === "id" ? "Pesan Terkirim!" : "Message Sent!",
        locale === "id"
          ? "Terima kasih atas pesan Anda. Kami akan menghubungi Anda segera."
          : "Thank you for your message. We will get back to you shortly."
      );

      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
      });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch (error: any) {
      showErrorToast(
        error,
        locale === "id"
          ? "Gagal mengirim pesan. Silakan coba lagi."
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Row 1 */}
              <InputField
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("form.name")}
                required
              />

              <InputField
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("form.email")}
                required
              />

              {/* Row 2 */}
              <InputField
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t("form.company")}
              />

              <InputField
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("form.phone")}
              />
            </div>

            {/* Row 3 - Subject / Dropdown */}
            <div
              className="border-b border-slate-300 pb-4 focus-within:border-primary transition-colors relative group flex items-center justify-between cursor-pointer select-none"
              onClick={() => setIsSubjectOpen(!isSubjectOpen)}
            >
              <input
                type="text"
                placeholder={t("form.subject")}
                value={formData.subject}
                readOnly
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
              />

              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className={`w-6 h-6 text-[var(--black)] transition-transform duration-350 ${isSubjectOpen ? "rotate-180" : ""}`}
              />

              {isSubjectOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {subjects.map((subj) => (
                    <div
                      key={subj}
                      className="px-6 py-4 text-lg hover:bg-slate-50 text-[var(--black)] cursor-pointer transition-colors border-b border-slate-100 last:border-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, subject: subj });
                        setIsSubjectOpen(false);
                      }}
                    >
                      {subj}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Row 4 - Message */}
            <TextareaField
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("form.message")}
              rows={4}
              required
            />

            {/* reCAPTCHA Widget - Commented out for now */}
            {/* <div className="flex flex-col gap-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={(token) => setRecaptchaToken(token)}
              />
              <p className="text-xs md:text-sm text-red-500 font-medium">
                {locale === "id"
                  ? "* Jika captcha tidak muncul, silakan refresh halaman terlebih dahulu."
                  : "* If captcha does not appear, please refresh the page."}
              </p>
            </div> */}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group h-auto bg-primary-600 hover:bg-[#d61e1e] text-white px-7 py-3 rounded-[12px] text-base font-medium shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer w-full sm:w-auto border border-transparent flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  locale === "id" ? "Mengirim..." : "Sending..."
                ) : (
                  <>
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
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer
        showCta={true}
        ctaTitle={tFooter("cta.contactTitle")}
        ctaButtonText={tFooter("cta.button")}
        ctaButtonHref="/contact"
      />
    </div>
  );
}
