import { useState } from "react";
import "./ColdEmailGenerator.css";

const TONES = ["Professional", "Friendly", "Direct", "Storytelling"];
const GOALS = ["Book a Call", "Get a Reply", "Share a Resource", "Offer a Demo"];
const LENGTHS = ["Short (3 lines)", "Medium (5 lines)", "Full Email"];

const TEMPLATES = {
  Professional: {
    "Book a Call": (c, i, r, pain, cta) => `Subject: Quick question for ${c}'s ${r}

Hi [First Name],

I've been following ${c}'s work in the ${i} space — particularly ${pain ? `your focus on ${pain}` : "your recent momentum"}.

We help ${i} companies ${cta || "streamline operations and accelerate growth"}. Given your role as ${r}, I thought this could be relevant.

Would you have 15 minutes this week for a quick call?

Best regards,
[Your Name]`,

    "Get a Reply": (c, i, r, pain) => `Subject: A thought on ${c}'s ${i} strategy

Hi [First Name],

One question — is ${pain || "scaling efficiently"} currently on your radar at ${c}?

We've helped similar ${i} companies tackle exactly this. Happy to share a quick insight if useful.

Worth a reply?

[Your Name]`,

    "Share a Resource": (c, i, r, pain) => `Subject: Resource that might help ${c}

Hi [First Name],

Given your work as ${r} in the ${i} space, I thought you'd find this relevant.

We put together a short guide on ${pain || "common growth challenges"} that teams like ${c}'s have found useful.

Would it be okay to send it over?

[Your Name]`,

    "Offer a Demo": (c, i, r, pain) => `Subject: Live demo for ${c} — worth 20 mins?

Hi [First Name],

I'd love to show ${c} something we've built specifically for ${i} companies dealing with ${pain || "operational complexity"}.

As ${r}, I think you'd get real value from a 20-minute demo — no deck, just a live walkthrough.

Does Thursday or Friday work?

[Your Name]`,
  },

  Friendly: {
    "Book a Call": (c, i, r, pain) => `Subject: Hey — had a thought about ${c}

Hi [First Name],

I came across ${c} recently and was genuinely impressed by what you're building in the ${i} world.

I work with ${i} companies on ${pain || "growth and efficiency"} — and honestly, I think there's something worth chatting about.

Would you be up for a 15-min call this week? Totally low-key.

Cheers,
[Your Name]`,

    "Get a Reply": (c, i, r, pain) => `Subject: Quick question 👋

Hey [First Name],

Is ${pain || "scaling your team efficiently"} something you're actively working through at ${c}?

Asking because we've been in the trenches with a few ${i} companies on exactly this — and the patterns are surprisingly similar.

Just curious if it resonates!

[Your Name]`,

    "Share a Resource": (c, i, r, pain) => `Subject: Thought you'd like this

Hey [First Name],

I wrote something recently about ${pain || "growth challenges in " + i} — and ${c} kept coming to mind while I was putting it together.

Mind if I send it over? It's a quick read, promise.

[Your Name]`,

    "Offer a Demo": (c, i, r, pain) => `Subject: Can I show you something?

Hey [First Name],

I'd love to do a quick live demo for the ${c} team — no slides, just showing you what we've built for ${i} companies around ${pain || "the things that slow teams down"}.

20 minutes, and I think you'd walk away with at least one useful idea.

Open to it?

[Your Name]`,
  },

  Direct: {
    "Book a Call": (c, i, r, pain) => `Subject: 15 minutes — ${c} + [Your Company]

[First Name],

${c} is growing in ${i}. We help ${i} companies solve ${pain || "scaling and efficiency challenges"}.

Worth 15 minutes to see if there's a fit?

[Your Name]`,

    "Get a Reply": (c, i, r, pain) => `Subject: ${pain || "Growth challenge"} at ${c}?

[First Name],

Is ${pain || "operational efficiency"} a priority for ${c} right now?

Yes or no works.

[Your Name]`,

    "Share a Resource": (c, i, r, pain) => `Subject: For ${r}s in ${i}

[First Name],

Quick one — we made a resource on ${pain || "scaling in " + i}. Relevant to ${c}.

Can I send it?

[Your Name]`,

    "Offer a Demo": (c, i, r, pain) => `Subject: Demo for ${c}

[First Name],

I have a 20-minute demo built specifically for ${i} companies. No pitch. Just a live look.

Tuesday or Wednesday?

[Your Name]`,
  },

  Storytelling: {
    "Book a Call": (c, i, r, pain) => `Subject: What we learned helping a company like ${c}

Hi [First Name],

Six months ago, a ${i} company came to us with a familiar problem: ${pain || "they were growing fast but struggling to keep up operationally"}.

By the time we wrapped up, they'd transformed how their team works. I thought of ${c} when I was reflecting on that project — there are some real parallels.

Would love to share what we did. Have 15 minutes this week?

[Your Name]`,

    "Get a Reply": (c, i, r, pain) => `Subject: A story you might relate to

Hi [First Name],

A ${r} at a ${i} company told me last year: "${pain || "We knew we had a problem, we just didn't know what to do about it"}."

Within 90 days, everything had changed.

Is that story familiar at ${c}?

[Your Name]`,

    "Share a Resource": (c, i, r, pain) => `Subject: The lesson that changed how we think about ${i}

Hi [First Name],

We spent two years working with ${i} companies on ${pain || "growth and scaling"}. We got a lot wrong before we got it right.

I wrote it all down. It's short, honest, and might save ${c} a lot of time.

Want me to send it over?

[Your Name]`,

    "Offer a Demo": (c, i, r, pain) => `Subject: I want to show you something we built the hard way

Hi [First Name],

The product I'd like to demo for ${c} exists because a ${i} company told us something uncomfortable three years ago.

They said: "${pain || "Everyone sells us software. Nobody solves our problem."}".

We built the thing they actually needed. I'd love to show it to you — 20 minutes, live.

Open to it?

[Your Name]`,
  },
};

function buildEmail(company, industry, role, painPoint, tone, goal, length) {
  const c = company || "your company";
  const i = industry || "your industry";
  const r = role || "Decision Maker";
  const p = painPoint;

  const toneSet = TEMPLATES[tone] || TEMPLATES["Professional"];
  const builder = toneSet[goal] || toneSet["Book a Call"];
  let full = builder(c, i, r, p);

  if (length === "Short (3 lines)") {
    const lines = full.split("\n").filter(Boolean);
    const subjectLine = lines[0];
    const body = lines.filter(l => !l.startsWith("Subject:")).slice(0, 3).join("\n\n");
    return subjectLine + "\n\n" + body;
  }
  if (length === "Medium (5 lines)") {
    const lines = full.split("\n\n");
    return lines.slice(0, Math.min(5, lines.length)).join("\n\n");
  }
  return full;
}

function getScoreColor(score) {
  if (score >= 75) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

function scoreEmail(company, industry, role, painPoint, tone, goal) {
  let score = 40;
  if (company) score += 15;
  if (industry) score += 10;
  if (role) score += 10;
  if (painPoint) score += 20;
  if (tone === "Direct" || tone === "Storytelling") score += 5;
  return Math.min(score, 100);
}

export default function ColdEmailGenerator() {
  const [company,    setCompany]    = useState("");
  const [industry,   setIndustry]   = useState("");
  const [role,       setRole]       = useState("");
  const [painPoint,  setPainPoint]  = useState("");
  const [tone,       setTone]       = useState("Professional");
  const [goal,       setGoal]       = useState("Book a Call");
  const [length,     setLength]     = useState("Full Email");
  const [result,     setResult]     = useState("");
  const [copied,     setCopied]     = useState(false);
  const [generated,  setGenerated]  = useState(false);
  const [score,      setScore]      = useState(0);
  const [animated,   setAnimated]   = useState(false);

  const generate = () => {
    const email = buildEmail(company, industry, role, painPoint, tone, goal, length);
    const s = scoreEmail(company, industry, role, painPoint, tone, goal);
    setResult(email);
    setScore(s);
    setGenerated(true);
    setAnimated(false);
    setCopied(false);
    setTimeout(() => setAnimated(true), 60);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scoreLabel = score >= 75 ? ["Strong", "metric-high"] : score >= 50 ? ["Average", "metric-medium"] : ["Weak", "metric-low"];

  const TIPS = [
    !company    && "Add a company name to personalise.",
    !painPoint  && "Mention a pain point for +20 personalisation score.",
    !industry   && "Specify the industry for better targeting.",
    tone === "Professional" && goal === "Get a Reply" && "Try 'Direct' tone for higher reply rates.",
    length === "Full Email" && "Consider 'Short' length for cold outreach — less is more.",
  ].filter(Boolean).slice(0, 3);

  return (
    <>
      

      <div className="ce-root">
        {/* Clouds */}
        <div className="ce-clouds">
          {["ec1","ec2","ec3","ec4","ec5"].map(c => (
            <div key={c} className={`ce-cloud ${c}`} />
          ))}
        </div>

        {/* Hero */}
        <div className="ce-hero">
          <div className="ce-hero-badge">✉️ Cold Outreach</div>
          <h1>Cold Email <em>Personalisation</em> Generator</h1>
          <p>Fill in your prospect details, pick a tone and goal, and get a ready-to-send cold email in seconds.</p>
        </div>

        <div className="ce-layout">

          {/* ── LEFT: Config ── */}
          <div className="ce-card">
            <div className="ce-card-label">🎯 Prospect Details</div>

            <div className="ce-field">
              <label className="ce-label">Company Name</label>
              <input className="ce-input" placeholder="e.g. Stripe" value={company} onChange={e => setCompany(e.target.value)} />
            </div>

            <div className="ce-field">
              <label className="ce-label">Industry</label>
              <input className="ce-input" placeholder="e.g. Fintech, SaaS, E-commerce" value={industry} onChange={e => setIndustry(e.target.value)} />
            </div>

            <div className="ce-field">
              <label className="ce-label">Decision Maker Role</label>
              <input className="ce-input" placeholder="e.g. CEO, VP Sales, Director of Ops" value={role} onChange={e => setRole(e.target.value)} />
            </div>

            <div className="ce-field">
              <label className="ce-label">Pain Point <span style={{color:"#9dbdd4",textTransform:"none",letterSpacing:0,fontSize:10}}>(optional — boosts score)</span></label>
              <input className="ce-input" placeholder="e.g. slow onboarding, high churn, manual reporting" value={painPoint} onChange={e => setPainPoint(e.target.value)} />
            </div>

            <div className="ce-divider" />

            <div className="ce-field">
              <label className="ce-label">Email Tone</label>
              <div className="ce-pill-group">
                {TONES.map(t => (
                  <span key={t} className={`ce-pill${tone === t ? " active" : ""}`} onClick={() => setTone(t)}>{t}</span>
                ))}
              </div>
            </div>

            <div className="ce-field" style={{marginTop:10}}>
              <label className="ce-label">Primary Goal</label>
              <div className="ce-pill-group">
                {GOALS.map(g => (
                  <span key={g} className={`ce-pill${goal === g ? " active" : ""}`} onClick={() => setGoal(g)}>{g}</span>
                ))}
              </div>
            </div>

            <div className="ce-field" style={{marginTop:10}}>
              <label className="ce-label">Email Length</label>
              <div className="ce-pill-group">
                {LENGTHS.map(l => (
                  <span key={l} className={`ce-pill${length === l ? " active" : ""}`} onClick={() => setLength(l)}>{l}</span>
                ))}
              </div>
            </div>

            <div className="ce-divider" />

            <button className="ce-btn" onClick={generate}>
              ✦ Generate Cold Email
            </button>

            <div className="ce-tips-box">
              <div className="ce-tips-header">💡 Writing Tips</div>
              <ul className="ce-tips-list">
                <li>Add a real pain point for the highest personalisation score.</li>
                <li>'Direct' tone gets the best reply rates for busy executives.</li>
                <li>'Storytelling' works well for longer sales cycles.</li>
                <li>Short emails outperform long ones for cold outreach.</li>
              </ul>
            </div>
          </div>

          {/* ── RIGHT: Output ── */}
          <div className="ce-card">
            <div className="ce-card-label">📧 Generated Email</div>

            {!generated && (
              <div className="ce-empty">
                <div className="ce-empty-icon">✉️</div>
                <p>Fill in your prospect details on the left<br/>and click Generate to build your<br/>personalised cold email.</p>
              </div>
            )}

            {generated && (
              <div className={animated ? "ce-animate" : ""}>

                {/* Score */}
                <div className="ce-score-row">
                  <span className="ce-score-label">Personalisation Score</span>
                  <span className={`ce-score-badge ${score >= 75 ? "score-excellent" : score >= 50 ? "score-good" : "score-poor"}`}>
                    {scoreLabel[0]} — {score}/100
                  </span>
                </div>

                {/* Metrics */}
                <div className="ce-metrics">
                  {[
                    { label:"Tone",     value: tone.slice(0,5)+".",   hint: tone,            cls:"metric-high"   },
                    { label:"Goal",     value: goal.split(" ")[0],    hint: goal,             cls:"metric-medium" },
                    { label:"Length",   value: length.split(" ")[0],  hint: length,           cls:"metric-high"   },
                    { label:"Company",  value: company ? "✓" : "–",   hint: company||"None",  cls: company ? "metric-high":"metric-low"    },
                    { label:"Pain Point", value: painPoint ? "✓":"–", hint: painPoint||"None",cls: painPoint ? "metric-high":"metric-medium"},
                    { label:"Score",    value: score,                  hint:"out of 100",      cls: score>=75?"metric-high":score>=50?"metric-medium":"metric-low" },
                  ].map(m => (
                    <div key={m.label} className="ce-metric" title={m.hint}>
                      <div className="ce-metric-label">{m.label}</div>
                      <div className={`ce-metric-value ${m.cls}`}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Live improvement tips */}
                {TIPS.length > 0 && (
                  <>
                    <div className="ce-section-title">💬 Improve This Email</div>
                    {TIPS.map((tip, i) => (
                      <div key={i} className="ce-tip">
                        <span>◈</span><span>{tip}</span>
                      </div>
                    ))}
                  </>
                )}

                {/* Result */}
                <div className="ce-section-title">📋 Email Copy</div>
                <textarea
                  className="ce-result-box"
                  value={result}
                  onChange={e => setResult(e.target.value)}
                />

                {/* Actions */}
                <div className="ce-actions">
                  <button className={`ce-action-btn btn-copy${copied ? " done" : ""}`} onClick={copyEmail}>
                    {copied ? "✓ Copied!" : "⎘ Copy Email"}
                  </button>
                  <button className="ce-action-btn btn-clear" onClick={() => { setResult(""); setGenerated(false); }}>
                    ✕ Clear
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