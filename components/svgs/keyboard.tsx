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

  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      viewBox="0 0 720 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Row 1 - ESC + Function Keys + Power */}
      {/* ESC - wider, ends at center of 1 key */}
      <rect height={keySize} rx="3" width={keySize * 1.5} x="10" y="10" />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + (keySize * 1.5) / 2}
        y={10 + keySize / 2 + 4}
      >
        esc
      </text>

      {/* F1-F12 - uniform spacing */}
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F1
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap)}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F2
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 2}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 2 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F3
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 3}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 3 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F4
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 4}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 4 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F5
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 5}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 5 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F6
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 6}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 6 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F7
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 7}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 7 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F8
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 8}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 8 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F9
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 9}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 9 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F10
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 10}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 10 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F11
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 11}
        y="10"
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 11 + keySize / 2}
        y={10 + keySize / 2 + 4}
      >
        F12
      </text>

      {/* Power button - same gap as other keys */}
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
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x="10"
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        `
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap)}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        1
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 2}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 2 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        2
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 3}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 3 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        3
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 4}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 4 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        4
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 5}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 5 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        5
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 6}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 6 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        6
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 7}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 7 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        7
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 8}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 8 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        8
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 9}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 9 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        9
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 10}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 10 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        0
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 11}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 11 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        -
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 12}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 12 + keySize / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        =
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize * 1.5}
        x={10 + (keySize + keyGap) * 13}
        y={10 + (keySize + rowGap)}
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 13 + (keySize * 1.5) / 2}
        y={10 + (keySize + rowGap) + keySize / 2 + 4}
      >
        delete
      </text>

      {/* Row 3 - QWERTY */}
      {/* Tab - wider */}
      <rect
        height={keySize}
        rx="3"
        width={keySize * 1.5}
        x="10"
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + (keySize * 1.5) / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        tab
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        Q
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap)}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        W
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 2}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 2 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        E
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 3}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 3 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        R
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 4}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 4 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        T
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 5}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 5 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        Y
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 6}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 6 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        U
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 7}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 7 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        I
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 8}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 8 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        O
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 9}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 9 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        P
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 10}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 10 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        [
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 11}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 11 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        ]
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 12}
        y={10 + (keySize + rowGap) * 2}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.5 + keyGap + (keySize + keyGap) * 12 + keySize / 2}
        y={10 + (keySize + rowGap) * 2 + keySize / 2 + 4}
      >
        \
      </text>

      {/* Row 4 - ASDF */}
      <rect
        height={keySize}
        rx="3"
        width={keySize * 1.75}
        x="10"
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="9"
        textAnchor="middle"
        x={10 + (keySize * 1.75) / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 3}
      >
        caps lock
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        A
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap)}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        S
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 2}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 2 + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        D
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 3}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 3 + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        F
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 4}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 4 + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        G
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 5}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 5 + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        H
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 6}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 6 + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        J
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 7}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 7 + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        K
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 8}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 8 + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        L
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 9}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 9 + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        ;
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 10}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 10 + keySize / 2}
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
      >
        &apos;
      </text>
      {/* Return - wider to align with rightmost edge */}
      <rect
        height={keySize}
        rx="3"
        width={keySize * 1.85}
        x={10 + keySize * 1.75 + keyGap + (keySize + keyGap) * 11}
        y={10 + (keySize + rowGap) * 3}
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        y={10 + (keySize + rowGap) * 3 + keySize / 2 + 4}
        x={
          10 +
          keySize * 1.75 +
          keyGap +
          (keySize + keyGap) * 11 +
          (keySize * 1.85) / 2
        }
      >
        return
      </text>

      {/* Row 5 - ZXCV */}
      {/* Shift - wider */}
      <rect
        height={keySize}
        rx="3"
        width={keySize * 2.25}
        x="10"
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        x={10 + (keySize * 2.25) / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        shift
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        Z
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap)}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        X
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 2}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 2 + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        C
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 3}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 3 + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        V
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 4}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 4 + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        B
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 5}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 5 + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        N
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 6}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 6 + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        M
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 7}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 7 + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        ,
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 8}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 8 + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        .
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 9}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="12"
        textAnchor="middle"
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 9 + keySize / 2}
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
      >
        /
      </text>
      {/* Right Shift - wider to align with rightmost edge */}
      <rect
        height={keySize}
        rx="3"
        width={keySize * 2.45}
        x={10 + keySize * 2.25 + keyGap + (keySize + keyGap) * 10}
        y={10 + (keySize + rowGap) * 4}
      />
      <text
        fill="currentColor"
        fontSize="10"
        textAnchor="middle"
        y={10 + (keySize + rowGap) * 4 + keySize / 2 + 4}
        x={
          10 +
          keySize * 2.25 +
          keyGap +
          (keySize + keyGap) * 10 +
          (keySize * 2.45) / 2
        }
      >
        shift
      </text>

      {/* Row 6 - Bottom row */}
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x="10"
        y={10 + (keySize + rowGap) * 5}
      />
      <text
        fill="currentColor"
        fontSize="9"
        textAnchor="middle"
        x={10 + keySize / 2}
        y={10 + (keySize + rowGap) * 5 + keySize / 2 + 3}
      >
        fn
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap)}
        y={10 + (keySize + rowGap) * 5}
      />
      <text
        fill="currentColor"
        fontSize="9"
        textAnchor="middle"
        x={10 + (keySize + keyGap) + keySize / 2}
        y={10 + (keySize + rowGap) * 5 + keySize / 2 + 3}
      >
        ctrl
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize}
        x={10 + (keySize + keyGap) * 2}
        y={10 + (keySize + rowGap) * 5}
      />
      <text
        fill="currentColor"
        fontSize="9"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 2 + keySize / 2}
        y={10 + (keySize + rowGap) * 5 + keySize / 2 + 3}
      >
        opt
      </text>
      <rect
        height={keySize}
        rx="3"
        width={keySize * 1.15}
        x={10 + (keySize + keyGap) * 3}
        y={10 + (keySize + rowGap) * 5}
      />
      <text
        fill="currentColor"
        fontSize="9"
        textAnchor="middle"
        x={10 + (keySize + keyGap) * 3 + (keySize * 1.15) / 2}
        y={10 + (keySize + rowGap) * 5 + keySize / 2 + 3}
      >
        cmd
      </text>
      {/* Spacebar - very wide */}
      <rect
        height={keySize}
        rx="3"
        width={keySize * 5.4}
        x={10 + (keySize + keyGap) * 3 + keySize * 1.15 + keyGap}
        y={10 + (keySize + rowGap) * 5}
      />
      <rect
        height={keySize}
        rx="3"
        width={keySize * 1.15}
        y={10 + (keySize + rowGap) * 5}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap
        }
      />
      <text
        fill="currentColor"
        fontSize="9"
        textAnchor="middle"
        y={10 + (keySize + rowGap) * 5 + keySize / 2 + 3}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          (keySize * 1.15) / 2
        }
      >
        cmd
      </text>
      <rect
        height={keySize}
        rx="3"
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
      <text
        fill="currentColor"
        fontSize="9"
        textAnchor="middle"
        y={10 + (keySize + rowGap) * 5 + keySize / 2 + 3}
        x={
          10 +
          (keySize + keyGap) * 3 +
          keySize * 1.15 +
          keyGap +
          keySize * 5.4 +
          keyGap +
          keySize * 1.15 +
          keyGap +
          keySize / 2
        }
      >
        opt
      </text>
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
