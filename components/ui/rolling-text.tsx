"use client";

import * as React from "react";

import type { MotionValue, UseInViewOptions } from "motion/react";
import { motion, useInView, useTransform } from "motion/react";

// Animation constants for scroll-driven mode
const LETTER_DURATION = 0.08; // Duration in scroll progress (0-1)
const LETTER_OVERLAP = 0.06; // Overlap between letters
const LETTER_STAGGER = LETTER_DURATION - LETTER_OVERLAP;

function formatCharacter(char: string) {
  return char === " " ? "\u00A0" : char;
}

type RollingTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  inViewOnce?: boolean;
  text: string;
  /**
   * Optional scroll progress for scroll-driven animation
   * When provided, rotation is directly mapped to scroll position
   */
  scrollYProgress?: MotionValue<number>;
  /**
   * Scroll progress value (0-1) at which animation starts
   * @default 0.3
   */
  scrollTrigger?: number;
  /**
   * Duration of animation in scroll progress units
   * @default 0.15
   */
  scrollDuration?: number;
};

// Scroll-driven character component
type ScrollDrivenCharProps = {
  char: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  scrollTrigger: number;
  scrollDuration: number;
};

function ScrollDrivenChar({
  char,
  index,
  scrollYProgress,
  scrollTrigger,
  scrollDuration,
}: ScrollDrivenCharProps) {
  const start = scrollTrigger + index * LETTER_STAGGER;
  const end = Math.min(start + LETTER_DURATION, scrollTrigger + scrollDuration);

  // Rotates from -90 to 0 (rolls into view)
  const rotateX = useTransform(scrollYProgress, [start, end], [-90, 0]);

  // Starts at 0 opacity, fades in as it rolls
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <span
      aria-hidden="true"
      className="relative inline-block w-auto perspective-[9999999px] transform-3d"
    >
      <motion.span
        className="absolute inline-block origin-[50%_100%] backface-hidden"
        style={{ rotateX, opacity }}
      >
        {formatCharacter(char)}
      </motion.span>
      <span className="invisible">{formatCharacter(char)}</span>
    </span>
  );
}

// Time-based (inView) character component
type TimeDrivenCharProps = {
  char: string;
  index: number;
  isInView: boolean;
  delay: number;
};

function TimeDrivenChar({
  char,
  index,
  isInView,
  delay,
}: TimeDrivenCharProps) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block w-auto perspective-[9999999px] transform-3d"
    >
      <motion.span
        animate={isInView ? { rotateX: 90 } : undefined}
        className="absolute inline-block origin-[50%_25%] backface-hidden"
        initial={{ rotateX: 0 }}
        transition={{ duration: 0.5, delay: index * delay, ease: "easeOut" }}
      >
        {formatCharacter(char)}
      </motion.span>
      <motion.span
        animate={isInView ? { rotateX: 0 } : undefined}
        className="absolute inline-block origin-[50%_100%] backface-hidden"
        initial={{ rotateX: -90 }}
        transition={{
          duration: 0.5,
          delay: index * delay + 0.1,
          ease: "easeOut",
        }}
      >
        {formatCharacter(char)}
      </motion.span>
      <span className="invisible">{formatCharacter(char)}</span>
    </span>
  );
}

function RollingText({
  ref,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  text,
  scrollYProgress,
  scrollTrigger = 0.3,
  scrollDuration = 0.15,
  ...props
}: RollingTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(ref, () => localRef.current!);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });

  const isInView = !inView || inViewResult;
  const characters = React.useMemo(() => text.split(""), [text]);

  return (
    <span data-slot="rolling-text" {...props} ref={localRef}>
      {characters.map((char, idx) =>
        scrollYProgress ? (
          <ScrollDrivenChar
            key={idx}
            char={char}
            index={idx}
            scrollDuration={scrollDuration}
            scrollTrigger={scrollTrigger}
            scrollYProgress={scrollYProgress}
          />
        ) : (
          <TimeDrivenChar
            key={idx}
            char={char}
            delay={0.03}
            index={idx}
            isInView={isInView}
          />
        )
      )}

      <span className="sr-only">{text}</span>
    </span>
  );
}

export { RollingText, type RollingTextProps };
