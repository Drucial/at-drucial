type TextPlacement =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type KeyConfig = {
  label?: string | null;
  widthMultiplier: number;
  heightMultiplier?: number;
  fontSize?: number;
  textPlacement?: TextPlacement;
  yOffset?: number; // Offset from row baseline (in pixels or as fraction of keySize)
  xOffset?: number; // Offset from calculated position (in pixels or as fraction of keySize)
};

type RowConfig = {
  keys: KeyConfig[];
  startX?: number; // Optional custom start position
};

export type KeyboardLayout = {
  rows: RowConfig[];
};

export const KEYBOARD_LAYOUT: KeyboardLayout = {
  rows: [
    // Row 1 - ESC + Function Keys + Power
    {
      keys: [
        {
          label: "esc",
          widthMultiplier: 1.5,
          textPlacement: "bottom-left",
          fontSize: 8,
        },
        { label: "F1", widthMultiplier: 1 },
        { label: "F2", widthMultiplier: 1 },
        { label: "F3", widthMultiplier: 1 },
        { label: "F4", widthMultiplier: 1 },
        { label: "F5", widthMultiplier: 1 },
        { label: "F6", widthMultiplier: 1 },
        { label: "F7", widthMultiplier: 1 },
        { label: "F8", widthMultiplier: 1 },
        { label: "F9", widthMultiplier: 1 },
        { label: "F10", widthMultiplier: 1 },
        { label: "F11", widthMultiplier: 1 },
        { label: "F12", widthMultiplier: 1 },
        { label: null, widthMultiplier: 1 },
      ],
    },
    // Row 2 - Number row
    {
      keys: [
        { label: "`", widthMultiplier: 1, fontSize: 14 },
        { label: "1", widthMultiplier: 1 },
        { label: "2", widthMultiplier: 1 },
        { label: "3", widthMultiplier: 1 },
        { label: "4", widthMultiplier: 1 },
        { label: "5", widthMultiplier: 1 },
        { label: "6", widthMultiplier: 1 },
        { label: "7", widthMultiplier: 1 },
        { label: "8", widthMultiplier: 1 },
        { label: "9", widthMultiplier: 1 },
        { label: "0", widthMultiplier: 1 },
        { label: "-", widthMultiplier: 1 },
        { label: "=", widthMultiplier: 1 },
        {
          label: "delete",
          widthMultiplier: 1.5,
          textPlacement: "bottom-right",
          fontSize: 8,
        },
      ],
    },
    // Row 3 - QWERTY
    {
      keys: [
        {
          label: "tab",
          widthMultiplier: 1.5,
          textPlacement: "bottom-left",
          fontSize: 8,
        },
        { label: "Q", widthMultiplier: 1 },
        { label: "W", widthMultiplier: 1 },
        { label: "E", widthMultiplier: 1 },
        { label: "R", widthMultiplier: 1 },
        { label: "T", widthMultiplier: 1 },
        { label: "Y", widthMultiplier: 1 },
        { label: "U", widthMultiplier: 1 },
        { label: "I", widthMultiplier: 1 },
        { label: "O", widthMultiplier: 1 },
        { label: "P", widthMultiplier: 1 },
        { label: "[", widthMultiplier: 1 },
        { label: "]", widthMultiplier: 1 },
        { label: "\\", widthMultiplier: 1 },
      ],
    },
    // Row 4 - ASDF
    {
      keys: [
        {
          label: "caps lock",
          widthMultiplier: 1.75,
          textPlacement: "bottom-left",
          fontSize: 7,
        },
        { label: "A", widthMultiplier: 1 },
        { label: "S", widthMultiplier: 1 },
        { label: "D", widthMultiplier: 1 },
        { label: "F", widthMultiplier: 1 },
        { label: "G", widthMultiplier: 1 },
        { label: "H", widthMultiplier: 1 },
        { label: "J", widthMultiplier: 1 },
        { label: "K", widthMultiplier: 1 },
        { label: "L", widthMultiplier: 1 },
        { label: ";", widthMultiplier: 1 },
        { label: "'", widthMultiplier: 1 },
        {
          label: "return",
          widthMultiplier: 1.85,
          textPlacement: "bottom-right",
          fontSize: 8,
        },
      ],
    },
    // Row 5 - ZXCV
    {
      keys: [
        {
          label: "shift",
          widthMultiplier: 2.25,
          textPlacement: "bottom-left",
          fontSize: 8,
        },
        { label: "Z", widthMultiplier: 1 },
        { label: "X", widthMultiplier: 1 },
        { label: "C", widthMultiplier: 1 },
        { label: "V", widthMultiplier: 1 },
        { label: "B", widthMultiplier: 1 },
        { label: "N", widthMultiplier: 1 },
        { label: "M", widthMultiplier: 1 },
        { label: ",", widthMultiplier: 1 },
        { label: ".", widthMultiplier: 1 },
        { label: "/", widthMultiplier: 1 },
        {
          label: "shift",
          widthMultiplier: 2.45,
          textPlacement: "bottom-right",
          fontSize: 8,
        },
      ],
    },
    // Row 6 - Bottom row
    {
      keys: [
        {
          label: "fn",
          widthMultiplier: 1,
          textPlacement: "bottom-left",
          fontSize: 7,
        },
        {
          label: "control",
          widthMultiplier: 1,
          textPlacement: "bottom-left",
          fontSize: 7,
        },
        {
          label: "option",
          widthMultiplier: 1,
          textPlacement: "bottom-left",
          fontSize: 7,
        },
        {
          label: "command",
          widthMultiplier: 1.15,
          textPlacement: "bottom-left",
          fontSize: 7,
        },
        { label: null, widthMultiplier: 5.4 },
        {
          label: "command",
          widthMultiplier: 1.15,
          textPlacement: "bottom-right",
          fontSize: 7,
        },
        {
          label: "option",
          widthMultiplier: 1,
          textPlacement: "bottom-right",
          fontSize: 7,
        },
        // Arrow keys - half-height with special positioning
        {
          label: "←",
          widthMultiplier: (136 - 8) / 3 / 40,
          heightMultiplier: 0.5,
          fontSize: 12,
          yOffset: 0.5,
        },
        {
          label: "↑",
          widthMultiplier: (136 - 8) / 3 / 40,
          heightMultiplier: 0.5,
          fontSize: 12,
          yOffset: 0,
        },
        {
          label: "↓",
          widthMultiplier: (136 - 8) / 3 / 40,
          heightMultiplier: 0.5,
          fontSize: 12,
          yOffset: 0.5,
          xOffset: -1,
        },
        {
          label: "→",
          widthMultiplier: (136 - 8) / 3 / 40,
          heightMultiplier: 0.5,
          fontSize: 12,
          yOffset: 0.5,
        },
      ],
    },
  ],
};
