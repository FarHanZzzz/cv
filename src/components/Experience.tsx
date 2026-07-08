"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckSquare } from "lucide-react";
import portfolioData from "../data/portfolio.json";

export default function Experience() {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Light background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-primary-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple mb-2">
            My Roles
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Leadership & Experience
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary-blue to-accent-purple rounded-full mt-3" />
        </div>

        {/* Experience Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gradient-border-card p-6 md:p-8 flex flex-col hover:shadow-lg transition-all duration-300"
            >
              {/* Header block */}
              <div className="flex items-start justify-between flex-wrap gap-4 border-b border-glass-border/30 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary-blue" />
                    <span>{exp.role}</span>
                  </h3>
                  <p className="text-sm font-semibold text-accent-purple mt-1">
                    {exp.company}
                  </p>
                </div>
                
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-glass-bg border border-glass-border text-text-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.duration}</span>
                </span>
              </div>

              {/* Responsibilities list */}
              <ul className="space-y-3.5 flex-grow">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-text-muted leading-relaxed font-medium">
                    <span className="flex-shrink-0 w-5 h-5 rounded bg-primary-blue/10 text-primary-blue flex items-center justify-center mt-0.5">
                      <CheckSquare className="w-3 h-3" />
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
