"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Project } from "@/lib/data";

export default function StackedProjects({ projects }: { projects: Project[] }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      cards.forEach((card, i) => {
        const inner = card.firstElementChild as HTMLElement | null;
        if (i === cards.length - 1) {
          if (inner) {
            inner.style.transform = "scale(1)";
            inner.style.opacity = "1";
          }
          return;
        }
        const next = cards[i + 1];
        const nr = next.getBoundingClientRect();
        const start = vh * 0.9;
        let prog = (start - nr.top) / (vh * 0.75);
        prog = Math.max(0, Math.min(1, prog));
        if (inner) {
          inner.style.transform = `scale(${(1 - prog * 0.06).toFixed(3)})`;
          inner.style.opacity = (1 - prog * 0.55).toFixed(3);
          inner.style.transformOrigin = "center top";
        }
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
  }, []);

  return (
    <div>
      {projects.map((p, i) => (
        <div key={p.slug} ref={el => { cardRefs.current[i] = el; }} className="stack-card">
          <Link href={`/work/${p.slug}`} className="stack-card-inner">
            <div className="stack-card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumb} alt={p.title} />
            </div>
            <div className="stack-card-body">
              <div>
                <div className="mono" style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14 }}>{p.num} · {p.category}</div>
                <h2 style={{ fontSize: "clamp(30px,4.4vw,54px)", letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.02, marginBottom: 16 }}>{p.title}</h2>
                <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.5, maxWidth: "52ch", marginBottom: 20 }}>{p.teaserDesc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }}>
                View project →
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
