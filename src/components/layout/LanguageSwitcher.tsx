"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";
import Image from "next/image";

const LOCALE_CONFIG = {
  id: {
    label: "ID",
    flag: "https://flagcdn.com/id.svg",
    alt: "Bahasa Indonesia",
  },
  en: {
    label: "EN",
    flag: "https://flagcdn.com/gb.svg",
    alt: "English",
  },
} as const;

type Locale = (typeof routing.locales)[number];

export default function LanguageSwitcher({ isDark = false }: { isDark?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LOCALE_CONFIG[locale] ?? LOCALE_CONFIG.id;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    // Replace current locale prefix in the pathname with new locale
    // pathname example: /id/solution → /en/solution
    const segments = pathname.split("/");
    // segments[1] is the locale segment
    if (routing.locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join("/") || "/";
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer"
        aria-label="Switch language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Flag */}
        <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 relative shadow-sm border border-slate-200">
          <Image
            src={current.flag}
            alt={current.alt}
            fill
            className="object-cover"
            sizes="24px"
            unoptimized
          />
        </div>

        {/* Label */}
        <span className={`${isDark ? "text-white" : "text-black"} text-base font-semibold leading-none whitespace-nowrap`}>
          {current.label}
        </span>

        {/* Chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${isDark ? "text-white text-opacity-80" : "text-black"} transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute top-full right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {routing.locales.map((loc) => {
            const config = LOCALE_CONFIG[loc];
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                role="option"
                aria-selected={isActive}
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? "bg-slate-50 text-black"
                    : "text-slate-600 hover:bg-slate-50 hover:text-black"
                }`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 relative border border-slate-200">
                  <Image
                    src={config.flag}
                    alt={config.alt}
                    fill
                    className="object-cover"
                    sizes="24px"
                    unoptimized
                  />
                </div>
                <span className="text-sm font-semibold">{config.label}</span>
                {isActive && (
                  <svg
                    className="ml-auto w-4 h-4 text-primary shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
