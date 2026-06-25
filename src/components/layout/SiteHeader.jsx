import { useEffect, useState } from "react";
import { Github, Globe, Instagram, Linkedin, Mail } from "lucide-react";
import CommandPalette from "../ui/CommandPalette";
import IconLink from "../ui/IconLink";
import { navLinks, profile } from "../../lib/constants";
import { useLanguage } from "../../hooks/useLanguage";
import { NAVIGATION_END_EVENT, NAVIGATION_START_EVENT } from "../../lib/scrollNavigation";

function SiteHeader() {
  const [activeHref, setActiveHref] = useState("");
  const { language, t, toggleLanguage } = useLanguage();
  const languageLabel =
    language === "en" ? "Switch language to Spanish" : "Switch language to English";

  const handleLanguageKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleLanguage();
    }
  };

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href)).filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    let animationFrame = 0;
    let suspendUpdates = false;

    const updateActiveSection = () => {
      const marker = Math.min(window.innerHeight * 0.35, 240);
      const activeSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker;
      });
      const isAtPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const nextHref = activeSection
        ? `#${activeSection.id}`
        : isAtPageEnd
          ? `#${sections[sections.length - 1].id}`
          : "";

      setActiveHref((current) => (current === nextHref ? current : nextHref));
    };

    const requestUpdate = () => {
      if (suspendUpdates) {
        return;
      }

      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const handleNavigationStart = (event) => {
      suspendUpdates = Boolean(event.detail?.longDistance);

      if (suspendUpdates) {
        window.cancelAnimationFrame(animationFrame);
      }
    };

    const handleNavigationEnd = () => {
      suspendUpdates = false;
      requestUpdate();
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener(NAVIGATION_START_EVENT, handleNavigationStart);
    window.addEventListener(NAVIGATION_END_EVENT, handleNavigationEnd);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener(NAVIGATION_START_EVENT, handleNavigationStart);
      window.removeEventListener(NAVIGATION_END_EVENT, handleNavigationEnd);
    };
  }, []);

  return (
    <header className="site-header" role="banner">
      <a className="brand-mark" href="#top" aria-label={t("header.backToTop")}>
        <span>JP</span>
        <strong>{profile.shortName}</strong>
      </a>

      <a className="mobile-header-action" href="#contact">
        {t("header.mobileContact")}
      </a>

      <nav className="site-nav" aria-label={t("header.primaryNavigation")}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={activeHref === link.href ? "is-active" : undefined}
            aria-current={activeHref === link.href ? "location" : undefined}
            onClick={() => setActiveHref(link.href)}
          >
            {t(`nav.${link.id}`)}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="language-toggle"
          type="button"
          onClick={toggleLanguage}
          onKeyDown={handleLanguageKeyDown}
          aria-label={languageLabel}
          title={languageLabel}
        >
          <Globe aria-hidden="true" />
          <span>{language === "en" ? "ES" : "EN"}</span>
        </button>
        <CommandPalette />
        <nav className="social-links" aria-label={t("header.socialLinks")}>
          <IconLink
            href={profile.github}
            label="GitHub"
            icon={Github}
            className="social-link--essential"
          />
          <IconLink
            href={profile.linkedin}
            label="LinkedIn"
            icon={Linkedin}
            className="social-link--secondary"
          />
          <IconLink
            href={profile.instagram}
            label="Instagram"
            icon={Instagram}
            className="social-link--secondary"
          />
          <IconLink
            href={`mailto:${profile.email}`}
            label={t("common.email")}
            icon={Mail}
            className="social-link--essential"
          />
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
