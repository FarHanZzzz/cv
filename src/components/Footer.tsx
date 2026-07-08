"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-glass-border py-12 relative bg-glass-bg/10 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left credential block */}
        <div className="text-center md:text-left">
          <p className="text-sm font-bold text-foreground">
            Farhan Sadeque
          </p>
          <p className="text-xs text-text-muted mt-1 font-medium">
            © {currentYear} All rights reserved.
          </p>
        </div>

        {/* Middle notice block */}
        <div className="text-center">
          <p className="text-xs text-text-muted font-semibold tracking-wider uppercase">
            Built with <span className="text-primary-blue hover:underline">Next.js</span>, <span className="text-accent-purple hover:underline">Tailwind CSS</span> & <span className="text-accent-purple hover:underline">Framer Motion</span>
          </p>
        </div>

        {/* Right back-to-top button block */}
        <div className="text-center md:text-right">
          <button
            onClick={scrollToTop}
            disabled={!showScrollTop}
            aria-label="Back to Top"
            className={`p-3 rounded-full border border-glass-border bg-glass-bg hover:bg-glass-border hover:text-primary-blue transition-all duration-300 transform interactive cursor-pointer ${
              showScrollTop
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
