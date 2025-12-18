"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { useViewport } from "@/components/providers/viewport-provider";
import { NavButton } from "@/components/ui/nav-button";

type GallerySectionCyclingProps = {
  images: { src: string; alt: string }[];
  name: string;
  href?: string;
  interval?: number;
};

export function GallerySectionCycling({
  images,
  name,
  href,
  interval = 3000,
}: GallerySectionCyclingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

  const goToPrev = useCallback(() => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isPaused]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden border-x"
      style={{ height: `calc(100svh - ${SMALL_HEADER_HEIGHT}px)` }}
    >
      {/* Image area */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
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
      </div>

      {/* Footer with nav controls */}
      <div className="border-border flex h-16 shrink-0 items-center justify-between border-t md:h-12">
        <div className="flex h-full items-center">
          <div className="border-border flex h-full divide-x border-r">
            <NavButton label="Previous" onClick={goToPrev}>
              <ChevronLeft className="h-5 w-5 md:h-4 md:w-4" />
            </NavButton>
            <NavButton label="Next" onClick={goToNext}>
              <ChevronRight className="h-5 w-5 md:h-4 md:w-4" />
            </NavButton>
          </div>
          <span className="text-muted-foreground pl-4 font-mono text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
        <div className="pr-4">
          {href ? (
            <Link
              className="text-foreground hover:text-muted-foreground flex items-center gap-1 font-mono text-sm transition-colors"
              href={href}
            >
              {name}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="text-foreground font-mono text-sm">{name}</span>
          )}
        </div>
      </div>
    </section>
  );
}
