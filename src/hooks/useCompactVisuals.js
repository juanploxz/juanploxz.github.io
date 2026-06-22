import { useEffect, useState } from "react";
import { COMPACT_VISUALS_QUERY, shouldUseCompactVisuals } from "../lib/browserCapabilities";

export function useCompactVisuals() {
  const [compactVisuals, setCompactVisuals] = useState(shouldUseCompactVisuals);

  useEffect(() => {
    const mediaQuery = window.matchMedia(COMPACT_VISUALS_QUERY);
    const updateCompactMode = () => setCompactVisuals(mediaQuery.matches);

    updateCompactMode();
    mediaQuery.addEventListener("change", updateCompactMode);

    return () => mediaQuery.removeEventListener("change", updateCompactMode);
  }, []);

  return compactVisuals;
}
