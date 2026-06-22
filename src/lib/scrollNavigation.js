export const NAVIGATION_START_EVENT = "portfolio:navigation-start";
export const NAVIGATION_END_EVENT = "portfolio:navigation-end";

let animationFrame = 0;
let removeInterruptListeners = null;
let navigationActive = false;

function updateHistory(hash) {
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
}

function finishNavigation() {
  if (!navigationActive) {
    return;
  }

  navigationActive = false;
  animationFrame = 0;
  removeInterruptListeners?.();
  removeInterruptListeners = null;
  document.documentElement.classList.remove("is-programmatic-scrolling");
  window.dispatchEvent(new CustomEvent(NAVIGATION_END_EVENT));
}

export function cancelScrollNavigation() {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame);
  }

  finishNavigation();
}

export function scrollToHash(hash, { reducedMotion = false } = {}) {
  const target = document.querySelector(hash);

  if (!target) {
    return false;
  }

  cancelScrollNavigation();

  const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
  const start = window.scrollY;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const destination =
    hash === "#top"
      ? 0
      : Math.min(maxScroll, Math.max(0, target.getBoundingClientRect().top + start - scrollMargin));
  const distance = destination - start;

  if (reducedMotion || Math.abs(distance) < 2) {
    window.scrollTo(0, destination);
    updateHistory(hash);
    return true;
  }

  const viewportDistance = Math.abs(distance) / Math.max(1, window.innerHeight);
  const duration = Math.min(900, 360 + Math.log2(1 + viewportDistance) * 170);
  const startedAt = performance.now();
  const longDistance = viewportDistance > 2;
  const interruptEvents = ["wheel", "touchstart", "pointerdown"];
  const interrupt = () => cancelScrollNavigation();

  removeInterruptListeners = () => {
    interruptEvents.forEach((eventName) => window.removeEventListener(eventName, interrupt));
    window.removeEventListener("keydown", interrupt);
  };

  interruptEvents.forEach((eventName) =>
    window.addEventListener(eventName, interrupt, { passive: true })
  );
  window.addEventListener("keydown", interrupt);

  navigationActive = true;
  document.documentElement.classList.add("is-programmatic-scrolling");
  window.dispatchEvent(
    new CustomEvent(NAVIGATION_START_EVENT, {
      detail: { longDistance },
    })
  );

  const render = (time) => {
    const progress = Math.min(1, (time - startedAt) / duration);
    const easedProgress =
      progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start + distance * easedProgress);

    if (progress < 1) {
      animationFrame = window.requestAnimationFrame(render);
      return;
    }

    window.scrollTo(0, destination);
    updateHistory(hash);
    finishNavigation();
  };

  animationFrame = window.requestAnimationFrame(render);
  return true;
}
