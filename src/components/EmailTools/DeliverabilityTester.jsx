import React, { useState } from "react";
import "./DeliverabilityTester.css";
import { FaPaperPlane, FaCopy } from "react-icons/fa";

const DeliverabilityTester = () => {

const [testEmail] = useState(
"3611c77fcd435b4@ia-tester.com"
);

const [status,setStatus] = useState("Waiting for email");

const copyEmail = () => {
navigator.clipboard.writeText(testEmail);
alert("Test email copied!");
};

/* Simulated report generation */

const checkStatus = () => {

setStatus("Generating report...");

setTimeout(()=>{

const placements = ["Inbox","Promotions","Spam"];
const result = placements[Math.floor(Math.random()*placements.length)];

setStatus(result);

},2000)

};

return (

<div className="deliver-container">

<h1>Email Spam & Deliverability Checker</h1>

<p className="deliver-sub">
Send your marketing email to the test address below and we will analyze
where it lands.
</p>

<div className="deliver-card">

<div className="deliver-header">

<FaPaperPlane className="deliver-icon"/>

<h2>Test Your Email Deliverability</h2>

<p>Send your campaign email to the address below.</p>

</div>

<div className="email-box">

<span>{testEmail}</span>

<button onClick={copyEmail}>

<FaCopy/> Copy Email

</button>

</div>

<div className="status-section">

<div className="status-step active">1 Waiting for email</div>
<div className="status-step">2 Generating report</div>
<div className="status-step">3 Finalizing</div>

</div>

<button className="check-btn" onClick={checkStatus}>
Check Status
</button>

{status !== "Waiting for email" && (

<div className={`result-box ${status.toLowerCase()}`}>

<h3>Result: {status}</h3>

<p>
{status === "Inbox" && "Great! Your email has strong deliverability."}
{status === "Promotions" && "Your email landed in Promotions. Improve subject and content."}
{status === "Spam" && "Your email was marked as spam. Adjust content and spam words."}

</p>

</div>

)}

</div>

</div>

);

};

export default DeliverabilityTester;