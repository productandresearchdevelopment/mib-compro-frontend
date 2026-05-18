export const ANIMATION_VARIANTS = {
  modal: {
    initial: { opacity: 0, scale: 0.9, rotateX: -15 },
    animate: { opacity: 1, scale: 1, rotateX: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  },

  icon: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 },
  },

  content: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },

  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },

  scale: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  },

  scaleUp: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 },
  },

  scaleDown: {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  },

  slideLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },

  slideRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },

  slideLeftLarge: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  },

  slideRightLarge: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },

  rotate: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
  },

  rotateScale: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 },
  },

  rotateLeft: {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 5 },
  },

  rotateRight: {
    initial: { opacity: 0, rotate: 5 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: -5 },
  },

  rotateLeftLarge: {
    initial: { opacity: 0, rotate: -15 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 15 },
  },

  rotateRightLarge: {
    initial: { opacity: 0, rotate: 15 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: -15 },
  },

  rotate3DLeft: {
    initial: { opacity: 0, x: -30, rotateY: -15 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, x: 30, rotateY: 15 },
  },

  rotate3DRight: {
    initial: { opacity: 0, x: 30, rotateY: 15 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, x: -30, rotateY: -15 },
  },

  bounce: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 },
  },

  collapse: {
    initial: { opacity: 0, height: 0, scale: 0.9 },
    animate: { opacity: 1, height: "auto", scale: 1 },
    exit: { opacity: 0, height: 0, scale: 0.9 },
  },

  expand: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  },

  button: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 },
  },

  listItem: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },

  card: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.95 },
  },

  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
  },

  flipX: {
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: 90 },
  },

  flipY: {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
  },
};

export const TRANSITIONS = {
  spring: {
    type: "spring" as const,
    damping: 25,
    stiffness: 300,
  },

  springBouncy: {
    type: "spring" as const,
    damping: 15,
    stiffness: 200,
  },

  springSmooth: {
    type: "spring" as const,
    damping: 20,
    stiffness: 200,
  },

  springSlow: {
    type: "spring" as const,
    damping: 30,
    stiffness: 150,
  },

  springFast: {
    type: "spring" as const,
    damping: 20,
    stiffness: 400,
  },

  tween: {
    type: "tween" as const,
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },

  tweenFast: {
    type: "tween" as const,
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },

  tweenSlow: {
    type: "tween" as const,
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },

  easeOut: {
    type: "tween" as const,
    duration: 0.3,
    ease: [0, 0, 0.2, 1] as [number, number, number, number],
  },

  easeIn: {
    type: "tween" as const,
    duration: 0.3,
    ease: [0.4, 0, 1, 1] as [number, number, number, number],
  },

  linear: {
    type: "tween" as const,
    duration: 0.3,
    ease: [0, 0, 1, 1] as [number, number, number, number],
  },
};

export const STAGGER = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  containerFast: {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },

  containerSlow: {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
};

export const HOVER_TAP = {
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },

  scaleSmall: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  },

  scaleLarge: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },

  lift: {
    whileHover: { y: -5 },
    whileTap: { y: 0 },
  },

  rotate: {
    whileHover: { rotate: 5 },
    whileTap: { rotate: 0 },
  },

  brightness: {
    whileHover: { filter: "brightness(1.1)" },
    whileTap: { filter: "brightness(0.9)" },
  },
};

export const withDelay = (delay: number) => ({
  delay,
});

export const combineTransitions = (
  base: typeof TRANSITIONS.spring,
  delay: number
) => ({
  ...base,
  delay,
});
