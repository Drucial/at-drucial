"use client";

import { useState } from "react";
import Link from "next/link";

import type { LucideIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { motion } from "motion/react";

import { useDirectionalHover } from "@/hooks/use-directional-hover";
import { useIconFlip } from "@/hooks/use-icon-flip";

export type NavLinkProps = {
  Icon: LucideIcon;
  label: string;
  href: string;
};

export function NavLink({ Icon, label, href }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { ref, bgX, bgY, handlers } = useDirectionalHover<HTMLAnchorElement>();
  const { icon1Controls, icon2Controls, icon1Initial, icon2Initial } =
    useIconFlip(!isHovered);

  return (
    <Link
      ref={ref}
      className="relative flex aspect-square h-full shrink-0 items-center justify-center overflow-hidden px-4"
      href={href}
      onMouseEnter={(e) => {
        setIsHovered(true);
        handlers.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        handlers.onMouseLeave(e);
      }}
    >
      <motion.div
        className="bg-muted absolute inset-0"
        style={{ translateX: bgX, translateY: bgY }}
      />

      <div className="relative size-8" style={{ perspective: "800px" }}>
        <motion.div
          animate={icon1Controls}
          className="absolute inset-0"
          initial={icon1Initial}
          style={{ transformStyle: "preserve-3d" }}
        >
          <PlusIcon className="text-muted-foreground size-6 stroke-1" />
        </motion.div>
        <motion.div
          animate={icon2Controls}
          className="absolute inset-0"
          initial={icon2Initial}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Icon className="text-muted-foreground size-6 stroke-1" />
        </motion.div>
      </div>
      <span className="sr-only">{label}</span>
    </Link>
  );
}
