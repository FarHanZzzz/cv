"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Sparkles, Medal, Award, GraduationCap, Rocket, Code2 } from "lucide-react";
import portfolioData from "../data/portfolio.json";

export default function Achievements() {
  const achievements = portfolioData.achievements;

  // Custom icon mapper with more variety
  const getIcon = (index: number) => {
    const icons = [
      <Trophy key="trophy" className="w-6 h-6 text-amber-500" />,
      <Sparkles key="sparkles" className="w-6 h-6 text-sky-400" />,
      <Medal key="medal" className="w-6 h-6 text-rose-500" />,
      <Rocket key="rocket" className="w-6 h-6 text-accent-purple" />,
      <Award key="award" className="w-6 h-6 text-emerald-500" />,
      <GraduationCap key="grad" className="w-6 h-6 text-orange-500" />,
      <Star key="star" className="w-6 h-6 text-primary-blue" />,
      <Code2 key="code" className="w-6 h-6 text-teal-400" />,
    ];
    return icons[index % icons.length];
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-glass-bg/10 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple mb-2">
            My Landmarks
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Key Achievements
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary-blue to-accent-purple rounded-full mt-3" />
        </div>

        {/* Achievements Cards Grid — 2-col on md, 3-col on lg, 4-col on xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="gradient-border-card p-6 flex flex-col h-full hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Highlight Icon Circle */}
              <div className="w-12 h-12 rounded-2xl bg-glass-bg border border-glass-border flex items-center justify-center mb-6">
                {getIcon(index)}
              </div>

              {/* Text content */}
              <h3 className="text-base font-bold tracking-tight text-foreground line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-xs font-semibold text-primary-blue mt-1 bg-glass-bg border border-glass-border/30 px-2 py-0.5 rounded w-max max-w-full truncate">
                {item.subtitle}
              </p>

              <p className="text-xs text-text-muted mt-4 leading-relaxed font-medium flex-grow">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
