"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ArrowLeft01Icon, 
  Briefcase01Icon, 
  Location01Icon, 
  Clock01Icon, 
  Dollar01Icon,
  Calendar02Icon,
  AttachmentIcon,
  Tick01Icon,
  AlertCircleIcon
} from "@hugeicons/core-free-icons";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CAREERS_DATA } from "@/data/careersData";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default function CareerDetailPage(props: PageProps) {
  const params = React.use(props.params);
  const locale = useLocale();
  const t = useTranslations("careers");
  const formRef = useRef<HTMLFormElement>(null);

  // Find job details
  const job = CAREERS_DATA.find((item) => item.slug === params.slug);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!job) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-40 pb-32 flex flex-col items-center justify-center text-center px-6">
          <HugeiconsIcon icon={AlertCircleIcon} className="w-16 h-16 text-[#f22929] mb-4" />
          <h1 className="text-3xl font-bold text-[#100420] mb-2">{t("noJobs")}</h1>
          <p className="text-slate-500 max-w-sm mb-6">{t("noJobsDesc")}</p>
          <Link href={`/${locale}/careers`} className="px-6 py-3 rounded-full bg-[#100420] text-white font-semibold">
            {t("backToList")}
          </Link>
        </main>
        <Footer showCta={false} />
      </div>
    );
  }

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Drag Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  // Handle Drop Event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Limit file type to PDF or Word Doc
      if (file.type === "application/pdf" || file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
        setResumeFile(file);
        setErrorMsg("");
      } else {
        setErrorMsg(locale === "id" ? "Format file harus PDF atau Word (.doc/.docx)" : "File format must be PDF or Word (.doc/.docx)");
      }
    }
  };

  // Handle File Input Select
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setErrorMsg("");
    }
  };

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setErrorMsg(locale === "id" ? "Silakan unggah CV / Resume Anda" : "Please upload your CV / Resume");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg("");

    // Simulate API upload & saving
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setResumeFile(null);
    }, 1800);
  };

  // Smooth scroll helper to form
  const scrollToForm = () => {
    const targetElement = document.getElementById("apply-form-section");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-primary selection:text-white">
      <Navbar />

      <main className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-12">
          
          {/* 1. Back button & Breadcrumbs */}
          <div className="flex flex-col gap-4">
            <Link 
              href={`/${locale}/careers`}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors w-fit"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
              <span>{t("backToList")}</span>
            </Link>

            {/* Breadcrumb row */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Link href={`/${locale}`} className="hover:text-slate-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href={`/${locale}/careers`} className="hover:text-slate-600 transition-colors">Careers</Link>
              <span>/</span>
              <span className="text-slate-600 truncate max-w-[200px] md:max-w-none">{job.title[locale as "en" | "id"]}</span>
            </div>
          </div>

          {/* 2. Job Title & Header Overview */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-full bg-primary" />
            <div className="flex flex-col gap-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-[#FEEBEB] text-[#F22929] tracking-wider w-fit">
                {job.department[locale as "en" | "id"]}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-[#100420] tracking-tight leading-tight">
                {job.title[locale as "en" | "id"]}
              </h1>
              
              {/* Core Info Row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-slate-500 text-sm md:text-base font-medium">
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-slate-400" />
                  {job.location[locale as "en" | "id"]}
                </span>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-slate-400" />
                  {job.type[locale as "en" | "id"]}
                </span>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Calendar02Icon} className="w-4 h-4 text-slate-400" />
                  {job.postedDate}
                </span>
              </div>
            </div>

            {/* Apply Quick Trigger */}
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 rounded-2xl bg-[#100420] hover:bg-primary hover:scale-[1.02] text-white font-bold text-lg shadow-md transition-all shrink-0 text-center"
            >
              {t("applyNow")}
            </button>
          </div>

          {/* 3. Job Details Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Main Content Block (Job description, responsibilities, requirements) */}
            <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col gap-8">
              
              {/* Description */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-[#100420]">Job Description</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {job.description[locale as "en" | "id"]}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-[#100420]">Key Responsibilities</h2>
                <ul className="flex flex-col gap-2.5">
                  {job.responsibilities[locale as "en" | "id"].map((resp, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600 text-lg leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-[#100420]">Requirements</h2>
                <ul className="flex flex-col gap-2.5">
                  {job.requirements[locale as "en" | "id"].map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600 text-lg leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Widget Block (Overview Card) */}
            <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
              <h3 className="text-xl font-bold text-[#100420] border-b border-slate-100 pb-3">
                Job Overview
              </h3>

              {/* Attributes list */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                    <HugeiconsIcon icon={Briefcase01Icon} className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Department</span>
                    <span className="text-slate-800 font-semibold text-base">{job.department[locale as "en" | "id"]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                    <HugeiconsIcon icon={Location01Icon} className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Location</span>
                    <span className="text-slate-800 font-semibold text-base">{job.location[locale as "en" | "id"]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                    <HugeiconsIcon icon={Clock01Icon} className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Job Type</span>
                    <span className="text-slate-800 font-semibold text-base">{job.type[locale as "en" | "id"]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                    <HugeiconsIcon icon={Dollar01Icon} className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Salary</span>
                    <span className="text-slate-800 font-semibold text-base">{job.salary[locale as "en" | "id"]}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 4. Beautiful CV Submit Apply Form */}
          <div id="apply-form-section" className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm relative">
            <h2 className="text-2xl md:text-3xl font-bold text-[#100420] mb-8 border-b border-slate-100 pb-4">
              Apply for this position
            </h2>

            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner border border-emerald-100">
                    <HugeiconsIcon icon={Tick01Icon} className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t("successTitle")}</h3>
                  <p className="text-slate-500 max-w-md text-base leading-relaxed">
                    {t("successMessage")}
                  </p>
                  
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-colors"
                  >
                    Submit another application
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  ref={formRef}
                  onSubmit={handleFormSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700">{t("formName")} *</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="border border-slate-200 focus:border-[#100420] outline-none rounded-xl px-4 py-3 text-slate-800 transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">{t("formEmail")} *</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. johndoe@gmail.com"
                      className="border border-slate-200 focus:border-[#100420] outline-none rounded-xl px-4 py-3 text-slate-800 transition-colors"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700">{t("formPhone")} *</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +628123456789"
                      className="border border-slate-200 focus:border-[#100420] outline-none rounded-xl px-4 py-3 text-slate-800 transition-colors"
                    />
                  </div>

                  {/* File Upload drag/drop zone */}
                  <div className="flex flex-col gap-2 md:row-span-2">
                    <label className="text-sm font-semibold text-slate-700">{t("formResume")} *</label>
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px] transition-all ${
                        isDragActive 
                          ? "border-[#100420] bg-slate-50" 
                          : resumeFile 
                            ? "border-emerald-300 bg-emerald-50/10" 
                            : "border-slate-200 hover:border-[#100420] hover:bg-slate-50/50"
                      }`}
                    >
                      <input 
                        type="file"
                        id="resume-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileSelect}
                      />
                      
                      <label htmlFor="resume-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                        {resumeFile ? (
                          <>
                            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                              <HugeiconsIcon icon={AttachmentIcon} className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-semibold text-emerald-800 truncate max-w-[250px]">{resumeFile.name}</span>
                            <span className="text-xs text-slate-400">({(resumeFile.size / 1024).toFixed(1)} KB) - Click to replace</span>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                              <HugeiconsIcon icon={AttachmentIcon} className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-semibold text-slate-600">{t("formDragDrop")}</span>
                            <span className="text-xs text-slate-400">Supports PDF or DOCX up to 5MB</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Message / Pitch field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700">{t("formCoverLetter")}</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us why you are a great fit for this position..."
                      className="border border-slate-200 focus:border-[#100420] outline-none rounded-xl px-4 py-3 text-slate-800 transition-colors resize-none"
                    />
                  </div>

                  {/* Submission and error row */}
                  <div className="md:col-span-2 flex flex-col gap-4 items-start border-t border-slate-100 pt-6 mt-2">
                    {errorMsg && (
                      <span className="text-sm font-semibold text-[#f22929] flex items-center gap-1.5">
                        <HugeiconsIcon icon={AlertCircleIcon} className="w-4 h-4" />
                        {errorMsg}
                      </span>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#100420] hover:bg-primary disabled:bg-slate-400 text-white font-bold transition-all text-base min-w-[180px] shadow-sm select-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" data-name="path" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{t("formUploading")}</span>
                        </div>
                      ) : (
                        <span>{t("formSubmit")}</span>
                      )}
                    </button>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer showCta={false} />
    </div>
  );
}
