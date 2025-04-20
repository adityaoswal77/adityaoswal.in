import { motion } from 'framer-motion';

interface BreathingTextProps {
  text: string;
  className?: string;
}

export function BreathingText({ text, className = '' }: BreathingTextProps) {
  return (
    <motion.span
      className={`font-variable ${className}`}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      }}
      whileHover={{
        fontVariationSettings: "'wght' 900, 'slnt' -10",
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.span>
  );
} 