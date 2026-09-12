"use client";

import { useEffect, useRef, useState } from "react";

type Panel = { src: string; caption?: string };

// More vertical travel gives each screen longer on screen at the same scroll speed.
const PINNED_SCROLL_MULTIPLIER = 1.6;

/**
 * Pinned horizontal-scroll strip. The section is made tall; a `position: sticky`
 * child stays glued to the top of the viewport (compositor-driven — no jitter)
 * while JS slides the inner track left in step with scroll progress. When the
 * track finishes, the sticky releases and vertical scrolling resumes.
 */
export default function HorizontalScroll({
  panels,
  label = "Every page",
}: {
  panels: Panel[];
  label?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<"pinned" | "static">("pinned");
  const [sectionH, setSectionH] = useState<number | null>(null);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 820px)");
    const decide = () => setMode(small.matches ? "static" : "pinned");
    decide();
    small.addEventListener("change", decide);
    return () => small.removeEventListener("change", decide);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!section || !track || !viewport) return;

    let raf = 0;
    let distance = 0;

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setSectionH(mode === "pinned" ? window.innerHeight + distance * PINNED_SCROLL_MULTIPLIER : null);
    };
    const render = () => {
      raf = 0;
      const offset = mode === "pinned" ? -section.getBoundingClientRect().top : viewport.scrollLeft;
      const travel = mode === "pinned" ? distance * PINNED_SCROLL_MULTIPLIER : distance;
      const progress = travel > 0 ? Math.max(0, Math.min(1, offset / travel)) : 0;
      track.style.transform = mode === "pinned" ? `translate3d(${(-progress * distance).toFixed(2)}px,0,0)` : "";
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      if (countRef.current) countRef.current.textContent = String(Math.round(progress * (panels.length - 1)) + 1).padStart(2, "0");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      render();
    };

    viewport.scrollLeft = 0;
    measure();
    render();
    const settle = setTimeout(onResize, 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const imgs = Array.from(track.querySelectorAll("img"));
    imgs.forEach((img) => img.addEventListener("load", onResize));
    const observer = new ResizeObserver(onResize);
    observer.observe(viewport);
    imgs.forEach((img) => observer.observe(img));

    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      imgs.forEach((img) => img.removeEventListener("load", onResize));
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [mode, panels.length]);

  return (
    <section
      ref={sectionRef}
      className={`hscroll hscroll--${mode}`}
      style={mode === "pinned" && sectionH ? { height: `${sectionH}px` } : undefined}
      aria-label={label}
    >
      <div className="hscroll-pin">
        <div className="kl-wrap hscroll-head">
          <div>
            <span className="kicker">{label}</span>
            <h2 className="hscroll-title">A closer look.</h2>
          </div>
          <span className="mono hscroll-count">
            {String(panels.length).padStart(2, "0")} screens
          </span>
        </div>
        <div ref={viewportRef} className="hscroll-viewport" tabIndex={mode === "static" ? 0 : undefined} role="region" aria-label="Project screens">
        <div ref={trackRef} className="hscroll-track">
          {panels.map((panel, i) => (
            <figure className="hscroll-panel" key={panel.src}>
              <div className="hscroll-browser">
                <span className="hscroll-bar" aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={panel.src} alt={panel.caption ?? `Screen ${i + 1}`} decoding="async" />
              </div>
              <figcaption><span className="hscroll-panel-number">{String(i + 1).padStart(2, "0")}</span>{panel.caption ?? `Screen ${i + 1}`}</figcaption>
            </figure>
          ))}
        </div>
        </div>
        <div className="kl-wrap hscroll-foot">
          <span className="hscroll-hint">{mode === "pinned" ? "Scroll to explore ↓" : "Swipe to explore →"}</span>
          <div className="hscroll-progress" aria-hidden="true"><span ref={progressRef} /></div>
          <span className="mono hscroll-current"><span ref={countRef}>01</span> / {String(panels.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
