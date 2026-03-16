import React,{useState} from "react";
import "./EngagementScore.css";

const EngagementScore = () => {

const [length,setLength] = useState("");
const [emoji,setEmoji] = useState(false);
const [cta,setCta] = useState(false);
const [score,setScore] = useState(null);

const calculateScore = () => {

let result = 0;

if(length < 80) result += 30;
else if(length < 150) result += 20;

if(emoji) result += 30;
if(cta) result += 40;

setScore(result);

};

return(

<div className="engage-container">

<h1>Customer Engagement Score</h1>

<p>Estimate how engaging your marketing email might be.</p>

<div className="engage-card">

<input
type="number"
placeholder="Email Length (characters)"
value={length}
onChange={(e)=>setLength(e.target.value)}
/>

<label>
<input
type="checkbox"
checked={emoji}
onChange={()=>setEmoji(!emoji)}
/>
Uses Emojis
</label>

<label>
<input
type="checkbox"
checked={cta}
onChange={()=>setCta(!cta)}
/>
Contains CTA Button
</label>

<button onClick={calculateScore}>
Calculate Engagement
</button>

{score !== null && (
<div className="engage-result">
Engagement Score: {score}/100
</div>
)}

</div>

</div>

);

};

export default EngagementScore;