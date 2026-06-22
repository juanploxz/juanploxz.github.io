# AGENTS.md

## Project Overview

This repository contains Juan Parra's personal portfolio, published at
https://juanploxz.github.io. The site presents projects, skills, timeline,
about, contact, and an immersive Selected Work gallery.

The portfolio should feel polished, elegant, modern, fluid, memorable, and
professional. It should communicate a product-minded software developer who
connects frontend UI, backend logic, mobile UX, AI workflows, data dashboards,
and interactive systems.

## Branch

Work on:

```bash
test/immersive-portfolio
```

Do not switch branches unless the user explicitly asks.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion / Motion
- Lucide React
- GitHub Pages

## Visual Direction

- Premium editorial UI.
- Dark / cream identity with lime and cyan accents.
- Subtle motion, clear hierarchy, and refined spacing.
- Selected Work may use cinematic 2D/2.5D transitions; the rest of the site should
  remain strong, restrained 2D UI.
- Avoid generic landing-page patterns. The first screen should feel like a real
  portfolio experience, not marketing filler.

## File Structure

```txt
src/
  components/
    layout/
    ui/
  data/
  features/
    projects/
    skills/
  hooks/
  lib/
  sections/
  index.css
```

Key files:

- `src/App.jsx`: main app composition and shared project/skill state.
- `src/data/projects.js`: project content and case-study data.
- `src/data/skills.js`: skill groups and skill lookup.
- `src/sections/SelectedWorksGallerySection.jsx`: immersive gallery section.
- `src/features/selected-work/`: transition-gallery presentation logic.
- `src/index.css`: global styling. Refactor carefully and preserve cascade.

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run deploy
```

`npm run build` is the required verification command after code or content
changes.

## Editing Rules

- Make small, reviewable changes.
- Do not rewrite the project from scratch.
- Prefer existing patterns, components, hooks, and data structures.
- Do not rename existing class names unless the related CSS and components are
  updated together.
- Do not edit huge CSS sections blindly. Inspect the cascade and preserve import
  order.
- Keep content truthful. Do not invent jobs, credentials, years of experience,
  deployed URLs, or external links.
- Avoid unnecessary dependencies.
- Prefer small components with clear ownership.
- Preserve GitHub Pages compatibility.

## Interactive Performance Rules

- Do not turn the entire website into a 3D site.
- Keep Selected Work lightweight, progress-driven, and isolated from other sections.
- Preserve mobile, compact-device, and reduced-motion behavior.
- Prefer transforms and opacity for cinematic transitions.
- Avoid large visual assets unless the user explicitly approves them.
- If future 3D work is proposed, justify the runtime cost, lazy-load it, and provide
  an intentional non-WebGL experience before adding dependencies.

## Accessibility Rules

- Preserve semantic HTML.
- Preserve the skip link.
- Keep focus states visible.
- Use `button` for actions and `a` for navigation or external links.
- Add `aria-label` only where visible text is insufficient.
- Keep decorative project visuals hidden from assistive technology when appropriate.
- Preserve keyboard navigation.
- Maintain readable color contrast.

## Reduced Motion And Fallback Rules

- Respect `prefers-reduced-motion`.
- Preserve `MotionConfig reducedMotion="user"`.
- Do not force scroll animation for reduced-motion users.
- Keep mobile and compact-device layouts intentional and premium.

## Dependency Rules

- Do not add dependencies unless they clearly reduce complexity or unlock a
  necessary feature.
- Prefer existing dependencies first.
- Explain any new dependency before installing it.
- Avoid large UI kits for small interactions.
- Keep bundle size and GitHub Pages deployment in mind.

## Code Quality Rules

- Keep components focused and data-driven where possible.
- Avoid duplicating project or skill content inside UI components.
- Use shared animation utilities when available.
- Use CSS custom properties for reusable visual tokens.
- Preserve responsive behavior.
- Preserve reduced-motion CSS.
- Run the build after changes and fix errors before finishing.

## Definition Of Done

Every task is done only when:

- The requested change is implemented.
- Existing behavior is preserved unless the task explicitly changes it.
- Accessibility, reduced-motion, and mobile behavior are not regressed.
- No unnecessary dependency was added.
- `npm run build` has been run after changes.
- Any build errors have been fixed or clearly reported if blocked.
- The final summary explains what changed and what was verified.
