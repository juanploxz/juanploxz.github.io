export const motionDurations = {
  fast: 0.22,
  base: 0.42,
  slow: 0.7,
};

export const motionEasing = {
  standard: [0.22, 1, 0.36, 1],
  softOut: [0.16, 1, 0.3, 1],
};

export const motionTransitions = {
  reveal: {
    duration: motionDurations.slow,
    ease: motionEasing.standard,
  },
  section: {
    duration: 0.55,
    ease: motionEasing.standard,
  },
  detail: {
    duration: motionDurations.base,
    ease: motionEasing.standard,
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.22,
};

export const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export const compactStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: motionTransitions.reveal,
  },
};

export const revealItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransitions.reveal,
  },
};

export const slideUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransitions.section,
  },
};

export const softScale = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: motionTransitions.section,
  },
};

export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      duration: motionDurations.fast,
      ease: motionEasing.softOut,
    },
  },
};
