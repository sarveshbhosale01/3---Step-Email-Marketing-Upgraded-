import React, { useState } from "react";
import "./launchCampaign.css";

const LaunchCampaign = () => {

const [sending,setSending] = useState(false);
const [progress,setProgress] = useState(0);
const [stats,setStats] = useState({
sent:0,
failed:0,
total:0
});

const startCampaign = async () => {

setSending(true);

try{

const res = await fetch("http://localhost:5000/send-campaign",{
method:"POST"
});

const data = await res.json();

setStats(data);

}catch(err){

console.log(err);

}

setSending(false);

};

return(

<div className="campaign-container">

<h1 className="campaign-title">
Launching Personalized Campaign
</h1>

<p className="campaign-subtitle">
Each customer will receive a personalized email based on
their company, industry and needs.
</p>

{/* Progress */}

<div className="progress-section">

<div className="progress-bar">

<div
className="progress-fill"
style={{width:`${progress}%`}}
></div>

</div>

<p className="progress-text">
{progress}% Completed
</p>

</div>

{/* Stats */}

<div className="campaign-stats">

<div className="stat-card">
<h3>{stats.total}</h3>
<p>Total Recipients</p>
</div>

<div className="stat-card">
<h3>{stats.sent}</h3>
<p>Emails Sent</p>
</div>

<div className="stat-card">
<h3>{stats.failed}</h3>
<p>Failed</p>
</div>

</div>

{/* Launch Button */}

<button
className="launch-btn"
onClick={startCampaign}
disabled={sending}
>

{sending ? "Sending Emails..." : "Start Campaign"}

</button>

</div>

);

};

export default LaunchCampaign;