"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

type Service = { n: string; t: string; d: string };

export default function ServicesReveal({ services }: { services: Service[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || !services.length) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 1024px)", () => {
      section.dataset.animated = "true";
      const cards = gsap.utils.toArray<HTMLAnchorElement>(".svc-card", section);

      // The reference's continuous curve slows around the middle, then
      // accelerates away. There is no separate entrance, hold or exit tween.
      gsap.fromTo(cards, {
        yPercent: 50,
        y: () => window.innerHeight * 0.5,
      }, {
        yPercent: -50,
        y: () => -window.innerHeight * 0.5,
        duration: 1,
        stagger: 0.12,
        ease: CustomEase.create("servicesPassThrough", "M0,0 C0,0 0.098,0.613 0.5,0.5 0.899,0.386 1,1 1,1"),
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          pinSpacing: false,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => { delete section.dataset.animated; };
    }, section);

    return () => media.revert();
  }, [services]);

  return (
    <section ref={sectionRef} className="svc-reveal" aria-label="What we do">
      <div ref={pinRef} className="svc-reveal-pin">
        <div className="kl-wrap svc-reveal-inner">
          <div className="teaser-head svc-reveal-head">
            <h2>What we do</h2>
            <Link href="/services" className="link-arrow">
              All services <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="svc-grid">
            {services.map((service) => (
              <Link key={service.n} href="/services" className="svc-card">
                <div className="svc-card-top">
                  <span className="mono svc-card-num">{service.n}</span>
                  <span className="svc-card-arrow" aria-hidden>↗</span>
                </div>
                <div>
                  <h3 className="svc-card-title">{service.t}</h3>
                  <p className="svc-card-desc">{service.d}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}