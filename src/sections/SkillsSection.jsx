import SectionHeader from "../components/ui/SectionHeader";
import SkillsExplorer from "../features/skills/SkillsExplorer";

function SkillsSection({
  projects,
  skillGroups,
  activeSkill,
  selectedProjectId,
  onSkillSelect,
  onProjectSelect,
}) {
  return (
    <section className="section section--skills" id="skills" data-cinematic>
      <SectionHeader
        kicker="Skills explorer"
        title="Skills are mapped to the projects where they actually appear."
        text="Select a skill to highlight the portfolio evidence behind it, or select a project to see its technical fingerprint."
      />

      <SkillsExplorer
        projects={projects}
        skillGroups={skillGroups}
        activeSkill={activeSkill}
        selectedProjectId={selectedProjectId}
        onSkillSelect={onSkillSelect}
        onProjectSelect={onProjectSelect}
      />
    </section>
  );
}

export default SkillsSection;
