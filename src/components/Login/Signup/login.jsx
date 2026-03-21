import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import { auth, googleProvider } from "../../Firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FaPaperPlane } from "react-icons/fa";
import { GiSpartanHelmet } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

/* ─────────────── DATA ─────────────── */

const FEATURES = [
  { icon: "🛡", title: "Spam Checker", desc: "AI-powered spam analysis detects risky words, scores deliverability, and rewrites your email to land in the inbox every time." },
  { icon: "✉", title: "Subject Optimizer", desc: "Generate 5 high-converting subject line variants with predicted open rates, type tags, and one-click copy." },
  { icon: "🎯", title: "Lead Scorer", desc: "Qualify leads with BANT scoring, close probability, deal size estimates, and a personalized outreach strategy instantly." },
  { icon: "🏷", title: "Discount Optimizer", desc: "Create urgency-driven promotional copy, CTA buttons, best send times, and full email bodies tailored to your audience." },
  { icon: "📊", title: "Engagement Score", desc: "Predict open rates, click rates, and unsub rates. Get readability grades, mobile scores, and quick wins to boost engagement." },
  { icon: "🔁", title: "A/B Variant Builder", desc: "Instantly generate two competing versions of any email element — subject, CTA, or body — and pick the winner with confidence." },
];

const PRICING = [
  {
    plan: "Starter",
    price: "$0",
    period: "forever",
    badge: null,
    color: "plan-free",
    features: ["5 spam checks / month", "3 subject line variants", "Basic engagement score", "Email support"],
    cta: "Get Started Free",
  },
  {
    plan: "Pro",
    price: "$19",
    period: "/ month",
    badge: "Most Popular",
    color: "plan-pro",
    features: ["Unlimited spam checks", "All 6 AI tools", "Full BANT lead scoring", "Discount optimizer", "Priority support", "API access"],
    cta: "Start Pro Trial",
  },
  {
    plan: "Team",
    price: "$49",
    period: "/ month",
    badge: null,
    color: "plan-team",
    features: ["Everything in Pro", "5 team seats", "Shared campaign workspace", "Advanced analytics", "Custom integrations", "Dedicated support"],
    cta: "Talk to Sales",
  },
];

const DOCS = [
  {
    icon: "🚀",
    title: "Getting Started",
    desc: "MailTitan is an all-in-one AI email marketing suite. After signing up, you'll land on your dashboard where you can access all 6 tools from the sidebar. Each tool is self-contained — paste your content, click analyze, and get instant results.",
  },
  {
    icon: "🛡",
    title: "Spam Checker",
    desc: "Paste your email body into the Spam Checker. The AI scans for spam trigger words, scores deliverability (0–100), predicts your inbox placement, and generates a fully rewritten spam-free version you can copy with one click.",
  },
  {
    icon: "✉",
    title: "Subject Optimizer",
    desc: "Enter your subject line alongside your email body. MailTitan generates 5 variants categorized by type (Urgency, FOMO, Value, Curiosity, Personalized), each with a predicted score, explanation, and copy button.",
  },
  {
    icon: "🎯",
    title: "Lead Scorer",
    desc: "Fill in 10 lead fields including company size, budget, decision maker, pain points, and engagement level. The AI runs BANT scoring, estimates close probability, deal size, and gives you ranked next steps for each lead.",
  },
  {
    icon: "📊",
    title: "Engagement Analyzer",
    desc: "Toggle 6 email features (emojis, CTA, images, video, etc.), select your audience and send time, and paste your email body. Get a full engagement scorecard with predicted open rate, click rate, and CTA clarity score.",
  },
  {
    icon: "🏷",
    title: "Discount Optimizer",
    desc: "Enter product name, discount %, audience, tone, and expiry. MailTitan generates 5 subject line variants, preview texts, full email body copy, spam risk rating, best send time, and conversion prediction.",
  },
];

const FAQS = [
  { q: "Do I need a credit card to sign up?", a: "No. The Starter plan is completely free forever. You only need a card when upgrading to Pro or Team." },
  { q: "How accurate is the spam scoring?", a: "Our spam engine is trained on millions of campaigns and major ISP filter patterns. Scores correlate with real inbox placement at over 91% accuracy." },
  { q: "Can I use MailTitan for cold outreach?", a: "Absolutely. The Lead Scorer and Spam Checker together are the ideal stack for cold outreach — qualify your leads and make sure every email lands in the inbox." },
  { q: "Is my email content stored?", a: "No. All analysis runs in real-time and your email content is never stored on our servers. Each session is fully ephemeral." },
  { q: "What AI model powers MailTitan?", a: "MailTitan uses Claude Sonnet by Anthropic — one of the most capable and safety-focused large language models available." },
  { q: "Can I integrate MailTitan with my ESP?", a: "Pro and Team plans include API access. We have native integrations with Mailchimp, SendGrid, HubSpot, and Klaviyo, with more coming monthly." },
  { q: "How do I upgrade or downgrade my plan?", a: "Go to Settings → Billing at any time. Upgrades take effect immediately. Downgrades apply at the end of your current billing cycle." },
  { q: "Is there a team collaboration feature?", a: "Yes! The Team plan includes shared workspaces, campaign history, and 5 seats so your whole team can analyze and optimize together." },
];

const REVIEWS = [
  { name: "Sarah K.", role: "Email Marketing Manager @ Shopify", avatar: "SK", rating: 5, text: "MailTitan completely changed how we approach cold outreach. The spam checker alone saved us from a deliverability disaster. Our open rates jumped from 18% to 34% in 3 weeks." },
  { name: "Marcus T.", role: "Founder @ GrowthLab", avatar: "MT", rating: 5, text: "The subject line optimizer is insane. I used to spend 30 minutes writing subject lines. Now I get 5 tested variants in 10 seconds. The FOMO type ones consistently outperform everything." },
  { name: "Priya R.", role: "SDR Lead @ Salesforce", avatar: "PR", rating: 5, text: "Lead scoring with BANT has made our pipeline so much cleaner. We stopped chasing cold leads and our close rate went from 12% to 28%. The suggested outreach approach is genuinely good." },
  { name: "James W.", role: "CRO @ ConvertFlow", avatar: "JW", rating: 4, text: "The engagement analyzer predicted our campaign metrics within 3% of actual results. It's become our go-to sanity check before every send. Incredibly accurate for such a simple interface." },
  { name: "Anika S.", role: "Growth Hacker @ Notion", avatar: "AS", rating: 5, text: "I was skeptical about AI tools but MailTitan proved me wrong. The rewritten email from the spam checker is actually better than what I wrote. It keeps the tone but removes every red flag." },
  { name: "Tom B.", role: "Newsletter Creator", avatar: "TB", rating: 5, text: "As a solo creator with 40k subscribers, deliverability is everything. MailTitan's spam check caught 3 trigger words I'd been using for months. Fixed them and my open rate hit an all-time high." },
];

/* ─────────────── COMPONENT ─────────────── */

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navigate = useNavigate();

  // Section refs
  const authRef      = useRef(null);
  const featuresRef  = useRef(null);
  const pricingRef   = useRef(null);
  const docsRef      = useRef(null);
  const tutorialsRef = useRef(null);
  const reviewsRef   = useRef(null);

  // Track scroll for back-to-top
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          setLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/introduction");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/introduction");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleNavLogin = () => {
    setIsSignup(false);
    scrollTo(authRef);
  };

  const handleNavRegister = () => {
    setIsSignup(true);
    scrollTo(authRef);
  };

  return (
    <div className="lp-wrapper">

      {/* CLOUDS */}
      <div className="lp-clouds">
        <div className="cloud cloud1" />
        <div className="cloud cloud2" />
        <div className="cloud cloud3" />
        <div className="cloud cloud4" />
        <div className="cloud cloud5" />
        <div className="cloud cloud6" />
      </div>

      {/* PLANES */}
      <div className="plane plane-lt"><FaPaperPlane /></div>
      <div className="plane plane-lm"><FaPaperPlane /></div>
      <div className="plane plane-lb"><FaPaperPlane /></div>
      <div className="plane plane-rt"><FaPaperPlane /></div>
      <div className="plane plane-rm"><FaPaperPlane /></div>
      <div className="plane plane-rb"><FaPaperPlane /></div>

      {/* ── NAVBAR ── */}
      <nav className="lp-nav">
        <div className="lp-nav-logo">
          <div className="lp-logo-icon"><GiSpartanHelmet /></div>
          MailTitan
        </div>
        <ul className="lp-nav-links">
          <li onClick={() => scrollTo(featuresRef)}>Features</li>
          <li onClick={() => scrollTo(pricingRef)}>Pricing</li>
          <li onClick={() => scrollTo(docsRef)}>Docs</li>
          <li onClick={() => scrollTo(tutorialsRef)}>Tutorials</li>
        </ul>
        <div className="lp-nav-actions">
          <button className="lp-btn-ghost" onClick={handleNavLogin}>Login</button>
          <button className="lp-btn-cta"   onClick={handleNavRegister}>Register</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="lp-hero">
        <div className="lp-hero-content">
          <h1>
            Fast, Reliable <span className="lp-hero-em">Email Campaigns</span>
            <br /><em>Built for Marketers</em>
          </h1>
          <p>Launch powerful email campaigns and dominate the inbox with AI-driven tools that convert.</p>
          <button className="lp-hero-cta" onClick={handleNavRegister}>
            Get Started for Free →
          </button>
          <div className="lp-trust-row">
            <span className="lp-trust-badge">✦ 10k+ Users</span>
            <span className="lp-trust-badge">✦ 99.9% Uptime</span>
            <span className="lp-trust-badge">✦ GDPR Compliant</span>
            <span className="lp-trust-badge">✦ No Credit Card</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="lp-dashboard-preview">
          <div className="lp-preview-bar">
            <span className="lp-dot lp-dot-red" />
            <span className="lp-dot lp-dot-yellow" />
            <span className="lp-dot lp-dot-green" />
            <span className="lp-preview-title">MailTitan Dashboard</span>
          </div>
          <div className="lp-preview-body">
            <div className="lp-preview-sidebar">
              <div className="lp-sidebar-item active" />
              <div className="lp-sidebar-item" />
              <div className="lp-sidebar-item" />
              <div className="lp-sidebar-item" />
              <div className="lp-sidebar-item" />
            </div>
            <div className="lp-preview-main">
              <div className="lp-preview-topbar">
                <div className="lp-preview-search" />
                <div className="lp-preview-btn-sm lp-btn-blue" />
              </div>
              <div className="lp-preview-table">
                <div className="lp-table-header">
                  {[...Array(5)].map((_, i) => <span key={i} />)}
                </div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="lp-table-row">
                    <span className={`lp-cell-status ${i%3===0?"st-green":i%3===1?"st-blue":"st-amber"}`} />
                    <span className="lp-cell-long" />
                    <span className="lp-cell-mid" />
                    <span className="lp-cell-short" />
                    <span className="lp-cell-mid" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          FEATURES SECTION
      ══════════════════════════════════ */}
      <section ref={featuresRef} className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-section-badge">✦ What We Offer</div>
          <h2 className="lp-section-title">6 AI Tools. One Inbox Strategy.</h2>
          <p className="lp-section-sub">Everything you need to write, analyze, and optimize emails that actually reach the inbox and convert.</p>
          <div className="lp-features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="lp-feature-card">
                <div className="lp-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="lp-back-top" onClick={scrollToTop}>↑</button>
      </section>

      {/* ══════════════════════════════════
          PRICING SECTION
      ══════════════════════════════════ */}
      <section ref={pricingRef} className="lp-section lp-section-alt">
        <div className="lp-section-inner">
          <div className="lp-section-badge">✦ Transparent Pricing</div>
          <h2 className="lp-section-title">Simple Plans, Powerful Results</h2>
          <p className="lp-section-sub">Start free. Scale when ready. No hidden fees, no contracts, cancel anytime.</p>
          <div className="lp-pricing-grid">
            {PRICING.map((p, i) => (
              <div key={i} className={`lp-pricing-card ${p.color}`}>
                {p.badge && <div className="lp-pricing-badge">{p.badge}</div>}
                <div className="lp-pricing-plan">{p.plan}</div>
                <div className="lp-pricing-price">
                  {p.price}<span className="lp-pricing-period">{p.period}</span>
                </div>
                <ul className="lp-pricing-features">
                  {p.features.map((f, j) => (
                    <li key={j}><span className="lp-check">✓</span>{f}</li>
                  ))}
                </ul>
                <button
                  className={`lp-pricing-cta ${p.color === "plan-pro" ? "cta-pro" : "cta-default"}`}
                  onClick={handleNavRegister}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="lp-back-top" onClick={scrollToTop}>↑</button>
      </section>

      {/* ══════════════════════════════════
          DOCS SECTION
      ══════════════════════════════════ */}
      <section ref={docsRef} className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-section-badge">✦ Documentation</div>
          <h2 className="lp-section-title">Everything You Need to Know</h2>
          <p className="lp-section-sub">Quick-start guides for every tool in the MailTitan suite. No technical knowledge required.</p>
          <div className="lp-docs-grid">
            {DOCS.map((d, i) => (
              <div key={i} className="lp-doc-card">
                <div className="lp-doc-icon">{d.icon}</div>
                <div className="lp-doc-body">
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="lp-back-top" onClick={scrollToTop}>↑</button>
      </section>

      {/* ══════════════════════════════════
          TUTORIALS (FAQ) SECTION
      ══════════════════════════════════ */}
      <section ref={tutorialsRef} className="lp-section lp-section-alt">
        <div className="lp-section-inner">
          <div className="lp-section-badge">✦ Tutorials & FAQ</div>
          <h2 className="lp-section-title">Frequently Asked Questions</h2>
          <p className="lp-section-sub">Got questions? We've got answers. If you don't see yours here, reach out via chat support.</p>
          <div className="lp-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`lp-faq-item ${openFaq === i ? "open" : ""}`}>
                <button
                  className="lp-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className="lp-faq-chevron">{openFaq === i ? "▲" : "▼"}</span>
                </button>
                {openFaq === i && (
                  <div className="lp-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button className="lp-back-top" onClick={scrollToTop}>↑</button>
      </section>

      {/* ══════════════════════════════════
          REVIEWS SECTION
      ══════════════════════════════════ */}
      <section ref={reviewsRef} className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-section-badge">✦ Customer Reviews</div>
          <h2 className="lp-section-title">Loved by 10,000+ Marketers</h2>
          <p className="lp-section-sub">Real results from real teams. See how MailTitan is transforming email performance across industries.</p>
          <div className="lp-reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="lp-review-card">
                <div className="lp-review-top">
                  <div className="lp-review-avatar">{r.avatar}</div>
                  <div>
                    <div className="lp-review-name">{r.name}</div>
                    <div className="lp-review-role">{r.role}</div>
                  </div>
                  <div className="lp-review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                </div>
                <p className="lp-review-text">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
        <button className="lp-back-top" onClick={scrollToTop}>↑</button>
      </section>

      {/* ══════════════════════════════════
          AUTH SECTION
      ══════════════════════════════════ */}
      <div ref={authRef} className="lp-auth-float">
        <div className="lp-auth-card">
          <div className="lp-auth-tabs">
            <button className={`lp-auth-tab ${!isSignup?"active":""}`} onClick={() => setIsSignup(false)}>Sign In</button>
            <button className={`lp-auth-tab ${isSignup?"active":""}`}  onClick={() => setIsSignup(true)}>Register</button>
          </div>
          <h3 className="lp-auth-title">{isSignup ? "Create your account" : "Welcome back"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="lp-input-group">
              <span className="lp-input-icon">✉</span>
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="lp-input-group">
              <span className="lp-input-icon">🔒</span>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {isSignup && (
              <div className="lp-input-group">
                <span className="lp-input-icon">🔒</span>
                <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
            )}
            <button type="submit" className="lp-submit-btn" disabled={loading}>
              {loading ? <><span className="lp-btn-spinner" /> Processing…</> : isSignup ? "Create Account" : "Get Started"}
            </button>
          </form>

          <div className="lp-divider"><span>or</span></div>

          <button className="lp-google-btn" onClick={handleGoogleLogin}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {!isSignup && <p className="lp-forgot">Forgot password? <span>Reset here</span></p>}
        </div>
      </div>

      {/* ── GLOBAL BACK TO TOP (appears after scrolling) ── */}
      {showBackToTop && (
        <button className="lp-global-top" onClick={scrollToTop} title="Back to top">↑</button>
      )}

    </div>
  );
};

export default Login;