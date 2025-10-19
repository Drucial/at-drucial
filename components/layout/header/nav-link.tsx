"use client";

import { useState } from "react";
import Link from "next/link";

import type { LucideIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { motion } from "motion/react";

export type NavLinkProps = {
  Icon: LucideIcon;
  label: string;
  href: string;
};
export function NavLink({ Icon, label, href }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      className="hover:bg-muted flex aspect-square h-full shrink-0 items-center justify-center px-4 transition-colors duration-300"
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative size-8">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.8 : 1,
            rotate: isHovered ? 90 : 0,
          }}
        >
          <PlusIcon className="text-muted-foreground size-8 stroke-1" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
            rotate: isHovered ? 0 : -90,
          }}
        >
          <Icon className="text-muted-foreground size-8 stroke-1" />
        </motion.div>
      </div>
      <span className="sr-only">{label}</span>
    </Link>
  );
}
