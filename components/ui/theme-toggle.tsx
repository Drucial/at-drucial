"use client";

import { useCallback, useRef } from "react";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

import { useDirectionalHover } from "@/hooks/use-directional-hover";
import { useIconFlip } from "@/hooks/use-icon-flip";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const isLight = theme === "light";

  // Track transition state to prevent hover animation conflicts during view transition
  const isTransitioning = useRef(false);

  const { ref, bgX, bgY, handlers } = useDirectionalHover<HTMLButtonElement>();
  const { icon1Controls, icon2Controls, icon1Initial, icon2Initial } =
    useIconFlip(isLight);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // Prevent multiple clicks and hover interference during transition
      if (isTransitioning.current) return;

      isTransitioning.current = true;

      // Calculate button center position for radial animation origin
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Convert pixel coordinates to viewport percentages for clip-path
      const xPercent = (x / window.innerWidth) * 100;
      const yPercent = (y / window.innerHeight) * 100;

      // Dynamically inject animation CSS for this specific transition
      // Using unique ID to prevent conflicts with rapid theme toggles
      const styleId = `theme-transition-${Date.now()}`;
      const style = document.createElement("style");
      style.id = styleId;

      // View Transition API animation: circle expands from button with blur effect
      const css = `
      @supports (view-transition-name: root) {
        ::view-transition-old(root) {
          animation: none;
        }
        ::view-transition-new(root) {
          animation: circle-blur-expand 0.8s ease-out;
          filter: blur(0);
        }
        @keyframes circle-blur-expand {
          from {
            clip-path: circle(0% at ${xPercent}% ${yPercent}%);
            filter: blur(10px);
          }
          to {
            clip-path: circle(150% at ${xPercent}% ${yPercent}%);
            filter: blur(0);
          }
        }
      }
    `;

      style.textContent = css;
      document.head.appendChild(style);

      // Clean up injected styles after sufficient time has passed
      setTimeout(() => {
        const styleEl = document.getElementById(styleId);
        if (styleEl) {
          styleEl.remove();
        }
      }, 3000);

      // Use View Transition API if supported, otherwise fall back to instant change
      if ("startViewTransition" in document) {
        (
          document as Document & {
            startViewTransition: (callback: () => void) => void;
          }
        ).startViewTransition(() => {
          setTheme(isLight ? "dark" : "light");
        });
      } else {
        setTheme(isLight ? "dark" : "light");
      }

      // Re-enable interactions after animation + buffer time
      // Buffer prevents DOM re-render from re-triggering hover state
      setTimeout(() => {
        isTransitioning.current = false;
      }, 1000);
    },
    [isLight, setTheme]
  );

  // Wrap hover handlers to prevent interference during view transition
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isTransitioning.current) {
        handlers.onMouseEnter(e);
      }
    },
    [handlers]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isTransitioning.current) {
        handlers.onMouseLeave(e);
      }
    },
    [handlers]
  );

  return (
    <button
      ref={ref}
      className="relative flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center overflow-hidden px-4"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="bg-muted absolute inset-0"
        style={{ translateX: bgX, translateY: bgY }}
      />

      <div className="relative size-8" style={{ perspective: "800px" }}>
        <motion.div
          animate={icon1Controls}
          className="absolute inset-0 flex items-center justify-center"
          initial={icon1Initial}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Sun className="text-muted-foreground size-6 stroke-1" />
        </motion.div>
        <motion.div
          animate={icon2Controls}
          className="absolute inset-0 flex items-center justify-center"
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
