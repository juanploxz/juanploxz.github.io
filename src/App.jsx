import { useEffect, useMemo, useState } from "react";
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
import { useScrollJourneyProgress } from "./hooks/useScrollJourneyProgress";

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [activeSkill, setActiveSkill] = useState("all");
  const journey = useScrollJourneyProgress();
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

  const journeyStyle = useMemo(() => {
    const { progress, phases } = journey;
    const readingPhase = Math.max(
      phases.projects,
      phases.skills,
      phases.timeline,
      phases.contact
    );

    return {
      "--journey-progress": progress,
      "--phase-hero": phases.hero,
      "--phase-gateway": phases.gateway,
      "--phase-projects": phases.projects,
      "--phase-skills": phases.skills,
      "--phase-timeline": phases.timeline,
      "--phase-contact": phases.contact,
      "--hero-exit-opacity": 1 - phases.gateway * 0.72,
      "--hero-exit-y": `${phases.gateway * -46}px`,
      "--hero-exit-scale": 1 - phases.gateway * 0.045,
      "--hero-exit-blur": `${phases.gateway * 2.4}px`,
      "--visual-opacity": 0.92 - readingPhase * 0.42,
      "--visual-saturate": 1.12 - readingPhase * 0.14,
      "--visual-brightness": 1 - readingPhase * 0.2,
      "--reading-mask-opacity": readingPhase * 0.76,
      "--projects-enter-opacity": Math.min(1, 0.82 + phases.projects * 0.18),
      "--projects-enter-y": `${(1 - phases.projects) * 52}px`,
      "--projects-enter-scale": 0.96 + phases.projects * 0.04,
      "--projects-enter-rotate": `${(1 - phases.projects) * 2.2}deg`,
      "--skills-enter-opacity": Math.min(1, 0.82 + phases.skills * 0.18),
      "--skills-enter-y": `${(1 - phases.skills) * 48}px`,
      "--skills-enter-scale": 0.97 + phases.skills * 0.03,
      "--timeline-enter-opacity": 0.88 + phases.timeline * 0.12,
      "--timeline-enter-y": `${(1 - phases.timeline) * 24}px`,
      "--contact-enter-opacity": Math.min(1, 0.82 + phases.contact * 0.18),
      "--contact-enter-y": `${(1 - phases.contact) * 38}px`,
      "--contact-enter-scale": 0.975 + phases.contact * 0.025,
      "--fallback-tunnel-y": `${phases.gateway * -38}px`,
      "--fallback-tunnel-scale": 1 + phases.gateway * 0.06,
      "--fallback-panel-opacity": 0.22 + phases.projects * 0.58,
    };
  }, [journey]);

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
    <div className="site-shell" style={journeyStyle}>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="content">
        <HeroSection journey={journey} />
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
