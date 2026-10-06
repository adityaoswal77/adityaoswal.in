import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts, getReadNext } from "@/content/writing";
import { PostList } from "@/components/writing/PostList";
import { SubscribeLine } from "@/components/writing/SubscribeLine";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/writing/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: "Aditya Oswal",
      publishedTime: post.date,
      authors: ["Aditya Oswal"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@oswaluxd",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const readNext = getReadNext(post.slug);

  return (
    <article className="mx-auto w-full max-w-[38rem] px-5 pb-24 pt-32 md:pt-40">
      <Link
        href="/writing"
        className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        <span aria-hidden>←</span> Writing
      </Link>

      <header className="mb-10 mt-8">
        <h1 className="text-4xl leading-[1.1] text-[var(--foreground)] md:text-5xl">
          {post.title}
        </h1>
        <p className="mb-0 mt-4 text-sm text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.draft && " · Draft"}
        </p>
      </header>

      <div className="post-body">{post.body}</div>

      <SubscribeLine />

      {readNext.length > 0 && (
        <nav aria-labelledby="read-next" className="mt-16 border-t border-[var(--border)] pt-8">
          <h2
            id="read-next"
            className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]"
          >
            Read next
          </h2>
          <PostList posts={readNext} />
        </nav>
      )}
    </article>
  );
}
