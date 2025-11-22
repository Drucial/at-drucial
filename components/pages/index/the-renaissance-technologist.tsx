"use client";

import { useRef } from "react";
import Image from "next/image";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { HEADER_HEIGHT } from "@/components/layout/header";
import { BlurText } from "@/components/ui/blur-text";
import { RollingText } from "@/components/ui/rolling-text";

export function TheRenaissanceTechnologist() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Image parallax - moves up slightly as you scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const imageOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.65, 0.8],
    [0, 1, 1, 0]
  );
  const imageScale = useTransform(scrollYProgress, [0.1, 0.35], [0.8, 1]);

  // Text fade out on scroll through
  const textOpacity = useTransform(scrollYProgress, [0.65, 0.8], [1, 0]);

  // Content parallax
  const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  // Background color transition - spring-based
  const lightBgOpacityValue = useMotionValue(0);
  const lightBgOpacity = useSpring(lightBgOpacityValue, {
    stiffness: 300,
    damping: 30,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.15 && latest <= 0.7) {
      lightBgOpacityValue.set(1);
    } else {
      lightBgOpacityValue.set(0);
    }
  });

  return (
    <section
      ref={sectionRef}
      className="bg-background text-foreground relative flex items-center justify-center px-6 py-32 md:px-8 lg:px-12"
      style={{ minHeight: `calc(100svh - ${HEADER_HEIGHT / 2}px)` }}
    >
      {/* Light mode overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white dark:bg-neutral-100"
        style={{ opacity: lightBgOpacity }}
      />

      <motion.div
        className="relative flex items-center"
        style={{ y: contentY }}
      >
        {/* Image */}
        <motion.div
          className="relative aspect-square w-[clamp(20rem,50vw,40rem)] shrink-0 overflow-hidden rounded-full"
          style={{ y: imageY, opacity: imageOpacity, scale: imageScale }}
        >
          <Image
            fill
            alt="Drucial - Renaissance Technologist"
            className="object-cover grayscale"
            sizes="(max-width: 768px) 40vw, 25vw"
            src="/drucial.webp"
          />
        </motion.div>

        {/* Heading + Description - overlapping image, pushed right */}
        <motion.div
          className="-ml-32 flex flex-col md:-ml-48 lg:-ml-56"
          style={{ opacity: textOpacity }}
        >
          <h2 className="text-background relative z-10 -mt-8 text-[clamp(3rem,12vw,10rem)] leading-[0.85] font-bold tracking-tighter">
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

          {/* Description text - pushed far right */}
          <div className="mt-8 ml-auto max-w-2xl space-y-6 pl-32 md:pl-48">
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
      </motion.div>
    </section>
  );
}
