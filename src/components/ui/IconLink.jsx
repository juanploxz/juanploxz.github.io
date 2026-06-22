function IconLink({ href, label, icon, className }) {
  const IconComponent = icon;

  return (
    <a
      className={["icon-link", className].filter(Boolean).join(" ")}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      aria-label={label}
      title={label}
    >
      <IconComponent aria-hidden="true" />
    </a>
  );
}

export default IconLink;
