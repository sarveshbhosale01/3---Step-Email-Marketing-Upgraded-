import React, { useEffect, useRef } from "react";
import "./ReviewPage.css";
import { useNavigate } from "react-router-dom";

import { FaGoogle, FaAmazon, FaMicrosoft, FaSlack, FaShopify } from "react-icons/fa";

const ReviewPage = () => {

const navigate = useNavigate();
const timerRef = useRef(null);

/* Auto redirect to ThankYou page after 10s */

useEffect(()=>{

timerRef.current = setTimeout(()=>{

navigate("/thankyou");

},10000);

return ()=>clearTimeout(timerRef.current);

},[navigate]);

/* If user clicks feedback */

const handleFeedback = () => {

clearTimeout(timerRef.current);

navigate("/contact");

};

return (

<div className="review-page">

{/* HERO SUCCESS */}

<section className="review-hero">

<h1>🚀 Campaign Completed Successfully</h1>

<p>
Your campaign has been delivered successfully.
Here is what our clients say about our campaign platform.
</p>

<p className="redirect-text">
Redirecting to next step in 10 seconds...
</p>

</section>


{/* TRUSTED BY */}

<section className="trusted-section">

<h2>Trusted by teams worldwide</h2>

<div className="company-logos">

<div className="logo-item"><FaGoogle/> Google</div>
<div className="logo-item"><FaAmazon/> Amazon</div>
<div className="logo-item"><FaMicrosoft/> Microsoft</div>
<div className="logo-item"><FaSlack/> Slack</div>
<div className="logo-item"><FaShopify/> Shopify</div>

</div>

</section>


{/* TESTIMONIALS */}

<section className="testimonials">

<h2>Real Client Reviews</h2>

<div className="testimonial-grid">

<div className="testimonial-card">

<p>
"Within 48 hours of launching our campaign we generated
over 120 qualified leads. The automation and analytics
dashboard are incredibly powerful."
</p>

<h4>Daniel Brooks</h4>
<span>Marketing Director • GrowthLabs</span>

</div>

<div className="testimonial-card">

<p>
"The campaign analytics helped us understand our audience
better and optimize outreach strategy. The system is
extremely intuitive."
</p>

<h4>Priya Sharma</h4>
<span>Product Manager • CloudScale</span>

</div>

<div className="testimonial-card">

<p>
"We improved our outreach response rate by 37%.
The AI email generation is a game changer for
our B2B sales team."
</p>

<h4>Marcus Lee</h4>
<span>CTO • TechNova</span>

</div>

</div>

</section>


{/* RESULTS */}

<section className="results">

<h2>What clients achieved</h2>

<div className="results-grid">

<div className="result-card">
<h1>37%</h1>
<p>Higher response rate</p>
</div>

<div className="result-card">
<h1>3x</h1>
<p>Faster campaign launches</p>
</div>

<div className="result-card">
<h1>120+</h1>
<p>Leads generated</p>
</div>

<div className="result-card">
<h1>98%</h1>
<p>Email deliverability</p>
</div>

</div>

</section>


{/* PROCESS */}

<section className="process">

<h2>Our proven campaign process</h2>

<div className="process-steps">

<div className="step">
<h1>01</h1>
<p>Upload Leads</p>
</div>

<div className="step">
<h1>02</h1>
<p>Clean Data</p>
</div>

<div className="step">
<h1>03</h1>
<p>Launch Campaign</p>
</div>

<div className="step">
<h1>04</h1>
<p>Analyze Results</p>
</div>

</div>

</section>


{/* FEEDBACK */}

<section className="feedback-section">

<h2>We would love your feedback</h2>

<p>
Your experience helps us improve the platform.
Please share your feedback about the campaign.
</p>

<button
className="feedback-btn"
onClick={handleFeedback}
>

Leave Feedback

</button>

</section>

</div>

);

};

export default ReviewPage;