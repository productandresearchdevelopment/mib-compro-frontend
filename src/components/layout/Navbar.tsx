"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import SolutionsMegaMenu from "@/components/pages/navbar/SolutionsMegaMenu";
import CompanyMegaMenu from "@/components/pages/navbar/CompanyMegaMenu";

export default function Navbar({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  const baseHref = `/${locale}`;

  const NAV_LINKS = [
    { label: t("home"), href: `${baseHref}` },
    { label: t("solution"), href: `${baseHref}/solution` },
    { label: t("product"), href: `${baseHref}/product` },
    { label: t("company"), href: `${baseHref}/company` },
  ];

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [dotPosition, setDotPosition] = useState("0px");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
        setIsSolutionsOpen(false);
        setIsCompanyOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const anyHovered = !!hoveredLink;
  const shouldBeWhite = scrolled;
  const isTransparentDark = theme === "dark" && !shouldBeWhite;

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        shouldBeWhite ? "bg-white border-slate-200" : "bg-transparent"
      } ${hidden ? "-top-20" : "top-0"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Left Side Logo */}
        <Link
          href={baseHref}
          className="flex items-center z-10 animate-fade-in duration-300"
        >
          <Image
            src="/images/logo.png"
            alt="MIB Logo"
            width={100}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* REAL CENTER NAV — sliding dot indicator */}
        <div
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 h-full"
          ref={navRef}
          onMouseLeave={() => {
            setHoveredLink(null);
            setIsSolutionsOpen(false);
            setIsCompanyOpen(false);
          }}
        >
          {/* Sliding dot — satu elemen yang bergerak */}
          <span
            style={{
              position: "absolute",
              bottom: "12px",
              left: dotPosition,
              width: "8px",
              height: "8px",
              background: "var(--color-primary, #2563eb)",
              transform: `translateX(-50%) scale(${hoveredLink ? 1 : 0})`,
              transformOrigin: "50% 50%",
              opacity: hoveredLink ? 1 : 0,
              transition:
                "left 0.70s cubic-bezier(0.34, 1.15, 0.64, 1), opacity 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1.25)",
              pointerEvents: "none",
            }}
          />

          {NAV_LINKS.map((link) => {
            const isSolutionLink = link.label === t("solution");
            const isCompanyLink = link.label === t("company");
            const isHovered = hoveredLink === link.label;

            return (
              <div
                key={link.href}
                ref={(el) => {
                  linkRefs.current[link.label] = el;
                }}
                className="relative flex items-center justify-center h-full px-5 cursor-pointer"
                onMouseEnter={(e) => {
                  setHoveredLink(link.label);
                  // hitung center posisi dot
                  const navEl = navRef.current;
                  const itemEl = e.currentTarget;
                  if (navEl && itemEl) {
                    const navRect = navEl.getBoundingClientRect();
                    const itemRect = itemEl.getBoundingClientRect();
                    const center =
                      itemRect.left - navRect.left + itemRect.width / 2;
                    setDotPosition(center + "px");
                  }
                  if (isSolutionLink) {
                    setIsSolutionsOpen(true);
                    setIsCompanyOpen(false);
                  } else if (isCompanyLink) {
                    setIsCompanyOpen(true);
                    setIsSolutionsOpen(false);
                  } else {
                    setIsSolutionsOpen(false);
                    setIsCompanyOpen(false);
                  }
                }}
              >
                <Link
                  href={link.href}
                  className="font-semibold text-[17px] transition-colors duration-200"
                  style={{
                    color: isTransparentDark
                      ? "var(--color-white)"
                      : anyHovered
                        ? isHovered
                          ? "var(--color-black)"
                          : "var(--color-gray)"
                        : "var(--color-black)",
                  }}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4 z-10 shrink-0">
          <LanguageSwitcher isDark={isTransparentDark} />

          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-7 py-3 h-auto text-base transition-colors duration-200"
          >
            <Link href={`${baseHref}/contact`}>
              {t("contactUs").toUpperCase()}
            </Link>
          </Button>
        </div>

        {/* Mobile Navbar Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher isDark={isTransparentDark} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isTransparentDark
                ? "text-white hover:bg-white/10"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <HugeiconsIcon icon={Menu01Icon} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* --- MEGA MENU FLOATING BOXES & BACKDROPS --- */}
      <SolutionsMegaMenu
        isOpen={isSolutionsOpen}
        onClose={() => setIsSolutionsOpen(false)}
        onMouseEnter={() => setIsSolutionsOpen(true)}
        onMouseLeave={() => setIsSolutionsOpen(false)}
      />

      <CompanyMegaMenu
        isOpen={isCompanyOpen}
        onClose={() => setIsCompanyOpen(false)}
        onMouseEnter={() => setIsCompanyOpen(true)}
        onMouseLeave={() => setIsCompanyOpen(false)}
      />

      {/* Mobile Drawer Menu (if open) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-40 flex flex-col px-6 py-8 border-t border-slate-100 shadow-xl overflow-y-auto">
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-semibold text-xl border-b border-slate-50 pb-3 transition-colors ${
                  pathname === link.href ? "text-primary" : "text-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl py-4 h-auto text-[17px]"
            >
              <Link
                href={`${baseHref}/contact`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("contactUs").toUpperCase()}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
