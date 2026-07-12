import React from "react";
import { motion } from "framer-motion";

/**
 * The site's signature visual motif: a soft hand-drawn "line of the heart"
 * that runs between sections, pulsing gently where it crosses a small
 * heart marker. It stands in for a plain rule/divider while echoing the
 * romantic, storytelling feel of the page.
 */
const HeartbeatDivider = ({ label }) => (
  <div className="relative mx-auto flex max-w-3xl items-center gap-4 px-6 py-10">
    <svg viewBox="0 0 300 40" className="h-8 flex-1" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M0 20 Q 30 20 45 20 L 60 20 L 70 4 L 80 36 L 90 20 L 110 20 Q 150 20 150 20"
        fill="none"
        stroke="#FFB3C6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </svg>

    {label && (
      <span className="shrink-0 rounded-full bg-blush-light/40 px-4 py-1 font-display italic text-blush-dark">
        {label}
      </span>
    )}

    <svg viewBox="0 0 300 40" className="h-8 flex-1" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M150 20 Q 190 20 190 20 L 210 20 L 220 4 L 230 36 L 240 20 L 255 20 Q 280 20 300 20"
        fill="none"
        stroke="#FFB3C6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.15 }}
      />
    </svg>
  </div>
);

export default HeartbeatDivider;
