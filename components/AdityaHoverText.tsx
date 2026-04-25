"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LETTERS = [
  { char: "A", srcs: ["/Aditya/A1.png", "/Aditya/A2.png"] },
  { char: "d", srcs: ["/Aditya/D1.png", "/Aditya/D2.png"] },
  { char: "i", srcs: ["/Aditya/I1.png", "/Aditya/I2.png"] },
  { char: "t", srcs: ["/Aditya/T1.png", "/Aditya/T2.png"] },
  { char: "y", srcs: ["/Aditya/Y1.png", "/Aditya/Y2.png"] },
  { char: "a", srcs: ["/Aditya/A2.png", "/Aditya/A1.png"] },
];

function HoverLetter({ char, srcs }: { char: string; srcs: string[] }) {
  const [hovered, setHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const activeSrc = srcs[activeIdx];

  const handleMouseEnter = () => {
    setActiveIdx((prev) => (prev + 1) % srcs.length);
    setHovered(true);
  };

  return (
    <span
      className="relative inline-block cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className="block"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {char}
      </motion.span>

      <motion.span
        className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[4px]"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <Image
          src={activeSrc}
          alt={char}
          fill
          sizes="(max-width: 768px) 60px, (max-width: 1024px) 90px, 120px"
          quality={100}
          className="object-cover"
        />
      </motion.span>
    </span>
  );
}

export function AdityaHoverText() {
  return (
    <span className="pointer-events-auto">
      {LETTERS.map((letter, i) => (
        <HoverLetter key={i} char={letter.char} srcs={letter.srcs} />
      ))}
    </span>
  );
}
