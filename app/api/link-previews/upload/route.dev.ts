import fs from "node:fs/promises";
import { SOURCES_DIR } from "@/lib/link-previews/definition";
import { abs, fail, guard, handle, readJson, reply } from "@/lib/link-previews/server";

const LIMIT = Math.ceil((10 * 1024 * 1024 * 4) / 3) + 64 * 1024;
const MAX_FILE = 10 * 1024 * 1024;

function detect(bytes: Uint8Array): "png" | "jpg" | "webp" | null {
  if (bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((b, i) => bytes[i] === b)) return "png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  const text = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
  if (bytes.length >= 12 && text(0, 4) === "RIFF" && text(8, 12) === "WEBP") return "webp";
  return null;
}

function cleanName(name: string): string {
  const stem = name.replace(/\.[^.]*$/, "");
  const clean = stem
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return clean || "image";
}

export async function POST(req: Request) {
  const denied = guard(req);
  if (denied) return denied;
  return handle(async () => {
    const body = await readJson(req, LIMIT, "Images can be up to 10 MB.");
    const name = typeof body.name === "string" ? body.name.slice(0, 200) : "image";
    const data = typeof body.data === "string" ? body.data : "";
    const comma = data.indexOf(",");
    if (!data.startsWith("data:") || comma < 0) return fail(415, "Upload a PNG, JPEG or WebP image.");
    const bytes = new Uint8Array(Buffer.from(data.slice(comma + 1), "base64"));
    if (bytes.byteLength > MAX_FILE) return fail(413, "Images can be up to 10 MB.");
    const ext = detect(bytes);
    if (!ext) return fail(415, "Upload a PNG, JPEG or WebP image.");
    const stem = cleanName(name);
    await fs.mkdir(abs(SOURCES_DIR), { recursive: true });
    const temp = abs(`${SOURCES_DIR}/.upload-${process.pid}-${Date.now()}.tmp`);
    await fs.writeFile(temp, bytes);
    try {
      for (let n = 1; n <= 999; n++) {
        const file = n === 1 ? `${stem}.${ext}` : `${stem}-${n}.${ext}`;
        try {
          await fs.link(temp, abs(`${SOURCES_DIR}/${file}`));
          return reply(200, { source: { src: `${SOURCES_DIR}/${file}`, label: file, folder: SOURCES_DIR } });
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
        }
      }
      return fail(409, "Too many files with this name.");
    } finally {
      await fs.rm(temp, { force: true });
    }
  }, "The image could not be uploaded. Try again.");
}
