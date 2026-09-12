import Reveal from "@/components/Reveal";
import { Mark } from "@/components/Logo";
import { team } from "@/lib/data";

export const metadata = { title: "About — Kodeline" };

export default function AboutPage() {
  return (
    <div className="kl-page">
      <section style={{ padding: "150px 0 40px" }}>
        <div className="kl-wrap">
          <Reveal>
            <div className="kicker" style={{ marginBottom: 24 }}>About the studio</div>
            <h1 style={{ fontSize: "clamp(38px,5.4vw,74px)", letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.05, maxWidth: "20ch" }}>
              Led by two. Delivered by a team.
            </h1>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "50px 0 90px" }}>
        <div className="kl-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
          <Reveal>
            <p style={{ color: "var(--muted)", fontSize: 19, lineHeight: 1.6 }}>
              Kodeline is a design &amp; development studio, established in 2025. We cover design, web, app development, and AI integration — with Ajay and Dev leading every project from first call to launch.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p style={{ color: "var(--muted)", fontSize: 19, lineHeight: 1.6 }}>
              Based in Delhi and working worldwide, the two of us lead the work and bring in a trusted team of designers and developers as each project needs. No layers, no lost context — just direct, careful work and a fixed price you can trust.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-banner">
        <Mark className="about-mark" />
      </section>

      <section style={{ padding: "100px 0 130px" }}>
        <div className="kl-wrap">
          <Reveal style={{ marginBottom: 50 }}>
            <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", letterSpacing: "-0.02em", fontWeight: 600 }}>The people behind Kodeline</h2>
            <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.5, maxWidth: "56ch", marginTop: 14 }}>
              Ajay and Dev lead every engagement — design, build, and delivery — backed by a trusted team of specialists we bring in as each project needs.
            </p>
          </Reveal>
          <div className="team-grid-kl">
            {team.map(m => (
              <Reveal key={m.name} className="team-card">
                <div className="team-avatar">
                  {m.photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={m.photo} alt={`${m.name} — ${m.role}`} width={1200} height={1500} loading="lazy" />
                  ) : (
                    <span>{m.initial}</span>
                  )}
                </div>
                <div style={{ padding: 32 }}>
                  <h3 style={{ fontSize: 26, letterSpacing: "-0.02em", fontWeight: 600, marginBottom: 6 }}>{m.name}</h3>
                  <div style={{ color: "var(--accent)", fontSize: 15, fontWeight: 500, marginBottom: 16 }}>{m.role}</div>
                  <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.55 }}>{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
