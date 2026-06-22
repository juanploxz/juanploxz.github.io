import { AnimatePresence, LayoutGroup, motion as Motion } from "framer-motion";
import ProjectCard from "../features/projects/ProjectCard";
import ProjectDetails from "../features/projects/ProjectDetails";
import SectionHeader from "../components/ui/SectionHeader";
import { motionTransitions, revealContainer, viewportOnce } from "../lib/animations";
import ProjectVisual from "../features/projects/ProjectVisual";
import { useLanguage } from "../hooks/useLanguage";

function ProjectsSection({
  projects,
  selectedProject,
  selectedProjectId,
  activeSkill,
  activeSkillLabel,
  onProjectSelect,
  onSkillSelect,
}) {
  const { t } = useLanguage();
  const selectedIndex = projects.findIndex((project) => project.id === selectedProjectId);
  const formattedIndex = String(Math.max(selectedIndex, 0) + 1).padStart(2, "0");
  const totalProjects = String(projects.length).padStart(2, "0");

  return (
    <section className="section section--projects" id="projects" aria-labelledby="projects-title">
      <SectionHeader
        titleId="projects-title"
        kicker={t("projectSection.kicker")}
        title={t("projectSection.title")}
        text={t("projectSection.intro")}
      />

      <LayoutGroup id="featured-projects">
        <div className="projects-showcase">
          <Motion.aside
            className="projects-showcase__aside"
            style={{ "--project-accent": selectedProject.accent }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={motionTransitions.section}
          >
            <span className="projects-showcase__count">
              {formattedIndex}/{totalProjects}
            </span>
            <div className="projects-showcase__meta" aria-label={t("projectSection.metadata")}>
              <span>{selectedProject.type}</span>
              <span>{selectedProject.status}</span>
              <span>{selectedProject.year}</span>
            </div>
            <div className="projects-showcase__preview" aria-hidden="true">
              <ProjectVisual project={selectedProject} />
            </div>
            <div>
              <p className="project-filter-note" aria-live="polite">
                {activeSkill === "all"
                  ? t("projectSection.fullIndex")
                  : t("projectSection.filteredBy", { skill: activeSkillLabel })}
              </p>
              <h3>{selectedProject.title}</h3>
              <span>{selectedProject.orbit}</span>
              <ul
                className="projects-showcase__stack"
                aria-label={t("projectSection.selectedStack")}
              >
                {(selectedProject.stack ?? []).slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Motion.aside>

          <div className="projects-index">
            <div className="projects-index__header">
              <span>{t("projectSection.index")}</span>
              <p>{t("projectSection.indexHelp")}</p>
            </div>
            <Motion.div
              className="projects-grid"
              aria-label={t("projectSection.selector")}
              variants={revealContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {projects.map((project, index) => {
                const isMatched = activeSkill === "all" || project.skills.includes(activeSkill);

                return (
                  <ProjectCard
                    key={project.id}
                    index={index}
                    project={project}
                    isActive={project.id === selectedProjectId}
                    isDimmed={!isMatched}
                    activeSkill={activeSkill}
                    onSelect={onProjectSelect}
                  />
                );
              })}
            </Motion.div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <ProjectDetails
            key={selectedProject.id}
            project={selectedProject}
            onSkillSelect={onSkillSelect}
          />
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}

export default ProjectsSection;
