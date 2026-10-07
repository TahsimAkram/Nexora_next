import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./OurStory.css";

// Use your existing mountain asset.
import mountainImage from "../../../assets/mountains.png";

import { Box, Users, Star, ChartNoAxesCombined } from "lucide-react";
import ParticleBackground from "../../../components/ParticleBackground/ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2020",
    title: "A Vision",
    text: "The beginning of a bigger possibility.",
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
    active: true,
  },
];

const stats = [
  {
    value: "150+",
    label: "PROJECTS DELIVERED",
    description: "Across industries and geographies.",
    icon: Box,
  },
  {
    value: "30+",
    label: "HAPPY CLIENTS",
    description: "Businesses that trust us.",
    icon: Users,
  },
  {
    value: "5+",
    label: "YEARS OF EXPERIENCE",
    description: "A consistent track record of growth.",
    icon: Star,
  },
  {
    value: "98%",
    label: "CLIENT SATISFACTION",
    description: "Long-term partnerships.",
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
      // ========================================================
      // MASTER SCROLL TIMELINE
      // ========================================================

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },

        defaults: {
          ease: "power3.out",
        },
      });

      reveal
        .from(".story-eyebrow", {
          y: 25,
          opacity: 0,
          duration: 0.65,
        })

        .from(
          ".story-title-line",
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.85,
            stagger: 0.12,
          },
          "-=0.3",
        )

        .from(
          ".story-description p",
          {
            y: 22,
            opacity: 0,
            duration: 0.6,
            stagger: 0.14,
          },
          "-=0.35",
        )

        .from(
          ".story-milestone",
          {
            x: 35,
            opacity: 0,
            duration: 0.6,
            stagger: 0.14,
          },
          "-=0.4",
        )

        .from(
          ".story-stat",
          {
            y: 35,
            opacity: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.25",
        );

      // ========================================================
      // MOUNTAIN PARALLAX
      // ========================================================

      gsap.to(".story-mountain-bg", {
        yPercent: 8,
        scale: 1.06,

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      // ========================================================
      // MOUNTAIN ATMOSPHERIC LIGHT
      // ========================================================

      gsap.to(".story-background-vignette", {
        opacity: 0.72,

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });

      // ========================================================
      // TIMELINE PROGRESS
      // ========================================================

      gsap.fromTo(
        ".story-timeline-line",
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,

          ease: "none",

          scrollTrigger: {
            trigger: ".story-timeline",
            start: "top 68%",
            end: "bottom 55%",
            scrub: 1,
          },
        },
      );

      // ========================================================
      // MILESTONE DOT ACTIVATION
      // ========================================================

      const milestones = gsap.utils.toArray(".story-milestone");

      milestones.forEach((milestone, index) => {
        ScrollTrigger.create({
          trigger: milestone,

          start: "top 72%",

          onEnter: () => {
            gsap.to(milestone.querySelector(".story-milestone-dot"), {
              scale: 1.35,
              backgroundColor: "#86d92f",
              borderColor: "#86d92f",
              boxShadow: "0 0 16px rgba(134, 217, 47, 0.7)",
              duration: 0.35,
              ease: "power2.out",
            });
          },

          onLeaveBack: () => {
            // Keep the final "Today" milestone active.
            if (index === milestones.length - 1) {
              return;
            }

            gsap.to(milestone.querySelector(".story-milestone-dot"), {
              scale: 1,
              backgroundColor: "#071310",
              borderColor: "rgba(72, 151, 114, 0.8)",
              boxShadow: "0 0 0 3px rgba(35, 236, 178, 0.025)",
              duration: 0.3,
            });
          },
        });
      });

      // ========================================================
      // STAT NUMBER REVEAL
      // ========================================================

      gsap.from(".story-stat-value", {
        scale: 0.86,
        opacity: 0,

        duration: 0.65,

        stagger: 0.12,

        ease: "back.out(1.5)",

        scrollTrigger: {
          trigger: ".story-stats",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="our-story">
      {/* =====================================================
          FULL-BLEED MOUNTAIN BACKGROUND
      ====================================================== */}

      <div className="story-background">
        <img
          className="story-mountain-bg"
          src={mountainImage}
          alt=""
          draggable="false"
        />

        <div className="story-background-overlay" />

        <div className="story-background-vignette" />
      </div>
      <ParticleBackground variant="story" />

      {/* Same geometric language as HomeIntro */}

      {/* =====================================================
          STORY CONTENT OVER THE MOUNTAIN
      ====================================================== */}

      <div className="story-content">
        <div className="story-copy">
          <div className="story-eyebrow">
            <span className="story-eyebrow-line" />
            <span>OUR STORY</span>
          </div>

          <h2 className="story-title">
            <span className="story-title-line">From a vision</span>

            <span className="story-title-line">
              to a <em>digital studio.</em>
            </span>
          </h2>

          <div className="story-description">
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

        {/* =================================================
            TIMELINE — ALSO OVER THE IMAGE
        ================================================== */}

        <div className="story-timeline">
          <div className="story-timeline-line" />

          {milestones.map((item) => (
            <div
              key={item.year}
              className={`story-milestone ${
                item.active ? "story-milestone--active" : ""
              }`}
            >
              <span className="story-milestone-dot" />

              <div className="story-milestone-content">
                <span className="story-milestone-year">{item.year}</span>

                <strong>{item.title}</strong>

                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          BOTTOM METRICS
      ====================================================== */}

      <div className="story-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="story-stat">
              <div className="story-stat-icon">
                <Icon size={21} strokeWidth={1.7} />
              </div>

              <div className="story-stat-value">{stat.value}</div>

              <div className="story-stat-label">{stat.label}</div>

              <p>{stat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
