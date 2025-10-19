"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import type { LucideIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
} from "motion/react";

export type NavLinkProps = {
  Icon: LucideIcon;
  label: string;
  href: string;
};

type Direction = "left" | "right" | "top" | "bottom";

export function NavLink({ Icon, label, href }: NavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Motion values for background position
  const bgX = useMotionValue<string>("0%");
  const bgY = useMotionValue<string>("-100%");

  // Animation controls for the icon flip
  const plusCtrl = useAnimationControls();
  const iconCtrl = useAnimationControls();

  // Keep a ref to cancel pending timers/animations
  const rafRef = useRef<number | null>(null);

  const placeOffscreen = (dir: Direction) => {
    switch (dir) {
      case "left":
        bgX.set("-100%");
        bgY.set("0%");
        break;
      case "right":
        bgX.set("100%");
        bgY.set("0%");
        break;
      case "top":
        bgX.set("0%");
        bgY.set("-100%");
        break;
      case "bottom":
        bgX.set("0%");
        bgY.set("100%");
        break;
    }
  };

  const getDirection = (e: React.MouseEvent<HTMLAnchorElement>): Direction => {
    if (!linkRef.current) return "left";
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const d = {
      left: x,
      right: rect.width - x,
      top: y,
      bottom: rect.height - y,
    } as const;
    let minKey: Direction = "left";
    let min = d.left;
    (Object.keys(d) as Direction[]).forEach((k) => {
      if (d[k] < min) {
        min = d[k];
        minKey = k;
      }
    });

    return minKey;
  };

  const clearPending = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    clearPending();
    const dir = getDirection(e);
    // 1) Instantly place background offscreen according to entry dir
    placeOffscreen(dir);
    // 2) Buffer two frames before animating in to guarantee layout flush
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        animate(bgX, "0%", { duration: 0.3, ease: "easeInOut" });
        animate(bgY, "0%", { duration: 0.3, ease: "easeInOut" });
        plusCtrl.start({
          rotateX: 90,
          opacity: 0,
          transition: { duration: 0.4, ease: "easeInOut" },
        });
        iconCtrl.start({
          rotateX: 0,
          opacity: 1,
          transition: { duration: 0.4, ease: "easeInOut" },
        });
      });
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    clearPending();
    const dir = getDirection(e);
    // Animate out toward the exit edge
    let toX = "0%";
    let toY = "0%";
    switch (dir) {
      case "left":
        toX = "-100%";
        break;
      case "right":
        toX = "100%";
        break;
      case "top":
        toY = "-100%";
        break;
      case "bottom":
        toY = "100%";
        break;
    }
    animate(bgX, toX, { duration: 0.3, ease: "easeInOut" });
    animate(bgY, toY, { duration: 0.3, ease: "easeInOut" });
    plusCtrl.start({
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    });
    iconCtrl.start({
      rotateX: -90,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  };

  useEffect(() => () => clearPending(), []);

  return (
    <Link
      ref={linkRef}
      className="relative flex aspect-square h-full shrink-0 items-center justify-center overflow-hidden px-4"
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="bg-muted absolute inset-0"
        style={{ translateX: bgX, translateY: bgY }}
      />

      <div className="relative size-8" style={{ perspective: "800px" }}>
        <motion.div
          animate={plusCtrl}
          className="absolute inset-0"
          initial={{ rotateX: 0, opacity: 1 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <PlusIcon className="text-muted-foreground size-6 stroke-1" />
        </motion.div>
        <motion.div
          animate={iconCtrl}
          className="absolute inset-0"
          initial={{ rotateX: -90, opacity: 0 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Icon className="text-muted-foreground size-6 stroke-1" />
        </motion.div>
      </div>
      <span className="sr-only">{label}</span>
    </Link>
  );
}
