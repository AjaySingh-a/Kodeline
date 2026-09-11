import Reveal from "@/components/Reveal";
import StackedProjects from "@/components/StackedProjects";
import { projects } from "@/lib/data";

export const metadata = { title: "Work — Kodeline" };

export default function WorkPage() {
  return (
    <div className="kl-page">
      <section style={{ padding: "150px 0 60px" }}>
        <div className="kl-wrap">
          <Reveal>
            <div className="kicker" style={{ marginBottom: 24 }}>Selected Work — 2024 → 2025</div>
            <h1 style={{ fontSize: "clamp(44px,7vw,96px)", letterSpacing: "-0.035em", fontWeight: 600, lineHeight: 1, maxWidth: "14ch" }}>
              Three projects, shipped end to end.
            </h1>
          </Reveal>
        </div>
      </section>
      <section style={{ paddingBottom: 60 }}>
        <div className="kl-wrap">
          <StackedProjects projects={projects} />
        </div>
      </section>
    </div>
  );
}
