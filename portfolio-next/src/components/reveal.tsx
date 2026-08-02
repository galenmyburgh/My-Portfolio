"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal.
 *
 * Replaces AOS. One shared IntersectionObserver for the whole page rather than
 * one per element, elements are unobserved once shown, and the actual
 * transition lives in CSS (see globals.css) so this only toggles an attribute.
 *
 * Reduced motion is handled entirely in CSS — the observer still runs and sets
 * the attribute, the CSS just refuses to animate it.
 */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "true");
          observer?.unobserve(entry.target);
        }
      },
      // Fire slightly before the element reaches the viewport, so the content
      // has finished animating by the time it is properly in view.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );
  }

  return observer;
}

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger, in ms, for revealing a row of sibling cards. */
  delay?: number;
};

export function Reveal({ children, as: Tag = "div", className, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver is missing, show the content rather than hide it.
    const io = getObserver();
    if (!io) {
      node.setAttribute("data-shown", "true");
      return;
    }

    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
