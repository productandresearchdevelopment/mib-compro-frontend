"use client";

import React from "react";
import {
  Activity,
  Map as MapIcon,
  MessageCircle,
  Cpu,
  Server,
  Code,
} from "lucide-react";
import DottedMap from "dotted-map";
import { Area, AreaChart, CartesianGrid } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

// --- DOTTED MAP SETTINGS ---
const map = new DottedMap({ height: 55, grid: "diagonal" });
const points = map.getPoints();

const svgOptions = {
  backgroundColor: "transparent",
  color: "#cbd5e1",
  radius: 0.15,
};

const Map = () => {
  const viewBox = `0 0 120 60`;
  return (
    <svg
      viewBox={viewBox}
      style={{ background: svgOptions.backgroundColor }}
      className="w-full h-auto text-slate-350 dark:text-slate-600"
    >
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={svgOptions.radius}
          fill="currentColor"
        />
      ))}
    </svg>
  );
};

// --- CHART SETTINGS ---
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#f22929", // Red to match MIB primary palette beautifully
  },
} satisfies ChartConfig;

const chartData = [
  { month: "May", desktop: 56, mobile: 224 },
  { month: "June", desktop: 56, mobile: 224 },
  { month: "January", desktop: 126, mobile: 252 },
  { month: "February", desktop: 205, mobile: 410 },
  { month: "March", desktop: 200, mobile: 126 },
  { month: "April", desktop: 400, mobile: 800 },
];

const MonitoringChart = () => {
  return (
    <ChartContainer
      className="h-48 md:h-56 w-full"
      config={chartConfig}
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.4}
            />
            <stop
              offset="55%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.0}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.4}
            />
            <stop
              offset="55%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(226, 232, 240, 0.3)" />
        <ChartTooltip
          active
          cursor={false}
          content={<ChartTooltipContent className="dark:bg-slate-900" />}
        />
        <Area
          strokeWidth={2.5}
          dataKey="mobile"
          type="stepBefore"
          fill="url(#fillMobile)"
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          strokeWidth={2.5}
          dataKey="desktop"
          type="stepBefore"
          fill="url(#fillDesktop)"
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default function Features() {
  const t = useTranslations("features");
  const locale = useLocale();

  return (
    <section
      id="solution"
      className="px-4 py-16 md:py-32 bg-white border-t border-slate-100"
    >
      {/* Header / Intro section to keep high visual elegance and brand identification */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-[48px] font-semibold tracking-tight text-slate-900 leading-[1.3] lg:max-w-[680px]">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-[1.8] lg:max-w-[550px]">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Main grid containing the exact requested layout structure, styled to max-w-7xl size */}
      <div className="mx-auto grid max-w-7xl border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 bg-white grid-cols-1 lg:grid-cols-3">
        
        {/* COLUMN 1: AIoT & HARDWARE (protectQube) */}
        <Link
          href={`/${locale}/pillars/aiot-hardware`}
          className="group flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 hover:bg-slate-50/40 transition-all duration-305 cursor-pointer animate-fade-in"
        >
          <div className="p-8 sm:p-12">
            <span className="text-slate-500 font-semibold flex items-center gap-2 text-sm bg-slate-50 border border-slate-100 w-max px-3 py-1.5 rounded-full transition-transform group-hover:scale-[1.03] duration-300">
              <Cpu className="size-4 text-primary-600 transition-transform group-hover:rotate-6 group-hover:scale-110 duration-300" />
              {t("aiotBadge")}
            </span>

            <div className="mt-6">
              <div className="h-16 flex items-center">
                <Image
                  src="/images/logo-protectcube.png"
                  alt="protectQube Logo"
                  width={150}
                  height={56}
                  className="object-contain max-h-12"
                />
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                {t("aiotTitle")}
              </p>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                {t("aiotDesc")}
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="relative border-t border-slate-100 pt-6 bg-slate-50/30 overflow-hidden"
          >
            <div className="absolute inset-0 z-10 m-auto size-fit">
              <div className="rounded-xl bg-white dark:bg-slate-900 relative z-[2] flex size-fit w-fit items-center gap-2 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-850 shadow-md shadow-black/5">
                <span className="text-lg">🇮🇩</span> {t("lastConnection")}
              </div>
              <div className="rounded-xl bg-white dark:bg-slate-950 absolute inset-2 -bottom-2 mx-auto border border-slate-200 px-3 py-4 text-xs font-medium shadow-md shadow-black/5 z-[1]"></div>
            </div>

            <div className="relative overflow-hidden opacity-90 px-6 py-4">
              <div className="[background-image:radial-gradient(var(--tw-gradient-stops))] z-1 to-white absolute inset-0 from-transparent to-90%"></div>
              <Map />
            </div>
          </div>
        </Link>

        {/* COLUMN 2: SOFTWARE (QIFESS Chart) */}
        <Link
          href={`/${locale}/pillars/software`}
          className="group flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 hover:bg-slate-50/40 transition-all duration-305 cursor-pointer animate-fade-in"
        >
          <div className="p-8 sm:p-12">
            <span className="text-slate-500 font-semibold flex items-center gap-2 text-sm bg-slate-50 border border-slate-100 w-max px-3 py-1.5 rounded-full transition-transform group-hover:scale-[1.03] duration-300">
              <Code className="size-4 text-primary-600 transition-transform group-hover:scale-110 duration-300" />
              {t("softwareBadge")}
            </span>

            <div className="mt-6">
              <div className="h-16 flex items-center">
                <Image
                  src="/images/logo-qifess.png"
                  alt="QIFESS Logo"
                  width={150}
                  height={56}
                  className="object-contain max-h-12"
                />
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                {t("softwareSub")}
              </p>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                {t("softwareDesc")}
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="relative border-t border-slate-100 pt-6 bg-slate-50/30 overflow-hidden"
          >
            <div className="h-48 md:h-56 w-full flex items-end">
              <MonitoringChart />
            </div>
          </div>
        </Link>

        {/* COLUMN 3: SERVICES (Managed Services) */}
        <Link
          href={`/${locale}/pillars/services`}
          className="group flex flex-col justify-between border-b lg:border-b-0 hover:bg-slate-50/40 transition-all duration-305 cursor-pointer animate-fade-in"
        >
          <div className="p-8 sm:p-12">
            <span className="text-slate-500 font-semibold flex items-center gap-2 text-sm bg-slate-50 border border-slate-100 w-max px-3 py-1.5 rounded-full transition-transform group-hover:scale-[1.03] duration-300">
              <Server className="size-4 text-primary-600 transition-transform group-hover:-translate-y-0.5 duration-300" />
              {t("servicesBadge")}
            </span>

            <div className="mt-6">
              <div className="h-16 flex items-center">
                <div className="flex items-center gap-2 select-none">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-7 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="servicesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f22929" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5z"
                      stroke="url(#servicesGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12l10 5 10-5"
                      stroke="url(#servicesGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17l10 5 10-5"
                      stroke="url(#servicesGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[22px] font-extrabold tracking-tight text-slate-900 font-sans leading-none">
                    services
                  </span>
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                {t("servicesTitle")}
              </p>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                {t("servicesDesc")}
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="relative border-t border-slate-100 p-6 sm:p-8 bg-slate-50/30"
          >
            <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md transition-shadow group-hover:shadow-lg duration-300">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex justify-center items-center size-5 rounded-full border border-slate-200">
                    <span className="size-2 rounded-full bg-primary-600 animate-pulse" />
                  </span>
                  <span className="text-slate-400 text-[9px] font-bold tracking-wider uppercase">
                    {t("clientDispatchBadge")}
                  </span>
                </div>
                <div className="rounded-xl bg-slate-50 mt-1.5 w-[90%] border border-slate-100 p-2.5 text-xs text-slate-700 font-medium">
                  {t("clientMessage")}
                </div>
              </div>

              <div>
                <div className="rounded-xl ml-auto w-[90%] bg-primary-600 p-2.5 text-xs text-white shadow-md shadow-red-500/10 font-medium">
                  {t("engineerMessage")}
                </div>
                <span className="text-slate-400 block text-right text-[9px] font-semibold mt-1">
                  {t("resolvedStatus")}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
