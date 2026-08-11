"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdiOs } from "@/components/AdiOs";

const EXCLAMATIONS = [
  "Designing the future ✦",
  "Click me to chat! 💬",
  "Need coffee ☕",
  "Supp?? ☕",
  "Based in Bangalore!",
  "Still prototyping...",
  "404: rest not found",
  "I made this!",
  "*furiously wireframing*",
  "Check my work →",
  "Hello there!",
  "Pushing Pixels",
  "Click me to chat!💬",
  "Open to new things",
  "Built with Next.js!",
  "Figma is open...",
  "Designer or Engineer",
  "What raaaa???",
  "To the moon?",
];

const SPEED = 0.85;
const NAV_HEIGHT = 80;
const CHAR_W = 32;
const CHAR_H = 48;
const FAB_SIZE = 56;
const FAB_MARGIN = 24;

function getDockPosition() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const fabX = vw - FAB_MARGIN - FAB_SIZE;
  const fabY = vh - FAB_MARGIN - FAB_SIZE;
  return {
    x: fabX + (FAB_SIZE - CHAR_W) / 2,
    y: fabY - CHAR_H + 12,
  };
}

// Native mouseenter/mouseleave only fire on real pointer movement, not when an
// element slides under a stationary cursor — so a walking character never
// triggers them. Poll the last known pointer position against the character's
// live rect every animation frame instead.
const HOVER_HIT_PAD = 6;
function isPointerOverChar(px: number, py: number, cx: number, cy: number) {
  return (
    px >= cx - HOVER_HIT_PAD &&
    px <= cx + CHAR_W + HOVER_HIT_PAD &&
    py >= cy - HOVER_HIT_PAD &&
    py <= cy + CHAR_H + HOVER_HIT_PAD
  );
}

function PixelChar({ facingRight, isWalking }: { facingRight: boolean; isWalking: boolean }) {
  return (
    <>
      <style>{`
        @keyframes leg-l { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-2px) } }
        @keyframes leg-r { 0%,100% { transform: translateY(-2px) } 50% { transform: translateY(0px) } }
        .leg-l { transform-box: fill-box; transform-origin: center bottom; animation: ${isWalking ? "leg-l 0.35s steps(1) infinite" : "none"}; }
        .leg-r { transform-box: fill-box; transform-origin: center bottom; animation: ${isWalking ? "leg-r 0.35s steps(1) infinite" : "none"}; }
      `}</style>
      <svg
        width={CHAR_W}
        height={CHAR_H}
        viewBox="0 0 8 12"
        style={{
          imageRendering: "pixelated",
          transform: facingRight ? "none" : "scaleX(-1)",
          display: "block",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
        }}
      >
        <rect x="2" y="0" width="4" height="4" fill="currentColor" />
        <rect x="2.5" y="1.5" width="1" height="1" fill="var(--background)" />
        <rect x="4.5" y="1.5" width="1" height="1" fill="var(--background)" />
        <rect x="1" y="4" width="6" height="4" fill="currentColor" />
        <rect x="7" y="5" width="1" height="2" fill="currentColor" opacity="0.6" />
        <rect x="7" y="7" width="1" height="1" fill="#f59e0b" />
        <rect className="leg-l" x="1.5" y="8" width="2" height="3" fill="currentColor" />
        <rect className="leg-r" x="4.5" y="8" width="2" height="3" fill="currentColor" />
      </svg>
    </>
  );
}

// Chat FAB — fixed bottom-right on every breakpoint; the desktop character docks on top of it
function ChatFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Chat with Adi.Os"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-150"
    >
      <svg width="28" height="28" viewBox="0 0 8 12" style={{ imageRendering: "pixelated" }}>
        <rect x="2" y="0" width="4" height="4" fill="currentColor" />
        <rect x="2.5" y="1.5" width="1" height="1" fill="var(--foreground)" style={{ fill: "var(--background)" }} />
        <rect x="4.5" y="1.5" width="1" height="1" style={{ fill: "var(--background)" }} />
        <rect x="1" y="4" width="6" height="4" fill="currentColor" />
        <rect x="1.5" y="8" width="2" height="3" fill="currentColor" />
        <rect x="4.5" y="8" width="2" height="3" fill="currentColor" />
      </svg>
    </button>
  );
}

export function WanderingCharacter() {
  const charRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 160, y: 300 });
  const targetRef = useRef({ x: 160, y: 300 });
  const stateRef = useRef<"walking" | "idle" | "hovering" | "chatting">("idle");
  const rafRef = useRef<number>(0);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const pointerOverRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reducedMotionRef = useRef(false);

  const [facingRight, setFacingRight] = useState(true);
  const [isWalking, setIsWalking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [exclamation, setExclamation] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pinned, setPinned] = useState(false);
  const pinnedRef = useRef(false);
  const [showIntroMessage, setShowIntroMessage] = useState(false);
  const [hasClickedPin, setHasClickedPin] = useState(false);
  const [showRandomExclamation, setShowRandomExclamation] = useState(false);
  const randomScheduleRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const randomHideRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const scheduleRandomExclamation = () => {
    if (randomScheduleRef.current) clearTimeout(randomScheduleRef.current);
    randomScheduleRef.current = setTimeout(() => {
      if (!pinnedRef.current && stateRef.current !== "chatting" && stateRef.current !== "hovering") {
        setExclamation(EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)]);
        setShowRandomExclamation(true);
        randomHideRef.current = setTimeout(() => {
          setShowRandomExclamation(false);
          scheduleRandomExclamation();
        }, 2500);
      } else {
        scheduleRandomExclamation();
      }
    }, 8000 + Math.random() * 7000);
  };

  // Positioned by transform rather than left/top: the walk loop writes this on every animation
  // frame, and a layout-driven offset would force a reflow plus a repaint of the drop-shadowed
  // sprite each time, on every page the character is mounted on.
  const applyPosition = () => {
    if (!charRef.current) return;
    charRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
  };

  const pickNewTarget = () => {
    // Under reduced motion the rAF walk loop never starts, so committing to "walking" here would
    // leave the leg-cycle CSS animation spinning forever on a sprite that visually never moves.
    // Settle into "idle" instead so callers exiting another state (e.g. closeChat leaving
    // "chatting") still land somewhere handleMouseEnter/other checks expect.
    if (reducedMotionRef.current) {
      stateRef.current = "idle";
      return;
    }
    const margin = 60;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Keep the character in the bottom-right zone, near where the chat FAB lives.
    const xMin = vw * 0.5;
    const xMax = vw - margin - CHAR_W;
    const yMin = Math.max(NAV_HEIGHT + margin, vh * 0.6);
    const yMax = vh - margin - CHAR_H;
    const x = xMin + Math.random() * Math.max(0, xMax - xMin);
    const y = yMin + Math.random() * Math.max(0, yMax - yMin);
    targetRef.current = { x, y };
    stateRef.current = "walking";
    setIsWalking(true);
  };

  const openChat = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    stateRef.current = "chatting";
    setIsWalking(false);
    setIsHovered(false);
    setShowRandomExclamation(false);
    setChatOpen(true);
  };

  const togglePinned = () => {
    const next = !pinnedRef.current;
    pinnedRef.current = next;
    setPinned(next);
    setHasClickedPin(true);

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    // Can be invoked from the hover bubble, so the pointer is still over the cluster while the
    // character teleports (or walks) away. Release the edge-trigger latch too, otherwise the
    // poll never fires a fresh enter if the character lands back under that same cursor.
    pointerOverRef.current = false;
    setIsHovered(false);
    setShowRandomExclamation(false);

    if (next) {
      stateRef.current = "idle";
      setIsWalking(false);
      if (randomScheduleRef.current) clearTimeout(randomScheduleRef.current);
      if (randomHideRef.current) clearTimeout(randomHideRef.current);
      posRef.current = getDockPosition();
      applyPosition();
    } else {
      pickNewTarget();
      scheduleRandomExclamation();
    }
  };

  const closeChat = () => {
    setChatOpen(false);
    resumeTimerRef.current = setTimeout(() => {
      if (stateRef.current === "chatting") pickNewTarget();
    }, 600);
  };

  const handleMouseEnter = () => {
    if (stateRef.current === "chatting") return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    stateRef.current = "hovering";
    setIsWalking(false);
    setIsHovered(true);
    setShowIntroMessage(false);
    setShowRandomExclamation(false);
    setExclamation(EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)]);
  };

  const handleMouseLeave = () => {
    if (stateRef.current === "chatting") return;
    setIsHovered(false);
    resumeTimerRef.current = setTimeout(() => {
      if (stateRef.current !== "hovering") return;
      if (pinnedRef.current) {
        stateRef.current = "idle";
      } else {
        pickNewTarget();
      }
    }, 800);
  };

  // Single edge-triggered entry point for both the real DOM hover events and
  // the per-frame poll below, so a moving character crossing a stationary
  // cursor and a stationary character crossing a moving cursor both pause it
  // exactly once instead of re-firing every frame.
  const updateHoverState = (overChar: boolean) => {
    if (overChar && !pointerOverRef.current) {
      pointerOverRef.current = true;
      handleMouseEnter();
    } else if (!overChar && pointerOverRef.current) {
      pointerOverRef.current = false;
      handleMouseLeave();
    }
  };

  useEffect(() => {
    setMounted(true);

    const introShow = setTimeout(() => setShowIntroMessage(true), 1500);
    const introHide = setTimeout(() => setShowIntroMessage(false), 7000);

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotionRef.current) {
      return () => { clearTimeout(introShow); clearTimeout(introHide); };
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    posRef.current = { x: vw * 0.7, y: vh * 0.75 };
    applyPosition();

    const kickoff = setTimeout(() => pickNewTarget(), 3200);
    scheduleRandomExclamation();

    const handleResize = () => {
      if (pinnedRef.current) {
        posRef.current = getDockPosition();
        applyPosition();
      }
    };
    window.addEventListener("resize", handleResize);

    const handlePointerMove = (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    const loop = () => {
      // Skip once actually hovering: the character is stationary at that point, so real
      // DOM mouseenter/leave (which correctly cover descendants like the pause bubble)
      // take over. Recomputing here too would fire a false "leave" the instant the
      // cursor crosses outside the sprite's tiny box onto the bubble above it.
      if (charRef.current && stateRef.current !== "chatting" && stateRef.current !== "hovering") {
        updateHoverState(
          isPointerOverChar(pointerRef.current.x, pointerRef.current.y, posRef.current.x, posRef.current.y)
        );
      }

      if (stateRef.current === "walking" && !pinnedRef.current && charRef.current) {
        const dx = targetRef.current.x - posRef.current.x;
        const dy = targetRef.current.y - posRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < SPEED + 1) {
          posRef.current = { ...targetRef.current };
          stateRef.current = "idle";
          setIsWalking(false);
          applyPosition();

          idleTimerRef.current = setTimeout(
            () => { if (stateRef.current === "idle") pickNewTarget(); },
            2000 + Math.random() * 3000
          );
        } else {
          posRef.current.x += (dx / dist) * SPEED;
          posRef.current.y += (dy / dist) * SPEED;
          applyPosition();
          const newFacingRight = dx > 0;
          setFacingRight((prev) => (prev !== newFacingRight ? newFacingRight : prev));
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      clearTimeout(introShow);
      clearTimeout(introHide);
      clearTimeout(kickoff);
      window.removeEventListener("mousemove", handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (randomScheduleRef.current) clearTimeout(randomScheduleRef.current);
      if (randomHideRef.current) clearTimeout(randomHideRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Desktop dock toggle */}
      <button
        type="button"
        onClick={togglePinned}
        aria-label={pinned ? "Let character wander" : "Dock character in the chat FAB"}
        title={pinned ? "Let wander" : "Dock in chat FAB"}
        className={`hidden md:flex fixed top-5 right-5 z-50 h-8 items-center justify-center gap-1.5 rounded-md border border-[var(--border)] px-2.5 transition-colors duration-150 ${
          pinned
            ? "bg-[var(--foreground)] text-[var(--background)]"
            : "bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        }`}
      >
        {!hasClickedPin && (
          <span className="absolute inset-0 rounded-md animate-ping bg-[var(--foreground)] opacity-20 pointer-events-none" />
        )}
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="8" y1="1" x2="8" y2="10" />
          <path d="M4 6 Q8 11 12 6" />
          <line x1="6" y1="10" x2="10" y2="10" />
          <line x1="8" y1="13" x2="8" y2="15" />
        </svg>
        <span className="text-[11px] font-mono">{pinned ? "resume" : "pause"}</span>
        <AnimatePresence>
          {showIntroMessage && !pinned && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-[11px] font-mono overflow-hidden whitespace-nowrap opacity-60"
            >
              — click to stop Adi.Os
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat FAB — always mounted; desktop character docks on top of it when pinned */}
      {!chatOpen && <ChatFab onClick={openChat} />}

      {/* Desktop wandering character — painted after the FAB so it visibly sits in/on it when docked */}
      <div aria-hidden="true" className="hidden md:block fixed inset-0 pointer-events-none z-40">
        <div
          ref={charRef}
          className="absolute left-0 top-0 pointer-events-auto"
          style={{ transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)` }}
          onMouseEnter={() => updateHoverState(true)}
          onMouseLeave={() => updateHoverState(false)}
          onClick={openChat}
        >
          {/* Speech bubble */}
          <AnimatePresence>
            {(showIntroMessage || isHovered || showRandomExclamation) && !chatOpen && (
              // pb-2 rather than mb-2: a margin gap here is dead space outside every element of
              // the cluster, so moving the cursor from the sprite up to the pause button fires a
              // real DOM mouseleave mid-travel and unmounts the button before the click lands.
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.75, y: 6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute bottom-full right-0 pb-2 flex flex-col items-end gap-1.5 whitespace-nowrap"
              >
                <div className="relative px-3 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] backdrop-blur-sm shadow-lg">
                  <span className="text-[11px] font-mono text-[var(--foreground)]">
                    {(isHovered || showRandomExclamation) ? exclamation : "you can pause me by clicking on the top right"}
                  </span>
                  <div
                    className="absolute top-full right-3"
                    style={{
                      width: 0, height: 0,
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: "5px solid var(--border)",
                    }}
                  />
                </div>

                {/* Pause bubble — only while hovering; docks the character into the chat FAB */}
                {isHovered && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePinned();
                    }}
                    // Lives inside the aria-hidden character layer and is hover-only; the
                    // top-right dock toggle is the keyboard-reachable equivalent.
                    tabIndex={-1}
                    aria-label={pinned ? "Let character wander" : "Pause character in the chat FAB"}
                    className="px-2.5 py-1 rounded-full bg-[var(--foreground)] text-[var(--background)] text-[10px] font-mono shadow-md hover:scale-105 transition-transform duration-150"
                  >
                    {pinned ? "resume wandering" : "pause here ⏸"}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="text-[var(--foreground)] cursor-pointer transition-transform duration-150"
            style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          >
            <PixelChar facingRight={facingRight} isWalking={isWalking} />
          </div>

          {/* Pause badge — confirms hover actually froze the character, not just an incidental stop */}
          <AnimatePresence>
            {isHovered && !chatOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--foreground)] flex items-center justify-center shadow-md"
              >
                <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                  <rect x="1" y="0.5" width="2" height="7" fill="var(--background)" />
                  <rect x="5" y="0.5" width="2" height="7" fill="var(--background)" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Adi.Os chat drawer */}
      <AdiOs open={chatOpen} onClose={closeChat} />
    </>
  );
}
