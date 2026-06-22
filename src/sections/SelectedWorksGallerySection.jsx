import { useRef } from "react";
import TransitionGallery from "../features/selected-work/TransitionGallery";
import { usePinnedSectionProgress } from "../hooks/usePinnedSectionProgress";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";
import { useCompactVisuals } from "../hooks/useCompactVisuals";
import { useLanguage } from "../hooks/useLanguage";

function SelectedWorksGallerySection({ projects }) {
  const trackRef = useRef(null);
  const { t } = useLanguage();
  const reducedMotion = useReducedMotionSafe();
  const compactVisuals = useCompactVisuals();
  const isStatic = reducedMotion || compactVisuals;
  const progress = usePinnedSectionProgress(trackRef, !isStatic);
  const activeProjectIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
  const galleryStyle = {
    "--gallery-progress": progress,
    "--active-accent": projects[activeProjectIndex].accent,
  };

  return (
    <section
      className="selected-works-section"
      id="selected-work"
      aria-labelledby="selected-work-title"
    >
      <span className="scroll-anchor" id="journey" aria-hidden="true" />

      <div className="selected-works-intro">
        <p>{t("selectedWork.kicker")}</p>
        <div>
          <h2 id="selected-work-title">{t("selectedWork.title")}</h2>
          <span>{t("selectedWork.intro")}</span>
        </div>
      </div>

      <div
        ref={trackRef}
        className={["selected-gallery-track", isStatic ? "is-static" : ""]
          .filter(Boolean)
          .join(" ")}
        style={galleryStyle}
      >
        <div className="selected-gallery-sticky">
          <TransitionGallery projects={projects} progress={progress} staticMode={isStatic} />

          <div className="selected-gallery-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelectedWorksGallerySection;
