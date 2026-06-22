import { motion as Motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { skillLookup } from "../../data/skills";
import { softScale, viewportOnce } from "../../lib/animations";
import { useReducedMotionSafe } from "../../hooks/useReducedMotionSafe";
import ProjectVisual from "./ProjectVisual";
import { useLanguage } from "../../hooks/useLanguage";
import { getSkillLabel } from "../../lib/skillLabels";

function ProjectCard({ project, index = 0, isActive, isDimmed, activeSkill, onSelect }) {
  const reducedMotion = useReducedMotionSafe();
  const { t } = useLanguage();
  const matchedSkill = activeSkill !== "all" && project.skills.includes(activeSkill);
  const previewSkills = project.skills
    .map((skillId) => skillLookup[skillId])
    .filter(Boolean)
    .map((skill) => getSkillLabel(t, skill))
    .slice(0, 5);

  const handlePointerMove = (event) => {
    if (reducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    event.currentTarget.style.setProperty("--glow-x", `${x}px`);
    event.currentTarget.style.setProperty("--glow-y", `${y}px`);
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
      }}
      onPointerMove={handlePointerMove}
      variants={softScale}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <button
        className="project-card__action"
        type="button"
        aria-label={t("projectSection.openProject", { project: project.title })}
        aria-controls="project-details"
        aria-pressed={isActive}
        onClick={() => onSelect(project.id)}
      />

      <div className="project-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <Motion.div className="project-card__visual" aria-hidden="true">
        <ProjectVisual project={project} />
      </Motion.div>

      <div className="project-card__content">
        <div className="project-card__meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <Motion.h3 id={`project-card-title-${project.id}`} layoutId={`project-title-${project.id}`}>
          {project.title}
        </Motion.h3>
        <p id={`project-card-summary-${project.id}`}>{project.summary}</p>
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
          {t("projectSection.openCaseStudy")}
          <ArrowUpRight aria-hidden="true" />
        </span>
      </div>
    </Motion.article>
  );
}

export default ProjectCard;
