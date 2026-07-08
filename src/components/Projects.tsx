"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, Check } from "lucide-react";
import portfolioData from "../data/portfolio.json";

export default function Projects() {
  const projects = portfolioData.projects;
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Map project ID to its static image asset
  const getProjectImage = (id: string) => {
    switch (id) {
      case "pedi-growth":
        return "/pedi_growth.png";
      case "nirapotta":
        return "/nirapotta.png";
      case "agri-supply-chain":
        return "/agri_supply.png";
      case "dengue-early-warning":
        return "/dengue_warning.png";
      default:
        return "/pedi_growth.png";
    }
  };

  const toggleExpand = (id: string) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-glass-bg/10 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple mb-2">
            My Creations
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary-blue to-accent-purple rounded-full mt-3" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const isExpanded = expandedProject === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="gradient-border-card flex flex-col h-full hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image Container */}
                <div className="relative h-56 md:h-64 w-full overflow-hidden bg-zinc-950 border-b border-glass-border">
                  <img
                    src={getProjectImage(project.id)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
                  
                  {/* Quick Floating Subtitle */}
                  <span className="absolute bottom-4 left-6 px-3 py-1 bg-glass-bg/85 backdrop-blur-xs border border-glass-border text-xs font-semibold text-primary-blue rounded-full">
                    {project.subtitle}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-text-muted mt-3 leading-relaxed font-medium">
                    {project.description}
                  </p>

                  {/* Tech stack badge pills */}
                  <div className="flex flex-wrap gap-1.5 mt-6 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-glass-bg border border-glass-border text-foreground rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Key Features */}
                  <div className="mt-auto border-t border-glass-border/30 pt-4">
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-accent-purple hover:text-primary-blue transition-colors duration-150 cursor-pointer interactive"
                    >
                      <span>{isExpanded ? "Hide Details" : "Show Key Features"}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 space-y-2.5">
                            {project.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start space-x-2 text-xs text-text-muted font-medium">
                                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mt-0.5">
                                  <Check className="w-2.5 h-2.5" />
                                </span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-glass-border/30">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-4 border border-glass-border bg-glass-bg hover:bg-glass-border transition-all duration-200 rounded-lg text-xs font-bold text-foreground interactive cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                      <span>Code Repository</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-4 bg-primary-blue hover:bg-primary-blue/90 text-white transition-all duration-200 rounded-lg text-xs font-bold interactive cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
