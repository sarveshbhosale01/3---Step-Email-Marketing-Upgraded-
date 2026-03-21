import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaFileCsv,
  FaPaperPlane,
  FaChartLine,
} from "react-icons/fa";
import { GiSpartanHelmet } from "react-icons/gi";
import "./introduction.css";

const STEPS = [
  {
    icon: <FaClipboardList />,
    step: "01",
    title: "Select Template",
    desc: "Choose a professionally designed email template that matches your campaign style and audience.",
    color: "step-blue",
  },
  {
    icon: <FaFileCsv />,
    step: "02",
    title: "Upload Customer List",
    desc: "Upload your audience using CSV or Excel. Our parser cleans duplicates and validates emails automatically.",
    color: "step-teal",
  },
  {
    icon: <FaPaperPlane />,
    step: "03",
    title: "Send Personalized Emails",
    desc: "Our AI personalizes and delivers each email at the optimal send time for maximum open rate.",
    color: "step-sky",
  },
  {
    icon: <FaChartLine />,
    step: "04",
    title: "Analyze Performance",
    desc: "Track delivery rate, open rate, spam score, click-through rate, and full campaign analytics in real time.",
    color: "step-indigo",
  },
];

const STATS = [
  { value: "10k+", label: "Active Users" },
  { value: "98.2%", label: "Inbox Delivery" },
  { value: "4.2×", label: "Avg Open Rate Lift" },
  { value: "< 2s", label: "Analysis Speed" },
];

const Introduction = () => {
  const navigate = useNavigate();

  return (
    <div className="it-root">

      {/* CLOUDS */}
      <div className="it-clouds">
        <div className="cloud cloud1" />
        <div className="cloud cloud2" />
        <div className="cloud cloud3" />
        <div className="cloud cloud4" />
        <div className="cloud cloud5" />
      </div>

      {/* PLANES */}
      <div className="it-plane plane1"><FaPaperPlane /></div>
      <div className="it-plane plane2"><FaPaperPlane /></div>
      <div className="it-plane plane3"><FaPaperPlane /></div>
      <div className="it-plane plane4"><FaPaperPlane /></div>
      <div className="it-plane plane5"><FaPaperPlane /></div>

      {/* NAVBAR */}
      <nav className="it-nav">
        <div className="it-nav-logo">
          <div className="it-logo-icon"><GiSpartanHelmet /></div>
          MailTitan
        </div>
        <div className="it-nav-right">
          <span className="it-nav-tag">✦ Introduction</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="it-hero">
        <div className="it-hero-badge">✦ Getting Started</div>
        <h1 className="it-hero-title">
          Welcome to <span className="it-hero-em">MailTitan</span>
        </h1>
        <p className="it-hero-sub">
          MailTitan helps marketers build high-performance email campaigns — improving deliverability,
          avoiding spam filters, and maximizing engagement with AI-powered tools.
        </p>

        {/* STAT ROW */}
        <div className="it-stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="it-stat-chip">
              <div className="it-stat-val">{s.value}</div>
              <div className="it-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS CARD */}
      <div className="it-card">

        <div className="it-card-header">
          <div className="it-card-badge">✦ How It Works</div>
          <h2 className="it-card-title">Four Steps to Inbox Domination</h2>
          <p className="it-card-sub">
            Our platform simplifies every stage of email marketing — from building your list
            to tracking results — in one seamless workflow.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="it-steps-grid">
          {STEPS.map((s, i) => (
            <div key={i} className={`it-step ${s.color}`}>
              <div className="it-step-top">
                <div className="it-step-icon">{s.icon}</div>
                <span className="it-step-num">{s.step}</span>
              </div>
              <h3 className="it-step-title">{s.title}</h3>
              <p className="it-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CONNECTOR LINE */}
        <div className="it-connector">
          <div className="it-connector-line" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="it-connector-dot" />
          ))}
        </div>

        {/* CTA */}
        <div className="it-cta-area">
          <p className="it-cta-note">Ready to launch your first campaign?</p>
          <button
            className="it-continue-btn"
            onClick={() => navigate("/CampaignType")}
          >
            Continue to Campaign Setup →
          </button>
        </div>

      </div>

      {/* BOTTOM PADDING */}
      <div className="it-spacer" />

    </div>
  );
};

export default Introduction;