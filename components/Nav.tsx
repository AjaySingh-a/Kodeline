"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMagnetic } from "@/lib/useMagnetic";
import { Wordmark } from "./Logo";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav({ dark, onToggleTheme }: { dark: boolean; onToggleTheme: () => void }) {
  const pathname = usePathname();
  const startBtn = useMagnetic<HTMLAnchorElement>();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/work" ? pathname.startsWith("/work") : pathname === href;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="kl-nav">
      <div className="kl-wrap kl-nav-inner">
        <Link href="/" className="kl-nav-logo-btn" aria-label="Kodeline home">
          <Wordmark className="kl-nav-logo" />
        </Link>

        <div className="kl-nav-right">
          <div className="kl-nav-links">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`kl-nav-link${isActive(l.href) ? " active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <button className="kl-theme-btn kl-nav-theme" onClick={onToggleTheme} aria-label="Toggle theme" title="Toggle theme">
            <span className="kl-theme-dot" style={dark ? { boxShadow: "0 0 0 3px transparent" } : undefined} />
          </button>
          <Link
            ref={startBtn.ref}
            onMouseMove={startBtn.onMouseMove}
            onMouseLeave={startBtn.onMouseLeave}
            href="/contact"
            className="pill pill-accent pill-sm kl-nav-cta"
          >
            Start a project
          </Link>
          <button
            className="kl-nav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`kl-burger-lines${open ? " open" : ""}`} />
          </button>
        </div>
      </div>

      <div className={`kl-nav-drawer${open ? " open" : ""}`}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={`kl-drawer-link${isActive(l.href) ? " active" : ""}`}>
            {l.label}
          </Link>
        ))}
        <div className="kl-drawer-foot">
          <Link href="/contact" className="pill pill-accent">
            Start a project
          </Link>
          <button className="kl-drawer-theme" onClick={onToggleTheme}>
            <span className="kl-theme-dot" />
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
