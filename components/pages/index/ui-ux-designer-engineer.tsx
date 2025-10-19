"use client";

import { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import { Separator } from "@/components/ui/separator";

export function UiUxDesignerEngineer() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Horizontal parallax: moves right to left as section enters viewport
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="flex items-center overflow-hidden px-6 py-6 md:px-8 md:py-8 lg:px-12 lg:py-12"
    >
      <motion.div className="flex items-center gap-12" style={{ x }}>
        <h2
          className="text-background text-[clamp(12rem,35vw,28rem)] leading-none font-bold tracking-tighter whitespace-nowrap"
          style={{ textShadow: "0px 0px 2px var(--muted-foreground)" }}
        >
          UI/UX Designer Engineer
        </h2>
        <Separator
          className="h-[clamp(12rem,35vw,28rem)]"
          orientation="vertical"
        />
        <h2
          className="text-background text-[clamp(12rem,35vw,28rem)] leading-none font-bold tracking-tighter whitespace-nowrap"
          style={{ textShadow: "0px 0px 2px var(--muted-foreground)" }}
        >
          UI/UX Designer Engineer
        </h2>
        <Separator
          className="h-[clamp(12rem,35vw,28rem)]"
          orientation="vertical"
        />
        <h2
          className="text-background text-[clamp(12rem,35vw,28rem)] leading-none font-bold tracking-tighter whitespace-nowrap"
          style={{ textShadow: "0px 0px 2px var(--muted-foreground)" }}
        >
          UI/UX Designer Engineer
        </h2>
      </motion.div>
    </section>
  );
}
