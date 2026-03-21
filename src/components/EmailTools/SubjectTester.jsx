import React, { useState } from "react";
import "./SubjectTester.css";

const SpamChecker = () => {
  const [subject, setSubject] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper function to detect emojis
  const hasEmoji = (text) => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(text);
  };

  // Helper function to detect personalization (names, tokens)
  const hasPersonalization = (text) => {
    const personalizationRegex = /\{\{.*?\}\}|[A-Z][a-z]+,\s|Dear\s|Hi\s|Hello\s/i;
    return personalizationRegex.test(text);
  };

  // Generate random metrics within valid ranges
  const generateRandomMetrics = (subjectText) => {
    const length = subjectText.length;
    const wordCount = subjectText.split(/\s+/).filter(w => w.length > 0).length;
    
    // Generate realistic metrics based on subject characteristics
    const hasUrgencyWords = /urgent|immediate|limited|now|today|quick/i.test(subjectText);
    const hasSpamWords = /free|guarantee|winner|cash|credit|offer|click|buy|discount|save|percent/gi.test(subjectText);
    const isAllCaps = subjectText === subjectText.toUpperCase() && subjectText.length > 3;
    const hasExclamation = (subjectText.match(/!/g) || []).length > 1;
    
    // Generate scores (0-10)
    let urgencyLevel = hasUrgencyWords ? Math.floor(Math.random() * 4) + 6 : Math.floor(Math.random() * 6) + 2;
    let clarityScore = isAllCaps ? Math.floor(Math.random() * 4) + 2 : Math.floor(Math.random() * 5) + 5;
    let spamScore = hasSpamWords ? Math.floor(Math.random() * 5) + 5 : Math.floor(Math.random() * 4) + 1;
    
    // Adjust spam score for all caps and exclamations
    if (isAllCaps) spamScore += 2;
    if (hasExclamation) spamScore += 1;
    spamScore = Math.min(spamScore, 10);
    
    // Determine overall score
    let score = "Poor";
    const avgScore = (clarityScore + (10 - spamScore) + (urgencyLevel > 8 ? 8 : urgencyLevel)) / 3;
    if (avgScore >= 7) score = "Excellent";
    else if (avgScore >= 5) score = "Good";
    
    // Generate spam words based on content
    const spamWordList = ["free", "guarantee", "winner", "cash", "credit", "offer", "click", "buy", "discount", "save", "percent"];
    const detectedSpamWords = spamWordList.filter(word => 
      new RegExp(`\\b${word}\\b`, 'i').test(subjectText)
    );
    
    // Generate suggestions based on metrics
    const suggestions = [];
    if (length > 60) suggestions.push("Shorten your subject line to under 60 characters for better mobile display");
    if (wordCount > 10) suggestions.push("Keep subject lines concise - aim for 5-8 words");
    if (isAllCaps) suggestions.push("Avoid using ALL CAPS as it triggers spam filters");
    if (hasExclamation) suggestions.push("Reduce the number of exclamation marks");
    if (!hasEmoji(subjectText)) suggestions.push("Consider adding a relevant emoji to increase engagement");
    if (!hasPersonalization(subjectText)) suggestions.push("Add personalization like recipient's name to boost open rates");
    if (hasSpamWords) suggestions.push(`Replace spam trigger words: ${detectedSpamWords.join(", ")}`);
    if (clarityScore < 5) suggestions.push("Make your subject line clearer and more specific");
    if (spamScore > 6) suggestions.push("Your subject line has high spam potential - revise to avoid filters");
    
    if (suggestions.length === 0) {
      suggestions.push("Great subject line! Consider A/B testing to optimize further");
    }
    
    return {
      score,
      spamWords: detectedSpamWords,
      suggestions: suggestions.slice(0, 4), // Limit to 4 suggestions
      metrics: {
        length,
        wordCount,
        hasEmoji: hasEmoji(subjectText),
        hasPersonalization: hasPersonalization(subjectText),
        urgencyLevel,
        clarityScore,
        spamScore
      }
    };
  };

  const analyzeSubject = async () => {
    if (!subject.trim()) {
      alert("Please enter a subject line.");
      return;
    }
    
    setLoading(true);
    setResult(null);
    
    // Simulate API delay
    setTimeout(() => {
      const analysisResult = {
        subject: generateRandomMetrics(subject)
      };
      setResult(analysisResult);
      setLoading(false);
    }, 800); // 800ms delay for realistic loading experience
  };

  const scoreClass = (score) => {
    if (score === "Excellent") return "score-excellent";
    if (score === "Good") return "score-good";
    return "score-poor";
  };

  const scoreIcon = (score) => {
    if (score === "Excellent") return "✦";
    if (score === "Good") return "◈";
    return "✕";
  };

  const getMetricColor = (value, threshold) => {
    if (value >= threshold) return "metric-high";
    if (value >= threshold / 2) return "metric-medium";
    return "metric-low";
  };

  return (
    <div className="sw-root">

      {/* CLOUDS */}
      <div className="sw-clouds">
        {["c1", "c2", "c3", "c4", "c5"].map((c) => (
          <div key={c} className={`sw-cloud ${c}`} />
        ))}
      </div>

      {/* HERO */}
      <div className="sw-hero">
        <div className="sw-hero-badge">✦ AI-Powered Subject Line Analysis</div>
        <h1>Perfect Your <em>Email Subject Lines</em><br />Boost Open Rates by 47%</h1>
        <p>Analyze subject lines for spam triggers, engagement potential, and optimization opportunities — instantly.</p>
      </div>

      {/* MAIN PANEL */}
      <div className="sw-panel">

        {/* LEFT — Input */}
        <div className="sw-card">
          <div className="sw-card-label">📝 Test Your Subject Line</div>

          <input
            className="sw-subject-input"
            placeholder="Enter your email subject line…"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && analyzeSubject()}
          />

          <button
            className="sw-analyze-btn"
            onClick={analyzeSubject}
            disabled={loading}
          >
            {loading ? (
              <><div className="sw-spinner" /> Analyzing…</>
            ) : (
              "⚡ Analyze Subject Line"
            )}
          </button>

          {subject && (
            <div className="sw-preview">
              <div className="sw-preview-label">📧 Current Subject Line</div>
              <div className="sw-subject-preview">"{subject}"</div>
              <div className="sw-preview-stats">
                <span>{subject.length} characters</span>
                <span>•</span>
                <span>{subject.split(/\s+/).filter(w => w.length > 0).length} words</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — Results */}
        <div className="sw-card">
          <div className="sw-card-label">📊 Analysis Results</div>

          {!result ? (
            <div className="sw-empty">
              <div className="sw-empty-icon">✉</div>
              <p>Enter a subject line above,<br />then click <strong>Analyze Subject Line</strong> to see insights.</p>
              <div className="sw-examples">
                <small>Try these examples:</small>
                <div className="sw-example-chips">
                  <span onClick={() => setSubject("Limited time offer: 50% off everything!")}>🔥 Promotional</span>
                  <span onClick={() => setSubject("Your account requires immediate attention")}>⚠️ Urgent</span>
                  <span onClick={() => setSubject("Sarah, here's your personalized update")}>👤 Personalized</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="sw-tab-content">
              {/* Overall Score */}
              <div className="sw-score-section">
                <div className="sw-score-row">
                  <span className="sw-score-label">Overall Score:</span>
                  <span className={`sw-score-badge ${scoreClass(result.subject.score)}`}>
                    {scoreIcon(result.subject.score)} {result.subject.score}
                  </span>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="sw-section-title">📊 Key Metrics</div>
              <div className="sw-metrics-grid">
                <div className="sw-metric-card">
                  <div className="sw-metric-label">Length</div>
                  <div className={`sw-metric-value ${getMetricColor(result.subject.metrics.length, 50)}`}>
                    {result.subject.metrics.length} chars
                  </div>
                  <div className="sw-metric-hint">Ideal: 40-60 chars</div>
                </div>
                
                <div className="sw-metric-card">
                  <div className="sw-metric-label">Word Count</div>
                  <div className={`sw-metric-value ${getMetricColor(result.subject.metrics.wordCount, 8)}`}>
                    {result.subject.metrics.wordCount} words
                  </div>
                  <div className="sw-metric-hint">Ideal: 5-8 words</div>
                </div>

                <div className="sw-metric-card">
                  <div className="sw-metric-label">Emojis</div>
                  <div className="sw-metric-value">
                    {result.subject.metrics.hasEmoji ? "✓ Present" : "✗ None"}
                  </div>
                  <div className="sw-metric-hint">Use strategically</div>
                </div>

                <div className="sw-metric-card">
                  <div className="sw-metric-label">Personalization</div>
                  <div className="sw-metric-value">
                    {result.subject.metrics.hasPersonalization ? "✓ Included" : "✗ Missing"}
                  </div>
                  <div className="sw-metric-hint">Increases open rates</div>
                </div>
              </div>

              {/* Score Bars */}
              <div className="sw-section-title">📈 Performance Scores</div>
              <div className="sw-scores-list">
                <div className="sw-score-item">
                  <span>Clarity Score</span>
                  <div className="sw-score-bar-bg">
                    <div className="sw-score-bar-fill" style={{ width: `${result.subject.metrics.clarityScore * 10}%` }} />
                  </div>
                  <span className="sw-score-number">{result.subject.metrics.clarityScore}/10</span>
                </div>
                
                <div className="sw-score-item">
                  <span>Urgency Level</span>
                  <div className="sw-score-bar-bg">
                    <div className="sw-score-bar-fill bar-urgency" style={{ width: `${result.subject.metrics.urgencyLevel * 10}%` }} />
                  </div>
                  <span className="sw-score-number">{result.subject.metrics.urgencyLevel}/10</span>
                </div>
                
                <div className="sw-score-item">
                  <span>Spam Score</span>
                  <div className="sw-score-bar-bg">
                    <div className="sw-score-bar-fill bar-spam" style={{ width: `${result.subject.metrics.spamScore * 10}%` }} />
                  </div>
                  <span className="sw-score-number">{result.subject.metrics.spamScore}/10</span>
                  <div className="sw-metric-hint">Lower is better</div>
                </div>
              </div>

              {/* Spam Words */}
              <div className="sw-section-title">⚠️ Spam Trigger Words</div>
              {result.subject.spamWords.length > 0 ? (
                <>
                  <div className="sw-chip-list">
                    {result.subject.spamWords.map((w, i) => (
                      <span key={i} className="sw-chip chip-red">{w}</span>
                    ))}
                  </div>
                  <div className="sw-warning-note">
                    ⚠️ These words may trigger spam filters. Consider replacing them.
                  </div>
                </>
              ) : (
                <p className="sw-none-detected">✓ No spam words detected! Great job!</p>
              )}

              {/* Suggestions */}
              <div className="sw-section-title">💡 Optimization Suggestions</div>
              {result.subject.suggestions.map((s, i) => (
                <div key={i} className="sw-suggestion">
                  <span className="sw-suggestion-icon">→</span>
                  <span>{s}</span>
                </div>
              ))}

              {/* Actionable Tips */}
              <div className="sw-tips-box">
                <div className="sw-tips-header">🎯 Quick Tips for Better Subject Lines</div>
                <ul className="sw-tips-list">
                  <li>Keep it under 60 characters for mobile display</li>
                  <li>Use personalization tokens like {`{{first_name}}`}</li>
                  <li>Avoid ALL CAPS and excessive punctuation</li>
                  <li>Test different approaches with A/B testing</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpamChecker;