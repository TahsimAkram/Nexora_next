import { useEffect, useRef } from "react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Impact.css";

gsap.registerPlugin(ScrollTrigger);

const IMPACT_STATS = [
  {
    value: 35,

    suffix: "+",

    label: "CLIENTS",
  },

  {
    value: 150,

    suffix: "+",

    label: "PROJECTS DELIVERED",
  },

  {
    value: 98,

    suffix: "%",

    label: "CLIENT SATISFACTION",
  },
];

export default function Impact() {
  const sectionRef = useRef(null);

  const particleCanvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const heading = section.querySelector(".impact-heading");

      const statItems = gsap.utils.toArray(".impact-stat");

      const numbers = statItems.map((item) =>
        item.querySelector(".impact-stat__number"),
      );

      const labels = statItems.map((item) =>
        item.querySelector(".impact-stat__label"),
      );

      if (reducedMotion) {
        gsap.set(heading, {
          opacity: 1,

          y: 0,

          filter: "blur(0px)",
        });

        gsap.set(statItems, {
          opacity: 1,

          y: 0,

          scale: 1,
        });

        gsap.set(numbers, {
          opacity: 1,

          y: 0,

          scale: 1,
        });

        gsap.set(labels, {
          opacity: 1,

          y: 0,
        });

        statItems.forEach((item) => {
          const number = item.querySelector(".impact-stat__number");

          number.textContent = `${number.dataset.value}${number.dataset.suffix}`;
        });

        return;
      }

      gsap.set(heading, {
        opacity: 0,

        y: 80,

        filter: "blur(12px)",
      });

      gsap.set(statItems, {
        opacity: 0,

        y: 100,

        scale: 0.94,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top 85%",

          end: "top 20%",

          scrub: 1.8,
        },
      });

      timeline.to(
        heading,

        {
          opacity: 1,

          y: 0,

          filter: "blur(0px)",

          duration: 1.4,

          ease: "power3.out",
        },

        0,
      );

      timeline.to(
        statItems,

        {
          opacity: 1,

          y: 0,

          scale: 1,

          duration: 1.6,

          stagger: 0.12,

          ease: "power3.out",
        },

        0.25,
      );
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const statItems = gsap.utils.toArray(".impact-stat");

      statItems.forEach((item, index) => {
        const number = item.querySelector(".impact-stat__number");

        const label = item.querySelector(".impact-stat__label");

        if (!number || !label) return;

        const target = Number(number.dataset.value);

        const suffix = number.dataset.suffix;

        if (reducedMotion) {
          number.textContent = `${target}${suffix}`;

          gsap.set(number, {
            opacity: 1,
            y: 0,
            scale: 1,
          });

          gsap.set(label, {
            opacity: 1,
            y: 0,
          });

          return;
        }

        gsap.set(number, {
          opacity: 1,
          y: 0,
          scale: 1,
        });

        gsap.set(label, {
          opacity: 1,
          y: 0,
        });

        const counter = {
          value: 0,
        };

        gsap.to(counter, {
          value: target,
          duration: 2,
          delay: index * 0.15,
          ease: "power2.out",

          onUpdate: () => {
            number.textContent = `${Math.round(counter.value)}${suffix}`;
          },

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        });
      });
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return undefined;

    const ctx = canvas.getContext("2d");

    if (!ctx) return undefined;

    let animationFrame;
    let width = 0;
    let height = 0;
    let time = 0;

    const particles = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      particles.length = 0;

      const count = window.innerWidth <= 768 ? 75 : 180;

      for (let i = 0; i < count; i += 1) {
        particles.push({
          progress: Math.random(),
          speed: 0.00045 + Math.random() * 0.00075,
          lane: Math.floor(Math.random() * 3),
          offset: (Math.random() - 0.5) * 4,
          size: 1.2 + Math.random() * 2.2,
          alpha: 0.65 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const getCurvePoint = (progress, lane = 0, offset = 0) => {
      const t = Math.max(0, Math.min(1, progress));

      const x = t * width;

      const center = height * 0.5;

      const amplitude =
        lane === 0 ? height * 0.34 : lane === 1 ? height * 0.29 : height * 0.24;

      const laneOffset = lane === 0 ? 0 : lane === 1 ? -8 : 8;

      const breathing = Math.sin(time * 0.00045) * 7;

      const wave = Math.sin(t * Math.PI * 2 - Math.PI / 2) * amplitude;

      return {
        x,
        y: center + wave + breathing + laneOffset + offset,
      };
    };

    const drawCurve = (lane) => {
      const steps = 240;

      ctx.beginPath();

      for (let i = 0; i <= steps; i += 1) {
        const point = getCurvePoint(i / steps, lane);

        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }

      if (lane === 0) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);

        gradient.addColorStop(0, "rgba(19, 170, 164, 0.15)");

        gradient.addColorStop(0.18, "rgba(131, 185, 0, 0.65)");

        gradient.addColorStop(0.5, "rgba(180, 230, 55, 0.95)");

        gradient.addColorStop(0.82, "rgba(131, 185, 0, 0.65)");

        gradient.addColorStop(1, "rgba(19, 170, 164, 0.15)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 25;
        ctx.shadowColor = "rgba(131, 185, 0, 0.65)";
      } else if (lane === 1) {
        ctx.strokeStyle = "rgba(131, 185, 0, 0.22)";

        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(131, 185, 0, 0.3)";
      } else {
        ctx.strokeStyle = "rgba(19, 170, 164, 0.18)";

        ctx.lineWidth = 1;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(19, 170, 164, 0.3)";
      }

      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    const drawParticle = (particle) => {
      const point = getCurvePoint(
        particle.progress,
        particle.lane,
        particle.offset,
      );

      const pulse = 0.8 + Math.sin(time * 0.002 + particle.phase) * 0.2;

      const radius = particle.size * pulse;

      const trailLength = 0.018;

      const previousProgress = Math.max(0, particle.progress - trailLength);

      const previousPoint = getCurvePoint(
        previousProgress,
        particle.lane,
        particle.offset,
      );

      ctx.beginPath();

      ctx.moveTo(previousPoint.x, previousPoint.y);

      ctx.lineTo(point.x, point.y);

      ctx.strokeStyle =
        particle.lane === 0
          ? `rgba(180, 230, 55, ${particle.alpha * 0.45})`
          : particle.lane === 1
            ? `rgba(131, 185, 0, ${particle.alpha * 0.3})`
            : `rgba(60, 190, 175, ${particle.alpha * 0.25})`;

      ctx.lineWidth = particle.size * 0.8;

      ctx.shadowBlur = 10;

      ctx.shadowColor =
        particle.lane === 2
          ? "rgba(60, 190, 175, 0.7)"
          : "rgba(166, 220, 45, 0.8)";

      ctx.stroke();

      ctx.beginPath();

      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);

      if (particle.lane === 0) {
        ctx.fillStyle = `rgba(210, 245, 100, ${particle.alpha})`;

        ctx.shadowColor = "rgba(166, 220, 45, 1)";
      } else if (particle.lane === 1) {
        ctx.fillStyle = `rgba(150, 205, 20, ${particle.alpha})`;

        ctx.shadowColor = "rgba(131, 185, 0, 0.95)";
      } else {
        ctx.fillStyle = `rgba(80, 210, 190, ${particle.alpha})`;

        ctx.shadowColor = "rgba(60, 190, 175, 0.9)";
      }

      ctx.shadowBlur = 18;

      ctx.fill();

      ctx.shadowBlur = 0;
    };

    const render = (timestamp) => {
      time = timestamp;

      ctx.clearRect(0, 0, width, height);

      drawCurve(0);
      drawCurve(1);
      drawCurve(2);

      particles.forEach((particle) => {
        particle.progress += particle.speed;

        if (particle.progress > 1) {
          particle.progress = 0;

          particle.offset = (Math.random() - 0.5) * 4;
        }

        drawParticle(particle);
      });

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    createParticles();

    window.addEventListener("resize", resize);

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="impact-section"
      id="impact"
      aria-label="Nexora impact statistics"
    >
      <div className="impact-energy" aria-hidden="true">
        <canvas ref={particleCanvasRef} className="impact-energy__canvas" />

        <div className="impact-energy__glow" />
      </div>

      <div className="impact-orbit impact-orbit--outer" aria-hidden="true" />

      <div className="impact-orbit impact-orbit--inner" aria-hidden="true" />

      <div className="impact-content">
        <div className="impact-heading">
          <h2>Built with Purpose. Measured By Results.</h2>
        </div>

        <div className="impact-stats">
          {IMPACT_STATS.map((stat, index) => (
            <div className="impact-stat" key={stat.label}>
              <div
                className="impact-stat__number"
                data-value={stat.value}
                data-suffix={stat.suffix}
                aria-label={`${stat.value}${stat.suffix} ${stat.label.toLowerCase()}`}
              >
                0{stat.suffix}
              </div>

              <span className="impact-stat__line" aria-hidden="true" />

              <div className="impact-stat__label">{stat.label}</div>

              {index < IMPACT_STATS.length - 1 && (
                <span className="impact-stat__divider" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
