import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./uploadCustomer.css";
import SendingCampaign from "../SendingCampaign/SendingCampaign";
const UploadCustomers = () => {

const [file,setFile] = useState(null);
const [preview,setPreview] = useState([]);
const [stats,setStats] = useState(null);
const [cleaning,setCleaning] = useState(false);
const [error,setError] = useState("");
const [dragging,setDragging] = useState(false);

const fileInputRef = useRef(null);
const navigate = useNavigate();

/* PROCESS FILE */

const processFile = (uploaded)=>{

if(!uploaded) return;

setFile(uploaded);
setError("");

const reader = new FileReader();

reader.onload = (evt)=>{

try{

const wb = XLSX.read(evt.target.result,{type:"array"});
const ws = wb.Sheets[wb.SheetNames[0]];

const data = XLSX.utils.sheet_to_json(ws,{header:1});

setPreview(data.slice(0,5));

}catch(err){

setError("Unable to read file");

}

};

reader.readAsArrayBuffer(uploaded);

};

/* BROWSE FILE */

const openFileDialog = ()=>{
fileInputRef.current.click();
};

const handleUpload = (e)=>{
processFile(e.target.files[0]);
};

/* DRAG DROP */

const handleDrop = (e)=>{
e.preventDefault();
setDragging(false);
processFile(e.dataTransfer.files[0]);
};

const handleDragOver = (e)=>{
e.preventDefault();
setDragging(true);
};

const handleDragLeave = ()=>{
setDragging(false);
};

/* CLEAN DATA */

const cleanData = async ()=>{

if(!file){
setError("Please upload a file first");
return;
}

setCleaning(true);

try{

const formData = new FormData();
formData.append("file",file);

const res = await fetch("http://localhost:8000/upload",{
method:"POST",
body:formData
});

const data = await res.json();

if(res.ok){
setStats(data.summary);
}else{
setError(data.message || "Server error");
}

}catch{
setError("Unable to connect to server");
}

setCleaning(false);

};

/* SEND CAMPAIGN */

const launchCampaign = async ()=>{

try{

const res = await fetch("http://localhost:8000/send-campaign",{
method:"POST"
});

const data = await res.json();

navigate("/campaign-result",{state:data});

}catch(err){

setError("Failed to launch campaign");

}

};

return(

<div className="upload-page">
    

<h1><span style={{color : "black"}}>Upload</span> Customer List</h1>
{/* DISCLAIMER BOX */}

<div className="disclaimer-box">

<h3>Upload Guidelines</h3>

<ul>

<li>Accepted file formats: <b>.CSV</b> or <b>.Excel (.xlsx)</b></li>

<li>Your file must include the following columns:</li>

<li className="columns">
Company Name, RPC Name, RPC Email Address, HVAC Needs
</li>

<li>Ensure email addresses are valid and correctly formatted.</li>

<li>Avoid duplicate email addresses in the dataset.</li>

<li>Do not include test emails such as <b>example@</b> or <b>test@</b>.</li>

<li>Recommended maximum file size: <b>5,000 rows</b>.</li>

<li>Uploaded data is processed securely and used only for campaign delivery.</li>

</ul>

</div>
<p className="subtitle">
Upload CSV or Excel file containing customer data
</p>

{/* UPLOAD CARD */}

<div
className={`upload-card ${dragging ? "dragging" : ""}`}
onDrop={handleDrop}
onDragOver={handleDragOver}
onDragLeave={handleDragLeave}
>

<div className="upload-icon">📂</div>

<h3>Drag & Drop File</h3>

<p>CSV or Excel files</p>

<button onClick={openFileDialog}>
Browse File
</button>

<input
ref={fileInputRef}
type="file"
accept=".csv,.xlsx,.xls"
onChange={handleUpload}
hidden
/>

</div>

{/* FILE NAME */}

{file && (
<div className="file-info">
Selected File: <b>{file.name}</b>
</div>
)}

{error && <div className="error">{error}</div>}

{/* PREVIEW */}

{preview.length>0 &&(

<div className="preview-card">

<h3>Preview (First 5 rows)</h3>

<table>

<tbody>

{preview.map((row,i)=>(
<tr key={i}>
{row.map((cell,j)=>(
<td key={j}>{cell}</td>
))}
</tr>
))}

</tbody>

</table>

<button
className="clean-btn"
onClick={cleanData}
disabled={cleaning}
>

{cleaning ? "Cleaning Data..." : "Clean Data"}

</button>

</div>

)}

{/* REPORT */}

{stats &&(

<div className="report-card">

<h3>Data Cleaning Report</h3>

<div className="report-row">
<span>Total Records</span>
<span>{stats.totalRows}</span>
</div>

<div className="report-row">
<span>Clean Records</span>
<span>{stats.cleanRows}</span>
</div>

<div className="report-row">
<span>Duplicates Removed</span>
<span>{stats.duplicatesRemoved}</span>
</div>

<div className="report-row">
<span>Invalid Emails</span>
<span>{stats.invalidEmails}</span>
</div>

<div className="report-row">
<span>Domain Issues</span>
<span>{stats.domainIssues}</span>
</div>

<div className="report-row">
<span>Soft Bounce Risk</span>
<span>{stats.softBounceRisk}</span>
</div>

<div className="report-row">
<span>Hard Bounce Risk</span>
<span>{stats.hardBounceRisk}</span>
</div>

<button
className="launch-btn"
onClick={launchCampaign}
>
Launch Campaign →
</button>

</div>

)}

</div>

);

};

export default UploadCustomers;