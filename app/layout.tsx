import type { Metadata } from "next";
// import { Inter } from 'next/font/google';
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Aditya Oswal",
  description: "Personal Portfolio | Aditya Oswal",
  icons: {
    icon: [
      {
        url: "/icon.png",  // This should be in your public folder
        type: "image/png",
      },
    ],
    // Optional: Add apple touch icon if you want iOS support
    apple: {
      url: "/icon.png",  // This should be in your public folder
      type: "image/png",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>      ] */}
        <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}