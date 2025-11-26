"use client";

import { useRef, useState } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import { ContactForm, EmailPreview } from "@/components/pages/index";
import type { ContactFormData } from "@/components/pages/index/contact-form";

export function TheConnection() {
  const sectionRef = useRef<HTMLElement>(null);

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Scroll animations - complete when section reaches top
  // Preview slides in 100% from the right
  const rightOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);

  // Staggered entrance for left column elements with exponential Y parallax
  // Header - first to appear, smaller Y offset
  const headerOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);

  // Form - appears slightly later, larger Y offset (exponential feel)
  const formOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.1, 0.5], [150, 0]);

  return (
    <section ref={sectionRef} className="overflow-x-hidden">
      <div className="relative md:grid md:grid-cols-[2fr_1fr] lg:grid-cols-[4fr_3fr]">
        {/* Left column - Form */}
        <div className="border-border flex flex-col justify-center gap-6 border-r p-6 md:border-r-0 md:p-8">
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
              scrollYProgress={scrollYProgress}
              onFormDataChange={handleFormDataChange}
            />
          </motion.div>
        </div>

        {/* Right column - Live message preview */}
        <motion.div
          className="flex border-t border-l md:border-t-0"
          style={{ opacity: rightOpacity, x: rightX }}
        >
          <EmailPreview formData={formData} />
        </motion.div>
      </div>

      {/* Full-width footer */}
      <div className="border-border grid border-t md:grid-cols-[2fr_1fr] lg:grid-cols-[4fr_3fr]">
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
      </div>
    </section>
  );
}
