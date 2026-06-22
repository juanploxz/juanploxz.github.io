import { useEffect, useMemo, useState } from "react";
import CodeRainBackground from "./components/effects/CodeRainBackground";
import SiteHeader from "./components/layout/SiteHeader";
import HeroSection from "./sections/HeroSection";
import SelectedWorksGallerySection from "./sections/SelectedWorksGallerySection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import TimelineSection from "./sections/TimelineSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import { projects } from "./data/projects";
import { localizeProjects } from "./data/projectTranslations";
import { exploringSkills, skillGroups, skillLookup } from "./data/skills";
import { timeline } from "./data/timeline";
import { profile } from "./lib/constants";
import { useLanguage } from "./hooks/useLanguage";
import { useReducedMotionSafe } from "./hooks/useReducedMotionSafe";
import { getSkillLabel } from "./lib/skillLabels";
import { scrollToHash } from "./lib/scrollNavigation";

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [activeSkill, setActiveSkill] = useState("all");
  const reducedMotion = useReducedMotionSafe();
  const { language, t } = useLanguage();
  const localizedProjects = useMemo(() => localizeProjects(projects, language), [language]);

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

  useEffect(() => {
    const handleInternalNavigation = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest('a[href^="#"]');
      const hash = anchor?.getAttribute("href");

      if (!anchor || !hash || hash === "#" || anchor.classList.contains("skip-link")) {
        return;
      }

      event.preventDefault();
      scrollToHash(hash, { reducedMotion });
    };

    document.addEventListener("click", handleInternalNavigation);
    return () => document.removeEventListener("click", handleInternalNavigation);
  }, [reducedMotion]);

  const selectedProject = useMemo(
    () =>
      localizedProjects.find((project) => project.id === selectedProjectId) ?? localizedProjects[0],
    [localizedProjects, selectedProjectId]
  );

  const activeSkillLabel =
    activeSkill === "all" ? t("skills.allSkillsLabel") : getSkillLabel(t, skillLookup[activeSkill]);

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);

    window.requestAnimationFrame(() => {
      const details = document.getElementById("project-details");

      if (!details) {
        return;
      }

      const headerOffset = 96;
      const top = details.getBoundingClientRect().top + window.scrollY - headerOffset;

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

    const projectForSkill = localizedProjects.find((project) => project.skills.includes(skillId));

    if (projectForSkill) {
      setSelectedProjectId(projectForSkill.id);
    }
  };

  return (
    <div className="site-shell">
      <CodeRainBackground reducedMotion={reducedMotion} />
      <a className="skip-link" href="#content">
        {t("common.skipToContent")}
      </a>
      <SiteHeader />

      <main id="content">
        <HeroSection />
        <SelectedWorksGallerySection projects={localizedProjects} />
        <ProjectsSection
          projects={localizedProjects}
          selectedProject={selectedProject}
          selectedProjectId={selectedProjectId}
          activeSkill={activeSkill}
          activeSkillLabel={activeSkillLabel}
          onProjectSelect={handleProjectSelect}
          onSkillSelect={handleSkillSelect}
        />
        <SkillsSection
          projects={localizedProjects}
          skillGroups={skillGroups}
          exploringSkills={exploringSkills}
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
          {t("footer.copyright", {
            year: new Date().getFullYear(),
            name: profile.shortName,
          })}
        </span>
      </footer>
    </div>
  );
}

export default App;
