"use client";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

import { useDirectionalHover } from "@/hooks/use-directional-hover";
import { useIconFlip } from "@/hooks/use-icon-flip";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const isLight = theme === "light";

  const { ref, bgX, bgY, handlers } = useDirectionalHover<HTMLButtonElement>();
  const { icon1Controls, icon2Controls, icon1Initial, icon2Initial } =
    useIconFlip(isLight);

  return (
    <button
      ref={ref}
      className="relative flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center overflow-hidden px-4"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
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
          <Sun className="text-muted-foreground size-6 stroke-1" />
        </motion.div>
        <motion.div
          animate={icon2Controls}
          className="absolute inset-0"
          initial={icon2Initial}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Moon className="text-muted-foreground size-6 stroke-1" />
        </motion.div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
