import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thankyou-page">

      {/* floating orb bottom-right */}
      <div className="orb-bottom" />

      {/* status badge */}
      <div className="success-badge">Campaign Delivered</div>

      {/* emoji */}
      <span className="thankyou-emoji">🎉</span>

      {/* title */}
      <h1>
        Thank You for Using{" "}
        <span className="gradient-text">Our Campaign System</span>
      </h1>

      {/* subtitle */}
      <p>Your email campaign was successfully sent and analysed.</p>

      {/* features box */}
      <div className="features">

        <h3>What You Can Explore Next</h3>

        <ul>
          <li>
            <span className="li-icon">📊</span>
            Advanced Campaign Analytics
          </li>
          <li>
            <span className="li-icon">🤖</span>
            AI Generated Email Campaigns
          </li>
          <li>
            <span className="li-icon">📧</span>
            Smart Email Personalisation
          </li>
          <li>
            <span className="li-icon">🎯</span>
            Audience Segmentation
          </li>
          <li>
            <span className="li-icon">📈</span>
            Performance Tracking Dashboard
          </li>
        </ul>

      </div>

      {/* redirect notice */}
      <p className="redirect-text">Redirecting you to homepage...</p>

    </div>
  );
};

export default ThankYou;
