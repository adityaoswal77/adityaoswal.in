import Link from "next/link";
import { formatDate, type Post } from "@/content/writing";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul role="list" className="-mx-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/writing/${post.slug}`}
            className="group flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors hover:bg-[#2A2438]/[0.04] dark:hover:bg-white/[0.05] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <span className="font-medium text-[var(--foreground)] underline-offset-4 decoration-[var(--muted)] group-hover:underline group-focus-visible:underline">
              {post.title}
              {post.draft && (
                <span className="ml-2 align-middle rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                  Draft
                </span>
              )}
            </span>
            <time
              dateTime={post.date}
              className="shrink-0 text-sm tabular-nums text-[var(--muted)]"
            >
              {formatDate(post.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
