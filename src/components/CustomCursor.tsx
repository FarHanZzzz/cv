"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable cursor on mobile or touch-capable screens
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      // Offset by 12px (half of 24px width/height) to center the cursor ring
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive") ||
        target.classList.contains("clickable");
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-primary-blue/80 pointer-events-none z-50 mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 2.0 : 1,
        borderColor: isHovered ? "var(--accent)" : "var(--primary)",
        backgroundColor: isHovered ? "rgba(124, 58, 237, 0.15)" : "rgba(124, 58, 237, 0)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    />
  );
}
