import { useEffect, useMemo, useRef, useState } from "react";

const phaseRanges = {
  outside: [0, 0.2],
  approach: [0.2, 0.45],
  passage: [0.45, 0.75],
  arrival: [0.75, 1],
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

export function useScrollJourneyProgress(sectionRef) {
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

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
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
