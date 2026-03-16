import React from "react";
import { useNavigate } from "react-router-dom";
import {
FaShieldAlt,
FaEnvelopeOpenText,
FaInbox,
FaNetworkWired,
FaFire,
FaUserTie,
FaProjectDiagram,
FaChartBar
} from "react-icons/fa";

import "./B2BDashboard.css";

const B2BDashboard = () => {

const navigate = useNavigate();

return (

<div className="b2b-container">

{/* FLOATING CLOUDS */}
<div className="cloud cloud1"></div>
<div className="cloud cloud2"></div>
<div className="cloud cloud3"></div>

{/* FLYING AIRPLANE */}
<div className="flying-plane plane-a">
<span className="plane">✈</span>
<div className="contrail"></div>
</div>

<div className="flying-plane plane-b">
<span className="plane">✈</span>
<div className="contrail"></div>
</div>

<div className="flying-plane plane-c">
<span className="plane">✈</span>
<div className="contrail"></div>
</div>

<h1 className="b2b-title">
B2B Email <span className="highlight">Marketing Tools</span>
</h1>

<p className="b2b-subtitle">
Optimize professional outreach campaigns for decision-makers and businesses.
</p>


{/* COMMON TOOLS */}

<h2 className="b2b-section-title">Common Email Tools</h2>

<div className="b2b-grid">

<div className="b2b-card" onClick={()=>navigate("/subject-tester")}>
<FaEnvelopeOpenText className="b2b-icon"/>
<h3>Subject Line Tester</h3>
<p>Analyze subject line performance and predict engagement before sending emails.</p>
</div>

<div className="b2b-card" onClick={()=>navigate("/spam-checker")}>
<FaShieldAlt className="b2b-icon"/>
<h3>Spam Checker</h3>
<p>Detect spam trigger words and improve deliverability for business outreach.</p>
</div>

<div className="b2b-card" onClick={()=>navigate("/deliverability-test")}>
<FaInbox className="b2b-icon"/>
<h3>Email Deliverability Test</h3>
<p>Check where your email lands — Inbox, Promotions, or Spam.</p>
</div>

<div className="b2b-card" onClick={()=>navigate("/ip-checker")}>
<FaNetworkWired className="b2b-icon"/>
<h3>IP / Sender Checker</h3>
<p>Verify if your sending IP or email domain is legitimate before campaigns.</p>
</div>

<div className="b2b-card" onClick={()=>navigate("/warmup-planner")}>
<FaFire className="b2b-icon"/>
<h3>Warmup Planner</h3>
<p>Generate a safe email warmup schedule to build domain reputation.</p>
</div>

</div>


{/* B2B EXCLUSIVE */}

<h2 className="b2b-section-title">Exclusive for B2B</h2>

<div className="b2b-grid">

<div className="b2b-card" onClick={()=>navigate("/cold-email-generator")}>
<FaUserTie className="b2b-icon"/>
<h3>Cold Email Personalization</h3>
<p>Generate personalized cold email intros for decision-makers.</p>
</div>

<div className="b2b-card" onClick={()=>navigate("/outreach-planner")}>
<FaProjectDiagram className="b2b-icon"/>
<h3>Outreach Sequence Planner</h3>
<p>Plan multi-step follow-up email sequences for better response rates.</p>
</div>

<div className="b2b-card" onClick={()=>navigate("/lead-score")}>
<FaChartBar className="b2b-icon"/>
<h3>Lead Qualification Score</h3>
<p>Evaluate potential leads and identify high-value prospects.</p>
</div>

</div>


{/* CAMPAIGN BUTTON */}

<div className="campaign-launch">

<p className="launch-text">
Ready to start your outreach campaign?
</p>

<button
className="launch-btn"
onClick={()=>navigate("/template")}
>

<span className="launch-icon">✈</span>
Launch Campaign Builder

</button>

</div>

</div>

);

};

export default B2BDashboard;