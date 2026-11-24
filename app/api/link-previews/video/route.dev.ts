import { OG_DIR, atomicWrite, fail, guard, handle, readBody, readManifest, reply, sha12, withManifestLock, writeManifest } from "@/lib/link-previews/server";

const MAX = 8 * 1024 * 1024;
const BRANDS = new Set(["isom", "iso2", "iso3", "iso4", "iso5", "iso6", "mp41", "mp42", "avc1", "M4V ", "mmp4", "MSNV", "dash"]);
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function megabytes(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

function dimension(value: string | null, label: string): number {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 8192) return fail(400, `Send the video's ${label} in pixels.`);
  return n;
}

export async function POST(req: Request) {
  const denied = guard(req, ["application/json", "video/mp4"]);
  if (denied) return denied;
  const isJson = (req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json");
  return handle(async () => {
    if (isJson) {
      const bytes = await readBody(req, 4096, "Send a video, or { id, remove: true }.");
      let body: Record<string, unknown> = {};
      try {
        body = JSON.parse(new TextDecoder().decode(bytes));
      } catch {}
      if (body.remove !== true || typeof body.id !== "string") return fail(400, "Send a video, or { id, remove: true }.");
      const id = body.id;
      if (!ID.test(id)) return fail(400, "Choose a page.");
      return withManifestLock(async () => {
        const manifest = await readManifest();
        const entry = manifest.entries.find((e) => e.id === id);
        if (!entry) return fail(404, `No page has the id ${id}.`);
        const kept = entry.video?.src;
        delete entry.video;
        await writeManifest(manifest);
        return reply(200, kept ? { kept } : {});
      });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id") ?? "";
    if (!ID.test(id)) return fail(400, "Choose a page.");
    const width = dimension(url.searchParams.get("width"), "width");
    const height = dimension(url.searchParams.get("height"), "height");
    const declared = Number(req.headers.get("content-length"));
    const tooBig = (size?: number) => `Videos can be up to 8.4 MB.${size ? ` This one is ${megabytes(size)}.` : ""}`;
    if (Number.isFinite(declared) && declared > MAX) return fail(413, tooBig(declared));
    const bytes = await readBody(req, MAX, tooBig());
    if (bytes.byteLength === 0) return fail(400, "Nothing was sent.");
    const brand = String.fromCharCode(...bytes.slice(8, 12));
    if (bytes.byteLength < 12 || String.fromCharCode(...bytes.slice(4, 8)) !== "ftyp" || !BRANDS.has(brand)) {
      return fail(415, "That isn’t an MP4 video.");
    }
    return withManifestLock(async () => {
      const manifest = await readManifest();
      const entry = manifest.entries.find((e) => e.id === id);
      if (!entry) return fail(404, `No page has the id ${id}. Save the page's image first.`);
      const src = `${OG_DIR}/${id}.mp4`;
      if (manifest.entries.some((e) => e.id !== id && e.video?.src === src)) return fail(409, `Another page already uses ${src}.`);
      await atomicWrite(src, bytes);
      entry.video = { src, type: "video/mp4", width, height, version: sha12(bytes) };
      await writeManifest(manifest);
      return reply(200, { video: entry.video, bytes: bytes.byteLength });
    });
  }, "The video could not be saved. Try again.");
}

export const dynamic = "force-dynamic";
