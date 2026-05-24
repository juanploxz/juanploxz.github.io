function ProjectStage({ stage, index }) {
  return (
    <li className="project-stage">
      <span className="project-stage__index">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <p>{stage.label}</p>
        <h4>{stage.title}</h4>
        <span>{stage.text}</span>
      </div>
    </li>
  );
}

export default ProjectStage;
