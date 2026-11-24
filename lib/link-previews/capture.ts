import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import type { Entry, Fit, System } from "./types";
import { PNG_H, PNG_W, FRAME_H, FRAME_W, readPngSize } from "./definition";
import { Frame, familyNames, titleBoxFor } from "./templates";
import { fitTitle, loadFonts } from "./fit";

export const OVERFLOW_MESSAGE = "The title doesn’t fit, even at 40px. Shorten it or break it differently.";

const fontCache = new Map<string, string>();

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function toDataUrl(url: string): Promise<string> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load ${url}.`);
  return blobToDataUrl(await res.blob());
}

function collectFontRules(sheet: CSSStyleSheet, out: { rule: CSSFontFaceRule; base: string }[]): void {
  let rules: CSSRuleList;
  try {
    rules = sheet.cssRules;
  } catch {
    return;
  }
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSFontFaceRule) out.push({ rule, base: sheet.href ?? document.baseURI });
    else if (rule instanceof CSSImportRule && rule.styleSheet) collectFontRules(rule.styleSheet, out);
  }
}

const USABLE = ["woff2", "woff", "truetype", "opentype"];

function pickSource(src: string, base: string): { url: string; format: string } | null {
  const pattern = /url\(\s*(?:"([^"]+)"|'([^']+)'|([^)]+?))\s*\)\s*(?:format\(\s*["']?([\w-]+)["']?\s*\))?/g;
  for (const match of src.matchAll(pattern)) {
    const raw = match[1] ?? match[2] ?? match[3];
    if (!raw || raw.startsWith("data:")) continue;
    let format: string = match[4]?.replace(/-variations$/, "").toLowerCase() ?? "";
    if (!format) {
      const ext = raw.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
      format = ext === "ttf" ? "truetype" : ext === "otf" ? "opentype" : ext;
    }
    if (!USABLE.includes(format)) continue;
    return { url: new URL(raw, base).href, format };
  }
  return null;
}

async function fontFaceCss(system: System): Promise<string> {
  const key = system.font.family;
  const cached = fontCache.get(key);
  if (cached !== undefined) return cached;
  const names = familyNames(system.font.family).map((n) => n.toLowerCase());
  const found: { rule: CSSFontFaceRule; base: string }[] = [];
  for (const sheet of Array.from(document.styleSheets)) collectFontRules(sheet, found);
  const wanted = found.filter(({ rule }) => {
    const family = rule.style.getPropertyValue("font-family").trim().replace(/^["']|["']$/g, "").toLowerCase();
    const style = rule.style.getPropertyValue("font-style").trim() || "normal";
    return names.includes(family) && style === "normal";
  });
  if (wanted.length === 0) {
    fontCache.set(key, "");
    return "";
  }
  let css = "";
  for (const { rule, base } of wanted) {
    const source = pickSource(rule.style.getPropertyValue("src"), base);
    if (!source) continue;
    const data = await toDataUrl(source.url);
    const family = rule.style.getPropertyValue("font-family").trim().replace(/^["']|["']$/g, "");
    const weight = rule.style.getPropertyValue("font-weight").trim() || "400";
    const range = rule.style.getPropertyValue("unicode-range").trim();
    css += `@font-face{font-family:"${family}";src:url(${data}) format("${source.format}");font-weight:${weight};font-style:normal;${range ? `unicode-range:${range};` : ""}}`;
  }
  if (!css) throw new Error(`Could not find the ${familyNames(system.font.family)[0]} font on this page.`);
  fontCache.set(key, css);
  return css;
}

export async function fitFor(entry: Entry, system: System): Promise<Fit | null> {
  const box = titleBoxFor(entry, system);
  if (!box) return null;
  await loadFonts(system);
  return fitTitle(entry.title, box, system);
}

export async function capturePng(entry: Entry, system: System): Promise<string> {
  const fit = await fitFor(entry, system);
  if (fit?.overflow) throw new Error(`${OVERFLOW_MESSAGE} Then save.`);

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.setAttribute("inert", "");
  host.style.cssText = `position:fixed;left:-20000px;top:0;width:${FRAME_W}px;height:${FRAME_H}px;pointer-events:none`;
  document.body.appendChild(host);
  const root = createRoot(host);
  try {
    flushSync(() => root.render(createElement(Frame, { entry, system, fit })));
    const frame = host.querySelector<HTMLElement>("[data-og-frame]");
    if (!frame) throw new Error("The frame did not render.");

    const originals = Array.from(frame.querySelectorAll("img"));
    await Promise.all(
      originals.map((img) =>
        img.decode().catch(() => {
          throw new Error(`Could not load ${img.getAttribute("src")}.`);
        }),
      ),
    );

    const clone = frame.cloneNode(true) as HTMLElement;
    const clones = Array.from(clone.querySelectorAll("img"));
    await Promise.all(
      clones.map(async (img, i) => {
        const original = originals[i];
        img.setAttribute("src", await toDataUrl(original.currentSrc || original.src));
      }),
    );

    const fonts = await fontFaceCss(system);
    const markup = new XMLSerializer().serializeToString(clone);
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${PNG_W}" height="${PNG_H}" viewBox="0 0 ${FRAME_W} ${FRAME_H}">` +
      `<foreignObject x="0" y="0" width="${FRAME_W}" height="${FRAME_H}">` +
      `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${FRAME_W}px;height:${FRAME_H}px;margin:0;padding:0;overflow:hidden">` +
      `<style>${fonts}</style>${markup}</div></foreignObject></svg>`;

    const image = new Image();
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = PNG_W;
    canvas.height = PNG_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("This browser can’t draw the image.");
    ctx.drawImage(image, 0, 0, PNG_W, PNG_H);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    ctx.clearRect(0, 0, PNG_W, PNG_H);
    ctx.drawImage(image, 0, 0, PNG_W, PNG_H);

    const dataUrl = canvas.toDataURL("image/png");
    const bytes = Uint8Array.from(atob(dataUrl.split(",")[1]), (c) => c.charCodeAt(0));
    const size = readPngSize(bytes);
    if (!size || size.width !== PNG_W || size.height !== PNG_H) {
      throw new Error(`The capture came out ${size?.width ?? 0}×${size?.height ?? 0}, not ${PNG_W}×${PNG_H}.`);
    }
    return dataUrl;
  } catch (error) {
    fontCache.delete(system.font.family);
    throw error;
  } finally {
    root.unmount();
    host.remove();
  }
}

export async function pngFromSource(url: string, redraw: boolean): Promise<string> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load ${url}.`);
  const blob = await res.blob();
  if (!redraw) return blobToDataUrl(blob);
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
  bitmap.close();
  return canvas.toDataURL("image/png");
}

export async function imageSize(url: string): Promise<{ width: number; height: number; png: boolean }> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load ${url}.`);
  const blob = await res.blob();
  const head = new Uint8Array(await blob.slice(0, 8).arrayBuffer());
  const png = head.length === 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((b, i) => head[i] === b);
  const bitmap = await createImageBitmap(blob);
  const size = { width: bitmap.width, height: bitmap.height, png };
  bitmap.close();
  return size;
}

