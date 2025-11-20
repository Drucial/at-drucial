import { useCallback, useEffect, useRef } from "react";

type FalloffType = "linear" | "exponential" | "gaussian";

export type UseVariableProximityOptions = {
  /**
   * The font variation axis to animate
   * @default "wght"
   */
  fontVariationAxis?: string;
  /**
   * Minimum value for the font variation setting
   * @default 100
   */
  minValue?: number;
  /**
   * Maximum value for the font variation setting
   * @default 900
   */
  maxValue?: number;
  /**
   * Radius of effect in pixels
   * @default 200
   */
  radius?: number;
  /**
   * Type of falloff curve
   * @default "gaussian"
   */
  falloff?: FalloffType;
  /**
   * Minimum scale for letters (at max proximity)
   * @default 1
   */
  minScale?: number;
  /**
   * Maximum scale for letters (at min proximity)
   * @default 1
   */
  maxScale?: number;
};

export function useVariableProximity<T extends HTMLElement>(
  options: UseVariableProximityOptions = {}
) {
  const {
    fontVariationAxis = "wght",
    minValue = 100,
    maxValue = 900,
    radius = 200,
    falloff = "gaussian",
    minScale = 1,
    maxScale = 1,
  } = options;

  const containerRef = useRef<T>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const rafRef = useRef<number | null>(null);

  const calculateFalloff = useCallback(
    (distance: number): number => {
      const norm = Math.min(distance / radius, 1);

      switch (falloff) {
        case "linear":
          return 1 - norm;
        case "exponential":
          return Math.pow(1 - norm, 2);
        case "gaussian":
          return Math.exp(-Math.pow(norm * 2, 2) / 2);
        default:
          return 1 - norm;
      }
    },
    [radius, falloff]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        lettersRef.current.forEach((letter) => {
          if (!letter) return;

          const rect = letter.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2;
          const letterCenterY = rect.top + rect.height / 2;

          const distance = Math.sqrt(
            Math.pow(e.clientX - letterCenterX, 2) +
              Math.pow(e.clientY - letterCenterY, 2)
          );

          const falloffValue = calculateFalloff(distance);
          const fontValue =
            minValue + (maxValue - minValue) * falloffValue;
          const scaleValue =
            maxScale + (minScale - maxScale) * falloffValue;

          letter.style.fontVariationSettings = `'${fontVariationAxis}' ${fontValue}`;
          letter.style.transform = `scale(${scaleValue})`;
        });
      });
    },
    [calculateFalloff, fontVariationAxis, minValue, maxValue, minScale, maxScale]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Reset all letters to default values
    lettersRef.current.forEach((letter) => {
      if (letter) {
        letter.style.fontVariationSettings = `'${fontVariationAxis}' ${minValue}`;
        letter.style.transform = `scale(${maxScale})`;
      }
    });
  }, [fontVariationAxis, minValue, maxScale]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  const registerLetter = useCallback((el: HTMLSpanElement | null, index: number) => {
    if (el) {
      lettersRef.current[index] = el;
    }
  }, []);

  return {
    containerRef,
    registerLetter,
  };
}
