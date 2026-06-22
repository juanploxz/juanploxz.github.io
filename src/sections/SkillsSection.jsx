import SectionHeader from "../components/ui/SectionHeader";
import SkillsExplorer from "../features/skills/SkillsExplorer";
import { useLanguage } from "../hooks/useLanguage";

function SkillsSection({
  projects,
  skillGroups,
  exploringSkills,
  activeSkill,
  selectedProjectId,
  onSkillSelect,
  onProjectSelect,
}) {
  const { t } = useLanguage();

  return (
    <section className="section section--skills" id="skills" aria-labelledby="skills-title">
      <SectionHeader
        titleId="skills-title"
        kicker={t("skills.kicker")}
        title={t("skills.title")}
        text={t("skills.intro")}
      />

      <SkillsExplorer
        projects={projects}
        skillGroups={skillGroups}
        exploringSkills={exploringSkills}
        activeSkill={activeSkill}
        selectedProjectId={selectedProjectId}
        onSkillSelect={onSkillSelect}
        onProjectSelect={onProjectSelect}
      />
    </section>
  );
}

export default SkillsSection;
