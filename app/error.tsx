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
        background: "#0A0A0A",
        color: "#F5F1E8",
        fontFamily: "monospace",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <p style={{ color: "#8A8680", fontSize: 14 }}>Something went wrong.</p>
      <button
        onClick={reset}
        style={{
          color: "#E8D4A0",
          background: "none",
          border: "1px solid #1F1F1F",
          padding: "8px 16px",
          borderRadius: 6,
          cursor: "pointer",
          fontFamily: "monospace",
          fontSize: 12,
        }}
      >
        Try again
      </button>
    </div>
  );
}
