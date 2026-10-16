"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { ProjectMedia } from "./ProjectMedia";
import { projectVars, SHOW_ON_HOVER_DEVICES, type Project } from "./shared";
import { PREVIEW_H, PREVIEW_W } from "./useCursorFollow";

export function CursorPreview({
  project,
  x,
  y,
  tilt,
  reduced,
}: {
  project: Project | null;
  x: MotionValue<number>;
  y: MotionValue<number>;
  tilt: MotionValue<number>;
  reduced: boolean;
}) {
  const fade = reduced ? 0 : 0.25;

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed left-0 top-0 z-40 ${SHOW_ON_HOVER_DEVICES}`}>
      <motion.div style={{ x, y, width: PREVIEW_W, height: PREVIEW_H }}>
        <div className="h-full w-full -rotate-2 dark:rotate-0">
          <motion.div
            className="relative h-full w-full"
            style={{ rotate: reduced ? 0 : tilt }}
            initial={false}
            animate={{ opacity: project ? 1 : 0, scale: project ? 1 : 0.92 }}
            transition={{ duration: fade, ease: "easeOut" }}
          >
            <AnimatePresence initial={false}>
              {project && (
                <motion.div
                  key={project.id}
                  className="absolute inset-0 rounded-[1.5rem] [box-shadow:0_28px_60px_-18px_var(--sh-l)] dark:rounded-2xl dark:[box-shadow:0_0_60px_-12px_var(--sh-d)]"
                  style={projectVars(project)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: fade }}
                >
                  <div className="h-full w-full rounded-[inherit]">
                    <ProjectMedia project={project} sizes={`${PREVIEW_W}px`} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
