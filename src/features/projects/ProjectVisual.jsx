import { memo } from "react";
import { useLanguage } from "../../hooks/useLanguage";

const visualRenderers = {
  flowgate: (copy) => (
    <>
      <div className="visual-kpi-row">
        {copy.kpis.map((kpi) => (
          <span key={kpi}>{kpi}</span>
        ))}
      </div>
      <div className="visual-parking-grid">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} className={index % 5 === 0 || index % 7 === 0 ? "is-busy" : ""} />
        ))}
      </div>
      <div className="visual-bars">
        <span style={{ "--bar": "72%" }} />
        <span style={{ "--bar": "48%" }} />
        <span style={{ "--bar": "30%" }} />
      </div>
      <div className="visual-flow-lanes" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </>
  ),
  "workout-tracker": (copy) => (
    <div className="visual-phone">
      <div className="visual-phone__header">
        <span>{copy.session}</span>
        <strong>{copy.calories}</strong>
      </div>
      <div className="visual-phone__ring" />
      <div className="visual-phone__rows">
        <span />
        <span />
        <span />
      </div>
      <div className="visual-phone__timeline" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  ),
  thefinder: (copy) => (
    <>
      <div className="visual-pipeline">
        {copy.pipeline.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="visual-score-card" aria-hidden="true">
        <strong>{copy.match}</strong>
        <span>{copy.fit}</span>
      </div>
    </>
  ),
  "movie-reviews": () => (
    <div className="visual-browser">
      <div className="visual-browser__chrome" />
      <div className="visual-browser__content">
        <span />
        <span />
        <div className="visual-chart">
          <i style={{ "--bar": "44%" }} />
          <i style={{ "--bar": "72%" }} />
          <i style={{ "--bar": "58%" }} />
          <i style={{ "--bar": "86%" }} />
        </div>
        <div className="visual-review-strip" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  ),
  "powerbi-crisis": (copy) => (
    <div className="visual-dashboard">
      <div className="visual-dashboard__kpis">
        {copy.kpis.map((kpi) => (
          <span key={kpi}>{kpi}</span>
        ))}
      </div>
      <div className="visual-dashboard__main">
        <i style={{ "--bar": "58%" }} />
        <i style={{ "--bar": "82%" }} />
        <i style={{ "--bar": "46%" }} />
        <i style={{ "--bar": "70%" }} />
      </div>
      <div className="visual-trend" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  ),
};

function ProjectVisual({ project, size = "card" }) {
  const { t } = useLanguage();
  const visualId = visualRenderers[project.id] ? project.id : "flowgate";
  const copy = t(`projectVisuals.${visualId}`);

  return (
    <div className={`project-visual project-visual--${project.id} project-visual--${size}`}>
      <div className="project-visual__header">
        <span>{copy.label}</span>
        <strong>{copy.metric}</strong>
      </div>
      <div className="project-visual__body">{visualRenderers[visualId](copy)}</div>
    </div>
  );
}

export default memo(ProjectVisual);
