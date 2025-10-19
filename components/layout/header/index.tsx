"use client";

import { motion, useScroll, useTransform } from "motion/react";

import { Logo } from "./animated-logo";
import { Nav } from "./nav";

export const HEADER_HEIGHT = 128;
export const SMALL_HEADER_HEIGHT = 64;

const SCROLL_THRESHOLD = 200; // Scroll distance to reach smallest height

export function Header() {
  const { scrollY } = useScroll();

  // Interpolate header height based on scroll position
  const headerHeight = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    [HEADER_HEIGHT, SMALL_HEADER_HEIGHT]
  );

  return (
    <motion.header
      className="bg-background sticky top-0 z-50 grid grid-cols-12 gap-x-8 border-b"
      style={{ height: headerHeight }}
    >
      <div className="col-span-6 flex items-center px-6 md:col-span-6 md:px-8">
        <Logo />
      </div>
      <div className="col-span-6 flex items-center justify-end md:col-span-6">
        <Nav />
      </div>
    </motion.header>
  );
}
