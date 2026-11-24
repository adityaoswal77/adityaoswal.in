import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import type { Manifest, SourceFile } from "./types";
import { SOURCES_DIR } from "./definition";

export const ROOT = process.cwd();
export const MANIFEST_FILE = "og-images.json";
export const SERVED_DIR = "public";
export const OG_DIR = `${SERVED_DIR}/og`;
export const REGISTRY_FILE = "lib/link-previews/templates.tsx";
export const SOURCE_DIRS = [SOURCES_DIR];
export const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function fail(status: number, message: string): never {
  throw new HttpError(status, message);
}

export function abs(rel: string): string {
  return path.join(ROOT, rel);
}

export async function readManifest(): Promise<Manifest> {
  return JSON.parse(await fs.readFile(abs(MANIFEST_FILE), "utf8")) as Manifest;
}

export async function atomicWrite(rel: string, data: string | Uint8Array): Promise<void> {
  const target = abs(rel);
  await fs.mkdir(path.dirname(target), { recursive: true });
  const temp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(temp, data);
  await fs.rename(temp, target);
}

export async function writeManifest(manifest: Manifest): Promise<void> {
  await atomicWrite(MANIFEST_FILE, `${JSON.stringify(manifest, null, 2)}\n`);
}

let queue: Promise<unknown> = Promise.resolve();

export function withManifestLock<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

export function sha12(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex").slice(0, 12);
}

export async function fileSize(rel: string): Promise<number | null> {
  try {
    return (await fs.stat(abs(rel))).size;
  } catch {
    return null;
  }
}

export async function listSources(): Promise<SourceFile[]> {
  const out: SourceFile[] = [];
  for (const folder of SOURCE_DIRS) {
    let names: string[] = [];
    try {
      names = await fs.readdir(abs(folder));
    } catch {
      continue;
    }
    for (const name of names.sort()) {
      if (!name.startsWith(".") && IMAGE_EXT.test(name)) out.push({ src: `${folder}/${name}`, label: name, folder });
    }
  }
  return out;
}

export function reply(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

const LOCAL_HOST = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;
const LOOPBACK = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

export function isLocalRequest(req: Request): boolean {
  const host = req.headers.get("host") ?? "";
  if (!LOCAL_HOST.test(host)) return false;
  try {
    const url = new URL(req.url);
    if (url.protocol !== "http:" || !LOCAL_HOST.test(url.host)) return false;
  } catch {
    return false;
  }
  if (req.headers.get("forwarded")) return false;
  const forwardedHost = req.headers.get("x-forwarded-host");
  if (forwardedHost && forwardedHost !== host) return false;
  for (const name of ["x-forwarded-for", "x-real-ip"]) {
    const value = req.headers.get(name);
    if (value && value.split(",").some((part) => !LOOPBACK.has(part.trim()))) return false;
  }
  return true;
}

export function guard(req: Request, contentTypes: string[] = ["application/json"]): Response | null {
  if (process.env.NODE_ENV !== "development") return reply(403, { error: "Development only." });
  if (req.method !== "POST") return reply(403, { error: "POST only." });
  if (!isLocalRequest(req)) return reply(403, { error: "Local requests only." });
  const host = req.headers.get("host") ?? "";
  if (
    req.headers.get("origin") !== `http://${host}` ||
    req.headers.get("sec-fetch-site") !== "same-origin" ||
    req.headers.get("x-link-previews") !== "1"
  ) {
    return reply(403, { error: "Use the Link Previews tool." });
  }
  const type = (req.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!contentTypes.includes(type)) return reply(403, { error: "Send JSON." });
  return null;
}

export async function readBody(req: Request, limit: number, message: string): Promise<Uint8Array> {
  const declared = Number(req.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > limit) fail(413, message);
  const reader = req.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) {
      await reader.cancel();
      fail(413, message);
    }
    chunks.push(value);
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

export async function readJson(req: Request, limit: number, message: string): Promise<Record<string, unknown>> {
  const bytes = await readBody(req, limit, message);
  try {
    const value = JSON.parse(new TextDecoder().decode(bytes));
    if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
  } catch {}
  return fail(400, "Send JSON.");
}

export function handle(task: () => Promise<Response>, fallback: string): Promise<Response> {
  return task().catch((error: unknown) => {
    if (error instanceof HttpError) return reply(error.status, { error: error.message });
    console.error("link-previews:", error);
    return reply(500, { error: fallback });
  });
}
