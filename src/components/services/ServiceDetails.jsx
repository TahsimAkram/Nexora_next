import ServiceCapabilities from "./ServiceCapabilities";
import ServiceDeliverables from "./ServiceDeliverables";
import "./ServiceDetails.css";

export default function ServiceDetails({ service, index }) {
  const isReversed = index % 2 === 1;
  const ServiceIcon = service.icon;

  return (
    <section
      id={service.id}
      className={`service-detail service-detail--${service.color} ${
        isReversed ? "service-detail--reversed" : ""
      }`}
      data-service-section={service.id}
      aria-labelledby={`${service.id}-title`}
    >
      <div className="service-detail__topline">
        <span className="service-detail__category">{service.category}</span>
        <span className="service-detail__rule" aria-hidden="true" />
      </div>

      <div className="service-detail__intro-grid">
        <div className="service-detail__copy">
          <h2 id={`${service.id}-title`}>{service.title}</h2>
          <p className="service-detail__intro">{service.intro}</p>

          <ServiceCapabilities capabilities={service.capabilities} />
        </div>

        <figure className="service-detail__visual">
          <div className="service-detail__visual-glow" aria-hidden="true" />
          <span className="service-detail__visual-index">{service.number}</span>
          <img
            src={service.image}
            alt={service.imageAlt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          <figcaption>
            <span className="service-detail__visual-mark">
              <ServiceIcon size={16} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span>{service.imageNote}</span>
          </figcaption>
        </figure>
      </div>

      <ServiceDeliverables
        deliverables={service.deliverables}
        outcome={service.outcome}
      />
    </section>
  );
}
