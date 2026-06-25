import { motion as Motion } from "framer-motion";
import { ArrowDownRight, Github, Mail } from "lucide-react";
import { profile } from "../lib/constants";
import { useLanguage } from "../hooks/useLanguage";
import { revealContainer, revealItem } from "../lib/animations";

function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <Motion.div
        className="hero-copy"
        variants={revealContainer}
        initial="hidden"
        animate="visible"
      >
        <Motion.h1
          id="hero-title"
          className="hero-name"
          data-text="Juan Parra"
          variants={revealItem}
        >
          Juan Parra
        </Motion.h1>
        <Motion.p className="hero-role" variants={revealItem}>
          {t("hero.role")}
        </Motion.p>
        <Motion.p className="hero-statement" variants={revealItem}>
          {t("hero.statement")}
        </Motion.p>
        <Motion.p className="hero-lede" variants={revealItem}>
          {t("hero.lede")}
        </Motion.p>
        <Motion.div className="hero-actions" variants={revealItem}>
          <a className="button button--primary" href="#selected-work">
            <span>{t("hero.galleryCta")}</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
          <a
            className="button button--ghost"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a className="button button--ghost" href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" />
            <span>{t("common.contact")}</span>
          </a>
        </Motion.div>
      </Motion.div>

      <Motion.div className="hero-status" variants={revealItem} initial="hidden" animate="visible">
        <span>{t("hero.focusLabel")}</span>
        <strong>{t("hero.focus")}</strong>
      </Motion.div>

      <a className="hero-scroll-cue" href="#selected-work" aria-label={t("hero.scrollCue")}>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </section>
  );
}

export default HeroSection;
