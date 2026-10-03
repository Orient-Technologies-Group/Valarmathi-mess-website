import React, { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'reveal';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
}

const variants: Record<AnimationType, { hidden: any; visible: any }> = {
  'fade-up': {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 }
  },
  'fade-down': {
    hidden: { opacity: 0, y: -36 },
    visible: { opacity: 1, y: 0 }
  },
  'fade-left': {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 }
  },
  'fade-right': {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 }
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 }
  },
  'reveal': {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  }
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.7,
  className = '',
  viewportMargin = '-60px',
  ...rest
}) => {
  const currentVariant = variants[animation];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={currentVariant}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom smooth editorial cubic-bezier
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  staggerDelay?: number;
  delay?: number;
  className?: string;
  viewportMargin?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.12,
  delay = 0,
  className = '',
  viewportMargin = '-60px',
  ...rest
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
}> = ({ children, animation = 'fade-up', className = '' }) => {
  const currentVariant = variants[animation];
  return (
    <motion.div
      variants={currentVariant}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
