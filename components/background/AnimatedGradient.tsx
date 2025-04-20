import React from 'react';

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className = '' }: AnimatedGradientProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="relative w-full h-full">
        <svg className="absolute w-full h-full" style={{ filter: 'blur(30px)' }}>
          <circle
            cx="25%"
            cy="25%"
            r="200"
            fill="#EC4899"
            style={{
              animation: 'background-gradient 20s ease infinite',
              opacity: 0.08,
            }}
          />
          <circle
            cx="75%"
            cy="75%"
            r="200"
            fill="#F472B6"
            style={{
              animation: 'background-gradient 20s ease infinite',
              animationDelay: '-7s',
              opacity: 0.08,
            }}
          />
          <circle
            cx="50%"
            cy="50%"
            r="200"
            fill="#3B82F6"
            style={{
              animation: 'background-gradient 20s ease infinite',
              animationDelay: '-14s',
              opacity: 0.08,
            }}
          />
        </svg>
      </div>
    </div>
  );
} 