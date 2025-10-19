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
  const strokeWidth = 1;
  const padding = strokeWidth / 2; // Account for stroke width

  // Calculate precise dimensions
  // Row 2 (number row) is the widest: 13 regular keys + 1.5x delete = 14.5 key widths
  // Width: 14.5 * keySize + 14 * keyGap + padding on both sides
  // Height: 6 rows * keySize + 5 * rowGap + padding on both sides
  const baseWidth = 14.5 * keySize + 14 * keyGap + padding * 2;
  const baseHeight = 6 * keySize + 5 * rowGap + padding * 2;

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
      strokeWidth={strokeWidth}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={transform}>
        {KEYBOARD_LAYOUT.rows.map((row, index) => (
          <Row
            key={index}
            keyGap={keyGap}
            keys={row.keys}
            keySize={keySize}
            rowGap={rowGap}
            rowIndex={index}
            startX={row.startX ?? padding}
            startY={padding}
          />
        ))}
      </g>
    </svg>
  );
}
