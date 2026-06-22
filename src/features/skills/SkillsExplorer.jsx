import { useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowRight, Network } from "lucide-react";
import SkillChip from "./SkillChip";
import { revealContainer, revealItem, viewportOnce } from "../../lib/animations";
import { useLanguage } from "../../hooks/useLanguage";
import { getSkillLabel } from "../../lib/skillLabels";

function SkillsExplorer({
  projects,
  skillGroups,
  exploringSkills,
  activeSkill,
  selectedProjectId,
  onSkillSelect,
  onProjectSelect,
}) {
  const { t } = useLanguage();
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [projects, selectedProjectId]
  );
  const selectedProjectSkillIds = useMemo(
    () => new Set(selectedProject.skills),
    [selectedProject.skills]
  );
  const projectsForActiveSkill = useMemo(
    () =>
      activeSkill === "all"
        ? projects
        : projects.filter((project) => project.skills.includes(activeSkill)),
    [activeSkill, projects]
  );
  const projectCountBySkill = useMemo(() => {
    const counts = new Map();

    projects.forEach((project) => {
      project.skills.forEach((skillId) => {
        counts.set(skillId, (counts.get(skillId) ?? 0) + 1);
      });
    });

    return counts;
  }, [projects]);
  const projectMatchText =
    projectsForActiveSkill.length === 1
      ? t("skills.oneMatch")
      : t("skills.manyMatches", { count: projectsForActiveSkill.length });

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
          <span>{t("skills.allSkills")}</span>
        </button>
        <p>
          {activeSkill === "all"
            ? t("skills.projectGlow", { project: selectedProject.title })
            : projectMatchText}
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
                <h3 id={`${group.id}-skills-title`}>{t(`skillGroups.${group.id}.title`)}</h3>
                <p>{t(`skillGroups.${group.id}.summary`)}</p>
              </div>
              <div className="skill-group__chips">
                {group.skills.map((skill) => (
                  <SkillChip
                    key={skill.id}
                    skill={{ ...skill, label: getSkillLabel(t, skill) }}
                    active={activeSkill === skill.id}
                    related={selectedProjectSkillIds.has(skill.id)}
                    count={projectCountBySkill.get(skill.id) ?? 0}
                    onClick={onSkillSelect}
                  />
                ))}
              </div>
            </Motion.section>
          ))}

          <Motion.aside className="skills-explorer__exploring" variants={revealItem}>
            <div>
              <h3>{t("skills.exploringTitle")}</h3>
              <p>{t("skills.exploringText")}</p>
            </div>
            <ul>
              {exploringSkills.map((skill) => (
                <li key={skill.id}>{skill.label}</li>
              ))}
            </ul>
          </Motion.aside>
        </div>

        <Motion.aside className="skills-explorer__projects" variants={revealItem}>
          <div className="skills-explorer__sticky">
            <p className="section-kicker">{t("skills.projectSignal")}</p>
            <h3>{selectedProject.title}</h3>
            <span>{selectedProject.category}</span>

            <div className="project-signal-list">
              {projects.map((project) => {
                const isActive = project.id === selectedProjectId;
                const isMatched = activeSkill === "all" || project.skills.includes(activeSkill);

                return (
                  <button
                    type="button"
                    key={project.id}
                    className={[isActive ? "is-active" : "", isMatched ? "is-matched" : ""]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => onProjectSelect(project.id)}
                    aria-pressed={isActive}
                  >
                    <span>{project.title}</span>
                    <small>{t("skills.skillCount", { count: project.skills.length })}</small>
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
