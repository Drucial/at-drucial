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
    <g>
      <rect height={height} rx="3" width={width} x={x} y={y} />
      {hasLabel && (
        <text
          fill="currentColor"
          fontSize={fontSize}
          textAnchor={textAnchor}
          x={textX}
          y={textY}
        >
          {label}
        </text>
      )}
    </g>
  );
}
