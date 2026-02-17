"use client";

import React from "react";
import { motion } from "framer-motion";

const COMPANIES = [
    "AliveCor",
    "Dualite",
    "Shiftlink app",
    "Kardia",
    "DNG Techno",
    "Aibiliti",
];

const Collaborations = () => {
    // Duplicate the list to create a seamless loop
    const duplicatedCompanies = [...COMPANIES, ...COMPANIES];

    return (
        <div className="w-full py-16 bg-[var(--background)] border-y border-[var(--border)] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center md:text-left">
                <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                    Collaborations & Clients
                </span>
            </div>

            <div className="relative flex overflow-hidden group">
                <motion.div
                    className="flex whitespace-nowrap"
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
                            className="px-20 flex items-center justify-center"
                        >
                            <span className="text-3xl md:text-6xl font-semibold uppercase tracking-normal text-[var(--foreground)] opacity-20 hover:opacity-100 transition-all duration-500 select-none">
                                {company}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Gradient overlays for smooth fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />
            </div>
        </div>
    );
};

export default Collaborations;
