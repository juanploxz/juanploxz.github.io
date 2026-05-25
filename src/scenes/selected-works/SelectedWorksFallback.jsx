import { projects } from "../../data/projects";

function SelectedWorksFallback({ loading = false, activeProject = projects[0] }) {
  return (
    <div
      className={[
        "selected-works-fallback",
        loading ? "is-loading" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--active-accent": activeProject.accent }}
    >
      <div className="selected-works-fallback__room" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="selected-works-fallback__screen" aria-hidden="true">
        <div>
          <span>{activeProject.orbit}</span>
          <strong>{activeProject.title}</strong>
        </div>
        <i />
        <i />
        <i />
      </div>
      <div className="selected-works-fallback__panels" aria-hidden="true">
        {projects.map((project, index) => (
          <span
            key={project.id}
            className={project.id === activeProject.id ? "is-active" : ""}
            style={{
              "--panel-index": index,
              "--project-accent": project.accent,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectedWorksFallback;
