import type { Fit, System } from "./types";
import { familyCss } from "./templates";

const cache = new Map<string, Fit>();

export async function loadFonts(system: System): Promise<void> {
  const family = familyCss(system.font.family);
  await Promise.all([
    document.fonts.load(`${system.font.titleWeight} ${system.titleSize.max}px ${family}`),
    document.fonts.load(`${system.font.labelWeight} ${system.labelSize}px ${family}`),
  ]);
  await document.fonts.ready;
}

export function clearFitCache(): void {
  cache.clear();
}

export function fitTitle(text: string, box: { width: number; height: number }, system: System): Fit {
  const key = `${system.font.family}|${system.font.titleWeight}|${box.width}x${box.height}|${system.lineHeight}|${system.maxLines}|${text}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  Object.assign(el.style, {
    position: "absolute",
    left: "-20000px",
    top: "0",
    visibility: "hidden",
    pointerEvents: "none",
    boxSizing: "border-box",
    margin: "0",
    padding: "0",
    border: "0",
    width: `${box.width}px`,
    fontFamily: familyCss(system.font.family),
    fontWeight: String(system.font.titleWeight),
    fontStyle: "normal",
    letterSpacing: "normal",
    textTransform: "none",
    lineHeight: String(system.lineHeight),
    whiteSpace: "pre-wrap",
    overflowWrap: "normal",
    wordBreak: "normal",
  });
  el.style.fontOpticalSizing = "auto";
  el.textContent = text || " ";
  document.body.appendChild(el);

  const measure = (size: number) => {
    el.style.fontSize = `${size}px`;
    const height = el.getBoundingClientRect().height;
    const lines = Math.max(1, Math.round(height / (size * system.lineHeight)));
    const fits = !(el.scrollWidth > el.clientWidth + 0.5) && lines <= system.maxLines && height <= box.height + 0.5;
    return { fits, lines };
  };

  const { min, max } = system.titleSize;
  let result: Fit | null = null;
  for (let size = max; size >= min; size--) {
    const m = measure(size);
    if (m.fits) {
      result = { size, lines: m.lines, overflow: false };
      break;
    }
  }
  if (result) {
    const floor = Math.max(min, 0.9 * result.size);
    for (let size = result.size - 1; size >= floor; size--) {
      const m = measure(size);
      if (m.fits && m.lines < result.lines) {
        result = { size, lines: m.lines, overflow: false };
        break;
      }
    }
  } else {
    result = { size: min, lines: measure(min).lines, overflow: true };
  }
  el.remove();
  cache.set(key, result);
  return result;
}
