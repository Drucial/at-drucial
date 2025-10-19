type TextPlacement = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

type KeyProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  fontSize?: number;
  textPlacement?: TextPlacement;
};

function Key({
  x,
  y,
  width,
  height,
  label,
  fontSize = 10,
  textPlacement = "center",
}: KeyProps) {
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

  const textAnchor = textPlacement.includes("right") ? "end" : textPlacement.includes("left") ? "start" : "middle";

  return (
    <g>
      <rect height={height} rx="3" width={width} x={x} y={y} />
      <text
        fill="currentColor"
        fontSize={fontSize}
        textAnchor={textAnchor}
        x={textX}
        y={textY}
      >
        {label}
      </text>
    </g>
  );
}

export function Keyboard() {
  const keySize = 40;
  const keyGap = 4;
  const rowGap = 4;

  // Calculate arrow key width to align bottom row with other rows
  // Target right edge = 642 (matches delete key and right shift key)
  // First arrow starts at x position 506 (calculated from layout)
  // From 506 to 642 = 136 pixels to fill
  // Need to fit: arrow + gap + arrow + gap + arrow = 3 arrows + 2 gaps
  // So: 3*arrowWidth + 2*4 = 136
  // arrowWidth = (136 - 8) / 3 = 128/3 = 42.666...
  const arrowKeyWidth = (136 - 2 * keyGap) / 3;

  // Helper to render a row of uniform keys
  function renderKeyRow(
    labels: string[],
    startX: number,
    y: number,
    fontSize = 12
  ) {
    return labels.map((label, i) => (
      <Key
        key={label}
        fontSize={fontSize}
        height={keySize}
        label={label}
        width={keySize}
        x={startX + (keySize + keyGap) * i}
        y={y}
      />
    ));
  }

  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      viewBox="0 0 720 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Row 1 - ESC + Function Keys + Power */}
      <Key
        height={keySize}
        label="esc"
        width={keySize * 1.5}
        x={10}
        y={10}
      />

      {/* F1-F12 - uniform spacing */}
      {Array.from({ length: 12 }, (_, i) => (
        <Key
          key={`F${i + 1}`}
          height={keySize}
          label={`F${i + 1}`}
          width={keySize}
          x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * i}
          y={10}
        />
      ))}

      {/* Power button */}
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 12}
        y="10"
      />
      <circle
        cx={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 12 + keySize / 2}
        cy={10 + keySize / 2}
        fill="none"
        r="6"
        stroke="currentColor"
      />

      {/* Row 2 - Number row */}
      {renderKeyRow(
        ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
        10,
        10 + (keySize + rowGap)
      )}
      <Key
        height={keySize}
        label="delete"
        width={keySize * 1.5}
        x={10 + (keySize + keyGap) * 13}
        y={10 + (keySize + rowGap)}
      />

      {/* Row 3 - QWERTY */}
      <Key
        height={keySize}
        label="tab"
        width={keySize * 1.5}
        x={10}
        y={10 + (keySize + rowGap) * 2}
      />
      {renderKeyRow(
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
        10 + keySize * 1.5 + keyGap,
        10 + (keySize + rowGap) * 2
      )}

      {/* Row 4 - ASDF */}
      <Key
        fontSize={9}
        height={keySize}
        label="caps lock"
        width={keySize * 1.75}
        x={10}
        y={10 + (keySize + rowGap) * 3}
      />
      {renderKeyRow(
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
        10 + keySize * 1.75 + keyGap,
        10 + (keySize + rowGap) * 3
      )}
      <Key
        height={keySize}
        label="return"
        width={keySize * 1.85}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 11}
        y={10 + (keySize + rowGap) * 3}
      />

      {/* Row 5 - ZXCV */}
      <Key
        height={keySize}
        label="shift"
        width={keySize * 2.25}
        x={10}
        y={10 + (keySize + rowGap) * 4}
      />
      {renderKeyRow(
        ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
        10 + keySize * 2.25 + keyGap,
        10 + (keySize + rowGap) * 4
      )}
      <Key
        height={keySize}
        label="shift"
        width={keySize * 2.45}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 10}
        y={10 + (keySize + rowGap) * 4}
      />

      {/* Row 6 - Bottom row */}
      {renderKeyRow(["fn", "ctrl", "opt"], 10, 10 + (keySize + rowGap) * 5, 9)}
      <Key
        fontSize={9}
        height={keySize}
        label="cmd"
        width={keySize * 1.15}
        x={10 + (keySize + keyGap) * 3}
        y={10 + (keySize + rowGap) * 5}
      />
      {/* Spacebar */}
      <rect
        height={keySize}
        rx="3"
        width={keySize * 5.4}
        x={10 + (keySize + keyGap) * 3 + keySize * 1.15 + keyGap}
        y={10 + (keySize + rowGap) * 5}
      />
      <Key
        fontSize={9}
        height={keySize}
        label="cmd"
        width={keySize * 1.15}
        x={10 + (keySize + keyGap) * 3 + keySize * 1.15 + keyGap + keySize * 5.4 + keyGap}
        y={10 + (keySize + rowGap) * 5}
      />
      <Key
        fontSize={9}
        height={keySize}
        label="opt"
        width={keySize}
        y={10 + (keySize + rowGap) * 5}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap
        }
      />
      {/* Arrow keys */}
      {/* Left arrow - half height, aligned to bottom */}
      <rect
        height={keySize / 2}
        rx="3"
        width={arrowKeyWidth}
        y={10 + (keySize + rowGap) * 5 + keySize / 2}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap +
          (keySize + keyGap)
        }
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        y={10 + (keySize + rowGap) * 5 + keySize / 2 + keySize / 4 + 4}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap +
          (keySize + keyGap) +
          arrowKeyWidth / 2
        }
      >
        ←
      </text>
      {/* Up arrow - half height, aligned to top */}
      <rect
        height={keySize / 2}
        rx="3"
        width={arrowKeyWidth}
        y={10 + (keySize + rowGap) * 5}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap +
          (keySize + keyGap) +
          arrowKeyWidth +
          keyGap
        }
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        y={10 + (keySize + rowGap) * 5 + keySize / 4 + 4}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap +
          (keySize + keyGap) +
          arrowKeyWidth +
          keyGap +
          arrowKeyWidth / 2
        }
      >
        ↑
      </text>
      {/* Down arrow - half height, aligned to bottom */}
      <rect
        height={keySize / 2}
        rx="3"
        width={arrowKeyWidth}
        y={10 + (keySize + rowGap) * 5 + keySize / 2}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap +
          (keySize + keyGap) +
          arrowKeyWidth +
          keyGap
        }
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        y={10 + (keySize + rowGap) * 5 + keySize / 2 + keySize / 4 + 4}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap +
          (keySize + keyGap) +
          arrowKeyWidth +
          keyGap +
          arrowKeyWidth / 2
        }
      >
        ↓
      </text>
      {/* Right arrow - half height, aligned to bottom */}
      <rect
        height={keySize / 2}
        rx="3"
        width={arrowKeyWidth}
        y={10 + (keySize + rowGap) * 5 + keySize / 2}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap +
          (keySize + keyGap) +
          arrowKeyWidth +
          keyGap +
          arrowKeyWidth +
          keyGap
        }
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        y={10 + (keySize + rowGap) * 5 + keySize / 2 + keySize / 4 + 4}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap +
          (keySize + keyGap) +
          arrowKeyWidth +
          keyGap +
          arrowKeyWidth +
          keyGap +
          arrowKeyWidth / 2
        }
      >
        →
      </text>
    </svg>
  );
}
