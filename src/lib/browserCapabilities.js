export function supportsWebGL() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function shouldUseCompactVisuals() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
}
