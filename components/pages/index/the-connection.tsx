"use client";

import { useRef, useState } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import { ContactForm, EmailPreview } from "@/components/pages/index";
import type { ContactFormData } from "@/components/pages/index/contact-form";
import { useViewport } from "@/components/providers/viewport-provider";

export function TheConnection() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useViewport();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: null,
    selectedDate: null,
    selectedTime: null,
    message: "",
  });

  const handleFormDataChange = (data: Partial<ContactFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Desktop: entrance based on section reaching top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Mobile: entrance starts later (when section is 70% visible)
  const { scrollYProgress: mobileEntranceProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.3"],
  });

  // Use mobile progress on mobile, desktop progress otherwise
  const entranceProgress = isMobile ? mobileEntranceProgress : scrollYProgress;

  // Scroll animations - complete when section reaches top
  // Preview slides in 100% from the right (desktop only)
  const rightOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);

  // Staggered entrance for left column elements with exponential Y parallax
  // Header - first to appear, smaller Y offset
  const headerOpacity = useTransform(entranceProgress, [0.3, 0.7], [0, 1]);
  const headerY = useTransform(entranceProgress, [0.3, 0.7], [60, 0]);

  // Form - appears slightly later, larger Y offset (exponential feel)
  const formOpacity = useTransform(entranceProgress, [0.4, 0.8], [0, 1]);
  const formY = useTransform(entranceProgress, [0.4, 0.8], [150, 0]);

  // Mobile-only: Email preview slides up and fades in (based on its own scroll position)
  const { scrollYProgress: previewProgress } = useScroll({
    target: previewRef,
    offset: ["start end", "start 0.7"],
  });
  const previewOpacity = useTransform(previewProgress, [0, 1], [0, 1]);
  const previewY = useTransform(previewProgress, [0, 1], [80, 0]);

  // Mobile-only: Footer slides up and fades in (based on its own scroll position)
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start 0.95"],
  });
  const footerOpacity = useTransform(footerProgress, [0, 0.5], [0, 1]);
  const footerY = useTransform(footerProgress, [0, 0.5], [40, 0]);

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <div className="relative md:grid md:grid-cols-[2fr_1fr] lg:grid-cols-[4fr_3fr]">
        {/* Left column - Form */}
        <div className="border-border flex flex-col gap-6 p-6 md:justify-center md:border-r-0 md:p-8">
          {/* Header */}
          <motion.h3
            className="text-[clamp(4rem,7vw,8rem)] leading-12 font-bold tracking-tight lg:leading-24"
            style={{
              opacity: headerOpacity,
              y: headerY,
            }}
          >
            The Conversation
          </motion.h3>

          <motion.div
            style={{
              opacity: formOpacity,
              y: formY,
            }}
          >
            <ContactForm
              formData={formData}
              isMobile={isMobile}
              scrollYProgress={scrollYProgress}
              onFormDataChange={handleFormDataChange}
            />
          </motion.div>
        </div>

        {/* Right column - Live message preview */}
        <motion.div
          ref={previewRef}
          className="flex border-t border-l md:border-t-0"
          style={{
            opacity: isMobile ? previewOpacity : rightOpacity,
            x: isMobile ? undefined : rightX,
            y: isMobile ? previewY : undefined,
          }}
        >
          <EmailPreview formData={formData} />
        </motion.div>
      </div>

      {/* Full-width footer */}
      <motion.div
        ref={footerRef}
        className="border-border grid border-t md:grid-cols-[2fr_1fr] lg:grid-cols-[4fr_3fr]"
        style={{
          opacity: isMobile ? footerOpacity : undefined,
          y: isMobile ? footerY : undefined,
        }}
      >
        <div className="col-start-2 flex items-center justify-center px-8 py-4">
          <p className="text-foreground/40 text-center text-xs">
            I&apos;ll respond within 24 hours. For urgent inquiries, reach out
            directly at{" "}
            <a
              className="text-foreground/60 hover:text-foreground underline"
              href="mailto:hello@drucial.com"
            >
              hello@drucial.com
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
