"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax effect on the image
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

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
          width: "70vw",
          maxWidth: "1200px",
          translateY: imageY,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            animate={{ opacity: 1 }}
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
      </motion.div>
    </section>
  );
}
