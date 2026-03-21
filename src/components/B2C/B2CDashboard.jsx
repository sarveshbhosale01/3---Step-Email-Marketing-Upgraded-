import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaEnvelopeOpenText,
  FaInbox,
  FaNetworkWired,
  FaFire,
  FaTags,
  FaChartLine,
  FaBullhorn,
  FaPaperPlane,
} from "react-icons/fa";
import { GiSpartanHelmet } from "react-icons/gi";
import "./B2CDashboard.css";

const COMMON_TOOLS = [
  {
    icon: <FaEnvelopeOpenText />,
    title: "Subject Line Tester",
    desc: "Test subject lines and improve open rates for promotional campaigns.",
    route: "/subject-tester",
    badge: "Popular",
  },
  {
    icon: <FaShieldAlt />,
    title: "Spam Checker",
    desc: "Ensure your promotional emails avoid spam filters and reach inboxes.",
    route: "/spam-checker",
    badge: "Essential",
  },
  {
    icon: <FaInbox />,
    title: "Email Deliverability Test",
    desc: "Check where your promotional email lands and optimize content for better inbox placement.",
    route: "/deliverability-test",
    badge: null,
  },
  {
    icon: <FaNetworkWired />,
    title: "IP / Sender Checker",
    desc: "Verify if your sending IP or email domain is legitimate before launching campaigns.",
    route: "/ip-checker",
    badge: null,
  },
  {
    icon: <FaFire />,
    title: "Warmup Planner",
    desc: "Generate a safe email warmup schedule to build domain reputation and improve deliverability.",
    route: "/warmup-planner",
    badge: null,
  },
];

const B2C_TOOLS = [
  {
    icon: <FaTags />,
    title: "Discount Email Optimizer",
    desc: "Create high-performing promotional offers and optimize discount campaigns for maximum conversions.",
    route: "/discount-optimizer",
    badge: "B2C Exclusive",
  },
  {
    icon: <FaChartLine />,
    title: "Customer Engagement Score",
    desc: "Estimate how engaging your marketing email will be before sending it to your audience.",
    route: "/engagement-score",
    badge: "B2C Exclusive",
  },
  {
    icon: <FaBullhorn />,
    title: "Product Promotion Generator",
    desc: "Generate complete promotional email content for product launches and seasonal campaigns.",
    route: "/promotion-generator",
    badge: "B2C Exclusive",
  },
];

const STATS = [
  { val: "4.8×", lbl: "Avg ROI Multiplier" },
  { val: "92%", lbl: "Inbox Delivery" },
  { val: "8", lbl: "AI Tools" },
  { val: "< 2s", lbl: "Analysis Speed" },
];

const B2CDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="b2c-root">

      {/* CLOUDS */}
      <div className="b2c-clouds">
        <div className="cloud cloud1" />
        <div className="cloud cloud2" />
        <div className="cloud cloud3" />
        <div className="cloud cloud4" />
        <div className="cloud cloud5" />
      </div>

      {/* FLYING PLANES — original structure preserved */}
      <div className="flying-plane plane-a">
        <span className="b2c-plane-icon"><FaPaperPlane /></span>
        <div className="contrail" />
      </div>
      <div className="flying-plane plane-b">
        <span className="b2c-plane-icon"><FaPaperPlane /></span>
        <div className="contrail" />
      </div>
      <div className="flying-plane plane-c">
        <span className="b2c-plane-icon"><FaPaperPlane /></span>
        <div className="contrail" />
      </div>
      <div className="flying-plane plane-d">
        <span className="b2c-plane-icon"><FaPaperPlane /></span>
        <div className="contrail" />
      </div>
      <div className="flying-plane plane-e">
        <span className="b2c-plane-icon"><FaPaperPlane /></span>
        <div className="contrail" />
      </div>

      {/* NAVBAR */}
      <nav className="b2c-nav">
        <div className="b2c-nav-logo">
          <div className="b2c-logo-icon"><GiSpartanHelmet /></div>
          MailTitan
        </div>
        <div className="b2c-nav-crumb">
          <span className="b2c-crumb done">Introduction</span>
          <span className="b2c-crumb-sep">›</span>
          <span className="b2c-crumb done">Campaign Type</span>
          <span className="b2c-crumb-sep">›</span>
          <span className="b2c-crumb active">B2C Dashboard</span>
        </div>
        <div className="b2c-nav-tag">B2C Mode</div>
      </nav>

      {/* HERO */}
      <div className="b2c-hero">
        <div className="b2c-hero-badge">✦ B2C Campaign Suite</div>
        <h1 className="b2c-hero-title">
          B2C Email <span className="b2c-hero-em">Marketing Tools</span>
        </h1>
        <p className="b2c-hero-sub">
          Create high-converting campaigns designed to engage customers and drive sales.
          Every tool is tuned for consumer psychology — emotion over logic.
        </p>

        {/* STATS */}
        <div className="b2c-stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="b2c-stat-chip">
              <div className="b2c-stat-val">{s.val}</div>
              <div className="b2c-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION — COMMON TOOLS */}
      <div className="b2c-section">
        <div className="b2c-section-header">
          <div className="b2c-section-badge">🔧 Universal</div>
          <h2 className="b2c-section-title">Common Email Tools</h2>
          <p className="b2c-section-sub">Core tools every email marketer needs — optimized for B2C deliverability and open rates.</p>
        </div>

        <div className="b2c-grid">
          {COMMON_TOOLS.map((t, i) => (
            <div key={i} className="b2c-card" onClick={() => navigate(t.route)}>
              {t.badge && <div className="b2c-card-badge">{t.badge}</div>}
              <div className="b2c-card-icon">{t.icon}</div>
              <h3 className="b2c-card-title">{t.title}</h3>
              <p className="b2c-card-desc">{t.desc}</p>
              <div className="b2c-card-link">Open tool →</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION — B2C EXCLUSIVE */}
      <div className="b2c-section">
        <div className="b2c-section-header">
          <div className="b2c-section-badge b2c-badge-excl">🏷 B2C Exclusive</div>
          <h2 className="b2c-section-title">Exclusive B2C Tools</h2>
          <p className="b2c-section-sub">Purpose-built for promotional campaigns, discount offers, and consumer engagement scoring.</p>
        </div>

        <div className="b2c-grid b2c-grid-3">
          {B2C_TOOLS.map((t, i) => (
            <div key={i} className="b2c-card b2c-card-excl" onClick={() => navigate(t.route)}>
              {t.badge && <div className="b2c-card-badge b2c-badge-excl">{t.badge}</div>}
              <div className="b2c-card-icon b2c-icon-excl">{t.icon}</div>
              <h3 className="b2c-card-title">{t.title}</h3>
              <p className="b2c-card-desc">{t.desc}</p>
              <div className="b2c-card-link b2c-link-excl">Open tool →</div>
            </div>
          ))}
        </div>
      </div>

      {/* LAUNCH CTA */}
      <div className="b2c-launch">
        <div className="b2c-launch-inner">
          <div className="b2c-launch-left">
            <h3>Ready to launch your B2C campaign?</h3>
            <p>Open the campaign builder and send your first high-converting promotional email today.</p>
          </div>
          <button
            className="b2c-launch-btn"
            onClick={() => navigate("/template")}
          >
            <span className="b2c-launch-plane"><FaPaperPlane /></span>
            Launch Campaign Builder
          </button>
        </div>
      </div>

      <div className="b2c-spacer" />
    </div>
  );
};

export default B2CDashboard;