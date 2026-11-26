"use client";

import { Fragment } from "react";
import type { UIMessage } from "ai";

export const MESSAGE_LIMIT = 10;

export function messageText(m: UIMessage) {
  return m.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)|(https?:\/\/[^\s)]+)/g;

export function RichText({ text, linkClass }: { text: string; linkClass: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) out.push(<Fragment key={`t${i}`}>{text.slice(last, i)}</Fragment>);
    const href = m[2] ?? m[3];
    const label = m[1] ?? m[3];
    out.push(
      <a key={`a${i}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={linkClass}>
        {label}
      </a>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return <>{out}</>;
}
