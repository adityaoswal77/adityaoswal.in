import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import manifestJson from "@/og-images.json";
import type { Manifest } from "./types";
import { altOf, PNG_H, PNG_W, readPngSize } from "./definition";

const SITE_URL = "https://adityaoswal.in";
const SITE_NAME = "Aditya Oswal";
const TWITTER_CREATOR = "@oswaluxd";
const manifest = manifestJson as unknown as Manifest;

type ShareImage = { url: string; width: number; height: number; type: string; alt: string };

const FALLBACK: ShareImage = {
  url: `${SITE_URL}/assets/aditya.jpg`,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Aditya Oswal — UX Designer & Product Designer",
};

function pngSize(file: string): { width: number; height: number } {
  try {
    const fd = fs.openSync(file, "r");
    const head = Buffer.alloc(24);
    fs.readSync(fd, head, 0, 24, 0);
    fs.closeSync(fd);
    return readPngSize(new Uint8Array(head)) ?? { width: PNG_W, height: PNG_H };
  } catch {
    return { width: PNG_W, height: PNG_H };
  }
}

function entryFor(pagePath: string) {
  return manifest.entries.find((e) => e.path === pagePath);
}

export function shareImage(pagePath: string): ShareImage | undefined {
  const entry = entryFor(pagePath);
  if (!entry?.version) return undefined;
  const file = path.join(process.cwd(), "public", "og", `${entry.id}.png`);
  if (!fs.existsSync(file)) return undefined;
  const { width, height } = pngSize(file);
  return { url: `${SITE_URL}/og/${entry.id}.png?v=${entry.version}`, width, height, type: "image/png", alt: altOf(entry) };
}

type PageInfo = { title: string; description?: string; type?: "website" | "article" };

export function linkPreview(pagePath: string, page: PageInfo): Pick<Metadata, "openGraph" | "twitter"> {
  const image = shareImage(pagePath) ?? FALLBACK;
  const video = entryFor(pagePath)?.video;
  const url = pagePath === "/" ? SITE_URL : `${SITE_URL}${pagePath}`;
  return {
    openGraph: {
      type: page.type ?? "website",
      title: page.title,
      ...(page.description ? { description: page.description } : {}),
      url,
      siteName: SITE_NAME,
      images: [image],
      ...(video
        ? {
            videos: [
              {
                url: `${SITE_URL}/${video.src.replace(/^public\//, "")}${video.version ? `?v=${video.version}` : ""}`,
                type: video.type,
                width: video.width,
                height: video.height,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      ...(page.description ? { description: page.description } : {}),
      creator: TWITTER_CREATOR,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
