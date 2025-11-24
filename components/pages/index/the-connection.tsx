"use client";

import { useRef, useState } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { ContactForm, EmailPreview } from "@/components/pages/index";
import type { ContactFormData } from "@/components/pages/index/contact-form";
import { useViewport } from "@/components/providers/viewport-provider";

export function TheConnection() {
  const { viewportHeight } = useViewport();
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
    offset: ["start end", "end start"],
  });

  // Scroll animations
  const rightOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0.2, 0.35], [100, 0]);
  const formOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.25, 0.4], [60, 0]);

  return (
    <section
      ref={sectionRef}
      className="overflow-x-hidden"
      style={{ minHeight: viewportHeight - SMALL_HEADER_HEIGHT }}
    >
      <div className="relative md:grid md:grid-cols-[2fr_1fr]">
        {/* Left column - Form */}
        <motion.div
          className="flex flex-col justify-center gap-6 p-6 md:p-8 lg:p-12"
          style={{ opacity: formOpacity, y: formY }}
        >
          {/* Header */}
          <h3 className="text-[clamp(4rem,8vw,8rem)] leading-12 font-bold tracking-tight md:leading-none">
            The Conversation
          </h3>

          <ContactForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
        </motion.div>

        {/* Right column - Live message preview */}
        <motion.div
          style={{ opacity: rightOpacity, x: rightX }}
        >
          <EmailPreview formData={formData} />
        </motion.div>
      </div>

      {/* Full-width footer */}
      <div className="border-border brid-cols-[2fr 1fr] grid border-t">
        <div className="col-start-2 flex items-center justify-center px-8 py-4">
          <p className="text-foreground/40 text-xs">
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
