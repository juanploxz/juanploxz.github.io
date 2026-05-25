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
  if (progress < 0.32) {
    return projects[0];
  }

  if (progress < 0.5) {
    return projects[2];
  }

  if (progress < 0.68) {
    return projects[1];
  }

  if (progress < 0.84) {
    return projects[3];
  }

  return projects[4];
}

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
  const galleryStyle = {
    "--gallery-progress": progress,
    "--gallery-title": phases.title,
    "--gallery-approach": phases.approach,
    "--gallery-entry": phases.entry,
    "--gallery-focus": phases.focus,
    "--gallery-landing": phases.landing,
    "--active-accent": activeProject.accent,
  };

  const introVisibility = isStatic ? 1 : visibleBetween(progress, 0, 0.2);
  const entryVisibility = isStatic ? 1 : visibleBetween(progress, 0.2, 0.48);
  const focusVisibility = isStatic ? 1 : visibleBetween(progress, 0.46, 0.78);
  const landingVisibility = isStatic ? 1 : phases.landing;

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
                  <SelectedWorksFallback
                    loading
                    activeProject={activeProject}
                  />
                }
              >
                <SelectedWorksCanvas
                  journey={journey}
                  activeProject={activeProject}
                />
              </Suspense>
            ) : (
              <SelectedWorksFallback activeProject={activeProject} />
            )}
          </div>

          <div className="selected-gallery-shade" aria-hidden="true" />

          <div className="selected-gallery-overlay">
            <div
              className="selected-gallery-panel selected-gallery-panel--intro"
              style={overlayStyle(introVisibility)}
            >
              <span>Selected Work</span>
              <h3>Entering the work room.</h3>
            </div>

            <div
              className="selected-gallery-panel selected-gallery-panel--entry"
              style={overlayStyle(entryVisibility)}
            >
              <span>Product systems</span>
              <h3>Web / Mobile / AI / Data</h3>
            </div>

            <div
              className="selected-gallery-panel selected-gallery-panel--focus"
              style={overlayStyle(focusVisibility)}
            >
              <span>Now viewing</span>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.orbit}</p>
            </div>

            <div
              className="selected-gallery-panel selected-gallery-panel--landing"
              style={overlayStyle(landingVisibility)}
            >
              <span>Case studies</span>
              <h3>Explore the full project stories below.</h3>
              <a className="selected-gallery-next" href="#projects">
                <span>Go to projects</span>
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
