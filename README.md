# Juan Parra Portfolio

Personal portfolio for Juan Pablo Parra El-Masri, built to present software
projects as product-minded case studies across web, mobile, backend logic, AI
workflows, data dashboards, and interactive experiences.

Live site: https://juanploxz.github.io

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion / Motion
- Lucide React
- Radix UI Dialog, used only for accessible command-palette focus management
- GitHub Pages

## Main Sections

- Hero: concise introduction, role, focus areas, and primary calls to action.
- Selected Work: responsive transition gallery that presents capabilities through
  cinematic 2D/2.5D project slides.
- Projects: project cards and case-study details connected to technical skills.
- Skills: capability and technology mapping across portfolio projects.
- Timeline: learning and project growth path.
- About: personal working principles and professional focus.
- Contact: email and social links.

## Design Direction

The portfolio aims for a polished, modern, high-end editorial feel. The page uses
premium 2D UI, restrained motion, strong typography, clear hierarchy, and a dark /
cream visual identity with lime and cyan accents.

## Transition Gallery

Selected Work uses progress-driven CSS transforms and React state to move between
capability slides on desktop. Compact devices use a lightweight horizontal
scroll-snap gallery, while reduced-motion behavior avoids cinematic transitions.
No WebGL runtime is required.

## Accessibility And Performance

- Semantic sections and headings are used throughout the page.
- A skip link is available for keyboard users.
- Motion is routed through Framer Motion and CSS with reduced-motion safeguards.
- Decorative project visuals are hidden from assistive technology when appropriate.
- Compact devices and reduced-motion users receive intentional, lightweight layouts.
- Project visuals are generated with CSS/React rather than heavy image assets.

## Development

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run code-quality checks:

```bash
npm run lint
npm run format:check
npm run test:e2e
```

Playwright tests run against a local Vite preview. Install its Chromium binary once
with `npx playwright install chromium` when preparing a new development machine.

Preview the production build:

```bash
npm run preview
```

## Deployment

The repository is configured for the root GitHub Pages domain:

```txt
https://juanploxz.github.io
```

Because this is a user GitHub Pages site, Vite uses `base: "/"` in
`vite.config.js`.

Deploy with:

```bash
npm run deploy
```

The deploy script builds the site and publishes `dist/` through `gh-pages`.

## Future Roadmap

- Add Lighthouse and accessibility checks to CI when a deployment workflow is
  introduced.
- Add verified repository or live-project links as they become available.
- Remove legacy theme blocks from `utilities.css` incrementally after visual
  regression coverage is expanded.
