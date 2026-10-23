import { ArrowUpRight } from "lucide-react";
import "./ServicesClosing.css";

export default function ServicesClosing() {
  return (
    <section className="services-closing">
      <div className="services-closing__line" aria-hidden="true" />
      <p className="services-closing__eyebrow">DESIGN AND DOMAIN</p>
      <h2>
        Digital experiences
        <br />
        <span>built for what's next.</span>
      </h2>
      <p className="services-closing__copy">
        The right digital solution starts with understanding your business,
        your audience, and what you want to achieve.
      </p>
      <a href="/contact" className="services-closing__link">
        <span>CONTACT</span>
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </section>
  );
}
