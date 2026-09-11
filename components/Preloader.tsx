"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Full-screen brand intro. Plays /kodeline-intro.mp4 on every load and
   refresh, then rolls up like a shop shutter to reveal the site. Muted +
   playsInline so browsers allow autoplay. Falls back gracefully if the
   video stalls or errors, and can be skipped with a click, tap, or key. */

// Keep in sync with the .kl-preloader transform transition in globals.css.
const SHUTTER_MS = 900;
// Hard ceiling: if `ended` never fires (stall, decode failure, blocked
// autoplay) release the site anyway. Clip is ~5s.
const SAFETY_MS = 8000;

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setLeaving(true);
    // Roll the pre-hydration black cover up together with this overlay.
    document.body.classList.add("kl-booted");
    window.setTimeout(() => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      onCompleteRef.current?.();
      setDone(true);
    }, SHUTTER_MS);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const safety = window.setTimeout(finish, SAFETY_MS);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") return;
      finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [finish]);

  if (done) return null;

  return (
    <div
      className={`kl-preloader${leaving ? " is-leaving" : ""}`}
      role="presentation"
      onClick={finish}
    >
      <video
        className="kl-preloader-video"
        src="/kodeline-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
      />
    </div>
  );
}
