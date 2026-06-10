"use client";

import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AiotHardwarePillar from "@/components/pages/pillars/AiotHardwarePillar";
import SoftwarePillar from "@/components/pages/pillars/SoftwarePillar";
import ServicesPillar from "@/components/pages/pillars/ServicesPillar";

export default function PillarDetailPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = React.use(props.params);

  // Validate slug
  const isValidSlug = ["aiot-hardware", "software", "services"].includes(slug);
  if (!isValidSlug) {
    notFound();
  }

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col justify-between selection:bg-red-600 selection:text-white">
      <Navbar theme="light" />

      <main className="flex-1">
        {slug === "aiot-hardware" && <AiotHardwarePillar locale={locale} showBackLink={false} />}
        {slug === "software" && <SoftwarePillar locale={locale} showBackLink={false} />}
        {slug === "services" && <ServicesPillar locale={locale} showBackLink={false} />}
      </main>

      <Footer />
    </div>
  );
}
