import React, { useState } from "react";
import "./LeadScore.css";

const LeadScore = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("score");

  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    revenue: "",
    budget: "",
    timeline: "",
    decisionMaker: "",
    painPoints: "",
    currentSolution: "",
    engagementLevel: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateScore = async () => {
    const filled = Object.values(form).filter((v) => v.trim() !== "");
    if (filled.length < 3) {
      alert("Please fill in at least 3 fields for a meaningful score.");
      return;
    }
    setLoading(true);
    setResult(null);
    setActiveTab("score");

    const prompt = `You are an expert B2B sales lead qualification engine using BANT + engagement scoring.

Analyze the lead details below and return ONLY a valid JSON object — no markdown, no code fences, no explanation.

{
  "overallScore": number (0-100),
  "grade": "A" | "B" | "C" | "D" | "F",
  "tier": "Hot" | "Warm" | "Cold",
  "recommendation": "Pursue Immediately" | "Nurture" | "Deprioritize",
  "categories": {
    "budget": number (0-25),
    "authority": number (0-25),
    "need": number (0-25),
    "timeline": number (0-25)
  },
  "breakdown": {
    "budgetFit": number (0-100),
    "companySizeFit": number (0-100),
    "urgency": number (0-100),
    "decisionPower": number (0-100),
    "engagementScore": number (0-100)
  },
  "strengths": ["string"],
  "redFlags": ["string"],
  "nextSteps": ["string"],
  "estimatedDealSize": "string (e.g. $10k–$25k)",
  "closeProbability": number (0-100),
  "suggestedApproach": "string (2–3 sentence personalized outreach strategy)"
}

Lead Data:
Company Name: ${form.companyName || "Not provided"}
Industry: ${form.industry || "Not provided"}
Company Size: ${form.companySize || "Not provided"} employees
Annual Revenue: ${form.revenue || "Not provided"}
Budget: ${form.budget || "Not provided"}
Purchase Timeline: ${form.timeline || "Not provided"}
Decision Maker: ${form.decisionMaker || "Not provided"}
Pain Points: ${form.painPoints || "Not provided"}
Current Solution: ${form.currentSolution || "Not provided"}
Engagement Level: ${form.engagementLevel || "Not provided"}`;

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
      alert("Scoring failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const scoreClass = (score) => {
    if (score >= 70) return "grade-good";
    if (score >= 40) return "grade-mid";
    return "grade-bad";
  };

  const tierClass = (tier) => {
    if (tier === "Hot")  return "tier-hot";
    if (tier === "Warm") return "tier-warm";
    return "tier-cold";
  };

  const tabs = [
    { id: "score",    label: "Score" },
    { id: "bant",     label: "BANT" },
    { id: "insights", label: "Insights" },
    { id: "next",     label: "Next Steps" },
  ];

  const bantMeta = {
    budget:    { icon: "💰", label: "Budget",    max: 25 },
    authority: { icon: "👤", label: "Authority", max: 25 },
    need:      { icon: "🎯", label: "Need",      max: 25 },
    timeline:  { icon: "📅", label: "Timeline",  max: 25 },
  };

  const breakdownMeta = {
    budgetFit:      { icon: "💰", label: "Budget Fit",    barClass: "bar-budget" },
    companySizeFit: { icon: "🏢", label: "Company Fit",   barClass: "bar-company" },
    urgency:        { icon: "⚡", label: "Urgency",       barClass: "bar-urgency" },
    decisionPower:  { icon: "👤", label: "Decision Power", barClass: "bar-authority" },
    engagementScore:{ icon: "📊", label: "Engagement",    barClass: "bar-engagement" },
  };

  return (
    <div className="ls-root">

      {/* CLOUDS */}
      <div className="ls-clouds">
        {["lc1","lc2","lc3","lc4","lc5","lc6"].map(c => (
          <div key={c} className={`ls-cloud ${c}`} />
        ))}
      </div>

     

      {/* HERO */}
      <div className="ls-hero">
        <div className="ls-hero-badge">✦ AI-Powered Lead Scoring</div>
        <h1>Fast, Reliable <em>Lead Qualifier</em><br />Built for Sales Teams</h1>
        <p>Qualify leads with BANT scoring, get close probability, deal size estimates, and a personalized outreach strategy — instantly.</p>
      </div>

      {/* PANEL */}
      <div className="ls-panel">

        {/* LEFT — Form */}
        <div className="ls-card">
          <div className="ls-card-label">🏢 Lead Information</div>

          <div className="ls-form-grid">
            <div className="ls-field">
              <label>Company Name</label>
              <input name="companyName" placeholder="Acme Corp" value={form.companyName} onChange={handleChange} />
            </div>
            <div className="ls-field">
              <label>Industry</label>
              <select name="industry" value={form.industry} onChange={handleChange}>
                <option value="">Select industry…</option>
                <option>SaaS / Software</option>
                <option>E-Commerce</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Manufacturing</option>
                <option>Retail</option>
                <option>Education</option>
                <option>Real Estate</option>
                <option>Other</option>
              </select>
            </div>
            <div className="ls-field">
              <label>Company Size (employees)</label>
              <input type="number" name="companySize" placeholder="e.g. 150" value={form.companySize} onChange={handleChange} />
            </div>
            <div className="ls-field">
              <label>Annual Revenue</label>
              <input name="revenue" placeholder="e.g. $2M" value={form.revenue} onChange={handleChange} />
            </div>
            <div className="ls-field">
              <label>Estimated Budget</label>
              <input name="budget" placeholder="e.g. $15,000" value={form.budget} onChange={handleChange} />
            </div>
            <div className="ls-field">
              <label>Purchase Timeline</label>
              <select name="timeline" value={form.timeline} onChange={handleChange}>
                <option value="">Select timeline…</option>
                <option>Immediately (this month)</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>6–12 months</option>
                <option>No timeline yet</option>
              </select>
            </div>
            <div className="ls-field">
              <label>Decision Maker</label>
              <select name="decisionMaker" value={form.decisionMaker} onChange={handleChange}>
                <option value="">Select role…</option>
                <option>C-Suite (CEO, CTO, CFO)</option>
                <option>VP / Director</option>
                <option>Manager</option>
                <option>Individual Contributor</option>
                <option>Unknown</option>
              </select>
            </div>
            <div className="ls-field">
              <label>Engagement Level</label>
              <select name="engagementLevel" value={form.engagementLevel} onChange={handleChange}>
                <option value="">Select level…</option>
                <option>Very High (demo booked, multiple touchpoints)</option>
                <option>High (replied to emails, attended webinar)</option>
                <option>Medium (opened emails, visited site)</option>
                <option>Low (cold outreach only)</option>
              </select>
            </div>
          </div>

          <div className="ls-field ls-field-full">
            <label>Key Pain Points</label>
            <textarea name="painPoints" placeholder="e.g. Struggling with manual reporting, losing deals to competitors…" value={form.painPoints} onChange={handleChange} />
          </div>

          <div className="ls-field ls-field-full">
            <label>Current Solution / Tool</label>
            <input name="currentSolution" placeholder="e.g. Excel, Salesforce, HubSpot…" value={form.currentSolution} onChange={handleChange} />
          </div>

          <button className="ls-analyze-btn" onClick={calculateScore} disabled={loading}>
            {loading ? <><div className="ls-spinner" /> Scoring Lead…</> : "🎯 Calculate Lead Score"}
          </button>
        </div>

        {/* RIGHT — Results */}
        <div className="ls-card">
          <div className="ls-card-label">📊 Qualification Results</div>

          {!result ? (
            <div className="ls-empty">
              <div className="ls-empty-icon">🎯</div>
              <p>Fill in the lead details and click<br /><strong>Calculate Lead Score</strong> to qualify this lead.</p>
            </div>
          ) : (
            <>
              {/* Score Hero */}
              <div className="ls-score-hero">
                <div className={`ls-score-ring ${scoreClass(result.overallScore)}`}>
                  <span className="ls-score-num">{result.overallScore}</span>
                  <span className="ls-score-sub">/ 100</span>
                </div>
                <div className="ls-score-meta">
                  <div className="ls-badge-row">
                    <span className="ls-meta-label">Grade</span>
                    <span className={`ls-grade-badge ${scoreClass(result.overallScore)}`}>{result.grade}</span>
                  </div>
                  <div className="ls-badge-row">
                    <span className="ls-meta-label">Tier</span>
                    <span className={`ls-tier-badge ${tierClass(result.tier)}`}>{result.tier} Lead</span>
                  </div>
                  <div className="ls-badge-row">
                    <span className="ls-meta-label">Action</span>
                    <span className="ls-rec-badge">{result.recommendation}</span>
                  </div>
                </div>
              </div>

              {/* Deal chips */}
              <div className="ls-deal-row">
                <div className="ls-deal-chip">
                  <div className="ls-deal-val">{result.estimatedDealSize}</div>
                  <div className="ls-deal-lbl">Est. Deal Size</div>
                </div>
                <div className="ls-deal-chip">
                  <div className={`ls-deal-val ${scoreClass(result.closeProbability)}`}>{result.closeProbability}%</div>
                  <div className="ls-deal-lbl">Close Probability</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="ls-tabs">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    className={`ls-tab ${activeTab === t.id ? "active" : ""}`}
                    onClick={() => setActiveTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* SCORE TAB */}
              {activeTab === "score" && (
                <div className="ls-tab-content">
                  <div className="ls-section-title">📈 Breakdown Scores</div>
                  {Object.entries(result.breakdown).map(([key, val]) => {
                    const meta = breakdownMeta[key] || { icon: "•", label: key, barClass: "bar-default" };
                    return (
                      <div key={key} className="ls-bar-row">
                        <span className="ls-bar-icon">{meta.icon}</span>
                        <span className="ls-bar-lbl">{meta.label}</span>
                        <div className="ls-bar-bg">
                          <div className={`ls-bar-fill ${meta.barClass}`} style={{ width: `${val}%` }} />
                        </div>
                        <span className="ls-bar-val">{val}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* BANT TAB */}
              {activeTab === "bant" && (
                <div className="ls-tab-content">
                  <div className="ls-section-title">🔍 BANT Scoring (max 25 each)</div>
                  <div className="ls-bant-grid">
                    {Object.entries(result.categories).map(([key, val]) => {
                      const meta = bantMeta[key];
                      const pct = Math.round((val / 25) * 100);
                      return (
                        <div key={key} className={`ls-bant-chip ${scoreClass(pct)}-border`}>
                          <div className="ls-bant-icon">{meta.icon}</div>
                          <div className="ls-bant-label">{meta.label}</div>
                          <div className={`ls-bant-score ${scoreClass(pct)}`}>{val}<span className="ls-bant-max">/25</span></div>
                          <div className="ls-bant-bar-bg">
                            <div className={`ls-bant-bar-fill ${scoreClass(pct)}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* INSIGHTS TAB */}
              {activeTab === "insights" && (
                <div className="ls-tab-content">
                  {result.strengths?.length > 0 && (
                    <>
                      <div className="ls-section-title">✅ Strengths</div>
                      {result.strengths.map((s, i) => (
                        <div key={i} className="ls-insight-row ls-strength">
                          <span className="ls-insight-icon">✦</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </>
                  )}
                  {result.redFlags?.length > 0 && (
                    <>
                      <div className="ls-section-title ls-mt">🚩 Red Flags</div>
                      {result.redFlags.map((r, i) => (
                        <div key={i} className="ls-insight-row ls-redflag">
                          <span className="ls-insight-icon">⚠</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </>
                  )}
                  {result.suggestedApproach && (
                    <>
                      <div className="ls-section-title ls-mt">💬 Suggested Approach</div>
                      <div className="ls-approach-box">
                        <p>{result.suggestedApproach}</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* NEXT STEPS TAB */}
              {activeTab === "next" && (
                <div className="ls-tab-content">
                  <div className="ls-section-title">🗺 Recommended Next Steps</div>
                  {result.nextSteps?.map((step, i) => (
                    <div key={i} className="ls-step-row">
                      <div className="ls-step-num">{i + 1}</div>
                      <span>{step}</span>
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

export default LeadScore;