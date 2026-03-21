import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaEnvelopeOpenText,
  FaInbox,
  FaNetworkWired,
  FaFire,
  FaUserTie,
  FaProjectDiagram,
  FaChartBar,
  FaPaperPlane,
} from "react-icons/fa";
import { GiSpartanHelmet } from "react-icons/gi";
import "./B2BDashboard.css";

const COMMON_TOOLS = [
  {
    icon: <FaEnvelopeOpenText />,
    title: "Subject Line Tester",
    desc: "Analyze subject line performance and predict engagement before sending emails.",
    route: "/subject-tester",
    badge: "Popular",
  },
  {
    icon: <FaShieldAlt />,
    title: "Spam Checker",
    desc: "Detect spam trigger words and improve deliverability for business outreach.",
    route: "/spam-checker",
    badge: "Essential",
  },
  {
    icon: <FaInbox />,
    title: "Email Deliverability Test",
    desc: "Check where your email lands — Inbox, Promotions, or Spam.",
    route: "/deliverability-test",
    badge: null,
  },
  {
    icon: <FaNetworkWired />,
    title: "IP / Sender Checker",
    desc: "Verify if your sending IP or email domain is legitimate before campaigns.",
    route: "/ip-checker",
    badge: null,
  },
  {
    icon: <FaFire />,
    title: "Warmup Planner",
    desc: "Generate a safe email warmup schedule to build domain reputation gradually.",
    route: "/warmup-planner",
    badge: null,
  },
];

const B2B_TOOLS = [
  {
    icon: <FaUserTie />,
    title: "Cold Email Personalization",
    desc: "Generate personalized cold email intros for decision-makers at scale.",
    route: "/cold-email-generator",
    badge: "B2B Exclusive",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Outreach Sequence Planner",
    desc: "Plan multi-step follow-up email sequences for better response rates.",
    route: "/outreach-planner",
    badge: "B2B Exclusive",
  },
  {
    icon: <FaChartBar />,
    title: "Lead Qualification Score",
    desc: "Evaluate potential leads with BANT scoring and identify high-value prospects.",
    route: "/lead-score",
    badge: "B2B Exclusive",
  },
];

const STATS = [
  { val: "3.2×", lbl: "Higher Reply Rate" },
  { val: "61%", lbl: "Inbox Placement" },
  { val: "8", lbl: "AI Tools" },
  { val: "< 2s", lbl: "Analysis Speed" },
];

const B2BDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="b2b-root">

      {/* CLOUDS */}
      <div className="b2b-clouds">
        <div className="cloud cloud1" />
        <div className="cloud cloud2" />
        <div className="cloud cloud3" />
        <div className="cloud cloud4" />
      </div>

      {/* FLYING PLANES — original structure preserved */}
      <div className="flying-plane plane-a">
        <span className="plane-icon"><FaPaperPlane /></span>
        <div className="contrail" />
      </div>
      <div className="flying-plane plane-b">
        <span className="plane-icon"><FaPaperPlane /></span>
        <div className="contrail" />
      </div>
      <div className="flying-plane plane-c">
        <span className="plane-icon"><FaPaperPlane /></span>
        <div className="contrail" />
      </div>

      {/* NAVBAR */}
      <nav className="b2b-nav">
        <div className="b2b-nav-logo">
          <div className="b2b-logo-icon"><GiSpartanHelmet /></div>
          MailTitan
        </div>
        <div className="b2b-nav-crumb">
          <span className="b2b-crumb done">Introduction</span>
          <span className="b2b-crumb-sep">›</span>
          <span className="b2b-crumb done">Campaign Type</span>
          <span className="b2b-crumb-sep">›</span>
          <span className="b2b-crumb active">B2B Dashboard</span>
        </div>
        <div className="b2b-nav-tag">B2B Mode</div>
      </nav>

      {/* HERO */}
      <div className="b2b-hero">
        <div className="b2b-hero-badge">✦ B2B Campaign Suite</div>
        <h1 className="b2b-hero-title">
          B2B Email <span className="b2b-hero-em">Marketing Tools</span>
        </h1>
        <p className="b2b-hero-sub">
          Optimize professional outreach campaigns for decision-makers and businesses.
          Every tool is tuned for the B2B inbox — precision over volume.
        </p>

        {/* STATS */}
        <div className="b2b-stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="b2b-stat-chip">
              <div className="b2b-stat-val">{s.val}</div>
              <div className="b2b-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION — COMMON TOOLS */}
      <div className="b2b-section">
        <div className="b2b-section-header">
          <div className="b2b-section-badge">🔧 Universal</div>
          <h2 className="b2b-section-title">Common Email Tools</h2>
          <p className="b2b-section-sub">Core tools every email marketer needs — optimized for B2B deliverability.</p>
        </div>

        <div className="b2b-grid">
          {COMMON_TOOLS.map((t, i) => (
            <div key={i} className="b2b-card" onClick={() => navigate(t.route)}>
              {t.badge && <div className="b2b-card-badge">{t.badge}</div>}
              <div className="b2b-card-icon">{t.icon}</div>
              <h3 className="b2b-card-title">{t.title}</h3>
              <p className="b2b-card-desc">{t.desc}</p>
              <div className="b2b-card-link">Open tool →</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION — B2B EXCLUSIVE */}
      <div className="b2b-section">
        <div className="b2b-section-header">
          <div className="b2b-section-badge b2b-badge-excl">⚡ B2B Exclusive</div>
          <h2 className="b2b-section-title">Exclusive B2B Tools</h2>
          <p className="b2b-section-sub">Purpose-built for professional outreach, lead qualification, and sequence planning.</p>
        </div>

        <div className="b2b-grid b2b-grid-3">
          {B2B_TOOLS.map((t, i) => (
            <div key={i} className="b2b-card b2b-card-excl" onClick={() => navigate(t.route)}>
              <div className="b2b-card-excl-stripe" />
              {t.badge && <div className="b2b-card-badge b2b-badge-excl">{t.badge}</div>}
              <div className="b2b-card-icon b2b-icon-excl">{t.icon}</div>
              <h3 className="b2b-card-title">{t.title}</h3>
              <p className="b2b-card-desc">{t.desc}</p>
              <div className="b2b-card-link b2b-link-excl">Open tool →</div>
            </div>
          ))}
        </div>
      </div>

      {/* LAUNCH CTA */}
      <div className="b2b-launch">
        <div className="b2b-launch-inner">
          <div className="b2b-launch-left">
            <h3>Ready to start your B2B outreach?</h3>
            <p>Launch the campaign builder and send your first professional sequence today.</p>
          </div>
          <button
            className="b2b-launch-btn"
            onClick={() => navigate("/template")}
          >
            <span className="b2b-launch-plane"><FaPaperPlane /></span>
            Launch Campaign Builder
          </button>
        </div>
      </div>

      <div className="b2b-spacer" />
    </div>
  );
};

export default B2BDashboard;