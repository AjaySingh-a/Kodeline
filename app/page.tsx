"use client";

import { useEffect, useRef, useState } from "react";

/* ── Scroll reveal hook ──────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Impact card (hero visual) ───────────────────────────────── */
function ImpactCard() {
  const results = [
    { label: "Website delivery", before: "2–3 months", after: "2–3 weeks", pct: "75", barW: "75%" },
    { label: "Design to development", before: "Back-and-forth revisions", after: "One seamless team", pct: "100", barW: "100%" },
    { label: "AI-powered automation", before: "15 hrs manual work/week", after: "Fully automated", pct: "90", barW: "90%" },
  ];
  return (
    <div className="impact-card">
      <div className="impact-header">
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" }}>
          What working with us looks like
        </span>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "#444", letterSpacing: "0.06em" }}>
          DELHI · 2024–25
        </span>
      </div>
      <div className="impact-body">
        {results.map((r, i) => (
          <div key={i} className="impact-row" style={{ animationDelay: `${0.8 + i * 0.2}s` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {r.label}
              </span>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "var(--accent)", letterSpacing: "0.06em" }}>
                -{r.pct}%
              </span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-geist), sans-serif", fontSize: 13, color: "#444", textDecoration: "line-through" }}>{r.before}</span>
              <span style={{ color: "#555", fontSize: 11 }}>→</span>
              <span style={{ fontFamily: "var(--font-geist), sans-serif", fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>{r.after}</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ "--bar-w": r.barW, animationDelay: `${1 + i * 0.2}s` } as React.CSSProperties} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Contact form ────────────────────────────────────────────── */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ firstName: "", lastName: "", mobile: "", email: "", message: "" });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "70d42692-3358-4c4d-9f94-09f79bbc6ba4",
          subject: `New enquiry from ${form.firstName} ${form.lastName} — Kodeline`,
          from_name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          mobile: form.mobile,
          message: form.message,
          botcheck: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ firstName: "", lastName: "", mobile: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">First name</label>
          <input className="form-input" type="text" placeholder="Rahul" required
            value={form.firstName} onChange={e => update("firstName", e.target.value)} />
        </div>
        <div className="form-field">
          <label className="form-label">Last name</label>
          <input className="form-input" type="text" placeholder="Sharma" required
            value={form.lastName} onChange={e => update("lastName", e.target.value)} />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Mobile number</label>
        <input className="form-input" type="tel" placeholder="+91 98765 43210" required
          value={form.mobile} onChange={e => update("mobile", e.target.value)} />
      </div>
      <div className="form-field">
        <label className="form-label">Email</label>
        <input className="form-input" type="email" placeholder="rahul@yourcompany.com" required
          value={form.email} onChange={e => update("email", e.target.value)} />
      </div>
      <div className="form-field">
        <label className="form-label">Tell us about your project</label>
        <textarea className="form-input form-textarea"
          placeholder="What do you want to build? A website, an app, a redesign? Any rough timeline or budget in mind?"
          required value={form.message} onChange={e => update("message", e.target.value)} />
      </div>
      {status === "success" && (
        <div className="form-success">✓ MESSAGE SENT — We&apos;ll get back to you within 24 hours.</div>
      )}
      {status === "error" && (
        <div className="form-error">Something went wrong. Email us directly at kodelineofficial@gmail.com</div>
      )}
      {status !== "success" && (
        <button className="form-btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "SENDING..." : "SEND MESSAGE →"}
        </button>
      )}
    </form>
  );
}

/* ── Theme helpers ───────────────────────────────────────────── */
const LIGHT: Record<string, string> = {
  "--bg": "#F5F2EC",
  "--text-primary": "#111110",
  "--text-muted": "#6E6A64",
  "--accent": "#8A6A15",
  "--card": "#EDEAE4",
  "--card-hover": "#E5E2DC",
  "--border": "#D4D1CA",
  "--nav-bg": "rgba(245,242,236,0.88)",
  "--dot-color": "#C5C2BB",
  "--impact-bg": "#E8E5DF",
  "--impact-border": "#CCCAC4",
  "--impact-header-bg": "#DDD9D2",
  "--impact-header-border": "#C8C5BE",
  "--impact-row-border": "#D0CDC7",
  "--bar-track-bg": "#C0BDB6",
  "--form-bg": "#E8E5DF",
  "--form-border": "#CCCAC4",
  "--form-placeholder": "#AAA7A0",
  "--card-hover-border": "#BCBAB3",
  "--row-hover": "rgba(0,0,0,0.028)",
};

const DARK: Record<string, string> = {
  "--bg": "#0A0A0A",
  "--text-primary": "#F5F1E8",
  "--text-muted": "#8A8680",
  "--accent": "#E8D4A0",
  "--card": "#141414",
  "--card-hover": "#181818",
  "--border": "#1F1F1F",
  "--nav-bg": "rgba(10,10,10,0.85)",
  "--dot-color": "#272727",
  "--impact-bg": "#0d0d0d",
  "--impact-border": "#242424",
  "--impact-header-bg": "#111111",
  "--impact-header-border": "#1e1e1e",
  "--impact-row-border": "#1a1a1a",
  "--bar-track-bg": "#1e1e1e",
  "--form-bg": "#111111",
  "--form-border": "#222222",
  "--form-placeholder": "#3a3a3a",
  "--card-hover-border": "#2c2c2c",
  "--row-hover": "rgba(255,255,255,0.018)",
};

function applyTheme(t: "dark" | "light") {
  const vars = t === "light" ? LIGHT : DARK;
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

function ThemeToggle({ theme, onToggle }: { theme: "dark" | "light"; onToggle: () => void }) {
  const isLight = theme === "light";
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <span className="toggle-icon">{isLight ? "☀" : "☾"}</span>
      <span className={`toggle-track${isLight ? " is-light" : ""}`}>
        <span className={`toggle-thumb${isLight ? " is-light" : ""}`} />
      </span>
    </button>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Home() {
  const servicesRef = useReveal();
  const workRef     = useReveal();
  const teamRef     = useReveal();
  const contactRef  = useReveal();

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <div style={{ background: "var(--bg)", color: "var(--text-primary)", fontFamily: "var(--font-geist), sans-serif" }}>

      {/* ── NAV ──────────────────────────────────────────────── */}
      <header className="nav-animate" style={{
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        background: "var(--nav-bg)",
      }}>
        <nav style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "0 clamp(24px,4vw,48px)",
          height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Kodeline" className="nav-logo" style={{ height: 30, width: "auto", maxWidth: 160, display: "block", flexShrink: 0 }} />
          <div className="nav-links" style={{ display: "flex", gap: 32 }}>
            {["Work", "Services", "Team", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontFamily: "var(--font-mono), monospace", fontSize: 13,
                color: "var(--text-muted)", textDecoration: "none",
                letterSpacing: "0.04em", transition: "color 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >{item}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <a href="mailto:kodelineofficial@gmail.com" className="nav-email" style={{
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-mono), monospace", fontSize: 13,
              color: "var(--text-primary)", textDecoration: "none",
              letterSpacing: "0.02em", transition: "color 0.2s ease",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-primary)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
              </svg>
              kodelineofficial@gmail.com
            </a>
          </div>
        </nav>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div className="dot-grid" />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, var(--bg) 100%)",
        }} />
        <div style={{
          maxWidth: 1100, margin: "0 auto", width: "100%",
          padding: "clamp(80px,10vh,120px) clamp(24px,4vw,48px)",
          position: "relative", zIndex: 1,
        }}>
          <div className="hero-grid">
            <div>
              <p className="hero-label" style={{
                fontFamily: "var(--font-mono), monospace", fontSize: 12,
                letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase",
                marginBottom: 36, display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{
                  display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                  background: "var(--accent)", boxShadow: "0 0 8px rgba(232,212,160,0.7)",
                  animation: "blink 2s ease-in-out infinite",
                }} />
                DESIGN & DEVELOPMENT STUDIO, EST. 2025
              </p>

              <h1 className="hero-headline hero-heading" style={{
                fontFamily: "var(--font-serif), serif", fontWeight: 400,
                lineHeight: 1.0, color: "var(--text-primary)", marginBottom: 28,
              }}>
                We design and build websites, apps, and digital products.
              </h1>

              <p className="hero-sub hero-subhead" style={{
                lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 480, marginBottom: 52,
              }}>
                A two-person studio covering everything — design, web development, app development, and AI integration. One team, no handoffs, no agency overhead. Based in Delhi, working worldwide.
              </p>

              <div className="hero-cue" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <a href="#contact" style={{
                  fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: "0.08em",
                  color: "var(--accent)", textDecoration: "none", textTransform: "uppercase",
                  border: "1px solid rgba(232,212,160,0.3)", borderRadius: 6,
                  padding: "10px 20px", transition: "background 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,212,160,0.07)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(232,212,160,0.3)"; }}
                >Start a project →</a>
                <a href="#work" style={{
                  fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: "0.08em",
                  color: "var(--text-muted)", textDecoration: "none", textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                >See our work</a>
              </div>
            </div>

            <div className="hero-visual">
              <ImpactCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section id="services" style={{ padding: "clamp(80px,10vh,128px) clamp(24px,4vw,48px)", borderTop: "1px solid var(--border)" }}>
        <div ref={servicesRef} className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12 }}>
            001 / SERVICES
          </p>
          <h2 className="section-title" style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.05, marginBottom: 48 }}>
            Everything you need to go live.
          </h2>

          <div className="bento-grid">

            {/* Card 1 — Web & App Dev */}
            <div className="bento-card bento-hero card-hover" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 360 }}>
              <div>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20 }}>WEB & APP DEVELOPMENT</p>
                <h3 className="card-title-large" style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: 16 }}>
                  Fast, clean, production-ready websites and apps.
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 480 }}>
                  From landing pages to full-stack web apps to cross-platform mobile apps. We build with modern tech — fast-loading, mobile-first, and built to scale as your business grows. No templates, no shortcuts.
                </p>
              </div>
            </div>

            {/* Card 2 — Design */}
            <div className="bento-card card-hover" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
              <div>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20 }}>UI/UX DESIGN</p>
                <h3 className="card-title-medium" style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.15 }}>
                  Design that looks good and actually converts.
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-muted)", marginTop: 14 }}>
                  Brand identity, UI design, and prototypes. We design and build in the same team — so what you see is exactly what gets built.
                </p>
              </div>
            </div>

            {/* Card 3 — AI Integration */}
            <div className="bento-card card-hover" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 200 }}>
              <div>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20 }}>AI INTEGRATION</p>
                <h3 style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, fontSize: "clamp(17px,2vw,22px)", color: "var(--text-primary)", lineHeight: 1.4 }}>
                  Add AI to your product without rebuilding it from scratch.
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-muted)", marginTop: 12 }}>
                  Chatbots, smart search, document automation, personalised content — bolt-on or built-in.
                </p>
              </div>
            </div>

            {/* Card 4 — How it works */}
            <div className="bento-card bento-wide card-hover" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px,3vw,40px)", minHeight: 200 }}>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 24 }}>HOW IT WORKS</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px 24px", marginBottom: 24 }}>
                {[
                  ["01", "20-min discovery call — free"],
                  ["02", "We scope it and give you a fixed price within 24 hours"],
                  ["03", "We design and build. You see progress every week"],
                  ["04", "We launch and hand everything over to you"],
                ].map(([n, t]) => (
                  <div key={n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.08em", flexShrink: 0, paddingTop: 2 }}>{n}</span>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.02em", lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                50% UPFRONT, 50% ON DELIVERY. FIXED PRICE. NO HIDDEN COSTS.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── WORK ─────────────────────────────────────────────── */}
      <section id="work" style={{ padding: "clamp(80px,10vh,128px) clamp(24px,4vw,48px)", borderTop: "1px solid var(--border)" }}>
        <div ref={workRef} className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12 }}>
            002 / WORK
          </p>
          <h2 className="section-title" style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.05, marginBottom: 64 }}>
            Selected projects.
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              {
                num: "01",
                name: "Inspiring Seniors Foundation",
                context: "NGO · DELHI · 2024",
                description: "Designed and built the full website for Inspiring Seniors Foundation — an NGO dedicated to empowering seniors to live healthy, active, and purposeful lives. The site lets seniors join as members, groups, or proposers; discover programs across health, engagement, and wellness; and access a dedicated Health Hub with fitness challenges and expert-led sessions. Clean UI, mobile-friendly, and built to scale with the foundation's growing community.",
                stack: ["WEBSITE", "NGO", "UI/UX", "FLUTTER"],
                images: ["/isf-1.png", "/isf-2.png", "/isf-3.png"],
                link: "https://inspiringseniors.org/",
              },
              {
                num: "02",
                name: "OOTER — Outdoor Ad Booking Platform",
                context: "ADTECH · INDIA · 2025",
                description: "AdTech platform that digitises the end-to-end process of booking outdoor advertising — hoardings, billboards, and more. Brings transparency to a traditionally opaque market: real-time media visibility, instant booking, live tracking, and verified media images. Built for Adbook Communication Pvt. Ltd.",
                stack: ["MOBILE APP", "ADTECH", "REACT NATIVE", "UI/UX"],
                images: ["/ooter-app.png", "/ooter-1.png", "/ooter-2.jpg"],
                link: "https://play.google.com/store/apps/details?id=com.ooter.app",
              },
            ].map(p => <ProjectRow key={p.num} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section id="team" style={{ padding: "clamp(80px,10vh,128px) clamp(24px,4vw,48px)", borderTop: "1px solid var(--border)" }}>
        <div ref={teamRef} className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12 }}>
            003 / TEAM
          </p>
          <h2 className="section-title" style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.05, marginBottom: 64 }}>
            Two builders. No middlemen.
          </h2>
          <div className="team-grid">
            {[
              {
                name: "Ajay",
                role: "DESIGN & TECH LEAD",
                bio: "CS graduate with an AI specialisation. Leads all development — web, app, and AI integration. Has shipped full-stack products and AI-powered tools used by real teams. Obsessed with writing clean code that's fast and easy to maintain.",
              },
              {
                name: "Dev",
                role: "DESIGN & CLIENT LEAD",
                bio: "CS graduate with an AI specialisation. Leads design and client relationships. Handles everything from wireframes and UI to scoping and delivery. When you work with Kodeline, you talk directly to the person building your product.",
              },
            ].map(p => (
              <div key={p.name}>
                <h3 style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, fontSize: 28, color: "var(--text-primary)", marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20 }}>{p.role}</p>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 420 }}>{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "clamp(80px,10vh,128px) clamp(24px,4vw,48px)", borderTop: "1px solid var(--border)" }}>
        <div ref={contactRef} className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12 }}>
            004 / CONTACT
          </p>
          <div className="contact-grid">
            <div>
              <h2 className="section-title" style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.05, marginBottom: 24 }}>
                Got a project? Tell us about it.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 40, maxWidth: 400 }}>
                Website, app, redesign, or something with AI — whatever it is, drop us a message and we&apos;ll take it from there.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  ["Response time", "Within 24 hours"],
                  ["Discovery call", "Free, 20 minutes"],
                  ["Fixed quote", "No surprises on billing"],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, marginTop: 8 }} />
                    <div>
                      <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>{label}</span>
                      <span style={{ fontSize: 15, color: "var(--text-primary)" }}>{val}</span>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, marginTop: 8 }} />
                  <div>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>WhatsApp</span>
                    <a href={`https://wa.me/919971381635?text=${encodeURIComponent("Hi Kodeline! 👋 I visited your website and I'm interested in your services. Could we connect?")}`} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: 15, color: "var(--text-primary)", textDecoration: "none",
                      display: "inline-flex", alignItems: "center", gap: 6, transition: "color 0.2s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#25D366")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-primary)")}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      +91 99713 81635
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP FLOAT ───────────────────────────────────── */}
      <a
        href={`https://wa.me/919971381635?text=${encodeURIComponent("Hi Kodeline! 👋 I visited your website and I'm interested in your services. Could we connect?")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "clamp(48px,6vh,80px) clamp(24px,4vw,48px) clamp(32px,4vh,48px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="footer-grid">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Kodeline" className="nav-logo" style={{ height: 18, width: "auto", maxWidth: 110, display: "block", marginBottom: 4 }} />
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "var(--text-muted)" }}>&copy; 2026</span>
            </div>
            <div>
              <a href="mailto:kodelineofficial@gmail.com" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >kodelineofficial@gmail.com</a>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, color: "var(--text-muted)" }}>Delhi &middot; Working worldwide</span>
            </div>
          </div>
          <div style={{ marginTop: "clamp(40px,6vw,64px)", overflow: "hidden" }}>
            <span className="wordmark" style={{ fontFamily: "var(--font-mono), monospace", display: "block", color: "var(--border)", lineHeight: 1, letterSpacing: "-0.03em", userSelect: "none", fontWeight: 700 }}>
              KODELINE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── ProjectRow ──────────────────────────────────────────────── */
function ProjectRow({ num, name, context, description, stack, images, link }: {
  num: string; name: string; context: string; description: string; stack: string[];
  images?: string[]; link?: string;
}) {
  return (
    <div className="project-row">
      <div><span className="project-number">{num}</span></div>
      <div className="project-middle">
        <h3 className="project-name">{name}</h3>
        <p className="project-context">{context}</p>
        <p className="project-description">{description}</p>
        <div className="project-stack">
          {stack.map(tag => <span key={tag} className="stack-tag">{tag}</span>)}
        </div>
        {images && images.length > 0 && (
          <div style={{ marginTop: 24, display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`${name} screenshot ${i + 1}`}
                style={{
                  height: 200,
                  width: "auto",
                  flexShrink: 0,
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  display: "block",
                }}
              />
            ))}
          </div>
        )}
      </div>
      <a
        href={link ?? "#work"}
        target={link ? "_blank" : undefined}
        rel={link ? "noopener noreferrer" : undefined}
        className="project-read"
      >
        {link ? "VIEW →" : "READ →"}
      </a>
    </div>
  );
}
