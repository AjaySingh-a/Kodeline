"use client";

import { useParallax } from "@/lib/useParallax";
import type { CSSProperties, ReactNode } from "react";

export default function ParallaxSection({
  image,
  speed = 0.16,
  className = "",
  style,
  children,
}: {
  image: string;
  speed?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const { sectionRef, layerRef } = useParallax<HTMLDivElement, HTMLDivElement>(speed);
  return (
    <div ref={sectionRef} className={className} style={style}>
      <div
        ref={layerRef}
        className="hero-bg-layer"
        style={{ backgroundImage: `url(${image})` }}
      />
      {children}
    </div>
  );
}
