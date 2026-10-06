import Link from "next/link";
import { Placeholder } from "@/components/writing/Placeholder";
import { PostLink } from "@/components/writing/PostLink";
import type { Post } from "./types";

export const post: Post = {
  slug: "my-playbook-for-shipping-side-projects",
  title: "My playbook for shipping side projects",
  description:
    "What I’d tell a designer friend about shipping side projects, learned from Interesting Places and Freshfolios: own a channel, build in public, launch more than once, write for strangers, and link everything together.",
  date: "2026-10-20",
  draft: true,
  projects: ["interesting-places", "freshfolios"],
  body: (
    <>
      <p>
        The title and the bones of this post come from Brian Lovin’s{" "}
        <a
          href="https://brianlovin.com/writing/my-playbook-for-shipping-side-projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          My playbook for shipping side projects
        </a>
        . Read his first. This is my version, with my own projects and my own mistakes in it.
      </p>
      <p>
        The two projects I’ll keep coming back to: Interesting Places, a community-curated directory of
        428+ places across India, Singapore and Malaysia, and Freshfolios, a design studio that pitches
        listed Indian companies.
      </p>

      <h2>Own a way to reach people</h2>
      <p>
        If the only way people hear about your project is by stumbling onto it, most of them won’t. I
        learned this the slow way with Interesting Places: hundreds of places, and no way to tell anyone
        when a new one went up.
      </p>
      <p>
        So now there’s a Friday email with five places in it. It’s small. It’s mine. Nobody can change
        an algorithm on it.
      </p>
      <p>
        You don’t need a big list. You need one channel you control and the habit of using it on a
        schedule.
      </p>

      <h2>Build with the garage door open</h2>
      <p>
        I built the Interesting Places Telegram bot, AI concierge and publish pipeline without saying a
        word about any of it. By the time they worked, nobody was waiting for them.
      </p>
      <p>
        Write while you build. A rough note about a half-finished feature does more than a polished
        launch post nobody reads. Freshfolios’ public teardowns are the opposite habit: the work happens
        in the open, and the open is the marketing.
      </p>

      <h2>Launch more than once</h2>
      <p>
        A launch is one day. If you miss it, it’s gone. So make more of them: the numbers later on,
        what you cut, what you’d do differently. Each one is a reason to tell people again.
      </p>
      <p>
        <PostLink slug="428-places-almost-no-visitors">My Interesting Places retro</PostLink> is launch day
        two for a project most people never saw on day one.{" "}
        <PostLink slug="why-i-turned-a-portfolio-directory-into-a-studio">
          The Freshfolios pivot
        </PostLink>{" "}
        is another.
      </p>

      <h2>Write for the stranger from Google</h2>
      <p>
        Most people won’t arrive at your homepage. They’ll land on one page from search, with no idea who
        you are or what the rest of the site is.
      </p>
      <p>
        Every page should explain itself in its first few lines and point somewhere useful next. On
        Interesting Places that’s a banner on every place page. On Freshfolios it’s industry pages that
        make sense on their own. On this site it’s the first paragraph of every post.
      </p>

      <h2>Make everything point at everything else</h2>
      <p>
        Projects, writing and lists should feed each other. A post sends people to a project, the
        project lists the posts about it, and the email points at both.
      </p>
      <p>
        That’s what this site is for now. <Link href="/projects">Projects</Link> lists what I’m building
        and the posts about each one. <Link href="/writing">Writing</Link> is where the launch days live.
      </p>

      <h2>Pick a ship trigger before you start</h2>
      <p>
        There’s always one more thing to polish. Decide up front what “done enough” means, and ship when
        you hit it.
      </p>
      <p>
        For this writing section the trigger was a list page, a projects page and one post. Not three
        posts. One. The others come out weekly, and each one is another launch day.
      </p>

      <h2>
        <Placeholder>[PLAYBOOK_CHITTI_SECTION_OR_REMOVE]</Placeholder>
      </h2>

      <hr />
      <p>
        If you’re building something on the side, start with the first section. It’s the one I skipped.
        The projects are on <Link href="/projects">Projects</Link>, and the retros are{" "}
        <PostLink slug="428-places-almost-no-visitors">428 places, almost no visitors</PostLink> and{" "}
        <PostLink slug="why-i-turned-a-portfolio-directory-into-a-studio">
          Why I turned a portfolio directory into a studio
        </PostLink>
        .
      </p>
    </>
  ),
};
