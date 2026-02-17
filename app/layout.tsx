import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Aditya Oswal | Product Designer & Design Engineer",
  description: "Product Designer and Design Engineer specializing in healthcare experiences, interactive design, and product strategy. Currently at Alivecor.",
  keywords: ["Aditya Oswal", "Product Designer", "Design Engineer", "Portfolio", "UX Designer", "UI Designer", "UI/UX", "GSAP", "Next.js"],
  authors: [{ name: "Aditya Oswal" }],
  openGraph: {
    title: "Aditya Oswal | Product Designer & Design Engineer",
    description: "Building digital experiences that feel alive.",
    url: "https://adityaoswal.in",
    siteName: "Aditya Oswal's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Oswal | Product Designer & Design Engineer",
    description: "Building digital experiences that feel alive.",
    creator: "@oswaluxd",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1A1A1A] focus:text-white focus:rounded-lg focus:font-mono focus:text-sm focus:uppercase focus:tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}