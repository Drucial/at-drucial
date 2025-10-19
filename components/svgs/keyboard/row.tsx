import { Key } from "./key";
import type { KeyConfig } from "./keys";

type RowProps = {
  keys: KeyConfig[];
  rowIndex: number;
  keySize: number;
  keyGap: number;
  rowGap: number;
  startX?: number;
  startY?: number;
};

export function Row({
  keys,
  rowIndex,
  keySize,
  keyGap,
  rowGap,
  startX = 0,
  startY = 0,
}: RowProps) {
  const baseY = startY + (keySize + rowGap) * rowIndex;

  // Calculate x positions for all keys upfront
  const keyPositions = keys.reduce<number[]>((positions, _, index) => {
    const previousX = index === 0 ? startX : positions[index - 1];
    const previousKeyConfig = index === 0 ? null : keys[index - 1];

    // Only advance if previous key doesn't have negative xOffset (stacking)
    if (
      index === 0 ||
      !previousKeyConfig?.xOffset ||
      previousKeyConfig.xOffset >= 0
    ) {
      const previousWidth = previousKeyConfig
        ? keySize * previousKeyConfig.widthMultiplier
        : 0;
      const newX = index === 0 ? startX : previousX + previousWidth + keyGap;
      positions.push(newX);
    } else {
      positions.push(previousX);
    }

    return positions;
  }, []);

  return (
    <>
      {keys.map((keyConfig, keyIndex) => {
        const width = keySize * keyConfig.widthMultiplier;
        const height = keySize * (keyConfig.heightMultiplier ?? 1);

        // Apply positional offsets
        const xOffset = keyConfig.xOffset
          ? keyConfig.xOffset * (width + keyGap)
          : 0;
        const yOffset = keyConfig.yOffset ? keyConfig.yOffset * keySize : 0;

        const x = keyPositions[keyIndex] + xOffset;
        const y = baseY + yOffset;

        return (
          <Key
            key={`${rowIndex}-${keyIndex}`}
            fontSize={keyConfig.fontSize}
            height={height}
            label={keyConfig.label}
            textPlacement={keyConfig.textPlacement}
            width={width}
            x={x}
            y={y}
          />
        );
      })}
    </>
  );
}
