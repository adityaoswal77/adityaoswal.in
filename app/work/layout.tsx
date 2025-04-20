import type { Metadata } from "next";
// import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import '../../globals.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
    {/* <html lang="en" className={raleway.variable}> */}
      <body>
      {/* <body className={`${raleway.className} font-sans`}> */}
        {children}
        <Footer/>
      </body>
    </html>
  );
}
