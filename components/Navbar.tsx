"use client";

import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "About", href: "/aboutme", current: false },

];

const socialLinks = [
  { name: "Reachout", href: "mailto:oswaluxd@gmail.com", current: false },
  // { name: "X", href: "https://x.com", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full p-4">
      <div className="flex items-center justify-between w-full max-w-4xl px-4 sm:px-8 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/5">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-lg sm:text-xl font-bold bg-">AO</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-gray-200 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="hidden md:flex items-center space-x-4">
          {socialLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-gray-200 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-200 hover:text-white focus:outline-none rounded-full hover:bg-white/10 transition-colors">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
                  )}
                </Disclosure.Button>

                <Disclosure.Panel className="absolute left-2 right-2 top-full mt-2 px-2 py-3 bg-black/90 backdrop-blur-md rounded-2xl border border-white/10">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className="block w-full px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-white/10 mt-2 pt-2 space-y-1">
                    {socialLinks.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
}
