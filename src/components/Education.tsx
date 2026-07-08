"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";
import portfolioData from "../data/portfolio.json";

export default function Education() {
  const educationItems = portfolioData.education;

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-glass-bg/10 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple mb-2">
            My Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Education
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary-blue to-accent-purple rounded-full mt-3" />
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-3xl mx-auto pl-8 md:pl-0">
          {/* Vertical Center Indicator Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 bg-gradient-to-b from-primary-blue via-accent-purple to-transparent pointer-events-none transform -translate-x-1/2" />

          {educationItems.map((item, index) => (
            <div key={item.institution} className="relative mb-12 flex flex-col md:flex-row items-start md:items-center">
              {/* Central Circle Badge Icon */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-background border-2 border-accent-purple flex items-center justify-center z-10 transform -translate-x-1/2">
                <GraduationCap className="w-4 h-4 text-accent-purple" />
              </div>

              {/* Timeline Card Wrapper */}
              <div className="w-full md:w-1/2 md:pr-12 md:text-right flex md:justify-end">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="gradient-border-card p-6 md:p-8 max-w-md w-full relative"
                >
                  {/* Floating badge for time period */}
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-purple/10 text-accent-purple mb-4 md:ml-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </span>

                  <h3 className="text-xl font-bold tracking-tight text-foreground mt-2">
                    {item.institution}
                  </h3>
                  
                  <p className="text-sm font-semibold text-primary-blue mt-1">
                    {item.degree} in {item.major}
                  </p>

                  <p className="text-sm text-text-muted mt-4 leading-relaxed font-medium md:text-right">
                    {item.details}
                  </p>

                  {/* Highlight courses/specialization */}
                  <div className="mt-6 flex flex-wrap gap-2 justify-start md:justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-glass-bg border border-glass-border rounded-md text-foreground">
                      Artificial Intelligence
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-glass-bg border border-glass-border rounded-md text-foreground">
                      Computer Vision
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-glass-bg border border-glass-border rounded-md text-foreground">
                      Software Engineering
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Empty placeholder on the opposite side to balance timeline */}
              <div className="hidden md:block w-1/2 md:pl-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
