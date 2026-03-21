import React, { useState } from "react";
import "./DiscountOptimizer.css";

const DiscountOptimizer = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("subjects");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [form, setForm] = useState({
    productName: "",
    productCategory: "",
    discount: "",
    originalPrice: "",
    urgency: "",
    audience: "",
    tone: "",
    expiryDate: "",
    promoCode: "",
    extraContext: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Generate dynamic content based on form inputs
  const generateOffer = async () => {
    if (!form.productName.trim() || !form.discount.trim()) {
      alert("Please enter at least a product name and discount %.");
      return;
    }
    setLoading(true);
    setResult(null);
    setActiveTab("subjects");

    // Simulate loading delay
    setTimeout(() => {
      const generatedResult = generateDynamicContent(form);
      setResult(generatedResult);
      setLoading(false);
    }, 800);
  };

  const generateDynamicContent = (formData) => {
    const discountNum = parseInt(formData.discount) || 0;
    const hasPrice = formData.originalPrice && formData.originalPrice.trim() !== "";
    const hasExpiry = formData.expiryDate && formData.expiryDate.trim() !== "";
    const hasPromo = formData.promoCode && formData.promoCode.trim() !== "";
    const productName = formData.productName;
    const category = formData.productCategory || "product";
    const audience = formData.audience || "General List";
    const tone = formData.tone || "Friendly & Warm";
    const urgency = formData.urgency || "Normal";
    const extraContext = formData.extraContext;

    // Calculate offer strength based on inputs
    let offerStrength = 50;
    if (discountNum >= 50) offerStrength += 25;
    else if (discountNum >= 30) offerStrength += 15;
    else if (discountNum >= 20) offerStrength += 10;
    if (hasExpiry) offerStrength += 10;
    if (hasPromo) offerStrength += 5;
    if (hasPrice) offerStrength += 5;
    if (extraContext) offerStrength += 5;
    offerStrength = Math.min(offerStrength, 98);

    // Determine conversion prediction
    let conversionPrediction = "Medium";
    if (offerStrength >= 80) conversionPrediction = "Very High";
    else if (offerStrength >= 65) conversionPrediction = "High";
    else if (offerStrength >= 45) conversionPrediction = "Medium";
    else conversionPrediction = "Low";

    // Determine spam risk
    let spamRisk = "Low";
    if (discountNum > 70) spamRisk = "High";
    else if (discountNum > 50) spamRisk = "Medium";

    // Audience match based on targeting
    let audienceMatch = 65;
    if (audience === "VIP Members") audienceMatch = 85;
    else if (audience === "Loyal Customers") audienceMatch = 80;
    else if (audience === "Cart Abandoners") audienceMatch = 75;
    else if (audience === "Win-Back (lapsed)") audienceMatch = 70;
    else if (audience === "New Subscribers") audienceMatch = 60;
    else audienceMatch = 65;

    // Generate subject lines based on inputs
    const subjectLines = generateSubjectLines(formData, discountNum, hasExpiry, hasPromo);
    
    // Generate preview texts
    const previewTexts = generatePreviewTexts(formData, discountNum, hasExpiry);
    
    // Generate email body
    const emailBody = generateEmailBody(formData, discountNum, hasPrice, hasExpiry, hasPromo, tone, urgency);
    
    // Generate improvements
    const improvements = generateImprovements(formData, discountNum, hasExpiry, hasPromo);
    
    // Generate avoid words
    const avoidWords = ["free", "guarantee", "winner", "cash", "credit", "100%", "act now"];
    
    // Generate metrics
    const metrics = generateMetrics(discountNum, offerStrength, audienceMatch, urgency);

    // Best send time based on audience
    let bestSendTime = "Tuesday 10am";
    if (audience === "Cart Abandoners") bestSendTime = "Wednesday 2pm";
    else if (audience === "VIP Members") bestSendTime = "Thursday 11am";
    else if (audience === "Win-Back (lapsed)") bestSendTime = "Friday 9am";

    return {
      subjectLines,
      previewTexts,
      emailBody,
      offerStrength,
      conversionPrediction,
      bestSendTime,
      audienceMatch,
      spamRisk,
      improvements,
      avoidWords,
      metrics
    };
  };

  const generateSubjectLines = (formData, discountNum, hasExpiry, hasPromo) => {
    const product = formData.productName;
    const lines = [];
    
    // Urgency type
    if (hasExpiry || formData.urgency === "High" || formData.urgency === "Extreme") {
      lines.push({
        text: `⚡ Last chance: ${discountNum}% off ${product} ends tonight!`,
        type: "Urgency",
        score: 85,
        reason: "Creates immediate action with time-sensitive urgency"
      });
    }
    
    // Value type
    lines.push({
      text: `${discountNum}% off ${product} — limited time offer`,
      type: "Value",
      score: 78,
      reason: "Clearly communicates the discount value upfront"
    });
    
    // Curiosity type
    lines.push({
      text: `Is this the best deal on ${product}? You decide.`,
      type: "Curiosity",
      score: 72,
      reason: "Piques curiosity and encourages opens"
    });
    
    // FOMO type
    if (formData.urgency === "Medium" || formData.urgency === "High") {
      lines.push({
        text: `🔥 ${discountNum}% off ${product} — selling fast!`,
        type: "FOMO",
        score: 82,
        reason: "Creates fear of missing out on a great deal"
      });
    }
    
    // Personalized type
    if (formData.audience === "VIP Members" || formData.audience === "Loyal Customers") {
      lines.push({
        text: `Exclusive: ${discountNum}% off ${product} just for you`,
        type: "Personalized",
        score: 88,
        reason: "Makes recipients feel special and valued"
      });
    }
    
    // Add promo code variation
    if (hasPromo) {
      lines.push({
        text: `Use code ${formData.promoCode}: ${discountNum}% off ${product}`,
        type: "Value",
        score: 75,
        reason: "Includes promo code for easy redemption"
      });
    }
    
    return lines.slice(0, 5);
  };

  const generatePreviewTexts = (formData, discountNum, hasExpiry) => {
    const product = formData.productName;
    const previews = [
      `Don't miss out on ${discountNum}% savings on ${product}`,
      `Limited stock available — grab yours before it's gone`,
      `Exclusive offer just for our ${formData.audience || "valued customers"}`
    ];
    
    if (hasExpiry) {
      previews.push(`Offer ends ${new Date(formData.expiryDate).toLocaleDateString()}`);
    }
    
    if (formData.promoCode) {
      previews.push(`Use code ${formData.promoCode} at checkout`);
    }
    
    return previews.slice(0, 3);
  };

  const generateEmailBody = (formData, discountNum, hasPrice, hasExpiry, hasPromo, tone, urgency) => {
    const product = formData.productName;
    const category = formData.productCategory || "product";
    const audience = formData.audience || "you";
    const originalPrice = formData.originalPrice;
    
    let hook = "";
    let body = "";
    let cta = "";
    let ps = "";
    
    // Generate hook based on tone
    if (tone === "Urgent & Direct") {
      hook = `⚡ Limited time: Get ${discountNum}% off ${product} today only!`;
    } else if (tone === "Playful & Fun") {
      hook = `🎉 Surprise! Here's ${discountNum}% off ${product} just for you!`;
    } else if (tone === "Luxury / Premium") {
      hook = `Experience ${product} at an exclusive ${discountNum}% savings.`;
    } else {
      hook = `We have something special for ${audience} — ${discountNum}% off ${product}!`;
    }
    
    // Generate body
    if (hasPrice) {
      body = `Originally ${originalPrice}, you can now get ${product} for ${Math.round(parseInt(originalPrice.replace(/[^0-9]/g, '')) * (1 - discountNum/100))}${originalPrice.match(/[^0-9]/g)?.join('') || ''}. That's an incredible ${discountNum}% savings!`;
    } else {
      body = `Save ${discountNum}% on ${product} — a ${category} that our ${audience} love. Whether you're looking to upgrade or try something new, this is the perfect opportunity.`;
    }
    
    if (extraContext) {
      body += ` ${formData.extraContext}`;
    }
    
    // Generate CTA
    if (hasPromo) {
      cta = `Shop Now & Save ${discountNum}% with code ${formData.promoCode}`;
    } else {
      cta = `Claim Your ${discountNum}% Discount`;
    }
    
    // Generate PS line
    if (hasExpiry) {
      ps = `P.S. This offer expires on ${new Date(formData.expiryDate).toLocaleDateString()} — don't wait!`;
    } else if (urgency === "High" || urgency === "Extreme") {
      ps = `P.S. Limited stock available — order now before it's too late!`;
    } else {
      ps = `P.S. Know someone who would love this? Share this offer with them!`;
    }
    
    return { hook, body, cta, ps };
  };

  const generateImprovements = (formData, discountNum, hasExpiry, hasPromo) => {
    const improvements = [];
    
    if (discountNum < 20) {
      improvements.push("Consider a higher discount percentage (20%+) to increase conversion rates");
    }
    
    if (!hasExpiry) {
      improvements.push("Add an expiry date to create urgency and drive faster action");
    }
    
    if (!hasPromo) {
      improvements.push("Include a memorable promo code to make redemption easier");
    }
    
    if (!formData.originalPrice) {
      improvements.push("Show original price to highlight the savings value");
    }
    
    if (formData.audience === "General List") {
      improvements.push("Segment your audience for more personalized offers");
    }
    
    if (improvements.length === 0) {
      improvements.push("Your offer looks great! Consider A/B testing subject lines to optimize further");
    }
    
    return improvements;
  };

  const generateMetrics = (discountNum, offerStrength, audienceMatch, urgency) => {
    let openRate = 18 + Math.floor(offerStrength / 10) + (urgency === "High" ? 5 : 0);
    let clickRate = 8 + Math.floor(offerStrength / 15);
    let conversion = 3 + Math.floor(offerStrength / 20);
    
    openRate = Math.min(openRate, 45);
    clickRate = Math.min(clickRate, 18);
    conversion = Math.min(conversion, 12);
    
    return {
      estimatedOpenRate: `${openRate}–${openRate + 5}%`,
      estimatedClickRate: `${clickRate}–${clickRate + 3}%`,
      estimatedConversion: `${conversion}–${conversion + 2}%`
    };
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const scoreClass = (score) => {
    if (score >= 70) return "grade-good";
    if (score >= 45) return "grade-mid";
    return "grade-bad";
  };

  const conversionClass = (c) => {
    if (c === "Very High") return "grade-good";
    if (c === "High") return "grade-good";
    if (c === "Medium") return "grade-mid";
    return "grade-bad";
  };

  const spamClass = (s) => {
    if (s === "Low")    return "grade-good";
    if (s === "Medium") return "grade-mid";
    return "grade-bad";
  };

  const typeColors = {
    "Urgency":      "type-urgency",
    "Curiosity":    "type-curiosity",
    "Value":        "type-value",
    "FOMO":         "type-fomo",
    "Personalized": "type-personal",
  };

  const tabs = [
    { id: "subjects",  label: "Subjects" },
    { id: "copy",      label: "Email Copy" },
    { id: "metrics",   label: "Metrics" },
    { id: "improve",   label: "Tips" },
  ];

  return (
    <div className="do-root">

      {/* CLOUDS */}
      <div className="do-clouds">
        {["dc1","dc2","dc3","dc4","dc5","dc6"].map(c => (
          <div key={c} className={`do-cloud ${c}`} />
        ))}
      </div>

      {/* HERO */}
      <div className="do-hero">
        <div className="do-hero-badge">✦ AI-Powered Offer Generation</div>
        <h1>Fast, Reliable <em>Discount Optimizer</em><br />Built for Marketers</h1>
        <p>Generate high-converting subject lines, persuasive email copy, predicted open rates, spam risk scores, and personalized send-time advice — instantly.</p>
      </div>

      {/* PANEL */}
      <div className="do-panel">

        {/* LEFT — Form */}
        <div className="do-card">
          <div className="do-card-label">🏷 Offer Details</div>

          <div className="do-form-grid">
            <div className="do-field">
              <label>Product Name *</label>
              <input name="productName" placeholder="e.g. Premium Headphones" value={form.productName} onChange={handleChange} />
            </div>
            <div className="do-field">
              <label>Product Category</label>
              <select name="productCategory" value={form.productCategory} onChange={handleChange}>
                <option value="">Select category…</option>
                <option>Electronics</option>
                <option>Fashion / Apparel</option>
                <option>Beauty & Skincare</option>
                <option>Home & Living</option>
                <option>SaaS / Software</option>
                <option>Food & Beverage</option>
                <option>Fitness & Health</option>
                <option>Travel</option>
                <option>Education / Courses</option>
                <option>Other</option>
              </select>
            </div>
            <div className="do-field">
              <label>Discount % *</label>
              <input type="number" name="discount" placeholder="e.g. 30" value={form.discount} onChange={handleChange} />
            </div>
            <div className="do-field">
              <label>Original Price</label>
              <input name="originalPrice" placeholder="e.g. $199" value={form.originalPrice} onChange={handleChange} />
            </div>
            <div className="do-field">
              <label>Urgency Level</label>
              <select name="urgency" value={form.urgency} onChange={handleChange}>
                <option value="">Select urgency…</option>
                <option>Low — Evergreen offer</option>
                <option>Normal — Standard promo</option>
                <option>Medium — Limited stock</option>
                <option>High — 24hr flash sale</option>
                <option>Extreme — Last chance</option>
              </select>
            </div>
            <div className="do-field">
              <label>Target Audience</label>
              <select name="audience" value={form.audience} onChange={handleChange}>
                <option value="">Select audience…</option>
                <option>New Subscribers</option>
                <option>Loyal Customers</option>
                <option>Cart Abandoners</option>
                <option>Win-Back (lapsed)</option>
                <option>VIP Members</option>
                <option>General List</option>
              </select>
            </div>
            <div className="do-field">
              <label>Email Tone</label>
              <select name="tone" value={form.tone} onChange={handleChange}>
                <option value="">Select tone…</option>
                <option>Friendly & Warm</option>
                <option>Professional</option>
                <option>Playful & Fun</option>
                <option>Luxury / Premium</option>
                <option>Urgent & Direct</option>
                <option>Minimalist</option>
              </select>
            </div>
            <div className="do-field">
              <label>Offer Expiry</label>
              <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} />
            </div>
          </div>

          <div className="do-field do-field-full">
            <label>Promo Code (optional)</label>
            <input name="promoCode" placeholder="e.g. SAVE30" value={form.promoCode} onChange={handleChange} />
          </div>

          <div className="do-field do-field-full">
            <label>Extra Context</label>
            <textarea name="extraContext" placeholder="e.g. Clearance sale, seasonal campaign, bundle offer, anniversary deal…" value={form.extraContext} onChange={handleChange} />
          </div>

          <button className="do-analyze-btn" onClick={generateOffer} disabled={loading}>
            {loading ? <><div className="do-spinner" /> Generating…</> : "🏷 Generate Offer Package"}
          </button>
        </div>

        {/* RIGHT — Results */}
        <div className="do-card">
          <div className="do-card-label">📊 Generated Results</div>

          {!result ? (
            <div className="do-empty">
              <div className="do-empty-icon">🏷</div>
              <p>Fill in the offer details and click<br /><strong>Generate Offer Package</strong> to get AI-optimized copy.</p>
            </div>
          ) : (
            <>
              {/* Score hero */}
              <div className="do-score-hero">
                <div className={`do-score-ring ${scoreClass(result.offerStrength)}`}>
                  <span className="do-score-num">{result.offerStrength}</span>
                  <span className="do-score-sub">/ 100</span>
                </div>
                <div className="do-score-meta">
                  <div className="do-badge-row">
                    <span className="do-meta-label">Conversion</span>
                    <span className={`do-conv-badge ${conversionClass(result.conversionPrediction)}`}>{result.conversionPrediction}</span>
                  </div>
                  <div className="do-badge-row">
                    <span className="do-meta-label">Spam Risk</span>
                    <span className={`do-spam-badge ${spamClass(result.spamRisk)}`}>{result.spamRisk} Risk</span>
                  </div>
                  <div className="do-badge-row">
                    <span className="do-meta-label">Send Time</span>
                    <span className="do-send-badge">📅 {result.bestSendTime}</span>
                  </div>
                </div>
              </div>

              {/* Metric chips */}
              <div className="do-metric-row">
                <div className="do-metric-chip">
                  <div className="do-metric-val">{result.metrics?.estimatedOpenRate}</div>
                  <div className="do-metric-lbl">Open Rate</div>
                </div>
                <div className="do-metric-chip">
                  <div className="do-metric-val">{result.metrics?.estimatedClickRate}</div>
                  <div className="do-metric-lbl">Click Rate</div>
                </div>
                <div className="do-metric-chip">
                  <div className="do-metric-val">{result.metrics?.estimatedConversion}</div>
                  <div className="do-metric-lbl">Conversion</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="do-tabs">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    className={`do-tab ${activeTab === t.id ? "active" : ""}`}
                    onClick={() => setActiveTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* SUBJECTS TAB */}
              {activeTab === "subjects" && (
                <div className="do-tab-content">
                  <div className="do-section-title">✉ Subject Line Variants</div>
                  {result.subjectLines?.map((s, i) => (
                    <div key={i} className="do-subject-card">
                      <div className="do-subject-top">
                        <span className={`do-type-pill ${typeColors[s.type] || "type-value"}`}>{s.type}</span>
                        <span className={`do-subject-score ${scoreClass(s.score)}`}>{s.score}</span>
                      </div>
                      <p className="do-subject-text">{s.text}</p>
                      <div className="do-subject-bottom">
                        <span className="do-subject-reason">{s.reason}</span>
                        <button
                          className="do-copy-btn"
                          onClick={() => handleCopy(s.text, i)}
                        >
                          {copiedIndex === i ? "✅ Copied" : "📋 Copy"}
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="do-section-title do-mt">👁 Preview Texts</div>
                  {result.previewTexts?.map((pt, i) => (
                    <div key={i} className="do-preview-row">
                      <span className="do-preview-num">{i + 1}</span>
                      <span className="do-preview-text">{pt}</span>
                      <button className="do-copy-btn" onClick={() => handleCopy(pt, `pt-${i}`)}>
                        {copiedIndex === `pt-${i}` ? "✅" : "📋"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* COPY TAB */}
              {activeTab === "copy" && result.emailBody && (
                <div className="do-tab-content">
                  <div className="do-section-title">✍ Email Body</div>
                  <div className="do-copy-block">
                    <div className="do-copy-label">Opening Hook</div>
                    <p className="do-copy-text">{result.emailBody.hook}</p>
                  </div>
                  <div className="do-copy-block">
                    <div className="do-copy-label">Body Copy</div>
                    <p className="do-copy-text">{result.emailBody.body}</p>
                  </div>
                  <div className="do-copy-block do-cta-block">
                    <div className="do-copy-label">CTA Button</div>
                    <div className="do-cta-pill">{result.emailBody.cta}</div>
                  </div>
                  <div className="do-copy-block">
                    <div className="do-copy-label">P.S. Line</div>
                    <p className="do-copy-text do-ps-text">{result.emailBody.ps}</p>
                  </div>
                  <button
                    className="do-copy-all-btn"
                    onClick={() => handleCopy(
                      `${result.emailBody.hook}\n\n${result.emailBody.body}\n\n[${result.emailBody.cta}]\n\nP.S. ${result.emailBody.ps}`,
                      "all"
                    )}
                  >
                    {copiedIndex === "all" ? "✅ Copied!" : "📋 Copy Full Email"}
                  </button>
                </div>
              )}

              {/* METRICS TAB */}
              {activeTab === "metrics" && (
                <div className="do-tab-content">
                  <div className="do-section-title">📈 Performance Predictions</div>
                  <div className="do-metrics-grid">
                    <div className="do-big-metric">
                      <div className="do-big-val">{result.metrics?.estimatedOpenRate}</div>
                      <div className="do-big-lbl">📬 Open Rate</div>
                    </div>
                    <div className="do-big-metric">
                      <div className="do-big-val">{result.metrics?.estimatedClickRate}</div>
                      <div className="do-big-lbl">🖱 Click Rate</div>
                    </div>
                    <div className="do-big-metric">
                      <div className="do-big-val">{result.metrics?.estimatedConversion}</div>
                      <div className="do-big-lbl">🛒 Conversion</div>
                    </div>
                    <div className="do-big-metric">
                      <div className={`do-big-val ${scoreClass(result.audienceMatch)}`}>{result.audienceMatch}%</div>
                      <div className="do-big-lbl">🎯 Audience Fit</div>
                    </div>
                  </div>

                  {result.avoidWords?.length > 0 && (
                    <>
                      <div className="do-section-title do-mt">🚫 Words to Avoid</div>
                      <div className="do-avoid-list">
                        {result.avoidWords.map((w, i) => (
                          <span key={i} className="do-avoid-chip">{w}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* TIPS TAB */}
              {activeTab === "improve" && (
                <div className="do-tab-content">
                  <div className="do-section-title">💡 Improvement Tips</div>
                  {result.improvements?.map((tip, i) => (
                    <div key={i} className="do-tip-row">
                      <div className="do-tip-num">{i + 1}</div>
                      <span>{tip}</span>
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

export default DiscountOptimizer;