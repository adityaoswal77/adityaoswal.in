"use client";

const ITEMS = ["Selected Work", "Product Design", "Design Engineering", "UX", "2026"];
const SEP = "·";

function StripContent() {
  return (
    <span className="flex items-center gap-8 pr-8 text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--muted)] opacity-50">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-8">
          <span>{item}</span>
          <span className="opacity-40">{SEP}</span>
        </span>
      ))}
    </span>
  );
}

export function MarqueeStrip() {
  return (
    <div
      className="relative overflow-hidden border-y border-[var(--border)] py-3 bg-[var(--background)]"
      aria-hidden="true"
    >
      <div
        className="marquee-track flex whitespace-nowrap w-max"
        style={{ animation: "marquee 24s linear infinite" }}
      >
        <StripContent />
        <StripContent />
        <StripContent />
        <StripContent />
      </div>
    </div>
  );
}
