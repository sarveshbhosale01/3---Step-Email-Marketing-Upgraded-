import React from "react";
import { useNavigate } from "react-router-dom";
import {
FaShieldAlt,
FaEnvelopeOpenText,
FaInbox,
FaNetworkWired,
FaFire,
FaTags,
FaChartLine,
FaBullhorn
} from "react-icons/fa";

import "./B2CDashboard.css";

const B2CDashboard = () => {

const navigate = useNavigate();

return (

<div className="b2c-container">

<h1 className="b2c-title">B2C Email Marketing Tools</h1>

<p className="b2c-subtitle">
Create high-converting campaigns designed to engage customers and drive sales.
</p>


{/* COMMON TOOLS */}

<h2 className="b2c-section-title">Common Email Tools</h2>

<div className="b2c-grid">

{/* Subject Line Tester */}
<div className="b2c-card" onClick={() => navigate("/subject-tester")}>

<FaEnvelopeOpenText className="b2c-icon"/>

<h3>Subject Line Tester</h3>

<p>
Test subject lines and improve open rates for promotional campaigns.
</p>

</div>


{/* Spam Checker */}
<div className="b2c-card" onClick={() => navigate("/spam-checker")}>

<FaShieldAlt className="b2c-icon"/>

<h3>Spam Checker</h3>

<p>
Ensure your promotional emails avoid spam filters and reach inboxes.
</p>

</div>


{/* Deliverability Test */}
<div className="b2c-card" onClick={() => navigate("/deliverability-test")}>

<FaInbox className="b2c-icon"/>

<h3>Email Deliverability Test</h3>

<p>
Check where your promotional email lands and optimize your subject
line and content for better inbox placement.
</p>

</div>


{/* IP / Sender Checker */}
<div className="b2c-card" onClick={() => navigate("/ip-checker")}>

<FaNetworkWired className="b2c-icon"/>

<h3>IP / Sender Checker</h3>

<p>
Verify if your sending IP or email domain is legitimate before launching campaigns.
</p>

</div>


{/* Warmup Planner */}
<div className="b2c-card" onClick={() => navigate("/warmup-planner")}>

<FaFire className="b2c-icon"/>

<h3>Warmup Planner</h3>

<p>
Generate a safe email warmup schedule to build domain reputation and improve deliverability.
</p>

</div>

</div>



{/* B2C EXCLUSIVE TOOLS */}

<h2 className="b2c-section-title">Exclusive for B2C</h2>

<div className="b2c-grid">

{/* Discount Optimizer */}
<div className="b2c-card" onClick={() => navigate("/discount-optimizer")}>

<FaTags className="b2c-icon"/>

<h3>Discount Email Optimizer</h3>

<p>
Create high-performing promotional offers and optimize discount campaigns.
</p>

</div>


{/* Engagement Score */}
<div className="b2c-card" onClick={() => navigate("/engagement-score")}>

<FaChartLine className="b2c-icon"/>

<h3>Customer Engagement Score</h3>

<p>
Estimate how engaging your marketing email will be before sending it.
</p>

</div>


{/* Promotion Generator */}
<div className="b2c-card" onClick={() => navigate("/promotion-generator")}>

<FaBullhorn className="b2c-icon"/>

<h3>Product Promotion Generator</h3>

<p>
Generate complete promotional email content for product launches.
</p>

</div>

</div>

</div>

);

};

export default B2CDashboard;