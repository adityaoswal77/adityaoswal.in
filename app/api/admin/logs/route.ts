import { list, del } from "@vercel/blob";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

function isAuthorized(req: NextRequest) {
  const secret = process.env.LOGS_SECRET;
  if (!secret) return false;
  const header = req.headers.get("x-logs-secret");
  const query = req.nextUrl.searchParams.get("secret");
  return header === secret || query === secret;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const date = req.nextUrl.searchParams.get("date"); // e.g. 2026-04-27
  const prefix = date ? `logs/${date}/` : "logs/";
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? 200), 500);

  const { blobs } = await list({ prefix, limit, mode: "folded" });

  // Fetch and parse each log entry in parallel
  const entries = await Promise.all(
    blobs
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
      .map(async (blob) => {
        try {
          const res = await fetch(blob.url);
          return await res.json();
        } catch {
          return { error: "parse failed", url: blob.url };
        }
      })
  );

  return Response.json({
    total: blobs.length,
    date: date ?? "all",
    entries,
  });
}

// DELETE ?secret=... — purge all logs older than N days (default 30)
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const days = Number(req.nextUrl.searchParams.get("days") ?? 30);
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

  const { blobs } = await list({ prefix: "logs/", limit: 500, mode: "folded" });
  const old = blobs.filter((b) => b.uploadedAt.getTime() < cutoff);

  if (old.length > 0) {
    await del(old.map((b) => b.url));
  }

  return Response.json({ deleted: old.length });
}
