import React, { useState } from "react";
import "./SubjectTester.css";

const SubjectTester = () => {

const [subject,setSubject] = useState("");
const [preheader,setPreheader] = useState("");
const [score,setScore] = useState(null);
const [feedback,setFeedback] = useState("");

const analyzeSubject = () => {

let calculatedScore = 0;
let notes = [];

/* length check */

if(subject.length >= 30 && subject.length <= 60){
calculatedScore += 30;
}
else{
notes.push("Subject length should be between 30-60 characters");
}

/* preheader check */

if(preheader.length >= 40 && preheader.length <= 100){
calculatedScore += 25;
}
else{
notes.push("Pre-header length should be between 40-100 characters");
}

/* urgency words */

const urgencyWords = ["today","now","limited","exclusive","offer"];

if(urgencyWords.some(word => subject.toLowerCase().includes(word))){
calculatedScore += 20;
}

/* personalization */

if(subject.includes("{") || subject.includes("Hi")){
calculatedScore += 15;
}

/* engagement */

if(subject.includes("?") || subject.includes("!")){
calculatedScore += 10;
}

setScore(calculatedScore);

if(notes.length === 0){
setFeedback("Great subject line! Optimized for engagement.");
}
else{
setFeedback(notes.join(", "));
}

};

const getColor = () => {

if(score >= 80) return "green";
if(score >= 60) return "orange";
return "red";

};

return (

<div className="tester-container">

<h2>Subject Line & Pre-Header Tester</h2>

<input
type="text"
placeholder="Enter Subject Line"
value={subject}
onChange={(e)=>setSubject(e.target.value)}
/>

<input
type="text"
placeholder="Enter Pre-header"
value={preheader}
onChange={(e)=>setPreheader(e.target.value)}
/>

<button onClick={analyzeSubject}>
Analyze
</button>

{score !== null && (

<div className="score-box" style={{background:getColor()}}>

<h3>{score}/100</h3>

<p>{feedback}</p>

</div>

)}

</div>

);

};

export default SubjectTester;