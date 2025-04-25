"use client";

import { ReactNode, Suspense } from "react";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { HoverScale } from "@/components/animations/HoverScale";
import VariableFontHoverByRandomLetter from "@/fancy/components/text/variable-font-hover-by-random-letter";
import { BreathingText } from "@/components/animations/BreathingText";
import { AnimatedGradient } from "@/components/background/AnimatedGradient";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/5" />,
});

interface SocialButtonProps {
  href: string;
  children: ReactNode;
  ariaLabel: string;
}

interface ActionButtonProps {
  href: string;
  children: ReactNode;
}

const SocialButton = ({ href, children, ariaLabel }: SocialButtonProps) => (
  <HoverScale scale={1.1}>
    <a
      className="group flex items-center justify-center w-12 h-12 text-slate-100 transition-all duration-500 rounded-full border border-white/20 relative overflow-hidden"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
      <span className="relative z-10 group-hover:text-green-400 transition-colors duration-300">
        {children}
      </span>
    </a>
  </HoverScale>
);

const ActionButton = ({ href, children }: ActionButtonProps) => (
  <HoverScale scale={1.05}>
    <a
      className="group inline-flex items-center justify-center px-6 py-3 text-slate-100 transition-all duration-500 rounded-full border border-white/20 relative overflow-hidden hover:border-green-400/50"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
      <span className="relative z-10 group-hover:text-green-400 transition-colors duration-300">
        {children}
      </span>
    </a>
  </HoverScale>
);

const SocialLinks = () => (
  <FadeIn delay={0.4}>
    <div className="flex flex-wrap justify-center gap-6 pt-8">
      <SocialButton
        href="https://www.linkedin.com/in/oswaladitya/"
        ariaLabel="LinkedIn Profile"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
            fill="currentColor"
          />
        </svg>
      </SocialButton>
      <SocialButton
        href="https://github.com/adityaoswal77"
        ariaLabel="GitHub Profile"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            fill="currentColor"
          />
        </svg>
      </SocialButton>
    </div>
  </FadeIn>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4 md:p-12 relative">
        <AnimatedGradient className="pointer-events-none" />
        <div className="max-w-4xl w-full text-center pt-24 relative z-10">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-medium mb-6">
              <div className="flex items-center justify-center gap-2">
                <span>Aditya</span>
                <span>Oswal</span>
              </div>
            </h1>
          </FadeIn>

          <SlideIn direction="up" delay={0.3}>
            <p className="text-xl md:text-lg mb-8 text-gray-300">
              Product Designer by the day, Dev by the night
            </p>
          </SlideIn>

          <FadeIn delay={0.4}>
            <div className="flex justify-center gap-4 mb-8">
              <ActionButton href="https://www.figma.com/proto/upYjzU2eQ4hDYXVhhvSqPn/Portfolio-Deck?page-id=0%3A1&type=design&node-id=415-443&viewport=-2824%2C-1072%2C0.19&t=ctFdwdz4IBYm11gK-1&scaling=contain">
                View Portfolio
              </ActionButton>
              <ActionButton href="https://drive.google.com/drive/folders/1d7JqAFL_SbR3dN9wo7B32x3Uzu-dpfzp">
                Resume
              </ActionButton>
            </div>
          </FadeIn>

          <SocialLinks />
        </div>
      </main>
      <Footer />
    </div>
  );
}
