import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* =========================
          MAIN FOOTER
      ========================= */}
      <div className="footer__main">
        {/* BRAND */}
        <div className="footer__brand">
          <div className="footer__logo">
            NEXORA<span>.</span>
          </div>

          <p>
            Building digital experiences
            <br />
            that matter.
          </p>

          <div className="footer__socials">
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn size={15} />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram size={15} />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF size={15} />
            </a>
          </div>
        </div>

        {/* EXPLORE */}
        <div className="footer__column">
          <h3>EXPLORE</h3>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Our Work</a>
          <a href="#process">Process</a>
        </div>

        {/* SERVICES */}
        <div className="footer__column footer__services">
          <h3>SERVICES</h3>

          <a href="#services">Website Development</a>
          <a href="#services">Web Applications</a>
          <a href="#services">E-Commerce</a>
          <a href="#services">UI / UX Design</a>
          <a href="#services">SEO & SMO</a>
          <a href="#services">Digital Marketing</a>
        </div>

        {/* CONTACT */}
        <div className="footer__contact">
          <h3>CONTACT</h3>

          <a href="mailto:hello@nexora.com">
            <Mail size={17} />
            <span>hello@nexora.com</span>
          </a>

          <a href="tel:+910000000000">
            <Phone size={17} />
            <span>+91 00000 00000</span>
          </a>

          <div className="footer__contact-item">
            <MapPin size={17} />
            <span>India</span>
          </div>
        </div>
      </div>

      {/* =========================
          BOTTOM BAR
      ========================= */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Nexora All rights reserved.</p>

        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>

        <button
          className="footer__top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
