"use client";

import { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import { HEADER_HEIGHT, SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { useViewport } from "@/components/providers/viewport-provider";
import { Keyboard } from "@/components/svgs/keyboard";

export function TheAlchemist() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useViewport();
  const { scrollY } = useScroll();

  // Track section scroll - complete when section bottom reaches header
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", `end ${SMALL_HEADER_HEIGHT}px`],
  });

  // Parallax effect: keyboard moves up as you scroll down (opposite direction)
  const keyboardY = useTransform(scrollY, [0, 800], [0, -600]);

  // Subtitle parallax - starts when section enters viewport, ends when section leaves (desktop only)
  const subtitleY = useTransform(scrollY, [0, 800], [0, isMobile ? 0 : 500]);

  // Main heading translates down and fades out on scroll
  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "115%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="grid overflow-hidden border-x md:divide-x lg:grid-cols-[2fr_1fr]"
      style={{
        height: isMobile
          ? `calc(100svh - ${SMALL_HEADER_HEIGHT}px)`
          : `calc(100svh - ${HEADER_HEIGHT}px)`,
      }}
    >
      {/* Heading Column */}
      <div className="flex flex-col p-6 md:p-8 lg:p-12">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground/50 justify-self-end text-right text-base leading-tight tracking-wider lowercase md:text-lg lg:text-xl"
          initial={{ opacity: 0, y: -20 }}
          style={{ translateY: subtitleY }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Expertly Blurring the Lines Between <br /> Artistry and Engineering
        </motion.p>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="mt-auto leading-[0.7] tracking-tighter"
          initial={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontSize: "clamp(5.4rem, 16vw, 17rem)",
            translateY: headingY,
            opacity: headingOpacity,
          }}
        >
          The <br />
          Alchemist
        </motion.h1>
      </div>

      {/* Keyboard Column */}
      <div className="hidden h-full overflow-hidden lg:block">
        <motion.div
          animate={{ x: 0 }}
          className="hidden h-full overflow-hidden lg:block lg:p-12"
          initial={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div style={{ translateY: keyboardY }}>
            <Keyboard orientation="vertical" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
