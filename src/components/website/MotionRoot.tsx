"use client";

import { MotionConfig } from "motion/react";

function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default MotionRoot;
