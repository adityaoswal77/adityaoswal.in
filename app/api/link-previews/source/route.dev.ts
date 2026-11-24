import fs from "node:fs/promises";
import { SOURCES_DIR } from "@/lib/link-previews/definition";
import { abs, isLocalRequest } from "@/lib/link-previews/server";

const TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };

export async function GET(req: Request) {
  if (process.env.NODE_ENV !== "development") return new Response("Development only.", { status: 403 });
  if (!isLocalRequest(req)) return new Response("Local requests only", { status: 403 });
  const file = new URL(req.url).searchParams.get("file") ?? "";
  const match = /^[a-z0-9-]+\.(png|jpe?g|webp)$/.exec(file);
  if (!match) return new Response("Not found", { status: 404 });
  try {
    const bytes = await fs.readFile(abs(`${SOURCES_DIR}/${file}`));
    return new Response(new Uint8Array(bytes), {
      headers: { "Content-Type": TYPES[match[1]], "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
