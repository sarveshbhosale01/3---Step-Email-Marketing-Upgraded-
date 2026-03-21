import React from "react";
import "./ContactPage.css";
import { FaEnvelopeOpenText } from "react-icons/fa";

const ContactPage = () => {

  return (

    <div className="contact-page">

      <h2 className="contact-title">HAVE SOME QUESTIONS?</h2>

      <p className="contact-subtitle">
        📍 Mumbai &nbsp;|&nbsp; Founded in 2025
      </p>

      <div className="contact-container">

        {/* LEFT PANEL */}
        <div className="contact-icon">

          <FaEnvelopeOpenText />

          <div className="contact-icon-label">
            <h3>Get in Touch</h3>
            <p>We typically reply within 24 hours.</p>
          </div>

        </div>

        {/* RIGHT PANEL — FORM */}
        <div className="contact-form">

          <div className="contact-form-heading">
            Send us a message
            <span>Fill in the details below and we'll get back to you.</span>
          </div>

          <div className="contact-form-row">
            <input type="text"  placeholder="First Name" />
            <input type="text"  placeholder="Last Name" />
          </div>

          <input type="email" placeholder="What's your email?" />

          <textarea placeholder="Your questions..." rows="4" />

          <button>SEND MESSAGE</button>

        </div>

      </div>

    </div>

  );

};

export default ContactPage;
