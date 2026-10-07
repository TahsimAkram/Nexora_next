import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Box, Users, Star, ChartNoAxesCombined } from "lucide-react";

import "./OurStory.css";

// Use your existing mountain asset.
import mountainImage from "../../../assets/mountain.png";

const milestones = [
  {
    year: "2020",
    title: "A Vision",
    text: "The beginning of a bigger possibility.",
    active: true,
  },
  {
    year: "2022",
    title: "A Growing Team",
    text: "Turning ideas into real projects.",
  },
  {
    year: "2024",
    title: "Expanding Horizons",
    text: "Working with brands across industries.",
  },
  {
    year: "Today",
    title: "A Digital Studio",
    text: "Continuing to innovate and create impact.",
  },
];

const metrics = [
  {
    value: "50+",
    label: "PROJECTS DELIVERED",
    text: "Across industries and geographies.",
    icon: Box,
  },
  {
    value: "30+",
    label: "HAPPY CLIENTS",
    text: "Businesses that trust us.",
    icon: Users,
  },
  {
    value: "5+",
    label: "YEARS OF EXPERIENCE",
    text: "A consistent track record of growth.",
    icon: Star,
  },
  {
    value: "98%",
    label: "CLIENT SATISFACTION",
    text: "Long-term partnerships.",
    icon: ChartNoAxesCombined,
  },
];

export default function OurStory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".story-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.55,
      })
        .from(
          ".story-title-line",
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.25",
        )
        .from(
          ".story-copy",
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.4",
        )
        .from(
          ".story-milestone",
          {
            x: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.4",
        )
        .from(
          ".story-mountain",
          {
            scale: 1.06,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.9",
        )
        .from(
          ".story-stat",
          {
            y: 30,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.6",
        );

      // Very subtle mountain atmosphere movement.
      gsap.to(".story-mountain-image", {
        scale: 1.025,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Gentle glow breathing.
      gsap.to(".story-mountain-glow", {
        opacity: 0.9,
        scale: 1.04,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="our-story">
      <div className="story-atmosphere" />

      {/* ======================================================
          STORY CONTENT
      ======================================================= */}

      <div className="story-main">
        <div className="story-copy-column">
          <div className="story-eyebrow">
            <span />
            <span>OUR STORY</span>
          </div>

          <h2 className="story-title">
            <span className="story-title-line">From a vision</span>

            <span className="story-title-line">
              to a <em>digital studio.</em>
            </span>
          </h2>

          <div className="story-copy">
            <p>
              Nexora was founded with a simple belief — that great design and
              powerful technology can help businesses unlock new opportunities.
            </p>

            <p>
              What started as a small team with big ideas has grown into a
              full-service digital studio trusted by brands across industries.
            </p>
          </div>
        </div>

        {/* ====================================================
            MOUNTAIN VISUAL
        ===================================================== */}

        <div className="story-visual">
          <div className="story-mountain-glow" />

          <div className="story-mountain">
            <img
              className="story-mountain-image"
              src={mountainImage}
              alt="Nexora journey"
              draggable="false"
            />

            <div className="story-road-glow" />
          </div>
        </div>

        {/* ====================================================
            TIMELINE
        ===================================================== */}

        <div className="story-timeline">
          <div className="timeline-line" />

          {milestones.map((milestone) => (
            <div
              key={milestone.year}
              className={`story-milestone ${
                milestone.active ? "is-active" : ""
              }`}
            >
              <div className="milestone-marker" />

              <div className="milestone-content">
                <span className="milestone-year">{milestone.year}</span>

                <strong>{milestone.title}</strong>

                <p>{milestone.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================
          STATS
      ======================================================= */}

      <div className="story-stats">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div className="story-stat" key={metric.label}>
              <div className="story-stat-icon">
                <Icon size={22} strokeWidth={1.6} />
              </div>

              <div className="story-stat-value">{metric.value}</div>

              <div className="story-stat-label">{metric.label}</div>

              <p>{metric.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
