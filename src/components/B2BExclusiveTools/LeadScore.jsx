import React,{useState} from "react";
import "./LeadScore.css";

const LeadScore = () => {

const [companySize,setCompanySize] = useState("");
const [budget,setBudget] = useState("");
const [score,setScore] = useState(null);

const calculateScore = () => {

let total = 0;

if(companySize > 50) total += 50;
if(budget > 10000) total += 50;

setScore(total);

};

return(

<div className="lead-container">

<h1>Lead Qualification Score</h1>

<div className="lead-card">

<input
type="number"
placeholder="Company Size"
value={companySize}
onChange={(e)=>setCompanySize(e.target.value)}
/>

<input
type="number"
placeholder="Estimated Budget"
value={budget}
onChange={(e)=>setBudget(e.target.value)}
/>

<button onClick={calculateScore}>
Calculate Score
</button>

{score !== null && (
<div className="lead-result">
Lead Score: {score}/100
</div>
)}

</div>

</div>

);

};

export default LeadScore;