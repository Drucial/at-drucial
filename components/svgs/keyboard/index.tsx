"use client";

import { KEYBOARD_LAYOUT } from "./keys";
import { Row } from "./row";

type KeyboardProps = {
  orientation?: "horizontal" | "vertical";
  direction?: "left" | "right"; // Only applies when orientation is "vertical"
  size?: number;
  className?: string;
};

export function Keyboard({
  orientation = "horizontal",
  direction = "right",
  size = 40,
  className,
}: KeyboardProps) {
  const keySize = size;
  const keyGap = size * 0.1; // 10% of key size
  const rowGap = size * 0.1;
  const padding = 0;

  // Calculate precise dimensions
  // Row 2 (number row) is the widest: 13 regular keys + 1.5x delete = 14.5 key widths
  // Width: 14.5 * keySize + 14 * keyGap
  // Height: 6 rows * keySize + 5 * rowGap
  const baseWidth = 14.5 * keySize + 14 * keyGap;
  const baseHeight = 6 * keySize + 5 * rowGap;

  // Swap dimensions for vertical orientation
  const width = orientation === "vertical" ? baseHeight : baseWidth;
  const height = orientation === "vertical" ? baseWidth : baseHeight;

  // Calculate rotation transform for vertical orientation
  // direction="right" rotates 90° clockwise (function keys on right)
  // direction="left" rotates -90° counter-clockwise (function keys on left)
  const transform =
    orientation === "vertical"
      ? direction === "right"
        ? `rotate(90 ${baseWidth / 2} ${baseHeight / 2}) translate(${(baseWidth - baseHeight) / 2} ${-(baseHeight - baseWidth) / 2})`
        : `rotate(-90 ${baseWidth / 2} ${baseHeight / 2}) translate(${(baseWidth - baseHeight) / 2} ${(baseHeight - baseWidth) / 2})`
      : undefined;

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      viewBox={`${padding} ${padding} ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="stroke-muted text-muted" transform={transform}>
        {KEYBOARD_LAYOUT.rows.map((row, index) => (
          <Row
            key={index}
            keyGap={keyGap}
            keys={row.keys}
            keySize={keySize}
            rowGap={rowGap}
            rowIndex={index}
            startX={row.startX ?? padding}
          />
        ))}
      </g>
    </svg>
  );
}
