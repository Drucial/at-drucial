"use client";

import Link from "next/link";

import { motion, useScroll, useTransform } from "motion/react";

import { useViewport } from "@/components/providers/viewport-provider";
import { Separator } from "@/components/ui/separator";

import { Logo } from "./animated-logo";
import { Nav } from "./nav";

export const HEADER_HEIGHT = 128;
export const SMALL_HEADER_HEIGHT = 64;

const SCROLL_THRESHOLD = 200; // Scroll distance to reach smallest height

export function Header() {
  const { scrollY } = useScroll();
  const { isMobile } = useViewport();

  // Interpolate header height based on scroll position (desktop only)
  const headerHeight = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    [HEADER_HEIGHT, SMALL_HEADER_HEIGHT]
  );

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="bg-background sticky top-0 z-50 flex w-screen items-center justify-between overflow-hidden border-x border-y pl-4 md:pl-6"
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        height: isMobile ? SMALL_HEADER_HEIGHT : headerHeight,
      }}
    >
      <Link href="/">
        <Logo />
        <span className="sr-only">Home</span>
      </Link>
      <Separator className="ml-auto h-full w-px" orientation="vertical" />
      <Nav />
    </motion.header>
  );
}
