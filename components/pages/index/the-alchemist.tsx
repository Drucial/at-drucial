"use client";

import { motion, useScroll, useTransform } from "motion/react";

import { Keyboard } from "@/components/svgs/keyboard";

export function TheAlchemist() {
  const { scrollY } = useScroll();

  // Parallax effect: keyboard moves up as you scroll down (opposite direction)
  // This creates the effect of revealing the bottom of the keyboard
  const keyboardY = useTransform(scrollY, [0, 800], [0, -600]);

  // Pseudo-sticky parallax for subtitle text (moves down at similar rate to keyboard)
  const subtitleY = useTransform(scrollY, [0, 800], [0, 650]);

  return (
    <section className="grid-auto-rows-[minmax(auto,1fr)] grid h-[calc(100svh-128px)] grid-cols-12 gap-x-8 px-6 md:px-8 lg:gap-x-12 lg:px-12">
      {/* Subtitle: top-right two columns of the left main column */}
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="text-muted-foreground/50 col-span-12 row-start-1 justify-self-end py-6 text-right text-xl leading-tight tracking-wider lowercase md:col-span-3 md:col-start-5 md:py-8 lg:py-12"
        initial={{ opacity: 0, y: -20 }}
        style={{ translateY: subtitleY }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        Expertly Blurring the Lines Between Artistry and Engineering
      </motion.p>

      {/* Title: centered vertically within left 7 columns, with inner left offset */}
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        className="col-span-12 row-start-2 mr-8 self-center text-[clamp(3rem,14.5vw,17rem)] leading-[0.7] font-bold tracking-tighter md:col-span-6 md:col-start-1"
        initial={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        The <br />
        Alchemist
      </motion.h1>

      {/* Right whitespace / image column spanning both rows */}
      <motion.div
        animate={{ x: 0 }}
        className="row-span-2 hidden overflow-hidden border-l py-6 pl-6 md:col-span-5 md:col-start-8 md:block md:py-8 md:pl-8 lg:py-12 lg:pl-12"
        initial={{ x: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div style={{ translateY: keyboardY }}>
          <Keyboard orientation="vertical" />
        </motion.div>
      </motion.div>
    </section>
  );
}
