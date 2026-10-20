const STROKE = "stroke-[#090F05] dark:stroke-violet-300";
const GLOW = "dark:[filter:drop-shadow(0_0_6px_rgba(167,139,250,0.7))]";

type StickerProps = { className?: string };

export function StarSticker({ className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className={`block h-auto ${GLOW} ${className}`}>
      <path
        d="M40 6l9.6 21.4 23.4 2.4-17.5 15.7 5 23.1L40 57.4 19.5 68.6l5-23.1L7 29.8l23.4-2.4z"
        strokeWidth="3.5"
        strokeLinejoin="round"
        className={`fill-[#E8F3DA] dark:fill-transparent ${STROKE}`}
      />
    </svg>
  );
}

export function FlowerSticker({ className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className={`block h-auto ${GLOW} ${className}`}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="40"
          cy="20"
          rx="10"
          ry="15"
          strokeWidth="3.5"
          transform={`rotate(${deg} 40 40)`}
          className={`fill-[#FFD6E0] dark:fill-transparent ${STROKE}`}
        />
      ))}
      <circle cx="40" cy="40" r="9" strokeWidth="3.5" className={`fill-[#B2EB76] dark:fill-transparent ${STROKE}`} />
    </svg>
  );
}

export function SmileySticker({ className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className={`block h-auto ${GLOW} ${className}`}>
      <circle cx="40" cy="40" r="32" strokeWidth="3.5" className={`fill-[#D3EEC8] dark:fill-transparent ${STROKE}`} />
      <circle cx="30" cy="33" r="3.5" className="fill-[#090F05] dark:fill-violet-300" />
      <circle cx="50" cy="33" r="3.5" className="fill-[#090F05] dark:fill-violet-300" />
      <path d="M26 47c4 9 24 9 28 0" fill="none" strokeWidth="3.5" strokeLinecap="round" className={STROKE} />
    </svg>
  );
}

export function HelloSticker({ className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" className={`block h-auto ${GLOW} ${className}`}>
      <rect x="4" y="8" width="112" height="64" rx="32" strokeWidth="3.5" className={`fill-[#CBD5FF] dark:fill-transparent ${STROKE}`} />
      <text
        x="60"
        y="48"
        textAnchor="middle"
        fontSize="25"
        fontWeight="700"
        className="fill-[#090F05] dark:fill-violet-300 [font-family:'Segoe_Print','Bradley_Hand','Marker_Felt','Comic_Sans_MS',cursive] dark:[font-family:ui-monospace,monospace]"
      >
        hello
      </text>
    </svg>
  );
}

export function PencilSticker({ className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 200 40" aria-hidden="true" className={`block h-auto ${GLOW} ${className}`}>
      <path d="M8 20l22-13h140v26H30z" strokeWidth="3.5" strokeLinejoin="round" className={`fill-[#E8F3DA] dark:fill-transparent ${STROKE}`} />
      <path d="M8 20l22-13v26z" strokeWidth="3.5" strokeLinejoin="round" className={`fill-[#FFD6E0] dark:fill-transparent ${STROKE}`} />
      <path d="M8 20l8-4.7v9.4z" className="fill-[#090F05] dark:fill-violet-300" />
      <path d="M170 7h20a4 4 0 014 4v18a4 4 0 01-4 4h-20z" strokeWidth="3.5" strokeLinejoin="round" className={`fill-[#B2EB76] dark:fill-transparent ${STROKE}`} />
      <path d="M62 7v26M70 7v26" strokeWidth="3" className={STROKE} />
    </svg>
  );
}

export function RulerSticker({ className = "" }: StickerProps) {
  return (
    <svg viewBox="0 0 220 44" aria-hidden="true" className={`block h-auto ${GLOW} ${className}`}>
      <rect x="4" y="6" width="212" height="32" rx="6" strokeWidth="3.5" className={`fill-[#C7E4FF] dark:fill-transparent ${STROKE}`} />
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M${22 + i * 14} 6v${i % 2 === 0 ? 14 : 9}`}
          strokeWidth="3"
          className={STROKE}
        />
      ))}
    </svg>
  );
}
