export const menuScreen = {
  visible: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0, ease: [0.25, 0.1, 0.25, 1.0] },
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.3, delay: 0, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};
export const headerBg = {
  visible: {
    background: "#fff",
    transition: { duration: 0.2, delay: 0, ease: [0.165, 0.84, 0.44, 1] },
  },
  hidden: {
    background: "#1e1e1e",
    transition: { duration: 0.2, delay: 0, ease: [0.165, 0.84, 0.44, 1] },
  },
};

export const itemMenu = {
  visible: {
    height: "auto",
    transition: { duration: 0.4, ease: [0.165, 0.84, 0.44, 1] },
  },
  hidden: {
    height: "0",
    transition: { duration: 0.4, ease: [0.165, 0.84, 0.44, 1] },
  },
};

export const menuItem = {
  visible: () => ({
    // y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.25,
      ease: [0.165, 0.84, 0.44, 1],
    },
  }),
  hidden: {
    // y: "1.5rem",
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: [0.61, 1, 0.88, 1],
    },
  },
};
