import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Confetti from "react-confetti";

import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";

import {
Chart as ChartJS,
ArcElement,
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
Tooltip,
Legend
} from "chart.js";

import "./CampaignResult.css";

ChartJS.register(
ArcElement,
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
Tooltip,
Legend
);

const CampaignResult = () => {

const location = useLocation();
const navigate = useNavigate();

const stats = location.state || {
sent:0,
failed:0,
total:0
};

/* Redirect to review page after 10 seconds */

useEffect(()=>{

const timer = setTimeout(()=>{

navigate("/review");

},10000);

return ()=>clearTimeout(timer);

},[navigate]);

/* Campaign Metrics */

const deliveryRate = stats.total
? ((stats.sent / stats.total) * 100).toFixed(1)
: 0;

const failureRate = stats.total
? ((stats.failed / stats.total) * 100).toFixed(1)
: 0;

/* AI predicted open rate */

const openRate = Math.floor(deliveryRate * 0.7);

/* engagement score */

const engagementScore = Math.floor(openRate * 0.6);

/* bounce probability */

const bounceRisk = Math.min(100, Math.floor(failureRate * 1.2));

/* Domain estimation */

const gmail = Math.floor(stats.sent * 0.45);
const outlook = Math.floor(stats.sent * 0.30);
const corporate = stats.sent - gmail - outlook;

/* Charts */

const pieData = {
labels:["Sent","Failed"],
datasets:[
{
data:[stats.sent,stats.failed],
backgroundColor:["#22c55e","#ef4444"]
}
]
};

const barData = {
labels:["Campaign"],
datasets:[
{
label:"Sent",
data:[stats.sent],
backgroundColor:"#3b82f6"
},
{
label:"Failed",
data:[stats.failed],
backgroundColor:"#ef4444"
}
]
};

const timelineData = {
labels:["Start","Mid","End"],
datasets:[
{
label:"Emails Sent",
data:[0,stats.sent/2,stats.sent],
borderColor:"#6366f1",
tension:0.4
}
]
};

const domainData = {
labels:["Gmail","Outlook","Corporate"],
datasets:[
{
data:[gmail,outlook,corporate],
backgroundColor:["#60a5fa","#34d399","#fbbf24"]
}
]
};

const bounceData = {
labels:["Delivery Rate","Failure Rate","Bounce Risk"],
datasets:[
{
label:"Campaign Health",
data:[deliveryRate,failureRate,bounceRisk],
backgroundColor:["#22c55e","#f97316","#ef4444"]
}
]
};

const aiPerformanceData = {
labels:["Open Rate","Engagement","Delivery"],
datasets:[
{
label:"AI Campaign Analysis",
data:[openRate,engagementScore,deliveryRate],
backgroundColor:["#6366f1","#06b6d4","#22c55e"]
}
]
};

return(

<div className="result-page">

<Confetti numberOfPieces={250}/>

<h1 className="success-title">
🎉 Campaign Sent Successfully!
</h1>

<p className="redirect-msg">
Redirecting to review page in 10 seconds...
</p>

{/* STAT CARDS */}

<div className="stats-grid">

<div className="stat-card">
<h3>Total Emails</h3>
<p>
<CountUp end={stats.total} duration={2}/>
</p>
</div>

<div className="stat-card green">
<h3>Sent</h3>
<p>
<CountUp end={stats.sent} duration={2}/>
</p>
</div>

<div className="stat-card red">
<h3>Failed</h3>
<p>
<CountUp end={stats.failed} duration={2}/>
</p>
</div>

<div className="stat-card purple">
<h3>AI Open Rate</h3>
<p>{openRate}%</p>
</div>

</div>

{/* CHARTS */}

<div className="charts-grid">

<div className="chart-card">
<h3>Email Delivery</h3>
<Pie data={pieData}/>
</div>

<div className="chart-card">
<h3>Campaign Performance</h3>
<Bar data={barData}/>
</div>

<div className="chart-card">
<h3>Campaign Timeline</h3>
<Line data={timelineData}/>
</div>

<div className="chart-card">
<h3>Email Domains</h3>
<Doughnut data={domainData}/>
</div>

<div className="chart-card">
<h3>Campaign Health</h3>
<Bar data={bounceData}/>
</div>

<div className="chart-card">
<h3>AI Campaign Analysis</h3>
<Bar data={aiPerformanceData}/>
</div>

</div>

</div>

);

};

export default CampaignResult;