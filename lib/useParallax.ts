"use client";

import { useEffect, useRef } from "react";

/** Ties a background layer's translateY to its section's position in the viewport. */
export function useParallax<S extends HTMLElement, L extends HTMLElement>(speed = 0.16) {
  const sectionRef = useRef<S>(null);
  const layerRef = useRef<L>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ticking = false;
    const update = () => {
      const sec = sectionRef.current;
      const layer = layerRef.current;
      if (sec && layer) {
        const r = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        const offset = r.top + r.height / 2 - vh / 2;
        const y = -offset * speed;
        layer.style.transform = `translate3d(0,${y.toFixed(2)}px,0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return { sectionRef, layerRef };
}
