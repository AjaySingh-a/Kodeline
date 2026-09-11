import Link from "next/link";
import { Wordmark } from "./Logo";

export default function Footer() {
  return (
    <footer className="kl-footer">
      <div className="kl-wrap footer-top">
        <div>
          <div style={{ marginBottom: 18 }}>
            <Wordmark className="footer-logo" />
          </div>
          <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, maxWidth: "34ch" }}>
            Design and development studio, est. 2025. Delhi — working worldwide.
          </p>
          <p style={{ color: "var(--text)", fontSize: 14, marginTop: 18, letterSpacing: "-0.01em" }}>
            Design. Develop. Deliver.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="mono" style={{ marginBottom: 6 }}>Pages</div>
          <Link href="/work" className="footer-link">Work</Link>
          <Link href="/services" className="footer-link">Services</Link>
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="mono" style={{ marginBottom: 6 }}>Contact</div>
          <a href="https://wa.me/919971381635" target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp</a>
          <a href="mailto:kodelineofficial@gmail.com" className="footer-link">kodelineofficial@gmail.com</a>
        </div>
      </div>
      <div className="kl-wrap footer-bottom">
        <span>© 2026 Kodeline</span>
        <span>Design &amp; Development Studio</span>
      </div>
    </footer>
  );
}
