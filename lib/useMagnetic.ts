"use client";

import { useRef, type MouseEvent } from "react";

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.28;
    const y = (e.clientY - r.top - r.height / 2) * 0.4;
    el.style.transform = `translate(${x}px,${y}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return { ref, onMouseMove, onMouseLeave };
}
