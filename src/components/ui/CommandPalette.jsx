import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command, ExternalLink, Mail, Search } from "lucide-react";
import { navLinks, profile } from "../../lib/constants";
import { useLanguage } from "../../hooks/useLanguage";
import { useReducedMotionSafe } from "../../hooks/useReducedMotionSafe";
import { scrollToHash } from "../../lib/scrollNavigation";

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const pendingNavigationRef = useRef(null);
  const skipFocusRestoreRef = useRef(false);
  const reducedMotion = useReducedMotionSafe();
  const { t } = useLanguage();

  const commands = useMemo(
    () => [
      { id: "top", label: t("command.top"), href: "#top" },
      {
        id: "selected-work",
        label: t("command.selectedWork"),
        href: "#selected-work",
      },
      ...navLinks.map((link) => ({
        id: link.id,
        label: t(`nav.${link.id}`),
        href: link.href,
      })),
      {
        id: "github",
        label: "GitHub",
        href: profile.github,
        external: true,
        icon: ExternalLink,
      },
      {
        id: "email",
        label: t("common.email"),
        href: `mailto:${profile.email}`,
        icon: Mail,
      },
    ],
    [t]
  );

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((item) => item.label.toLowerCase().includes(normalizedQuery));
  }, [commands, query]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setQuery("");
        setActiveIndex(0);
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
        setActiveIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closePalette = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const handleOpenChange = (nextOpen) => {
    if (nextOpen) {
      setOpen(true);
      return;
    }

    closePalette();
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setActiveIndex(0);
  };

  const runCommand = (item) => {
    if (item.href.startsWith("#")) {
      if (document.querySelector(item.href)) {
        pendingNavigationRef.current = item.href;
        skipFocusRestoreRef.current = true;
      }

      closePalette();
      return;
    }

    closePalette();

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.assign(item.href);
  };

  useEffect(() => {
    if (open || !pendingNavigationRef.current) {
      return undefined;
    }

    const hash = pendingNavigationRef.current;
    pendingNavigationRef.current = null;
    const frame = window.requestAnimationFrame(() => {
      scrollToHash(hash, { reducedMotion });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open, reducedMotion]);

  const handlePaletteKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, filteredCommands.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    }

    if (event.key === "Enter" && filteredCommands[activeIndex]) {
      event.preventDefault();
      runCommand(filteredCommands[activeIndex]);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button className="command-trigger" type="button" aria-label={t("command.trigger")}>
          <Command aria-hidden="true" />
          <span>{t("command.label")}</span>
          <kbd>Ctrl K</kbd>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div className="command-palette">
          <Dialog.Overlay className="command-palette__scrim" />
          <Dialog.Content
            className="command-palette__dialog"
            aria-describedby={undefined}
            onKeyDown={handlePaletteKeyDown}
            onCloseAutoFocus={(event) => {
              if (skipFocusRestoreRef.current) {
                event.preventDefault();
                skipFocusRestoreRef.current = false;
              }
            }}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              inputRef.current?.focus();
            }}
          >
            <div className="command-palette__header">
              <Search aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={handleQueryChange}
                aria-label={t("command.filter")}
                aria-controls="command-palette-list"
                aria-activedescendant={
                  filteredCommands[activeIndex]
                    ? `command-${filteredCommands[activeIndex].id}`
                    : undefined
                }
                placeholder={t("command.placeholder")}
              />
            </div>

            <Dialog.Title>{t("command.title")}</Dialog.Title>

            <div
              className="command-palette__list"
              id="command-palette-list"
              role="listbox"
              aria-label={t("command.available")}
            >
              {filteredCommands.length ? (
                filteredCommands.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <button
                      id={`command-${item.id}`}
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={index === activeIndex}
                      className={index === activeIndex ? "is-active" : ""}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => runCommand(item)}
                    >
                      {Icon ? <Icon aria-hidden="true" /> : <Command aria-hidden="true" />}
                      <span>{item.label}</span>
                    </button>
                  );
                })
              ) : (
                <p>{t("command.noResults")}</p>
              )}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CommandPalette;
