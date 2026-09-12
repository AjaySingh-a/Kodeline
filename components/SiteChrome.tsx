"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Nav from "./Nav";
import Footer from "./Footer";

// Rendered client-only: it's a purely visual, ephemeral overlay with no SEO
// value, and skipping SSR for it avoids hydration-diff issues entirely
// (e.g. browser extensions injecting attributes into the DOM pre-hydration).
const Preloader = dynamic(() => import("./Preloader"), { ssr: false });

export default function SiteChrome({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kl-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("kl-theme", next ? "dark" : "light");
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_NO_PRELOADER !== "1" && <Preloader />}
      <Nav dark={dark} onToggleTheme={toggleTheme} />
      <main style={{ position: "relative", display: "block" }}>{children}</main>
      <Footer />
    </>
  );
}
