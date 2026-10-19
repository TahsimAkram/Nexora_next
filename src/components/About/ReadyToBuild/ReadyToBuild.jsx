import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import earth from "../../../assets/earth.png";
import "./ReadyToBuild.css";

gsap.registerPlugin(ScrollTrigger);

export default function ReadyToBuild({ onOpenContact }) {
  const sectionRef = useRef(null);
  const particleCanvasRef = useRef(null);

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
            start: "top 82%",
            once: true,
          },
          defaults: {
            ease: "power3.out",
          },
        })
        .from(".ready-eyebrow", {
          x: -20,
          opacity: 0,
          duration: 0.5,
        })
        .from(
          ".ready-title",
          {
            y: 30,
            opacity: 0,
            duration: 0.75,
          },
          "-=0.2",
        )
        .from(
          ".ready-description",
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
          },
          "-=0.35",
        )
        .from(
          ".ready-button",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2",
        )
        .from(
          ".ready-earth",
          {
            opacity: 0,
            scale: 0.96,
            duration: 1.2,
          },
          "-=0.8",
        );

      gsap.to(".ready-horizon-glow", {
        opacity: 0.72,
        scale: 1.12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ready-earth", {
        y: -8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let frameId;
    let particles = [];

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        100,
        Math.max(35, Math.floor((width * height) / 8500)),
      );

      particles = Array.from({ length: count }, () => ({
        x: width * (0.38 + Math.random() * 0.62),
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.4 + 0.5,
        alpha: Math.random() * 0.55 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < width * 0.35 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 255, 53, ${p.alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 255, 53, ${p.alpha * 0.12})`;
        ctx.fill();
      });

      // Connect only nearby particles to create an organic network.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 105) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(90, 255, 55, ${
              (1 - distance / 105) * 0.18
            })`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      if (!reducedMotion) {
        frameId = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(section);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ready-section"
      aria-labelledby="ready-title"
    >
      <canvas
        ref={particleCanvasRef}
        className="ready-network"
        aria-hidden="true"
      />
      <div className="ready-background" aria-hidden="true">
        <div className="ready-horizon-glow" />
        <div className="ready-earth">
          <img src={earth} alt="" />
        </div>
        <div className="ready-vignette" />
      </div>

      <div className="ready-container">
        <div className="ready-copy">
          <div className="ready-eyebrow">
            <span className="ready-eyebrow-line" />
            <span>LET'S CREATE TOGETHER</span>
          </div>

          <h2 className="ready-title" id="ready-title">
            Ready to build
            <br />
            <span>what's next?</span>
          </h2>

          <p className="ready-description">
            Let's turn your ideas into powerful digital experiences.
            <br className="ready-desktop-break" />
            We're here to help you grow, innovate and make an impact.
          </p>

          <button
            type="button"
            className="ready-button"
            onClick={onOpenContact}
          >
            <span>Connect With Us</span>
            <ArrowRight size={17} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
