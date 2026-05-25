import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { projects } from "../data/projects";
import { usePinnedSectionProgress } from "../hooks/usePinnedSectionProgress";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";
import { shouldUseCompactVisuals, supportsWebGL } from "../lib/browserCapabilities";
import SelectedWorksFallback from "../scenes/selected-works/SelectedWorksFallback";

const SelectedWorksCanvas = lazy(() =>
  import("../scenes/selected-works/SelectedWorksCanvas.jsx")
);

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

function smooth(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function overlayStyle(visibility, depth = 18) {
  const visible = clamp(visibility);

  return {
    opacity: visible,
    pointerEvents: visible > 0.08 ? "auto" : "none",
    transform: `translate3d(0, ${(1 - visible) * depth}px, 0) scale(${
      0.98 + visible * 0.02
    })`,
  };
}

function visibleBetween(progress, start, end) {
  const fadeIn = start <= 0 ? 1 : smooth((progress - start) / 0.08);
  const fadeOut = end >= 1 ? 1 : 1 - smooth((progress - (end - 0.08)) / 0.08);
  return clamp(fadeIn * fadeOut);
}

function getActiveProject(progress) {
  if (progress < 0.24) {
    return projects[0];
  }

  if (progress < 0.42) {
    return projects[1];
  }

  if (progress < 0.58) {
    return projects[2];
  }

  if (progress < 0.74) {
    return projects[3];
  }

  return projects[4];
}

const galleryAccentByProject = {
  flowgate: "#4ecdc4",
  "workout-tracker": "#d8b86a",
  thefinder: "#caff3d",
  "movie-reviews": "#d98aa8",
  "powerbi-crisis": "#87bdcc",
};

function getGalleryAccent(project) {
  return galleryAccentByProject[project.id] ?? project.accent;
}

const termScenes = [
  {
    className: "selected-gallery-panel--term-one",
    label: "Capabilities",
    title: "Web · Mobile · AI · Data",
    range: [0.3, 0.46],
  },
  {
    className: "selected-gallery-panel--term-two",
    label: "Systems",
    title: "Product Thinking",
    range: [0.46, 0.6],
  },
  {
    className: "selected-gallery-panel--term-three",
    label: "Experience",
    title: "Interfaces · Automation",
    range: [0.6, 0.76],
  },
];

function SelectedWorksGallerySection() {
  const trackRef = useRef(null);
  const journey = usePinnedSectionProgress(trackRef);
  const reducedMotion = useReducedMotionSafe();
  const [isNearViewport, setIsNearViewport] = useState(false);
  const compactVisuals = useMemo(() => shouldUseCompactVisuals(), []);
  const canUse3D = useMemo(
    () => !reducedMotion && !compactVisuals && supportsWebGL(),
    [compactVisuals, reducedMotion]
  );
  const isStatic = reducedMotion || compactVisuals;
  const activeProject = useMemo(
    () => getActiveProject(journey.progress),
    [journey.progress]
  );

  useEffect(() => {
    const section = trackRef.current;

    if (!section || !canUse3D) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [canUse3D]);

  const { progress, phases } = journey;
  const galleryAccent =
    progress >= 0.82 ? getGalleryAccent(activeProject) : "var(--accent)";
  const galleryStyle = {
    "--gallery-progress": progress,
    "--gallery-title": phases.title,
    "--gallery-approach": phases.approach,
    "--gallery-entry": phases.entry,
    "--gallery-focus": phases.focus,
    "--gallery-landing": phases.landing,
    "--active-accent": galleryAccent,
  };

  const introVisibility = isStatic ? 1 : visibleBetween(progress, 0, 0.22);
  const entryVisibility = isStatic ? 0 : visibleBetween(progress, 0.18, 0.32);
  const termVisibilities = termScenes.map((scene, index) =>
    isStatic
      ? Number(index === 0 && !canUse3D)
      : visibleBetween(progress, ...scene.range)
  );
  const landingVisibility = isStatic ? 0 : visibleBetween(progress, 0.84, 1);

  return (
    <section
      className="selected-works-section"
      id="selected-work"
      aria-labelledby="selected-work-title"
      data-cinematic
    >
      <span className="scroll-anchor" id="journey" aria-hidden="true" />

      <div className="selected-works-intro">
        <p>Recent works</p>
        <div>
          <h2 id="selected-work-title">Selected Work</h2>
          <span>
            A curated look at the systems, apps, and product ideas I have
            built.
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        className={[
          "selected-gallery-track",
          isStatic ? "is-static" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={galleryStyle}
      >
        <div className="selected-gallery-sticky">
          <div className="selected-gallery-canvas-layer" aria-hidden="true">
            {canUse3D && isNearViewport ? (
              <Suspense
                fallback={
                  <SelectedWorksFallback loading />
                }
              >
                <SelectedWorksCanvas
                  journey={journey}
                  activeProject={activeProject}
                />
              </Suspense>
            ) : (
              <SelectedWorksFallback />
            )}
          </div>

          <div className="selected-gallery-shade" aria-hidden="true" />

          <div className="selected-gallery-overlay">
            <div
              className="selected-gallery-panel selected-gallery-panel--intro"
              style={overlayStyle(introVisibility)}
            >
              <span>Selected Work</span>
              <h3>Enter the work room</h3>
            </div>

            <div
              className="selected-gallery-panel selected-gallery-panel--entry"
              style={overlayStyle(entryVisibility)}
            >
              <span>Work room</span>
              <h3>Let the room move first</h3>
            </div>

            {termScenes.map((scene, index) => (
              <div
                key={scene.title}
                className={[
                  "selected-gallery-panel",
                  "selected-gallery-panel--term",
                  scene.className,
                ].join(" ")}
                style={overlayStyle(termVisibilities[index])}
              >
                <span>{scene.label}</span>
                <h3>{scene.title}</h3>
              </div>
            ))}

            <div
              className="selected-gallery-panel selected-gallery-panel--landing"
              style={overlayStyle(landingVisibility)}
            >
              <span>Next</span>
              <h3>Case studies below</h3>
              <p>Project work starts here</p>
              <a className="selected-gallery-next" href="#projects">
                <span>Continue</span>
                <ArrowDownRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="selected-gallery-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelectedWorksGallerySection;
