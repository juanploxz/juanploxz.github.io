const visualContent = {
  flowgate: {
    label: "Parking intelligence",
    metric: "18 min wait",
    body: (
      <>
        <div className="visual-kpi-row">
          <span>Available 42%</span>
          <span>Gate A high</span>
        </div>
        <div className="visual-parking-grid">
          {Array.from({ length: 18 }, (_, index) => (
            <span
              key={index}
              className={index % 5 === 0 || index % 7 === 0 ? "is-busy" : ""}
            />
          ))}
        </div>
        <div className="visual-bars">
          <span style={{ "--bar": "72%" }} />
          <span style={{ "--bar": "48%" }} />
          <span style={{ "--bar": "30%" }} />
        </div>
      </>
    ),
  },
  "workout-tracker": {
    label: "Routine loop",
    metric: "24 sets",
    body: (
      <div className="visual-phone">
        <div className="visual-phone__header">
          <span>Push day</span>
          <strong>740 kcal</strong>
        </div>
        <div className="visual-phone__ring" />
        <div className="visual-phone__rows">
          <span />
          <span />
          <span />
        </div>
      </div>
    ),
  },
  thefinder: {
    label: "AI matching pipeline",
    metric: "0.92 fit",
    body: (
      <div className="visual-pipeline">
        {["CV", "Parse", "Vector", "Score", "Rank"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    ),
  },
  "movie-reviews": {
    label: "Review system",
    metric: "Charts + CRUD",
    body: (
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
        </div>
      </div>
    ),
  },
  "powerbi-crisis": {
    label: "Executive dashboard",
    metric: "+12.4%",
    body: (
      <div className="visual-dashboard">
        <div className="visual-dashboard__kpis">
          <span>Sales</span>
          <span>Ticket</span>
          <span>Tx</span>
        </div>
        <div className="visual-dashboard__main">
          <i style={{ "--bar": "58%" }} />
          <i style={{ "--bar": "82%" }} />
          <i style={{ "--bar": "46%" }} />
          <i style={{ "--bar": "70%" }} />
        </div>
      </div>
    ),
  },
};

function ProjectVisual({ project, size = "card" }) {
  const visual = visualContent[project.id] ?? visualContent.flowgate;

  return (
    <div
      className={`project-visual project-visual--${project.id} project-visual--${size}`}
    >
      <div className="project-visual__header">
        <span>{visual.label}</span>
        <strong>{visual.metric}</strong>
      </div>
      <div className="project-visual__body">{visual.body}</div>
    </div>
  );
}

export default ProjectVisual;
