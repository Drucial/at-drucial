"use client";

import { useRef, useState } from "react";

import type { MotionValue } from "motion/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

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
  const stagger = 0.08;
  const start = 0.05 + index * stagger;
  const end = start + 0.12;

  return {
    opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
    x: useTransform(scrollYProgress, [start, end], [-300, 0]),
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
  const [activeItem, setActiveItem] = useState("research");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Toggle accordion items based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveItem("research");
    } else if (latest < 0.66) {
      setActiveItem("design");
    } else {
      setActiveItem("build");
    }
  });

  // Right column and border slide in from right together
  const rightColumnX = useTransform(scrollYProgress, [0, 0.3], ["100%", "0%"]);

  // Progress bar segments (10 bars)
  const barOpacity0 = useTransform(scrollYProgress, [0, 0.1], [0.2, 1]);
  const barOpacity1 = useTransform(scrollYProgress, [0.1, 0.2], [0.2, 1]);
  const barOpacity2 = useTransform(scrollYProgress, [0.2, 0.3], [0.2, 1]);
  const barOpacity3 = useTransform(scrollYProgress, [0.3, 0.4], [0.2, 1]);
  const barOpacity4 = useTransform(scrollYProgress, [0.4, 0.5], [0.2, 1]);
  const barOpacity5 = useTransform(scrollYProgress, [0.5, 0.6], [0.2, 1]);
  const barOpacity6 = useTransform(scrollYProgress, [0.6, 0.7], [0.2, 1]);
  const barOpacity7 = useTransform(scrollYProgress, [0.7, 0.8], [0.2, 1]);
  const barOpacity8 = useTransform(scrollYProgress, [0.8, 0.9], [0.2, 1]);
  const barOpacity9 = useTransform(scrollYProgress, [0.9, 1], [0.2, 1]);
  const barOpacities = [
    barOpacity0,
    barOpacity1,
    barOpacity2,
    barOpacity3,
    barOpacity4,
    barOpacity5,
    barOpacity6,
    barOpacity7,
    barOpacity8,
    barOpacity9,
  ];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(300svh - ${HEADER_HEIGHT * 3}px)` }}
    >
      {/* Sticky container that stays in view */}
      <div
        className="border-border sticky grid grid-cols-12 gap-x-8 border-b px-6 md:px-8 lg:gap-x-12 lg:px-12"
        style={{
          top: HEADER_HEIGHT / 2,
          height: `calc(100svh - ${HEADER_HEIGHT}px)`,
        }}
      >
        {/* Left column - Accordion */}
        <div className="col-span-12 flex items-center justify-center overflow-hidden py-12 md:col-span-6">
          <Accordion
            collapsible
            className="w-full max-w-[65ch]"
            type="single"
            value={activeItem}
            onValueChange={setActiveItem}
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
            <span className="text-[15vw] leading-40 tracking-tighter">
              Full-
            </span>
            <span className="text-[12.5vw] leading-36 tracking-tighter">
              Stack
            </span>
            <span className="text-[9.5vw] leading-24 tracking-tighter">
              Unicorn
            </span>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute right-6 bottom-4 flex gap-1 md:right-8 lg:right-12">
          {barOpacities.map((opacity, i) => (
            <motion.div
              key={i}
              className="bg-muted-foreground h-3 w-1"
              style={{ opacity }}
            />
          ))}
        </div>
      </div>
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
