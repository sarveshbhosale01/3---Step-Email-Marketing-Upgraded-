import React from "react";
import { useNavigate } from "react-router-dom";
import "./CampaignType.css";

const CampaignType = () => {

const navigate = useNavigate();

const handleSelect = (type) => {

if(type === "b2b"){
navigate("/b2b");
}
else{
navigate("/b2c");
}

};

return (

<div className="campaign-container">
    <div className="cloud cloud1"></div>
<div className="cloud cloud2"></div>

<div className="plane plane1">✈</div>
<div className="plane plane2">✈</div>
<div className="plane plane3">✈</div>

<h1 className="campaign-title">Select Campaign Type</h1>

<p className="campaign-subtitle">
Choose the type of email marketing campaign you want to run.
</p>

<div className="campaign-grid">

{/* B2B CARD */}

<div className="campaign-card">

<h2>B2B Campaign</h2>

<p className="campaign-desc">
Target businesses and decision-makers with professional outreach emails designed to generate leads, partnerships, and new opportunities.
</p>

<ul>
<li>Lead generation outreach</li>
<li>Business partnership campaigns</li>
<li>Industry specific targeting</li>
<li>Professional email communication</li>
</ul>

<button onClick={() => handleSelect("b2b")}>
Select
</button>

</div>


{/* B2C CARD */}

<div className="campaign-card">

<h2>B2C Campaign</h2>

<p className="campaign-desc">
Promote products or services directly to customers with engaging marketing emails designed to increase sales and engagement.
</p>

<ul>
<li>Promotional offers</li>
<li>Product announcements</li>
<li>Customer engagement campaigns</li>
<li>Seasonal marketing emails</li>
</ul>

<button style={{margin: "20px 0"}} onClick={() => handleSelect("b2c")}>
Select
</button>

</div>

</div>

</div>

);

};

export default CampaignType;