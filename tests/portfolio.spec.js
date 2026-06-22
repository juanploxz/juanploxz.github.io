import { expect, test } from "@playwright/test";

const sectionIds = ["top", "selected-work", "projects", "skills", "timeline", "about", "contact"];

test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) =>
    route.fulfill({ status: 204, body: "" })
  );
});

test("loads the portfolio and its main sections", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Juan Parra/i);
  for (const id of sectionIds) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});

test("navigation targets and contact links are valid", async ({ page }) => {
  await page.goto("/");

  const anchors = page.locator('a[href^="#"]');
  const anchorCount = await anchors.count();
  expect(anchorCount).toBeGreaterThan(0);

  for (let index = 0; index < anchorCount; index += 1) {
    const href = await anchors.nth(index).getAttribute("href");
    await expect(page.locator(href)).toBeAttached();
  }

  await expect(page.locator('a[href="https://github.com/juanploxz"]').first()).toBeVisible();
  await expect(page.locator('a[href="mailto:juanploxz@gmail.com"]').first()).toBeVisible();
});

test("command palette opens from the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+K");

  await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Filter commands" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Command palette" })).toBeHidden();
});

test("command palette navigates to every internal section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const commands = [
    ["Selected Work", "selected-work"],
    ["Projects", "projects"],
    ["Skills", "skills"],
    ["Timeline", "timeline"],
    ["About", "about"],
    ["Contact", "contact"],
    ["Top", "top"],
  ];

  for (const [label, id] of commands) {
    await page.keyboard.press("Control+K");
    const filter = page.getByRole("textbox", { name: "Filter commands" });
    await filter.fill(label);
    await filter.press("Enter");

    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect
      .poll(() =>
        page.locator(`#${id}`).evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return rect.bottom > 0 && rect.top < window.innerHeight;
        })
      )
      .toBe(true);
  }
});

test("long section navigation uses a bounded smooth transition", async ({ page }) => {
  await page.goto("/");

  const startedAt = Date.now();
  await page.locator('.site-nav a[href="#timeline"]').click();
  await expect(page.locator("html")).toHaveClass(/is-programmatic-scrolling/);
  await expect
    .poll(
      () =>
        page.locator("#timeline").evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return rect.bottom > 0 && rect.top < window.innerHeight;
        }),
      { timeout: 1800 }
    )
    .toBe(true);
  await expect(page.locator("html")).not.toHaveClass(/is-programmatic-scrolling/);
  await expect(page).toHaveURL(/#timeline$/);
  expect(Date.now() - startedAt).toBeLessThan(1800);
});

test("language toggle translates and persists the selected language", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Switch language to Spanish" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { name: "Construyamos algo útil." })).toBeAttached();
  await expect(page.getByText("Flujos para uso recurrente", { exact: true })).toBeAttached();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("button", { name: "Switch language to English" })).toBeVisible();
});

test("header zones never overlap across responsive widths", async ({ page }) => {
  await page.goto("/");

  for (const width of [1914, 1440, 1280, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });

    const layout = await page.evaluate(() => {
      const getBox = (selector) => {
        const element = document.querySelector(selector);
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        return {
          display: style.display,
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
        };
      };
      const overlaps = (first, second) =>
        first.display !== "none" &&
        second.display !== "none" &&
        first.left < second.right &&
        first.right > second.left &&
        first.top < second.bottom &&
        first.bottom > second.top;
      const brand = getBox(".brand-mark");
      const nav = getBox(".site-nav");
      const actions = getBox(".header-actions");
      const header = getBox(".site-header");
      const hero = getBox(".hero-section");
      const selectedWork = getBox(".selected-works-section");

      return {
        brandNav: overlaps(brand, nav),
        navActions: overlaps(nav, actions),
        brandActions: overlaps(brand, actions),
        brandName: document.querySelector(".brand-mark strong").textContent,
        surfacesAligned:
          Math.abs(header.left - hero.left) < 1 && Math.abs(header.right - hero.right) < 1,
        heroFillsViewport:
          Math.abs(hero.left) < 1 &&
          Math.abs(hero.right - document.documentElement.clientWidth) < 1,
        heroTouchesSelectedWork: Math.abs(selectedWork.top - hero.bottom) < 1,
        heroCopyOverlay: window.getComputedStyle(document.querySelector(".hero-copy"), "::before")
          .display,
        horizontalOverflow:
          document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    expect(layout.brandName).toBe("Juan Parra");
    expect(layout.brandNav).toBe(false);
    expect(layout.navActions).toBe(false);
    expect(layout.brandActions).toBe(false);
    expect(layout.surfacesAligned).toBe(true);
    expect(layout.heroFillsViewport).toBe(true);
    expect(layout.heroTouchesSelectedWork).toBe(true);
    expect(layout.heroCopyOverlay).toBe("none");
    expect(layout.horizontalOverflow).toBe(false);
  }
});

test("selected work adapts to mobile resize without a reload", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");

  const galleryTrack = page.locator(".selected-gallery-track");
  await expect(galleryTrack).not.toHaveClass(/is-static/);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(galleryTrack).toHaveClass(/is-static/);

  const layout = await page.evaluate(() => {
    const overlaps = (first, second) =>
      first.left < second.right &&
      first.right > second.left &&
      first.top < second.bottom &&
      first.bottom > second.top;
    const brand = document.querySelector(".brand-mark").getBoundingClientRect();
    const actions = document.querySelector(".header-actions").getBoundingClientRect();
    const slides = [...document.querySelectorAll(".transition-gallery__slide")];
    const visibleSlidesHiddenFromAssistiveTech = slides.filter((slide) => {
      const rect = slide.getBoundingClientRect();
      const style = window.getComputedStyle(slide);
      const visible =
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== "none" &&
        style.visibility !== "hidden";

      return visible && slide.getAttribute("aria-hidden") === "true";
    });

    return {
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      headerOverlap: overlaps(brand, actions),
      slideCount: slides.length,
      hiddenVisibleSlideCount: visibleSlidesHiddenFromAssistiveTech.length,
    };
  });

  expect(layout.horizontalOverflow).toBe(false);
  expect(layout.headerOverlap).toBe(false);
  expect(layout.slideCount).toBe(5);
  expect(layout.hiddenVisibleSlideCount).toBe(0);
});

test("skills explorer stays readable and compact across responsive widths", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#skills");

  const desktopLayout = await page.evaluate(() => {
    const card = document.querySelector(".skills-explorer__exploring").getBoundingClientRect();
    const paragraph = document
      .querySelector(".skills-explorer__exploring p")
      .getBoundingClientRect();

    return {
      cardWidth: card.width,
      paragraphWidth: paragraph.width,
      paragraphFits: paragraph.right <= card.right,
    };
  });

  expect(desktopLayout.cardWidth).toBeGreaterThan(300);
  expect(desktopLayout.paragraphWidth).toBeGreaterThan(250);
  expect(desktopLayout.paragraphFits).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });

  const mobileLayout = await page.evaluate(() => {
    const section = document.querySelector("#skills");
    const groups = document.querySelector(".skills-explorer__groups");
    const projectList = document.querySelector(".project-signal-list");
    const exploringText = document
      .querySelector(".skills-explorer__exploring p")
      .getBoundingClientRect();

    return {
      exploringTextWidth: exploringText.width,
      groupsAreScrollable: groups.scrollWidth > groups.clientWidth,
      groupsHeight: groups.getBoundingClientRect().height,
      projectListIsScrollable: projectList.scrollWidth > projectList.clientWidth,
      sectionHeight: section.getBoundingClientRect().height,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  expect(mobileLayout.exploringTextWidth).toBeGreaterThan(200);
  expect(mobileLayout.groupsAreScrollable).toBe(true);
  expect(mobileLayout.groupsHeight).toBeLessThan(340);
  expect(mobileLayout.projectListIsScrollable).toBe(true);
  expect(mobileLayout.sectionHeight).toBeLessThan(1300);
  expect(mobileLayout.horizontalOverflow).toBe(false);
});

test("code rain animates safely and becomes static with reduced motion", async ({ page }) => {
  const readCanvasState = () =>
    page.evaluate(() => {
      const canvas = document.querySelector('[data-testid="code-rain-background"]');
      const context = canvas.getContext("2d");
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let hash = 2166136261;
      let visibleSamples = 0;

      for (let index = 3; index < pixels.length; index += 64) {
        const alpha = pixels[index];
        hash = Math.imul(hash ^ alpha, 16777619);

        if (alpha > 0) {
          visibleSamples += 1;
        }
      }

      return { hash, visibleSamples };
    });

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");

  const canvas = page.getByTestId("code-rain-background");
  await expect(canvas).toHaveAttribute("aria-hidden", "true");
  await expect(canvas).toHaveCSS("pointer-events", "none");
  await expect(canvas).toHaveCSS("mix-blend-mode", "normal");

  await expect
    .poll(async () => (await readCanvasState()).visibleSamples, { timeout: 2000 })
    .toBeGreaterThan(0);

  const movingStart = await readCanvasState();
  await page.waitForTimeout(240);
  const movingEnd = await readCanvasState();

  expect(movingStart.visibleSamples).toBeGreaterThan(0);
  expect(movingEnd.hash).not.toBe(movingStart.hash);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(canvas).toHaveClass(/is-static/);

  const staticStart = await readCanvasState();
  await page.waitForTimeout(240);
  const staticEnd = await readCanvasState();

  expect(staticStart.visibleSamples).toBeGreaterThan(0);
  expect(staticEnd.hash).toBe(staticStart.hash);
});

test("mobile top composition stays compact and readable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const layout = await page.evaluate(() => {
    const header = document.querySelector(".site-header").getBoundingClientRect();
    const selectedTitle = document
      .querySelector(".selected-works-intro h2")
      .getBoundingClientRect();
    const canvasStyle = getComputedStyle(document.querySelector(".code-rain-background"));

    return {
      headerHeight: header.height,
      heroActionsDisplay: getComputedStyle(document.querySelector(".hero-actions")).display,
      githubDisplay: getComputedStyle(document.querySelector('.social-links a[href*="github.com"]'))
        .display,
      selectedTitleWidth: selectedTitle.width,
      rainOpacity: Number.parseFloat(canvasStyle.opacity),
      rainZIndex: Number.parseInt(canvasStyle.zIndex, 10),
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  expect(layout.headerHeight).toBeLessThanOrEqual(68);
  expect(layout.heroActionsDisplay).toBe("none");
  expect(layout.githubDisplay).toBe("none");
  expect(layout.selectedTitleWidth).toBeLessThanOrEqual(362);
  expect(layout.rainOpacity).toBeGreaterThanOrEqual(0.55);
  expect(layout.rainZIndex).toBe(3);
  expect(layout.horizontalOverflow).toBe(false);
});

test("renders on mobile with reduced motion and no critical errors", async ({ page }) => {
  const criticalErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      criticalErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => criticalErrors.push(error.message));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("#selected-work")).toBeVisible();
  await expect(page.locator("#contact")).toBeAttached();
  expect(criticalErrors).toEqual([]);
});
