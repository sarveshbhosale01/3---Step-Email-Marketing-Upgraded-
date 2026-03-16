import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaFileCsv, FaPaperPlane, FaChartLine } from "react-icons/fa";
import "./introduction.css";

const Introduction = () => {

const navigate = useNavigate();

return (

<div className="intro-container">

{/* CLOUD BACKGROUND */}

<div className="cloud cloud1"></div>
<div className="cloud cloud2"></div>
<div className="cloud cloud3"></div>


{/* PLANES */}

<div className="paper-plane plane1">✈</div>
<div className="paper-plane plane2">✈</div>
<div className="paper-plane plane3">✈</div>
<div className="paper-plane plane4">✈</div>
<div className="paper-plane plane5">✈</div>


{/* HERO SECTION */}

<section className="hero-section">

<h1 className="hero-title">
Welcome to <span>MailTitan</span>
</h1>

<p className="hero-subtitle">
MailTitan helps marketers build high-performance email campaigns
while improving deliverability, avoiding spam filters,
and maximizing engagement.
</p>

</section>


{/* INTRO CARD */}

<div className="intro-card">

<h2 className="intro-title">How MailTitan Works</h2>

<p className="intro-subtitle">
Our platform simplifies the process of creating and managing
professional email marketing campaigns.
</p>


<div className="steps-container">

<div className="step">

<FaClipboardList className="step-icon"/>

<h3>Select Template</h3>

<p>
Choose a professionally designed email template
that matches your campaign.
</p>

</div>


<div className="step">

<FaFileCsv className="step-icon"/>

<h3>Upload Customer List</h3>

<p>
Upload your audience list using CSV or Excel
to target the right customers.
</p>

</div>


<div className="step">

<FaPaperPlane className="step-icon"/>

<h3>Send Personalized Emails</h3>

<p>
Our system automatically personalizes
and sends emails to each customer.
</p>

</div>


<div className="step">

<FaChartLine className="step-icon"/>

<h3>Analyze Campaign Performance</h3>

<p>
Track delivery rate, open rate,
spam score, and campaign performance.
</p>

</div>

</div>


<button
className="continue-btn"
onClick={() => navigate("/CampaignType")}
>
Continue →
</button>

</div>

</div>

);

};

export default Introduction;