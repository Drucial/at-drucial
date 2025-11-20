"use client";

import { useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

export type MagnifiableAreaProps = {
  children: React.ReactNode;
  magnifiedContent: React.ReactNode;
};

export function MagnifiableArea({
  children,
  magnifiedContent,
}: MagnifiableAreaProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [areaWidth, setAreaWidth] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  const LENS_SIZE = 210;
  const scale = 1.3;

  // Magnified content position inside lens
  const magnifiedX = useTransform(lensX, (v) => LENS_SIZE / 2 - v * scale);
  const magnifiedY = useTransform(lensY, (v) => LENS_SIZE / 2 - v * scale);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setAreaWidth(areaRef.current.offsetWidth);
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div
      ref={areaRef}
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Base content - always visible */}
      {children}

      {/* Magnified lens effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="bg-foreground border-background/20 pointer-events-none absolute overflow-hidden rounded-full border-2"
            exit={{ scale: 0, opacity: 0 }}
            initial={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lensX,
              top: lensY,
              x: "-50%",
              y: "-50%",
              transformOrigin: "center center",
            }}
          >
            {/* Magnified content inside lens */}
            <motion.div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                x: magnifiedX,
                y: magnifiedY,
                scale: scale,
                transformOrigin: "top left",
                width: areaWidth,
              }}
            >
              {magnifiedContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
