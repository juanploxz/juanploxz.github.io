# Portfolio Launch Checklist

Use this checklist on `test/immersive-portfolio` before merging or deploying. Do not
run the deploy command until the release is explicitly approved.

## Automated Checks

- [ ] Run `npm install` from a clean checkout.
- [ ] Run `npm run build` and confirm there are no build errors.
- [ ] Run `npm run lint` and resolve every error.
- [ ] Run `npm run format:check` and confirm the configured formatting scope passes.
- [ ] Run `npm run test:e2e`; all Playwright checks must pass.
- [ ] Review Vite bundle output and confirm there are no unexpected heavy chunks.

## Desktop QA

- [ ] Check the homepage at 1280x720 and 1440x900.
- [ ] Confirm the hero exposes a visible hint of Selected Work.
- [ ] Test every header anchor and the active navigation state.
- [ ] Open the command palette with `Ctrl+K` and `Cmd+K` where available.
- [ ] Test Escape, arrow keys, Enter, focus trapping, and focus restoration.
- [ ] Select every project and inspect its case-study content and visual.
- [ ] Confirm Skills filtering still updates related projects.
- [ ] Check Timeline, About, and Contact spacing and section transitions.

## Mobile QA

- [ ] Check 320x568, 390x844, and 430x932 viewports.
- [ ] Confirm there is no horizontal overflow or clipped text.
- [ ] Confirm primary and secondary hero CTAs remain easy to tap.
- [ ] Confirm the compact command trigger has an accessible name.
- [ ] Confirm project cards, skill controls, and contact links remain usable by touch.
- [ ] Confirm the horizontal Selected Work gallery is usable by touch.

## Accessibility And Motion

- [ ] Navigate the full page using only the keyboard.
- [ ] Confirm the skip link becomes visible on focus and reaches `main`.
- [ ] Check visible focus states on links, buttons, project cards, and skill controls.
- [ ] Enable `prefers-reduced-motion: reduce` and repeat the core navigation flow.
- [ ] Confirm reduced motion disables or simplifies nonessential transitions.
- [ ] Confirm decorative project visuals are hidden from assistive technology.
- [ ] Check headings, landmarks, dialog naming, and link purpose with a screen reader.
- [ ] Run an automated accessibility scan and manually review contrast warnings.

## Selected Work Transitions

- [ ] Verify desktop scroll progression, project accents, and slide transitions.
- [ ] Confirm resizing from desktop to mobile works without reloading.
- [ ] Confirm compact/coarse-pointer devices use the horizontal scroll-snap gallery.
- [ ] Confirm reduced motion removes nonessential transition choreography.

## SEO And Social Preview

- [ ] Verify title, description, canonical, Open Graph, Twitter, and JSON-LD metadata.
- [ ] Confirm `robots.txt` and `sitemap.xml` use `https://juanploxz.github.io`.
- [ ] Open `/og-image.png` directly and inspect its text, contrast, and safe margins.
- [ ] Test the production URL with social-card validators after deployment.

## Links And Content

- [ ] Confirm every GitHub link points to `https://github.com/juanploxz`.
- [ ] Confirm every email CTA uses `mailto:juanploxz@gmail.com`.
- [ ] Verify LinkedIn and Instagram links against current profile data.
- [ ] Confirm project links do not imply deployments or repositories that do not exist.
- [ ] Review dates, status labels, technology claims, and personal copy for accuracy.

## Performance

- [ ] Run Lighthouse on desktop and mobile against a production preview.
- [ ] Record Performance, Accessibility, Best Practices, and SEO scores.
- [ ] Check LCP, CLS, INP, font loading, and main-thread work.
- [ ] Inspect the transition gallery for excessive main-thread work or frame drops.

## Deployment

- [ ] Confirm `vite.config.js` uses `base: "/"` for the user-site domain.
- [ ] Confirm public assets use root-compatible paths.
- [ ] Review the final diff and ensure no secrets, logs, reports, or local files are tracked.
- [ ] Merge only after branch review and explicit approval.
- [ ] Run `npm run deploy` only after explicit deployment approval.
- [ ] After deployment, verify the live URL, direct asset URLs, anchors, and cache refresh.
