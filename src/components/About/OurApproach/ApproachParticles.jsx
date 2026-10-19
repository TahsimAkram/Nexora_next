import { useEffect, useRef } from "react";
import "./ApproachParticles.css";

export default function ApproachParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;

    if (!canvas || !section) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let animationFrame;
    let particles = [];
    let resizeObserver;

    const particleCount = window.innerWidth < 768 ? 32 : 65;
    const connectionDistance = 125;

    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: particleCount }, () => createParticle());

      draw();
    };

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.12 + Math.random() * 0.24;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 0.2 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.006 + Math.random() * 0.008,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const time = performance.now() * 0.001;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        const pulse = reducedMotion
          ? 1
          : 0.72 +
            Math.sin(time * particle.pulseSpeed * 100 + particle.phase) * 0.22;

        const alpha = particle.alpha * pulse;

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const lineAlpha = (1 - distance / connectionDistance) * 0.16;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(65, 220, 175, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(100, 255, 200, ${alpha})`;
        ctx.fill();

        if (particle.radius > 1.7) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);

          ctx.fillStyle = `rgba(55, 220, 165, ${alpha * 0.07})`;
          ctx.fill();
        }
      }
    };

    const animate = () => {
      draw();
      animationFrame = requestAnimationFrame(animate);
    };

    resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(section);

    resizeCanvas();

    if (!reducedMotion) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      ctx.clearRect(0, 0, width, height);
    };
  }, []);

  return (
    <div className="approach-particles" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
