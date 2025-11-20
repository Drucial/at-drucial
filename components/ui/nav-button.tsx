"use client";

import { motion } from "motion/react";

import { useDirectionalHover } from "@/hooks/use-directional-hover";

export type NavButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
};

export function NavButton({
  onClick,
  children,
  label,
  disabled,
}: NavButtonProps) {
  const { ref, bgX, bgY, handlers } = useDirectionalHover<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      className="relative flex aspect-square h-full items-center justify-center overflow-hidden disabled:opacity-30"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
    >
      <motion.div
        className="bg-muted absolute inset-0"
        style={{ translateX: bgX, translateY: bgY }}
      />
      <span className="relative">{children}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
