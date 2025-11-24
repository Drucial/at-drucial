"use client";

import { useRef, useState, useEffect } from "react";

import { motion, useScroll, useTransform, useMotionValue } from "motion/react";

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
    offset: ["start end", "start start"],
  });

  // Scroll animations - complete when section reaches top
  // Preview slides in 100% from the right
  const rightOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);

  // Form slides up more dramatically on desktop, from left on mobile
  const formOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const formY = useTransform(scrollYProgress, [0, 0.5], [150, 0]);
  const formX = useTransform(scrollYProgress, [0, 0.5], ["-100%", "0%"]);

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-x-hidden"
      // style={{ minHeight: viewportHeight - SMALL_HEADER_HEIGHT }}
    >
      <div className="relative md:grid md:grid-cols-[2fr_1fr] lg:grid-cols-[4fr_3fr]">
        {/* Left column - Form */}
        <motion.div
          className="border-border flex flex-col justify-center gap-6 border-r p-6 md:border-r-0 md:p-8 lg:p-12"
          style={{
            opacity: formOpacity,
            y: isMobile ? 0 : formY,
            x: isMobile ? formX : 0,
          }}
        >
          {/* Header */}
          <h3 className="text-[clamp(4rem,7vw,8rem)] leading-12 font-bold tracking-tight lg:leading-24">
            The Conversation
          </h3>

          <ContactForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
        </motion.div>

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
