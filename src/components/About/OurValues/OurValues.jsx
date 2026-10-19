import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Target, UsersRound, TrendingUp } from "lucide-react";

import "./OurValues.css";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Innovation",
    description: "We explore new ideas and technologies to stay ahead.",
    icon: Lightbulb,
  },
  {
    title: "Quality",
    description: "We focus on excellence in every detail we create.",
    icon: Target,
  },
  {
    title: "Collaboration",
    description: "We work closely with our clients as true partners.",
    icon: UsersRound,
  },
  {
    title: "Impact",
    description: "We build solutions that create real business value.",
    icon: TrendingUp,
  },
];

export default function OurValues() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".values-eyebrow", {
          x: -20,
          opacity: 0,
          duration: 0.55,
        })
        .from(
          ".values-heading-line",
          {
            y: 25,
            opacity: 0,
            duration: 0.65,
            stagger: 0.1,
          },
          "-=0.25",
        )
        .from(
          ".values-description",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          ".value-card",
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.25",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="our-values">
      <div className="our-values__inner">
        <div className="values-intro">
          <div className="values-eyebrow">
            <span className="values-eyebrow__line" />
            <span>OUR VALUES</span>
          </div>

          <h2 className="values-heading">
            <span className="values-heading-line">What drives us</span>

            <span className="values-heading-line values-heading-line--green">
              every day.
            </span>
          </h2>

          <p className="values-description">
            Our values shape the way we work, the solutions we build and the
            relationships we create.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article key={value.title} className="value-card">
                <div className="value-card__icon">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                <h3>{value.title}</h3>

                <p>{value.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
