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
          width: "70vw",
          maxWidth: "1200px",
          translateY: imageY,
        }}
      >
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
