import "./ServiceCapabilities.css";
export default function ServiceCapabilities({ capabilities }) {
  return (
    <>
      <div className="service-detail__capabilities-heading">
        <span>WHAT'S INCLUDED</span>
        <span className="service-detail__capabilities-line" />
      </div>

      <div className="service-detail__capabilities">
        {capabilities.map((item) => {
          const Icon = item.icon;

          return (
            <article className="service-capability" key={item.title}>
              <span className="service-capability__icon">
                <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
