"use client";

import { useRef, useState } from "react";

import type { MotionValue } from "motion/react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { HEADER_HEIGHT } from "@/components/layout/header";

// Animation constants
const LETTER_DURATION = 0.04; // Duration in scroll progress (0-1)
const LETTER_OVERLAP = 0.03; // Overlap between letters
const LETTER_STAGGER = LETTER_DURATION - LETTER_OVERLAP;

type LetterAnimations = {
  translateY: MotionValue<number>;
  rotateX: MotionValue<number>;
  opacity: MotionValue<number>;
};

// Create letter animations based on scroll progress
function useLetterAnimation(
  scrollYProgress: MotionValue<number>,
  index: number,
  baseStart: number, // When the word should start animating
  baseExit: number // When the word should start exiting
): LetterAnimations {
  const start = baseStart + index * LETTER_STAGGER;
  const end = start + LETTER_DURATION;

  // Exit animation - reverse order (last letter exits first)
  const exitStart = baseExit + index * LETTER_STAGGER;
  const exitEnd = exitStart + LETTER_DURATION;

  return {
    translateY: useTransform(
      scrollYProgress,
      [start, end, exitStart, exitEnd],
      [20, 0, 0, -20]
    ),
    rotateX: useTransform(
      scrollYProgress,
      [start, end, exitStart, exitEnd],
      [-90, 0, 0, 90]
    ),
    opacity: useTransform(
      scrollYProgress,
      [start, end, exitStart, exitEnd],
      [0, 1, 1, 0]
    ),
  };
}

type AnimatedWordProps = {
  word: string;
  scrollYProgress: MotionValue<number>;
  baseStart: number;
  baseExit: number;
  className?: string;
};

function AnimatedWord({
  word,
  scrollYProgress,
  baseStart,
  baseExit,
  className,
}: AnimatedWordProps) {
  const letters = word.split("");

  return (
    <span className={className} style={{ perspective: "800px" }}>
      {letters.map((letter, index) => (
        <AnimatedLetter
          key={index}
          baseExit={baseExit}
          baseStart={baseStart}
          index={index}
          letter={letter}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </span>
  );
}

type AnimatedLetterProps = {
  letter: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  baseStart: number;
  baseExit: number;
};

function AnimatedLetter({
  letter,
  index,
  scrollYProgress,
  baseStart,
  baseExit,
}: AnimatedLetterProps) {
  const animations = useLetterAnimation(
    scrollYProgress,
    index,
    baseStart,
    baseExit
  );

  return (
    <motion.span
      className="inline-block"
      style={{
        translateY: animations.translateY,
        rotateX: animations.rotateX,
        opacity: animations.opacity,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    >
      {letter}
    </motion.span>
  );
}

type MagnifiableAreaProps = {
  children: React.ReactNode;
  magnifiedContent: React.ReactNode;
};

function MagnifiableArea({ children, magnifiedContent }: MagnifiableAreaProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [areaWidth, setAreaWidth] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  const LENS_SIZE = 210;
  const scale = 1.3;

  // Magnified content position inside lens
  const magnifiedX = useTransform(lensX, (v) => LENS_SIZE / 2 - v * scale);
  const magnifiedY = useTransform(lensY, (v) => LENS_SIZE / 2 - v * scale);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setAreaWidth(areaRef.current.offsetWidth);
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div
      ref={areaRef}
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Base content - always visible */}
      {children}

      {/* Magnified lens effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="bg-foreground border-background/20 pointer-events-none absolute overflow-hidden rounded-full border-2"
            exit={{ scale: 0, opacity: 0 }}
            initial={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lensX,
              top: lensY,
              x: "-50%",
              y: "-50%",
              transformOrigin: "center center",
            }}
          >
            {/* Magnified content inside lens */}
            <motion.div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                x: magnifiedX,
                y: magnifiedY,
                scale: scale,
                transformOrigin: "top left",
                width: areaWidth,
              }}
            >
              {magnifiedContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TheMinimalistSavant() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Quote slides in from right (no exit animation)
  const quoteTranslateX = useTransform(scrollYProgress, [0.25, 0.45], [100, 0]);
  const quoteOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  // Description fades in after quote (no exit animation)
  const descriptionTranslateY = useTransform(
    scrollYProgress,
    [0.3, 0.45],
    [40, 0]
  );
  const descriptionOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

  // Background color transition - spring-based at buffer point
  const normalBgOpacityValue = useMotionValue(1);
  const normalBgOpacity = useSpring(normalBgOpacityValue, {
    stiffness: 300,
    damping: 30,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Transition to dark when entering (0.18), back to light when leaving (0.82)
    if (latest >= 0.18 && latest <= 0.82) {
      normalBgOpacityValue.set(0);
    } else {
      normalBgOpacityValue.set(1);
    }
  });

  return (
    <section
      ref={sectionRef}
      className="bg-foreground text-background relative grid grid-cols-12 gap-x-8 px-6 md:px-8 lg:gap-x-12 lg:px-12"
      style={{ minHeight: `calc(100svh - ${HEADER_HEIGHT}px)` }}
    >
      {/* Normal background overlay that fades out to reveal inverted bg */}
      <motion.div
        className="bg-background pointer-events-none absolute inset-0"
        style={{ opacity: normalBgOpacity }}
      />

      {/* Left column - Heading with letter animations */}
      <div className="col-span-12 flex items-center py-24 pr-8 md:col-span-5 md:py-32 lg:py-40">
        <h2 className="text-[clamp(3rem,12vw,12rem)] leading-[0.8] font-bold tracking-tighter">
          {/* "The" = 3 letters */}
          <AnimatedWord
            baseExit={0.75}
            baseStart={0.2}
            className="block"
            scrollYProgress={scrollYProgress}
            word="The"
          />
          {/* "Minimalist" = 10 letters */}
          <AnimatedWord
            baseExit={0.71}
            baseStart={0.24}
            className="block"
            scrollYProgress={scrollYProgress}
            word="Minimalist"
          />
          {/* "Savant" = 6 letters */}
          <AnimatedWord
            baseExit={0.77}
            baseStart={0.35}
            className="block"
            scrollYProgress={scrollYProgress}
            word="Savant"
          />
        </h2>
      </div>

      {/* Right column - Content */}
      <div className="col-span-12 flex flex-col items-end justify-start gap-8 py-24 pl-8 text-right md:col-span-6 md:col-start-7 md:py-32 lg:py-40">
        <MagnifiableArea
          magnifiedContent={
            <div className="flex flex-col items-end text-right">
              {/* Static quote for magnification */}
              <p className="text-background/50 font-teko text-3xl leading-tight font-medium md:text-4xl lg:text-5xl">
                In a world cluttered with complexity,{" "}
                <span className="text-background">simplicity</span> stands out.
              </p>

              {/* Static description for magnification */}
              <div className="text-background/50 mt-8 ml-auto max-w-md space-y-6 text-balance">
                <p className="leading-relaxed">
                  Less is more is not just a mantra; it&apos;s a disciplined
                  approach to design and life.
                </p>
                <p className="leading-relaxed">
                  Elegance lies in restraint. Every element has a purpose, every
                  feature is thoughtfully crafted, and nothing is superfluous.
                </p>
              </div>
            </div>
          }
        >
          {/* Quote */}
          <motion.p
            className="text-background/50 font-teko text-3xl leading-tight font-medium md:text-4xl lg:text-5xl"
            style={{
              x: quoteTranslateX,
              opacity: quoteOpacity,
            }}
          >
            In a world cluttered with complexity,{" "}
            <span className="text-background">simplicity</span> stands out.
          </motion.p>

          {/* Description */}
          <motion.div
            className="text-background/50 mt-8 ml-auto max-w-md space-y-6 text-balance"
            style={{
              y: descriptionTranslateY,
              opacity: descriptionOpacity,
            }}
          >
            <p className="leading-relaxed">
              Less is more is not just a mantra; it&apos;s a disciplined
              approach to design and life.
            </p>
            <p className="leading-relaxed">
              Elegance lies in restraint. Every element has a purpose, every
              feature is thoughtfully crafted, and nothing is superfluous.
            </p>
          </motion.div>
        </MagnifiableArea>
      </div>
    </section>
  );
}
