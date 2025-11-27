"use client";

import { useRef, useState } from "react";

import { useLenis } from "lenis/react";
import type { MotionValue } from "motion/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";
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
          <div className="space-y-4 text-sm md:text-base">
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
  const [activeItem, setActiveItem] = useState("");
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  // Entrance animations - complete when section top reaches header
  const { scrollYProgress: entranceProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", `start ${SMALL_HEADER_HEIGHT}px`],
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

    lenis?.scrollTo(targetScroll);
  }

  // Left column slides in from left
  const leftColumnX = useTransform(entranceProgress, [0, 1], ["-100%", "0%"]);

  // Right column and border slide in from right together
  const rightColumnX = useTransform(entranceProgress, [0, 1], ["100%", "0%"]);

  // Staggered text row animations for right column
  const row1Opacity = useTransform(entranceProgress, [0.2, 0.5], [0, 1]);
  const row1Y = useTransform(entranceProgress, [0.2, 0.5], [30, 0]);

  const row2Opacity = useTransform(entranceProgress, [0.35, 0.65], [0, 1]);
  const row2Y = useTransform(entranceProgress, [0.35, 0.65], [40, 0]);

  const row3Opacity = useTransform(entranceProgress, [0.5, 0.8], [0, 1]);
  const row3Y = useTransform(entranceProgress, [0.5, 0.8], [50, 0]);

  const row4Opacity = useTransform(entranceProgress, [0.65, 0.95], [0, 1]);
  const row4Y = useTransform(entranceProgress, [0.65, 0.95], [60, 0]);

  // 2.5 sections of scroll
  const sectionHeight = `calc(250svh - ${SMALL_HEADER_HEIGHT * 2.5}px)`;

  return (
    <section
      ref={sectionRef}
      className="relative md:border-x md:border-b"
      style={{ height: sectionHeight }}
    >
      {/* Mobile: Heading scrolls away, accordion is sticky */}
      {/* Desktop: Both columns sticky side-by-side */}

      {/* Mobile heading - scrolls normally */}
      <motion.div
        className="flex items-center justify-center overflow-hidden border-r border-l p-6 md:hidden md:border-r-0"
        style={{ x: rightColumnX }}
      >
        <div className="font-teko text-foreground/50 tracking-tightest flex flex-col font-black uppercase tabular-nums">
          <motion.span
            className="text-[9.5vw] leading-[7vw]"
            style={{ opacity: row1Opacity, y: row1Y }}
          >
            The
          </motion.span>
          <motion.span
            className="text-foreground text-[12.5vw] leading-[9vw]"
            style={{ opacity: row2Opacity, y: row2Y }}
          >
            Full-
          </motion.span>
          <motion.span
            className="text-foreground text-[12.5vw] leading-[9vw]"
            style={{ opacity: row3Opacity, y: row3Y }}
          >
            Stack
          </motion.span>
          <motion.span
            className="text-[9.5vw] leading-[7vw]"
            style={{ opacity: row4Opacity, y: row4Y }}
          >
            Unicorn
          </motion.span>
        </div>
      </motion.div>

      <Separator className="md:hidden" />

      {/* Mobile accordion - sticky */}
      <motion.div
        className="bg-background sticky z-10 flex flex-col items-center justify-start border-r border-l p-6 pb-20 md:hidden md:border-l-0"
        style={{
          top: SMALL_HEADER_HEIGHT,
          minHeight: `calc(100svh - ${SMALL_HEADER_HEIGHT}px)`,
          x: leftColumnX,
        }}
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

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <ProgressBar key={i} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>
      </motion.div>

      {/* Desktop: Sticky container with both columns */}
      <div
        className="border-border sticky hidden overflow-hidden md:grid md:grid-cols-2"
        style={{
          top: SMALL_HEADER_HEIGHT,
          height: `calc(100dvh - ${SMALL_HEADER_HEIGHT}px)`,
        }}
      >
        {/* Left column - Accordion */}
        <motion.div
          className="relative flex items-center justify-center overflow-hidden p-8 lg:p-12"
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

          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-24 left-1/2 flex -translate-x-1/2 gap-1"
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

        {/* Right column - Title */}
        <motion.div
          className="flex items-center justify-center overflow-hidden border-l p-8 lg:p-12"
          style={{ x: rightColumnX }}
        >
          <div className="font-teko text-foreground/50 tracking-tightest flex flex-col font-black uppercase tabular-nums">
            <motion.span
              className="text-[9.5vw] leading-[7vw]"
              style={{ opacity: row1Opacity, y: row1Y }}
            >
              The
            </motion.span>
            <motion.span
              className="text-foreground text-[12.5vw] leading-[9vw]"
              style={{ opacity: row2Opacity, y: row2Y }}
            >
              Full-
            </motion.span>
            <motion.span
              className="text-foreground text-[12.5vw] leading-[9vw]"
              style={{ opacity: row3Opacity, y: row3Y }}
            >
              Stack
            </motion.span>
            <motion.span
              className="text-[9.5vw] leading-[7vw]"
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
