function SkillChip({ skill, active, related, count, onClick }) {
  return (
    <button
      type="button"
      className={[
        "skill-chip",
        active ? "is-active" : "",
        related ? "is-related" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onClick(skill.id)}
      aria-pressed={active}
      aria-label={`${skill.label}, used in ${count} ${
        count === 1 ? "project" : "projects"
      }`}
    >
      <span>{skill.label}</span>
      <small aria-hidden="true">{count}</small>
    </button>
  );
}

export default SkillChip;
