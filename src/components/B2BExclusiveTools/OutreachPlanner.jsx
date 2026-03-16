import React,{useState} from "react";
import "./OutreachPlanner.css";

const OutreachPlanner = () => {

const [days,setDays] = useState(4);
const [plan,setPlan] = useState([]);

const generatePlan = () => {

let sequence = [];

for(let i=1;i<=days;i++){

sequence.push(`Day ${i*3}: Follow up email`);

}

setPlan(sequence);

};

return(

<div className="outreach-container">

<h1>B2B Outreach Sequence Planner</h1>

<div className="outreach-card">

<input
type="number"
placeholder="Number of Follow-ups"
value={days}
onChange={(e)=>setDays(e.target.value)}
/>

<button onClick={generatePlan}>
Generate Sequence
</button>

{plan.length > 0 && (

<ul>

{plan.map((item,index)=>(
<li key={index}>{item}</li>
))}

</ul>

)}

</div>

</div>

);

};

export default OutreachPlanner;