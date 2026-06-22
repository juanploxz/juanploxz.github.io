import { useLanguage } from "../../hooks/useLanguage";

function SkillChip({ skill, active, related, count, onClick }) {
  const { t } = useLanguage();

  if (skill.portfolioEvidence) {
    return (
      <span
        className={["skill-chip", "skill-chip--evidence", related ? "is-related" : ""]
          .filter(Boolean)
          .join(" ")}
        aria-label={t("skills.portfolioChipLabel", { skill: skill.label })}
      >
        <span>{skill.label}</span>
        <small>{t("skills.portfolioEvidence")}</small>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={["skill-chip", active ? "is-active" : "", related ? "is-related" : ""]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onClick(skill.id)}
      aria-pressed={active}
      aria-label={t("skills.chipLabel", {
        skill: skill.label,
        count,
        projectWord: t(count === 1 ? "common.project" : "common.projects"),
      })}
    >
      <span>{skill.label}</span>
      <small aria-hidden="true">{count}</small>
    </button>
  );
}

export default SkillChip;
