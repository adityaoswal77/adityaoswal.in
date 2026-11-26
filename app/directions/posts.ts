import { getPosts } from "@/content/writing";
import type { PostSummary } from "@/components/directions/data";

export function postSummaries(): PostSummary[] {
  return getPosts().map(({ slug, title, description, date, draft }) => ({ slug, title, description, date, draft }));
}
