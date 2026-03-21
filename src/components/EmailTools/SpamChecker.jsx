import React, { useState } from "react";
import "./SpamChecker.css";

const SpamChecker = () => {
  const [emailContent, setEmailContent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showRewrite, setShowRewrite] = useState(false);
  const [copied, setCopied] = useState(false);

  const checkSpam = async () => {
    if (!emailContent.trim()) {
      alert("Please paste your email content first.");
      return;
    }
    setLoading(true);
    setResult(null);
    setActiveTab("overview");
    setShowRewrite(false);

    const prompt = `You are an expert email deliverability and spam analysis engine.

Analyze the email body below and return ONLY a valid JSON object — no markdown, no code fences, no explanation.

{
  "overallScore": number (0-100, higher = cleaner),
  "grade": "A" | "B" | "C" | "D" | "F",
  "verdict": "Safe" | "Risky" | "Spam",
  "wordCount": number,
  "sentenceCount": number,
  "readTime": "x sec" or "x min",
  "readabilityScore": number (0-100),
  "readabilityLevel": "Easy" | "Moderate" | "Complex",
  "sentiment": "Positive" | "Neutral" | "Negative" | "Aggressive",
  "sentimentScore": number (0-100, 100 = very positive),
  "deliverabilityScore": number (0-100),
  "categories": {
    "urgency": number (0-10),
    "shady": number (0-10),
    "overpromise": number (0-10),
    "unnatural": number (0-10),
    "clickbait": number (0-10),
    "salesy": number (0-10)
  },
  "spamKeywords": [
    { "word": "exact word from email", "reason": "short reason why spammy", "replacement": "spam-free alternative" }
  ],
  "issues": [
    { "type": "error" | "warning" | "info", "message": "description of the issue" }
  ],
  "strengths": ["string"],
  "rewrittenContent": "Full spam-free rewrite keeping same intent but clean, professional, deliverable."
}

Email:
${emailContent}`;

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

  const handleCopy = () => {
    navigator.clipboard.writeText(result.rewrittenContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightText = () => {
    if (!result) return emailContent;
    let text = emailContent;
    result.spamKeywords.forEach(({ word }) => {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b(${escaped})\\b`, "gi");
      text = text.replace(regex, `<mark class="sc-highlight">$1</mark>`);
    });
    return text;
  };

  const scoreClass = (score) => {
    if (score >= 75) return "grade-good";
    if (score >= 45) return "grade-mid";
    return "grade-bad";
  };

  const verdictClass = (v) => {
    if (v === "Safe") return "verdict-safe";
    if (v === "Risky") return "verdict-risky";
    return "verdict-spam";
  };

  const issueIcon = (type) => {
    if (type === "error") return "✕";
    if (type === "warning") return "⚠";
    return "ℹ";
  };

  const categoryMeta = {
    urgency:     { icon: "⚡", label: "Urgency",     barClass: "bar-urgency" },
    shady:       { icon: "🚫", label: "Shady",       barClass: "bar-shady" },
    overpromise: { icon: "🎯", label: "Overpromise", barClass: "bar-overpromise" },
    unnatural:   { icon: "💬", label: "Unnatural",   barClass: "bar-unnatural" },
    clickbait:   { icon: "🪝", label: "Clickbait",   barClass: "bar-clickbait" },
    salesy:      { icon: "💰", label: "Salesy",      barClass: "bar-salesy" },
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "keywords", label: "Keywords" },
    { id: "metrics",  label: "Metrics" },
    { id: "issues",   label: "Issues" },
  ];

  return (
    <div className="sc-root">

      {/* CLOUDS */}
      <div className="sc-clouds">
        {["cc1","cc2","cc3","cc4","cc5","cc6"].map(c => (
          <div key={c} className={`sc-cloud ${c}`} />
        ))}
      </div>

      
      

      {/* HERO */}
      <div className="sc-hero">
        <div className="sc-hero-badge">✦ AI-Powered Spam Detection</div>
        <h1>Fast, Reliable <em>Spam Checker</em><br />Built for Marketers</h1>
        <p>Detect spam keywords, get clean alternatives, score deliverability, and receive a fully rewritten spam-free version — instantly.</p>
      </div>

      {/* PANEL */}
      <div className="sc-panel">

        {/* LEFT */}
        <div className="sc-card">
          <div className="sc-card-label">📋 Paste Email Content</div>

          <textarea
            className="sc-textarea"
            placeholder="Paste your email body here…"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />

          <button
            className="sc-analyze-btn"
            onClick={checkSpam}
            disabled={loading}
          >
            {loading
              ? <><div className="sc-spinner" /> Analyzing…</>
              : "🛡 Check Spam Score"
            }
          </button>

          {result && (
            <div className="sc-preview">
              <div className="sc-preview-label">🔍 Highlighted Spam Words</div>
              <div dangerouslySetInnerHTML={{ __html: highlightText() }} />
            </div>
          )}

          {result && (
            <div className="sc-rewrite-section">
              <button
                className="sc-rewrite-toggle"
                onClick={() => setShowRewrite(!showRewrite)}
              >
                {showRewrite ? "▲ Hide Rewrite" : "✨ Show Spam-Free Rewrite"}
              </button>
              {showRewrite && (
                <div className="sc-rewrite-box">
                  <div className="sc-preview-label">✨ Cleaned Version</div>
                  <p className="sc-rewrite-text">{result.rewrittenContent}</p>
                  <button className="sc-copy-btn" onClick={handleCopy}>
                    {copied ? "✅ Copied!" : "📋 Copy to Clipboard"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="sc-card">
          <div className="sc-card-label">📊 Analysis Results</div>

          {!result ? (
            <div className="sc-empty">
              <div className="sc-empty-icon">🛡</div>
              <p>Paste your email and click<br /><strong>Check Spam Score</strong> for full analysis.</p>
            </div>
          ) : (
            <>
              {/* Score hero */}
              <div className="sc-score-hero">
                <div className={`sc-score-ring ${scoreClass(result.overallScore)}`}>
                  <span className="sc-score-num">{result.overallScore}</span>
                  <span className="sc-score-label-sm">/ 100</span>
                </div>
                <div className="sc-score-meta">
                  <div className="sc-badge-row">
                    <span className="sc-meta-label">Grade</span>
                    <span className={`sc-grade-badge ${scoreClass(result.overallScore)}`}>{result.grade}</span>
                  </div>
                  <div className="sc-badge-row">
                    <span className="sc-meta-label">Verdict</span>
                    <span className={`sc-verdict-badge ${verdictClass(result.verdict)}`}>{result.verdict}</span>
                  </div>
                  <div className="sc-badge-row">
                    <span className="sc-meta-label">Tone</span>
                    <span className="sc-sentiment-badge">{result.sentiment}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="sc-tabs">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    className={`sc-tab ${activeTab === t.id ? "active" : ""}`}
                    onClick={() => setActiveTab(t.id)}
                  >
                    {t.label}
                    {t.id === "keywords" && result.spamKeywords?.length > 0 && (
                      <span className="sc-tab-pill sc-pill-red">{result.spamKeywords.length}</span>
                    )}
                    {t.id === "issues" && result.issues?.length > 0 && (
                      <span className="sc-tab-pill sc-pill-amber">{result.issues.length}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* OVERVIEW */}
              {activeTab === "overview" && (
                <div className="sc-tab-content">
                  <div className="sc-stat-grid">
                    <div className="sc-stat-chip">
                      <div className="sc-stat-val">{result.wordCount}</div>
                      <div className="sc-stat-lbl">Words</div>
                    </div>
                    <div className="sc-stat-chip">
                      <div className="sc-stat-val">{result.sentenceCount}</div>
                      <div className="sc-stat-lbl">Sentences</div>
                    </div>
                    <div className="sc-stat-chip">
                      <div className="sc-stat-val sc-stat-val-sm">{result.readTime}</div>
                      <div className="sc-stat-lbl">Read Time</div>
                    </div>
                    <div className="sc-stat-chip">
                      <div className={`sc-stat-val ${scoreClass(result.deliverabilityScore)}`}>{result.deliverabilityScore}</div>
                      <div className="sc-stat-lbl">Deliverability</div>
                    </div>
                  </div>

                  <div className="sc-bar-group">
                    <div className="sc-bar-row">
                      <span className="sc-bar-lbl">📖 Readability</span>
                      <div className="sc-bar-bg">
                        <div className="sc-bar-fill bar-read" style={{ width: `${result.readabilityScore}%` }} />
                      </div>
                      <span className="sc-bar-val">{result.readabilityLevel}</span>
                    </div>
                    <div className="sc-bar-row">
                      <span className="sc-bar-lbl">😊 Sentiment</span>
                      <div className="sc-bar-bg">
                        <div className="sc-bar-fill bar-sentiment" style={{ width: `${result.sentimentScore}%` }} />
                      </div>
                      <span className="sc-bar-val">{result.sentimentScore}/100</span>
                    </div>
                    <div className="sc-bar-row">
                      <span className="sc-bar-lbl">📬 Delivery</span>
                      <div className="sc-bar-bg">
                        <div className={`sc-bar-fill ${scoreClass(result.deliverabilityScore) === "grade-good" ? "bar-deliv-good" : scoreClass(result.deliverabilityScore) === "grade-mid" ? "bar-deliv-mid" : "bar-deliv-bad"}`} style={{ width: `${result.deliverabilityScore}%` }} />
                      </div>
                      <span className="sc-bar-val">{result.deliverabilityScore}/100</span>
                    </div>
                  </div>

                  {result.strengths?.length > 0 && (
                    <>
                      <div className="sc-section-title">✅ Strengths</div>
                      {result.strengths.map((s, i) => (
                        <div key={i} className="sc-strength-row">
                          <span className="sc-strength-icon">✦</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* KEYWORDS */}
              {activeTab === "keywords" && (
                <div className="sc-tab-content">
                  {result.spamKeywords.length === 0 ? (
                    <div className="sc-all-clear">
                      <span className="sc-all-clear-icon">🎉</span>
                      <p>No spam keywords found! Your email looks clean.</p>
                    </div>
                  ) : (
                    <>
                      <div className="sc-section-title">🚨 {result.spamKeywords.length} Spam Keywords Detected</div>
                      <div className="sc-keyword-list">
                        {result.spamKeywords.map((kw, i) => (
                          <div key={i} className="sc-keyword-card">
                            <div className="sc-keyword-top">
                              <span className="sc-kw-bad">{kw.word}</span>
                              <span className="sc-kw-arrow">→</span>
                              <span className="sc-kw-good">{kw.replacement}</span>
                            </div>
                            <p className="sc-kw-reason">{kw.reason}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* METRICS */}
              {activeTab === "metrics" && (
                <div className="sc-tab-content">
                  <div className="sc-section-title">📈 Spam Category Scores</div>
                  {Object.entries(result.categories).map(([key, val]) => {
                    const meta = categoryMeta[key] || { icon: "•", label: key, barClass: "bar-default" };
                    const pct = Math.min(val * 10, 100);
                    return (
                      <div key={key} className="sc-cat-row">
                        <span className="sc-cat-icon">{meta.icon}</span>
                        <span className="sc-cat-label">{meta.label}</span>
                        <div className="sc-cat-bar-bg">
                          <div className={`sc-cat-bar-fill ${meta.barClass}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="sc-cat-val">{val}/10</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ISSUES */}
              {activeTab === "issues" && (
                <div className="sc-tab-content">
                  {result.issues.length === 0 ? (
                    <div className="sc-all-clear">
                      <span className="sc-all-clear-icon">✅</span>
                      <p>No issues detected. Your email is in great shape!</p>
                    </div>
                  ) : (
                    <>
                      <div className="sc-section-title">⚠ {result.issues.length} Issue{result.issues.length !== 1 ? "s" : ""} Detected</div>
                      {result.issues.map((issue, i) => (
                        <div key={i} className={`sc-issue-row issue-${issue.type}`}>
                          <span className="sc-issue-icon">{issueIcon(issue.type)}</span>
                          <span className="sc-issue-msg">{issue.message}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpamChecker;
