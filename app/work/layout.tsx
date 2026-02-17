import type { Metadata } from "next";
// import { Raleway } from "next/font/google";

// const raleway = Raleway({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   display: 'swap',
//   variable: '--font-raleway',
// });

export const metadata: Metadata = {
  title: "Aditya Oswal",
  description: "Work | Aditya Oswal",
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
