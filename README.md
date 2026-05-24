# Juan Parra Developer Portfolio

Premium interactive portfolio for Juan Pablo Parra El-Masri. The site presents projects as product case studies, connecting technical skills with concrete software decisions across web apps, mobile UX, AI workflows, Django systems, and business intelligence dashboards.

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- React Three Fiber
- Three.js
- drei, used for adaptive DPR inside the WebGL canvas
- Lucide React
- GitHub Pages via `gh-pages`

## Experience

- Premium 2D hero followed by a dedicated pinned immersive journey section.
- WebGL scene is lazy-loaded only inside the immersive section on capable desktop browsers.
- Mobile, WebGL-unavailable, and reduced-motion users receive a lightweight DOM fallback.
- Data-driven project model in `src/data/projects.js`.
- Interactive project cards with project-specific visual previews, tilt, pointer glow, skill previews, tap-friendly mobile states, and shared-layout case-study transitions.
- Case studies follow `Problem -> System -> Technical decisions -> Skills used -> Outcome`.
- Skills Explorer maps skills directly to the projects where they appear.
- GSAP-powered section reveals and magnetic CTA interactions.
- Technical timeline, about section, contact CTA, robots.txt, sitemap, and SEO metadata.

## Architecture Summary

The application keeps critical content in semantic React components and uses WebGL only as an atmospheric enhancement. `src/App.jsx` owns the selected project and selected skill state, then passes that state into data-driven sections.

Project and skill content live in `src/data/`, which keeps the UI scalable and avoids hardcoded case-study copy inside components. The project feature layer in `src/features/projects/` renders cards, shared transitions, case-study details, stages, decisions, and skill links. The skills feature layer in `src/features/skills/` renders the project-skill explorer and handles the selection affordances.

The immersive layer is isolated in `src/sections/ImmersiveJourneySection.jsx`, `src/scenes/hero/`, and `src/hooks/useScrollJourneyProgress.js`. The page flow is intentionally structured as 2D hero -> pinned 3D transition -> 2D editorial projects, instead of using WebGL as a permanent background. `HeroCanvas` stays lazy-loaded, while `HeroFallbackScene` keeps mobile, reduced-motion, and WebGL-unavailable paths readable and performant. The R3F scene uses a local scroll progress value and keyframed camera path to move through a corridor/portal environment toward project panels.

GSAP is dynamically imported inside the cinematic effects hook so ScrollTrigger and magnetic interactions do not inflate the initial bundle.

Reduced motion is handled globally through Framer Motion's `MotionConfig`, and additional effects are skipped in hooks/components when `prefers-reduced-motion` is active.

## Project Structure

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
  scenes/
    hero/
  sections/
```

## Audit Snapshot

Production preview audited at `http://127.0.0.1:4173/`.

- Lighthouse Performance: 91
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100
- `npm audit --audit-level=moderate`: 0 vulnerabilities
- `npm exec eslint .`: passing
- `npm run build`: passing
- Internal hash links checked: `#content`, `#top`, `#journey`, `#projects`, `#skills`, `#contact`
- Visual smoke tests confirm desktop WebGL canvas and mobile fallback render nonblank

The 3D journey remains a separate lazy chunk. Vite still reports that chunk as large because it contains Three/R3F, but it is not part of the mobile or initial semantic content path.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

The repository is configured for `juanploxz.github.io`, so Vite keeps `base: "/"` in `vite.config.js`.

```bash
npm run deploy
```
