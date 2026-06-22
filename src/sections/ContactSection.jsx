import { motion as Motion } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import { profile } from "../lib/constants";
import { revealContainer, revealItem, viewportOnce } from "../lib/animations";
import { useLanguage } from "../hooks/useLanguage";

const contactLinks = [
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Instagram", href: profile.instagram, icon: Instagram },
];

function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="section section--contact" id="contact" aria-labelledby="contact-title">
      <SectionHeader
        titleId="contact-title"
        kicker={t("contact.kicker")}
        title={t("contact.title")}
        text={t("contact.intro")}
        align="center"
      />

      <Motion.div
        className="contact-panel"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <Motion.p className="contact-note" variants={revealItem}>
          {t("contact.note")}
        </Motion.p>

        <Motion.div className="contact-actions" variants={revealItem}>
          <a className="contact-primary" href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" />
            <span>{profile.email}</span>
            <ArrowUpRight aria-hidden="true" />
          </a>

          <a
            className="contact-primary contact-primary--github"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github aria-hidden="true" />
            <span>GitHub</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Motion.div>

        <Motion.div className="contact-secondary" variants={revealItem}>
          {contactLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <Icon aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </Motion.div>
      </Motion.div>
    </section>
  );
}

export default ContactSection;
