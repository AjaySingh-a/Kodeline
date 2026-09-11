import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ParallaxSection from "@/components/ParallaxSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import { getProject, nextProject, projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.title} — Kodeline` : "Project — Kodeline" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = nextProject(slug);

  return (
    <div className="kl-page">
      <header className="detail-header">
        <div className="kl-wrap">
          <div className="detail-hero-meta">
            <Link href="/work" className="pill pill-nav detail-hero-back">← All work</Link>
            <div className="mono detail-hero-cat">{project.category}</div>
          </div>
          <div className="detail-hero-heading">
            <h1 className="detail-hero-title">{project.title}</h1>
            <span className="mono detail-project-number">Project / {project.num}</span>
          </div>
        </div>
      </header>
      <div className="kl-wrap">
        {project.slug === "isf" ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className="detail-hero-image"
            src={project.heroImg}
            alt="Inspiring Seniors Foundation website — Health & Wellness"
            width={2400}
            height={1000}
            fetchPriority="high"
          />
        ) : (
          <ParallaxSection image={project.heroImg} className="detail-hero" speed={0.08} />
        )}
      </div>

      <section className="detail-overview">
        <div className="kl-wrap detail-overview-grid">
          <Reveal>
            <div className="kicker" style={{ marginBottom: 14 }}>Scope</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30 }}>
              {project.scopeTags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            {project.builtFor && (
              <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{project.builtFor}</div>
            )}
            {project.externalHref && project.externalLabel && (
              <a href={project.externalHref} target="_blank" rel="noopener noreferrer" className="detail-site-link">
                {project.externalLabel}
              </a>
            )}
          </Reveal>
          <Reveal delay={0.05}>
            <p className="detail-intro">
              {project.intro}
            </p>
            {project.paragraphs.map((p, i) => (
              <p key={i} style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.6, marginBottom: i === project.paragraphs.length - 1 ? 0 : 20 }}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {project.app && (
        <section className="detail-app" aria-labelledby="project-app-title">
          <div className="kl-wrap">
            <div className="detail-app-card">
              <div className="detail-app-icon" aria-hidden="true">
                <svg viewBox="0 0 32 40" fill="none">
                  <rect x="5" y="2" width="22" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 6h8M13 33h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="m13 15 8 5-8 5V15Z" fill="currentColor" />
                </svg>
              </div>
              <div className="detail-app-copy">
                <span className="kicker">Mobile app / Android</span>
                <h2 id="project-app-title">{project.app.title}</h2>
                <p>{project.app.description}</p>
              </div>
              <a className="pill pill-accent detail-app-link" href={project.app.href} target="_blank" rel="noopener noreferrer">
                View on Google Play <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {project.panels && project.panels.length > 0 ? (
        <HorizontalScroll panels={project.panels} />
      ) : project.banner.fit === "cover" ? (
        <ParallaxSection image={project.banner.src} className="detail-banner" speed={0.14} />
      ) : (
        <div className="detail-banner">
          <div className="detail-banner-contain">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.banner.src} alt={`${project.title} app screen`} />
          </div>
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="detail-gallery">
          <div className="kl-wrap">
            <Reveal>
              <div className="kicker" style={{ marginBottom: 34 }}>Selected screens</div>
            </Reveal>
            <div className="case-gallery">
              {project.gallery.map((shot, i) => (
                <Reveal key={shot.src} delay={(i % 2) * 0.05} as="figure" className="case-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={shot.caption ?? `${project.title} screen`} loading="lazy" />
                  {shot.caption && <figcaption>{shot.caption}</figcaption>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="detail-next">
        <div className="kl-wrap">
          <Reveal>
            <Link href={`/work/${next.slug}`} className="next-project-card">
              <div>
                <div className="kicker" style={{ marginBottom: 10 }}>Next project</div>
                <span style={{ fontSize: "clamp(26px,3.4vw,40px)", letterSpacing: "-0.02em", fontWeight: 600 }}>{next.title}</span>
              </div>
              <span style={{ color: "var(--accent)", fontSize: 28 }}>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
