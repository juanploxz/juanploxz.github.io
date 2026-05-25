import { motion as Motion } from "framer-motion";
import { ArrowDownRight, Github, Mail } from "lucide-react";
import { profile } from "../lib/constants";
import { revealContainer, revealItem } from "../lib/animations";

function HeroSection() {
  return (
    <section
      className="hero-section"
      id="top"
      aria-labelledby="hero-title"
    >
      <Motion.div
        className="hero-copy"
        variants={revealContainer}
        initial="hidden"
        animate="visible"
      >
        <Motion.p className="hero-kicker" variants={revealItem}>
          Juan Parra / Software systems portfolio
        </Motion.p>
        <Motion.h1 id="hero-title" className="hero-name" variants={revealItem}>
          Juan Parra
        </Motion.h1>
        <Motion.p className="hero-role" variants={revealItem}>
          Software Developer & Systems Engineering Student
        </Motion.p>
        <Motion.p className="hero-statement" variants={revealItem}>
          I build software systems into polished product experiences.
        </Motion.p>
        <Motion.p className="hero-lede" variants={revealItem}>
          Web apps, mobile concepts, AI workflows, and data dashboards shaped
          with product logic, clear interfaces, and technical intent.
        </Motion.p>
        <Motion.div className="hero-actions" variants={revealItem}>
          <a className="button button--primary" href="#selected-work" data-magnetic>
            <span>Enter the gallery</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
          <a className="button button--ghost" href={profile.github} target="_blank" rel="noreferrer" data-magnetic>
            <Github aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a className="button button--ghost" href={`mailto:${profile.email}`} data-magnetic>
            <Mail aria-hidden="true" />
            <span>Contact</span>
          </a>
        </Motion.div>
      </Motion.div>

      <Motion.div className="hero-status" variants={revealItem} initial="hidden" animate="visible">
        <span>Selected focus</span>
        <strong>Backend logic / Mobile UX / AI product workflows / BI systems</strong>
      </Motion.div>
    </section>
  );
}

export default HeroSection;
