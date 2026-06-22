import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

function hasLink(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function ProjectCaseStudy({ project }) {
  const { t } = useLanguage();
  const links = [
    { label: t("projectSection.caseStudy.repository"), href: project.repositoryUrl },
    { label: t("projectSection.caseStudy.demo"), href: project.demoUrl },
  ].filter(({ href }) => hasLink(href));
  const decisions = project.technicalDecisions ?? project.decisions ?? [];

  return (
    <div className="project-case-study">
      <div className="project-case-study__meta" aria-label={t("projectSection.caseStudy.metadata")}>
        <span>{project.type}</span>
        <span>{project.status}</span>
        <span>{project.year}</span>
      </div>

      <div className="project-case-study__overview">
        <section aria-labelledby={`${project.id}-problem-title`}>
          <span>{t("projectSection.caseStudy.problem")}</span>
          <h4 id={`${project.id}-problem-title`}>{t("projectSection.caseStudy.problemTitle")}</h4>
          <p>{project.problem}</p>
        </section>

        <section aria-labelledby={`${project.id}-solution-title`}>
          <span>{t("projectSection.caseStudy.solution")}</span>
          <h4 id={`${project.id}-solution-title`}>{t("projectSection.caseStudy.solutionTitle")}</h4>
          <p>{project.solution ?? project.approach}</p>
        </section>

        <section aria-labelledby={`${project.id}-outcome-title`}>
          <span>{t("projectSection.caseStudy.outcome")}</span>
          <h4 id={`${project.id}-outcome-title`}>{t("projectSection.caseStudy.outcomeTitle")}</h4>
          <p>{project.outcome}</p>
        </section>
      </div>

      <div className="project-case-study__stack">
        <span>{t("projectSection.caseStudy.stack")}</span>
        <div>
          {(project.stack ?? []).map((item) => (
            <strong key={item}>{item}</strong>
          ))}
        </div>
      </div>

      <div className="project-case-study__columns">
        <section aria-labelledby={`${project.id}-decisions-title`}>
          <h4 id={`${project.id}-decisions-title`}>{t("projectSection.caseStudy.decisions")}</h4>
          <ul>
            {decisions.map((decision) => (
              <li key={decision}>
                <CheckCircle2 aria-hidden="true" />
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={`${project.id}-architecture-title`}>
          <h4 id={`${project.id}-architecture-title`}>
            {t("projectSection.caseStudy.architecture")}
          </h4>
          <ul>
            {(project.architecture ?? []).map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={`${project.id}-challenges-title`}>
          <h4 id={`${project.id}-challenges-title`}>{t("projectSection.caseStudy.challenges")}</h4>
          <ul>
            {(project.challenges ?? []).map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {links.length ? (
        <div className="project-case-study__links">
          <span>{t("projectSection.caseStudy.links")}</span>
          {links.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              <span>{label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      ) : (
        <div className="project-case-study__evidence" role="note">
          <span>
            {t(
              project.caseStudyAvailable
                ? "projectSection.caseStudy.available"
                : "projectSection.caseStudy.unavailable"
            )}
          </span>
          <p>{project.evidenceNote}</p>
        </div>
      )}
    </div>
  );
}

export default ProjectCaseStudy;
