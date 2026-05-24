import { motion as Motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Layers3 } from "lucide-react";
import { skillLookup } from "../../data/skills";
import ProjectStage from "./ProjectStage";

function ProjectDetails({ project, onSkillSelect }) {
  const skillLabels = project.skills
    .map((skillId) => skillLookup[skillId])
    .filter(Boolean);

  return (
    <Motion.article
      id="project-details"
      className="project-details"
      aria-live="polite"
      style={{ "--project-accent": project.accent }}
      layout
      initial={{
        opacity: 0,
        y: 34,
        scale: 0.975,
        clipPath: "inset(14% 9% 14% 9% round 8px)",
        filter: "blur(16px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0% round 8px)",
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: -18,
        scale: 0.985,
        clipPath: "inset(8% 6% 8% 6% round 8px)",
        filter: "blur(10px)",
      }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      <Motion.div
        className="project-details__visual"
        layoutId={`project-visual-${project.id}`}
        aria-hidden="true"
      >
        <span>{project.orbit}</span>
      </Motion.div>

      <div className="project-details__heading">
        <div>
          <p className="section-kicker">Selected case study</p>
          <Motion.h3 layoutId={`project-title-${project.id}`}>
            {project.title}
          </Motion.h3>
          <span>{project.role}</span>
        </div>
        <a className="button button--compact" href="#skills" data-magnetic>
          <Layers3 aria-hidden="true" />
          <span>View skill map</span>
        </a>
      </div>

      <p className="project-details__summary">{project.summary}</p>

      <div className="project-details__proof">
        {project.highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>

      <div className="project-details__grid">
        <div className="project-details__story">
          <div>
            <span>Problem</span>
            <p>{project.problem}</p>
          </div>
          <div>
            <span>Product response</span>
            <p>{project.approach}</p>
          </div>
          <div>
            <span>Outcome</span>
            <p>{project.outcome}</p>
          </div>
        </div>

        <div className="project-details__decisions">
          <h4>Technical decisions</h4>
          <ul>
            {project.decisions.map((decision) => (
              <li key={decision}>
                <CheckCircle2 aria-hidden="true" />
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ol className="project-stages">
        {project.stages.map((stage, index) => (
          <ProjectStage key={stage.label} stage={stage} index={index} />
        ))}
      </ol>

      <div className="project-details__skills">
        {skillLabels.map((skill) => (
          <button
            type="button"
            key={skill.id}
            onClick={() => onSkillSelect(skill.id)}
          >
            {skill.label}
          </button>
        ))}
      </div>

      <a className="project-details__jump" href="#contact" data-magnetic>
        Talk about this kind of project
        <ArrowUpRight aria-hidden="true" />
      </a>
    </Motion.article>
  );
}

export default ProjectDetails;
