import React, { useState } from "react";
import "./EngagementScore.css";

const EngagementScore = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [form, setForm] = useState({
    emailSubject: "",
    emailBody: "",
    hasEmoji: false,
    hasCta: false,
    hasPersonalization: false,
    hasImages: false,
    hasVideo: false,
    hasSocialProof: false,
    ctaCount: "",
    emailType: "",
    audience: "",
    sendTime: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const calculate = async () => {
    if (!form.emailSubject.trim() && !form.emailBody.trim()) {
      alert("Please enter at least a subject line or email body.");
      return;
    }
    setLoading(true);
    setResult(null);
    setActiveTab("overview");

    const prompt = `You are an expert email marketing engagement analyst.

Analyze the email details below and return ONLY a valid JSON object — no markdown, no code fences, no explanation.

{
  "overallScore": number (0-100),
  "grade": "A" | "B" | "C" | "D" | "F",
  "engagementLevel": "Viral" | "High" | "Moderate" | "Low" | "Poor",
  "categories": {
    "subjectStrength": number (0-100),
    "readability": number (0-100),
    "ctaEffectiveness": number (0-100),
    "personalization": number (0-100),
    "visualAppeal": number (0-100),
    "emotionalTrigger": number (0-100)
  },
  "metrics": {
    "estimatedOpenRate": "string (e.g. 24–30%)",
    "estimatedClickRate": "string",
    "estimatedUnsubRate": "string",
    "estimatedShareRate": "string"
  },
  "wordCount": number,
  "readTime": "string",
  "sentimentTone": "Exciting" | "Informative" | "Urgent" | "Friendly" | "Neutral" | "Salesy",
  "emojiEffectiveness": "Great" | "Good" | "Neutral" | "Overused" | "Missing",
  "ctaAnalysis": {
    "clarity": number (0-100),
    "placement": "Good" | "Needs Work" | "Missing",
    "urgency": number (0-100)
  },
  "strengths": ["string"],
  "weaknesses": ["string"],
  "quickWins": ["string (short actionable fix)"],
  "audienceResonance": number (0-100),
  "mobileScore": number (0-100),
  "accessibilityTips": ["string"]
}

Email Details:
Subject: ${form.emailSubject || "Not provided"}
Body: ${form.emailBody || "Not provided"}
Has Emojis: ${form.hasEmoji}
Has CTA Button: ${form.hasCta}
Has Personalization: ${form.hasPersonalization}
Has Images: ${form.hasImages}
Has Video: ${form.hasVideo}
Has Social Proof: ${form.hasSocialProof}
CTA Count: ${form.ctaCount || "Unknown"}
Email Type: ${form.emailType || "Not specified"}
Target Audience: ${form.audience || "General"}
Send Time: ${form.sendTime || "Not specified"}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const text = data.content.map((i) => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const scoreClass = (score) => {
    if (score >= 70) return "grade-good";
    if (score >= 45) return "grade-mid";
    return "grade-bad";
  };

  const levelClass = (level) => {
    if (level === "Viral" || level === "High") return "grade-good";
    if (level === "Moderate") return "grade-mid";
    return "grade-bad";
  };

  const categoryMeta = {
    subjectStrength:  { icon: "✉",  label: "Subject Line",    barClass: "bar-subject" },
    readability:      { icon: "📖", label: "Readability",     barClass: "bar-read" },
    ctaEffectiveness: { icon: "🎯", label: "CTA Power",       barClass: "bar-cta" },
    personalization:  { icon: "👤", label: "Personalization", barClass: "bar-personal" },
    visualAppeal:     { icon: "🖼", label: "Visual Appeal",   barClass: "bar-visual" },
    emotionalTrigger: { icon: "💡", label: "Emotional Pull",  barClass: "bar-emotion" },
  };

  const checkboxes = [
    { name: "hasEmoji",           label: "Uses Emojis",        icon: "😊" },
    { name: "hasCta",             label: "Has CTA Button",      icon: "🎯" },
    { name: "hasPersonalization", label: "Personalized",        icon: "👤" },
    { name: "hasImages",          label: "Contains Images",     icon: "🖼" },
    { name: "hasVideo",           label: "Has Video/GIF",       icon: "▶" },
    { name: "hasSocialProof",     label: "Social Proof",        icon: "⭐" },
  ];

  const tabs = [
    { id: "overview",  label: "Overview" },
    { id: "scores",    label: "Scores" },
    { id: "metrics",   label: "Metrics" },
    { id: "actions",   label: "Actions" },
  ];

  return (
    <div className="eg-root">

      {/* CLOUDS */}
      <div className="eg-clouds">
        {["ec1","ec2","ec3","ec4","ec5","ec6"].map(c => (
          <div key={c} className={`eg-cloud ${c}`} />
        ))}
      </div>

      

      {/* HERO */}
      <div className="eg-hero">
        <div className="eg-hero-badge">✦ AI-Powered Engagement Analysis</div>
        <h1>Fast, Reliable <em>Engagement Scorer</em><br />Built for Marketers</h1>
        <p>Score your email's engagement potential, predict open & click rates, and get instant actionable improvements — instantly.</p>
      </div>

      {/* PANEL */}
      <div className="eg-panel">

        {/* LEFT — Form */}
        <div className="eg-card">
          <div className="eg-card-label">📝 Email Details</div>

          <div className="eg-field">
            <label>Subject Line</label>
            <input
              name="emailSubject"
              placeholder="Enter your email subject line…"
              value={form.emailSubject}
              onChange={handleChange}
            />
          </div>

          <div className="eg-field">
            <label>Email Body (paste or summarize)</label>
            <textarea
              name="emailBody"
              placeholder="Paste your email body here…"
              value={form.emailBody}
              onChange={handleChange}
            />
          </div>

          <div className="eg-form-row">
            <div className="eg-field">
              <label>Email Type</label>
              <select name="emailType" value={form.emailType} onChange={handleChange}>
                <option value="">Select type…</option>
                <option>Newsletter</option>
                <option>Promotional</option>
                <option>Welcome Email</option>
                <option>Re-engagement</option>
                <option>Transactional</option>
                <option>Product Launch</option>
                <option>Event Invite</option>
                <option>Follow-up</option>
              </select>
            </div>
            <div className="eg-field">
              <label>Target Audience</label>
              <select name="audience" value={form.audience} onChange={handleChange}>
                <option value="">Select audience…</option>
                <option>New Subscribers</option>
                <option>Loyal Customers</option>
                <option>Cold Leads</option>
                <option>VIP Members</option>
                <option>Cart Abandoners</option>
                <option>General List</option>
              </select>
            </div>
          </div>

          <div className="eg-form-row">
            <div className="eg-field">
              <label>CTA Count</label>
              <select name="ctaCount" value={form.ctaCount} onChange={handleChange}>
                <option value="">Select…</option>
                <option>0 — No CTA</option>
                <option>1 — Single CTA</option>
                <option>2–3 — Multiple CTAs</option>
                <option>4+ — Many CTAs</option>
              </select>
            </div>
            <div className="eg-field">
              <label>Send Time</label>
              <select name="sendTime" value={form.sendTime} onChange={handleChange}>
                <option value="">Select…</option>
                <option>Monday Morning</option>
                <option>Tuesday Morning</option>
                <option>Wednesday Afternoon</option>
                <option>Thursday Morning</option>
                <option>Friday Afternoon</option>
                <option>Weekend</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="eg-field">
            <label>Email Features</label>
            <div className="eg-checkbox-grid">
              {checkboxes.map(({ name, label, icon }) => (
                <label key={name} className={`eg-checkbox-item ${form[name] ? "checked" : ""}`}>
                  <input
                    type="checkbox"
                    name={name}
                    checked={form[name]}
                    onChange={handleChange}
                  />
                  <span className="eg-cb-icon">{icon}</span>
                  <span className="eg-cb-label">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="eg-analyze-btn" onClick={calculate} disabled={loading}>
            {loading ? <><div className="eg-spinner" /> Analyzing…</> : "📊 Calculate Engagement Score"}
          </button>
        </div>

        {/* RIGHT — Results */}
        <div className="eg-card">
          <div className="eg-card-label">📊 Engagement Results</div>

          {!result ? (
            <div className="eg-empty">
              <div className="eg-empty-icon">📊</div>
              <p>Fill in your email details and click<br /><strong>Calculate Engagement Score</strong> to see insights.</p>
            </div>
          ) : (
            <>
              {/* Score hero */}
              <div className="eg-score-hero">
                <div className={`eg-score-ring ${scoreClass(result.overallScore)}`}>
                  <span className="eg-score-num">{result.overallScore}</span>
                  <span className="eg-score-sub">/ 100</span>
                </div>
                <div className="eg-score-meta">
                  <div className="eg-badge-row">
                    <span className="eg-meta-label">Grade</span>
                    <span className={`eg-grade-badge ${scoreClass(result.overallScore)}`}>{result.grade}</span>
                  </div>
                  <div className="eg-badge-row">
                    <span className="eg-meta-label">Level</span>
                    <span className={`eg-level-badge ${levelClass(result.engagementLevel)}`}>{result.engagementLevel}</span>
                  </div>
                  <div className="eg-badge-row">
                    <span className="eg-meta-label">Tone</span>
                    <span className="eg-tone-badge">{result.sentimentTone}</span>
                  </div>
                </div>
              </div>

              {/* Stat chips */}
              <div className="eg-stat-row">
                <div className="eg-stat-chip">
                  <div className="eg-stat-val eg-stat-val-sm">{result.wordCount}</div>
                  <div className="eg-stat-lbl">Words</div>
                </div>
                <div className="eg-stat-chip">
                  <div className="eg-stat-val eg-stat-val-sm">{result.readTime}</div>
                  <div className="eg-stat-lbl">Read Time</div>
                </div>
                <div className="eg-stat-chip">
                  <div className={`eg-stat-val eg-stat-val-sm ${scoreClass(result.mobileScore)}`}>{result.mobileScore}</div>
                  <div className="eg-stat-lbl">Mobile Score</div>
                </div>
                <div className="eg-stat-chip">
                  <div className={`eg-stat-val eg-stat-val-sm ${scoreClass(result.audienceResonance)}`}>{result.audienceResonance}</div>
                  <div className="eg-stat-lbl">Audience Fit</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="eg-tabs">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    className={`eg-tab ${activeTab === t.id ? "active" : ""}`}
                    onClick={() => setActiveTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="eg-tab-content">
                  <div className="eg-section-title">✉ CTA Analysis</div>
                  {result.ctaAnalysis && (
                    <div className="eg-cta-grid">
                      <div className="eg-cta-chip">
                        <div className={`eg-cta-val ${scoreClass(result.ctaAnalysis.clarity)}`}>{result.ctaAnalysis.clarity}</div>
                        <div className="eg-cta-lbl">Clarity</div>
                      </div>
                      <div className="eg-cta-chip">
                        <div className={`eg-cta-val ${result.ctaAnalysis.placement === "Good" ? "grade-good" : result.ctaAnalysis.placement === "Missing" ? "grade-bad" : "grade-mid"}`}>{result.ctaAnalysis.placement}</div>
                        <div className="eg-cta-lbl">Placement</div>
                      </div>
                      <div className="eg-cta-chip">
                        <div className={`eg-cta-val ${scoreClass(result.ctaAnalysis.urgency)}`}>{result.ctaAnalysis.urgency}</div>
                        <div className="eg-cta-lbl">Urgency</div>
                      </div>
                      <div className="eg-cta-chip">
                        <div className="eg-cta-val-txt">{result.emojiEffectiveness}</div>
                        <div className="eg-cta-lbl">Emoji Use</div>
                      </div>
                    </div>
                  )}

                  {result.strengths?.length > 0 && (
                    <>
                      <div className="eg-section-title eg-mt">✅ Strengths</div>
                      {result.strengths.map((s, i) => (
                        <div key={i} className="eg-insight-row eg-strength">
                          <span className="eg-insight-icon">✦</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {result.weaknesses?.length > 0 && (
                    <>
                      <div className="eg-section-title eg-mt">⚠ Weaknesses</div>
                      {result.weaknesses.map((w, i) => (
                        <div key={i} className="eg-insight-row eg-weakness">
                          <span className="eg-insight-icon">→</span>
                          <span>{w}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* SCORES TAB */}
              {activeTab === "scores" && (
                <div className="eg-tab-content">
                  <div className="eg-section-title">📈 Category Breakdown</div>
                  {Object.entries(result.categories).map(([key, val]) => {
                    const meta = categoryMeta[key] || { icon: "•", label: key, barClass: "bar-default" };
                    return (
                      <div key={key} className="eg-bar-row">
                        <span className="eg-bar-icon">{meta.icon}</span>
                        <span className="eg-bar-lbl">{meta.label}</span>
                        <div className="eg-bar-bg">
                          <div className={`eg-bar-fill ${meta.barClass}`} style={{ width: `${val}%` }} />
                        </div>
                        <span className={`eg-bar-val ${scoreClass(val)}`}>{val}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* METRICS TAB */}
              {activeTab === "metrics" && (
                <div className="eg-tab-content">
                  <div className="eg-section-title">📬 Predicted Performance</div>
                  <div className="eg-metrics-grid">
                    <div className="eg-big-metric">
                      <div className="eg-big-val">{result.metrics?.estimatedOpenRate}</div>
                      <div className="eg-big-lbl">📬 Open Rate</div>
                    </div>
                    <div className="eg-big-metric">
                      <div className="eg-big-val">{result.metrics?.estimatedClickRate}</div>
                      <div className="eg-big-lbl">🖱 Click Rate</div>
                    </div>
                    <div className="eg-big-metric">
                      <div className="eg-big-val">{result.metrics?.estimatedUnsubRate}</div>
                      <div className="eg-big-lbl">🚪 Unsub Rate</div>
                    </div>
                    <div className="eg-big-metric">
                      <div className="eg-big-val">{result.metrics?.estimatedShareRate}</div>
                      <div className="eg-big-lbl">🔁 Share Rate</div>
                    </div>
                  </div>

                  {result.accessibilityTips?.length > 0 && (
                    <>
                      <div className="eg-section-title eg-mt">♿ Accessibility Tips</div>
                      {result.accessibilityTips.map((tip, i) => (
                        <div key={i} className="eg-tip-row">
                          <div className="eg-tip-num">{i + 1}</div>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* ACTIONS TAB */}
              {activeTab === "actions" && (
                <div className="eg-tab-content">
                  <div className="eg-section-title">⚡ Quick Wins</div>
                  {result.quickWins?.map((win, i) => (
                    <div key={i} className="eg-win-row">
                      <div className="eg-win-num">{i + 1}</div>
                      <span>{win}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngagementScore;