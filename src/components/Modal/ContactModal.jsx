import { useEffect, useState } from "react";
import {
  X,
  ArrowUpRight,
  Mail,
  Phone,
  User,
  Building2,
  MessageSquare,
} from "lucide-react";

import "./ContactModal.css";

export default function ContactModal({ isOpen, onClose, onSuccess, response }) {
  const [status, setStatus] = useState("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mobile: "",
    message: "",
  });

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* =========================================================
     ESC KEY
  ========================================================= */

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("submitting");

    try {
      /*
       * Replace this URL with your actual Spring Boot endpoint.
       *
       * Example:
       * /api/contact
       */

      const result = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!result.ok) {
        throw new Error("Contact submission failed");
      }

      const data = await result.json().catch(() => null);

      setStatus("success");

      onSuccess?.(data);
    } catch (error) {
      console.error("Contact submission failed:", error);

      setStatus("error");
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleClose = () => {
    if (status === "submitting") return;

    setStatus("idle");

    setFormData({
      name: "",
      email: "",
      company: "",
      mobile: "",
      message: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal">
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div className="contact-modal__backdrop" onClick={handleClose} />

      {/* =====================================================
          MODAL
      ===================================================== */}

      <div
        className="contact-modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* ===================================================
            CLOSE
        =================================================== */}

        <button
          type="button"
          className="contact-modal__close"
          onClick={handleClose}
          aria-label="Close contact form"
        >
          <X size={21} strokeWidth={1.7} />
        </button>

        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div className="contact-modal__intro">
          <div className="contact-modal__brand">
            <span className="contact-modal__brand-main">NEXORA</span>
          </div>

          <div className="contact-modal__eyebrow">
            <span />
            START A CONVERSATION
          </div>

          <h2 id="contact-modal-title">
            Let’s build
            <br />
            something
            <br />
            <span>meaningful.</span>
          </h2>

          <p className="contact-modal__description">
            Have an idea, a challenge, or a project in mind? Tell us about it
            and let’s create something remarkable together.
          </p>

          {/* CONTACT DETAILS */}

          <div className="contact-modal__details">
            <a href="mailto:hello@nexora.com">
              <span className="contact-modal__detail-icon">
                <Mail size={17} strokeWidth={1.7} />
              </span>

              <span className="contact-modal__detail-content">
                <small>Email</small>
                <strong>hello@nexora.com</strong>
              </span>
            </a>

            <a href="tel:+910000000000">
              <span className="contact-modal__detail-icon">
                <Phone size={17} strokeWidth={1.7} />
              </span>

              <span className="contact-modal__detail-content">
                <small>Phone</small>
                <strong>+91 00000 00000</strong>
              </span>
            </a>
          </div>

          {/* VENTURE */}

          <div className="contact-modal__venture">
            <span className="contact-modal__venture-line" />

            <div>
              <strong>NEXORA</strong>
            </div>
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div className="contact-modal__form-wrapper">
          {status === "success" ? (
            /* =================================================
               SUCCESS
            ================================================= */

            <div className="contact-modal__success">
              <div className="contact-modal__success-icon">✓</div>

              <div className="contact-modal__success-eyebrow">
                MESSAGE RECEIVED
              </div>

              <h3>Thanks for reaching out.</h3>

              <p>
                Your project details have been received. Our team will get back
                to you shortly.
              </p>

              <button
                type="button"
                className="contact-modal__success-button"
                onClick={handleClose}
              >
                BACK TO WEBSITE
              </button>
            </div>
          ) : (
            /* =================================================
               FORM
            ================================================= */

            <form className="contact-modal__form" onSubmit={handleSubmit}>
              {/* NAME */}

              <div className="contact-modal__field">
                <label htmlFor="contact-name">
                  <User size={15} />
                  Your name
                  <span>*</span>
                </label>

                <div className="contact-modal__input-wrapper">
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="contact-modal__field">
                <label htmlFor="contact-email">
                  <Mail size={15} />
                  Email address
                  <span>*</span>
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                />
              </div>

              {/* COMPANY + SERVICE */}

              <div className="contact-modal__row">
                <div className="contact-modal__field">
                  <label htmlFor="contact-company">
                    <Building2 size={15} />
                    Company
                  </label>

                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                  />
                </div>

                <div className="contact-modal__field">
                  <label htmlFor="contact-service">
                    Mobile
                    <span>*</span>
                  </label>

                  <input
                    id="contact-company"
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                  />
                </div>
              </div>

              {/* MESSAGE */}

              <div className="contact-modal__field">
                <label htmlFor="contact-message">
                  <MessageSquare size={15} />
                  Tell us about your project
                  <span>*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Share your goals, timeline, or any specific requirements..."
                  required
                />
              </div>

              {/* ERROR */}

              {status === "error" && (
                <div className="contact-modal__error">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                className="contact-modal__submit"
                disabled={status === "submitting"}
              >
                <span>
                  {status === "submitting" ? "SENDING..." : "SEND INQUIRY"}
                </span>

                {status !== "submitting" && (
                  <span className="contact-modal__submit-icon">
                    <ArrowUpRight size={19} strokeWidth={1.8} />
                  </span>
                )}
              </button>

              <p className="contact-modal__note">
                We’ll get back to you within 1–2 business days.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
