"use client";

import { useState } from "react";

import { motion } from "motion/react";

type TextPlacement =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type KeyProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string | null;
  fontSize?: number;
  textPlacement?: TextPlacement;
};

export function Key({
  x,
  y,
  width,
  height,
  label,
  fontSize = 10,
  textPlacement = "center",
}: KeyProps) {
  const [hasBeenHovered, setHasBeenHovered] = useState(false);
  const hasLabel = label !== undefined && label !== null && label !== "";

  // Calculate text position based on placement
  let textX = x + width / 2;
  let textY = y + height / 2 + 4;

  switch (textPlacement) {
    case "top-left":
      textX = x + 8;
      textY = y + fontSize + 4;
      break;
    case "top-right":
      textX = x + width - 8;
      textY = y + fontSize + 4;
      break;
    case "bottom-left":
      textX = x + 8;
      textY = y + height - 6;
      break;
    case "bottom-right":
      textX = x + width - 8;
      textY = y + height - 6;
      break;
    case "center":
    default:
      textX = x + width / 2;
      textY = y + height / 2 + 4;
      break;
  }

  const textAnchor = textPlacement.includes("right")
    ? "end"
    : textPlacement.includes("left")
      ? "start"
      : "middle";

  return (
    <motion.g
      className="group cursor-pointer"
      whileHover="hover"
      onMouseEnter={() => setHasBeenHovered(true)}
    >
      {/* Base key with transparent fill to catch mouse events */}
      <rect
        className="stroke-muted fill-transparent"
        fill="none"
        height={height}
        rx="3"
        width={width}
        x={x}
        y={y}
      />
      {/* Animated hover fill */}
      <motion.rect
        className="fill-foreground stroke-muted pointer-events-none"
        height={height}
        initial={{ opacity: 0, scale: 0.5 }}
        rx="3"
        style={{ transformOrigin: `${x + width / 2}px ${y + height / 2}px` }}
        width={width}
        x={x}
        y={y}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        variants={{
          hover: { opacity: 0.1, scale: 1 },
        }}
      />
      {hasLabel && (
        <motion.text
          animate={{ opacity: hasBeenHovered ? 1 : 0 }}
          className="fill-muted-foreground/50 pointer-events-none select-none"
          fontSize={fontSize}
          initial={{ opacity: 0 }}
          textAnchor={textAnchor}
          transition={{ duration: 0.2 }}
          x={textX}
          y={textY}
          variants={{
            hover: { fill: "oklch(var(--background))" },
          }}
        >
          {label}
        </motion.text>
      )}
    </motion.g>
  );
}
