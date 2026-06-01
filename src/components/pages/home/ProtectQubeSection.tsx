"use client";

import React, { useState } from "react";
import { 
  Eye, 
  Zap, 
  Video, 
  Lock, 
  Play 
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProtectQubeSection() {
  const tProtect = useTranslations("protectQube");
  const [activeProtectTab, setActiveProtectTab] = useState<string>("atm");

  return (
    <section className="py-16 md:py-24 bg-primary-600 text-white relative overflow-hidden flex flex-col justify-center">
      <div className="mx-auto max-w-7xl w-full space-y-8 px-6">
        
        {/* Header Block perfectly centered to match image reference */}
        <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-4xl mx-auto mb-10">
          <div className="flex items-center gap-2 select-none">
            <span className="w-2.5 h-2.5 bg-white rounded-[2px] shadow-sm" />
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest font-mono drop-shadow-sm">
              {tProtect("badge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-center drop-shadow-sm">
            {tProtect("title")}
          </h2>
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl text-center font-medium">
            {tProtect("subtitle")}
          </p>
        </div>

        {/* Interactive AIoT Feature Selector Tabs - Match image layout (text + underline) */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pb-8">
          {[
            { key: "atm", icon: <Eye className="size-4" />, image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
            { key: "alert", icon: <Zap className="size-4" />, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
            { key: "video", icon: <Video className="size-4" />, image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
            { key: "access", icon: <Lock className="size-4" />, image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
          ].map((tab) => {
            const isActive = activeProtectTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveProtectTab(tab.key)}
                className={`flex items-center gap-2 pb-2 text-sm font-bold transition-all relative ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {tab.icon}
                {tProtect(`features.${tab.key}.title`)}
                {isActive && (
                  <span className="absolute bottom-[-2px] left-0 right-0 h-[2.5px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Central AIoT CCTV & Video Mockup player - Dynamic based on activeProtectTab */}
        <div className="relative w-full">
          <div className="aspect-2/1 w-full relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            
            {/* CCTV Feed Background Image (Dynamic based on selected tab) */}
            {[
              { key: "atm", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
              { key: "alert", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
              { key: "video", image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
              { key: "access", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
            ].map((tab) => {
              const isSelected = activeProtectTab === tab.key;
              return (
                <img 
                  key={tab.key}
                  src={tab.image} 
                  alt={tProtect(`features.${tab.key}.title`)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isSelected ? "opacity-40 z-0" : "opacity-0 pointer-events-none"
                  }`}
                />
              );
            })}
            
            {/* Scanlines and digital camera effects overlay */}
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,240,255,0.06),rgba(0,255,0,0.02),rgba(255,0,0,0.06))] [background-size:100%_4px,6px_100%] pointer-events-none z-10 opacity-70"></div>
            
            {/* Camera overlays */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 z-10 text-white font-mono pointer-events-none">
              
              {/* TOP ROW: Diagnostics and Live Rec Status */}
              <div className="flex items-start justify-between text-[10px] sm:text-xs tracking-wider">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2.5 bg-red-600"></span>
                  </span>
                  <span className="font-bold text-red-500">REC [LIVE]</span>
                  <span className="text-white/30 hidden sm:inline">|</span>
                  <span className="text-white/80 hidden sm:inline">{tProtect("videoOverlay.liveFeed")}</span>
                </div>
                
                {/* Real-time Computer Vision Diagnostics Panel */}
                <div className="bg-slate-950/80 border border-white/10 px-3 py-1.5 rounded-lg text-[9px] text-cyan-400 space-y-0.5 tracking-normal backdrop-blur-xs">
                  <div>MODEL: <span className="text-white font-bold">MIB-CV-EDGE-V4</span></div>
                  {activeProtectTab === "atm" && <div>INF_TIME: <span className="text-white font-bold">3.8ms // 99.4%</span></div>}
                  {activeProtectTab === "alert" && <div>BIOMETRIC: <span className="text-white font-bold">CORE ON // 99.8%</span></div>}
                  {activeProtectTab === "video" && <div>DENSITY: <span className="text-white font-bold">FLOW_OK // 8.4%</span></div>}
                  {activeProtectTab === "access" && <div>FENCE: <span className="text-white font-bold">CRITICAL // 0.1s</span></div>}
                </div>
              </div>

              {/* CENTRAL COMPUTER VISION SCANNER SIMULATION - DYNAMIC OVERLAYS */}
              <div className="absolute inset-0 m-auto w-[90%] h-[70%] pointer-events-none">
                
                {/* 1. Computer Vision Bounding Boxes (atm) */}
                {activeProtectTab === "atm" && (
                  <div className="absolute inset-0">
                    {/* Bounding box 1 */}
                    <div className="absolute top-[15%] left-[20%] w-[100px] h-[100px] border border-cyan-400/40 rounded-sm animate-pulse">
                      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></span>
                      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></span>
                      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></span>
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></span>
                      <div className="absolute top-[-18px] left-0 bg-cyan-500 text-slate-950 font-bold px-1 py-0.5 rounded text-[7px] tracking-wide uppercase">
                        PERSON #01 (98%)
                      </div>
                    </div>
                    
                    {/* Bounding box 2 */}
                    <div className="absolute bottom-[20%] right-[30%] w-[120px] h-[80px] border border-emerald-400/40 rounded-sm">
                      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400"></span>
                      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400"></span>
                      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400"></span>
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400"></span>
                      <div className="absolute top-[-18px] left-0 bg-emerald-500 text-slate-950 font-bold px-1 py-0.5 rounded text-[7px] tracking-wide uppercase">
                        ATM_TERMINAL_04
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Biometric Facial Recognition target (alert) */}
                {activeProtectTab === "alert" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[140px] h-[140px] border border-cyan-400/60 rounded-full flex items-center justify-center animate-spin duration-3000">
                      <span className="absolute inset-2 border border-dashed border-cyan-500/30 rounded-full"></span>
                      <span className="absolute top-0 w-2 h-2 bg-cyan-400 rounded-full"></span>
                    </div>
                    
                    <div className="absolute top-[25%] left-[40%] w-[120px] h-[120px] border border-cyan-400 rounded-sm">
                      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></span>
                      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></span>
                      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></span>
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></span>
                      <div className="absolute top-[-20px] left-0 bg-cyan-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[8px] tracking-wide whitespace-nowrap uppercase">
                        {tProtect("videoOverlay.facialActive")}
                      </div>
                      <div className="absolute bottom-[-18px] left-0 text-[8px] text-cyan-400 font-semibold bg-slate-950/80 px-1 py-0.5 rounded border border-cyan-500/20 whitespace-nowrap">
                        ID: VERIFIED // STAFF_9210
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. People Flow & Counting density (video) */}
                {activeProtectTab === "video" && (
                  <div className="absolute inset-0">
                    {/* Flow boundary indicator */}
                    <div className="absolute left-[30%] top-0 h-full w-[1px] border-l border-dashed border-emerald-400/50"></div>
                    
                    {/* Counting Panel Overlay */}
                    <div className="absolute bottom-[10%] right-[10%] bg-emerald-950/85 border border-emerald-400/40 p-2.5 rounded-lg space-y-1 text-[9px] text-emerald-400 w-[170px] backdrop-blur-xs">
                      <div className="flex items-center justify-between font-bold border-b border-emerald-500/20 pb-1">
                        <span>PEOPLE COUNTING</span>
                        <span className="text-white text-xs">04</span>
                      </div>
                      <div className="flex items-center justify-between text-[8px]">
                        <span>ZONE STATUS:</span>
                        <span className="text-white font-semibold">SECURE // NORMAL FLOW</span>
                      </div>
                      <div className="h-1 bg-emerald-900 rounded-full overflow-hidden">
                        <div className="h-full w-[35%] bg-emerald-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Virtual Line Crossing Alert (access) */}
                {activeProtectTab === "access" && (
                  <div className="absolute inset-0">
                    {/* Flashing Red Boundary Line */}
                    <div className="absolute left-[45%] top-0 h-full w-[3px] bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] flex items-center justify-center animate-pulse">
                      <div className="absolute rotate-90 origin-center bg-red-600 text-white font-bold text-[8px] tracking-wider px-2 py-0.5 rounded-full border border-red-400/30 whitespace-nowrap">
                        {tProtect("videoOverlay.skimmerDetected")}
                      </div>
                    </div>
                    
                    {/* Bounding box targeting intruder */}
                    <div className="absolute top-[20%] left-[55%] w-[110px] h-[110px] border border-red-500 rounded-sm animate-pulse">
                      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500 animate-ping"></span>
                      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500"></span>
                      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500"></span>
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500"></span>
                      <div className="absolute top-[-18px] left-0 bg-red-600 text-white font-bold px-1.5 py-0.5 rounded text-[8px] tracking-wide whitespace-nowrap uppercase">
                        BREACH IDENTIFIED
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* BOTTOM ROW: Hardware/CV Metadata */}
              <div className="flex items-end justify-between text-[10px] text-slate-400 tracking-wider">
                <div>1080P EDGE AI // RTSP SURVEILLANCE FEED</div>
                <div>FPS: 60 // LOSS: 0.00%</div>
              </div>
            </div>

            {/* Glassmorphic Play button (Center overlay for the video) */}
            <div className="absolute inset-0 m-auto size-fit z-20 flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105">
              <span className="flex size-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white shadow-2xl backdrop-blur-md cursor-pointer pointer-events-auto">
                <Play className="size-6 fill-white ml-1 text-white" />
              </span>
              <span className="text-[10px] font-bold font-mono tracking-widest text-white/95 uppercase bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-xs">
                {tProtect("videoOverlay.playDemo")}
              </span>
            </div>

            {/* Gradient Blend */}
            <div className="bg-gradient-to-t z-10 from-slate-950 absolute inset-x-0 bottom-0 h-16 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Active Feature Detailed Explanation & Carousel Indicator (Exact Mockup Layout!) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-6">
          <p className="text-white/95 text-lg md:text-xl font-medium leading-relaxed max-w-4xl transition-all duration-300">
            {tProtect(`features.${activeProtectTab}.desc`)}
          </p>
          
          {/* Carousel indicator dots representing the 4 tabs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {[
              { key: "atm" },
              { key: "alert" },
              { key: "video" },
              { key: "access" }
            ].map((tab) => {
              const isActive = activeProtectTab === tab.key;
              return (
               <button
                  key={tab.key}
                  onClick={() => setActiveProtectTab(tab.key)}
                  className={`size-2.5 rounded-full transition-all duration-350 border border-white/40 ${
                    isActive ? "bg-white scale-120 w-6 shadow-[0_0_8px_rgba(255,255,255,0.6)]" : "bg-transparent hover:bg-white/30"
                  }`}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
