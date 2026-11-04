export const DRAG_SETTLE_DURATION_MS = 450;

export function dragSettleKeyframes(distance: number): Keyframe[] {
  // Unit mass, stiffness 1200, damping 80: overdamped roots are -20 and -60.
  return Array.from({ length: 28 }, (_, index) => {
    const offset = index / 27;
    const seconds = offset * DRAG_SETTLE_DURATION_MS / 1000;
    const remaining = index === 27
      ? 0
      : 1.5 * Math.exp(-20 * seconds) - 0.5 * Math.exp(-60 * seconds);
    return { offset, transform: `translateY(${distance * remaining}px)` };
  });
}
