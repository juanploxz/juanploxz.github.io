import { useEffect, useMemo, useState } from "react";
import SiteHeader from "./components/layout/SiteHeader";
import HeroSection from "./sections/HeroSection";
import SelectedWorksGallerySection from "./sections/SelectedWorksGallerySection";
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
import { useReducedMotionSafe } from "./hooks/useReducedMotionSafe";

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [activeSkill, setActiveSkill] = useState("all");
  const reducedMotion = useReducedMotionSafe();
  useCinematicEffects();

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    const target = document.querySelector(window.location.hash);

    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start" });
      });
    }
  }, []);

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

    window.requestAnimationFrame(() => {
      const details = document.getElementById("project-details");

      if (!details) {
        return;
      }

      const headerOffset = 96;
      const top =
        details.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });
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
        <SelectedWorksGallerySection />
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
