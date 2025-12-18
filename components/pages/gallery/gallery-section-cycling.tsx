"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { useViewport } from "@/components/providers/viewport-provider";

type GallerySectionCyclingProps = {
  images: { src: string; alt: string }[];
  interval?: number;
};

export function GallerySectionCycling({
  images,
  interval = 3000,
}: GallerySectionCyclingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isMobile } = useViewport();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax effect on the image
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Scroll-based animations for grid lines and image
  const lineScaleX = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const lineScaleY = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const wrapperOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const wrapperScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden border-x"
      style={{ height: `calc(100svh - ${SMALL_HEADER_HEIGHT}px)` }}
    >
      <motion.div
        className="relative"
        style={{
          width: isMobile ? "100vw" : "70vw",
          maxWidth: isMobile ? "none" : "1200px",
          translateY: imageY,
          opacity: wrapperOpacity,
          scale: wrapperScale,
        }}
      >
        <div className="relative">
          {/* First image sets the container size */}
          <Image
            alt={images[0].alt}
            className="invisible h-auto w-full"
            height={800}
            src={images[0].src}
            width={1200}
          />
          {/* Cycle through images with crossfade */}
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                alt={images[currentIndex].alt}
                className="h-auto w-full"
                height={800}
                src={images[currentIndex].src}
                width={1200}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Grid lines */}
        <motion.div
          className="bg-border absolute top-0 left-1/2 z-10 h-px w-screen -translate-x-1/2"
          style={{ scaleX: lineScaleX }}
        />
        <motion.div
          className="bg-border absolute bottom-0 left-1/2 z-10 h-px w-screen -translate-x-1/2"
          style={{ scaleX: lineScaleX }}
        />
        <motion.div
          className="bg-border absolute top-1/2 left-0 z-10 h-screen w-px -translate-y-1/2"
          style={{ scaleY: lineScaleY }}
        />
        <motion.div
          className="bg-border absolute top-1/2 right-0 z-10 h-screen w-px -translate-y-1/2"
          style={{ scaleY: lineScaleY }}
        />
      </motion.div>
    </section>
  );
}
