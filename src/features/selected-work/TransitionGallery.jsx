import ProjectVisual from "../projects/ProjectVisual";
import { useLanguage } from "../../hooks/useLanguage";

const transitionByProject = {
  flowgate: "push",
  "workout-tracker": "reveal",
  thefinder: "split",
  "movie-reviews": "cover",
  "powerbi-crisis": "gallery",
};

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smooth(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function getGalleryPosition(progress, total) {
  const scaled = clamp(progress) * total;
  const segment = Math.min(total - 1, Math.floor(scaled));

  if (segment >= total - 1) {
    return total - 1;
  }

  const localProgress = scaled - segment;
  return segment + smooth((localProgress - 0.2) / 0.6);
}

function getSlideMotion(mode, distance) {
  const absoluteDistance = Math.abs(distance);
  const opacity = clamp(1 - absoluteDistance * 0.9);
  const scale = 1 - Math.min(absoluteDistance, 1) * 0.055;
  const depth = Math.min(absoluteDistance, 1) * -220;
  const shared = {
    opacity,
    visibility: absoluteDistance > 1.2 ? "hidden" : "visible",
    zIndex: Math.round(20 - absoluteDistance * 8),
    pointerEvents: absoluteDistance < 0.5 ? "auto" : "none",
  };

  switch (mode) {
    case "push":
      return {
        ...shared,
        clipPath: `inset(0 ${Math.min(absoluteDistance, 1) * 8}% 0 0)`,
        transform: `translate3d(${distance * 104}%, 0, ${depth}px) scale(${scale})`,
      };
    case "reveal":
      return {
        ...shared,
        clipPath: `inset(${Math.min(absoluteDistance, 1) * 9}% ${Math.min(absoluteDistance, 1) * 5}%)`,
        transform: `translate3d(0, ${distance * 20}%, ${depth}px) scale(${1 - Math.min(absoluteDistance, 1) * 0.12})`,
      };
    case "split":
      return {
        ...shared,
        clipPath: `inset(0 ${Math.min(absoluteDistance, 1) * 14}%)`,
        transform: `translate3d(${distance * 18}%, 0, ${depth}px) scale(${scale})`,
      };
    case "cover":
      return {
        ...shared,
        transform: `perspective(1400px) translate3d(${distance * 82}%, 0, ${depth}px) rotateY(${distance * -38}deg) scale(${scale})`,
      };
    case "gallery":
      return {
        ...shared,
        transform: `perspective(1500px) translate3d(${distance * 72}%, 0, ${depth}px) rotateY(${distance * -48}deg) scale(${scale})`,
      };
    default:
      return shared;
  }
}

function TransitionGallery({ projects, progress, staticMode = false }) {
  const { t } = useLanguage();
  const galleryPosition = staticMode ? 0 : getGalleryPosition(progress, projects.length);
  const activeIndex = staticMode ? 0 : Math.min(projects.length - 1, Math.round(galleryPosition));
  const slideEntries = projects
    .map((project, index) => ({
      project,
      index,
      distance: index - galleryPosition,
    }))
    .filter(({ distance }) => staticMode || Math.abs(distance) <= 1.05);

  return (
    <div
      className={["transition-gallery", staticMode ? "is-static" : ""].filter(Boolean).join(" ")}
      aria-label={t("selectedWork.galleryLabel")}
    >
      <div className="transition-gallery__grid" aria-hidden="true" />

      <div className="transition-gallery__stage">
        <div className="transition-gallery__slides">
          {slideEntries.map(({ project, index, distance }) => {
            const mode = transitionByProject[project.id] ?? "push";
            const capability = t(`selectedWork.capabilities.${project.id}`);
            const motionStyle = staticMode ? {} : getSlideMotion(mode, distance);
            const isActive = index === activeIndex;

            return (
              <article
                key={project.id}
                className={[
                  "transition-gallery__slide",
                  `transition-gallery__slide--${mode}`,
                  isActive ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  ...motionStyle,
                  "--project-accent": project.accent,
                  "--slide-accent": project.accent,
                }}
                aria-hidden={staticMode ? undefined : !isActive}
              >
                <div className="transition-gallery__copy">
                  <div className="transition-gallery__meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{t("selectedWork.capability")}</span>
                    <span>{t("selectedWork.appliedIn", { project: project.title })}</span>
                  </div>

                  <div>
                    <p className="transition-gallery__orbit">{capability.label}</p>
                    <h3>{capability.title}</h3>
                    <p className="transition-gallery__capability-summary">{capability.statement}</p>
                  </div>

                  <ul
                    className="transition-gallery__capability-list"
                    aria-label={t("selectedWork.capabilityList", {
                      capability: capability.label,
                    })}
                  >
                    {capability.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div className="transition-gallery__visual" aria-hidden="true">
                  <ProjectVisual project={project} size={staticMode ? "card" : "detail"} />
                </div>

                <div className="transition-gallery__transition-mark" aria-hidden="true">
                  <span />
                  <span />
                </div>
              </article>
            );
          })}
        </div>

        {!staticMode && (
          <div className="transition-gallery__status" aria-hidden="true">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <div>
              {projects.map((project, index) => (
                <i key={project.id} className={index === activeIndex ? "is-active" : ""} />
              ))}
            </div>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransitionGallery;
