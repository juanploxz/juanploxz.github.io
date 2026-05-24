import { motion as Motion } from "framer-motion";
import { ArrowRight, Network } from "lucide-react";
import SkillChip from "./SkillChip";
import { revealContainer, revealItem, viewportOnce } from "../../lib/animations";

function SkillsExplorer({
  projects,
  skillGroups,
  activeSkill,
  selectedProjectId,
  onSkillSelect,
  onProjectSelect,
}) {
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const selectedProjectSkillIds = new Set(selectedProject.skills);
  const projectsForActiveSkill =
    activeSkill === "all"
      ? projects
      : projects.filter((project) => project.skills.includes(activeSkill));

  const countProjectsForSkill = (skillId) =>
    projects.filter((project) => project.skills.includes(skillId)).length;

  return (
    <Motion.div
      className="skills-explorer"
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <Motion.div className="skills-explorer__toolbar" variants={revealItem}>
        <button
          type="button"
          className={activeSkill === "all" ? "is-active" : ""}
          onClick={() => onSkillSelect("all")}
          aria-pressed={activeSkill === "all"}
        >
          <Network aria-hidden="true" />
          <span>All skills</span>
        </button>
        <p>
          {activeSkill === "all"
            ? `${selectedProject.title} is defining the current skill glow.`
            : `${projectsForActiveSkill.length} project match selected.`}
        </p>
      </Motion.div>

      <div className="skills-explorer__layout">
        <div className="skills-explorer__groups">
          {skillGroups.map((group) => (
            <Motion.section
              className="skill-group"
              key={group.id}
              variants={revealItem}
              aria-labelledby={`${group.id}-skills-title`}
            >
              <div className="skill-group__heading">
                <h3 id={`${group.id}-skills-title`}>{group.title}</h3>
                <p>{group.summary}</p>
              </div>
              <div className="skill-group__chips">
                {group.skills.map((skill) => (
                  <SkillChip
                    key={skill.id}
                    skill={skill}
                    active={activeSkill === skill.id}
                    related={selectedProjectSkillIds.has(skill.id)}
                    count={countProjectsForSkill(skill.id)}
                    onClick={onSkillSelect}
                  />
                ))}
              </div>
            </Motion.section>
          ))}
        </div>

        <Motion.aside className="skills-explorer__projects" variants={revealItem}>
          <div className="skills-explorer__sticky">
            <p className="section-kicker">Project signal</p>
            <h3>{selectedProject.title}</h3>
            <span>{selectedProject.category}</span>

            <div className="project-signal-list">
              {projects.map((project) => {
                const isActive = project.id === selectedProjectId;
                const isMatched =
                  activeSkill === "all" || project.skills.includes(activeSkill);

                return (
                  <button
                    type="button"
                    key={project.id}
                    className={[
                      isActive ? "is-active" : "",
                      isMatched ? "is-matched" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => onProjectSelect(project.id)}
                    aria-pressed={isActive}
                  >
                    <span>{project.title}</span>
                    <small>{project.skills.length} skills</small>
                    <ArrowRight aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
        </Motion.aside>
      </div>
    </Motion.div>
  );
}

export default SkillsExplorer;
