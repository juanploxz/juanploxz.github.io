import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import HeroFallbackScene from "../scenes/hero/HeroFallbackScene";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";
import { useScrollJourneyProgress } from "../hooks/useScrollJourneyProgress";
import { shouldUseCompactVisuals, supportsWebGL } from "../lib/browserCapabilities";

const HeroCanvas = lazy(() => import("../scenes/hero/HeroCanvas.jsx"));

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

function overlayStyle(visibility) {
  const visible = clamp(visibility);

  return {
    opacity: visible,
    transform: `translate3d(0, ${(1 - visible) * 18}px, 0)`,
  };
}

function ImmersiveJourneySection() {
  const sectionRef = useRef(null);
  const journey = useScrollJourneyProgress(sectionRef);
  const reducedMotion = useReducedMotionSafe();
  const [isNearViewport, setIsNearViewport] = useState(false);
  const compactVisuals = useMemo(() => shouldUseCompactVisuals(), []);
  const canUse3D = useMemo(
    () => !reducedMotion && !compactVisuals && supportsWebGL(),
    [compactVisuals, reducedMotion]
  );

  useEffect(() => {
    const section = sectionRef.current;

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
  const journeyStyle = {
    "--journey-progress": progress,
    "--phase-outside": phases.outside,
    "--phase-approach": phases.approach,
    "--phase-passage": phases.passage,
    "--phase-arrival": phases.arrival,
    "--fallback-tunnel-y": `${phases.approach * -42}px`,
    "--fallback-tunnel-scale": 1 + phases.approach * 0.08,
    "--fallback-panel-opacity": 0.22 + phases.arrival * 0.58,
  };

  const introVisibility = 1 - phases.approach * 0.9;
  const approachVisibility = phases.approach * (1 - phases.passage * 0.85);
  const passageVisibility = phases.passage * (1 - phases.arrival * 0.72);
  const arrivalVisibility = phases.arrival;

  return (
    <section
      ref={sectionRef}
      className={[
        "journey-section",
        reducedMotion || compactVisuals ? "is-static" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id="journey"
      aria-label="Immersive transition into the project space"
      style={journeyStyle}
    >
      <div className="journey-sticky">
        <div className="journey-canvas-layer" aria-hidden="true">
          {canUse3D && isNearViewport ? (
            <Suspense fallback={<HeroFallbackScene loading />}>
              <HeroCanvas journey={journey} />
            </Suspense>
          ) : (
            <HeroFallbackScene />
          )}
        </div>

        <div className="journey-shade" aria-hidden="true" />

        <div className="journey-overlay">
          <div
            className="journey-panel journey-panel--intro"
            style={overlayStyle(introVisibility)}
          >
            <span>Immersive transition</span>
            <h2>From portfolio surface into product systems.</h2>
            <p>
              A short spatial passage separates the opening statement from the
              selected work, so the projects feel like the destination.
            </p>
          </div>

          <div
            className="journey-panel journey-panel--approach"
            style={overlayStyle(approachVisibility)}
          >
            <span>Approaching gateway</span>
            <h2>Entering a digital product room.</h2>
          </div>

          <div
            className="journey-panel journey-panel--passage"
            style={overlayStyle(passageVisibility)}
          >
            <span>Systems in motion</span>
            <h2>Backend · Mobile · AI · Data</h2>
          </div>

          <div
            className="journey-panel journey-panel--arrival"
            style={overlayStyle(arrivalVisibility)}
          >
            <span>Selected work</span>
            <h2>The project gallery begins next.</h2>
            <a className="journey-next" href="#projects">
              <span>Go to projects</span>
              <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="journey-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}

export default ImmersiveJourneySection;
