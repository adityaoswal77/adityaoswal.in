import type { Metadata } from "next";
// import { Raleway } from "next/font/google";

// const raleway = Raleway({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   display: 'swap',
//   variable: '--font-raleway',
// });

export const metadata: Metadata = {
  title: "Work & Case Studies | UX Designer & Product Designer",
  description:
    "Selected work by Aditya Oswal — UX Designer and Product Designer. Case studies in healthcare UX, fintech design, design systems, and interactive web experiences.",
  alternates: { canonical: "https://adityaoswal.in/work" },
};

export default function WorkLayout({
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
