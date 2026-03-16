import React, { useState } from "react";
import "./IPChecker.css";
import { FaSearch } from "react-icons/fa";

const IPChecker = () => {

const [input,setInput] = useState("");
const [result,setResult] = useState("");

/* EMAIL VALIDATION */

const validateEmail = (email) => {

const regex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

return regex.test(email);

};

/* IP VALIDATION */

const validateIP = (ip) => {

const parts = ip.split(".");

if(parts.length !== 4) return false;

for(let p of parts){

if(isNaN(p)) return false;

const num = Number(p);

if(num < 0 || num > 255) return false;

}

return true;

};

/* RESERVED IP CHECK */

const checkReservedBlocks = (ip) => {

const parts = ip.split(".");
const first = Number(parts[0]);

if(first === 10) return "Private Network";

if(first === 127) return "Loopback Address";

if(first === 192 && parts[1] === "168") return "Private Network";

if(first === 172 && parts[1] >= 16 && parts[1] <= 31)
return "Private Network";

return "Public IP";

};

/* MAIN CHECK */

const handleCheck = () => {

if(input.includes("@")){

if(validateEmail(input)){

setResult("✅ Email format looks legitimate.");

}else{

setResult("❌ Invalid sender email format.");

}

}

else{

if(!validateIP(input)){

setResult("❌ Invalid IP address format.");

return;

}

const block = checkReservedBlocks(input);

if(block === "Public IP"){

setResult("✅ Valid public IP address.");

}

else{

setResult(`⚠ ${block} detected. Not valid for email sending.`);

}

}

};

return (

<div className="ip-container">

<h1>IP / Sender Legitimacy Checker</h1>

<p className="ip-sub">
Check whether your sending IP address or sender email format is valid.
</p>

<div className="ip-box">

<input
type="text"
placeholder="Enter IP address or sender email"
value={input}
onChange={(e)=>setInput(e.target.value)}
/>

<button onClick={handleCheck}>

<FaSearch/> Check

</button>

</div>

{result && (

<div className="ip-result">

{result}

</div>

)}

</div>

);

};

export default IPChecker;