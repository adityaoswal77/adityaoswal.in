"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const COMPANIES = [
    { name: "Alivecor", src: "/logos/Alivecor logo.svg" },
    { name: "Dualite", src: "/logos/Dualite logo.svg" },
    { name: "Shiftlink", src: "/logos/Shiftlinkapp.svg" },
    { name: "Kardia", src: "/logos/Kardia logo.svg" },
    { name: "Aibiliti", src: "/logos/Aibiliti.svg" },
    { name: "Dngtechno", src: "/logos/dngtechno logo.svg" },
    { name: "Wolffkraft", src: "/logos/wollkraft logo.svg" },
];

const Collaborations = () => {
    const reducedMotion = useReducedMotion();
    // Duplicate the list multiple times to ensure a seamless loop even on larger screens
    const duplicatedCompanies = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

    return (
        <div className="w-full py-16 md:py-32 bg-[var(--background)] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left">
                <h2 className="text-xl flex justify-center  tracking-[0.1em] font-bold text-[var(--muted)]">
                    Some companies I&apos;ve had the pleasure to work with
                </h2>
            </div>

            <div className="relative flex overflow-hidden group">
                <motion.div
                    className="flex items-stretch gap-16 md:gap-12"
                    animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 100,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedCompanies.map((company, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-40 h-24 md:w-52 md:h-28 flex items-center justify-center rounded-xl border border-[var(--border)] dark:border-white/10 bg-[#E9E2F2]/40 dark:bg-white/[0.04] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-[#2A2438]/30 dark:hover:border-white/30 transition-all duration-500"
                        >
                            <Image
                                src={company.src}
                                alt={`${company.name} logo`}
                                width={280}
                                height={60}
                                className="h-7 md:h-9 w-auto max-w-[70%] object-contain invert dark:invert-0"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Gradient overlays for smooth fade edges */}
                <div className="absolute inset-y-0 left-0 w-16 sm:w-32 md:w-64 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 sm:w-32 md:w-64 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
            </div>
        </div>
    );
};

export default Collaborations;
