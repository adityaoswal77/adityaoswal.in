import { IS_PRODUCTION } from "@/lib/utils";
import type { Post } from "./types";
import { post as placesRetro } from "./428-places-almost-no-visitors";
import { post as directoryToStudio } from "./why-i-turned-a-portfolio-directory-into-a-studio";
import { post as shippingPlaybook } from "./my-playbook-for-shipping-side-projects";

export type { Post };

const ALL_POSTS: Post[] = [placesRetro, directoryToStudio, shippingPlaybook];

// Drafts show locally and on Vercel preview deploys, never in production.
export const SHOW_DRAFTS = !IS_PRODUCTION;

export function getPosts(): Post[] {
  return ALL_POSTS.filter((post) => SHOW_DRAFTS || !post.draft).sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getReadNext(slug: string, limit = 3): Post[] {
  return getPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function getPostsForProject(projectSlug: string): Post[] {
  return getPosts().filter((post) => post.projects?.includes(projectSlug));
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
