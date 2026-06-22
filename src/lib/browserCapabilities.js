export const COMPACT_VISUALS_QUERY = "(max-width: 820px), (pointer: coarse)";

export function shouldUseCompactVisuals() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia(COMPACT_VISUALS_QUERY).matches;
}
