import React, { useState } from "react";
import "./WarmupPlanner.css";

const WarmupPlanner = () => {

const [volume,setVolume] = useState(100);
const [inboxRate,setInboxRate] = useState(80);
const [history,setHistory] = useState("Established Domain");
const [reputation,setReputation] = useState("Unknown Reputation");
const [strategy,setStrategy] = useState("Recommended");
const [plan,setPlan] = useState([]);

const generatePlan = () => {

let growth;

if(strategy === "Conservative") growth = 1.2;
if(strategy === "Recommended") growth = 1.5;
if(strategy === "Aggressive") growth = 2;

let current = 10;
let warmupPlan = [];

for(let day = 1; day <= 14; day++){

warmupPlan.push({
day,
emails: Math.round(current)
});

current = current * growth;

if(current > volume) current = volume;

}

setPlan(warmupPlan);

};

return (

<div className="warmup-container">

<h1>Use the Free Warmup Planner</h1>

<p className="warmup-sub">
Plan a safe warmup schedule to improve your domain reputation and inbox placement.
</p>

<div className="warmup-card">

<div className="form-row">

<div className="form-group">

<label>Daily Email Volume</label>

<input
type="number"
value={volume}
onChange={(e)=>setVolume(e.target.value)}
/>

</div>


<div className="form-group">

<label>Inboxing Rate (%)</label>

<input
type="range"
min="0"
max="100"
value={inboxRate}
onChange={(e)=>setInboxRate(e.target.value)}
/>

<span>{inboxRate}%</span>

</div>

</div>


<div className="form-row">

<div className="form-group">

<label>Domain Sending History</label>

<select
value={history}
onChange={(e)=>setHistory(e.target.value)}
>

<option>New Domain</option>
<option>Established Domain</option>

</select>

</div>


<div className="form-group">

<label>Domain Reputation</label>

<select
value={reputation}
onChange={(e)=>setReputation(e.target.value)}
>

<option>Unknown Reputation</option>
<option>Good Reputation</option>
<option>Poor Reputation</option>

</select>

</div>

</div>


<div className="strategy-row">

<div
className={`strategy-card ${strategy==="Conservative"?"active":""}`}
onClick={()=>setStrategy("Conservative")}
>

<h3>Conservative</h3>
<p>Slower and safer warmup</p>

</div>

<div
className={`strategy-card ${strategy==="Recommended"?"active":""}`}
onClick={()=>setStrategy("Recommended")}
>

<h3>Recommended</h3>
<p>Balanced approach</p>

</div>

<div
className={`strategy-card ${strategy==="Aggressive"?"active":""}`}
onClick={()=>setStrategy("Aggressive")}
>

<h3>Aggressive</h3>
<p>Faster ramp-up</p>

</div>

</div>


<button className="generate-btn" onClick={generatePlan}>
Generate Plan
</button>


{plan.length > 0 && (

<div className="plan-table">

<h3>Warmup Schedule</h3>

<table>

<thead>
<tr>
<th>Day</th>
<th>Emails to Send</th>
</tr>
</thead>

<tbody>

{plan.map((item)=>(
<tr key={item.day}>
<td>Day {item.day}</td>
<td>{item.emails}</td>
</tr>
))}

</tbody>

</table>

</div>

)}

</div>

</div>

);

};

export default WarmupPlanner;