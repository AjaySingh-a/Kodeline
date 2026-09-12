"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Project } from "@/lib/data";

export default function PinnedShowcase({ projects }: { projects: Project[] }) {
  const secRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const txtRefs = useRef<(HTMLDivElement | null)[]>([]);
  const n = projects.length;

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const sec = secRef.current;
      ticking = false;
      if (!sec) return;
      const vh = window.innerHeight;
      const r = sec.getBoundingClientRect();
      const total = r.height - vh;
      let p = total > 0 ? -r.top / total : 0;
      p = Math.max(0, Math.min(1, p));
      if (lineRef.current) lineRef.current.style.strokeDashoffset = (240 * (1 - p)).toFixed(1);
      const active = Math.max(0, Math.min(n - 1, Math.floor(p * n * 0.999)));
      imgRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = i === active ? "1" : "0";
      });
      txtRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === active ? "1" : "0";
        el.style.transform = i === active ? "none" : i < active ? "translateY(-14px)" : "translateY(14px)";
      });
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
  }, [n]);

  return (
    <section ref={secRef} className="showcase-section" style={{ height: `${n * 92 + 24}vh` }}>
      <div className="showcase-sticky">
        <div className="kl-wrap showcase-grid">
          <div style={{ position: "relative", paddingLeft: 34 }}>
            <svg width="2" height="240" viewBox="0 0 2 240" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: 6, overflow: "visible" }}>
              <path
                ref={lineRef}
                d="M1 0 L1 240"
                style={{ stroke: "var(--accent)", strokeWidth: 2, fill: "none", strokeDasharray: 240, strokeDashoffset: 240 }}
              />
            </svg>
            <div className="kicker" style={{ marginBottom: 26 }}>Featured Work</div>
            <div className="showcase-txt-slot">
              {projects.map((p, i) => (
                <div
                  key={p.slug}
                  ref={el => { txtRefs.current[i] = el; }}
                  className={`showcase-txt${i === 0 ? "" : " abs"}`}
                  style={i === 0 ? undefined : { opacity: 0, transform: "translateY(16px)" }}
                >
                  <div className="mono" style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>{p.category}</div>
                  <h3 style={{ fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.05, marginBottom: 18 }}>{p.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.5, maxWidth: "40ch" }}>{p.teaserDesc}</p>
                </div>
              ))}
            </div>
            <Link href="/work" className="pill pill-outline" style={{ marginTop: 34 }}>See all projects</Link>
          </div>
          <div className="showcase-img-frame">
            {projects.map((p, i) => (
              <div
                key={p.slug}
                ref={el => { imgRefs.current[i] = el; }}
                className="showcase-img"
                style={{ backgroundImage: `url(${p.thumb})`, opacity: i === 0 ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
