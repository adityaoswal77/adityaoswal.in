import { definitionHash, drawnSystem, layoutOf, readPngSize, fitsFrame, PNG_H, PNG_W } from "@/lib/link-previews/definition";
import { TEMPLATE_NAMES, isTemplateName } from "@/lib/link-previews/template-names";
import { isSingle } from "@/lib/link-previews/types";
import type { Entry } from "@/lib/link-previews/types";
import {
  OG_DIR,
  atomicWrite,
  fail,
  guard,
  handle,
  readJson,
  readManifest,
  reply,
  sha12,
  withManifestLock,
  writeManifest,
} from "@/lib/link-previews/server";
import { routeExists, validateEntry } from "@/lib/link-previews/validate";

const LIMIT = 10 * 1024 * 1024;

export async function POST(req: Request) {
  const denied = guard(req);
  if (denied) return denied;
  return handle(async () => {
    const body = await readJson(req, LIMIT, "The image is too large to save.");
    const base = await validateEntry(body.entry);
    if (!isTemplateName(body.template)) return fail(400, `Choose a template: ${TEMPLATE_NAMES.join(", ")}.`);
    const template = body.template;
    let color: string | undefined;
    if (body.color !== undefined && body.color !== null) {
      if (typeof body.color !== "string" || !/^#[0-9a-f]{6}$/i.test(body.color)) {
        return fail(400, "The color must be a six-digit hex, such as #000000.");
      }
      color = body.color.toLowerCase();
    }

    const dataUrl = typeof body.png === "string" ? body.png : "";
    const prefix = "data:image/png;base64,";
    if (!dataUrl.startsWith(prefix)) return fail(400, "The PNG must be exactly 2400×1260.");
    const png = new Uint8Array(Buffer.from(dataUrl.slice(prefix.length), "base64"));
    const size = readPngSize(png);
    if (!size) return fail(400, "The PNG must be exactly 2400×1260.");
    const single = isSingle(base.image) && (base.image.zoom === undefined || base.image.zoom === 1);
    if (layoutOf(base) === "image-only" && single) {
      if (!fitsFrame(size.width, size.height)) {
        return fail(400, "The PNG must have the frame’s shape (1200:630, within 1%) and be at most 2400×1260.");
      }
    } else if (size.width !== PNG_W || size.height !== PNG_H) {
      return fail(400, "The PNG must be exactly 2400×1260.");
    }

    return withManifestLock(async () => {
      const manifest = await readManifest();
      if (manifest.entries.some((e) => e.path === base.path && e.id !== base.id)) {
        return fail(409, `Another page already uses ${base.path}.`);
      }
      if (!(await routeExists(base.path))) {
        return fail(422, `${base.path} has no page yet. Create the page first, then save its image.`);
      }
      manifest.system.template = template;
      if (color !== undefined) manifest.system.color = color;
      const previous = manifest.entries.find((e) => e.id === base.id);
      const entry: Entry = { ...base, version: sha12(png), savedHash: null };
      entry.savedHash = definitionHash(entry, drawnSystem(manifest.system, template, manifest.system.color));
      if (previous?.video) entry.video = previous.video;
      const ordered: Entry = {
        id: entry.id,
        path: entry.path,
        title: entry.title,
        ...(entry.alt ? { alt: entry.alt } : {}),
        group: entry.group,
        theme: entry.theme,
        ...(entry.layout ? { layout: entry.layout } : {}),
        image: entry.image,
        version: entry.version,
        savedHash: entry.savedHash,
        ...(entry.video ? { video: entry.video } : {}),
      };
      const index = manifest.entries.findIndex((e) => e.id === ordered.id);
      if (index >= 0) manifest.entries[index] = ordered;
      else manifest.entries.push(ordered);
      const file = `${OG_DIR}/${ordered.id}.png`;
      await atomicWrite(file, png);
      await writeManifest(manifest);
      return reply(200, { entry: ordered, file, bytes: png.byteLength });
    });
  }, "The image could not be saved. Your draft is still here; try again.");
}
