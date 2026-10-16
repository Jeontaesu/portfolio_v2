"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * One provider per layout. LazyMotion loads only the DOM animation features and `strict` makes a stray
 * full `motion.*` component (which would pull in the whole library) throw, so components use `m.*`.
 * reducedMotion="user" turns off movement (x/y/scale) when the OS asks for less motion; fades remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
