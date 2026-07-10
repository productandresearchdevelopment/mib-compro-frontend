"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { motion, useInView, Variants } from "framer-motion";
import { useLenis } from "lenis/react";

import Hero from "@/components/pages/home/Hero";
import Features2 from "@/components/pages/home/Features";
import ServicesShowcase from "@/components/pages/home/ServicesShowcase";
import Highlights from "@/components/pages/home/Highlights";
import QifessSection from "@/components/pages/home/QifessSection";
import ProtectQubeSection from "@/components/pages/home/ProtectQubeSection";
import HardwareShowcaseSection from "@/components/pages/home/HardwareShowcaseSection";
import ClientsSection from "@/components/pages/home/ClientsSection";
import ScrollMarquee from "@/components/effects/ScrollMarquee";
import Preloader from "@/components/effects/Preloader";

// ─────────────────────────────────────────────────────────────────────────────
// Reveal: sharp GSAP-style entrance with spring physics, no blur/gradient
// "punch" = element punches up from below with overshoot spring
// "slash" = wipe in from left using clip-path (no fade, instant sharp edges)
// "rise"  = fast y translate with quick opacity snap
// "zoom"  = scale from 96→100 with spring pop
// ─────────────────────────────────────────────────────────────────────────────
type RevealType = "punch" | "slash" | "rise" | "zoom" | "drift-left" | "drift-right";

function Reveal({
  children,
  type = "rise",
  delay = 0,
  margin = "-80px",
  className = "",
}: {
  children: React.ReactNode;
  type?: RevealType;
  delay?: number;
  margin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as any });

  const variants: Record<RevealType, Variants> = {
    punch: {
      hidden: { y: 80, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 90,
          damping: 14,
          mass: 0.8,
          delay,
        },
      },
    },
    slash: {
      hidden: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
      show: {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay },
      },
    },
    rise: {
      hidden: { y: 48, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay },
      },
    },
    zoom: {
      hidden: { scale: 0.94, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 16,
          delay,
        },
      },
    },
    "drift-left": {
      hidden: { x: -60, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
      },
    },
    "drift-right": {
      hidden: { x: 60, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants[type]}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SharpDivider: bold animated horizontal rule — replaces gradient blurs
// No blur — just a sharp expanding red accent line that punches in
// ─────────────────────────────────────────────────────────────────────────────
function SharpDivider({ dark = true }: { dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`${dark ? "bg-[#030712]" : "bg-white"} overflow-hidden`}>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="h-[2px] bg-gradient-to-r from-primary-600 via-primary-400 to-transparent w-full"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const tFooter = useTranslations("footer");
  const [isLoaded, setIsLoaded] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis[isLoaded ? "start" : "stop"]();
  }, [lenis, isLoaded]);

  return (
    <div className="min-h-screen bg-[#030712]" style={{ overflowX: "clip" }}>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <Navbar theme="dark" isLoaded={isLoaded} />

      <main className="relative">

        {/* ── 1. HERO ─────────────────────────── */}
        <Hero isLoaded={isLoaded} />

        {/* ── 2. CLIENTS ──────────────────────── */}
        <SharpDivider dark={false} />
        <div className="bg-slate-50">
          <Reveal type="punch" margin="-60px">
            <ClientsSection />
          </Reveal>
        </div>

        {/* ── 3. THREE PILLARS ────────────────── (no Reveal wrapper — sticky scroll) */}
        <SharpDivider dark />
        <Features2 />

        {/* ── MARQUEE 1 ────────────────────────── */}
        <SharpDivider dark />
        <Reveal type="rise" margin="-40px">
          <ScrollMarquee
            text="INTELLIGENCE • INNOVATION • SECURITY • SCALABILITY"
            direction="left"
            speedMultiplier={1.5}
          />
        </Reveal>

        {/* ── 4. HARDWARE SHOWCASE ────────────── (no Reveal wrapper — sticky scroll) */}
        <SharpDivider dark={false} />
        <div className="bg-white relative z-10">
          <HardwareShowcaseSection />
        </div>

        {/* ── MARQUEE 2 ────────────────────────── */}
        <SharpDivider dark />
        <Reveal type="rise" margin="-40px">
          <ScrollMarquee
            text="MANAGED SERVICES • FIELD OPERATIONS • NATIONWIDE SLA SUPPORT"
            direction="right"
            speedMultiplier={1.5}
          />
        </Reveal>

        {/* ── 5. PROTECT QUBE ─────────────────── */}
        <SharpDivider dark />
        <Reveal type="drift-left" margin="-80px">
          <ProtectQubeSection />
        </Reveal>

        {/* ── 6. QIFESS SOFTWARE ──────────────── */}
        <SharpDivider dark={false} />
        <div className="bg-white">
          <Reveal type="drift-right" margin="-80px">
            <QifessSection />
          </Reveal>
        </div>

        {/* ── 7. SERVICES SHOWCASE ────────────── */}
        <SharpDivider dark={false} />
        <Reveal type="punch" margin="-80px">
          <ServicesShowcase />
        </Reveal>

        {/* ── 8. HIGHLIGHTS ──────────────────── */}
        <SharpDivider dark={false} />
        <div className="bg-white">
          <Reveal type="rise" margin="-80px">
            <Highlights />
          </Reveal>
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
