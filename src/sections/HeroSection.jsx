import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowDownRight, Github, Mail } from "lucide-react";
import { profile } from "../lib/constants";
import { revealContainer, revealItem } from "../lib/animations";
import { useSectionProgress } from "../hooks/useSectionProgress";
import HeroFallbackScene from "../scenes/hero/HeroFallbackScene";
import { shouldUseCompactVisuals, supportsWebGL } from "../lib/browserCapabilities";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";

const HeroCanvas = lazy(() => import("../scenes/hero/HeroCanvas.jsx"));

function HeroSection() {
  const progress = useSectionProgress("top");
  const reducedMotion = useReducedMotionSafe();
  const [immersiveReady, setImmersiveReady] = useState(false);
  const canUse3D = useMemo(
    () => !reducedMotion && supportsWebGL() && !shouldUseCompactVisuals(),
    [reducedMotion]
  );
  const shouldLoad3D = canUse3D && immersiveReady;

  useEffect(() => {
    if (!canUse3D) {
      return undefined;
    }

    let activated = false;
    const activate = () => {
      if (activated) {
        return;
      }

      activated = true;
      setImmersiveReady(true);
      window.removeEventListener("pointermove", activate);
      window.removeEventListener("wheel", activate);
      window.removeEventListener("keydown", activate);
    };

    const timer = window.setTimeout(activate, 7000);

    window.addEventListener("pointermove", activate, { passive: true });
    window.addEventListener("wheel", activate, { passive: true });
    window.addEventListener("keydown", activate);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", activate);
      window.removeEventListener("wheel", activate);
      window.removeEventListener("keydown", activate);
    };
  }, [canUse3D]);

  return (
    <section
      className="hero-section"
      id="top"
      aria-labelledby="hero-title"
      style={{ "--hero-progress": progress }}
    >
      <div className="hero-visual" aria-hidden="true" data-parallax="0.08">
        {shouldLoad3D ? (
          <Suspense fallback={<HeroFallbackScene loading />}>
            <HeroCanvas progress={progress} />
          </Suspense>
        ) : (
          <HeroFallbackScene />
        )}
      </div>

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
          <a className="button button--primary" href="#projects" data-magnetic>
            <span>Explore projects</span>
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

      <Motion.div className="hero-status" variants={revealItem} initial="hidden" animate="visible" data-parallax="0.04">
        <span>Current focus</span>
        <strong>Backend logic, AI product workflows, mobile UX, BI dashboards</strong>
      </Motion.div>
    </section>
  );
}

export default HeroSection;
