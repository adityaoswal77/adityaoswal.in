import Link from "next/link";
import { Placeholder } from "@/components/writing/Placeholder";
import { PostLink } from "@/components/writing/PostLink";
import type { Post } from "./types";

export const post: Post = {
  slug: "my-playbook-for-shipping-side-projects",
  title: "My playbook for shipping side projects",
  description:
    "What I’d tell a designer friend about shipping side projects, from building Interesting Places and Freshfolios: have a way to reach people, share while you build, share more than once, and link everything together.",
  date: "2026-10-20",
  draft: true,
  projects: ["interesting-places", "freshfolios"],
  body: (
    <>
      <p>
        This post is based on Brian Lovin’s{" "}
        <a
          href="https://brianlovin.com/writing/my-playbook-for-shipping-side-projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          My playbook for shipping side projects
        </a>
        . Go read his first. This is my version, with my own projects and my own mistakes.
      </p>
      <p>
        I’ll mostly talk about two projects: Interesting Places, a list of 428 places across India and
        Singapore, and Freshfolios, a design studio for listed Indian companies.
      </p>

      <h2>Have a way to reach people</h2>
      <p>
        If people can only find your project by accident, most of them won’t. I learned this with
        Interesting Places. Hundreds of places, and no way to tell anyone when I added a new one.
      </p>
      <p>
        So now I’m starting a Friday email with 5 places in it. It’s small, but it’s mine, and no
        algorithm decides who sees it.
      </p>
      <p>You don’t need a big list. You just need one way to reach people, and the habit of using it.</p>

      <h2>Share while you build</h2>
      <p>
        I built the Telegram bot, the AI concierge and the publish pipeline for Interesting Places
        without telling anyone. By the time they worked, nobody cared.
      </p>
      <p>
        Post as you go. A quick note about something half-done is better than a polished launch post
        nobody reads. With Freshfolios I’m trying the opposite: doing teardowns in public, so the work
        itself is the marketing.
      </p>

      <h2>Share it more than once</h2>
      <p>
        If you post about your project once, most people will miss it. So find more reasons to post: the
        numbers a while later, what you cut, what you’d do differently.
      </p>
      <p>
        <PostLink slug="428-places-almost-no-visitors">My Interesting Places post</PostLink> is the second
        time I’ve shared that project. Most people missed the first one.{" "}
        <PostLink slug="why-i-turned-a-portfolio-directory-into-a-studio">
          The Freshfolios post
        </PostLink>{" "}
        is the same idea.
      </p>

      <h2>Assume people find you from Google</h2>
      <p>
        Most people won’t start at your homepage. They’ll land on one random page from Google with no
        idea who you are.
      </p>
      <p>
        So every page should say what it is right at the top, and point to something useful next. On
        Interesting Places that’s a banner on every place page. On Freshfolios it’s industry pages. On
        this site it’s the first paragraph of every post.
      </p>

      <h2>Link everything together</h2>
      <p>
        Your projects, posts and emails should all point at each other. A post links to the project, the
        project lists the posts about it, and the email links to both.
      </p>
      <p>
        That’s what this site is for now. <Link href="/projects">Projects</Link> lists what I’m building
        and the posts about each one. <Link href="/writing">Writing</Link> has the posts.
      </p>

      <h2>Decide what “done” means before you start</h2>
      <p>
        There’s always something else to polish. Decide early what “good enough” looks like, and ship
        when you get there.
      </p>
      <p>
        For this writing section, “done” was a list page, a projects page and one post. Not three posts.
        One. The rest come out weekly.
      </p>

      <p>
        <Placeholder>[PLAYBOOK_CHITTI_SECTION_OR_REMOVE]</Placeholder>
      </p>

      <hr />
      <p>
        If you’re building something on the side, start with the first one. It’s the one I skipped.
        My projects are on <Link href="/projects">Projects</Link>, and the two posts I mentioned are{" "}
        <PostLink slug="428-places-almost-no-visitors">428 places, almost no visitors</PostLink> and{" "}
        <PostLink slug="why-i-turned-a-portfolio-directory-into-a-studio">
          Why I turned a portfolio directory into a studio
        </PostLink>
        .
      </p>
    </>
  ),
};
