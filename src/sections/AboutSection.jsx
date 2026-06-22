import { motion as Motion } from "framer-motion";
import SectionHeader from "../components/ui/SectionHeader";
import { revealContainer, revealItem, viewportOnce } from "../lib/animations";
import { useLanguage } from "../hooks/useLanguage";

function AboutSection() {
  const { t } = useLanguage();
  const principles = t("about.principles");

  return (
    <section className="section section--about" id="about" aria-labelledby="about-title">
      <SectionHeader
        titleId="about-title"
        kicker={t("about.kicker")}
        title={t("about.title")}
        text={t("about.intro")}
      />

      <Motion.div
        className="about-grid"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {principles.map((principle) => (
          <Motion.article className="about-card" key={principle.title} variants={revealItem}>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </Motion.article>
        ))}
      </Motion.div>
    </section>
  );
}

export default AboutSection;
