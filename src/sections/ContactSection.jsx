import { motion as Motion } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import { profile } from "../lib/constants";
import { revealContainer, revealItem, viewportOnce } from "../lib/animations";

const contactLinks = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Instagram", href: profile.instagram, icon: Instagram },
];

function ContactSection() {
  return (
    <section className="section section--contact" id="contact" data-cinematic>
      <SectionHeader
        kicker="Contact"
        title="Let’s shape the next system."
        text="Open to internships, junior developer roles, and collaborations where software needs to feel clear, useful, and polished."
        align="center"
      />

      <Motion.div
        className="contact-panel"
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <Motion.a
          className="contact-primary"
          href={`mailto:${profile.email}`}
          variants={revealItem}
          data-magnetic
        >
          <Mail aria-hidden="true" />
          <span>{profile.email}</span>
          <ArrowUpRight aria-hidden="true" />
        </Motion.a>

        <Motion.div className="contact-secondary" variants={revealItem}>
          {contactLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                data-magnetic
              >
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
