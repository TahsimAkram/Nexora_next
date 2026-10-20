import "./HeroLaptopVisual.css";

const services = [
  {
    className: "design",
    icon: "✳",
    title: "UI / UX Design",
    detail: "Interfaces that feel intuitive",
  },
  {
    className: "development",
    icon: "</>",
    title: "Development",
    detail: "Websites · Apps · Platforms",
  },
  {
    className: "growth",
    icon: "↗",
    title: "Digital Growth",
    detail: "SEO · Strategy · Analytics",
  },
];

export default function HeroLaptopVisual() {
  return (
    <div className="hero-laptop-art">
      <div className="hero-laptop-art__glow" />

      {/* Background orbit system */}
      <div className="hero-orbit hero-orbit--one" />
      <div className="hero-orbit hero-orbit--two" />
      <div className="hero-orbit hero-orbit--three" />

      <span className="hero-orbit-dot hero-orbit-dot--one" />
      <span className="hero-orbit-dot hero-orbit-dot--two" />
      <span className="hero-orbit-dot hero-orbit-dot--three" />

      {/* Floating service cards */}
      {services.map((service) => (
        <div
          className={`hero-service-card hero-service-card--${service.className}`}
          key={service.className}
        >
          <span className="hero-service-card__icon">{service.icon}</span>
          <span className="hero-service-card__copy">
            <strong>{service.title}</strong>
            <small>{service.detail}</small>
          </span>
          <span className="hero-service-card__arrow">↗</span>
        </div>
      ))}

      {/* Laptop */}
      <div className="hero-laptop">
        <div className="hero-laptop__screen-shell">
          <div className="hero-laptop__camera" />

          <div className="hero-laptop__screen">
            <header className="laptop-ui__nav">
              <span className="laptop-ui__brand">
                NEXORA<span>.</span>
              </span>

              <div className="laptop-ui__links">
                <span>Work</span>
                <span>Services</span>
                <span>About</span>
              </div>

              <span className="laptop-ui__contact">
                Let’s talk <b>↗</b>
              </span>
            </header>

            <main className="laptop-ui__main">
              <div className="laptop-ui__text">
                <span className="laptop-ui__eyebrow">
                  <i /> DIGITAL STUDIO
                </span>

                <h2>
                  Ideas into
                  <br />
                  <em>impact.</em>
                </h2>

                <p>
                  We build digital experiences
                  <br />
                  for ambitious businesses.
                </p>

                <span className="laptop-ui__button">
                  Explore our work <b>↗</b>
                </span>
              </div>

              <div className="laptop-ui__visual">
                <div className="laptop-ui__visual-ring laptop-ui__visual-ring--outer" />
                <div className="laptop-ui__visual-ring laptop-ui__visual-ring--inner" />
                <div className="laptop-ui__visual-core">
                  <span>N</span>
                </div>
                <i className="laptop-ui__visual-spark laptop-ui__visual-spark--one" />
                <i className="laptop-ui__visual-spark laptop-ui__visual-spark--two" />
              </div>
            </main>

            <footer className="laptop-ui__footer">
              <span>STRATEGY</span>
              <i />
              <span>DESIGN</span>
              <i />
              <span>TECHNOLOGY</span>
              <i />
              <span>GROWTH</span>
            </footer>
          </div>
        </div>

        <div className="hero-laptop__hinge" />

        <div className="hero-laptop__base">
          <div className="hero-laptop__keyboard">
            {Array.from({ length: 5 }, (_, row) => (
              <div className="hero-laptop__key-row" key={row}>
                {Array.from({ length: row === 4 ? 8 : 13 }, (_, key) => (
                  <span key={key} />
                ))}
              </div>
            ))}
          </div>
          <div className="hero-laptop__trackpad" />
          <div className="hero-laptop__front-edge" />
        </div>
      </div>

      {/* Floating code and analytics panels */}
      <div className="hero-float-panel hero-float-panel--code">
        <div className="hero-float-panel__top">
          <span />
          <span />
          <span />
          <small>app.jsx</small>
        </div>
        <div className="hero-code-lines">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="hero-float-panel hero-float-panel--analytics">
        <div className="hero-analytics__heading">
          <span>Performance</span>
          <b>↗</b>
        </div>
        <strong>+38.6%</strong>
        <small>Engagement growth</small>
        <div className="hero-analytics__chart">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>

      <span className="hero-scene-label">DESIGNING WHAT’S NEXT</span>
    </div>
  );
}
