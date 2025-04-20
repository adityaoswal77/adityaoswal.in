'use client';

import { motion } from 'framer-motion';

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export function HoverScale({ 
  children, 
  scale = 1.05, 
  duration = 0.2,
  className = '' 
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale: scale }}
      transition={{ duration: duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 