import { motion as Motion } from "framer-motion";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { skillLookup } from "../../data/skills";
import { motionTransitions } from "../../lib/animations";
import ProjectCaseStudy from "./ProjectCaseStudy";
import ProjectStage from "./ProjectStage";
import ProjectVisual from "./ProjectVisual";
import { useLanguage } from "../../hooks/useLanguage";
import { useCompactVisuals } from "../../hooks/useCompactVisuals";
import { getSkillLabel } from "../../lib/skillLabels";

function ProjectDeepDive({ project, skillLabels, onSkillSelect }) {
  const { t } = useLanguage();

  return (
    <div className="project-details__deep-dive">
      <div className="project-details__proof">
        {project.highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>

      <ProjectCaseStudy project={project} />

      <ol className="project-stages">
        {project.stages.map((stage, index) => (
          <ProjectStage key={stage.label} stage={stage} index={index} />
        ))}
      </ol>

      <div className="project-details__skills">
        <span className="project-details__skills-title">{t("projectSection.skillsUsed")}</span>
        {skillLabels.map((skill) => (
          <button type="button" key={skill.id} onClick={() => onSkillSelect(skill.id)}>
            {skill.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectDetails({ project, onSkillSelect }) {
  const { t } = useLanguage();
  const compactVisuals = useCompactVisuals();
  const skillLabels = project.skills
    .map((skillId) => skillLookup[skillId])
    .filter((skill) => skill?.primary)
    .map((skill) => ({ ...skill, label: getSkillLabel(t, skill) }));

  return (
    <Motion.article
      id="project-details"
      className="project-details"
      aria-labelledby={`project-details-title-${project.id}`}
      aria-live="polite"
      style={{ "--project-accent": project.accent }}
      layout
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -12,
        scale: 0.99,
      }}
      transition={motionTransitions.detail}
    >
      <Motion.div className="project-details__visual" aria-hidden="true">
        <ProjectVisual project={project} size="detail" />
      </Motion.div>

      <div className="project-details__heading">
        <div>
          <p className="section-kicker">{t("projectSection.selectedCaseStudy")}</p>
          <Motion.h3
            id={`project-details-title-${project.id}`}
            layoutId={`project-title-${project.id}`}
          >
            {project.title}
          </Motion.h3>
          <span>{project.role}</span>
        </div>
        <a className="button button--compact" href="#skills">
          <Layers3 aria-hidden="true" />
          <span>{t("projectSection.viewSkillMap")}</span>
        </a>
      </div>

      <p className="project-details__summary">{project.summary}</p>

      {compactVisuals ? (
        <details className="project-details__disclosure">
          <summary>{t("projectSection.exploreCaseStudy")}</summary>
          <ProjectDeepDive
            project={project}
            skillLabels={skillLabels}
            onSkillSelect={onSkillSelect}
          />
        </details>
      ) : (
        <ProjectDeepDive
          project={project}
          skillLabels={skillLabels}
          onSkillSelect={onSkillSelect}
        />
      )}

      <a className="project-details__jump" href="#contact">
        {t("projectSection.talkAbout")}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </Motion.article>
  );
}

export default ProjectDetails;
