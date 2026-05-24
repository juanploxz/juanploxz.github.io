import { AnimatePresence, LayoutGroup, motion as Motion } from "framer-motion";
import ProjectCard from "../features/projects/ProjectCard";
import ProjectDetails from "../features/projects/ProjectDetails";
import SectionHeader from "../components/ui/SectionHeader";
import { revealContainer, viewportOnce } from "../lib/animations";

function ProjectsSection({
  projects,
  selectedProject,
  selectedProjectId,
  activeSkill,
  activeSkillLabel,
  onProjectSelect,
  onSkillSelect,
}) {
  return (
    <section className="section section--projects" id="projects" data-cinematic>
      <SectionHeader
        kicker="Featured projects"
        title="Projects built as product systems, not isolated exercises."
        text="Each project is framed through the problem, the product decision, and the technical structure behind it."
      />

      <div className="project-filter-note" aria-live="polite">
        {activeSkill === "all"
          ? "Showing the full project system."
          : `Highlighting projects that use ${activeSkillLabel}.`}
      </div>

      <LayoutGroup id="featured-projects">
        <Motion.div
          className="projects-grid"
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projects.map((project) => {
            const isMatched = activeSkill === "all" || project.skills.includes(activeSkill);

            return (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={project.id === selectedProjectId}
                isDimmed={!isMatched}
                activeSkill={activeSkill}
                onSelect={onProjectSelect}
              />
            );
          })}
        </Motion.div>

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
