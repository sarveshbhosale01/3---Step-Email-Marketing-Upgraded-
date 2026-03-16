import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./ThankYou.css";

const ThankYou = () => {

const navigate = useNavigate();

useEffect(()=>{

const timer = setTimeout(()=>{

navigate("/");

},10000); // redirect to home after 10s

return ()=>clearTimeout(timer);

},[navigate]);

return (

<div className="thankyou-page">

<h1>🎉 Thank You for Using Our Campaign System</h1>

<p>
Your email campaign was successfully sent and analysed.
</p>

<div className="features">

<h3>What You Can Explore Next</h3>

<ul>

<li>📊 Advanced Campaign Analytics</li>

<li>🤖 AI Generated Email Campaigns</li>

<li>📧 Smart Email Personalisation</li>

<li>🎯 Audience Segmentation</li>

<li>📈 Performance Tracking Dashboard</li>

</ul>

</div>

<p className="redirect-text">
Redirecting you to homepage...
</p>

</div>

);

};

export default ThankYou;