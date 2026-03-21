import { useState, useEffect, useRef } from "react";
import "./DeliverabilityTester.css";

const TEST_EMAIL = "3611c77fcd435b4@ia-tester.com";

const PLACEMENT_DATA = {
  Inbox: {
    icon: "✦",
    badge: "ct-badge-success",
    headline: "Excellent Deliverability",
    summary: "Your email passed all major filters and landed in the primary inbox.",
    metrics: { spamScore: 4, authScore: 96, contentScore: 91, reputationScore: 94 },
    suggestions: [
      { type: "good", text: "SPF & DKIM records validated successfully." },
      { type: "good", text: "No blacklisted keywords detected in subject or body." },
      { type: "tip", text: "Keep sending frequency consistent to maintain IP reputation." },
    ],
    tags: [
      { label: "SPF Pass", cls: "ct-badge-success" },
      { label: "DKIM Pass", cls: "ct-badge-success" },
      { label: "DMARC Pass", cls: "ct-badge-success" },
      { label: "Clean Content", cls: "ct-badge-platform" },
    ],
  },
  Promotions: {
    icon: "◈",
    badge: "ct-badge-warn",
    headline: "Landed in Promotions",
    summary: "Gmail's tab filter sorted your email as a promotional message.",
    metrics: { spamScore: 28, authScore: 82, contentScore: 61, reputationScore: 70 },
    suggestions: [
      { type: "warn", text: "Reduce promotional keywords like 'Buy Now', 'Limited Offer', 'Click Here'." },
      { type: "warn", text: "High image-to-text ratio detected — add more plain text content." },
      { type: "tip", text: "Personalise the subject line with the recipient's name to boost inbox placement." },
      { type: "tip", text: "Consider plain-text only version to pass Gmail's promo heuristics." },
    ],
    tags: [
      { label: "SPF Pass", cls: "ct-badge-success" },
      { label: "Promo Keywords", cls: "ct-badge-warn" },
      { label: "High Image Ratio", cls: "ct-badge-warn" },
    ],
  },
  Spam: {
    icon: "✗",
    badge: "ct-badge-error",
    headline: "Marked as Spam",
    summary: "Your email was filtered to the spam folder. Immediate action recommended.",
    metrics: { spamScore: 82, authScore: 38, contentScore: 29, reputationScore: 22 },
    suggestions: [
      { type: "err", text: "DKIM signature missing or invalid — configure in your DNS settings." },
      { type: "err", text: "Multiple high-risk spam trigger words found in subject line." },
      { type: "warn", text: "Sending domain has no DMARC policy. Add a DMARC TXT record." },
      { type: "warn", text: "Sending IP may be on a blacklist — run an IP health check." },
      { type: "tip", text: "Avoid ALL CAPS, excessive punctuation!!!!, and free/win/prize keywords." },
    ],
    tags: [
      { label: "DKIM Fail", cls: "ct-badge-error" },
      { label: "No DMARC", cls: "ct-badge-error" },
      { label: "Spam Triggers", cls: "ct-badge-error" },
      { label: "Low Reputation", cls: "ct-badge-warn" },
    ],
  },
};

const STEPS = ["Waiting for email", "Analysing headers", "Scanning content", "Finalising report"];

function getScoreClass(val, invert = false) {
  const v = invert ? 100 - val : val;
  if (v >= 75) return "metric-high";
  if (v >= 45) return "metric-medium";
  return "metric-low";
}

export default function DeliverabilityTester() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [animated, setAnimated] = useState(false);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(TEST_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheck = () => {
    if (step > 0 && step < 4) return;
    setResult(null);
    setAnimated(false);
    setStep(1);

    let s = 1;
    intervalRef.current = setInterval(() => {
      s++;
      setStep(s);
      if (s >= 3) {
        clearInterval(intervalRef.current);
        setTimeout(() => {
          const keys = Object.keys(PLACEMENT_DATA);
          const picked = PLACEMENT_DATA[keys[Math.floor(Math.random() * keys.length)]];
          setResult(picked);
          setStep(4);
          setTimeout(() => setAnimated(true), 60);
        }, 900);
      }
    }, 900);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const running = step > 0 && step < 4;

  return (
    <div className="ct-shared">
      {/* Clouds */}
      <div className="ct-clouds">
        {["dc1", "dc2", "dc3", "dc4", "dc5"].map(c => (
          <div key={c} className={`ct-cloud ${c}`} />
        ))}
      </div>

      {/* Hero */}
      <div className="ct-hero">
        <div className="ct-hero-badge">✉️ Email Diagnostics</div>
        <h1>Spam & <em>Deliverability</em> Checker</h1>
        <p>Send your campaign to our test address and get a full placement report — inbox, promotions, or spam — with actionable fixes.</p>
      </div>

      {/* Panel */}
      <div className="ct-panel">
        

        {/* LEFT — Send & Check */}
        <div className="ct-card">
          <div className="ct-card-label">📬 Test Your Email</div>

          {/* Email Address */}
          <div className="ct-email-box">
            <span className="ct-email-addr">{TEST_EMAIL}</span>
            <button className={`ct-copy-btn${copied ? " copied" : ""}`} onClick={copyEmail}>
              {copied ? "✓ Copied!" : "⎘ Copy"}
            </button>
          </div>

          {/* Instructions */}
          <div className="ct-instructions">
            {[
              "Copy the test address above.",
              "Send your campaign email to that address.",
              "Click 'Check Placement' to see where it lands.",
            ].map((txt, i) => (
              <div key={i} className="ct-instruction-step">
                <span className="ct-step-num">{i + 1}</span>
                <span>{txt}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button className="ct-select-btn" onClick={handleCheck} disabled={running}>
            {running
              ? <><div className="ct-spinner" /> Analysing…</>
              : <>📊 Check Placement</>
            }
          </button>

          {/* Progress Steps */}
          <div className="ct-progress">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`ct-prog-step${
                  step === 4 ? " done" :
                  step === i + 1 ? " active" :
                  step > i + 1 ? " done" : ""
                }`}
              >
                {step > i + 1 || step === 4 ? "✓ " : ""}{s.split(" ").slice(0, 2).join(" ")}
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="ct-tips-box">
            <div className="ct-tips-header">📋 What We Analyse</div>
            <ul className="ct-tips-list">
              <li>Inbox / Promotions / Spam placement</li>
              <li>SPF, DKIM & DMARC authentication</li>
              <li>Spam trigger words in subject & body</li>
              <li>Image-to-text ratio</li>
              <li>Sending IP & domain reputation</li>
              <li>Actionable fixes per result type</li>
            </ul>
          </div>
        </div>

        {/* RIGHT — Results */}
        <div className="ct-card">
          <div className="ct-card-label">📊 Placement Report</div>

          {!result && !running && (
            <div className="ct-empty">
              <div className="ct-empty-icon">📨</div>
              <p>Send your email to the test address,<br />then click Check Placement to<br />see your full deliverability report.</p>
            </div>
          )}

          {running && (
            <div className="ct-empty">
              <div className="ct-empty-icon" style={{ animation: "spin 1.2s linear infinite", fontSize: 42 }}>⚙️</div>
              <p style={{ color: "var(--sh-text-mid)", fontWeight: 600 }}>
                {STEPS[step - 1] ?? "Analysing…"}
              </p>
            </div>
          )}

          {result && !running && (
            <div className={animated ? "ct-animate" : ""}>

              {/* Overall Result */}
              <div className="ct-result-header">
                <div className="ct-result-row">
                  <span className="ct-result-label">Placement Result</span>
                  <span className={`ct-badge ${result.badge}`}>
                    {result.icon} {result.headline}
                  </span>
                </div>
                <p className="ct-result-summary">
                  {result.summary}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="ct-section-title">Key Metrics</div>
              <div className="ct-metrics-grid">
                {[
                  { label: "Auth Score", val: result.metrics.authScore, hint: "SPF/DKIM/DMARC", invert: false },
                  { label: "Content Score", val: result.metrics.contentScore, hint: "subject & body", invert: false },
                  { label: "Spam Score", val: result.metrics.spamScore, hint: "lower is better", invert: true },
                  { label: "Reputation", val: result.metrics.reputationScore, hint: "domain & IP", invert: false },
                ].map(m => (
                  <div key={m.label} className="ct-metric">
                    <div className="ct-metric-label">{m.label}</div>
                    <div className={`ct-metric-value ${getScoreClass(m.val, m.invert)}`}>{m.val}</div>
                    <div className="ct-metric-hint">{m.hint}</div>
                  </div>
                ))}
              </div>

              {/* Score Bars */}
              <div className="ct-section-title">Detailed Scores</div>
              <div className="ct-bars">
                {[
                  { label: "Auth", val: result.metrics.authScore, barCls: "bar-primary" },
                  { label: "Content", val: result.metrics.contentScore, barCls: "bar-primary" },
                  { label: "Spam Prob.", val: result.metrics.spamScore, barCls: "bar-warm" },
                  { label: "Reputation", val: result.metrics.reputationScore, barCls: "bar-primary" },
                ].map(b => (
                  <div key={b.label} className="ct-bar-row">
                    <span className="ct-bar-name">{b.label}</span>
                    <div className="ct-bar-bg">
                      <div
                        className={`ct-bar-fill ${b.barCls}`}
                        style={{ width: animated ? `${b.val}%` : "0%" }}
                      />
                    </div>
                    <span className="ct-bar-num">{b.val}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="ct-section-title">Authentication & Signals</div>
              <div className="ct-tags">
                {result.tags.map((t, i) => (
                  <span key={i} className={`ct-badge ${t.cls}`}>{t.label}</span>
                ))}
              </div>

              {/* Suggestions */}
              <div className="ct-section-title">Recommendations</div>
              {result.suggestions.map((s, i) => (
                <div
                  key={i}
                  className={`ct-alert ${s.type === "err" ? "ct-alert-error" : s.type === "warn" ? "ct-alert-warn" : "ct-alert-success"}`}
                >
                  <span className="ct-alert-icon">
                    {s.type === "err" ? "⚠" : s.type === "warn" ? "◈" : "✓"}
                  </span>
                  <span className="ct-alert-text">{s.text}</span>
                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}