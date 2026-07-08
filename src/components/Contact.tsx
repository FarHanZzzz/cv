"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, FileDown, CheckCircle, Mail } from "lucide-react";
import portfolioData from "../data/portfolio.json";

export default function Contact() {
  const { resumes, socials } = portfolioData.personal;
  
  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Mock API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Auto reset success message after 4 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Contact Me
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary-blue to-accent-purple rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Let's discuss a <span className="text-primary-blue">project</span> or <span className="text-accent-purple">collaboration</span>.
              </h3>
              <p className="text-base text-text-muted leading-relaxed font-medium">
                Feel free to reach out using the contact form, email, or through my social media profiles. I am always open to exploring software engineering internships, technical leadership roles, debate events, or co-founding software ventures.
              </p>
              
              <div className="pt-4 flex flex-col space-y-3">
                <p className="text-sm font-semibold text-text-muted flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-blue" />
                  <a href={socials.email} className="hover:text-primary-blue transition-colors duration-150 interactive cursor-pointer">
                    farhan.sadeque@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Resume Download Block */}
            <div className="mt-12 lg:mt-0 p-6 gradient-border-card bg-glass-bg/60 backdrop-blur-xs">
              <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileDown className="w-4.5 h-4.5 text-accent-purple" />
                <span>Resume Direct Links</span>
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={resumes.pdf}
                  download
                  className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-red-500/10 border border-red-500/35 hover:bg-red-500/20 text-red-500 rounded-lg text-xs font-bold transition-all duration-200 interactive cursor-pointer"
                >
                  <span>Download PDF</span>
                </a>
                <a
                  href={resumes.docx}
                  download
                  className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-500/10 border border-blue-500/35 hover:bg-blue-500/20 text-blue-500 rounded-lg text-xs font-bold transition-all duration-200 interactive cursor-pointer"
                >
                  <span>Download DOCX</span>
                </a>
              </div>
            </div>

            {/* Social Icons Strip */}
            <div className="mt-8 flex items-center space-x-4">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-full border border-glass-border bg-glass-bg flex items-center justify-center hover:text-primary-blue hover:border-primary-blue transition-all duration-200 interactive cursor-pointer text-foreground"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-full border border-glass-border bg-glass-bg flex items-center justify-center hover:text-primary-blue hover:border-primary-blue transition-all duration-200 interactive cursor-pointer text-foreground"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="w-10 h-10 rounded-full border border-glass-border bg-glass-bg flex items-center justify-center hover:text-primary-blue hover:border-primary-blue transition-all duration-200 interactive cursor-pointer text-foreground"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a
                href={socials.email}
                aria-label="Send Email"
                className="w-10 h-10 rounded-full border border-glass-border bg-glass-bg flex items-center justify-center hover:text-primary-blue hover:border-primary-blue transition-all duration-200 interactive cursor-pointer text-foreground"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Form Side Column */}
          <div className="lg:col-span-7">
            <div className="gradient-border-card p-6 md:p-8 relative">
              {/* Submission Feedback Banner */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-background/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center z-20 p-6 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-text-muted mt-2 max-w-sm">
                      Thank you for reaching out. Farhan will get back to you as soon as possible.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-glass-bg/40 text-foreground text-sm font-medium focus:outline-hidden focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 transition-all duration-200 ${
                        errors.name ? "border-red-500" : "border-glass-border"
                      }`}
                    />
                    {errors.name && <span className="text-[10px] font-bold text-red-500 mt-1">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-glass-bg/40 text-foreground text-sm font-medium focus:outline-hidden focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 transition-all duration-200 ${
                        errors.email ? "border-red-500" : "border-glass-border"
                      }`}
                    />
                    {errors.email && <span className="text-[10px] font-bold text-red-500 mt-1">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject field */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-glass-bg/40 text-foreground text-sm font-medium focus:outline-hidden focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 transition-all duration-200 ${
                      errors.subject ? "border-red-500" : "border-glass-border"
                    }`}
                  />
                  {errors.subject && <span className="text-[10px] font-bold text-red-500 mt-1">{errors.subject}</span>}
                </div>

                {/* Message field */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-glass-bg/40 text-foreground text-sm font-medium focus:outline-hidden focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 transition-all duration-200 ${
                      errors.message ? "border-red-500" : "border-glass-border"
                    }`}
                  />
                  {errors.message && <span className="text-[10px] font-bold text-red-500 mt-1">{errors.message}</span>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-gradient-to-r from-primary-blue to-accent-purple text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-250 disabled:opacity-50 interactive cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
