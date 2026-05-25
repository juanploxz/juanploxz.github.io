import { useEffect, useMemo, useRef, useState } from "react";

const phaseRanges = {
  title: [0, 0.18],
  approach: [0.18, 0.38],
  entry: [0.38, 0.65],
  focus: [0.65, 0.85],
  landing: [0.85, 1],
};

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smooth(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function normalizePhase(progress, [start, end]) {
  return smooth((progress - start) / (end - start));
}

export function usePinnedSectionProgress(sectionRef) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / scrollableDistance);

      if (Math.abs(next - progressRef.current) > 0.002) {
        progressRef.current = next;
        setProgress(next);
      }
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [sectionRef]);

  const phases = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(phaseRanges).map(([phase, range]) => [
          phase,
          normalizePhase(progress, range),
        ])
      ),
    [progress]
  );

  return useMemo(
    () => ({
      progress,
      phases,
    }),
    [progress, phases]
  );
}
