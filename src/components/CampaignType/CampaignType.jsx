import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane, FaBuilding, FaUsers } from "react-icons/fa";
import { GiSpartanHelmet } from "react-icons/gi";
import "./CampaignType.css";

const CAMPAIGNS = [
  {
    id: "b2b",
    type: "B2B",
    label: "Business to Business",
    tagline: "Professional outreach that opens doors.",
    icon: <FaBuilding />,
    accentClass: "ct-b2b",
    badge: "Lead Generation",
    desc: "Target businesses and decision-makers with precision-crafted professional outreach emails designed to generate leads, build partnerships, and create lasting opportunities.",
    features: [
      { icon: "🎯", text: "Lead generation & outreach" },
      { icon: "🤝", text: "Business partnership campaigns" },
      { icon: "🏭", text: "Industry-specific targeting" },
      { icon: "📋", text: "Professional communication tone" },
      { icon: "📊", text: "BANT qualification scoring" },
      { icon: "🔁", text: "Multi-touch follow-up sequences" },
    ],
    bestFor: ["SaaS companies", "Agencies", "Consultants", "Enterprise sales"],
    stat1: { val: "3.2×", lbl: "Higher reply rate" },
    stat2: { val: "B2B", lbl: "Decision-maker focus" },
  },
  {
    id: "b2c",
    type: "B2C",
    label: "Business to Consumer",
    tagline: "Campaigns that convert browsers to buyers.",
    icon: <FaUsers />,
    accentClass: "ct-b2c",
    badge: "Drive Sales",
    desc: "Promote products and services directly to customers with high-engagement marketing emails designed to increase sales, build loyalty, and maximize seasonal revenue.",
    features: [
      { icon: "🏷", text: "Promotional offers & flash sales" },
      { icon: "🚀", text: "Product launch announcements" },
      { icon: "💬", text: "Customer engagement campaigns" },
      { icon: "🎉", text: "Seasonal & holiday marketing" },
      { icon: "🛒", text: "Cart abandonment recovery" },
      { icon: "⭐", text: "Loyalty & rewards programs" },
    ],
    bestFor: ["E-commerce", "Retail brands", "D2C startups", "Subscription boxes"],
    stat1: { val: "4.8×", lbl: "Avg ROI multiplier" },
    stat2: { val: "B2C", lbl: "Consumer-first approach" },
  },
];

const CampaignType = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const handleSelect = (type) => {
    navigate(type === "b2b" ? "/b2b" : "/b2c");
  };

  return (
    <div className="ct-root">

      {/* CLOUDS */}
      <div className="ct-clouds">
        <div className="cloud cloud1" />
        <div className="cloud cloud2" />
        <div className="cloud cloud3" />
        <div className="cloud cloud4" />
      </div>

      {/* PLANES */}
      <div className="ct-plane plane1"><FaPaperPlane /></div>
      <div className="ct-plane plane2"><FaPaperPlane /></div>
      <div className="ct-plane plane3"><FaPaperPlane /></div>

      {/* NAVBAR */}
      <nav className="ct-nav">
        <div className="ct-nav-logo">
          <div className="ct-logo-icon"><GiSpartanHelmet /></div>
          MailTitan
        </div>
        <div className="ct-nav-crumb">
          <span className="ct-crumb-step done">Introduction</span>
          <span className="ct-crumb-sep">›</span>
          <span className="ct-crumb-step active">Campaign Type</span>
          <span className="ct-crumb-sep">›</span>
          <span className="ct-crumb-step">Setup</span>
        </div>
        <div className="ct-nav-right">
          <span className="ct-nav-tag">Step 1 of 3</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="ct-hero">
        <div className="ct-hero-badge">✦ Campaign Setup</div>
        <h1 className="ct-hero-title">
          Choose Your <span className="ct-hero-em">Campaign Type</span>
        </h1>
        <p className="ct-hero-sub">
          Select the model that fits your audience. Each type unlocks a tailored AI toolkit optimized for your specific outreach goals.
        </p>
      </div>

      {/* CARDS */}
      <div className="ct-grid">
        {CAMPAIGNS.map((c) => (
          <div
            key={c.id}
            className={`ct-card ${c.accentClass} ${hovered === c.id ? "ct-card-hovered" : ""}`}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Card top stripe */}
            <div className="ct-card-stripe" />

            {/* Header */}
            <div className="ct-card-header">
              <div className="ct-card-icon-wrap">
                <div className="ct-card-icon">{c.icon}</div>
              </div>
              <div className="ct-card-titles">
                <div className="ct-card-type-badge">{c.badge}</div>
                <h2 className="ct-card-type">{c.type}</h2>
                <p className="ct-card-label">{c.label}</p>
              </div>
            </div>

            {/* Tagline */}
            <p className="ct-card-tagline">"{c.tagline}"</p>

            {/* Stats */}
            <div className="ct-card-stats">
              <div className="ct-stat">
                <div className="ct-stat-val">{c.stat1.val}</div>
                <div className="ct-stat-lbl">{c.stat1.lbl}</div>
              </div>
              <div className="ct-stat-divider" />
              <div className="ct-stat">
                <div className="ct-stat-val">{c.stat2.val}</div>
                <div className="ct-stat-lbl">{c.stat2.lbl}</div>
              </div>
            </div>

            {/* Desc */}
            <p className="ct-card-desc">{c.desc}</p>

            {/* Features */}
            <div className="ct-features">
              {c.features.map((f, i) => (
                <div key={i} className="ct-feature-row">
                  <span className="ct-feature-icon">{f.icon}</span>
                  <span className="ct-feature-text">{f.text}</span>
                </div>
              ))}
            </div>

            {/* Best for */}
            <div className="ct-best-for">
              <span className="ct-best-label">Best for:</span>
              <div className="ct-best-chips">
                {c.bestFor.map((b, i) => (
                  <span key={i} className="ct-best-chip">{b}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              className="ct-select-btn"
              onClick={() => handleSelect(c.id)}
            >
              Launch {c.type} Campaign →
            </button>
          </div>
        ))}
      </div>

      {/* BOTTOM NOTE */}
      <p className="ct-bottom-note">
        Not sure which to pick? <span>B2B</span> is for selling to companies. <span>B2C</span> is for selling to individuals.
      </p>

      <div className="ct-spacer" />
    </div>
  );
};

export default CampaignType;