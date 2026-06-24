import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageLoadProvider } from "@/components/PageLoader";
import { WanderingCharacter } from "@/components/WanderingCharacter";

const siteUrl = "https://adityaoswal.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aditya Oswal | UX Designer & Product Designer in Bangalore",
    template: "%s | Aditya Oswal",
  },
  description:
    "Aditya Oswal is a UX Designer, Product Designer, and Design Engineer based in Bangalore, India. Specializing in UI/UX design, design systems, nocode development, and interactive web experiences. Currently at Alivecor.",
  keywords: [
    "Aditya Oswal",
    "UX Designer",
    "UI UX Designer",
    "UIUX Designer",
    "Product Designer",
    "Design Engineer",
    "Nocode Developer",
    "No-code Developer",
    "Designer",
    "UI Designer",
    "Portfolio",
    "UX Design",
    "Product Design",
    "Design System",
    "Interaction Design",
    "Healthcare Design",
    "Bangalore Designer",
    "India Designer",
    "Framer",
    "Webflow",
    "Next.js",
    "Frontend Designer",
  ],
  authors: [{ name: "Aditya Oswal", url: siteUrl }],
  creator: "Aditya Oswal",
  openGraph: {
    title: "Aditya Oswal | UX Designer & Product Designer in Bangalore",
    description:
      "UX Designer, Product Designer, and Design Engineer based in Bangalore. Specializing in UI/UX, design systems, nocode development, and interactive web experiences.",
    url: siteUrl,
    siteName: "Aditya Oswal — Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/aditya.jpg",
        width: 1200,
        height: 630,
        alt: "Aditya Oswal — UX Designer & Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Oswal | UX Designer & Product Designer",
    description:
      "UX Designer, Product Designer, and Design Engineer based in Bangalore. Specializing in UI/UX, design systems, and interactive web experiences.",
    creator: "@oswaluxd",
    images: ["/assets/aditya.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aditya Oswal",
  url: "https://adityaoswal.in",
  image: "https://adityaoswal.in/assets/aditya.jpg",
  jobTitle: ["UX Designer", "Product Designer", "Design Engineer"],
  worksFor: {
    "@type": "Organization",
    name: "Alivecor",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/oswaladitya/",
    "https://twitter.com/oswaluxd",
    "https://github.com/adityaoswal",
  ],
  knowsAbout: [
    "UX Design",
    "UI Design",
    "Product Design",
    "Design Systems",
    "Design Engineering",
    "Nocode Development",
    "Frontend Development",
    "Interaction Design",
    "Healthcare UX",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
          <PageLoadProvider>
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <Footer />
            <WanderingCharacter />
          </PageLoadProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}