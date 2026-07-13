"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Outer ring: smooth spring lag
  const ringX = useSpring(rawX, { stiffness: 140, damping: 18, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 140, damping: 18, mass: 0.6 });

  // Inner dot: almost instant
  const dotX = useSpring(rawX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 40 });

  useEffect(() => {
    // Detect touch devices — hide custom cursor on mobile
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnterInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      }
    };

    const onLeaveInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("a") &&
        !target.closest("button") &&
        !target.closest("[role='button']") &&
        !target.closest(".cursor-pointer")
      ) {
        setIsHovering(false);
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnterInteractive);
    window.addEventListener("mouseout", onLeaveInteractive);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnterInteractive);
      window.removeEventListener("mouseout", onLeaveInteractive);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isVisible, rawX, rawY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide the native OS cursor via CSS */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Outer hollow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 border-[#f22929]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 52 : 32,
          height: isHovering ? 52 : 32,
          backgroundColor: isHovering ? "rgba(242, 41, 41, 0.12)" : "transparent",
          transition: "width 0.25s ease, height 0.25s ease, background-color 0.25s ease, opacity 0.2s ease",
        }}
      />

      {/* Inner solid dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#f22929]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
          width: 7,
          height: 7,
          transition: "opacity 0.15s ease",
        }}
      />
    </>
  );
}
