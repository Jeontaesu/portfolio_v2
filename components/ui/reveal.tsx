"use client";

import type { ReactNode } from "react";
import * as m from "motion/react-m";

type RevealProps = {
  /** Element to render. Use "li" inside lists so the markup stays valid. */
  as?: "div" | "li";
  /** Seconds to wait before starting, to stagger siblings, e.g. index * 0.08. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and rises into place once, when it first scrolls into view.
 * Server render starts at opacity 0, so do not wrap content that is visible on first paint (it would
 * delay LCP until hydration). `data-reveal` lets globals.css force it visible for reduced motion.
 */
export function Reveal({ as = "div", delay = 0, className, children }: RevealProps) {
  const Component = as === "li" ? m.li : m.div;
  return (
    <Component
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </Component>
  );
}
