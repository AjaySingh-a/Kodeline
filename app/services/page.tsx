import Reveal from "@/components/Reveal";
import { servicesFull, process } from "@/lib/data";

export const metadata = { title: "Services — Kodeline" };

export default function ServicesPage() {
  return (
    <div className="kl-page">
      <section style={{ padding: "150px 0 40px" }}>
        <div className="kl-wrap">
          <Reveal>
            <div className="kicker" style={{ marginBottom: 24 }}>Services</div>
            <h1 style={{ fontSize: "clamp(44px,7vw,96px)", letterSpacing: "-0.035em", fontWeight: 600, lineHeight: 1, maxWidth: "15ch" }}>
              Everything from idea to launch.
            </h1>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "60px 0" }}>
        <div className="kl-wrap">
          {servicesFull.map(s => (
            <Reveal key={s.n} className="service-row">
              <div className="mono" style={{ fontSize: 14, color: "var(--muted)" }}>{s.n}</div>
              <div>
                <h2 style={{ fontSize: "clamp(26px,3vw,38px)", letterSpacing: "-0.02em", fontWeight: 600, marginBottom: 16 }}>{s.t}</h2>
                <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.55, maxWidth: "44ch" }}>{s.d}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {s.points.map(pt => (
                  <div key={pt} className="service-point">
                    <span className="service-dot" />
                    {pt}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "100px 0" }}>
        <div className="kl-wrap">
          <Reveal style={{ marginBottom: 50 }}>
            <h2 style={{ fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-0.03em", fontWeight: 600 }}>How we work</h2>
          </Reveal>
          <div className="process-grid">
            {process.map(p => (
              <Reveal key={p.n} className="process-card">
                <span className="mono" style={{ fontSize: 13, color: "var(--accent)", marginBottom: "auto" }}>{p.n}</span>
                <h3 style={{ fontSize: 20, letterSpacing: "-0.01em", fontWeight: 600, margin: "20px 0 10px" }}>{p.t}</h3>
                <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.5 }}>{p.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ marginTop: 28, padding: "28px 32px", border: "1px dashed var(--border)", borderRadius: 20, color: "var(--muted)", fontSize: 16, lineHeight: 1.5 }}>
            50% upfront, 50% on delivery. Fixed price, no hidden costs.
          </Reveal>
        </div>
      </section>
    </div>
  );
}
