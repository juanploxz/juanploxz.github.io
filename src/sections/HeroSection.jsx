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
          Developer portfolio / Product-minded software builder
        </Motion.p>
        <Motion.h1 id="hero-title" variants={revealItem}>
          I turn technical projects into polished software product stories.
        </Motion.h1>
        <Motion.p className="hero-lede" variants={revealItem}>
          I am Juan Parra, a systems engineering student building web apps,
          mobile concepts, AI workflows, and data dashboards with a focus on
          clarity, usability, and product logic.
        </Motion.p>
        <Motion.div className="hero-actions" variants={revealItem}>
          <a className="button button--primary" href="#selected-work" data-magnetic>
            <span>Enter product space</span>
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
        <span>Current focus</span>
        <strong>Backend logic, AI product workflows, mobile UX, BI dashboards</strong>
      </Motion.div>
    </section>
  );
}

export default HeroSection;
