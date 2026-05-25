import { AnimatePresence, LayoutGroup, motion as Motion } from "framer-motion";
import ProjectCard from "../features/projects/ProjectCard";
import ProjectDetails from "../features/projects/ProjectDetails";
import SectionHeader from "../components/ui/SectionHeader";
import { revealContainer, viewportOnce } from "../lib/animations";
import ProjectVisual from "../features/projects/ProjectVisual";

function ProjectsSection({
  projects,
  selectedProject,
  selectedProjectId,
  activeSkill,
  activeSkillLabel,
  onProjectSelect,
  onSkillSelect,
}) {
  const selectedIndex = projects.findIndex(
    (project) => project.id === selectedProjectId
  );
  const formattedIndex = String(Math.max(selectedIndex, 0) + 1).padStart(2, "0");
  const totalProjects = String(projects.length).padStart(2, "0");

  return (
    <section className="section section--projects" id="projects" data-cinematic>
      <SectionHeader
        kicker="Recent systems"
        title="Selected work, presented as product systems."
        text="A curated index of projects where backend logic, interface decisions, and product thinking are treated as one system."
      />

      <LayoutGroup id="featured-projects">
        <div className="projects-showcase">
          <Motion.aside
            className="projects-showcase__aside"
            style={{ "--project-accent": selectedProject.accent }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="projects-showcase__count">
              {formattedIndex}/{totalProjects}
            </span>
            <div className="projects-showcase__preview" aria-hidden="true">
              <ProjectVisual project={selectedProject} />
            </div>
            <div>
              <p className="project-filter-note" aria-live="polite">
                {activeSkill === "all"
                  ? "Full work index"
                  : `Filtered by ${activeSkillLabel}`}
              </p>
              <h3>{selectedProject.title}</h3>
              <span>{selectedProject.orbit}</span>
            </div>
          </Motion.aside>

          <Motion.div
            className="projects-grid"
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {projects.map((project, index) => {
              const isMatched =
                activeSkill === "all" || project.skills.includes(activeSkill);

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
