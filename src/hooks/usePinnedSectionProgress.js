import { useEffect, useRef, useState } from "react";
import { NAVIGATION_END_EVENT, NAVIGATION_START_EVENT } from "../lib/scrollNavigation";

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function usePinnedSectionProgress(sectionRef, enabled = true) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    let animationFrame = 0;
    let suspendUpdates = false;

    const updateProgress = () => {
      if (suspendUpdates) {
        return;
      }

      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / scrollableDistance);

      if (Math.abs(next - progressRef.current) > 0.003) {
        progressRef.current = next;
        setProgress(next);
      }
    };

    const requestUpdate = () => {
      if (suspendUpdates) {
        return;
      }

      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    const handleNavigationStart = (event) => {
      suspendUpdates = Boolean(event.detail?.longDistance);

      if (suspendUpdates) {
        window.cancelAnimationFrame(animationFrame);
      }
    };

    const handleNavigationEnd = () => {
      suspendUpdates = false;
      requestUpdate();
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener(NAVIGATION_START_EVENT, handleNavigationStart);
    window.addEventListener(NAVIGATION_END_EVENT, handleNavigationEnd);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener(NAVIGATION_START_EVENT, handleNavigationStart);
      window.removeEventListener(NAVIGATION_END_EVENT, handleNavigationEnd);
    };
  }, [enabled, sectionRef]);

  return progress;
}
