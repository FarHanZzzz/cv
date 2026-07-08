"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Handle background opacity on scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll spy using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Detect when section is in the middle of the viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetEl = document.getElementById(href.replace("#", ""));
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 theme-transition ${
        scrolled
          ? "bg-glass-bg/80 backdrop-blur-md border-b border-glass-border py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#about"
          onClick={(e) => handleLinkClick(e, "#about")}
          className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent interactive"
        >
          FS.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`text-sm font-medium relative py-1 transition-colors duration-250 interactive hover:text-primary-blue ${
                  isActive ? "text-primary-blue" : "text-text-muted"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue to-accent-purple rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full border border-glass-border bg-glass-bg hover:bg-glass-border transition-all duration-200 interactive text-foreground cursor-pointer"
          >
            {theme === "light" ? (
              <Moon className="w-4.5 h-4.5 text-accent-purple" />
            ) : (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden p-2 rounded-full border border-glass-border bg-glass-bg text-foreground hover:bg-glass-border transition-all duration-200 interactive cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-glass-bg border-b border-glass-border backdrop-blur-lg w-full absolute top-full left-0 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`text-base font-semibold py-2 transition-colors interactive ${
                      isActive ? "text-primary-blue" : "text-text-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
