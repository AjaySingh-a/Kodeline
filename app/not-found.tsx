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
        gap: 16,
        fontFamily: "monospace",
      }}
    >
      <span style={{ fontSize: 48, color: "#E8D4A0" }}>404</span>
      <p style={{ color: "#8A8680", fontSize: 14 }}>Page not found.</p>
      <Link
        href="/"
        style={{ color: "#E8D4A0", fontSize: 13, fontFamily: "monospace" }}
      >
        Back home
      </Link>
    </div>
  );
}
