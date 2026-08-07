"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image, { type ImageProps } from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

type ZoomableImageProps = Omit<ImageProps, "onClick"> & {
  wrapperClassName?: string;
};

export const ZoomableImage = ({ wrapperClassName, alt, ...imageProps }: ZoomableImageProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom in on ${alt}`}
        className={`relative block w-full h-full cursor-zoom-in ${wrapperClassName ?? ""}`}
      >
        <Image alt={alt} {...imageProps} />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-6 md:p-12"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={typeof imageProps.src === "string" ? imageProps.src : (imageProps.src as { src: string }).src}
                    alt={alt}
                    className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg select-none"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
