import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import IconLink from "../ui/IconLink";
import { navLinks, profile } from "../../lib/constants";

function SiteHeader() {
  return (
    <header className="site-header" role="banner">
      <a className="brand-mark" href="#top" aria-label="Back to top">
        <span>JP</span>
        <strong>{profile.shortName}</strong>
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header-actions" aria-label="Social links">
        <IconLink href={profile.github} label="GitHub" icon={Github} />
        <IconLink href={profile.linkedin} label="LinkedIn" icon={Linkedin} />
        <IconLink href={profile.instagram} label="Instagram" icon={Instagram} />
        <IconLink href={`mailto:${profile.email}`} label="Email" icon={Mail} />
      </div>
    </header>
  );
}

export default SiteHeader;
