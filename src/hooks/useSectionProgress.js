import { useEffect, useState } from "react";

export function useSectionProgress(sectionId) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return undefined;
    }

    let animationFrame = 0;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const total = rect.height + viewportHeight;
      const raw = (viewportHeight - rect.top) / total;
      const next = Math.min(1, Math.max(0, raw));
      setProgress(next);
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
  }, [sectionId]);

  return progress;
}
