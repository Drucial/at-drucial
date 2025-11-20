"use client";

import * as React from "react";

import {
  motion,
  useInView,
  useMotionValueEvent,
  type MotionValue,
  type Transition,
  type UseInViewOptions,
} from "motion/react";

const ENTRY_ANIMATION = {
  initial: { rotateX: 0 },
  animate: { rotateX: 90 },
};

const EXIT_ANIMATION = {
  initial: { rotateX: 90 },
  animate: { rotateX: 0 },
};

function formatCharacter(char: string) {
  return char === " " ? "\u00A0" : char;
}

type RollingTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  transition?: Transition;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  inViewOnce?: boolean;
  text: string;
  /**
   * Optional scroll progress to trigger animation
   * When provided, animation triggers at scrollTrigger value instead of intersection
   */
  scrollYProgress?: MotionValue<number>;
  /**
   * Scroll progress value (0-1) at which to trigger animation
   * @default 0.3
   */
  scrollTrigger?: number;
};

function RollingText({
  ref,
  transition = { duration: 0.5, delay: 0.1, ease: "easeOut" },
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  text,
  scrollYProgress,
  scrollTrigger = 0.3,
  ...props
}: RollingTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(ref, () => localRef.current!);

  const [isTriggered, setIsTriggered] = React.useState(false);

  // Scroll-based trigger - bidirectional
  useMotionValueEvent(scrollYProgress ?? null, "change", (latest) => {
    if (latest >= scrollTrigger && !isTriggered) {
      setIsTriggered(true);
    } else if (latest < scrollTrigger && isTriggered) {
      setIsTriggered(false);
    }
  });

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });

  // Use scroll-based trigger if scrollYProgress provided, otherwise use inView
  const isInView = scrollYProgress ? isTriggered : !inView || inViewResult;

  const characters = React.useMemo(() => text.split(""), [text]);

  return (
    <span data-slot="rolling-text" {...props} ref={localRef}>
      {characters.map((char, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          className="relative inline-block w-auto transform-3d perspective-[9999999px]"
        >
          <motion.span
            animate={isInView ? ENTRY_ANIMATION.animate : undefined}
            className="absolute inline-block origin-[50%_25%] backface-hidden"
            initial={ENTRY_ANIMATION.initial}
            transition={{
              ...transition,
              delay: idx * (transition?.delay ?? 0),
            }}
          >
            {formatCharacter(char)}
          </motion.span>
          <motion.span
            animate={isInView ? EXIT_ANIMATION.animate : undefined}
            className="absolute inline-block origin-[50%_100%] backface-hidden"
            initial={EXIT_ANIMATION.initial}
            transition={{
              ...transition,
              delay: idx * (transition?.delay ?? 0) + 0.3,
            }}
          >
            {formatCharacter(char)}
          </motion.span>
          <span className="invisible">{formatCharacter(char)}</span>
        </span>
      ))}

      <span className="sr-only">{text}</span>
    </span>
  );
}

export { RollingText, type RollingTextProps };
