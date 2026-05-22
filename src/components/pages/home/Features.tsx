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
import { useTranslations } from "next-intl";
import Image from "next/image";

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
      className="h-120 aspect-auto md:h-96 w-full"
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
      <div className="mx-auto grid max-w-7xl border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 bg-white md:grid-cols-2">
        {/* COLUMN 1: AIoT & HARDWARE (protectQube) */}
        <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div className="p-6 sm:p-12">
            <span className="text-slate-500 font-semibold flex items-center gap-2 text-sm bg-slate-50 border border-slate-100 w-max px-3 py-1.5 rounded-full">
              <Cpu className="size-4 text-primary-600" />
              {t("aiotBadge")}
            </span>

            <div className="mt-6">
              <Image
                src="/images/logo-protectcube.png"
                alt="MIB Logo"
                width={150}
                height={75}
                className="object-contain"
              />
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
            className="relative border-t border-slate-100 pt-6 bg-slate-50/50 overflow-hidden"
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
        </div>

        {/* COLUMN 2: SERVICES (Managed Services) */}
        <div className="overflow-hidden border-t bg-slate-50/40 p-6 sm:p-12 md:border-0 md:border-l border-slate-200 dark:bg-transparent flex flex-col justify-between">
          <div className="relative z-10">
            <span className="text-slate-500 font-semibold flex items-center gap-2 text-sm bg-slate-50 border border-slate-100 w-max px-3 py-1.5 rounded-full mb-4">
              <Server className="size-4 text-primary-600" />
              {t("servicesBadge")}
            </span>

            <h3 className="text-xl font-bold text-slate-800">
              {t("servicesHeader")}
            </h3>
            <p className="my-4 text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              {t("servicesTitle")}
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {t("servicesDesc")}
            </p>
          </div>

          <div
            aria-hidden
            className="flex flex-col gap-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="flex justify-center items-center size-5 rounded-full border border-slate-200">
                  <span className="size-2 rounded-full bg-primary-600 animate-pulse" />
                </span>
                <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase">
                  {t("clientDispatchBadge")}
                </span>
              </div>
              <div className="rounded-xl bg-slate-50 mt-2 w-[85%] border border-slate-100 p-3 text-xs text-slate-700 font-medium">
                {t("clientMessage")}
              </div>
            </div>

            <div>
              <div className="rounded-xl ml-auto w-[85%] bg-primary-600 p-3 text-xs text-white shadow-md shadow-red-500/10 font-medium">
                {t("engineerMessage")}
              </div>
              <span className="text-slate-400 block text-right text-[10px] font-semibold mt-1">
                {t("resolvedStatus")}
              </span>
            </div>
          </div>
        </div>

        {/* ROW 3: UPTIME BANNER */}
        <div className="col-span-full border-y border-slate-200 bg-slate-900 text-white p-12 text-center relative overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[#0f172a]" />
          <p className="text-center text-4xl font-bold tracking-tight text-white z-10 flex items-center gap-3 justify-center lg:text-7xl">
            99.99% <span className="text-primary-600">{t("slaTitle")}</span>
          </p>
          <p className="mt-2 text-slate-400 text-sm max-w-md mx-auto z-10 leading-relaxed">
            {t("slaDesc")}
          </p>
        </div>

        {/* ROW 4: SOFTWARE (QIFESS Chart) */}
        <div className="relative col-span-full">
          <div className="absolute z-10 max-w-xl px-6 pr-12 pt-6 md:px-12 md:pt-12 pointer-events-none">
            <span className="text-slate-500 font-semibold flex items-center gap-2 text-sm bg-slate-50 border border-slate-100 w-max px-3 py-1.5 rounded-full mb-4">
              <Code className="size-4 text-primary-600" />
              {t("softwareBadge")}
            </span>

            {/* <h3 className="text-2xl font-bold text-slate-850 flex items-center gap-2">
              {t("softwareHeader")}
              <span className="text-xs bg-slate-100 text-slate-500 font-normal px-2.5 py-0.5 rounded-md border border-slate-200">
                {t("softwareSub")}
              </span>
            </h3> */}
            <Image
              src="/images/logo-qifess.png"
              alt="MIB Logo"
              width={150}
              height={75}
              className="object-contain"
            />
            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-xl">
              {t("softwareDesc")}
            </p>
          </div>
          <div className="pt-56 md:pt-48">
            <MonitoringChart />
          </div>
        </div>
      </div>
    </section>
  );
}
