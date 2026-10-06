import type { ReactNode } from "react";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  draft?: boolean;
  body: ReactNode;
};
