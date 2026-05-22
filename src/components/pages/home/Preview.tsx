"use client";

import React from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon } from "@hugeicons/core-free-icons";
import { useTranslations } from "next-intl";

export default function Preview() {
  const tPreview = useTranslations("preview");

  return (
    <section id="preview" className="bg-primary py-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
        <div className="text-center flex flex-col gap-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
            {tPreview("title")}
          </h2>
          <p className="text-lg text-white/90">
            {tPreview("subtitle")}
          </p>
        </div>

        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-black/20">
          <Image 
            src="/images/preview_video_bg.png"
            alt="Video Thumbnail"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-black/20 backdrop-blur-md border border-white/30 group-hover:bg-black/40 group-hover:scale-110 transition-all duration-300">
              <HugeiconsIcon icon={PlayIcon} className="w-10 h-10 md:w-14 md:h-14 text-white ml-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
