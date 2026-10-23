import { useEffect, useState } from "react";
import "./ServicesNavigation.css";

export default function ServicesNavigation({ services }) {
  const [activeService, setActiveService] = useState(services[0]?.id ?? "");

  useEffect(() => {
    const sections = services
      .map((service) => document.getElementById(service.id))
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visibleEntries[0]) {
          setActiveService(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-22% 0px -58% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [services]);

  const handleSelect = (event, id) => {
    event.preventDefault();
    setActiveService(id);

    const target = document.getElementById(id);
    if (!target) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    if (window.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav className="services-index" aria-label="Services index">
      <div className="services-index__inner">
        {services.map((service) => (
          <a
            key={service.id}
            className={`services-index__item ${
              activeService === service.id ? "is-active" : ""
            }`}
            href={`#${service.id}`}
            aria-current={activeService === service.id ? "location" : undefined}
            onClick={(event) => handleSelect(event, service.id)}
          >
            <span className="services-index__number">{service.number}</span>
            <span className="services-index__label">{service.category}</span>
            <span className="services-index__active-line" aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  );
}
