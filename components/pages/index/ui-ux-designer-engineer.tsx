"use client";

import { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import { Separator } from "@/components/ui/separator";
import { useVariableProximity } from "@/hooks/use-variable-proximity";

const TEXT = "UI/UX Designer Engineer";

type ProximityTextProps = {
  text: string;
  startIndex: number;
  registerLetter: (el: HTMLSpanElement | null, index: number) => void;
};

function ProximityText({
  text,
  startIndex,
  registerLetter,
}: ProximityTextProps) {
  return (
    <h2
      className="text-background text-[clamp(12rem,35vw,28rem)] leading-none font-bold tracking-tighter whitespace-nowrap"
      // faux outline
      style={{ textShadow: "0px 0px 2px var(--muted-foreground)" }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => registerLetter(el, startIndex + i)}
          className="inline-block transition-[font-variation-settings,transform] duration-100"
          style={{
            fontVariationSettings: "'wght' 900",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
}

export function UiUxDesignerEngineer() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Horizontal parallax: moves right to left as section enters viewport
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "-35%"]);

  const { containerRef, registerLetter } = useVariableProximity<HTMLDivElement>(
    {
      fontVariationAxis: "wght",
      minValue: 900,
      maxValue: 400,
      radius: 500,
      falloff: "gaussian",
    }
  );

  return (
    <section
      ref={sectionRef}
      className="flex items-center overflow-hidden p-6 md:p-8"
    >
      <motion.div
        ref={containerRef}
        className="flex items-center gap-12 px-6 md:px-8 lg:px-12"
        style={{ x }}
      >
        <ProximityText
          registerLetter={registerLetter}
          startIndex={0}
          text={TEXT}
        />
        <Separator
          className="h-[clamp(12rem,35vw,28rem)]"
          orientation="vertical"
        />
        <ProximityText
          registerLetter={registerLetter}
          startIndex={TEXT.length}
          text={TEXT}
        />
        <Separator
          className="h-[clamp(12rem,35vw,28rem)]"
          orientation="vertical"
        />
        <ProximityText
          registerLetter={registerLetter}
          startIndex={TEXT.length * 2}
          text={TEXT}
        />
        <Separator
          className="h-[clamp(12rem,35vw,28rem)]"
          orientation="vertical"
        />
        <ProximityText
          registerLetter={registerLetter}
          startIndex={TEXT.length * 3}
          text={TEXT}
        />
        <Separator
          className="h-[clamp(12rem,35vw,28rem)]"
          orientation="vertical"
        />
        <ProximityText
          registerLetter={registerLetter}
          startIndex={TEXT.length * 4}
          text={TEXT}
        />
        <Separator
          className="h-[clamp(12rem,35vw,28rem)]"
          orientation="vertical"
        />
        <ProximityText
          registerLetter={registerLetter}
          startIndex={TEXT.length * 5}
          text={TEXT}
        />
      </motion.div>
    </section>
  );
}
