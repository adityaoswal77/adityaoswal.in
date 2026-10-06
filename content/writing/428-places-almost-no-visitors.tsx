import Link from "next/link";
import type { Post } from "./types";

export const post: Post = {
  slug: "428-places-almost-no-visitors",
  title: "428 places, almost no visitors",
  description:
    "A retro on Interesting Places, a directory of 428 places across India and Singapore: what I built, the numbers, why it didn’t get traction, and what I’m changing.",
  date: "2026-10-06",
  draft: false,
  projects: ["interesting-places"],
  body: (
    <>
      <p>
        <a href="https://interestingplaces.in" target="_blank" rel="noopener noreferrer">
          Interesting Places
        </a>{" "}
        is a directory of places worth going out of your way for. It has 428 of them across India and
        Singapore.
      </p>
      <p>
        Almost nobody visits it. In the last 30 days it had 90 visitors.
      </p>
      <p>This is the retro. Some of it is a little embarrassing, which is sort of the point.</p>

      <h2>I built the machine before the audience</h2>
      <p>Most of my time went into making it easy to add places and keep the directory clean:</p>
      <ul>
        <li>
          <strong>A Telegram bot.</strong> My own shortcut for adding places. I send it a place and it
          goes straight into the directory.
        </li>
        <li>
          <strong>An AI concierge.</strong> Instead of scrolling a list, you ask for what you’re in the
          mood for and it answers from the places in the directory.
        </li>
        <li>
          <strong>An admin publish pipeline.</strong> For places other people submit through the site: I
          review them, tidy them up and publish them. It hasn’t had anything to publish yet, because
          nobody has submitted one.
        </li>
      </ul>
      <p>
        All three work. None of them bring anyone to the site, which, looking back, was the actual
        job.
      </p>

      <h2>The numbers are small, so here they are</h2>
      <ul>
        <li>
          <strong>Places listed:</strong> 428
        </li>
        <li>
          <strong>Visitors in the last 30 days:</strong> 90
        </li>
        <li>
          <strong>Where they came from:</strong> 82 of the 90 came direct
        </li>
        <li>
          <strong>Questions asked to the AI concierge:</strong> 10
        </li>
        <li>
          <strong>Time since I started building it:</strong> about 7 months
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
          <strong>I had no way to reach anyone.</strong> No list, no regular writing. 82 of the 90
          visitors came direct, which probably means people I sent the link to myself.
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
          <strong>A stranger from search lands with zero context.</strong> Search sent almost nobody, and
          someone who does find one place page on Google doesn’t know what the site is or why they
          should look at a second page.
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
          <strong>City guides.</strong> Places grouped by city, starting with Bangalore, which has more
          places than any other city in the directory. Cities are what people search for, and a guide
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
        . Everything else I’m building is on <Link href="/projects">Projects</Link>.
      </p>
    </>
  ),
};
