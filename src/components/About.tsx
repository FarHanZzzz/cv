"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Code2, Heart, GraduationCap } from "lucide-react";
import portfolioData from "../data/portfolio.json";

function CountUp({ value, suffix }: { value: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const target = parseInt(value, 10);

  useEffect(() => {
    if (!isInView || isNaN(target)) return;

    let startTime: number;
    const duration = 1500; // 1.5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const { name, bio, stats } = portfolioData.personal;

  // Map icons to stats cards based on index
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-5 h-5 text-primary-blue" />;
      case 1:
        return <Trophy className="w-5 h-5 text-accent-purple" />;
      case 2:
        return <GraduationCap className="w-5 h-5 text-amber-500" />;
      default:
        return <Heart className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple mb-2">
            Who I Am
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            About Me
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary-blue to-accent-purple rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Biography Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Hello! I'm <span className="text-primary-blue">{name}</span>
            </h3>
            <p className="text-base text-text-muted leading-relaxed font-medium">
              {bio}
            </p>
            <p className="text-base text-text-muted leading-relaxed font-medium">
              My drive comes from creating software that bridges complex technology with intuitive interfaces. I excel in collaborative environments, leading groups, and deploying full-stack systems. Whether I am writing high-performance APIs or designing interactive dashboards, I approach every project with detail, optimization, and scalable practices.
            </p>
          </motion.div>

          {/* Statistics Grid Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="gradient-border-card p-6 flex flex-col space-y-4 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-glass-bg border border-glass-border flex items-center justify-center">
                  {getIcon(index)}
                </div>
                <div className="flex flex-col">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <span className="text-xs font-semibold text-text-muted mt-1 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
