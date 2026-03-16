import React,{useState} from "react";
import axios from "axios";
import "./SpamChecker.css";

const SpamChecker = () => {

const [emailContent,setEmailContent] = useState("");
const [result,setResult] = useState("");

const checkSpam = async () => {

const prompt = `
Analyze this email marketing content.

Return:

1. Spam score out of 100
2. Risky spam words
3. Suggested replacements
4. Overall improvement tips

Email:
${emailContent}
`;

try{

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model:"openai/gpt-4o-mini",
messages:[{role:"user",content:prompt}]
},
{
headers:{
Authorization:`Bearer YOUR_OPENROUTER_API_KEY`,
"Content-Type":"application/json"
}
}
);

setResult(response.data.choices[0].message.content);

}catch(error){

console.error(error);
alert("Spam analysis failed");

}

};

return(

<div className="spam-container">

<h2>Email Spam Checker</h2>

<textarea
placeholder="Paste your email content here..."
value={emailContent}
onChange={(e)=>setEmailContent(e.target.value)}
/>

<button onClick={checkSpam}>
Check Spam Risk
</button>

{result && (

<div className="spam-result">

<pre>{result}</pre>

</div>

)}

</div>

);

};

export default SpamChecker;