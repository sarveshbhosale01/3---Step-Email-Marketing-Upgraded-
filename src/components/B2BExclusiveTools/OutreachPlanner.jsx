import { useState } from "react";
import "./OutreachPlanner.css";

const CHANNELS = ["Email", "LinkedIn", "Phone", "Twitter"];
const GOALS    = ["Book a Demo", "Get a Reply", "Share Content", "Re-engage"];
const TONES    = ["Professional", "Friendly", "Direct"];

const STEP_TEMPLATES = {
  Email: {
    "Book a Demo":   (day, n) => ({ subject: `Quick question for you — Day ${day}`, body: `Following up on my previous message. I'd love to show you what we've built. Would a 20-min demo work this week?` }),
    "Get a Reply":   (day, n) => ({ subject: `Still relevant? (touch ${n})`, body: `Just bumping this up in case it got buried. One question: is this a priority for your team right now?` }),
    "Share Content": (day, n) => ({ subject: `Resource you might find useful`, body: `Sharing a quick guide on a challenge I've seen come up a lot. Hope it's useful — no strings attached.` }),
    "Re-engage":     (day, n) => ({ subject: `Checking back in`, body: `It's been a while. Wanted to see if timing has changed on your end. Happy to reconnect when it works for you.` }),
  },
  LinkedIn: {
    "Book a Demo":   () => ({ subject: "LinkedIn Message", body: `Hi [Name], I noticed your work in [industry] — I think what we're building could be a great fit. Would you be open to a quick call?` }),
    "Get a Reply":   () => ({ subject: "LinkedIn Follow-up", body: `Hey [Name], just wanted to follow up on my last message. Would love to hear your thoughts when you have a moment.` }),
    "Share Content": () => ({ subject: "LinkedIn Share", body: `[Name], I came across this piece and immediately thought of you. Worth 3 minutes: [link]` }),
    "Re-engage":     () => ({ subject: "LinkedIn Re-engage", body: `Hey [Name], it's been a while! I wanted to reconnect and see how things are going at [Company].` }),
  },
  Phone: {
    "Book a Demo":   (day) => ({ subject: "Phone Call", body: `Call script: Introduce yourself → mention a specific insight about their company → ask if they have 20 minutes for a demo this week.` }),
    "Get a Reply":   (day) => ({ subject: "Voicemail", body: `"Hi [Name], this is [Your Name] from [Company]. I sent you a couple of emails — wanted to put a voice to the name. Give me a call back at [number]."` }),
    "Share Content": (day) => ({ subject: "Check-in Call", body: `Reference the content you sent → ask if they had a chance to read it → offer to walk through it together.` }),
    "Re-engage":     (day) => ({ subject: "Re-engagement Call", body: `"Hey [Name], just checking in. I know timing wasn't right before — wanted to see if anything has changed on your end."` }),
  },
  Twitter: {
    "Book a Demo":   () => ({ subject: "Twitter DM", body: `Hey [Name], loved your recent tweet about [topic]. We're building something in that space — mind if I share a quick demo?` }),
    "Get a Reply":   () => ({ subject: "Twitter Mention", body: `@[Handle] Would love your take on this — have you seen [specific challenge] come up in your work?` }),
    "Share Content": () => ({ subject: "Twitter Share", body: `@[Handle] This made me think of your post on [topic]. [link] — curious what you think.` }),
    "Re-engage":     () => ({ subject: "Twitter Re-engage", body: `@[Handle] Your post on [topic] was spot on. Have a quick resource that builds on that idea if you're interested.` }),
  },
};

const CHANNEL_ICONS = { Email:"✉️", LinkedIn:"💼", Phone:"📞", Twitter:"🐦" };
const CHANNEL_COLORS = {
  Email:    { color:"#2f80ed", bg:"rgba(47,128,237,0.1)",    border:"rgba(47,128,237,0.3)"    },
  LinkedIn: { color:"#0a66c2", bg:"rgba(10,102,194,0.1)",    border:"rgba(10,102,194,0.3)"    },
  Phone:    { color:"#22c55e", bg:"rgba(34,197,94,0.1)",     border:"rgba(34,197,94,0.3)"     },
  Twitter:  { color:"#1d9bf0", bg:"rgba(29,155,240,0.1)",    border:"rgba(29,155,240,0.3)"    },
};

const GAP_OPTIONS = [2, 3, 5, 7];

function buildSequence(followUps, gap, goal, tone, channels) {
  const steps = [];
  const chLen = channels.length || 1;
  for (let i = 0; i < followUps; i++) {
    const dayNum = i === 0 ? 1 : (i * gap) + 1;
    const channel = channels[i % chLen] || "Email";
    const tmplSet = STEP_TEMPLATES[channel] || STEP_TEMPLATES["Email"];
    const tmpl = (tmplSet[goal] || tmplSet["Book a Demo"])(dayNum, i + 1);
    steps.push({ step: i + 1, day: dayNum, channel, ...tmpl });
  }
  return steps;
}

export default function OutreachPlanner() {
  const [followUps,   setFollowUps]   = useState(5);
  const [gap,         setGap]         = useState(3);
  const [goal,        setGoal]        = useState("Book a Demo");
  const [tone,        setTone]        = useState("Professional");
  const [channels,    setChannels]    = useState(["Email", "LinkedIn"]);
  const [plan,        setPlan]        = useState([]);
  const [expanded,    setExpanded]    = useState(null);
  const [animated,    setAnimated]    = useState(false);
  const [copied,      setCopied]      = useState(false);

  const toggleChannel = (ch) => {
    setChannels(prev =>
      prev.includes(ch)
        ? prev.length > 1 ? prev.filter(c => c !== ch) : prev
        : [...prev, ch]
    );
  };

  const generate = () => {
    const seq = buildSequence(followUps, gap, goal, tone, channels);
    setPlan(seq);
    setExpanded(null);
    setAnimated(false);
    setTimeout(() => setAnimated(true), 60);
  };

  const exportCSV = () => {
    const rows = ["Step,Day,Channel,Subject,Body",
      ...plan.map(r => `Step ${r.step},Day ${r.day},${r.channel},"${r.subject}","${r.body.replace(/"/g, "'")}"`),
    ];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "outreach-sequence.csv"; a.click();
  };

  const copyAll = () => {
    const text = plan.map(r => `— Step ${r.step} | Day ${r.day} | ${r.channel}\nSubject: ${r.subject}\n${r.body}`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const totalDays = plan.length ? plan[plan.length - 1].day : 0;
  const channelBreakdown = channels.reduce((acc, ch) => {
    acc[ch] = plan.filter(s => s.channel === ch).length;
    return acc;
  }, {});

  return (
    <>
    

      <div className="op-root">
        {/* Clouds */}
        <div className="op-clouds">
          {["oc1","oc2","oc3","oc4","oc5"].map(c => (
            <div key={c} className={`op-cloud ${c}`} />
          ))}
        </div>

        {/* Hero */}
        <div className="op-hero">
          <div className="op-hero-badge">📬 B2B Outreach</div>
          <h1>Outreach <em>Sequence Planner</em></h1>
          <p>Build a multi-channel follow-up sequence tailored to your goal, tone and preferred outreach channels — then export it as a CSV.</p>
        </div>

        <div className="op-layout">

          {/* ── LEFT: Config ── */}
          <div className="op-card">
            <div className="op-card-label">⚙️ Sequence Settings</div>

            {/* Follow-ups */}
            <div className="op-field">
              <div className="op-label">
                Number of Follow-ups
                <span>{followUps} steps</span>
              </div>
              <input className="op-range" type="range" min="2" max="10" value={followUps}
                onChange={e => setFollowUps(Number(e.target.value))} />
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#9dbdd4",marginTop:3}}>
                <span>2</span><span>6</span><span>10</span>
              </div>
            </div>

            {/* Gap */}
            <div className="op-field">
              <div className="op-label">Days Between Steps</div>
              <div className="op-pill-group">
                {GAP_OPTIONS.map(g => (
                  <span key={g} className={`op-pill${gap === g ? " active" : ""}`} onClick={() => setGap(g)}>
                    {g} days
                  </span>
                ))}
              </div>
            </div>

            <div className="op-divider" />

            {/* Goal */}
            <div className="op-field">
              <div className="op-label">Primary Goal</div>
              <div className="op-pill-group">
                {GOALS.map(g => (
                  <span key={g} className={`op-pill${goal === g ? " active" : ""}`} onClick={() => setGoal(g)}>{g}</span>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="op-field" style={{marginTop:10}}>
              <div className="op-label">Tone</div>
              <div className="op-pill-group">
                {TONES.map(t => (
                  <span key={t} className={`op-pill${tone === t ? " active" : ""}`} onClick={() => setTone(t)}>{t}</span>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className="op-field" style={{marginTop:10}}>
              <div className="op-label">Channels <span style={{color:"#9dbdd4",textTransform:"none",fontSize:10}}>(pick multiple)</span></div>
              <div className="op-pill-group">
                {CHANNELS.map(ch => {
                  const cfg = CHANNEL_COLORS[ch];
                  const active = channels.includes(ch);
                  return (
                    <span
                      key={ch}
                      className="op-channel-pill"
                      onClick={() => toggleChannel(ch)}
                      style={active ? { background: cfg.bg, color: cfg.color, borderColor: cfg.border } : {}}
                    >
                      {CHANNEL_ICONS[ch]} {ch}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="op-divider" />

            <button className="op-btn" onClick={generate}>
              🗓️ Generate Sequence
            </button>

            <div className="op-tips-box">
              <div className="op-tips-header">💡 Sequence Tips</div>
              <ul className="op-tips-list">
                <li>3–5 day gaps keep you top of mind without being pushy.</li>
                <li>Mix email + LinkedIn for 2× reply rate vs email alone.</li>
                <li>Always vary your message — never send the same email twice.</li>
                <li>Step 3 (Day ~9) typically has the highest reply rate.</li>
              </ul>
            </div>
          </div>

          {/* ── RIGHT: Results ── */}
          <div className="op-card">
            <div className="op-card-label">📋 Outreach Sequence</div>

            {plan.length === 0 && (
              <div className="op-empty">
                <div className="op-empty-icon">📬</div>
                <p>Configure your sequence settings<br/>on the left and click<br/>Generate Sequence.</p>
              </div>
            )}

            {plan.length > 0 && (
              <div className={animated ? "op-animate" : ""}>

                {/* Metrics */}
                <div className="op-metrics">
                  {[
                    { label:"Steps",      value: plan.length,        hint:"total touchpoints" },
                    { label:"Duration",   value: `${totalDays}d`,    hint:"total sequence days" },
                    { label:"Gap",        value: `${gap}d`,          hint:"between each step" },
                    { label:"Goal",       value: goal.split(" ")[0], hint: goal },
                    { label:"Channels",   value: channels.length,    hint: channels.join(", ") },
                    { label:"Tone",       value: tone.slice(0,4)+".", hint: tone },
                  ].map(m => (
                    <div key={m.label} className="op-metric" title={m.hint}>
                      <div className="op-metric-label">{m.label}</div>
                      <div className="op-metric-value">{m.value}</div>
                      <div className="op-metric-hint">{m.hint}</div>
                    </div>
                  ))}
                </div>

                {/* Channel Breakdown */}
                {channels.length > 1 && (
                  <>
                    <div className="op-section-title">Channel Breakdown</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
                      {Object.entries(channelBreakdown).map(([ch, count]) => {
                        const cfg = CHANNEL_COLORS[ch];
                        return (
                          <span key={ch} style={{
                            padding:"5px 12px",borderRadius:20,fontSize:11,fontWeight:600,
                            fontFamily:"'DM Mono',monospace",
                            background:cfg.bg,color:cfg.color,border:`1px solid ${cfg.border}`
                          }}>
                            {CHANNEL_ICONS[ch]} {ch} × {count}
                          </span>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Timeline */}
                <div className="op-section-title">Sequence Timeline</div>
                <div className="op-timeline">
                  {plan.map((step, i) => {
                    const cfg = CHANNEL_COLORS[step.channel];
                    const isOpen = expanded === i;
                    return (
                      <div
                        key={i}
                        className={`op-step${isOpen ? " open" : ""}`}
                        onClick={() => setExpanded(isOpen ? null : i)}
                        style={isOpen ? { borderColor: cfg.border } : {}}
                      >
                        {/* Dot */}
                        <div className="op-step-dot" style={{ color: cfg.color }} />

                        {/* Header */}
                        <div className="op-step-header">
                          <div className="op-step-num" style={{ background: cfg.bg, color: cfg.color }}>
                            {step.step}
                          </div>
                          <div className="op-step-meta">
                            <div className="op-step-title">{CHANNEL_ICONS[step.channel]} {step.subject}</div>
                            <div className="op-step-sub">{step.channel} · Step {step.step} of {plan.length}</div>
                          </div>
                          <div className="op-step-day">Day {step.day}</div>
                          <div className="op-step-chevron">▼</div>
                        </div>

                        {/* Body */}
                        {isOpen && (
                          <div className="op-step-body">
                            <div className="op-step-subject">Message</div>
                            <div className="op-step-content">{step.body}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="op-actions">
                  <button className={`op-action-btn btn-copy${copied ? " done" : ""}`} onClick={copyAll}>
                    {copied ? "✓ Copied!" : "⎘ Copy All"}
                  </button>
                  <button className="op-action-btn btn-export" onClick={exportCSV}>
                    ⬇ Export CSV
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}