import { useEffect, useRef } from "react";
import { animate, useMotionValue } from "motion/react";

type Direction = "left" | "right" | "top" | "bottom";

export interface UseDirectionalHoverOptions {
  /**
   * Duration of the background animation in seconds
   * @default 0.3
   */
  duration?: number;
  /**
   * Easing function for the animation
   * @default "easeInOut"
   */
  ease?: string;
}

export function useDirectionalHover<T extends HTMLElement>(
  options: UseDirectionalHoverOptions = {},
) {
  const { duration = 0.3, ease = "easeInOut" } = options;

  const elementRef = useRef<T>(null);
  const rafRef = useRef<number | null>(null);

  // Motion values for background position
  const bgX = useMotionValue<string>("0%");
  const bgY = useMotionValue<string>("-100%");

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

  const getDirection = (e: React.MouseEvent<T>): Direction => {
    if (!elementRef.current) return "left";
    const rect = elementRef.current.getBoundingClientRect();
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

  const handleMouseEnter = (e: React.MouseEvent<T>) => {
    clearPending();
    const dir = getDirection(e);
    // 1) Instantly place background offscreen according to entry dir
    placeOffscreen(dir);
    // 2) Buffer two frames before animating in to guarantee layout flush
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        animate(bgX, "0%", { duration, ease });
        animate(bgY, "0%", { duration, ease });
      });
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<T>) => {
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
    animate(bgX, toX, { duration, ease });
    animate(bgY, toY, { duration, ease });
  };

  useEffect(() => () => clearPending(), []);

  return {
    ref: elementRef,
    bgX,
    bgY,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
