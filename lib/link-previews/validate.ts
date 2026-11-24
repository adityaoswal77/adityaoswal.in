import fs from "node:fs/promises";
import path from "node:path";
import type { Entry, EntryImage, Layout } from "./types";
import { fail, abs, IMAGE_EXT, SOURCE_DIRS, ROOT } from "./server";
import { layoutOf } from "./definition";

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PATH = /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/;
const FILE = /^[A-Za-z0-9._-]+$/;

function str(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

async function checkSource(src: unknown): Promise<string> {
  const bad = "Use an image from the picker.";
  if (typeof src !== "string" || src.length > 300 || path.posix.normalize(src) !== src) return fail(400, bad);
  const dir = path.posix.dirname(src);
  const name = path.posix.basename(src);
  if (!SOURCE_DIRS.includes(dir) || !FILE.test(name) || name.startsWith(".") || !IMAGE_EXT.test(name)) return fail(400, bad);
  try {
    if (!(await fs.stat(abs(src))).isFile()) return fail(400, bad);
  } catch {
    return fail(400, bad);
  }
  return src;
}

export async function normalizeImage(raw: unknown): Promise<EntryImage> {
  if (raw === null || raw === undefined) return null;
  const bad = "The image settings aren’t valid.";
  if (typeof raw !== "object") return fail(400, bad);
  const image = raw as Record<string, unknown>;
  if (Array.isArray(image.sheet)) {
    const columns = num(image.columns);
    if (image.sheet.length < 1 || image.sheet.length > 12 || columns === null || !Number.isInteger(columns) || columns < 1 || columns > 6) {
      return fail(400, bad);
    }
    const sheet: string[] = [];
    for (const src of image.sheet) sheet.push(await checkSource(src));
    return { sheet, columns };
  }
  const src = await checkSource(image.src);
  const focus = image.focus as Record<string, unknown> | undefined;
  const x = num(focus?.x);
  const y = num(focus?.y);
  if (x === null || y === null || x < 0 || x > 1 || y < 0 || y > 1) return fail(400, bad);
  const out: { src: string; focus: { x: number; y: number }; zoom?: number } = { src, focus: { x, y } };
  if (image.zoom !== undefined && image.zoom !== null) {
    const zoom = num(image.zoom);
    if (zoom === null || zoom < 1 || zoom > 4) return fail(400, bad);
    if (zoom !== 1) out.zoom = zoom;
  }
  return out;
}

export async function validateEntry(raw: unknown): Promise<Omit<Entry, "version" | "savedHash" | "video">> {
  if (!raw || typeof raw !== "object") return fail(400, "Send an entry.");
  const e = raw as Record<string, unknown>;
  const id = str(e.id);
  if (!id || id.length > 64 || !ID.test(id)) return fail(400, "Use a lowercase id such as field-notes.");
  const pagePath = str(e.path);
  if (!pagePath || pagePath.length > 200 || !PATH.test(pagePath)) {
    return fail(400, "Use a path such as /notes, lowercase, without a query or hash.");
  }
  const title = str(e.title);
  if (!title || !title.trim() || title.length > 200) return fail(400, "Add a title.");
  let alt: string | undefined;
  if (e.alt !== undefined && e.alt !== null) {
    const text = str(e.alt)?.trim() ?? "";
    if (text.length < 1 || text.length > 420) return fail(400, "The alt text must be 1 to 420 characters.");
    alt = text;
  }
  const group = str(e.group)?.trim();
  if (!group || group.length > 40) return fail(400, "Give the page a group of 40 characters or fewer.");
  if (e.theme !== "light" && e.theme !== "dark") return fail(400, "Choose a theme: light or dark.");
  const image = await normalizeImage(e.image);
  let layout: Layout | undefined;
  if (e.layout !== undefined && e.layout !== null) {
    if (e.layout !== "type-only" && e.layout !== "type-and-image" && e.layout !== "image-only") {
      return fail(400, "Choose a layout: type-only, type-and-image, image-only.");
    }
    layout = e.layout;
  }
  if (layout && layout !== "type-only" && !image) return fail(400, "Choose an image for this layout.");
  const out: Omit<Entry, "version" | "savedHash" | "video"> = { id, path: pagePath, title, group, theme: e.theme, image };
  if (alt) out.alt = alt;
  out.layout = layout ?? layoutOf({ image, layout: undefined });
  return out;
}

async function exists(p: string): Promise<boolean> {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

export async function routeExists(pagePath: string): Promise<boolean> {
  const exts = ["tsx", "ts", "jsx", "js", "dev.tsx"];
  const segments = pagePath.split("/").filter(Boolean);
  async function walk(dir: string, rest: string[]): Promise<boolean> {
    if (rest.length === 0) {
      for (const ext of exts) if (await exists(path.join(dir, `page.${ext}`))) return true;
      return false;
    }
    const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const name = entry.name;
      if (name === rest[0] && (await walk(path.join(dir, name), rest.slice(1)))) return true;
      if (/^\(.+\)$/.test(name) && (await walk(path.join(dir, name), rest))) return true;
      if (/^\[[^\]]+\]$/.test(name) && !name.startsWith("[[") && (await walk(path.join(dir, name), rest.slice(1)))) return true;
    }
    return false;
  }
  return walk(path.join(ROOT, "app"), segments);
}
