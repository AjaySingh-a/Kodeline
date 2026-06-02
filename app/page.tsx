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
    { label: "Training decks", before: "6 hours", after: "8 minutes", pct: "97", barW: "97%" },
    { label: "Team capacity", before: "Manual prep", after: "40+ users, same headcount", pct: "80", barW: "80%" },
    { label: "Ops work saved", before: "15 hrs / week", after: "Fully automated", pct: "100", barW: "100%" },
  ];
  return (
    <div className="impact-card">
      <div className="impact-header">
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" }}>
          Real results we delivered
        </span>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "#444", letterSpacing: "0.06em" }}>
          DELHI · 2024
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
          subject: `New enquiry from ${form.firstName} ${form.lastName} — Codeline`,
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
          placeholder="What do you want to build? What problem are you trying to solve? Any rough timeline?"
          required value={form.message} onChange={e => update("message", e.target.value)} />
      </div>

      {status === "success" && (
        <div className="form-success">
          ✓ MESSAGE SENT — We&apos;ll get back to you within 24 hours.
        </div>
      )}
      {status === "error" && (
        <div className="form-error">
          Something went wrong. Email us directly at kodelineofficial@gmail.com
        </div>
      )}

      {status !== "success" && (
        <button className="form-btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "SENDING..." : "SEND MESSAGE →"}
        </button>
      )}
    </form>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Home() {
  const servicesRef = useReveal();
  const workRef     = useReveal();
  const teamRef     = useReveal();
  const contactRef  = useReveal();

  return (
    <div style={{ background: "var(--bg)", color: "var(--text-primary)", fontFamily: "var(--font-geist), sans-serif" }}>

      {/* ── NAV ──────────────────────────────────────────────── */}
      <header className="nav-animate" style={{
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(10,10,10,0.8)",
      }}>
        <nav style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "0 clamp(24px,4vw,48px)",
          height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 14, letterSpacing: "0.04em", fontWeight: 500 }}>
            Codeline
          </span>
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
          <a href="mailto:kodelineofficial@gmail.com" style={{
            fontFamily: "var(--font-mono), monospace", fontSize: 13,
            color: "var(--text-muted)", textDecoration: "none",
            letterSpacing: "0.02em", transition: "color 0.2s ease",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >kodelineofficial@gmail.com</a>
        </nav>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ minHeight: "calc(100vh - 56px)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div className="dot-grid" />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, #0A0A0A 100%)",
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
                AI STUDIO, EST. 2026
              </p>

              <h1 className="hero-headline hero-heading" style={{
                fontFamily: "var(--font-serif), serif", fontWeight: 400,
                lineHeight: 1.0, color: "var(--text-primary)", marginBottom: 28,
              }}>
                We turn your ideas into working AI products. Fast.
              </h1>

              <p className="hero-sub hero-subhead" style={{
                lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 480, marginBottom: 52,
              }}>
                You don&apos;t need to understand AI to use it. We handle everything — from the idea to a live product your team can use from day one. Internal tools in 2 weeks. Full products in 3.
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

            {/* Right — impact card */}
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
            Two things, done fast.
          </h2>

          <div className="bento-grid">
            {/* Card 1 */}
            <div className="bento-card bento-hero card-hover" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 360 }}>
              <div>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20 }}>INTERNAL AI TOOLS</p>
                <h3 className="card-title-large" style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: 16 }}>
                  Save your team hours every week — without changing how they work.
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 480 }}>
                  We build AI tools that sit inside your existing workflow. Your team asks questions, generates documents, automates reports — all without touching a line of code. Works with Slack, Shopify, Notion, WhatsApp, or whatever you already use.
                </p>
              </div>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                FROM &#8377;75,000 / $2,500 &middot; DELIVERED IN 2 WEEKS
              </p>
            </div>

            {/* Card 2 */}
            <div className="bento-card card-hover" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
              <div>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20 }}>AI-POWERED PRODUCTS</p>
                <h3 className="card-title-medium" style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.15 }}>
                  From idea to a live product your customers can use in 3 weeks.
                </h3>
              </div>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                FROM &#8377;1.5L / $4,000 &middot; DELIVERED IN 3 WEEKS
              </p>
            </div>

            {/* Card 3 */}
            <div className="bento-card card-hover" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 200 }}>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 16 }}>WHO WE WORK WITH</p>
              <h3 style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, fontSize: "clamp(17px,2vw,22px)", color: "var(--text-primary)", lineHeight: 1.5 }}>
                D2C brands &middot; Edtech companies &middot; Operations teams &middot; Founders with an idea
              </h3>
            </div>

            {/* Card 4 */}
            <div className="bento-card bento-wide card-hover" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px,3vw,40px)", minHeight: 200 }}>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 24 }}>HOW IT WORKS</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px 24px", marginBottom: 24 }}>
                {[
                  ["01", "20-min discovery call — free"],
                  ["02", "We scope it and give you a fixed price within 24 hours"],
                  ["03", "We build. You see progress every week"],
                  ["04", "We ship and hand everything over to you"],
                ].map(([n, t]) => (
                  <div key={n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.08em", flexShrink: 0, paddingTop: 2 }}>{n}</span>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.02em", lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                50% UPFRONT, 50% ON DELIVERY. NO HIDDEN COSTS. EVER.
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
              { num: "01", name: "Document Automation Pipeline", context: "NON-PROFIT · DELHI · 2024", description: "The team was spending 6+ hours manually preparing training decks for every program. We built a tool that takes a simple brief and generates a fully formatted, personalised deck in under 10 minutes — automatically. Now used across 12 programs.", stack: ["PYTHON", "CLAUDE API", "PPTX"] },
              { num: "02", name: "AI Training Platform", context: "NON-PROFIT · DELHI · 2024", description: "Content prep was a bottleneck — trainers spent hours writing learning paths and assessments by hand. We built an AI platform that generates personalised content for each trainee automatically. The team now handles 40+ users without any extra headcount.", stack: ["PYTHON", "LLM", "RAG"] },
              { num: "03", name: "Internal Automation Suite", context: "NON-PROFIT · DELHI · 2024", description: "The ops team was losing 15 hours a week to repetitive tasks — filling reports, cleaning data, formatting documents. We automated all of it. Same team, same tools, just without the manual grind.", stack: ["PYTHON", "AUTOMATION"] },
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
              { name: "Ajay", role: "BUILDER · CLIENT LEAD", bio: "CS graduate with an AI specialisation. Builds end-to-end and handles every client relationship personally. When you work with Codeline, you talk directly to the person building your product — not a project manager." },
              { name: "Dev",  role: "BUILDER · TECH LEAD",   bio: "CS graduate with an AI specialisation. Leads the technical build. Has shipped AI tools and full-stack products used by real teams in production. Obsessed with making complex technology feel simple." },
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
            {/* Left */}
            <div>
              <h2 className="section-title" style={{ fontFamily: "var(--font-serif), serif", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.05, marginBottom: 24 }}>
                Got a project? Tell us about it.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 40, maxWidth: 400 }}>
                You don&apos;t need a brief or a fully formed idea. Just tell us the problem and we&apos;ll figure out the rest together.
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
              </div>
            </div>

            {/* Right — form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "clamp(48px,6vh,80px) clamp(24px,4vw,48px) clamp(32px,4vh,48px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="footer-grid">
            <div>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, display: "block", marginBottom: 4 }}>Codeline</span>
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
              CODELINE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── ProjectRow ──────────────────────────────────────────────── */
function ProjectRow({ num, name, context, description, stack }: {
  num: string; name: string; context: string; description: string; stack: string[];
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
      </div>
      <a href="#work" className="project-read">READ &rarr;</a>
    </div>
  );
}
