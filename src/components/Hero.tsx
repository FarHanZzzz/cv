"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, FileDown, Eye, ChevronDown } from "lucide-react";
import portfolioData from "../data/portfolio.json";

export default function Hero() {
  const { name, title, subtitle, resumes } = portfolioData.personal;
  const [showResumeDropdown, setShowResumeDropdown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parallax background spheres tracking mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Close resume dropdown on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowResumeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsEl = document.getElementById("projects");
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 px-6"
    >
      {/* Background visual graphics - dynamic glowing spheres */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary-blue/10 blur-[80px] pointer-events-none z-0"
        animate={{
          x: mousePosition.x * -1.2,
          y: mousePosition.y * -1.2,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent-purple/10 blur-[80px] pointer-events-none z-0"
        animate={{
          x: mousePosition.x * 1.5,
          y: mousePosition.y * 1.5,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.8 }}
      />

      {/* Grid background mask overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0 opacity-[0.8]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none z-0" />

      {/* Content wrapper */}
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        {/* Futuristic top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-glass-border bg-glass-bg backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Open for Opportunities
          </span>
        </motion.div>

        {/* Hero Name Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 select-none bg-gradient-to-b from-foreground via-foreground to-text-muted bg-clip-text text-transparent"
        >
          {name}
        </motion.h1>

        {/* Title Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl font-bold tracking-tight text-primary-blue mb-6"
        >
          {title}
        </motion.h2>

        {/* Summary Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto mb-10 font-medium"
        >
          {subtitle}
        </motion.p>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-25"
        >
          {/* View Projects Button */}
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 bg-gradient-to-r from-primary-blue to-accent-purple text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-350 transform hover:-translate-y-0.5 interactive cursor-pointer"
          >
            <Eye className="w-5 h-5" />
            <span>View Projects</span>
          </a>

          {/* Download Resume Dropdown Trigger */}
          <div ref={dropdownRef} className="relative w-full sm:w-auto">
            <button
              onClick={() => setShowResumeDropdown(!showResumeDropdown)}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 border border-glass-border bg-glass-bg backdrop-blur-md text-foreground font-semibold rounded-xl hover:bg-glass-border transition-all duration-250 interactive cursor-pointer"
            >
              <FileDown className="w-5 h-5 text-accent-purple" />
              <span>Download Resume</span>
              <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-250 ${showResumeDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Options */}
            <AnimatePresence>
              {showResumeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 left-0 sm:left-auto sm:w-56 mt-2 origin-top-right rounded-xl border border-glass-border bg-glass-bg backdrop-blur-lg shadow-xl py-2 z-30"
                >
                  <a
                    href={resumes.pdf}
                    download
                    onClick={() => setShowResumeDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-glass-border transition-colors duration-150 interactive cursor-pointer"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-500">
                      PDF
                    </span>
                    <div className="text-left">
                      <p className="font-semibold text-xs">PDF Document</p>
                      <p className="text-[10px] text-text-muted">Recruiter-ready</p>
                    </div>
                  </a>
                  <a
                    href={resumes.docx}
                    download
                    onClick={() => setShowResumeDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm border-t border-glass-border/30 text-foreground hover:bg-glass-border transition-colors duration-150 interactive cursor-pointer"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 font-bold text-xs">
                      DOCX
                    </span>
                    <div className="text-left">
                      <p className="font-semibold text-xs">Word Document</p>
                      <p className="text-[10px] text-text-muted">ATS-optimized</p>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center opacity-40"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted mb-2">
            Scroll down
          </span>
          <ArrowDown className="w-4 h-4 text-text-muted" />
        </motion.div>
      </div>
    </section>
  );
}
