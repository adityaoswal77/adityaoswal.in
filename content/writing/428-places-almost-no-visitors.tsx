import Link from "next/link";
import type { Post } from "./types";

export const post: Post = {
  slug: "428-places-almost-no-visitors",
  title: "428 places, almost no visitors",
  description:
    "A look back at Interesting Places, my list of 428 places across India and Singapore: what I built, the numbers, why barely anyone visits, and what I’m changing.",
  date: "2026-10-06",
  draft: false,
  projects: ["interesting-places"],
  body: (
    <>
      <p>
        So I built{" "}
        <a href="https://interestingplaces.in" target="_blank" rel="noopener noreferrer">
          Interesting Places
        </a>
        . It’s a list of 428 places to eat and visit across India and Singapore.
      </p>
      <p>Barely anyone uses it. 90 people visited in the last 30 days.</p>
      <p>Here’s what I built, what went wrong, and what I’m trying next.</p>

      <h2>I built the tools before I had any users</h2>
      <p>Most of my time went into the stuff behind the site:</p>
      <ul>
        <li>
          <strong>A Telegram bot.</strong> I send it a place and it gets added to the site. Only I can
          use it.
        </li>
        <li>
          <strong>An AI concierge.</strong> You tell it what you’re looking for and it suggests places
          from the list.
        </li>
        <li>
          <strong>An admin publish pipeline.</strong> If someone submits a place through the site, I can
          review it and publish it. Nobody has submitted one yet.
        </li>
      </ul>
      <p>All of it works. None of it gets people to the site, and that was the real problem.</p>

      <h2>The numbers are small</h2>
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

      <h2>Why I think nobody’s coming</h2>
      <p>
        I read Brian Lovin’s{" "}
        <a
          href="https://brianlovin.com/writing/my-playbook-for-shipping-side-projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          My playbook for shipping side projects
        </a>{" "}
        and it was basically a list of things I didn’t do. My honest take:
      </p>
      <ul>
        <li>
          <strong>I had no way to reach people.</strong> No email list, no posts, nothing. 82 of the 90
          visitors came direct, so it’s mostly people I sent the link to.
        </li>
        <li>
          <strong>I built it quietly.</strong> I didn’t share anything while building it, so nobody was
          waiting for it.
        </li>
        <li>
          <strong>I only shared it once.</strong> One post, then straight back to building. Easy to miss.
        </li>
        <li>
          <strong>People from Google don’t know what the site is.</strong> Search sends almost nobody.
          And if someone does land on a place page, nothing tells them what the site is or what else is
          on it.
        </li>
        <li>
          <strong>Nobody searches for a big list.</strong> People search for things to do in a city. A
          list of 428 places doesn’t match that.
        </li>
      </ul>

      <h2>Here’s what I’m changing</h2>
      <ul>
        <li>
          <strong>An email list.</strong> 5 interesting places every Friday. That way I can actually
          reach people, and it pushes me to keep adding places.
        </li>
        <li>
          <strong>A banner on every place page.</strong> One line saying what the site is and what else
          is there, for people coming in from Google.
        </li>
        <li>
          <strong>City guides.</strong> Places grouped by city, starting with Bangalore since it has the
          most places. People search by city, and a guide gives them more to look at.
        </li>
      </ul>
      <p>I’ll share the numbers again once these are live. Even if they’re still bad.</p>

      <hr />
      <p>
        Interesting Places is at{" "}
        <a href="https://interestingplaces.in" target="_blank" rel="noopener noreferrer">
          interestingplaces.in
        </a>
        . Everything else I’m working on is on <Link href="/projects">Projects</Link>.
      </p>
    </>
  ),
};
