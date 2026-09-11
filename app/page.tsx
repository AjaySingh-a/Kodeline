"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import PinnedShowcase from "@/components/PinnedShowcase";
import ServicesReveal from "@/components/ServicesReveal";
import StandoutScroll from "@/components/StandoutScroll";
import { MarkOutline } from "@/components/Logo";
import { useMagnetic } from "@/lib/useMagnetic";
import { heroLines, heroTagline, servicesTeaser, projects } from "@/lib/data";

export default function Home() {
  const startProject = useMagnetic<HTMLAnchorElement>();
  const startProject2 = useMagnetic<HTMLAnchorElement>();

  return (
    <div className="kl-page">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="kl-wrap hero-grid">
          <div>
            <div className="fade-up kicker" style={{ animationDelay: "0.05s" }}>
              Design &amp; Development Studio — Est. 2025
            </div>
            <h1 className="hero-h1">
              {heroLines.map((w, i) => (
                <span key={i} className="hero-word" style={{ animationDelay: `${0.12 + i * 0.09}s` }}>
                  {w}
                </span>
              ))}
            </h1>
            <p className="hero-sub fade-up" style={{ animationDelay: "0.5s" }}>
              {heroTagline}
            </p>
            <div
              className="fade-up"
              style={{ animationDelay: "0.62s", marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}
            >
              <Link href="/work" className="link-arrow">
                View our work <span aria-hidden>→</span>
              </Link>
              <Link
                ref={startProject.ref}
                onMouseMove={startProject.onMouseMove}
                onMouseLeave={startProject.onMouseLeave}
                href="/contact"
                className="pill pill-accent"
              >
                Start a project
              </Link>
            </div>
          </div>
          <div className="fade-up" style={{ animationDelay: "0.3s" }}>
            <MarkOutline className="hero-mark" strokeWidth={10} />
          </div>
        </div>
        <div className="hero-scroll-cue">Scroll</div>
      </section>

      {/* ── Statement ────────────────────────────────────────── */}
      <section style={{ padding: "clamp(90px, 14vw, 150px) 0" }}>
        <div className="kl-wrap">
          <Reveal className="statement">
            Great products come from one team that{" "}
            <span className="muted">designs, builds, and ships</span> without the gaps between.
          </Reveal>
        </div>
      </section>

      {/* ── What we do — pinned staggered cards ──────────────── */}
      <ServicesReveal services={servicesTeaser} />

      {/* ── Pinned featured showcase ─────────────────────────── */}
      <PinnedShowcase projects={projects} />

      {/* ── "So, are you ready to stand out?" ────────────────── */}
      <StandoutScroll />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(90px, 14vw, 150px) 0" }}>
        <div className="kl-wrap">
          <Reveal className="cta-banner">
            <h2
              style={{
                fontSize: "clamp(32px,5vw,64px)",
                letterSpacing: "-0.035em",
                fontWeight: 800,
                lineHeight: 1.02,
                marginBottom: 20,
              }}
            >
              Have a project in mind?
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: "44ch", margin: "0 auto 36px", opacity: 0.72 }}>
              Start with a free 20-minute discovery call. You&apos;ll have a clear, fixed price within 24 hours.
            </p>
            <Link
              ref={startProject2.ref}
              onMouseMove={startProject2.onMouseMove}
              onMouseLeave={startProject2.onMouseLeave}
              href="/contact"
              className="pill pill-accent"
              style={{ fontSize: 15, padding: "16px 34px" }}
            >
              Start a project
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
