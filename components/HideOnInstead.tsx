"use client";

import { usePathname } from "next/navigation";

export function HideOnInstead({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/instead") || pathname === "/link-previews") return null;
  return <>{children}</>;
}
