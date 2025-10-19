import { useEffect } from "react";

import type { Easing } from "motion/react";
import { useAnimationControls } from "motion/react";

export type UseIconFlipOptions = {
  /**
   * Duration of the flip animation in seconds
   * @default 0.4
   */
  duration?: number;
  /**
   * Easing function for the animation
   * @default "easeInOut"
   */
  ease?: Easing;
};

export type IconFlipState = {
  /**
   * Animation controls for the first icon (visible when state is true)
   */
  icon1Controls: ReturnType<typeof useAnimationControls>;
  /**
   * Animation controls for the second icon (visible when state is false)
   */
  icon2Controls: ReturnType<typeof useAnimationControls>;
  /**
   * Initial animation state for icon 1 (visible)
   */
  icon1Initial: { rotateX: number; opacity: number };
  /**
   * Initial animation state for icon 2 (hidden)
   */
  icon2Initial: { rotateX: number; opacity: number };
};

/**
 * Hook for creating a 3D flip transition between two icons
 * @param isFirstIconVisible - Boolean state that determines which icon is visible
 * @param options - Animation options
 * @returns Controls and initial states for both icons
 */
export function useIconFlip(
  isFirstIconVisible: boolean,
  options: UseIconFlipOptions = {}
): IconFlipState {
  const { duration = 0.4, ease = "easeInOut" as Easing } = options;

  const icon1Controls = useAnimationControls();
  const icon2Controls = useAnimationControls();

  useEffect(() => {
    if (isFirstIconVisible) {
      // Show icon 1, hide icon 2
      icon1Controls.start({
        rotateX: 0,
        opacity: 1,
        transition: { duration, ease },
      });
      icon2Controls.start({
        rotateX: -90,
        opacity: 0,
        transition: { duration, ease },
      });
    } else {
      // Hide icon 1, show icon 2
      icon1Controls.start({
        rotateX: 90,
        opacity: 0,
        transition: { duration, ease },
      });
      icon2Controls.start({
        rotateX: 0,
        opacity: 1,
        transition: { duration, ease },
      });
    }
  }, [isFirstIconVisible, icon1Controls, icon2Controls, duration, ease]);

  return {
    icon1Controls,
    icon2Controls,
    icon1Initial: { rotateX: 0, opacity: 1 },
    icon2Initial: { rotateX: -90, opacity: 0 },
  };
}
