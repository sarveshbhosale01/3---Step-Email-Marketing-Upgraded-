import { useState, useEffect } from "react";
import "./WarmupPlanner.css";

const STRATEGY_CONFIG = {
  Conservative: { growth: 1.2, color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.3)", icon: "🐢", desc: "Slower & safer ramp-up" },
  Recommended:  { growth: 1.5, color: "#2f80ed", bg: "rgba(47,128,237,0.08)", border: "rgba(47,128,237,0.3)", icon: "⚖️", desc: "Balanced approach" },
  Aggressive:   { growth: 2.0, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.3)", icon: "🚀", desc: "Faster ramp-up" },
};

const HISTORY_MODIFIER  = { "New Domain": 0.6,  "Established Domain": 1.0, "Aged Domain (2+ yrs)": 1.3 };
const REPUTE_MODIFIER   = { "Unknown Reputation": 0.9, "Good Reputation": 1.2, "Poor Reputation": 0.5 };
const INBOX_RISK_LABEL  = (r) => r >= 80 ? ["Healthy","metric-high"] : r >= 55 ? ["Moderate","metric-medium"] : ["At Risk","metric-low"];

function buildPlan(volume, inboxRate, history, reputation, strategy, days) {
  const cfg = STRATEGY_CONFIG[strategy];
  const hMod = HISTORY_MODIFIER[history] ?? 1;
  const rMod = REPUTE_MODIFIER[reputation] ?? 1;
  const startVol = Math.max(5, Math.round(10 * hMod * rMod));
  let current = startVol;
  const plan = [];
  for (let day = 1; day <= days; day++) {
    const send = Math.min(Math.round(current), Number(volume));
    const inboxed = Math.round(send * (inboxRate / 100));
    const spamRisk = Math.max(0, Math.min(100, Math.round(100 - inboxRate - (day / days) * 15)));
    plan.push({ day, send, inboxed, spamRisk });
    current = current * cfg.growth;
    if (current > volume) current = volume;
  }
  return plan;
}

function getOverallScore(inboxRate, reputation, history) {
  let s = inboxRate;
  if (reputation === "Good Reputation") s = Math.min(100, s + 10);
  if (reputation === "Poor Reputation") s = Math.max(0, s - 20);
  if (history === "New Domain") s = Math.max(0, s - 10);
  if (history === "Aged Domain (2+ yrs)") s = Math.min(100, s + 5);
  return Math.round(s);
}

export default function WarmupPlanner() {
  const [volume,     setVolume]     = useState(500);
  const [inboxRate,  setInboxRate]  = useState(80);
  const [history,    setHistory]    = useState("Established Domain");
  const [reputation, setReputation] = useState("Unknown Reputation");
  const [strategy,   setStrategy]   = useState("Recommended");
  const [days,       setDays]       = useState(14);
  const [plan,       setPlan]       = useState([]);
  const [animated,   setAnimated]   = useState(false);
  const [activeTab,  setActiveTab]  = useState("table"); // table | chart

  const generate = () => {
    const p = buildPlan(volume, inboxRate, history, reputation, strategy, days);
    setPlan(p);
    setAnimated(false);
    setTimeout(() => setAnimated(true), 60);
  };

  // Auto-generate on mount
  useEffect(() => { generate(); }, []);

  const overallScore = getOverallScore(inboxRate, reputation, history);
  const [riskLabel, riskCls] = INBOX_RISK_LABEL(inboxRate);
  const cfg = STRATEGY_CONFIG[strategy];
  const totalEmails = plan.reduce((s, r) => s + r.send, 0);
  const avgInboxed  = plan.length ? Math.round(plan.reduce((s, r) => s + r.inboxed, 0) / plan.length) : 0;
  const maxBar      = plan.length ? Math.max(...plan.map(r => r.send)) : 1;

  const exportCSV = () => {
    const rows = ["Day,Emails to Send,Estimated Inboxed,Spam Risk %",
      ...plan.map(r => `Day ${r.day},${r.send},${r.inboxed},${r.spamRisk}%`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "warmup-plan.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>


      <div className="wp-root">
        {/* Clouds */}
        <div className="wp-clouds">
          {["wc1","wc2","wc3","wc4","wc5"].map(c => (
            <div key={c} className={`wp-cloud ${c}`} />
          ))}
        </div>

        {/* Hero */}
        <div className="wp-hero">
          <div className="wp-hero-badge">🔥 Email Warm-up</div>
          <h1>IP & Domain <em>Warmup Planner</em></h1>
          <p>Build a safe sending schedule tailored to your domain age, reputation and target volume — and export it as a CSV.</p>
        </div>

        {/* Layout */}
        <div className="wp-layout">

          {/* ── LEFT: Config ── */}
          <div style={{display:"flex",flexDirection:"column",gap:20}}>

            {/* Inputs */}
            <div className="wp-card">
              <div className="wp-card-label">⚙️ Configuration</div>

              {/* Daily Volume */}
              <div className="wp-field">
                <div className="wp-label">
                  Daily Email Volume
                  <span>{Number(volume).toLocaleString()} emails/day</span>
                </div>
                <input
                  className="wp-input"
                  type="number" min="10" max="100000"
                  value={volume}
                  onChange={e => setVolume(e.target.value)}
                />
              </div>

              {/* Inboxing Rate */}
              <div className="wp-field">
                <div className="wp-label">
                  Current Inboxing Rate
                  <span style={{color: inboxRate >= 80 ? "#22c55e" : inboxRate >= 55 ? "#f59e0b" : "#ef4444"}}>
                    {inboxRate}%
                  </span>
                </div>
                <input
                  className="wp-range"
                  type="range" min="0" max="100"
                  value={inboxRate}
                  onChange={e => setInboxRate(Number(e.target.value))}
                />
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#9dbdd4",marginTop:3}}>
                  <span>0% (All Spam)</span><span>50%</span><span>100% (All Inbox)</span>
                </div>
              </div>

              {/* Duration */}
              <div className="wp-field">
                <div className="wp-label">
                  Warmup Duration
                  <span>{days} days</span>
                </div>
                <input
                  className="wp-range"
                  type="range" min="7" max="30"
                  value={days}
                  onChange={e => setDays(Number(e.target.value))}
                />
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#9dbdd4",marginTop:3}}>
                  <span>7 days</span><span>~2 weeks</span><span>30 days</span>
                </div>
              </div>

              {/* History */}
              <div className="wp-field">
                <div className="wp-label">Domain Sending History</div>
                <select className="wp-select" value={history} onChange={e => setHistory(e.target.value)}>
                  <option>New Domain</option>
                  <option>Established Domain</option>
                  <option>Aged Domain (2+ yrs)</option>
                </select>
              </div>

              {/* Reputation */}
              <div className="wp-field">
                <div className="wp-label">Domain Reputation</div>
                <select className="wp-select" value={reputation} onChange={e => setReputation(e.target.value)}>
                  <option>Unknown Reputation</option>
                  <option>Good Reputation</option>
                  <option>Poor Reputation</option>
                </select>
              </div>

              {/* Strategy */}
              <div className="wp-field">
                <div className="wp-label" style={{marginBottom:8}}>Warmup Strategy</div>
                <div className="wp-strategy-grid">
                  {Object.entries(STRATEGY_CONFIG).map(([key, val]) => (
                    <div
                      key={key}
                      className="wp-strat-card"
                      onClick={() => setStrategy(key)}
                      style={strategy === key ? {
                        borderColor: val.color,
                        background: val.bg,
                        transform: "translateY(-2px)",
                        boxShadow: `0 4px 12px ${val.bg}`,
                      } : {}}
                    >
                      <div className="wp-strat-icon">{val.icon}</div>
                      <div className="wp-strat-name" style={strategy === key ? {color: val.color} : {}}>
                        {key}
                      </div>
                      <div className="wp-strat-desc">{val.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="wp-btn" onClick={generate}>
                🗓️ Generate Warmup Plan
              </button>
            </div>

            {/* Summary Metrics */}
            {plan.length > 0 && (
              <div className="wp-card">
                <div className="wp-card-label">📊 Plan Summary</div>
                <div className="wp-metrics-grid">
                  {[
                    { label:"Overall Score",   value: overallScore,                         hint:"health index",     cls: overallScore >= 75 ? "metric-high" : overallScore >= 50 ? "metric-medium" : "metric-low" },
                    { label:"Inbox Status",    value: riskLabel,                            hint:"inbox placement",  cls: riskCls },
                    { label:"Total Emails",    value: totalEmails.toLocaleString(),         hint:"over plan period", cls: "metric-high" },
                    { label:"Avg Inboxed/Day", value: avgInboxed.toLocaleString(),          hint:"estimated",        cls: "metric-medium" },
                    { label:"Duration",        value: `${days}d`,                           hint:"warmup window",    cls: "metric-high" },
                    { label:"Strategy",        value: strategy.slice(0,4) + ".",            hint: cfg.desc,          cls: "metric-medium" },
                  ].map(m => (
                    <div key={m.label} className="wp-metric-card">
                      <div className="wp-metric-label">{m.label}</div>
                      <div className={`wp-metric-value ${m.cls}`}>{m.value}</div>
                      <div className="wp-metric-hint">{m.hint}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Plan ── */}
          <div className="wp-card">
            <div className="wp-card-label">🗓️ Warmup Schedule</div>

            {plan.length > 0 && (
              <div className={animated ? "wp-animate" : ""}>

                {/* Tabs */}
                <div className="wp-tabs">
                  {["table","chart"].map(t => (
                    <div
                      key={t}
                      className={`wp-tab${activeTab === t ? " active" : ""}`}
                      onClick={() => setActiveTab(t)}
                    >
                      {t === "table" ? "📋 Schedule Table" : "📊 Volume Chart"}
                    </div>
                  ))}
                </div>

                {/* Table View */}
                {activeTab === "table" && (
                  <div className="wp-table-wrap">
                    <table className="wp-table">
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Send Volume</th>
                          <th>Est. Inboxed</th>
                          <th>Spam Risk</th>
                          <th>Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plan.map(row => (
                          <tr key={row.day}>
                            <td><span className="wp-day-badge">Day {row.day}</span></td>
                            <td><span className="wp-send-num">{row.send.toLocaleString()}</span></td>
                            <td><span className="wp-inboxed">~{row.inboxed.toLocaleString()}</span></td>
                            <td>
                              <span className={row.spamRisk <= 20 ? "wp-spam-low" : row.spamRisk <= 45 ? "wp-spam-mid" : "wp-spam-high"}>
                                {row.spamRisk}%
                              </span>
                            </td>
                            <td className="wp-vol-bar-cell">
                              <div style={{fontSize:10,color:"#4a7ba0",fontFamily:"'DM Mono',monospace"}}>
                                {Math.round((row.send / Number(volume)) * 100)}%
                              </div>
                              <div className="wp-vol-bar-bg">
                                <div
                                  className="wp-vol-bar-fill"
                                  style={{width: animated ? `${(row.send / Number(volume)) * 100}%` : "0%"}}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Chart View */}
                {activeTab === "chart" && (
                  <div className="wp-chart">
                    <div style={{fontSize:11,color:"#6b9fc0",marginBottom:10,paddingLeft:8,fontWeight:600}}>
                      Daily Send Volume — {strategy} Strategy
                    </div>
                    <div className="wp-chart-bars">
                      {plan.map(row => (
                        <div key={row.day} className="wp-chart-col">
                          <div className="wp-chart-bar-wrap">
                            <div
                              className="wp-chart-bar"
                              style={{ height: animated ? `${(row.send / maxBar) * 130}px` : "0px" }}
                              title={`Day ${row.day}: ${row.send.toLocaleString()} emails`}
                            />
                          </div>
                          <div className="wp-chart-label">{row.day}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{fontSize:10,color:"#9dbdd4",textAlign:"center",marginTop:6}}>Day →</div>
                  </div>
                )}

                {/* Export */}
                <button className="wp-export-btn" onClick={exportCSV}>
                  ⬇ Export as CSV
                </button>

                {/* Tips */}
                <div className="wp-tips-box">
                  <div className="wp-tips-header">💡 Warmup Best Practices</div>
                  <ul className="wp-tips-list">
                    <li>Never exceed your daily cap in the first week.</li>
                    <li>Monitor bounce rate — keep it under 2% at all times.</li>
                    <li>Set up SPF, DKIM & DMARC before day one.</li>
                    <li>Engage real recipients early to boost positive signals.</li>
                    <li>Pause and reassess if spam rate climbs above 0.3%.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}