import type { ReactNode } from "react";
import Link from "next/link";
import { getPost } from "@/content/writing";

// Plain text until the target post is published, so drafts never cause a 404.
export function PostLink({ slug, children }: { slug: string; children?: ReactNode }) {
  const post = getPost(slug);
  if (!post) return <>{children}</>;
  return <Link href={`/writing/${post.slug}`}>{children ?? post.title}</Link>;
}
