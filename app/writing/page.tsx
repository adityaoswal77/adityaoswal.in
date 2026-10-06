import type { Metadata } from "next";
import { getPosts } from "@/content/writing";
import { PostList } from "@/components/writing/PostList";

const description =
  "Notes from designing, building and launching side projects, written while the work is still happening.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing | Aditya Oswal",
    description,
    url: "/writing",
    siteName: "Aditya Oswal",
    type: "website",
    images: ["/assets/aditya.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Aditya Oswal",
    description,
    creator: "@oswaluxd",
    images: ["/assets/aditya.jpg"],
  },
};

export default function WritingPage() {
  const posts = getPosts();

  return (
    <div className="mx-auto w-full max-w-[38rem] px-5 pb-24 pt-32 md:pt-40">
      <header className="mb-10">
        <h1 className="text-4xl text-[var(--foreground)] md:text-5xl">Writing</h1>
        <p className="mb-0 mt-3 text-[var(--muted)]">{description}</p>
      </header>

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-[var(--muted)]">Nothing published yet. The first post is on its way.</p>
      )}
    </div>
  );
}
