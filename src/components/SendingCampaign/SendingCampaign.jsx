import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SendingCampaign.css";

const SendingCampaign = () => {

const [sent,setSent] = useState(0);
const [total,setTotal] = useState(0);
const [progress,setProgress] = useState(0);

const navigate = useNavigate();

useEffect(()=>{

const startCampaign = async ()=>{

const res = await fetch("http://localhost:8000/send-campaign",{
method:"POST"
});

const data = await res.json();

setTotal(data.total);

let count = 0;

const interval = setInterval(()=>{

count++;

setSent(count);

setProgress(Math.floor((count/data.total)*100));

if(count >= data.total){

clearInterval(interval);

setTimeout(()=>{
navigate("/campaign-result",{state:data});
},1500);

}

},120);

};

startCampaign();

},[]);

return(

<div className="sending-page">

<h1>🚀 Sending Email Campaign</h1>

<p className="subtitle">
Please wait while we deliver your emails
</p>

<div className="progress-bar">

<div
className="progress-fill"
style={{width:`${progress}%`}}
></div>

</div>

<p className="counter">

Sent: {sent} / {total}

</p>

</div>

);

};

export default SendingCampaign;