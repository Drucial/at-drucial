"use client";

import { useRef, useState } from "react";

import type { MotionValue } from "motion/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { useViewport } from "@/components/providers/viewport-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

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
  const start = 0 + index * stagger;
  const end = start + 0.15;

  return {
    opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
    x: useTransform(scrollYProgress, [start, end], [-200, 0]),
  };
}

// Progress bar with staggered animations
function ProgressBar({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Progress fill timing - evenly distributed across 0.3 to 1.0
  const progressStart = 0.3 + (index / 10) * 0.7;
  const progressEnd = progressStart + 0.07;

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, progressStart, progressEnd],
    [0, 0.2, 0.2, 1]
  );

  return (
    <motion.div className="bg-muted-foreground h-3 w-1" style={{ opacity }} />
  );
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
  const { viewportHeight } = useViewport();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  // Toggle accordion items based on scroll progress
  // Accordions start opening after initial animation (0.3)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.3) {
      setActiveItem(""); // All collapsed during entrance animation
    } else if (latest < 0.55) {
      setActiveItem("research");
    } else if (latest < 0.8) {
      setActiveItem("design");
    } else {
      setActiveItem("build");
    }
  });

  // Handle manual accordion clicks - scroll to position (state follows scroll)
  function handleAccordionChange(value: string) {
    if (!sectionRef.current || !value) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + sectionRect.top;
    const sectionHeight = sectionRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Target middle of each section (adjusted for new progress ranges)
    let targetProgress = 0;
    if (value === "research") {
      targetProgress = 0.42;
    } else if (value === "design") {
      targetProgress = 0.67;
    } else if (value === "build") {
      targetProgress = 0.9;
    }

    // Convert progress to scroll position (accounting for "start center" offset)
    const scrollRange = sectionHeight - viewportHeight / 2;
    const targetScroll =
      sectionTop - viewportHeight / 2 + scrollRange * targetProgress;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }

  // Left column slides in from left
  const leftColumnX = useTransform(scrollYProgress, [0, 0.3], ["-100%", "0%"]);

  // Right column and border slide in from right together
  const rightColumnX = useTransform(scrollYProgress, [0, 0.3], ["100%", "0%"]);

  // Staggered text row animations for right column
  const row1Opacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const row1Y = useTransform(scrollYProgress, [0.08, 0.18], [30, 0]);

  const row2Opacity = useTransform(scrollYProgress, [0.12, 0.22], [0, 1]);
  const row2Y = useTransform(scrollYProgress, [0.12, 0.22], [40, 0]);

  const row3Opacity = useTransform(scrollYProgress, [0.16, 0.26], [0, 1]);
  const row3Y = useTransform(scrollYProgress, [0.16, 0.26], [50, 0]);

  const row4Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const row4Y = useTransform(scrollYProgress, [0.2, 0.3], [60, 0]);

  // Two sections of scroll
  const sectionHeight = viewportHeight * 2 - SMALL_HEADER_HEIGHT * 2;

  return (
    <section
      ref={sectionRef}
      className="relative border-b"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container that stays in view */}
      <div
        className="border-border sticky flex flex-col-reverse overflow-hidden md:grid md:grid-cols-2"
        style={{
          top: SMALL_HEADER_HEIGHT,
          height: viewportHeight - SMALL_HEADER_HEIGHT,
        }}
      >
        {/* Left column - Accordion */}
        <motion.div
          className="relative flex flex-1 items-start justify-center overflow-hidden border-r p-6 md:flex-none md:items-center md:border-r-0 md:p-8 lg:p-12"
          style={{ x: leftColumnX }}
        >
          <Accordion
            collapsible
            className="w-full max-w-[65ch]"
            type="single"
            value={activeItem}
            onValueChange={handleAccordionChange}
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

          <Separator className="absolute bottom-16 left-0 w-full md:hidden" />

          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1 md:bottom-24"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <ProgressBar
                key={i}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </motion.div>

        <Separator className="md:hidden" />

        {/* Right column - Title with border sliding in from right */}
        <motion.div
          className="flex items-start justify-center border-l p-6 md:items-center md:p-8 lg:p-12"
          style={{
            x: rightColumnX,
          }}
        >
          <div className="font-teko text-border tracking-tightest flex flex-col font-black uppercase tabular-nums">
            <motion.span
              className="text-[9.5vw] leading-[7vw]"
              style={{ opacity: row1Opacity, y: row1Y }}
            >
              The
            </motion.span>
            <motion.span
              className="text-[12.5vw] leading-[9vw]"
              style={{ opacity: row2Opacity, y: row2Y }}
            >
              Full-
            </motion.span>
            <motion.span
              className="text-[12.5vw] leading-[9vw]"
              style={{ opacity: row3Opacity, y: row3Y }}
            >
              Stack
            </motion.span>
            <motion.span
              className="text-accent text-[9.5vw] leading-[7vw]"
              style={{ opacity: row4Opacity, y: row4Y }}
            >
              Unicorn
            </motion.span>
          </div>
        </motion.div>
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
