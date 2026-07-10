"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  // Count from 0 to 100
  useEffect(() => {
    let currentCount = 0;
    const interval = setInterval(() => {
      // Smooth loading increments
      const increment = currentCount > 82 ? 1 : Math.floor(Math.random() * 4) + 2;
      currentCount = Math.min(currentCount + increment, 100);
      setCount(currentCount);

      if (currentCount >= 100) {
        clearInterval(interval);
        // Delay slightly for premium reveal feel before slide-up
        setTimeout(() => {
          setShowPreloader(false);
        }, 1100); // Increased slightly to let the full typing and color animation finish showing
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Framer Motion variants for letter-by-letter typing and color transition
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04, // Typing speed per letter
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      color: "#ffffff",
      y: 5 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      color: ["#ffffff", "#ffffff", "#ef4444"], // Stays white during writing, then shifts to MIB brand red
      transition: { 
        duration: 0.9,
        ease: "easeOut"
      } 
    }
  };

  return (
    <AnimatePresence 
      onExitComplete={() => {
        onComplete();
      }}
    >
      {showPreloader && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { 
              duration: 1.0, 
              ease: [0.76, 0, 0.24, 1] // Slow cubic bezier exit slide-up
            } 
          }}
          className="fixed inset-0 w-full h-screen bg-[#030712] z-[9999] flex items-center justify-center select-none"
        >
          {/* Centered counter & branding */}
          <div className="flex flex-col items-center justify-center gap-2 text-center px-6">
            {/* Massive monospaced digital counter */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-8xl sm:text-[130px] md:text-[160px] font-black text-white leading-none font-display tracking-tighter"
            >
              {count}%
            </motion.div>

            {/* Premium character typing + color transition text */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center items-center mt-2 max-w-lg mx-auto"
            >
              {"MITRA INOVASI BISNIS".split("").map((char, index) => (
                <motion.span
                  key={`letter-${index}`}
                  variants={letterVariants}
                  className="font-display font-black text-xs sm:text-sm tracking-[0.25em] uppercase"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="text-white text-xs sm:text-sm md:text-base font-medium tracking-[0.3em] uppercase mt-3 opacity-80"
            >
              Partner in Innovation
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
