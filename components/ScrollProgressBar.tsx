"use client";

import { motion, useScroll } from "motion/react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        originX: 0,
        backgroundColor: "var(--cinnamon)",
        zIndex: 9999,
      }}
    />
  );
}
