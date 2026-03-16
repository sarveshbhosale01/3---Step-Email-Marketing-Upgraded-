import React, { useState } from "react";
import "./ColdEmailGenerator.css";

const ColdEmailGenerator = () => {

const [company,setCompany] = useState("");
const [industry,setIndustry] = useState("");
const [role,setRole] = useState("");
const [result,setResult] = useState("");

const generateIntro = () => {

const intro = `Hi ${role},

I noticed that ${company} has been making interesting moves in the ${industry} space.

We’ve been helping companies like yours improve their operational efficiency and growth strategy, and I thought it might be valuable to connect.

Would you be open to a quick conversation this week?`;

setResult(intro);

};

return (

<div className="cold-container">

<h1>Cold Email Personalization Generator</h1>

<div className="cold-card">

<input
type="text"
placeholder="Company Name"
value={company}
onChange={(e)=>setCompany(e.target.value)}
/>

<input
type="text"
placeholder="Industry"
value={industry}
onChange={(e)=>setIndustry(e.target.value)}
/>

<input
type="text"
placeholder="Decision Maker Role (CEO / VP / Director)"
value={role}
onChange={(e)=>setRole(e.target.value)}
/>

<button onClick={generateIntro}>
Generate Email Intro
</button>

{result && (
<textarea value={result} readOnly />
)}

</div>

</div>

);

};

export default ColdEmailGenerator;