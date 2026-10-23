import { Check, Wrench } from "lucide-react";
import "./ServiceDeliverables.css";

export default function ServiceDeliverables({ deliverables, outcome }) {
  return (
    <>
      <div className="service-deliverables">
        <div className="service-deliverables__heading">
          <span className="service-deliverables__symbol">
            <Wrench size={16} aria-hidden="true" />
          </span>
          <div>
            <p>DELIVERABLES</p>
            <span>What you can expect from this service</span>
          </div>
        </div>

        <div className="service-deliverables__items">
          {deliverables.map((deliverable) => (
            <div className="service-deliverable" key={deliverable}>
              <Check size={15} aria-hidden="true" />
              <span>{deliverable}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="service-outcome">
        <span className="service-outcome__label">THE BUSINESS VALUE</span>
        <p>{outcome}</p>
      </div>
    </>
  );
}
