import { useState } from "react";
import "./PromotionGenerator.css";

const EMAIL_TYPES  = ["Flash Sale", "Product Launch", "Seasonal", "Re-engagement", "VIP Offer"];
const TONES        = ["Exciting", "Professional", "Urgent", "Storytelling"];
const CTAS         = ["Shop Now", "Claim Offer", "Get Started", "Learn More", "Buy Today"];

const TEMPLATES = {
  "Flash Sale": {
    Exciting: (p, pr, o, cta, emoji) =>
`Subject: ⚡ Flash Sale: ${p} — ${o} TODAY ONLY!

Hey [First Name],

We're doing something we've never done before.

For the next 24 hours only, ${p} is yours for just $${pr} — that's ${o} off the regular price.

This isn't a "limited time" gimmick. When the clock hits zero, this deal disappears.

${emoji} ${p} — $${pr} (Was higher. Much higher.)

✦ ${o}
✦ Ships within 24 hours
✦ 30-day money-back guarantee

👉 ${cta} →

[Your Brand]`,

    Urgent: (p, pr, o, cta) =>
`Subject: LAST CHANCE: ${p} at $${pr} — ends tonight

[First Name],

This is your final reminder.

${p} is $${pr} until midnight. After that, the price goes back up.

Offer: ${o}

→ ${cta}

[Your Brand]`,

    Professional: (p, pr, o, cta) =>
`Subject: Limited Offer: ${p} at $${pr}

Dear [First Name],

We're pleased to offer an exclusive promotion on ${p}.

For a limited period, you can take advantage of ${o}, bringing the price to just $${pr}.

This offer reflects our commitment to delivering outstanding value to our customers.

→ ${cta}

Warm regards,
[Your Brand]`,

    Storytelling: (p, pr, o, cta) =>
`Subject: The story behind ${p} — and a special offer

Hi [First Name],

When we built ${p}, we had one goal: make something worth paying full price for.

So it says a lot that we're offering it at $${pr} today — ${o}.

We're not discounting because it's not selling. We're discounting because we want more people to experience it.

→ ${cta}

[Your Brand]`,
  },

  "Product Launch": {
    Exciting: (p, pr, o, cta, emoji) =>
`Subject: ${emoji} It's here — introducing ${p}!

Hey [First Name],

The wait is finally over.

${p} just launched — and to celebrate, we're offering ${o} for early adopters. That means you get it for just $${pr}.

We've spent months perfecting every detail. Now it's your turn to experience it.

✦ Early-adopter pricing: $${pr}
✦ ${o}
✦ Available right now

👉 ${cta} →

[Your Brand]`,

    Professional: (p, pr, o, cta) =>
`Subject: Announcing ${p} — Now Available at $${pr}

Dear [First Name],

We are excited to announce the official launch of ${p}.

As a valued subscriber, you are among the first to access our introductory offer of ${o}, priced at $${pr}.

We are confident that ${p} will exceed your expectations.

→ ${cta}

Best regards,
[Your Brand]`,

    Urgent: (p, pr, o, cta) =>
`Subject: ${p} just launched — intro price expires soon

[First Name],

${p} is live. Intro offer: ${o} at $${pr}.

This pricing won't last. First 100 customers only.

→ ${cta}

[Your Brand]`,

    Storytelling: (p, pr, o, cta) =>
`Subject: Why we built ${p} (and what it costs)

Hi [First Name],

A year ago, we kept hearing the same frustration from customers.

So we built ${p} to solve it. It took longer than expected. It cost more to make right. But it's here.

Launch price: $${pr} — ${o}. Because early believers deserve a better deal.

→ ${cta}

[Your Brand]`,
  },

  "Seasonal": {
    Exciting: (p, pr, o, cta, emoji) =>
`Subject: ${emoji} Season's best deal — ${p} at $${pr}!

Hey [First Name],

'Tis the season for the best deal we've ever offered on ${p}.

For this season only, enjoy ${o} — bringing ${p} to just $${pr}.

Whether it's for yourself or someone special, this is the moment.

✦ ${p} — $${pr}
✦ ${o}
✦ Seasonal deal — ends soon!

👉 ${cta} →

[Your Brand]`,

    Professional: (p, pr, o, cta) =>
`Subject: Seasonal Offer: ${p} at $${pr}

Dear [First Name],

As part of our seasonal promotions, we are delighted to offer ${p} at $${pr} — ${o}.

We hope this offer brings value to you and your loved ones during this special time of year.

→ ${cta}

Warm regards,
[Your Brand]`,

    Urgent: (p, pr, o, cta) =>
`Subject: Seasonal deal on ${p} ends Sunday

[First Name],

Last call for our seasonal offer.

${p} at $${pr}. ${o}. Sunday midnight cutoff.

→ ${cta}

[Your Brand]`,

    Storytelling: (p, pr, o, cta) =>
`Subject: This season, we wanted to do something different

Hi [First Name],

Every season, brands send the same emails. Big headlines. Fake urgency.

We wanted to do this differently.

${p} is genuinely good. $${pr} with ${o} is genuinely fair. And this offer is genuinely limited to this season.

→ ${cta}

[Your Brand]`,
  },

  "Re-engagement": {
    Exciting: (p, pr, o, cta, emoji) =>
`Subject: ${emoji} We've missed you — here's ${o} to come back

Hey [First Name],

It's been a while! We noticed you haven't checked out our latest — so we put together something special just for you.

${p} is now $${pr} — ${o}, exclusively for returning customers like you.

Come back and see what you've been missing.

👉 ${cta} →

[Your Brand]`,

    Professional: (p, pr, o, cta) =>
`Subject: A special offer to welcome you back

Dear [First Name],

We value your past relationship with us and would love to reconnect.

As a gesture of appreciation, we're offering ${o} on ${p}, now available at $${pr}.

We hope to see you soon.

→ ${cta}

Best regards,
[Your Brand]`,

    Urgent: (p, pr, o, cta) =>
`Subject: Your exclusive win-back offer expires in 48hrs

[First Name],

We reserved ${o} on ${p} specifically for you. $${pr}.

This offer expires in 48 hours and won't be repeated.

→ ${cta}

[Your Brand]`,

    Storytelling: (p, pr, o, cta) =>
`Subject: We kept your spot

Hi [First Name],

We noticed you've been away. That's okay — life gets busy.

But we kept thinking about you when we made ${p}. Honestly.

So here's a personal offer: ${o}, bringing it to $${pr}. No conditions, no tricks. Just a genuine "we'd love to have you back."

→ ${cta}

[Your Brand]`,
  },

  "VIP Offer": {
    Exciting: (p, pr, o, cta, emoji) =>
`Subject: ${emoji} VIP Access: ${p} at $${pr} — only for you

Hey [First Name],

You're one of our most valued customers, and we wanted to reward that.

Before we open this to everyone, you get early access to ${p} at $${pr} — with ${o} baked in.

This offer is exclusive to a small group. You're on it.

✦ VIP Price: $${pr}
✦ ${o}
✦ Access closes in 24 hours

👉 ${cta} →

[Your Brand]`,

    Professional: (p, pr, o, cta) =>
`Subject: Exclusive VIP Offer: ${p} at $${pr}

Dear [First Name],

As a valued member of our community, you have been selected to receive an exclusive offer on ${p}.

Your VIP pricing: $${pr} — ${o}. This offer is not available to the general public.

→ ${cta}

With appreciation,
[Your Brand]`,

    Urgent: (p, pr, o, cta) =>
`Subject: Your VIP deal expires in 12 hours

[First Name],

VIP pricing on ${p}: $${pr} with ${o}.

Reserved for you. Expires tonight.

→ ${cta}

[Your Brand]`,

    Storytelling: (p, pr, o, cta) =>
`Subject: We built something for customers like you

Hi [First Name],

Not every product is for everyone. ${p} is for people who already get it.

That's why we're offering it to our VIP list first — $${pr} with ${o} before the public launch.

You've supported us. This is how we say thank you.

→ ${cta}

[Your Brand]`,
  },
};

const TYPE_EMOJIS  = { "Flash Sale":"⚡", "Product Launch":"🚀", "Seasonal":"🎁", "Re-engagement":"💌", "VIP Offer":"👑" };
const TYPE_COLORS  = {
  "Flash Sale":     { color:"#ef4444", bg:"rgba(239,68,68,0.1)",    border:"rgba(239,68,68,0.3)"    },
  "Product Launch": { color:"#2f80ed", bg:"rgba(47,128,237,0.1)",   border:"rgba(47,128,237,0.3)"   },
  "Seasonal":       { color:"#22c55e", bg:"rgba(34,197,94,0.1)",    border:"rgba(34,197,94,0.3)"    },
  "Re-engagement":  { color:"#a855f7", bg:"rgba(168,85,247,0.1)",   border:"rgba(168,85,247,0.3)"   },
  "VIP Offer":      { color:"#f59e0b", bg:"rgba(245,158,11,0.1)",   border:"rgba(245,158,11,0.3)"   },
};

function scoreEmail(product, price, offer, emailType, tone) {
  let s = 30;
  if (product) s += 20;
  if (price)   s += 15;
  if (offer)   s += 20;
  if (tone === "Storytelling" || tone === "Urgent") s += 10;
  if (emailType === "VIP Offer" || emailType === "Product Launch") s += 5;
  return Math.min(s, 100);
}

export default function PromotionGenerator() {
  const [product,   setProduct]   = useState("");
  const [price,     setPrice]     = useState("");
  const [offer,     setOffer]     = useState("");
  const [emailType, setEmailType] = useState("Product Launch");
  const [tone,      setTone]      = useState("Exciting");
  const [cta,       setCta]       = useState("Shop Now");
  const [email,     setEmail]     = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied,    setCopied]    = useState(false);
  const [animated,  setAnimated]  = useState(false);

  const generate = () => {
    const emoji = TYPE_EMOJIS[emailType] || "✨";
    const tmplSet = TEMPLATES[emailType] || TEMPLATES["Product Launch"];
    const builder = tmplSet[tone] || tmplSet["Exciting"];
    const content = builder(product || "Your Product", price || "0", offer || "Special Offer", cta, emoji);
    setEmail(content);
    setGenerated(true);
    setAnimated(false);
    setCopied(false);
    setTimeout(() => setAnimated(true), 60);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const score = scoreEmail(product, price, offer, emailType, tone);
  const scoreCls = score >= 75 ? "score-excellent" : score >= 50 ? "score-good" : "score-poor";
  const scoreLabel = score >= 75 ? "Strong" : score >= 50 ? "Average" : "Weak";
  const typeColor = TYPE_COLORS[emailType];

  const wordCount = email.split(/\s+/).filter(Boolean).length;
  const lineCount = email.split("\n").filter(Boolean).length;

  const tips = [
    !product  && "Add a product name to personalise the subject line.",
    !offer    && "Specify an offer (e.g. '20% off') for +20 relevance score.",
    !price    && "Include a price for a more compelling email.",
    tone === "Exciting" && emailType === "Re-engagement" && "Try 'Storytelling' tone for win-back emails — higher open rates.",
    tone === "Professional" && emailType === "Flash Sale" && "'Urgent' tone works better for flash sale urgency.",
  ].filter(Boolean).slice(0, 3);

  return (
    <>


      <div className="pg-root">
        {/* Clouds */}
        <div className="pg-clouds">
          {["pc1","pc2","pc3","pc4","pc5"].map(c => (
            <div key={c} className={`pg-cloud ${c}`} />
          ))}
        </div>

        {/* Hero */}
        <div className="pg-hero">
          <div className="pg-hero-badge">🛍️ Email Marketing</div>
          <h1>Product <em>Promotion Generator</em></h1>
          <p>Choose your campaign type, tone and CTA — get a complete promotional email ready to send in seconds.</p>
        </div>

        <div className="pg-layout">

          {/* LEFT: Config */}
          <div className="pg-card">
            <div className="pg-card-label">🎯 Campaign Details</div>

            <div className="pg-field">
              <label className="pg-label">Product Name</label>
              <input className="pg-input" placeholder="e.g. ProFlow CRM" value={product} onChange={e => setProduct(e.target.value)} />
            </div>

            <div className="pg-field">
              <label className="pg-label">
                Price
                <span>numbers only</span>
              </label>
              <input className="pg-input" type="number" placeholder="e.g. 49" value={price} onChange={e => setPrice(e.target.value)} />
            </div>

            <div className="pg-field">
              <label className="pg-label">Offer / Discount</label>
              <input className="pg-input" placeholder="e.g. 30% off, Free shipping, Buy 1 Get 1" value={offer} onChange={e => setOffer(e.target.value)} />
            </div>

            <div className="pg-divider" />

            {/* Email Type */}
            <div className="pg-field">
              <label className="pg-label" style={{marginBottom:8}}>Email Type</label>
              <div className="pg-type-grid">
                {EMAIL_TYPES.map(t => {
                  const cfg = TYPE_COLORS[t];
                  const active = emailType === t;
                  return (
                    <div
                      key={t}
                      className="pg-type-card"
                      onClick={() => setEmailType(t)}
                      style={active ? { borderColor: cfg.border, background: cfg.bg, transform:"translateY(-2px)", boxShadow:`0 4px 12px ${cfg.bg}` } : {}}
                    >
                      <div className="pg-type-icon">{TYPE_EMOJIS[t]}</div>
                      <div className="pg-type-name" style={active ? { color: cfg.color } : {}}>{t}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tone */}
            <div className="pg-field">
              <label className="pg-label" style={{marginBottom:6}}>Tone</label>
              <div className="pg-pill-group">
                {TONES.map(t => (
                  <span key={t} className={`pg-pill${tone === t ? " active" : ""}`} onClick={() => setTone(t)}>{t}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pg-field" style={{marginTop:6}}>
              <label className="pg-label" style={{marginBottom:6}}>Call to Action</label>
              <div className="pg-pill-group">
                {CTAS.map(c => (
                  <span key={c} className={`pg-pill${cta === c ? " active" : ""}`} onClick={() => setCta(c)}>{c}</span>
                ))}
              </div>
            </div>

            <div className="pg-divider" />

            <button className="pg-btn" onClick={generate}>
              {TYPE_EMOJIS[emailType]} Generate Email
            </button>

            <div className="pg-tips-box">
              <div className="pg-tips-header">💡 Copywriting Tips</div>
              <ul className="pg-tips-list">
                <li>'Urgent' tone has the highest click-through for flash sales.</li>
                <li>'Storytelling' works best for re-engagement and VIP campaigns.</li>
                <li>Prices ending in 7 or 9 convert better than round numbers.</li>
                <li>Keep subject lines under 50 characters for mobile.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Output */}
          <div className="pg-card">
            <div className="pg-card-label">📧 Generated Email</div>

            {!generated && (
              <div className="pg-empty">
                <div className="pg-empty-icon">🛍️</div>
                <p>Fill in your product details on the left<br/>and click Generate to build your<br/>promotional email.</p>
              </div>
            )}

            {generated && (
              <div className={animated ? "pg-animate" : ""}>

                {/* Type badge */}
                <span className="pg-type-preview" style={{ background: typeColor.bg, color: typeColor.color, border:`1px solid ${typeColor.border}` }}>
                  {TYPE_EMOJIS[emailType]} {emailType} — {tone} Tone
                </span>

                {/* Score */}
                <div className="pg-score-row">
                  <span className="pg-score-label">Email Strength Score</span>
                  <span className={`pg-score-badge ${scoreCls}`}>{scoreLabel} — {score}/100</span>
                </div>

                {/* Metrics */}
                <div className="pg-metrics">
                  {[
                    { label:"Words",   value: wordCount,             hint:"email length",  cls:"metric-high"   },
                    { label:"Lines",   value: lineCount,             hint:"content lines", cls:"metric-medium" },
                    { label:"Score",   value: score,                 hint:"out of 100",    cls: score>=75?"metric-high":score>=50?"metric-medium":"metric-low" },
                    { label:"Type",    value: TYPE_EMOJIS[emailType],hint: emailType,      cls:"metric-high"   },
                    { label:"Tone",    value: tone.slice(0,4)+".",   hint: tone,           cls:"metric-medium" },
                    { label:"CTA",     value: cta.split(" ")[0],     hint: cta,            cls:"metric-high"   },
                  ].map(m => (
                    <div key={m.label} className="pg-metric" title={m.hint}>
                      <div className="pg-metric-label">{m.label}</div>
                      <div className={`pg-metric-value ${m.cls}`}>{m.value}</div>
                      <div className="pg-metric-hint">{m.hint}</div>
                    </div>
                  ))}
                </div>

                {/* Live tips */}
                {tips.length > 0 && (
                  <>
                    <div className="pg-section-title">💬 Improve This Email</div>
                    {tips.map((tip, i) => (
                      <div key={i} className="pg-tip"><span>◈</span><span>{tip}</span></div>
                    ))}
                  </>
                )}

                {/* Email output */}
                <div className="pg-section-title">📋 Email Copy</div>
                <textarea
                  className="pg-result-box"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                {/* Actions */}
                <div className="pg-actions">
                  <button className={`pg-action-btn btn-copy${copied ? " done" : ""}`} onClick={copyEmail}>
                    {copied ? "✓ Copied!" : "⎘ Copy Email"}
                  </button>
                  <button className="pg-action-btn btn-clear" onClick={() => { setEmail(""); setGenerated(false); }}>
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