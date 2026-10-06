import Link from "next/link";
import { Placeholder } from "@/components/writing/Placeholder";
import { PostLink } from "@/components/writing/PostLink";
import type { Post } from "./types";

export const post: Post = {
  slug: "why-i-turned-a-portfolio-directory-into-a-studio",
  title: "Why I turned a portfolio directory into a studio",
  description:
    "Freshfolios started as a portfolio directory with affiliate content and no organic traffic. It’s now a design studio that pitches listed Indian companies. What I kept, what I cut, and what I’m testing next.",
  date: "2026-10-13",
  draft: true,
  projects: ["freshfolios"],
  body: (
    <>
      <p>
        <a href="https://freshfolios.com" target="_blank" rel="noopener noreferrer">
          Freshfolios
        </a>{" "}
        used to be a directory of designer portfolios, with some affiliate content on the side. It got
        almost no organic traffic: <Placeholder>[FF_OLD_MONTHLY_ORGANIC_VISITORS]</Placeholder> visitors a
        month from search, at its best.
      </p>
      <p>
        Now it’s a design studio. It pitches website and branding work to companies listed on Indian
        stock exchanges, and the site’s job is to back up the pitch.
      </p>
      <p>Same name, same domain, very different reason to exist. Here’s how that happened.</p>

      <h2>A directory with no traffic is a hobby</h2>
      <p>
        A directory is useful when lots of people use it, and lots of people use it when it’s useful. I
        never got out of that loop.
      </p>
      <p>
        The affiliate content had the same problem. Affiliate posts only earn when search sends people
        to them. Without traffic they’re ads nobody sees.
      </p>
      <p>
        I could have kept adding portfolios and hoping. Instead I asked a simpler question: who would pay
        for the thing I’m good at, and what would they need to see first?
      </p>

      <h2>Keep the part that was actually yours</h2>
      <p>Not everything went in the bin:</p>
      <ul>
        <li>
          <strong>The name and the domain.</strong> Freshfolios still works as a name for a studio that
          cares about how work is presented.
        </li>
        <li>
          <strong>The eye.</strong> Curating a directory meant looking closely at a lot of work and
          deciding what was good about it. That habit is the whole studio.
        </li>
        <li>
          <strong>
            <Placeholder>[FF_WHAT_ELSE_I_KEPT]</Placeholder>
          </strong>
        </li>
      </ul>

      <h2>Cut anything that only works with traffic</h2>
      <ul>
        <li>
          <strong>The directory.</strong> It needed an audience I didn’t have.
        </li>
        <li>
          <strong>The affiliate content.</strong> Same problem, plus it made the site look like it was
          selling something other than design.
        </li>
        <li>
          <strong>
            <Placeholder>[FF_WHAT_ELSE_I_CUT]</Placeholder>
          </strong>
        </li>
      </ul>

      <h2>Make the site do the selling</h2>
      <p>
        A cold pitch to a listed company is a stranger asking for money. The site has to answer “why
        you?” before anyone asks. Two things do that now:
      </p>
      <ul>
        <li>
          <strong>Industry pages.</strong> One page per sector I pitch to, about what websites in that
          sector get right and wrong.
        </li>
        <li>
          <strong>Public teardowns.</strong> I take a listed company’s website and write up what I’d
          change and why, in the open. So far: <Placeholder>[FF_TEARDOWNS_PUBLISHED]</Placeholder>{" "}
          teardowns.
        </li>
      </ul>
      <p>
        Both are useful to someone who never hires me, which is the point. They’re also the kind of page
        a stranger can find from search and understand without context.
      </p>

      <h2>Test one thing at a time</h2>
      <p>What I’m testing next:</p>
      <ul>
        <li>
          <strong>Teardown as the pitch.</strong> Whether sending a company its own teardown gets more
          replies than a plain cold email.
        </li>
        <li>
          <strong>Industry pages in search.</strong> Whether they pull in the organic traffic the
          directory never did.
        </li>
        <li>
          <strong>
            <Placeholder>[FF_THIRD_TEST]</Placeholder>
          </strong>
        </li>
      </ul>
      <p>I’ll write up the results either way. Pitched so far: <Placeholder>[FF_COMPANIES_PITCHED]</Placeholder> companies, <Placeholder>[FF_REPLIES]</Placeholder> replies.</p>

      <hr />
      <p>
        Freshfolios is at{" "}
        <a href="https://freshfolios.com" target="_blank" rel="noopener noreferrer">
          freshfolios.com
        </a>
        . For the other side project that taught me the same lesson, read{" "}
        <PostLink slug="428-places-almost-no-visitors">428 places, almost no visitors</PostLink>.
        Everything I’m building is on <Link href="/projects">Projects</Link>.
      </p>
    </>
  ),
};
