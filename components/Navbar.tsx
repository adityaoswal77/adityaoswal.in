"use client";

import { Disclosure } from "@headlessui/react";
import { Menu as Bars3Icon, X as XMarkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Work", href: "/work", current: false },
  { name: "About", href: "/aboutme", current: false },
];

const socialLinks = [
  { name: "Resume", href: "https://drive.google.com/drive/folders/1d7JqAFL_SbR3dN9wo7B32x3Uzu-dpfzp", current: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-none">
      <div className="flex items-center justify-between w-full h-14 px-6 bg-[var(--card)] backdrop-blur-md border border-[var(--border)] rounded-full pointer-events-auto shadow-2xl transition-colors duration-300">
        {/* Logo Container */}
        <div className="flex items-center text-[var(--foreground)]">
          <Link href="/" className="flex items-center font-bold text-lg tracking-tighter uppercase">
            <span>A</span>
            <span
              className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isScrolled ? 'max-w-0 opacity-0' : 'max-w-[80px] opacity-100'
                }`}
            >
              ditya
            </span>
            <span className={`transition-all duration-700 ${isScrolled ? 'ml-1' : 'ml-2'}`}>
              O
            </span>
            <span
              className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isScrolled ? 'max-w-0 opacity-0' : 'max-w-[80px] opacity-100'
                }`}
            >
              swal
            </span>
            {/* Dynamic Island Camera Light */}
            <div className="ml-2 w-1 h-1 rounded-full bg-emerald-500 animate-pulse-camera shadow-[0_0_8px_rgba(16,185,129,0.5)] flex-shrink-0" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 ${isActive ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="h-px bg-[var(--foreground)] mt-0.5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle Switch */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative flex items-center gap-1 px-1 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 transition-colors duration-300 hover:border-zinc-400 dark:hover:border-zinc-600"
            aria-label="Toggle theme"
          >
            {mounted ? (
              <>
                {/* Sun Icon */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${theme === "light" ? "text-orange-500" : "text-zinc-400 dark:text-zinc-600"
                  }`}>
                  <Sun className="w-4 h-4" />
                </div>

                {/* Moon Icon */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${theme === "dark" ? "text-indigo-400" : "text-zinc-400"
                  }`}>
                  <Moon className="w-4 h-4" />
                </div>

                {/* Sliding Background */}
                <motion.div
                  className="absolute top-1 left-1 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 shadow-md"
                  initial={false}
                  animate={{
                    x: theme === "dark" ? 32 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              </>
            ) : (
              <>
                {/* Placeholder icons during SSR */}
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-zinc-400">
                  <Sun className="w-4 h-4" />
                </div>
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-zinc-400">
                  <Moon className="w-4 h-4" />
                </div>
              </>
            )}
          </button>
          <Link

            href="https://drive.google.com/drive/folders/1d7JqAFL_SbR3dN9wo7B32x3Uzu-dpfzp"
            className="bg-[var(--foreground)] text-[var(--background)] px-4 py-1.5 rounded-2xl text-[14px] font-bold uppercase tracking-wider hover:opacity-90 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
                    )}
                  </Disclosure.Button>

                  <AnimatePresence>
                    {open && (
                      <Disclosure.Panel
                        static
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-full left-0 right-0 mt-4 p-4 bg-[var(--background)]/90 backdrop-blur-xl rounded-3xl border border-[var(--border)] shadow-2xl"
                      >
                        <div className="space-y-1">
                          {navigation.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as={Link}
                              href={item.href}
                              className={`block w-full px-4 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${pathname === item.href
                                ? "text-[var(--foreground)] bg-[var(--foreground)]/5"
                                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
                                }`}
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </nav>
  );
}
