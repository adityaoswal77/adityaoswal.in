import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aditya Oswal",
  description: "Work | Aditya Oswal",
};

export default function AboutMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
