import Link from "next/link";
import { Placeholder } from "@/components/writing/Placeholder";
import { PostLink } from "@/components/writing/PostLink";
import type { Post } from "./types";

export const post: Post = {
  slug: "why-i-turned-a-portfolio-directory-into-a-studio",
  title: "Why I turned a portfolio directory into a studio",
  description:
    "Freshfolios started as a portfolio directory with affiliate links and got almost no traffic. Now it’s a design studio for listed Indian companies. What I kept, what I cut, and what I’m trying next.",
  date: "2026-10-13",
  draft: true,
  projects: ["freshfolios"],
  body: (
    <>
      <p>
        <a href="https://freshfolios.com" target="_blank" rel="noopener noreferrer">
          Freshfolios
        </a>{" "}
        started as a directory of designer portfolios, plus some affiliate content. Almost nobody found
        it through search: <Placeholder>[FF_OLD_MONTHLY_ORGANIC_VISITORS]</Placeholder> visitors a month
        at best.
      </p>
      <p>
        Now it’s a design studio. I pitch website and branding work to companies listed on Indian stock
        exchanges, and the site is there to back that up.
      </p>
      <p>Same name, same domain, totally different idea. Here’s how I got here.</p>

      <h2>A directory with no traffic doesn’t work</h2>
      <p>
        A directory is only useful if lots of people use it. And people only use it if it’s useful. I
        never got past that.
      </p>
      <p>
        The affiliate posts had the same problem. They only make money if people find them on Google.
        Nobody did.
      </p>
      <p>
        So instead of adding more portfolios and hoping, I asked myself: who would actually pay for what
        I’m good at, and what would they want to see first?
      </p>

      <h2>What I kept</h2>
      <ul>
        <li>
          <strong>The name and the domain.</strong> Freshfolios still works as a name for a design studio.
        </li>
        <li>
          <strong>Looking at a lot of work.</strong> Running the directory meant going through tons of
          portfolios and figuring out what made them good. That’s basically the studio now.
        </li>
        <li>
          <strong>
            <Placeholder>[FF_WHAT_ELSE_I_KEPT]</Placeholder>
          </strong>
        </li>
      </ul>

      <h2>What I cut</h2>
      <ul>
        <li>
          <strong>The directory.</strong> It needed traffic I didn’t have.
        </li>
        <li>
          <strong>The affiliate content.</strong> Same problem. It also made the site look like it was
          selling tools, not design.
        </li>
        <li>
          <strong>
            <Placeholder>[FF_WHAT_ELSE_I_CUT]</Placeholder>
          </strong>
        </li>
      </ul>

      <h2>The site has to show why I’m worth hiring</h2>
      <p>
        When I pitch a listed company, I’m a stranger asking for their money. The site needs to answer
        “why you?” before they ask. Two things should help:
      </p>
      <ul>
        <li>
          <strong>Industry pages.</strong> One page per industry I pitch to, about what their websites
          get right and wrong.
        </li>
        <li>
          <strong>Public teardowns.</strong> I pick a listed company’s website and write up what I’d
          change and why. So far: <Placeholder>[FF_TEARDOWNS_PUBLISHED]</Placeholder>.
        </li>
      </ul>
      <p>
        Both are useful even to people who never hire me. And someone landing on them from Google gets
        what they are right away.
      </p>

      <h2>What I’m trying next</h2>
      <ul>
        <li>
          <strong>Sending a teardown as the pitch.</strong> Does a company reply more if I send them a
          teardown of their own site instead of a normal cold email?
        </li>
        <li>
          <strong>Industry pages on Google.</strong> Do they bring in the search traffic the directory
          never got?
        </li>
        <li>
          <strong>
            <Placeholder>[FF_THIRD_TEST]</Placeholder>
          </strong>
        </li>
      </ul>
      <p>
        I’ll write up how it goes either way. So far I’ve pitched{" "}
        <Placeholder>[FF_COMPANIES_PITCHED]</Placeholder> companies and got{" "}
        <Placeholder>[FF_REPLIES]</Placeholder> replies.
      </p>

      <hr />
      <p>
        Freshfolios is at{" "}
        <a href="https://freshfolios.com" target="_blank" rel="noopener noreferrer">
          freshfolios.com
        </a>
        . I learned the same thing from another side project, which I wrote about in{" "}
        <PostLink slug="428-places-almost-no-visitors">428 places, almost no visitors</PostLink>.
        Everything I’m working on is on <Link href="/projects">Projects</Link>.
      </p>
    </>
  ),
};
