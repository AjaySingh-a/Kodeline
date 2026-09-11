import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        flexDirection: "column",
        gap: 18,
        fontFamily: "var(--font-sora), system-ui, sans-serif",
      }}
    >
      <span style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>404</span>
      <p style={{ color: "var(--muted)", fontSize: 14 }}>Page not found.</p>
      <Link
        href="/"
        className="link-arrow"
      >
        Back home <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
