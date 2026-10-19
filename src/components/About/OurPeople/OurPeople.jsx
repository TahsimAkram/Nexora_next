import { useEffect, useRef } from "react";
import { ArrowRight, Users, Trophy, Heart, Globe2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./OurPeople.css";
import meeting from "../../../assets/meeting.png";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Users,
    title: "Skilled Professionals",
    description: "A multidisciplinary team.",
  },
  {
    icon: Trophy,
    title: "Growth Mindset",
    description: "Constantly learning and improving.",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Your success is our focus.",
  },
  {
    icon: Globe2,
    title: "Future Ready",
    description: "Always exploring what's next.",
  },
];

export default function OurPeople() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .from(".people-copy > *", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.13,
        })
        .from(
          ".people-visual",
          {
            y: 28,
            opacity: 0,
            scale: 0.97,
            duration: 0.9,
          },
          "-=0.5",
        )
        .from(
          ".people-value",
          {
            x: 22,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.55",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="our-people" ref={sectionRef}>
      <div className="people-layout">
        <div className="people-copy">
          <div className="people-eyebrow">
            <span />
            <span>OUR PEOPLE</span>
          </div>

          <h2 className="people-heading">
            A team that
            <br />
            builds <span>possibilities.</span>
          </h2>

          <p className="people-description">
            We're a team of designers, developers, marketers and problem-solvers
            who are passionate about creating digital experiences that matter.
          </p>
        </div>

        <div className="people-visual">
          <img
            src={meeting}
            alt="Team collaborating in a modern office"
            loading="lazy"
          />
          <div className="people-image-overlay" />
          <span className="people-image-label">
            CREATIVITY. COLLABORATION. IMPACT.
          </span>
        </div>

        <div className="people-values">
          {values.map(({ icon: Icon, title, description }) => (
            <div className="people-value" key={title}>
              <div className="people-value-icon">
                <Icon size={31} strokeWidth={1.65} />
              </div>

              <div className="people-value-copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
