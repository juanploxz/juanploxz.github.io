export function getSkillLabel(t, skill) {
  const path = `skillLabels.${skill.id}`;
  const translatedLabel = t(path);

  return translatedLabel === path ? skill.label : translatedLabel;
}
