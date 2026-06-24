"use client";

import React, { use, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ArrowLeft01Icon, 
  ArrowUpRight01Icon,
  Calendar02Icon, 
  Clock01Icon,
  Facebook01Icon, 
  LinkedinIcon,
  TwitterIcon,
  Link02Icon,
  InstagramIcon
} from "@hugeicons/core-free-icons";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NEWS_DATA } from "@/data/newsData";

type Params = Promise<{ locale: string; slug: string }>;

interface Props {
  params: Params;
}

export default function NewsDetailPage(props: Props) {
  const params = use(props.params);
  const locale = params.locale;
  const slug = params.slug;
  const t = useTranslations("news");
  const tFooter = useTranslations("footer");

  // Retrieve current article
  const article = useMemo(() => {
    return NEWS_DATA.find(item => item.slug === slug);
  }, [slug]);

  // Retrieve related articles (exclude current, take up to 3 items)
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return NEWS_DATA
      .filter(item => item.id !== article.id)
      .slice(0, 3);
  }, [article]);

  // Retrieve recommended articles (exclude current, take up to 5 items)
  const recommendedArticles = useMemo(() => {
    if (!article) return [];
    return NEWS_DATA
      .filter(item => item.id !== article.id)
      .slice(0, 6);
  }, [article]);

  // Handle Copy Link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert(locale === "id" ? "Link berhasil disalin!" : "Link copied to clipboard!");
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <main className="pt-32 pb-24 flex-grow flex items-center justify-center">
          <div className="text-center px-6 max-w-md">
            <h1 className="text-6xl font-bold text-[#100420] mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-[#100420] mb-3">Article Not Found</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              The news article you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link 
              href={`/${locale}/insights`} 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#100420] text-white hover:bg-[#100420]/90 transition-all font-semibold"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
              {t("backToList")}
            </Link>
          </div>
        </main>
        <Footer showCta={false} />
      </div>
    );
  }

  const currentTitle = article.title[locale as "en" | "id"];
  const currentCategory = locale === "id" ? article.category_id : article.category;
  const currentReadTime = locale === "en" ? article.readTimeEN : article.readTimeID;
  const currentContent = article.content[locale as "en" | "id"];

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <Navbar />

      <main>
        {/* SECTION 1: White Header Section */}
        <section className="bg-slate-50/60 pt-32 pb-12 md:pt-32 md:pb-16">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-6">
            {/* Breadcrumbs Category above title (matching screenshot: Blog / Operations & Compliance) */}
            <div className="flex items-center gap-1 text-sm font-bold text-[#2068F7] select-none uppercase tracking-wider animate-fade-in mt-4">
              <Link href={`/${locale}/insights`} className="hover:underline">Insight</Link>
              <span className="text-slate-400">/</span>
              <span className="hover:underline">{currentCategory}</span>
            </div>
              
            {/* Header Title Section */}
            <div className="flex flex-col gap-6 max-w-5xl animate-fade-in duration-300">
              <h1 className="text-3xl md:text-5xl font-bold text-[#100420] tracking-tight leading-tight">
                {currentTitle}
              </h1>

              {/* Meta row under the title: Avatar, author name, reading time, last updated date */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium select-none">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden relative bg-slate-50 flex items-center justify-center">
                    <Image 
                      src="/images/logo.png" 
                      alt="PT. Qualita Indonesia" 
                      width={20} 
                      height={20} 
                      className="object-contain"
                    />
                  </div>
                  <span className="font-semibold text-slate-800">PT. Qualita Indonesia</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-slate-400" />
                  {currentReadTime}
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Calendar02Icon} className="w-4 h-4 text-slate-400" />
                  {t("lastUpdated")} {article.date}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Grey Content Grid Section */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-12 md:gap-16">
            
            {/* Grid for Left Content & Right Sticky Card */}
            <div className="flex flex-col lg:flex-row gap-10 md:gap-12 items-start">
              
              {/* Left Column (Feature Image & Central Readable Content) */}
              <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
                
                {/* Feature Header Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[16/10] md:aspect-[21/11] w-full rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-slate-50"
                >
                  <Image
                    src={article.image}
                    alt={currentTitle}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Readable Content (Direct without White Card wrapper) */}
                <div className="flex flex-col gap-6">
                  <article 
                    className="prose prose-slate prose-lg max-w-none 
                      prose-headings:text-slate-900 prose-headings:font-bold 
                      prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                      prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                      prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                      prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-slate-600 prose-li:mb-2
                      prose-blockquote:border-l-4 prose-blockquote:border-[#F22929] prose-blockquote:bg-slate-100/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:my-8 prose-blockquote:italic
                      prose-blockquote-cite:block prose-blockquote-cite:text-right prose-blockquote-cite:text-sm prose-blockquote-cite:text-slate-500 prose-blockquote-cite:mt-2 prose-blockquote-cite:font-semibold prose-blockquote-cite:not-italic
                    "
                    dangerouslySetInnerHTML={{ __html: currentContent }}
                  />

                  {/* Social Sharing bar at the bottom of the article */}
                  <div className="flex flex-col gap-4 border-t border-slate-200/60 pt-8 mt-6 select-none">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t("share")}
                    </span>
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={handleCopyLink}
                        className="w-11 h-11 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                        title="Copy Link"
                      >
                        <HugeiconsIcon icon={Link02Icon} className="w-4 h-4" />
                      </button>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-slate-50 hover:bg-[#0077B5] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white transition-colors shadow-sm"
                        title="Share on LinkedIn"
                      >
                        <HugeiconsIcon icon={LinkedinIcon} className="w-4 h-4" />
                      </a>
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-slate-50 hover:bg-[#1877F2] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white transition-colors shadow-sm"
                        title="Share on Facebook"
                      >
                        <HugeiconsIcon icon={Facebook01Icon} className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-slate-50 hover:bg-[#E1306C] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white transition-colors shadow-sm"
                        title="Share on Instagram"
                      >
                        <HugeiconsIcon icon={InstagramIcon} className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Sticky Call to Action Demo Card Widget) */}
              <div className="w-full lg:w-[340px] xl:w-[360px] lg:sticky lg:top-24 flex flex-col gap-6 shrink-0">
                
                {/* Recommended Articles Card */}
                <div className="bg-white border rounded-2xl p-6 transition-all duration-300 flex flex-col gap-5">
                  <h4 className="text-lg font-bold text-[#100420] tracking-tight border-b border-slate-100 pb-3">
                    {locale === "id" ? "Artikel Rekomendasi" : "Recommended Articles"}
                  </h4>
                  <div className="flex flex-col">
                    {recommendedArticles.map((item) => (
                      <Link 
                        key={item.id}
                        href={`/${locale}/insights/${item.slug}`}
                        className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 group border-b border-slate-100 last:border-0"
                      >
                        {/* Thumbnail Image */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                          <Image 
                            src={item.image} 
                            alt={locale === "id" ? item.title.id : item.title.en} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        {/* Title & Date */}
                        <div className="flex flex-col gap-1">
                          <h5 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {locale === "id" ? item.title.id : item.title.en}
                          </h5>
                          <span className="text-xs text-slate-400 font-medium font-sans">
                            {item.date}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Follow Us / Ikuti Kami Card */}
                {/* <div className="bg-primary rounded-3xl p-6 shadow-md flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/90 z-0" />
                  
                  <div className="relative z-10 flex flex-col items-center w-full">
                    <h5 className="text-xl font-bold tracking-tight text-white">
                      Follow Us / Ikuti Kami
                    </h5>
                    
                    <p className="text-xs text-white/90 leading-relaxed mt-2 max-w-[240px]">
                      Get our latest updates / Dapatkan update terbaru dari kami
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 mt-6">
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                        title="LinkedIn"
                      >
                        <HugeiconsIcon icon={LinkedinIcon} className="w-5 h-5 text-white" />
                      </a>
                      <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                        title="Facebook"
                      >
                        <HugeiconsIcon icon={Facebook01Icon} className="w-5 h-5 text-white" />
                      </a>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                        title="Instagram"
                      >
                        <HugeiconsIcon icon={InstagramIcon} className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div> */}

              </div>

            </div>

            {/* Related Articles footer grid */}
            {relatedArticles.length > 0 && (
              <div className="flex flex-col gap-8 border-t border-slate-200 pt-16 mt-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#100420]">
                  {t("relatedTitle")}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {relatedArticles.map((item) => (
                    <Link 
                      key={item.id}
                      href={`/${locale}/insights/${item.slug}`}
                      className="group flex flex-col w-full h-full"
                    >
                      {/* Image Card Container */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl md:rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-500 bg-slate-100">
                        {/* Image */}
                        <Image
                          src={item.image}
                          alt={locale === "id" ? item.title.id : item.title.en}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </div>

                      {/* Metadata and Title Underneath the Image Card */}
                      <div className="flex flex-col mt-6">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 tracking-wider">
                          <span>{locale === "id" ? item.category_id : item.category}</span>
                          <span className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
                          <span>{item.date}</span>
                        </div>
                        <h3 className="mt-2.5 text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-3">
                          {locale === "id" ? item.title.id : item.title.en}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer
        showCta={true}
        ctaTitle={tFooter("cta.insightTitle")}
        ctaButtonText={tFooter("cta.insightButton")}
        ctaButtonHref="/contact"
      />
    </div>
  );
}
