import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./OurApproach.css";

// Your generated SVG asset.
// Change only the filename/path if your asset uses a different name.
import approachWave from "../../../assets/aboutwave.png";
import ApproachParticles from "./ApproachParticles";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We understand your goals, challenges and opportunities.",
  },
  {
    number: "02",
    title: "Strategize",
    description: "We create a tailored plan for your business needs.",
  },
  {
    number: "03",
    title: "Design",
    description: "We craft intuitive and engaging experiences.",
  },
  {
    number: "04",
    title: "Develop",
    description: "We build scalable and high-performance solutions.",
  },
  {
    number: "05",
    title: "Grow",
    description: "We support, optimize and help you scale further.",
  },
];

export default function OurApproach() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const progressTrack = section.querySelector(".approach-progress-track");

      const progressPulse = section.querySelector(".approach-progress-pulse");

      const stepNumbers = gsap.utils.toArray(".approach-step-number", section);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".approach-eyebrow", {
          x: -25,
          opacity: 0,
          duration: 0.55,
        })
        .from(
          ".approach-title-line",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.25",
        )
        .from(
          ".approach-description",
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
          },
          "-=0.35",
        )
        .from(
          ".approach-button",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          ".approach-step",
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.35",
        )
        .from(
          ".approach-wave",
          {
            yPercent: 12,
            opacity: 0,
            duration: 1,
          },
          "-=0.6",
        );

      // Animate the single progress pulse with GSAP.

      if (progressTrack && progressPulse) {
        const pulseDuration = 4;
        const pulseWidth = () => progressPulse.offsetWidth;

        gsap.set(progressTrack, {
          autoAlpha: 0,
        });

        gsap.set(progressPulse, {
          x: 0,
          opacity: 1,
        });

        const startProgressAnimation = () => {
          const trackRect = progressTrack.getBoundingClientRect();

          const circles = stepNumbers.map((circle) => {
            const circleRect = circle.getBoundingClientRect();

            return {
              element: circle,
              position: circleRect.left + circleRect.width / 2 - trackRect.left,
            };
          });

          gsap.set(stepNumbers, {
            boxShadow: "0 0 0 rgba(127, 225, 47, 0)",
          });

          const pulseTween = gsap.to(progressPulse, {
            x: () => Math.max(0, progressTrack.clientWidth - pulseWidth()),
            duration: pulseDuration,
            ease: "none",
            repeat: -1,
            repeatDelay: 0.15,
            onRepeat: () => {
              gsap.set(progressPulse, { x: 0 });
            },
          });

          circles.forEach(({ element, position }) => {
            const glow = () => {
              gsap.fromTo(
                element,
                {
                  boxShadow: "0 0 4px rgba(127, 225, 47, 0.25)",
                  borderColor: "rgba(127, 225, 47, 0.5)",
                },
                {
                  boxShadow:
                    "0 0 18px rgba(127, 225, 47, 1), 0 0 36px rgba(127, 225, 47, 0.8)",
                  borderColor: "#7fe12f",
                  duration: 0.25,
                  yoyo: true,
                  repeat: 1,
                },
              );
            };
          });

          return pulseTween;
        };

        timeline
          .to(
            progressTrack,
            {
              autoAlpha: 1,
              duration: 0.4,
            },
            ">-0.1",
          )
          .call(startProgressAnimation);
      }

      // Brief glow as the pulse passes each step number.

      // Subtle wave movement.
      gsap.to(".approach-wave img", {
        xPercent: -1.5,
        scale: 1.015,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Background parallax while scrolling.
      gsap.to(".approach-wave", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="our-approach"
      style={{
        backgroundImage: `url(${approachWave})`,
      }}
    >
      <ApproachParticles />

      <div className="approach-glow approach-glow--left" />
      <div className="approach-glow approach-glow--center" />
      <div className="approach-glow approach-glow--bottom" />

      <div className="approach-content">
        <div className="approach-intro">
          <div className="approach-eyebrow">
            <span className="approach-eyebrow-line" />
            <span>OUR APPROACH</span>
          </div>

          <h2 className="approach-title">
            <span className="approach-title-line">A clear process</span>

            <span className="approach-title-line">
              for <em>meaningful</em>
            </span>

            <span className="approach-title-line">
              <em>results.</em>
            </span>
          </h2>

          <p className="approach-description">
            We follow a proven process that combines strategy, creativity and
            technology to deliver solutions that work in the real world.
          </p>
        </div>

        <div className="approach-steps">
          <div className="approach-progress-track" aria-hidden="true">
            <div className="approach-progress-pulse" />
          </div>

          {steps.map((step) => (
            <div key={step.number} className="approach-step">
              <div className="approach-step-top">
                <div className="approach-step-number">{step.number}</div>
              </div>

              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="approach-bottom-fade" />
    </section>
  );
}
