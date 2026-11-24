import type { Entry, EntryImage, Layout, System } from "./types";
import { isSheet, isSingle } from "./types";
import { TEMPLATE_USES, templateOrDefault } from "./template-names";

export const FRAME_W = 1200;
export const FRAME_H = 630;
export const PNG_W = 2400;
export const PNG_H = 1260;
export const SOURCES_DIR = "og/sources";

export function canonical(value: unknown): string {
  return JSON.stringify(sortKeys(value));
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as object).sort()) {
      const v = (value as Record<string, unknown>)[key];
      if (v !== undefined) out[key] = sortKeys(v);
    }
    return out;
  }
  return value;
}

export function fnv1a(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

export function layoutOf(entry: Pick<Entry, "image" | "layout">): Layout {
  if (!entry.image) return "type-only";
  const { layout } = entry;
  if (layout === "type-only" || layout === "type-and-image" || layout === "image-only") return layout;
  return "type-and-image";
}

export function normalizeImage(image: EntryImage): EntryImage {
  if (!image) return null;
  if (isSheet(image)) return { sheet: [...image.sheet], columns: image.columns };
  const out: { src: string; focus: { x: number; y: number }; zoom?: number } = {
    src: image.src,
    focus: { x: image.focus.x, y: image.focus.y },
  };
  if (image.zoom && image.zoom !== 1) out.zoom = image.zoom;
  return out;
}

export function drawnSystem(system: System, template: string, color: string | undefined): System {
  const name = templateOrDefault(template);
  const next: System = { ...system, template: name };
  if (TEMPLATE_USES[name].color && color) next.color = color.toLowerCase();
  else delete next.color;
  return next;
}

export function definitionHash(entry: Entry, system: System): string {
  const layout = layoutOf(entry);
  const image = normalizeImage(entry.image);
  const uses = TEMPLATE_USES[templateOrDefault(system.template)];
  const drawn: Record<string, unknown> =
    layout === "image-only"
      ? { title: entry.title, layout, image }
      : {
          title: entry.title,
          theme: entry.theme,
          layout,
          image: layout === "type-only" ? null : image,
          system: uses.color ? system : withoutColor(system),
        };
  if (entry.alt) drawn.alt = entry.alt;
  return fnv1a(canonical(drawn));
}

function withoutColor(system: System): System {
  const { color: _color, ...rest } = system;
  void _color;
  return rest as System;
}

export function fitsFrame(width: number, height: number): boolean {
  if (width > PNG_W || height > PNG_H) return false;
  return Math.abs(width / height / (FRAME_W / FRAME_H) - 1) <= 0.01;
}

export type SaveMethod = "capture" | "source-bytes" | "source-redraw";

export function saveMethod(args: {
  width: number;
  height: number;
  zoom?: number;
  sheet: boolean;
  layout: Layout;
  png: boolean;
}): SaveMethod {
  const single = !args.sheet && (args.zoom === undefined || args.zoom === 1);
  if (args.layout !== "image-only" || !single || !fitsFrame(args.width, args.height)) return "capture";
  return args.png ? "source-bytes" : "source-redraw";
}

export function readPngSize(bytes: Uint8Array): { width: number; height: number } | null {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (bytes.length < 24) return null;
  for (let i = 0; i < 8; i++) if (bytes[i] !== sig[i]) return null;
  if (bytes[12] !== 0x49 || bytes[13] !== 0x48 || bytes[14] !== 0x44 || bytes[15] !== 0x52) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return { width: view.getUint32(16), height: view.getUint32(20) };
}

export function entryImageSources(image: EntryImage): string[] {
  if (!image) return [];
  if (isSheet(image)) return image.sheet;
  if (isSingle(image)) return [image.src];
  return [];
}

export function altOf(entry: Pick<Entry, "alt" | "title">): string {
  return (entry.alt ?? entry.title).replace(/\s*\n\s*/g, " ");
}

export function idFromPath(path: string, taken: Set<string>): string {
  const base = path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-");
  let id = base;
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
  return id;
}

export function titleFromPath(path: string): string {
  if (path === "/") return "Home";
  const last = path.split("/").filter(Boolean).pop() ?? "";
  return last
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function groupFromPath(path: string): string {
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 2) return "Pages";
  return parts[0]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatSize(bytes: number): string {
  const mb = bytes / 1_000_000;
  return `${mb.toFixed(mb < 0.1 ? 2 : 1)} MB`;
}
