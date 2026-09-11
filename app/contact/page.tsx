"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { useMagnetic } from "@/lib/useMagnetic";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submitBtn = useMagnetic<HTMLButtonElement>();

  const update = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "70d42692-3358-4c4d-9f94-09f79bbc6ba4",
          subject: `New enquiry from ${form.name} — Kodeline`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="kl-page">
      <section style={{ padding: "150px 0 90px" }}>
        <div className="kl-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <Reveal>
            <div className="kicker" style={{ marginBottom: 24 }}>Contact</div>
            <h1 style={{ fontSize: "clamp(40px,5.6vw,72px)", letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.02, marginBottom: 28 }}>
              Let&apos;s build something.
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 19, lineHeight: 1.6, marginBottom: 44, maxWidth: "36ch" }}>
              Tell us a little about your project. We usually respond within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <a href="https://wa.me/919971381635" target="_blank" rel="noopener noreferrer" className="contact-link-row">
                <span style={{ fontSize: 18, fontWeight: 500 }}>WhatsApp</span>
                <span style={{ color: "var(--muted)", fontSize: 16 }}>+91 99713 81635 →</span>
              </a>
              <a href="mailto:kodelineofficial@gmail.com" className="contact-link-row last">
                <span style={{ fontSize: 18, fontWeight: 500 }}>Email</span>
                <span style={{ color: "var(--muted)", fontSize: 16 }}>kodelineofficial@gmail.com →</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="contact-card">
            {status === "sent" ? (
              <div style={{ minHeight: 340, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                <div className="success-check">✓</div>
                <h3 style={{ fontSize: 26, letterSpacing: "-0.02em", fontWeight: 600, marginBottom: 10 }}>Thanks — message noted.</h3>
                <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.5 }}>
                  We&apos;ll be in touch within 24 hours. For anything urgent, reach us on WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="field">
                  <label>Name</label>
                  <input required placeholder="Your name" value={form.name} onChange={e => update("name", e.target.value)} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input required type="email" placeholder="you@company.com" value={form.email} onChange={e => update("email", e.target.value)} />
                </div>
                <div className="field">
                  <label>About your project</label>
                  <textarea required rows={4} placeholder="What are you building?" value={form.message} onChange={e => update("message", e.target.value)} />
                </div>
                {status === "error" && (
                  <div style={{ color: "#e07070", fontSize: 13 }}>Something went wrong. Email us directly at kodelineofficial@gmail.com</div>
                )}
                <button
                  ref={submitBtn.ref}
                  onMouseMove={submitBtn.onMouseMove}
                  onMouseLeave={submitBtn.onMouseLeave}
                  type="submit"
                  disabled={status === "sending"}
                  className="pill pill-accent"
                  style={{ marginTop: 6, fontSize: 16, padding: "15px 26px", justifyContent: "center" }}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
