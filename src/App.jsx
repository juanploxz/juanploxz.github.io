import { useMemo, useState } from "react";
import SiteHeader from "./components/layout/SiteHeader";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import TimelineSection from "./sections/TimelineSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import { projects } from "./data/projects";
import { skillGroups, skillLookup } from "./data/skills";
import { timeline } from "./data/timeline";
import { profile } from "./lib/constants";
import { useCinematicEffects } from "./hooks/useCinematicEffects";

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [activeSkill, setActiveSkill] = useState("all");
  useCinematicEffects();

  const selectedProject = useMemo(
    () =>
      projects.find((project) => project.id === selectedProjectId) ??
      projects[0],
    [selectedProjectId]
  );

  const activeSkillLabel =
    activeSkill === "all" ? "all skills" : skillLookup[activeSkill]?.label;

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleSkillSelect = (skillId) => {
    setActiveSkill(skillId);

    if (skillId === "all") {
      return;
    }

    const projectForSkill = projects.find((project) =>
      project.skills.includes(skillId)
    );

    if (projectForSkill) {
      setSelectedProjectId(projectForSkill.id);
    }
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="content">
        <HeroSection />
        <ProjectsSection
          projects={projects}
          selectedProject={selectedProject}
          selectedProjectId={selectedProjectId}
          activeSkill={activeSkill}
          activeSkillLabel={activeSkillLabel}
          onProjectSelect={handleProjectSelect}
          onSkillSelect={handleSkillSelect}
        />
        <SkillsSection
          projects={projects}
          skillGroups={skillGroups}
          activeSkill={activeSkill}
          selectedProjectId={selectedProjectId}
          onSkillSelect={handleSkillSelect}
          onProjectSelect={handleProjectSelect}
        />
        <TimelineSection timeline={timeline} />
        <AboutSection />
        <ContactSection />
      </main>

      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} {profile.shortName}. Built with React,
          Vite, Motion, GSAP, and React Three Fiber.
        </span>
      </footer>
    </div>
  );
}

export default App;
