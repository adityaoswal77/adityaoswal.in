import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SIDE_PROJECTS } from "@/lib/data";
import { IS_PRODUCTION, isPlaceholder } from "@/lib/utils";
import { getPostsForProject } from "@/content/writing";
import { Placeholder } from "@/components/writing/Placeholder";

const description = "Things I'm building on my own time, what state they're in, and where to find them.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Aditya Oswal",
    description,
    url: "/projects",
    siteName: "Aditya Oswal",
    type: "website",
    images: ["/assets/aditya.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Aditya Oswal",
    description,
    creator: "@oswaluxd",
    images: ["/assets/aditya.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[38rem] px-5 pb-24 pt-32 md:pt-40">
      <header className="mb-10">
        <h1 className="text-4xl text-[var(--foreground)] md:text-5xl">Projects</h1>
        <p className="mb-0 mt-3 text-[var(--muted)]">
          {description} Notes on how they&apos;re going live in{" "}
          <Link href="/writing" className="text-[var(--foreground)] underline decoration-[var(--muted)] underline-offset-4 hover:decoration-[var(--foreground)]">
            Writing
          </Link>
          .
        </p>
      </header>

      <ul role="list" className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {SIDE_PROJECTS.map((project) => {
          const posts = getPostsForProject(project.slug);
          const statPending = isPlaceholder(project.stat.value);
          const showStat = !(statPending && IS_PRODUCTION);

          return (
            <li key={project.slug} className="py-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-sans text-lg font-semibold tracking-normal text-[var(--foreground)]">
                  {project.title}
                </h2>
                <span className="flex shrink-0 items-center gap-2 text-sm text-[var(--muted)]">
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full ${project.status === "Live" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                  {project.status}
                </span>
              </div>

              <p className="mb-0 mt-1 text-[var(--foreground)]">{project.summary}</p>

              {showStat && (
                <p className="mb-0 mt-3 text-sm text-[var(--muted)]">
                  {statPending ? (
                    <Placeholder>{project.stat.value}</Placeholder>
                  ) : (
                    <span className="font-semibold tabular-nums text-[var(--foreground)]">
                      {project.stat.value}
                    </span>
                  )}{" "}
                  {project.stat.label}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[var(--foreground)] underline decoration-[var(--muted)] underline-offset-4 hover:decoration-[var(--foreground)]"
                >
                  {project.url.replace(/^https?:\/\//, "")}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
                {project.caseStudy && (
                  <Link
                    href={project.caseStudy}
                    className="text-[var(--muted)] underline decoration-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:decoration-[var(--foreground)]"
                  >
                    Case study<span className="sr-only"> for {project.title}</span>
                  </Link>
                )}
              </div>

              {posts.length > 0 && (
                <div className="mt-4 text-sm">
                  <span className="text-[var(--muted)]">Writing: </span>
                  {posts.map((post, i) => (
                    <span key={post.slug}>
                      {i > 0 && <span className="text-[var(--muted)]"> · </span>}
                      <Link
                        href={`/writing/${post.slug}`}
                        className="text-[var(--foreground)] underline decoration-[var(--muted)] underline-offset-4 hover:decoration-[var(--foreground)]"
                      >
                        {post.title}
                      </Link>
                    </span>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
