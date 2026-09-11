"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-sora), system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <p style={{ color: "var(--muted)", fontSize: 14 }}>Something went wrong.</p>
      <button
        onClick={reset}
        style={{
          color: "var(--accent)",
          background: "none",
          border: "1px solid var(--border)",
          padding: "8px 16px",
          borderRadius: 6,
          cursor: "pointer",
          fontFamily: "var(--font-sora), system-ui, sans-serif",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
        }}
      >
        Try again
      </button>
    </div>
  );
}
