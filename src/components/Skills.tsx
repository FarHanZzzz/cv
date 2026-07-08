"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolio.json";

type SkillCategory = "all" | "languages" | "frontend" | "backend" | "database" | "aiMl" | "tools";

export default function Skills() {
  const skillsData = portfolioData.skills;
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  const categories: { label: string; key: SkillCategory }[] = [
    { label: "All Skills", key: "all" },
    { label: "Languages", key: "languages" },
    { label: "Frontend", key: "frontend" },
    { label: "Backend", key: "backend" },
    { label: "Databases", key: "database" },
    { label: "AI & Computer Vision", key: "aiMl" },
    { label: "Tools", key: "tools" }
  ];

  // Helper to get all skills for "all" or specific list
  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      const allSkills: { name: string; category: string }[] = [];
      const seen = new Set<string>();

      const addSkills = (list: string[], cat: string) => {
        list.forEach((s) => {
          if (!seen.has(s)) {
            seen.add(s);
            allSkills.push({ name: s, category: cat });
          } else {
            const existing = allSkills.find((item) => item.name === s);
            if (existing && !existing.category.includes(cat)) {
              existing.category = `${existing.category} & ${cat}`;
            }
          }
        });
      };

      addSkills(skillsData.languages, "Languages");
      addSkills(skillsData.frontend, "Frontend");
      addSkills(skillsData.backend, "Backend");
      addSkills(skillsData.database, "Databases");
      addSkills(skillsData.aiMl, "AI & ML");
      addSkills(skillsData.tools, "Tools");

      return allSkills;
    }
    
    const categoryLabels: Record<SkillCategory, string> = {
      all: "All",
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      database: "Databases",
      aiMl: "AI & ML",
      tools: "Tools"
    };

    return skillsData[activeCategory].map((s) => ({
      name: s,
      category: categoryLabels[activeCategory]
    }));
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Glow background highlight */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple mb-2">
            My Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Skills & Technologies
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary-blue to-accent-purple rounded-full mt-3" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-glass-border">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer relative interactive ${
                  isSelected ? "text-white" : "text-text-muted hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                {isSelected && (
                  <motion.span
                    layoutId="activeSkillTabIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-primary-blue to-accent-purple rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Skill Pills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-h-[250px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                key={skill.name}
                className="gradient-border-card p-4 flex flex-col items-center justify-center text-center hover:scale-[1.03] transition-transform duration-200 select-none group"
              >
                <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary-blue transition-colors duration-150">
                  {skill.name}
                </span>
                <span className="text-[9px] font-semibold text-text-muted uppercase tracking-widest mt-1.5 bg-glass-bg px-2 py-0.5 rounded border border-glass-border/40">
                  {skill.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
