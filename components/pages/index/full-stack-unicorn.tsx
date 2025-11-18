"use client";

import { useRef } from "react";

import type { MotionValue } from "motion/react";
import { motion, useScroll, useTransform } from "motion/react";

import { HEADER_HEIGHT } from "@/components/layout/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionData = {
  value: string;
  title: string;
  content: string[];
};

// Hook for staggered accordion item animations
function useAccordionItemAnimation(
  scrollYProgress: MotionValue<number>,
  index: number
) {
  const stagger = 0.05;
  const start = 0.25 + index * stagger;
  const end = start + 0.15;

  return {
    opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
    x: useTransform(scrollYProgress, [start, end], [-100, 0]),
  };
}

// Animated accordion item wrapper
function AnimatedAccordionItem({
  item,
  index,
  scrollYProgress,
}: {
  item: AccordionData;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const animations = useAccordionItemAnimation(scrollYProgress, index);

  return (
    <motion.div style={{ opacity: animations.opacity, x: animations.x }}>
      <AccordionItem value={item.value}>
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {item.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

export function FullStackUnicorn() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Right column and border slide in from right together
  const rightColumnX = useTransform(
    scrollYProgress,
    [0.35, 0.5],
    ["100%", "0%"]
  );

  return (
    <section
      ref={sectionRef}
      className="grid min-h-screen grid-cols-12 gap-x-8 px-6 md:px-8 lg:gap-x-12 lg:px-12"
      style={{ minHeight: `calc(100svh - ${HEADER_HEIGHT}px)` }}
    >
      {/* Left column - Accordion */}
      <div className="col-span-12 flex items-center justify-center py-12 md:col-span-6">
        <Accordion
          className="w-full max-w-[65ch]"
          defaultValue={["research"]}
          type="multiple"
        >
          {accordionData.map((item, index) => (
            <AnimatedAccordionItem
              key={item.value}
              index={index}
              item={item}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </Accordion>
      </div>

      {/* Right column - Title with border sliding in from right */}
      <motion.div
        className="relative col-span-12 flex items-center justify-center py-12 md:col-span-6"
        style={{
          x: rightColumnX,
        }}
      >
        {/* Border */}
        <div className="bg-border absolute top-0 bottom-0 left-0 w-px" />

        <div className="font-teko text-border mt-12 flex flex-col items-center p-6 font-black uppercase tabular-nums md:p-8 lg:p-12">
          <span className="text-[15vw] leading-40 tracking-tighter">Full-</span>
          <span className="text-[12.5vw] leading-36 tracking-tighter">
            Stack
          </span>
          <span className="text-[9.5vw] leading-24 tracking-tighter">
            Unicorn
          </span>
        </div>
      </motion.div>
    </section>
  );
}

const accordionData: AccordionData[] = [
  {
    value: "research",
    title: "RESEARCH",
    content: [
      "The backbone of any stellar product is research. Dive deep into user needs, category trends, and competitors. No stabbing in the dark here — real data guides the decisions.",
      "Using methods like user interviews and surveys reveals what users truly want. Research ensures solutions are sharp, targeted, and grounded in fact, not fiction.",
    ],
  },
  {
    value: "design",
    title: "DESIGN",
    content: [
      "Design is where magic meets logic. Turn insights into stunning, user-centric prototypes and interfaces. It's all about things looking good and working even better.",
      "Frequent testing and feedback loops perfect the UX and UI. A beautiful design that's intuitive and practical? That's the endgame.",
    ],
  },
  {
    value: "build",
    title: "BUILD",
    content: [
      "This is where visions come to life. Using top-notch full-stack development transforms designs into powerful, scalable products. Think of this as breathing life into ideas.",
      "Close collaboration ensures the final product stays true to its design and meets high technical standards. From code to launch, it's all about excellence and precision.",
    ],
  },
];
