import Link from "next/link";
import { Placeholder } from "@/components/writing/Placeholder";
import { PostLink } from "@/components/writing/PostLink";
import type { Post } from "./types";

export const post: Post = {
  slug: "428-places-almost-no-visitors",
  title: "428 places, almost no visitors",
  description:
    "A retro on Interesting Places, a community-curated directory of 428+ places across India, Singapore and Malaysia: what I built, the numbers, why it didn’t get traction, and what I’m changing.",
  date: "2026-10-06",
  draft: true,
  projects: ["interesting-places"],
  body: (
    <>
      <p>
        <a href="https://interestingplaces.in" target="_blank" rel="noopener noreferrer">
          Interesting Places
        </a>{" "}
        is a directory of places worth going out of your way for. It has 428+ of them across India,
        Singapore and Malaysia, sent in by the people who found them.
      </p>
      <p>
        Almost nobody visits it. In the last 30 days it had <Placeholder>[IP_VISITORS_LAST_30D]</Placeholder>{" "}
        visitors.
      </p>
      <p>This is the retro. Some of it is a little embarrassing, which is sort of the point.</p>

      <h2>I built the machine before the audience</h2>
      <p>Most of my time went into making it easy to add places and keep the directory clean:</p>
      <ul>
        <li>
          <strong>A Telegram intake bot.</strong> Anyone can send a place to the bot. It collects the
          details and drops the submission into a queue.
        </li>
        <li>
          <strong>An AI concierge.</strong> Instead of scrolling a list, you ask for what you’re in the
          mood for and it answers from the places in the directory.
        </li>
        <li>
          <strong>An admin publish pipeline.</strong> I review what comes in, tidy it up and publish it
          to the site.
        </li>
      </ul>
      <p>
        All three work. None of them bring anyone to the site, which, looking back, was the actual
        job.
      </p>

      <h2>The numbers are small, so here they are</h2>
      <ul>
        <li>
          <strong>Places listed:</strong> 428+
        </li>
        <li>
          <strong>Visitors in the last 30 days:</strong> <Placeholder>[IP_VISITORS_LAST_30D]</Placeholder>
        </li>
        <li>
          <strong>Places submitted through the Telegram bot:</strong>{" "}
          <Placeholder>[IP_TELEGRAM_SUBMISSIONS]</Placeholder>
        </li>
        <li>
          <strong>Questions asked to the AI concierge:</strong>{" "}
          <Placeholder>[IP_CONCIERGE_QUESTIONS]</Placeholder>
        </li>
        <li>
          <strong>Biggest traffic source:</strong> <Placeholder>[IP_TOP_TRAFFIC_SOURCE]</Placeholder>
        </li>
        <li>
          <strong>Time spent building it:</strong> <Placeholder>[IP_BUILD_TIME]</Placeholder>
        </li>
      </ul>

      <h2>Nobody was told, and nobody came back</h2>
      <p>
        Brian Lovin wrote{" "}
        <a
          href="https://brianlovin.com/writing/my-playbook-for-shipping-side-projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          My playbook for shipping side projects
        </a>{" "}
        in 2021. Reading it now is a bit like reading a list of the things I skipped. Here’s why I think
        Interesting Places didn’t get traction:
      </p>
      <ul>
        <li>
          <strong>I had no way to reach anyone.</strong> No list, no regular writing. Every visitor had
          to find the site on their own, and the few who did had no reason to return.
        </li>
        <li>
          <strong>I built with the garage door closed.</strong> Nobody watched the bot or the concierge
          take shape, so nobody was waiting when they were done.
        </li>
        <li>
          <strong>I launched once.</strong> One post, then back to building features. A single launch
          day is easy to miss.
        </li>
        <li>
          <strong>A stranger from search lands with zero context.</strong> Someone who finds one place
          page on Google doesn’t know what the site is or why they should look at a second page.
        </li>
        <li>
          <strong>Nobody searches for a directory.</strong> People search for things to do in a city.
          428 places in one big list doesn’t match how anyone looks for a place.
        </li>
      </ul>

      <h2>Give people a reason to come back</h2>
      <p>Here’s what I’m changing, in order:</p>
      <ul>
        <li>
          <strong>An email list.</strong> Five interesting places every Friday. It’s a channel I own, and
          it gives me a weekly reason to keep adding places.
        </li>
        <li>
          <strong>A long-tail banner.</strong> A small banner on every place page that says what the site
          is and what else is in it, for people who arrive from search.
        </li>
        <li>
          <strong>City guides.</strong> Places grouped by city, starting with{" "}
          <Placeholder>[IP_FIRST_CITY_GUIDE]</Placeholder>. Cities are what people search for, and a guide
          gives a visitor an obvious second page.
        </li>
      </ul>
      <p>
        I’ll post the numbers again once these have had time to work. If they’re still small, you’ll get
        that post too.
      </p>

      <hr />
      <p>
        Interesting Places is live at{" "}
        <a href="https://interestingplaces.in" target="_blank" rel="noopener noreferrer">
          interestingplaces.in
        </a>
        . Everything else I’m building is on <Link href="/projects">Projects</Link>. If you want the
        playbook I’m following now, read{" "}
        <PostLink slug="my-playbook-for-shipping-side-projects">my playbook for shipping side projects</PostLink>.
      </p>
    </>
  ),
};
