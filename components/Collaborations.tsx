"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const COMPANIES = [
    { name: "Alivecor", src: "/logos/Alivecor logo.svg" },
    { name: "Dualite", src: "/logos/Dualite logo.svg" },
    { name: "Shiftlink", src: "/logos/Shiftlinkapp.svg" },
    { name: "Kardia", src: "/logos/Kardia logo.svg" },
    { name: "Aibiliti", src: "/logos/Aibiliti.svg" },
    { name: "Dngtechno", src: "/logos/dngtechno logo.svg" },
    { name: "Wollkraft", src: "/logos/wollkraft logo.svg" },
];

const Collaborations = () => {
    // Duplicate the list multiple times to ensure a seamless loop even on larger screens
    const duplicatedCompanies = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

    return (
        <div className="w-full py-32 bg-[var(--background)] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left">
                <h2 className="text-xl flex justify-center  tracking-[0.1em] font-bold text-[var(--muted)]">
                    Some companies I&apos;ve had the pleasure to work with
                </h2>
            </div>

            <div className="relative flex overflow-hidden group">
                <motion.div
                    className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 60,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedCompanies.map((company, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex items-center mt-8 justify-center mx-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        >
                            <Image
                                src={company.src}
                                alt={`${company.name} logo`}
                                width={240}
                                height={60}
                                className="h-8 md:h-12 w-auto object-contain invert dark:invert-0"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Gradient overlays for smooth fade edges */}
                <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
            </div>
        </div>
    );
};

export default Collaborations;
