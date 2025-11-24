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
  const { viewportHeight } = useViewport();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Image fade in, parallax, and fade out
  const imageY = useTransform(scrollYProgress, [0.2, 1], ["-30%", "-50%"]);
  const imageOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.8, 0.95],
    [0, 1, 1, 0]
  );

  // Text fade out on scroll through
  const textOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative grid grid-rows-[auto_1fr] divide-y"
      style={{ minHeight: viewportHeight - SMALL_HEADER_HEIGHT }}
    >
      {/* Heading + Description - overlapping image, pushed right */}
      <motion.div
        className="grid grid-cols-[1fr_5fr] md:grid-cols-[1fr_2fr]"
        style={{ opacity: textOpacity }}
      >
        <div className="overflow-hidden">
          <Image
            alt="Drucial - Renaissance Technologist"
            className="h-full w-auto origin-[50%_60%] scale-300 md:hidden"
            height={1920}
            sizes="(max-width: 768px) 100vw, 50vw"
            src="/images/drew-bike.webp"
            width={1280}
          />
        </div>

        <div className="col-start-2 border-l p-6 md:p-8 lg:p-12">
          <h2 className="relative text-[clamp(3rem,12vw,10rem)] leading-[7.5vw] font-bold tracking-tighter">
            <RollingText
              scrollTrigger={0.2}
              scrollYProgress={scrollYProgress}
              text="The"
              transition={{ duration: 0.5, delay: 0.03, ease: "easeOut" }}
            />
            <br />
            <RollingText
              scrollTrigger={0.25}
              scrollYProgress={scrollYProgress}
              text="Technologist"
              transition={{ duration: 0.5, delay: 0.03, ease: "easeOut" }}
            />
          </h2>
        </div>
      </motion.div>

      <motion.div className="grid overflow-hidden md:grid-cols-2">
        {/* Image */}
        <div className="relative hidden overflow-hidden md:block">
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
        </div>

        {/* Description text */}
        <div className="col-start-2 max-w-lg space-y-6 border-l p-6 md:p-8 lg:p-12">
          <BlurText
            animateBy="words"
            animationFrom={{ filter: "blur(8px)", opacity: 0 }}
            animationTo={[{ filter: "blur(0px)", opacity: 1 }]}
            className="leading-relaxed text-neutral-600"
            delay={7}
            delayOffset={0}
            scrollTrigger={0.3}
            scrollYProgress={scrollYProgress}
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
            scrollYProgress={scrollYProgress}
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
            scrollYProgress={scrollYProgress}
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
            scrollYProgress={scrollYProgress}
            stepDuration={0.2}
            text="Beyond developing world-class products, I'm a devoted dad, a collector of motorcycles and bicycles, and a culinary enthusiast who believes in the magic of a delectable meal with good company."
          />
        </div>
      </motion.div>
    </section>
  );
}
