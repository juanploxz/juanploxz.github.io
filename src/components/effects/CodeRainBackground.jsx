import { useEffect, useRef } from "react";
import { useCompactVisuals } from "../../hooks/useCompactVisuals";
import { NAVIGATION_END_EVENT, NAVIGATION_START_EVENT } from "../../lib/scrollNavigation";

const CODE_SEQUENCES = [
  ["function App()", "{", "return ("],
  ["useEffect(() =>", "requestAnimationFrame()", "cancelAnimationFrame()"],
  ["useMemo(() =>", "const projects", "projects.find()"],
  ["const timeline", "timeline.map()", "<TimelineSection />"],
  ["const skillGroups", "activeSkill", "handleSkillSelect()"],
  ["selectedProjectId", "handleProjectSelect()", "<ProjectsSection />"],
  ["navLinks.map()", "aria-hidden", "<HeroSection />"],
  ["localStorage.setItem()", "document.documentElement.lang", 'language === "es"'],
  ["project.accent", "project.skills", "<SkillsSection />"],
  ["prefers-reduced-motion", 'reducedMotion ? "auto"', "<MotionConfig />"],
  ["const canvas", "context.fillText()", "devicePixelRatio"],
  ["transitionGallery", "scrollProgress", "translate3d()"],
  ["async function load()", "await import()", "return module"],
  ["const target", "scrollIntoView()", "history.pushState()"],
  ["grid-template-columns", "minmax(0, 1fr)", "gap: var(--space)"],
  ["opacity: 0", "opacity: 1", "will-change: transform"],
  ["npm run lint", "npm run build", "vite build"],
  ["0x1F", "101101", "!=="],
  ["const queue = []", "queue.push(task)", "await run(queue)"],
  ["filter()", "map()", "find()"],
  ["<ContactSection />", "mailto:", 'rel="noreferrer"'],
  ["aria-labelledby", 'role="region"', "tabIndex={0}"],
  ["const compact", "navigator.deviceMemory", "hardwareConcurrency"],
  ["pointer-events: none", "overflow-x: clip", "z-index: 0"],
  ["useState(projects[0].id)", "setSelectedProjectId()", "setActiveSkill()"],
  ["const localizedProjects", "localizeProjects()", "[language]"],
  ["document.querySelector()", "getBoundingClientRect()", "window.scrollY"],
  ["window.scrollTo()", 'behavior: "smooth"', 'block: "start"'],
  ["useSectionProgress()", "setProgress()", "Math.max(1, distance)"],
  ['addEventListener("scroll")', "{ passive: true }", "removeEventListener()"],
  ["usePinnedSectionProgress()", "progressRef.current", "clamp(progress)"],
  ["useCompactVisuals()", "matchMedia()", "(max-width: 820px)"],
  ["useLanguage()", "toggleLanguage()", "portfolio-language"],
  ["createContext(null)", "useContext()", "<LanguageProvider />"],
  ["Object.fromEntries()", "skills.map()", "skillLookup"],
  ["skillCatalogGroups", "flatMap()", "exploringSkills"],
  ["<LayoutGroup />", "<AnimatePresence />", 'mode="wait"'],
  ["<Motion.article />", "variants={revealItem}", 'initial="hidden"'],
  ["motionTransitions", "motionEasing", "viewportOnce"],
  ["revealContainer", "compactStagger", "cardHover"],
  ["<ProjectVisual />", 'size="detail"', "visualRenderers"],
  ["<ProjectCaseStudy />", "<ProjectStage />", "project.links"],
  ["<SkillChip />", "related={true}", "onSkillSelect()"],
  ["<SectionHeader />", "titleId={titleId}", 'align="center"'],
  ["<SelectedWorksGallerySection />", "<TransitionGallery />", "staticMode={isStatic}"],
  ["getGalleryPosition()", "getSlideMotion()", "smooth(progress)"],
  ["context.setTransform()", "context.clearRect()", "context.globalAlpha"],
  ["targetFrameDuration", "accumulatedTime", "document.hidden"],
  ["<React.StrictMode>", "createRoot()", "<App />"],
  ["window.open()", '"_blank"', '"noopener,noreferrer"'],
  ["getInitialLanguage()", "getTranslation()", "interpolate()"],
  ["const selectedProject", "localizedProjects.find()", "projectsForActiveSkill"],
  ["new Set()", "Array.from()", "Math.floor()"],
  ["Math.min()", "Math.max()", "randomBetween()"],
  ["createParticle()", "emitBurst()", "particle.life"],
  ["lineTypingSpeeds", "typedCharacters", "visibleCharacters"],
  ["canvas.width", "canvas.height", "context.font"],
  ["data-testid", "aria-selected", 'role="option"'],
];

const MAX_STREAM_LINES = Math.max(...CODE_SEQUENCES.map((sequence) => sequence.length));

const COLORS = [
  "rgb(246 240 227)",
  "rgb(180 214 232)",
  "rgb(142 216 255)",
  "rgb(142 232 220)",
  "rgb(196 207 214)",
  "rgb(215 255 100)",
];

function getTokenColorIndex(fragment) {
  if (/^(const|let|return|async|if|function|useEffect|useMemo|npm)/.test(fragment)) {
    return 0;
  }

  if (/=>|===|!==|&&|>>|=|\+=/.test(fragment)) {
    return 2;
  }

  if (/[{}[\]]/.test(fragment)) {
    return 3;
  }

  if (/\d/.test(fragment)) {
    return 4;
  }

  return 1;
}

const TOKEN_META = new Map(
  CODE_SEQUENCES.flat().map((fragment) => [fragment, createTokenMeta(fragment)])
);

function createTokenMeta(fragment) {
  const frames = [];

  for (let index = 1; index <= fragment.length; index += 1) {
    frames.push(fragment.slice(0, index));
  }

  return {
    colorIndex: getTokenColorIndex(fragment),
    frames,
    value: fragment,
  };
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function pickSequenceIndex(stream, streams) {
  const activeSequences = new Set();

  for (let index = 0; index < streams.length; index += 1) {
    const candidate = streams[index];

    if (candidate !== stream && candidate.sequenceIndex >= 0) {
      activeSequences.add(candidate.sequenceIndex);
    }
  }

  const availableSequences = [];

  for (let index = 0; index < CODE_SEQUENCES.length; index += 1) {
    if (!activeSequences.has(index) && index !== stream.previousSequenceIndex) {
      availableSequences.push(index);
    }
  }

  const sequencePool = availableSequences.length
    ? availableSequences
    : CODE_SEQUENCES.map((_, index) => index).filter(
        (index) => index !== stream.previousSequenceIndex
      );

  return sequencePool[Math.floor(Math.random() * sequencePool.length)];
}

function resetStream(stream, streams, width, height, compact, initial = false) {
  const laneWidth = compact ? 92 : 118;
  const laneCount = Math.max(1, Math.floor(width / laneWidth));
  const lane = stream.index % laneCount;
  const normalizedLane = (lane + 0.5) / laneCount;
  const centeredLane = normalizedLane - 0.5;
  const edgeBiasedLane =
    0.5 +
    Math.sign(centeredLane) * Math.pow(Math.abs(centeredLane) * 2, compact ? 0.9 : 0.72) * 0.5;

  stream.x = edgeBiasedLane * width + randomBetween(-laneWidth * 0.14, laneWidth * 0.14);
  stream.y = initial
    ? (stream.index * 173 + height * 0.17) % Math.max(1, height)
    : randomBetween(compact ? -90 : -120, -24);
  stream.speed = randomBetween(compact ? 20 : 22, compact ? 34 : 44);
  stream.fontSize = randomBetween(compact ? 9 : 10, compact ? 10.5 : 12.5);
  stream.gap = randomBetween(compact ? 24 : 25, compact ? 29 : 32);
  stream.previousSequenceIndex = stream.sequenceIndex;
  stream.sequenceIndex = pickSequenceIndex(stream, streams);
  stream.trailLength = Math.min(
    CODE_SEQUENCES[stream.sequenceIndex].length,
    Math.floor(randomBetween(compact ? 3 : 3, compact ? 4.8 : 5.6))
  );
  stream.opacity = randomBetween(compact ? 0.14 : 0.17, compact ? 0.21 : 0.27);

  if (!compact && stream.x > width * 0.14 && stream.x < width * 0.58) {
    stream.opacity *= 0.78;
  }

  stream.typedCharacters.fill(0);
  stream.lineStarted.fill(0);

  for (let index = 0; index < MAX_STREAM_LINES; index += 1) {
    stream.lineTypingSpeeds[index] = randomBetween(compact ? 2.1 : 2.4, compact ? 3.3 : 4);
  }

  stream.textAlign = stream.x > width * 0.68 ? "right" : "left";
  stream.highlightHead = Math.random() < 0.14;
  stream.burstTriggered = false;
}

function createStream(index) {
  return {
    index,
    x: 0,
    y: 0,
    speed: 0,
    fontSize: 0,
    gap: 0,
    trailLength: 0,
    opacity: 0,
    sequenceIndex: -1,
    previousSequenceIndex: -1,
    typedCharacters: new Float32Array(MAX_STREAM_LINES),
    lineStarted: new Uint8Array(MAX_STREAM_LINES),
    lineTypingSpeeds: new Float32Array(MAX_STREAM_LINES),
    textAlign: "left",
    highlightHead: false,
    burstTriggered: false,
  };
}

function createParticle() {
  return {
    active: false,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    life: 0,
    maxLife: 0,
    size: 0,
    colorIndex: 0,
  };
}

function emitBurst(particles, x, y, colorIndex, compact) {
  const particleCount = compact ? 2 : 3;
  let emitted = 0;

  for (let index = 0; index < particles.length && emitted < particleCount; index += 1) {
    const particle = particles[index];

    if (particle.active) {
      continue;
    }

    const angle = (Math.PI * 2 * emitted) / particleCount + randomBetween(-0.18, 0.18);
    const force = randomBetween(compact ? 6 : 7, compact ? 11 : 15);

    particle.active = true;
    particle.x = x;
    particle.y = y;
    particle.velocityX = Math.cos(angle) * force;
    particle.velocityY = Math.sin(angle) * force;
    particle.maxLife = randomBetween(0.16, 0.27);
    particle.life = particle.maxLife;
    particle.size = randomBetween(0.6, compact ? 0.95 : 1.15);
    particle.colorIndex = colorIndex;
    emitted += 1;
  }
}

function drawStreams(context, streams, particles, width, height, delta, compact) {
  context.clearRect(0, 0, width, height);
  context.textBaseline = "top";

  for (let streamIndex = 0; streamIndex < streams.length; streamIndex += 1) {
    const stream = streams[streamIndex];
    const sequence = CODE_SEQUENCES[stream.sequenceIndex];
    const headMeta = TOKEN_META.get(sequence[sequence.length - 1]);
    const burstColorIndex = stream.highlightHead ? 5 : headMeta.colorIndex;
    stream.y += stream.speed * delta;

    context.font = `${stream.fontSize}px "SFMono-Regular", Consolas, "Liberation Mono", monospace`;
    context.textAlign = stream.textAlign;

    for (let tokenIndex = 0; tokenIndex < stream.trailLength; tokenIndex += 1) {
      const y = stream.y - tokenIndex * stream.gap;

      if (y < -stream.fontSize || y > height + stream.gap) {
        continue;
      }

      const sequenceIndex = sequence.length - 1 - tokenIndex;
      const tokenMeta = TOKEN_META.get(sequence[sequenceIndex]);
      const isHead = tokenIndex === 0;
      if (!stream.lineStarted[tokenIndex]) {
        stream.lineStarted[tokenIndex] = 1;
        stream.typedCharacters[tokenIndex] = 0;
      } else if (stream.typedCharacters[tokenIndex] < tokenMeta.frames.length) {
        stream.typedCharacters[tokenIndex] = Math.min(
          tokenMeta.frames.length,
          stream.typedCharacters[tokenIndex] + stream.lineTypingSpeeds[tokenIndex] * delta
        );
      }

      const visibleCharacters = Math.floor(stream.typedCharacters[tokenIndex]);

      if (visibleCharacters <= 0) {
        continue;
      }

      const fragment = tokenMeta.frames[Math.min(tokenMeta.frames.length, visibleCharacters) - 1];
      const edgeFade = Math.min(1, Math.max(0, y / 54), Math.max(0, (height - y) / 72));
      const trailFade = 1 - tokenIndex / (stream.trailLength + 1);

      context.globalAlpha = stream.opacity * edgeFade * trailFade * (isHead ? 1.5 : 1);
      context.fillStyle = COLORS[isHead && stream.highlightHead ? 5 : tokenMeta.colorIndex];
      context.fillText(fragment, stream.x, y);
    }

    if (!stream.burstTriggered && stream.y >= height - 10) {
      emitBurst(particles, stream.x + stream.fontSize, height - 8, burstColorIndex, compact);
      stream.burstTriggered = true;
    }

    if (stream.y - stream.trailLength * stream.gap > height + 24) {
      resetStream(stream, streams, width, height, compact);
    }
  }

  for (let index = 0; index < particles.length; index += 1) {
    const particle = particles[index];

    if (!particle.active) {
      continue;
    }

    particle.life -= delta;

    if (particle.life <= 0) {
      particle.active = false;
      continue;
    }

    particle.x += particle.velocityX * delta;
    particle.y += particle.velocityY * delta;
    particle.velocityX *= 0.97;
    particle.velocityY *= 0.97;

    const lifeRatio = particle.life / particle.maxLife;
    context.globalAlpha = lifeRatio * 0.2;
    context.fillStyle = COLORS[particle.colorIndex];
    context.fillRect(particle.x, particle.y, particle.size, particle.size);
  }

  context.globalAlpha = 1;
  context.textAlign = "left";
}

function drawStatic(context, streams, width, height) {
  context.clearRect(0, 0, width, height);
  context.textBaseline = "top";

  for (let index = 0; index < streams.length; index += 1) {
    const stream = streams[index];
    const y = ((index * 137 + 84) % Math.max(160, height - 40)) + 20;
    const sequence = CODE_SEQUENCES[stream.sequenceIndex];
    const tokenMeta = TOKEN_META.get(sequence[index % sequence.length]);

    context.globalAlpha = 0.07;
    context.fillStyle = COLORS[tokenMeta.colorIndex];
    context.font = `${stream.fontSize}px "SFMono-Regular", Consolas, "Liberation Mono", monospace`;
    context.fillText(tokenMeta.value, stream.x, y);
  }

  context.globalAlpha = 1;
}

function CodeRainBackground({ reducedMotion = false }) {
  const canvasRef = useRef(null);
  const compactVisuals = useCompactVisuals();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });

    if (!canvas || !context) {
      return undefined;
    }

    const lowPowerDevice =
      compactVisuals ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const compact = Boolean(lowPowerDevice);
    const targetFrameDuration = 1000 / (compact ? 24 : 36);
    let width = 0;
    let height = 0;
    let streams = [];
    let particles = [];
    let animationFrame = 0;
    let resizeFrame = 0;
    let previousTime = performance.now();
    let accumulatedTime = 0;
    let navigationPaused = false;
    let manualScrollPaused = false;
    let scrollResumeTimer = 0;

    const configureCanvas = () => {
      width = document.documentElement.clientWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const streamCount = Math.min(
        compact ? 5 : 12,
        Math.max(compact ? 4 : 8, Math.floor(width / (compact ? 94 : 120)))
      );
      const particleCount = compact ? 12 : 28;
      streams = Array.from({ length: streamCount }, (_, index) => createStream(index));
      particles = Array.from({ length: particleCount }, createParticle);

      for (let index = 0; index < streams.length; index += 1) {
        resetStream(streams[index], streams, width, height, compact, true);
      }

      if (reducedMotion) {
        drawStatic(context, streams, width, height);
      } else {
        drawStreams(context, streams, particles, width, height, 0, compact);
      }
    };

    const render = (time) => {
      animationFrame = window.requestAnimationFrame(render);
      const elapsed = Math.min(64, time - previousTime);
      previousTime = time;
      accumulatedTime += elapsed;

      if (accumulatedTime < targetFrameDuration) {
        return;
      }

      drawStreams(context, streams, particles, width, height, accumulatedTime / 1000, compact);
      accumulatedTime = 0;
    };

    const start = () => {
      if (
        reducedMotion ||
        animationFrame ||
        document.hidden ||
        navigationPaused ||
        manualScrollPaused
      ) {
        return;
      }

      previousTime = performance.now();
      animationFrame = window.requestAnimationFrame(render);
    };

    const stop = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    const handleNavigationStart = () => {
      window.clearTimeout(scrollResumeTimer);
      manualScrollPaused = false;
      navigationPaused = true;
      stop();
    };

    const handleNavigationEnd = () => {
      navigationPaused = false;
      start();
    };

    const handleScroll = () => {
      if (navigationPaused || reducedMotion) {
        return;
      }

      manualScrollPaused = true;
      stop();
      window.clearTimeout(scrollResumeTimer);
      scrollResumeTimer = window.setTimeout(() => {
        manualScrollPaused = false;
        start();
      }, 120);
    };

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(configureCanvas);
    };

    configureCanvas();
    start();
    window.addEventListener("resize", handleResize, { passive: true });
    window.visualViewport?.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(NAVIGATION_START_EVENT, handleNavigationStart);
    window.addEventListener(NAVIGATION_END_EVENT, handleNavigationEnd);

    return () => {
      stop();
      window.clearTimeout(scrollResumeTimer);
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(NAVIGATION_START_EVENT, handleNavigationStart);
      window.removeEventListener(NAVIGATION_END_EVENT, handleNavigationEnd);
    };
  }, [compactVisuals, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`code-rain-background${reducedMotion ? " is-static" : ""}`}
      aria-hidden="true"
      data-testid="code-rain-background"
    />
  );
}

export default CodeRainBackground;
