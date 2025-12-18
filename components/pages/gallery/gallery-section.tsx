"use client";

import { useRef } from "react";
import Image from "next/image";

import { motion, useScroll, useTransform } from "motion/react";

import { HEADER_HEIGHT, SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { useViewport } from "@/components/providers/viewport-provider";

type GallerySectionProps = {
  imageSrc: string;
  imageAlt: string;
  isFirst?: boolean;
};

export function GallerySection({
  imageSrc,
  imageAlt,
  isFirst = false,
}: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
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

  // For first section, match TheAlchemist's height calculation
  const sectionHeight = isFirst
    ? isMobile
      ? `calc(100svh - ${SMALL_HEADER_HEIGHT}px)`
      : `calc(100svh - ${HEADER_HEIGHT}px)`
    : `calc(100svh - ${SMALL_HEADER_HEIGHT}px)`;

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden border-x"
      style={{ height: sectionHeight }}
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
        {/* Grid lines */}
        <motion.div
          className="bg-border absolute top-0 left-1/2 h-px w-screen -translate-x-1/2"
          style={{ scaleX: lineScaleX }}
        />
        <motion.div
          className="bg-border absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2"
          style={{ scaleX: lineScaleX }}
        />
        <motion.div
          className="bg-border absolute top-1/2 left-0 h-screen w-px -translate-y-1/2"
          style={{ scaleY: lineScaleY }}
        />
        <motion.div
          className="bg-border absolute top-1/2 right-0 h-screen w-px -translate-y-1/2"
          style={{ scaleY: lineScaleY }}
        />

        <Image
          alt={imageAlt}
          className="h-auto w-full"
          height={800}
          priority={isFirst}
          src={imageSrc}
          width={1200}
        />
      </motion.div>
    </section>
  );
}
