"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

export default function Reveal({
  children,
  className = "",
  style,
  delay,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  as?: "div" | "section" | "figure";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -100px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";
  return (
    <Component
      ref={ref}
      className={`reveal${shown ? " shown" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
    >
      {children}
    </Component>
  );
}
