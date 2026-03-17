import React, { useState } from "react";
import "./SubjectTester.css";
import { FaCheckCircle, FaTimesCircle, FaSmile, FaClock } from "react-icons/fa";

const SubjectTester = () => {

  const [subject,setSubject] = useState("");
  const [preheader,setPreheader] = useState("");
  const [score,setScore] = useState(null);
  const [feedback,setFeedback] = useState([]);

  const analyzeSubject = () => {

    let calculatedScore = 0;
    let notes = [];

    if(subject.length >= 30 && subject.length <= 60){
      calculatedScore += 30;
    } else {
      notes.push("Subject length should be 30-60 characters");
    }

    if(preheader.length >= 40 && preheader.length <= 100){
      calculatedScore += 25;
    } else {
      notes.push("Preheader should be 40-100 characters");
    }

    const urgencyWords = ["today","now","limited","exclusive","offer"];

    if(urgencyWords.some(word => subject.toLowerCase().includes(word))){
      calculatedScore += 20;
    } else {
      notes.push("Add urgency words");
    }

    if(subject.includes("{") || subject.includes("Hi")){
      calculatedScore += 15;
    } else {
      notes.push("Add personalization");
    }

    if(subject.includes("?") || subject.includes("!")){
      calculatedScore += 10;
    } else {
      notes.push("Add engagement symbol");
    }

    setScore(calculatedScore);
    setFeedback(notes);
  };

  const getGrade = () => {
    if(score >= 80) return "A";
    if(score >= 60) return "B";
    return "C";
  };

  return (
    <div className="main-container">

      {/* HEADER */}
      <h1>Email Subject Line Tester</h1>

      {/* INPUT */}
      <div className="input-bar">
        <input
          type="text"
          placeholder="Enter Subject Line"
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
        />
        <button onClick={analyzeSubject}>Test Subject Now</button>
      </div>

      {score !== null && (
        <div className="result-card">

          {/* SCORE SECTION */}
          <div className="score-section">
            <div className="grade-circle">{getGrade()}</div>

            <div>
              <h2>{score} Points</h2>
              <div className="progress-bar">
                <div style={{width:`${score}%`}}></div>
              </div>
              <p>You may improve with small tweaks</p>
            </div>
          </div>

          {/* ANALYTICS */}
          <div className="analytics">

            {/* SCANNABILITY */}
            <div className="card">
              <FaClock className="icon green"/>
              <h3>Scannability</h3>
              <p>{subject.length}/60 characters</p>
            </div>

            {/* READABILITY */}
            <div className="card">
              <FaCheckCircle className="icon blue"/>
              <h3>Readability</h3>
              <p>Simple & clear subject works best</p>
            </div>

            {/* LENGTH */}
            <div className="card">
              <FaSmile className="icon orange"/>
              <h3>Length</h3>
              <p>{subject.split(" ").length} words</p>
            </div>

            {/* SENTIMENT */}
            <div className="card">
              <FaTimesCircle className="icon red"/>
              <h3>Feedback</h3>
              <ul>
                {feedback.map((item,index)=>(
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default SubjectTester;