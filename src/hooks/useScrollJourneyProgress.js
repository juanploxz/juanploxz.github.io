import { useEffect, useMemo, useRef, useState } from "react";

const phaseRanges = {
  hero: [0, 0.18],
  gateway: [0.12, 0.34],
  projects: [0.28, 0.55],
  skills: [0.5, 0.72],
  timeline: [0.68, 0.86],
  contact: [0.82, 1],
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

function getOffsetTop(id) {
  return document.getElementById(id)?.offsetTop ?? 0;
}

function interpolateMilestones(scrollY, milestones) {
  const sortedMilestones = milestones
    .filter(([position]) => Number.isFinite(position))
    .sort((a, b) => a[0] - b[0]);

  if (scrollY <= sortedMilestones[0][0]) {
    return sortedMilestones[0][1];
  }

  for (let index = 1; index < sortedMilestones.length; index += 1) {
    const [position, value] = sortedMilestones[index];
    const [previousPosition, previousValue] = sortedMilestones[index - 1];

    if (scrollY <= position) {
      const localProgress =
        (scrollY - previousPosition) / (position - previousPosition || 1);
      return previousValue + (value - previousValue) * clamp(localProgress);
    }
  }

  return sortedMilestones[sortedMilestones.length - 1][1];
}

export function useScrollJourneyProgress() {
  const [progress, setProgress] = useState(0);
  const milestonesRef = useRef([
    [0, 0],
    [1, 1],
  ]);

  useEffect(() => {
    let animationFrame = 0;

    const measureMilestones = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const viewport = window.innerHeight;
      const projectsTop = getOffsetTop("projects");
      const skillsTop = getOffsetTop("skills");
      const timelineTop = getOffsetTop("timeline");
      const contactTop = getOffsetTop("contact");

      milestonesRef.current = [
        [0, 0],
        [Math.max(0, projectsTop - viewport * 0.95), 0.12],
        [Math.max(0, projectsTop - viewport * 0.78), 0.28],
        [Math.max(0, skillsTop - viewport * 0.72), 0.5],
        [Math.max(0, timelineTop - viewport * 0.68), 0.68],
        [Math.max(0, contactTop - viewport * 0.62), 0.82],
        [Math.max(1, scrollable), 1],
      ];
    };

    const updateProgress = () => {
      const next = clamp(
        interpolateMilestones(window.scrollY, milestonesRef.current)
      );

      setProgress(next);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    const handleResize = () => {
      measureMilestones();
      handleScroll();
    };

    measureMilestones();
    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

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
