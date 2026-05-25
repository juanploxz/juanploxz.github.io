import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { skillLookup } from "../../data/skills";
import { softScale, viewportOnce } from "../../lib/animations";
import { useReducedMotionSafe } from "../../hooks/useReducedMotionSafe";
import ProjectVisual from "./ProjectVisual";

function ProjectCard({ project, index = 0, isActive, isDimmed, activeSkill, onSelect }) {
  const reducedMotion = useReducedMotionSafe();
  const [tilt, setTilt] = useState({ x: "0deg", y: "0deg" });
  const matchedSkill = activeSkill !== "all" && project.skills.includes(activeSkill);
  const previewSkills = project.skills
    .map((skillId) => skillLookup[skillId]?.label)
    .filter(Boolean)
    .slice(0, 5);

  const handlePointerMove = (event) => {
    if (reducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 9;
    const rotateX = -((y / rect.height) - 0.5) * 7;

    event.currentTarget.style.setProperty("--glow-x", `${x}px`);
    event.currentTarget.style.setProperty("--glow-y", `${y}px`);
    setTilt({ x: `${rotateX.toFixed(2)}deg`, y: `${rotateY.toFixed(2)}deg` });
  };

  const handleLeave = () => {
    setTilt({ x: "0deg", y: "0deg" });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(project.id);
    }
  };

  return (
    <Motion.article
      className={[
        "project-card",
        isActive ? "is-active" : "",
        isDimmed ? "is-dimmed" : "",
        matchedSkill ? "is-matched" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--project-accent": project.accent,
        "--tilt-x": tilt.x,
        "--tilt-y": tilt.y,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} case study`}
      aria-controls="project-details"
      aria-pressed={isActive}
      onClick={() => onSelect(project.id)}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleLeave}
      variants={softScale}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="project-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <Motion.div
        className="project-card__visual"
        aria-hidden="true"
      >
        <ProjectVisual project={project} />
      </Motion.div>

      <div className="project-card__content">
        <div className="project-card__meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <Motion.h3 layoutId={`project-title-${project.id}`}>
          {project.title}
        </Motion.h3>
        <p>{project.summary}</p>
      </div>

      <div className="project-card__reveal">
        <ul>
          {project.highlights.slice(0, 2).map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="project-card__skills">
          {previewSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <span className="project-card__cta">
          Open case study
          <ArrowUpRight aria-hidden="true" />
        </span>
      </div>
    </Motion.article>
  );
}

export default ProjectCard;
