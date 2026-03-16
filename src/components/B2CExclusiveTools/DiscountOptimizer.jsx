import React, { useState } from "react";
import "./DiscountOptimizer.css";

const DiscountOptimizer = () => {

const [product,setProduct] = useState("");
const [discount,setDiscount] = useState("");
const [urgency,setUrgency] = useState("Normal");
const [result,setResult] = useState("");

const generateOffer = () => {

let message = "";

if(urgency === "High"){
message = `🔥 ${discount}% OFF Today Only on ${product}! Grab this limited time deal before it disappears.`;
}

else if(urgency === "Medium"){
message = `✨ Enjoy ${discount}% OFF on ${product}! Don't miss this exclusive offer.`;
}

else{
message = `Special Offer: Get ${discount}% OFF on ${product}. Shop now and save today.`;
}

setResult(message);
};

return (

<div className="discount-container">

<h1>Discount Email Optimizer</h1>

<p>Create high-converting promotional email subject lines.</p>

<div className="discount-card">

<input
type="text"
placeholder="Product Name"
value={product}
onChange={(e)=>setProduct(e.target.value)}
/>

<input
type="number"
placeholder="Discount %"
value={discount}
onChange={(e)=>setDiscount(e.target.value)}
/>

<select
value={urgency}
onChange={(e)=>setUrgency(e.target.value)}
>
<option>Normal</option>
<option>Medium</option>
<option>High</option>
</select>

<button onClick={generateOffer}>
Generate Offer
</button>

{result && (
<div className="discount-result">
{result}
</div>
)}

</div>

</div>

);

};

export default DiscountOptimizer;