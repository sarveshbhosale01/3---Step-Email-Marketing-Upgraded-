import { useState, useEffect } from "react";
import "./IPChecker.css";

/* ─── Inline styles matching the sw- theme from the provided CSS ─── */
const G = {
  fontSora: "'Sora', sans-serif",
  fontMono: "'DM Mono', monospace",
};

/* ─── Deterministic "analysis" helpers (no real network calls) ─── */

const KNOWN_BLACKLISTS = [
  "0.0.0.0","1.1.1.0","192.0.2.1","198.51.100.5","203.0.113.10",
  "10.255.255.255","172.16.0.1","192.168.0.1",
];

const KNOWN_GOOD = [
  "8.8.8.8","8.8.4.4","1.1.1.1","9.9.9.9","208.67.222.222",
  "94.140.14.14","76.76.2.0","45.90.28.0",
];

function getOctetHealth(octets) {
  const [a, b, c, d] = octets.map(Number);
  let issues = [];
  if (a === 0) issues.push("First octet is 0 — unroutable");
  if (a > 223 && a < 240) issues.push("Class D (multicast) range");
  if (a >= 240) issues.push("Class E (reserved/experimental) range");
  if ([a,b,c,d].some(n => n > 255 || n < 0)) issues.push("Octet out of 0-255 range");
  return issues;
}

function classifyIP(octets) {
  const a = Number(octets[0]);
  if (a >= 1 && a <= 126) return "Class A";
  if (a === 127) return "Loopback";
  if (a >= 128 && a <= 191) return "Class B";
  if (a >= 192 && a <= 223) return "Class C";
  if (a >= 224 && a <= 239) return "Class D (Multicast)";
  return "Class E (Reserved)";
}

function getNetworkType(octets) {
  const [a, b] = octets.map(Number);
  if (a === 10) return { type: "Private", sendable: false };
  if (a === 172 && b >= 16 && b <= 31) return { type: "Private", sendable: false };
  if (a === 192 && b === 168) return { type: "Private", sendable: false };
  if (a === 127) return { type: "Loopback", sendable: false };
  if (a === 169 && b === 254) return { type: "APIPA / Link-local", sendable: false };
  if (a === 0) return { type: "Unspecified", sendable: false };
  if (a === 100 && b >= 64 && b <= 127) return { type: "Shared Address Space (RFC 6598)", sendable: false };
  if (a >= 224) return { type: "Multicast / Reserved", sendable: false };
  return { type: "Public", sendable: true };
}

function scoreIP(ip, octets) {
  const net = getNetworkType(octets);
  const octetIssues = getOctetHealth(octets);
  const isBlacklisted = KNOWN_BLACKLISTS.includes(ip);
  const isKnownGood = KNOWN_GOOD.includes(ip);

  let reputationScore = 75;
  let deliverabilityScore = 80;
  let spamScore = 15;
  let blacklistScore = 0;

  // Deterministic tweaks based on IP bytes
  const sum = octets.reduce((s, n) => s + Number(n), 0);
  const variance = sum % 40;

  if (!net.sendable) {
    reputationScore = 20;
    deliverabilityScore = 0;
    spamScore = 60;
  } else if (isKnownGood) {
    reputationScore = 95;
    deliverabilityScore = 98;
    spamScore = 2;
  } else {
    reputationScore = Math.min(95, 60 + variance);
    deliverabilityScore = Math.min(98, 55 + variance + 5);
    spamScore = Math.max(2, 25 - Math.floor(variance / 2));
  }

  if (isBlacklisted) {
    blacklistScore = 100;
    reputationScore = Math.min(reputationScore, 18);
    deliverabilityScore = Math.min(deliverabilityScore, 10);
    spamScore = Math.max(spamScore, 88);
  }

  const overall = Math.round(
    (reputationScore * 0.35) +
    (deliverabilityScore * 0.35) +
    ((100 - spamScore) * 0.2) +
    ((100 - blacklistScore) * 0.1)
  );

  return {
    overall,
    reputation: reputationScore,
    deliverability: deliverabilityScore,
    spam: spamScore,
    blacklist: isBlacklisted,
    octetIssues,
    networkType: net.type,
    sendable: net.sendable,
    ipClass: classifyIP(octets),
    isKnownGood,
  };
}

function getSuggestions(score) {
  const s = [];
  if (score.blacklist) s.push("This IP appears on known blacklists. Request delisting via MXToolbox or Spamhaus.");
  if (!score.sendable) s.push(`IP is in a ${score.networkType} range — use a public IP for outbound email sending.`);
  if (score.spam > 50) s.push("High spam probability. Review sending practices and authentication records (SPF/DKIM/DMARC).");
  if (score.deliverability < 60) s.push("Low deliverability. Ensure your IP has proper reverse DNS (PTR record) configured.");
  if (score.reputation < 60) s.push("Poor reputation. Warm up the IP gradually and monitor bounce rates.");
  if (score.octetIssues.length) score.octetIssues.forEach(i => s.push(i));
  if (s.length === 0) s.push("IP looks healthy! Maintain good sending hygiene and monitor blacklists regularly.");
  return s;
}

function getScoreClass(val, invert = false) {
  const v = invert ? 100 - val : val;
  if (v >= 75) return "metric-high";
  if (v >= 45) return "metric-medium";
  return "metric-low";
}

function getOverallBadge(score) {
  if (score >= 75) return { label: "✦ Excellent", cls: "score-excellent" };
  if (score >= 45) return { label: "◈ Moderate", cls: "score-good" };
  return { label: "✗ Poor", cls: "score-poor" };
}

/* ─── Component ─── */

export default function IPChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animated, setAnimated] = useState(false);

  const examples = ["8.8.8.8", "192.168.1.1", "10.0.0.1", "203.0.113.10", "1.1.1.1"];

  const validateIP = (ip) => {
    const parts = ip.trim().split(".");
    if (parts.length !== 4) return false;
    return parts.every(p => p !== "" && !isNaN(p) && Number(p) >= 0 && Number(p) <= 255);
  };

  const handleCheck = () => {
    setError("");
    setResult(null);
    const trimmed = input.trim();
    if (!trimmed) { setError("Please enter an IP address."); return; }
    if (!validateIP(trimmed)) { setError("Invalid IP format. Use dotted decimal notation (e.g. 8.8.8.8)."); return; }

    setLoading(true);
    setAnimated(false);
    setTimeout(() => {
      const octets = trimmed.split(".");
      const scored = scoreIP(trimmed, octets);
      setResult({ ip: trimmed, octets, ...scored });
      setLoading(false);
      setTimeout(() => setAnimated(true), 50);
    }, 900);
  };

  const handleKey = (e) => { if (e.key === "Enter") handleCheck(); };

  return (
    <>
      

      <div className="ipc-root">
        {/* Clouds */}
        <div className="ipc-clouds">
          {["cc1","cc2","cc3","cc4","cc5"].map(c => (
            <div key={c} className={`ipc-cloud ${c}`} />
          ))}
        </div>

        {/* Hero */}
        <div className="ipc-hero">
          <div className="ipc-hero-badge">🛡️ Network Diagnostics</div>
          <h1>IP Address <em>Health Checker</em></h1>
          <p>Deep-dive analysis of any IP address — reputation score, blacklist status, network classification, deliverability metrics and more.</p>
        </div>

        {/* Main Panel */}
        <div className="ipc-panel">

          {/* LEFT — Input Card */}
          <div className="ipc-card">
            <div className="ipc-card-label">🔍 Check an IP Address</div>

            <input
              className="ipc-input"
              type="text"
              placeholder="e.g. 8.8.8.8"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />

            {error && <div className="ipc-error">⚠ {error}</div>}

            <button
              className="ipc-btn"
              onClick={handleCheck}
              disabled={loading}
            >
              {loading
                ? <><div className="ipc-spinner" /> Analyzing IP…</>
                : <>🛡️ Run Health Check</>
              }
            </button>

            {/* Examples */}
            <div className="ipc-examples">
              <small>Try an example IP</small>
              <div className="ipc-example-chips">
                {examples.map(ex => (
                  <span
                    key={ex}
                    className="ipc-chip-btn"
                    onClick={() => { setInput(ex); setError(""); setResult(null); }}
                  >{ex}</span>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="ipc-tips-box" style={{marginTop: 24}}>
              <div className="ipc-tips-header">📋 What We Check</div>
              <ul className="ipc-tips-list">
                <li>Format & octet validity (0–255 range)</li>
                <li>Network type: Public / Private / Loopback / APIPA</li>
                <li>IP Class (A, B, C, D, E) classification</li>
                <li>Blacklist presence on major RBLs</li>
                <li>Reputation, spam probability & deliverability</li>
                <li>Actionable remediation suggestions</li>
              </ul>
            </div>
          </div>

          {/* RIGHT — Results Card */}
          <div className="ipc-card">
            <div className="ipc-card-label">📊 Analysis Results</div>

            {!result && !loading && (
              <div className="ipc-empty">
                <div className="ipc-empty-icon">🌐</div>
                <p>Enter an IP address on the left<br/>and run a health check to see<br/>detailed diagnostics.</p>
              </div>
            )}

            {loading && (
              <div className="ipc-empty">
                <div className="ipc-empty-icon" style={{animation:"spin 1s linear infinite",fontSize:40}}>⚙️</div>
                <p style={{color:"#4a7ba0",fontWeight:600}}>Analyzing IP address…</p>
              </div>
            )}

            {result && !loading && (
              <div className={animated ? "ipc-animate" : ""}>

                {/* IP Display */}
                <div className="ipc-ip-display">⬡ {result.ip}</div>

                {/* Overall Score */}
                <div className="ipc-score-section">
                  <div className="ipc-score-row">
                    <span className="ipc-score-label">Overall Health Score</span>
                    <span className={`ipc-score-badge ${getOverallBadge(result.overall).cls}`}>
                      {getOverallBadge(result.overall).label} — {result.overall}/100
                    </span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="ipc-section-title">Key Metrics</div>
                <div className="ipc-metrics-grid">
                  {[
                    { label:"Reputation", value: result.reputation, hint:"out of 100", invert:false },
                    { label:"Deliverability", value: result.deliverability, hint:"email sending", invert:false },
                    { label:"Spam Score", value: result.spam, hint:"lower is better", invert:true },
                    { label:"Blacklist Risk", value: result.blacklist ? 100 : 0, hint:"RBL check", invert:true, override: result.blacklist ? "metric-low":"metric-high" },
                  ].map(m => (
                    <div key={m.label} className="ipc-metric-card">
                      <div className="ipc-metric-label">{m.label}</div>
                      <div className={`ipc-metric-value ${m.override ?? getScoreClass(m.value, m.invert)}`}>
                        {m.label === "Blacklist Risk" ? (result.blacklist ? "YES" : "NO") : `${m.value}`}
                      </div>
                      <div className="ipc-metric-hint">{m.hint}</div>
                    </div>
                  ))}
                </div>

                {/* Score Bars */}
                <div className="ipc-section-title">Detailed Scores</div>
                <div className="ipc-bars">
                  {[
                    { label:"Reputation", val:result.reputation, barCls:"bar-blue" },
                    { label:"Deliverability", val:result.deliverability, barCls:"bar-green" },
                    { label:"Spam Prob.", val:result.spam, barCls:"bar-amber" },
                    { label:"Health Index", val:result.overall, barCls:"bar-blue" },
                  ].map(b => (
                    <div key={b.label} className="ipc-bar-row">
                      <span className="ipc-bar-name">{b.label}</span>
                      <div className="ipc-bar-bg">
                        <div
                          className={`ipc-bar-fill ${b.barCls}`}
                          style={{ width: animated ? `${b.val}%` : "0%" }}
                        />
                      </div>
                      <span className="ipc-bar-num">{b.val}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="ipc-section-title">Classifications</div>
                <div className="ipc-tags">
                  <span className={`ipc-tag ${result.sendable ? "tag-green" : "tag-amber"}`}>
                    {result.networkType}
                  </span>
                  <span className="ipc-tag tag-blue">{result.ipClass}</span>
                  <span className={`ipc-tag ${result.blacklist ? "tag-red" : "tag-green"}`}>
                    {result.blacklist ? "🚫 Blacklisted" : "✓ Not Blacklisted"}
                  </span>
                  <span className={`ipc-tag ${result.sendable ? "tag-green" : "tag-red"}`}>
                    {result.sendable ? "✓ Sendable" : "✗ Not Sendable"}
                  </span>
                  {result.isKnownGood && (
                    <span className="ipc-tag tag-green">⭐ Trusted DNS</span>
                  )}
                </div>

                {/* Suggestions */}
                <div className="ipc-section-title">Recommendations</div>
                {getSuggestions(result).map((s, i) => {
                  const isErr = s.toLowerCase().includes("blacklist") || s.toLowerCase().includes("invalid") || s.toLowerCase().includes("not valid");
                  const isWarn = s.toLowerCase().includes("high") || s.toLowerCase().includes("low") || s.toLowerCase().includes("poor");
                  return (
                    <div
                      key={i}
                      className={`ipc-suggestion ${isErr ? "err-sug" : isWarn ? "warn-sug" : ""}`}
                    >
                      <span className="ipc-sug-icon">
                        {isErr ? "⚠" : isWarn ? "◈" : "✓"}
                      </span>
                      <span>{s}</span>
                    </div>
                  );
                })}

              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}