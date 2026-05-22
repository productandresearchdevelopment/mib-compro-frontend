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
  BookmarkIcon
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
              href={`/${locale}/news`} 
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
    <div className="min-h-screen bg-slate-50/50 selection:bg-primary selection:text-white">
      <Navbar />

      <main className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-8 md:gap-12">
          
          {/* Back button and Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 animate-fade-in">
            <Link 
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold text-base"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
              {t("backToList")}
            </Link>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Link href={`/${locale}`} className="hover:text-slate-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href={`/${locale}/news`} className="hover:text-slate-900 transition-colors">News</Link>
              <span>/</span>
              <span className="text-slate-900 line-clamp-1 max-w-[200px] md:max-w-xs">{currentTitle}</span>
            </div>
          </div>

          {/* Large Header Title Card */}
          <div className="flex flex-col gap-6 max-w-4xl animate-fade-in duration-300">
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FEEBEB] text-[#F22929]">
                {currentCategory}
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 flex items-center gap-1.5">
                <HugeiconsIcon icon={Calendar02Icon} className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 flex items-center gap-1.5">
                <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5" />
                {currentReadTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#100420] tracking-tight leading-tight">
              {currentTitle}
            </h1>
          </div>

          {/* Feature Header Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-md border border-slate-200"
          >
            <Image
              src={article.image}
              alt={currentTitle}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Reading Layout (Content Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
            
            {/* Social Sharing bar (Left Sidebar on Desktop) */}
            <div className="lg:col-span-1 lg:sticky lg:top-32 flex lg:flex-col gap-4 items-center justify-start py-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 lg:mb-2 rotate-0 lg:-rotate-90 lg:w-16 text-center">
                Share
              </span>
              <button 
                onClick={handleCopyLink}
                className="w-11 h-11 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                title="Copy Link"
              >
                <HugeiconsIcon icon={Link02Icon} className="w-4 h-4" />
              </button>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white hover:bg-[#0077B5] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white transition-colors shadow-sm"
                title="Share on LinkedIn"
              >
                <HugeiconsIcon icon={LinkedinIcon} className="w-4 h-4" />
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white hover:bg-[#1877F2] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white transition-colors shadow-sm"
                title="Share on Facebook"
              >
                <HugeiconsIcon icon={Facebook01Icon} className="w-4 h-4" />
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}&text=${encodeURIComponent(currentTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white hover:bg-[#1DA1F2] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white transition-colors shadow-sm"
                title="Share on Twitter"
              >
                <HugeiconsIcon icon={TwitterIcon} className="w-4 h-4" />
              </a>
            </div>

            {/* Central Readable Content (Center) */}
            <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm">
              <article 
                className="prose prose-slate prose-lg max-w-none 
                  prose-headings:text-[#100420] prose-headings:font-bold 
                  prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-slate-600 prose-li:mb-2
                  prose-blockquote:border-l-4 prose-blockquote:border-[#F22929] prose-blockquote:bg-slate-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:my-8 prose-blockquote:italic
                  prose-blockquote-cite:block prose-blockquote-cite:text-right prose-blockquote-cite:text-sm prose-blockquote-cite:text-slate-500 prose-blockquote-cite:mt-2 prose-blockquote-cite:font-semibold prose-blockquote-cite:not-italic
                "
                dangerouslySetInnerHTML={{ __html: currentContent }}
              />
            </div>

            {/* Sidebar widgets (Right Sidebar on Desktop) */}
            <div className="lg:col-span-3 flex flex-col gap-8 lg:sticky lg:top-32">
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <h4 className="text-base font-bold text-[#100420] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                  <HugeiconsIcon icon={BookmarkIcon} className="w-4 h-4 text-primary" />
                  Quick Info
                </h4>
                
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Published Date</span>
                    <span className="text-sm font-semibold text-[#100420]">{article.date}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Reading Speed</span>
                    <span className="text-sm font-semibold text-[#100420]">{currentReadTime}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Author</span>
                    <span className="text-sm font-semibold text-[#100420]">PT. Qualita Indonesia</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Related Articles footer grid */}
          {relatedArticles.length > 0 && (
            <div className="flex flex-col gap-8 border-t border-slate-200 pt-16 mt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#100420]">
                {t("relatedTitle")}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((item) => (
                  <Link 
                    key={item.id}
                    href={`/${locale}/news/${item.slug}`}
                    className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title[locale as "en" | "id"]}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-[#FEEBEB] text-[#F22929]">
                          {locale === "id" ? item.category_id : item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                      <h3 className="text-base font-bold text-[#100420] line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {item.title[locale as "en" | "id"]}
                      </h3>
                      
                      <div className="flex items-center gap-1 text-sm text-[#2068F7] font-semibold">
                        {t("readMore")}
                        <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer showCta={true} />
    </div>
  );
}
