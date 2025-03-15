import { useTheme } from '@mui/material/styles';

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const slideIn = (direction = 'left') => {
  const transitions = {
    left: { x: -30 },
    right: { x: 30 },
    up: { y: 30 },
    down: { y: -30 },
  };

  return {
    initial: { opacity: 0, ...transitions[direction] },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...transitions[direction] },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  };
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
};

export const usePageTransitions = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return {
    card: {
      initial: { opacity: 0, y: 20, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -20, scale: 0.98 },
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      style: {
        backgroundColor: isDark ? 'rgba(19, 47, 76, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: theme.shape.borderRadius * 2,
        boxShadow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
    },
    list: {
      container: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
      item: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { duration: 0.3 },
      },
    },
    drawer: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  };
};
