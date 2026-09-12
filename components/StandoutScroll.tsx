"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHRASE = "So, are you ready to Stand out?";
const random = (seed: number) => {
  const value = Math.sin(seed * 127.1) * 43758.5453;
  return value - Math.floor(value);
};

export default function StandoutScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const line = lineRef.current;
    if (!section || !pin || !line) return;

    let disposed = false;
    const context = gsap.context(() => {}, section);

    // Measure the final font, not a fallback that changes the end of the pin.
    void document.fonts.ready.then(() => {
      if (disposed) return;
      context.add(() => {
        section.dataset.animated = "true";
        const distance = () => Math.max(0, line.scrollWidth - window.innerWidth);
        const sweep = gsap.to(line, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            pin,
            scrub: 0.5,
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.utils.toArray<HTMLSpanElement>(".standout-letter", line).forEach((letter, i) => {
          gsap.fromTo(letter, {
            yPercent: (random(i + 1) - 0.5) * 120,
            rotation: (random(i + 97) - 0.5) * 30,
          }, {
            yPercent: 0,
            rotation: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: letter,
              containerAnimation: sweep,
              start: "left 100%",
              end: "left 15%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        });
        ScrollTrigger.refresh();
      });
    });

    return () => {
      disposed = true;
      context.revert();
      delete section.dataset.animated;
    };
  }, []);

  return (
    <section ref={sectionRef} className="standout">
      <div ref={pinRef} className="standout-pin">
        <h2 ref={lineRef} className="standout-line" aria-label={PHRASE}>
          {PHRASE.split("").map((character, i) => (
            <span
              key={i}
              className={character === " " ? "standout-space" : "standout-letter"}
              aria-hidden="true"
            >
              {character === " " ? "\u00a0" : character}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}