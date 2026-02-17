import React from 'react';

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className = '' }: AnimatedGradientProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="relative w-full h-full">
        <svg className="absolute w-full h-full" style={{ filter: 'blur(22px)' }}>
          <circle
            cx="25%"
            cy="25%"
            r="200"
            fill="#5F264A"
            style={{
              animation: 'background-gradient 10s ease infinite',
              opacity: 0.20,
            }}
          />
          <circle
            cx="69%"
            cy="75%"
            r="200"
            fill="#116D6E"
            style={{
              animation: 'background-gradient 7s ease infinite',
              animationDelay: '-2s',
              opacity: 0.12,
            }}
          />
          <circle
            cx="50%"
            cy="50%"
            r="250"
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