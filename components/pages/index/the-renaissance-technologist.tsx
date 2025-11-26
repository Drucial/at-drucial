"use client";

import { useRef } from "react";
import Image from "next/image";

import { motion, useScroll, useTransform } from "motion/react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { useViewport } from "@/components/providers/viewport-provider";
import { BlurText } from "@/components/ui/blur-text";
import { RollingText } from "@/components/ui/rolling-text";

export function TheRenaissanceTechnologist() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useViewport();

  // Entrance animations - complete when section reaches header (desktop)
  const { scrollYProgress: desktopEntranceProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", `start ${SMALL_HEADER_HEIGHT}px`],
  });

  // Mobile entrance - complete earlier (when section is 20% from top)
  const { scrollYProgress: mobileEntranceProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.2"],
  });

  const entranceProgress = isMobile
    ? mobileEntranceProgress
    : desktopEntranceProgress;

  // Exit animations - full scroll through
  const { scrollYProgress: exitProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Full scroll range for continuous parallax
  const { scrollYProgress: fullProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Image parallax continues through full scroll
  const imageY = useTransform(fullProgress, [0, 1], ["-20%", "-50%"]);
  const imageOpacity = useTransform(entranceProgress, [0.3, 0.8], [0, 1]);

  // Text fade out on scroll through
  const textOpacity = useTransform(exitProgress, [0.3, 0.6], [1, 0]);

  // Parallax X motion - columns move in opposing directions (entrance)
  const leftColumnX = useTransform(entranceProgress, [0, 1], ["-100%", "0%"]);
  const rightColumnX = useTransform(entranceProgress, [0, 1], ["100%", "0%"]);

  return (
    <section
      ref={sectionRef}
      className="relative grid grid-rows-[auto_1fr] divide-y overflow-hidden"
      style={{
        minHeight: !isMobile ? `calc(100svh - ${SMALL_HEADER_HEIGHT}px)` : undefined,
      }}
    >
      {/* Heading + Description - overlapping image, pushed right */}
      <motion.div
        className="grid grid-cols-[1fr_5fr] md:grid-cols-[1fr_2fr]"
        style={{ opacity: textOpacity }}
      >
        <motion.div className="overflow-hidden" style={{ x: leftColumnX }}>
          <Image
            alt="Drucial - Renaissance Technologist"
            className="h-full w-auto origin-[50%_60%] scale-300 md:hidden"
            height={1920}
            sizes="(max-width: 768px) 100vw, 50vw"
            src="/images/drew-bike.webp"
            width={1280}
          />
        </motion.div>

        <motion.div
          className="col-start-2 border-l p-6 md:p-8 lg:p-12"
          style={{ x: rightColumnX }}
        >
          <h2 className="relative text-[clamp(3rem,12vw,10rem)] leading-[7.5vw] font-bold tracking-tighter">
            <RollingText
              scrollDuration={0.15}
              scrollTrigger={0.2}
              scrollYProgress={fullProgress}
              text="The"
            />
            <br />
            <RollingText
              scrollDuration={0.25}
              scrollTrigger={0.24}
              scrollYProgress={fullProgress}
              text="Technologist"
            />
          </h2>
        </motion.div>
      </motion.div>

      <motion.div className="grid overflow-hidden md:grid-cols-2">
        {/* Image */}
        <motion.div
          className="relative hidden overflow-hidden md:block"
          style={{ x: leftColumnX }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 w-full"
            style={{ y: imageY, opacity: imageOpacity }}
          >
            <Image
              alt="Drucial - Renaissance Technologist"
              className="h-auto w-full"
              height={1920}
              sizes="(max-width: 768px) 100vw, 50vw"
              src="/images/drew-bike.webp"
              width={1280}
            />
          </motion.div>
        </motion.div>

        {/* Description text */}
        <motion.div
          className="col-start-2 max-w-lg space-y-6 border-l p-6 md:p-8 lg:p-12"
          style={{ x: rightColumnX, opacity: textOpacity }}
        >
          <BlurText
            animateBy="words"
            animationFrom={{ filter: "blur(8px)", opacity: 0 }}
            animationTo={[{ filter: "blur(0px)", opacity: 1 }]}
            className="leading-relaxed text-neutral-600"
            delay={7}
            delayOffset={0}
            scrollTrigger={0.3}
            scrollYProgress={entranceProgress}
            stepDuration={0.2}
            text="As a seasoned UX/UI designer based in Charlotte's vibrant NoDa arts district, I thrive at the intersection of creativity and technology."
          />
          <BlurText
            animateBy="words"
            animationFrom={{ filter: "blur(8px)", opacity: 0 }}
            animationTo={[{ filter: "blur(0px)", opacity: 1 }]}
            className="leading-relaxed text-neutral-600"
            delay={7}
            delayOffset={161}
            scrollTrigger={0.3}
            scrollYProgress={entranceProgress}
            stepDuration={0.2}
            text="My journey from Seattle's startup scene to the aerospace industry and back has been marked by a self-taught mastery in research, design, and engineering, fueled by a relentless pursuit of creative excellence."
          />
          <BlurText
            animateBy="words"
            animationFrom={{ filter: "blur(8px)", opacity: 0 }}
            animationTo={[{ filter: "blur(0px)", opacity: 1 }]}
            className="leading-relaxed text-neutral-600"
            delay={7}
            delayOffset={399}
            scrollTrigger={0.3}
            scrollYProgress={entranceProgress}
            stepDuration={0.2}
            text="I've honed my skills through diverse experiences—from founding and selling a business to pioneering new products at Craftwork."
          />
          <BlurText
            animateBy="words"
            animationFrom={{ filter: "blur(8px)", opacity: 0 }}
            animationTo={[{ filter: "blur(0px)", opacity: 1 }]}
            className="leading-relaxed text-neutral-600"
            delay={7}
            delayOffset={532}
            scrollTrigger={0.3}
            scrollYProgress={entranceProgress}
            stepDuration={0.2}
            text="Beyond developing world-class products, I'm a devoted dad, a collector of motorcycles and bicycles, and a culinary enthusiast who believes in the magic of a delectable meal with good company."
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
