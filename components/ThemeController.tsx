"use client";

import React, { useState, useEffect } from 'react';

const THEMES = [
  { name: "Forest Green", hex: "#0D4715" },
  { name: "Blue", hex: "#BF124D" },
  { name: "Electric Blue", hex: "#1055C9" },
  { name: "Emerald Green", hex: "#01A650" },
  { name: "Sky Blue", hex: "#24576E" },
];

const STORAGE_KEY = 'theme-color';

export const ThemeController = () => {
  const [activeColor, setActiveColor] = useState(THEMES[0].hex);
  const [mounted, setMounted] = useState(false);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  // Initialize from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES.some(t => t.hex === saved)) {
      setActiveColor(saved);
      document.documentElement.style.setProperty("--primary", saved);
      document.documentElement.style.setProperty("--primary-rgb", hexToRgb(saved));
    } else {
      document.documentElement.style.setProperty("--primary", THEMES[0].hex);
      document.documentElement.style.setProperty("--primary-rgb", hexToRgb(THEMES[0].hex));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.style.setProperty("--primary", activeColor);
      document.documentElement.style.setProperty("--primary-rgb", hexToRgb(activeColor));
      localStorage.setItem(STORAGE_KEY, activeColor);
    }
  }, [activeColor, mounted]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 backdrop-blur-md transition-all hover:bg-[var(--card)]/80 shadow-lg">
      <span className="mr-2 hidden md:block text-xs font-mono font-bold uppercase tracking-widest text-[var(--muted)]">
        Vibe
      </span>
      {THEMES.map((theme) => (
        <button
          key={theme.name}
          onClick={() => setActiveColor(theme.hex)}
          className="group relative flex h-6 w-6 items-center justify-center bg-transparent border-none p-0 cursor-pointer"
          style={{ backgroundColor: 'transparent' }}
          aria-label={`Set theme to ${theme.name}`}
        >
          <span
            className={`h-5 w-5 rounded-full transition-all duration-300 ${activeColor === theme.hex ? "scale-125 ring-2 ring-offset-2 ring-black/20" : "hover:scale-110"
              }`}
            style={{
              backgroundColor: theme.hex,
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          />
        </button>
      ))}
    </div>
  );
};

