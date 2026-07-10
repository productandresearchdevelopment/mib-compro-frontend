"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import SolutionsMegaMenu from "@/components/pages/navbar/SolutionsMegaMenu";
import ProductsMegaMenu from "@/components/pages/navbar/ProductsMegaMenu";
import CompanyMegaMenu from "@/components/pages/navbar/CompanyMegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu, Code, Server, Building2, Newspaper, Phone, Layers } from "lucide-react";

// ── Mobile accordion sub-menu data ───────────────────────────────────────────
function useMobileMenuData(locale: string) {
  const baseHref = `/${locale}`;
  return [
    {
      label: locale === "id" ? "Solusi" : "Solution",
      key: "solution",
      hasChildren: true,
      children: [
        { label: locale === "id" ? "AIoT & Hardware" : "AIoT & Hardware", href: `${baseHref}/pillars/aiot-hardware`, Icon: Cpu },
        { label: locale === "id" ? "Perangkat Lunak" : "Software", href: `${baseHref}/pillars/software`, Icon: Code },
        { label: locale === "id" ? "Managed Services" : "Managed Services", href: `${baseHref}/pillars/services`, Icon: Server },
        { label: locale === "id" ? "Semua Solusi" : "All Solutions", href: `${baseHref}/solution`, Icon: Layers },
      ],
    },
    {
      label: locale === "id" ? "Produk" : "Product",
      key: "product",
      hasChildren: true,
      children: [
        { label: "ProtectQube AIoT", href: `${baseHref}/product/protectqube`, Icon: Cpu },
        { label: "QIFESS Software", href: `${baseHref}/product/qifess`, Icon: Code },
        { label: locale === "id" ? "Semua Produk" : "All Products", href: `${baseHref}/product`, Icon: Layers },
      ],
    },
    {
      label: locale === "id" ? "Perusahaan" : "Company",
      key: "company",
      hasChildren: true,
      children: [
        { label: locale === "id" ? "Tentang Kami" : "About Us", href: `${baseHref}/company`, Icon: Building2 },
        { label: locale === "id" ? "Insight" : "Insight", href: `${baseHref}/insights`, Icon: Newspaper },
      ],
    },
    {
      label: locale === "id" ? "Hubungi Kami" : "Contact Us",
      key: "contact",
      hasChildren: false,
      href: `${baseHref}/contact`,
      Icon: Phone,
    },
  ];
}

export default function Navbar({
  theme = "light",
  isLoaded = true,
}: {
  theme?: "light" | "dark";
  isLoaded?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [activeDesktopLink, setActiveDesktopLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const baseHref = `/${locale}`;
  const mobileMenuData = useMobileMenuData(locale);

  const NAV_LINKS = [
    { label: t("solution"), key: "solution", hasMega: true },
    { label: t("product"), key: "product", hasMega: true },
    { label: t("company"), key: "company", hasMega: true },
    { label: t("news"), key: "news", href: `${baseHref}/insights`, hasMega: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isHomePage =
        pathname === baseHref || pathname === `${baseHref}/` || pathname === "/";
      const threshold = isHomePage ? 2.85 * window.innerHeight : 50;
      setScrolled(currentScrollY > threshold);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
        setIsSolutionsOpen(false);
        setIsProductsOpen(false);
        setIsCompanyOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, baseHref]);

  const shouldBeWhite = scrolled;
  const isTransparentDark = theme === "dark" && !shouldBeWhite;

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setIsSolutionsOpen(false);
      setIsProductsOpen(false);
      setIsCompanyOpen(false);
      setActiveDesktopLink(null);
    }, 150);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const closeMegaMenus = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsSolutionsOpen(false);
    setIsProductsOpen(false);
    setIsCompanyOpen(false);
    setActiveDesktopLink(null);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isLoaded ? 0 : -80, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          shouldBeWhite ? "bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm" : "bg-transparent border-b border-transparent"
        } ${hidden ? "-top-20" : "top-0"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between relative">
          {/* Logo */}
          <Link href={baseHref} className="flex items-center z-10 shrink-0">
            <Image src="/images/logo.png" alt="MIB Logo" width={88} height={44} className="object-contain" />
          </Link>

          {/* ── Desktop Center Nav ── */}
          <div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center h-full"
            onMouseLeave={scheduleClose}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeDesktopLink === link.key;
              const megaOpen =
                (link.key === "solution" && isSolutionsOpen) ||
                (link.key === "product" && isProductsOpen) ||
                (link.key === "company" && isCompanyOpen);

              return (
                <div
                  key={link.key}
                  className="relative flex items-center h-full px-5 group"
                  onMouseEnter={() => {
                    cancelClose();
                    setActiveDesktopLink(link.key);
                    if (link.key === "solution") { setIsSolutionsOpen(true); setIsProductsOpen(false); setIsCompanyOpen(false); }
                    else if (link.key === "product") { setIsProductsOpen(true); setIsSolutionsOpen(false); setIsCompanyOpen(false); }
                    else if (link.key === "company") { setIsCompanyOpen(true); setIsSolutionsOpen(false); setIsProductsOpen(false); }
                    else closeMegaMenus();
                  }}
                >
                  {link.href ? (
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 font-semibold text-[15px] transition-colors duration-200 ${
                        isTransparentDark ? "text-white/90 hover:text-white" : "text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 font-semibold text-[15px] transition-colors duration-200 ${
                        isTransparentDark ? "text-white/90 hover:text-white" : "text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      {link.label}
                      {link.hasMega && (
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 opacity-60 ${megaOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                  )}

                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-3 left-5 right-5 h-[2px] rounded-full bg-primary-500 transition-all duration-300 origin-left ${
                      megaOpen || (isActive && !link.hasMega) ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden md:flex items-center gap-4 z-10 shrink-0">
            <LanguageSwitcher isDark={isTransparentDark} />
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-6 py-2.5 h-auto text-sm transition-all duration-200 hover:scale-[1.02]"
            >
              <Link href={`${baseHref}/contact`}>{t("contactUs").toUpperCase()}</Link>
            </Button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <div className="md:hidden flex items-center gap-3 z-10">
            <LanguageSwitcher isDark={isTransparentDark} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isTransparentDark ? "text-white hover:bg-white/10" : "text-slate-800 hover:bg-slate-100"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <HugeiconsIcon icon={Cancel01Icon} className="w-6 h-6" />
              ) : (
                <HugeiconsIcon icon={Menu01Icon} className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* ── Desktop Mega Menus ── */}
        <SolutionsMegaMenu
          isOpen={isSolutionsOpen}
          onClose={() => setIsSolutionsOpen(false)}
          onMouseEnter={() => { cancelClose(); setIsSolutionsOpen(true); }}
          onMouseLeave={scheduleClose}
        />
        <ProductsMegaMenu
          isOpen={isProductsOpen}
          onClose={() => setIsProductsOpen(false)}
          onMouseEnter={() => { cancelClose(); setIsProductsOpen(true); }}
          onMouseLeave={scheduleClose}
        />
        <CompanyMegaMenu
          isOpen={isCompanyOpen}
          onClose={() => setIsCompanyOpen(false)}
          onMouseEnter={() => { cancelClose(); setIsCompanyOpen(true); }}
          onMouseLeave={scheduleClose}
        />
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 z-40"
            />

            {/* Drawer panel */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 flex flex-col shadow-2xl overflow-y-auto"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <Image src="/images/logo.png" alt="MIB" width={72} height={36} className="object-contain" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
                </button>
              </div>

              {/* Menu items */}
              <div className="flex flex-col flex-1 px-4 py-4">
                {mobileMenuData.map((item) => (
                  <div key={item.key} className="border-b border-slate-50 last:border-0">
                    {item.hasChildren ? (
                      <>
                        {/* Accordion trigger */}
                        <button
                          onClick={() =>
                            setExpandedMobileSection(
                              expandedMobileSection === item.key ? null : item.key
                            )
                          }
                          className="flex items-center justify-between w-full px-3 py-4 text-left"
                        >
                          <span className={`font-semibold text-base transition-colors duration-200 ${
                            expandedMobileSection === item.key ? "text-primary-600" : "text-slate-800"
                          }`}>
                            {item.label}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-slate-400 transition-transform duration-300 ${
                              expandedMobileSection === item.key ? "rotate-180 text-primary-500" : ""
                            }`}
                          />
                        </button>

                        {/* Accordion content */}
                        <AnimatePresence>
                          {expandedMobileSection === item.key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pb-3 pt-1 flex flex-col gap-1">
                                {item.children?.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 group"
                                  >
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 group-hover:bg-primary-100 transition-colors duration-200">
                                      <child.Icon size={14} className="text-slate-500 group-hover:text-primary-600" />
                                    </div>
                                    <span className="font-medium text-sm">{child.label}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (() => {
                      const DirectIcon = (item as any).Icon as React.ElementType | undefined;
                      return (
                        <Link
                          href={(item as any).href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-4 text-slate-800 hover:text-primary-600 transition-colors duration-200"
                        >
                          {DirectIcon && <DirectIcon size={16} className="text-slate-400" />}
                          <span className="font-semibold text-base">{item.label}</span>
                        </Link>
                      );
                    })()}
                  </div>
                ))}
              </div>

              {/* Drawer footer CTA */}
              <div className="px-6 pb-8 pt-4 border-t border-slate-100">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl py-4 h-auto text-base"
                >
                  <Link href={`${baseHref}/contact`} onClick={() => setMobileMenuOpen(false)}>
                    {t("contactUs").toUpperCase()}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
