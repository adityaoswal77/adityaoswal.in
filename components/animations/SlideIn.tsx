'use client';

import { motion } from 'framer-motion';

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideIn({ 
  children, 
  direction = 'left', 
  delay = 0, 
  duration = 0.5,
  className = '' 
}: SlideInProps) {
  const getInitialX = () => {
    switch (direction) {
      case 'left': return -100;
      case 'right': return 100;
      default: return 0;
    }
  };

  const getInitialY = () => {
    switch (direction) {
      case 'up': return 100;
      case 'down': return -100;
      default: return 0;
    }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        x: getInitialX(),
        y: getInitialY()
      }}
      animate={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 