export const pageAnimation = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,

    transition: {
      duration: 0.2,
      when: 'beforeChildren',
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: 300,
    transition: {
      duration: 0.5
    }
  }
};

export const titleAnim = {
  hidden: { y: 200, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75 }
  }
};

export const ballAnim = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1
  }
};

export const photoAnim = {
  hidden: { scale: 1.5, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 1
    }
  }
};
