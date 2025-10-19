type KeyProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  fontSize?: number;
};

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

  // Helper function to render a key with label
  function renderKey({
    x,
    y,
    width,
    height,
    label,
    fontSize = 10,
    key,
  }: KeyProps & { key?: string }) {
    return (
      <g key={key}>
        <rect height={height} rx="3" width={width} x={x} y={y} />
        <text
          fill="currentColor"
          fontSize={fontSize}
          textAnchor="middle"
          x={x + width / 2}
          y={y + height / 2 + 4}
        >
          {label}
        </text>
      </g>
    );
  }

  // Helper to render a row of uniform keys
  function renderKeyRow(
    labels: string[],
    startX: number,
    y: number,
    fontSize = 12
  ) {
    return labels.map((label, i) =>
      renderKey({
        x: startX + (keySize + keyGap) * i,
        y,
        width: keySize,
        height: keySize,
        label,
        fontSize,
        key: label,
      })
    );
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
      {renderKey({
        x: 10,
        y: 10,
        width: keySize * 1.5,
        height: keySize,
        label: "esc",
      })}

      {/* F1-F12 - uniform spacing */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = 10 + keySize * 1.5 + keyGap + (keySize + keyGap) * i;

        return renderKey({
          x,
          y: 10,
          width: keySize,
          height: keySize,
          label: `F${i + 1}`,
          key: `F${i + 1}`,
        });
      })}

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
      {renderKey({
        x: 10 + (keySize + keyGap) * 13,
        y: 10 + (keySize + rowGap),
        width: keySize * 1.5,
        height: keySize,
        label: "delete",
      })}

      {/* Row 3 - QWERTY */}
      {renderKey({
        x: 10,
        y: 10 + (keySize + rowGap) * 2,
        width: keySize * 1.5,
        height: keySize,
        label: "tab",
      })}
      {renderKeyRow(
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
        10 + keySize * 1.5 + keyGap,
        10 + (keySize + rowGap) * 2
      )}

      {/* Row 4 - ASDF */}
      {renderKey({
        x: 10,
        y: 10 + (keySize + rowGap) * 3,
        width: keySize * 1.75,
        height: keySize,
        label: "caps lock",
        fontSize: 9,
      })}
      {renderKeyRow(
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
        10 + keySize * 1.75 + keyGap,
        10 + (keySize + rowGap) * 3
      )}
      {renderKey({
        x: 10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 11,
        y: 10 + (keySize + rowGap) * 3,
        width: keySize * 1.85,
        height: keySize,
        label: "return",
      })}

      {/* Row 5 - ZXCV */}
      {renderKey({
        x: 10,
        y: 10 + (keySize + rowGap) * 4,
        width: keySize * 2.25,
        height: keySize,
        label: "shift",
      })}
      {renderKeyRow(
        ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
        10 + keySize * 2.25 + keyGap,
        10 + (keySize + rowGap) * 4
      )}
      {renderKey({
        x: 10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 10,
        y: 10 + (keySize + rowGap) * 4,
        width: keySize * 2.45,
        height: keySize,
        label: "shift",
      })}

      {/* Row 6 - Bottom row */}
      {renderKeyRow(["fn", "ctrl", "opt"], 10, 10 + (keySize + rowGap) * 5, 9)}
      {renderKey({
        x: 10 + (keySize + keyGap) * 3,
        y: 10 + (keySize + rowGap) * 5,
        width: keySize * 1.15,
        height: keySize,
        label: "cmd",
        fontSize: 9,
      })}
      {/* Spacebar */}
      <rect
        height={keySize}
        rx="3"
        width={keySize * 5.4}
        x={10 + (keySize + keyGap) * 3 + keySize * 1.15 + keyGap}
        y={10 + (keySize + rowGap) * 5}
      />
      {renderKey({
        x: 10 + (keySize + keyGap) * 3 + keySize * 1.15 + keyGap + keySize * 5.4 + keyGap,
        y: 10 + (keySize + rowGap) * 5,
        width: keySize * 1.15,
        height: keySize,
        label: "cmd",
        fontSize: 9,
      })}
      {renderKey({
        x:
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap,
        y: 10 + (keySize + rowGap) * 5,
        width: keySize,
        height: keySize,
        label: "opt",
        fontSize: 9,
      })}
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
