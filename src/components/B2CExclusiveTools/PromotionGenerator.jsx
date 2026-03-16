import React,{useState} from "react";
import "./PromotionGenerator.css";

const PromotionGenerator = () => {

const [product,setProduct] = useState("");
const [price,setPrice] = useState("");
const [offer,setOffer] = useState("");
const [email,setEmail] = useState("");

const generateEmail = () => {

const content = `
Introducing ${product}!

Price: $${price}

Special Offer: ${offer}

Upgrade your lifestyle today with ${product}. 
Limited time offer — shop now!

`;

setEmail(content);

};

return(

<div className="promo-container">

<h1>Product Promotion Generator</h1>

<p>Create a promotional marketing email instantly.</p>

<div className="promo-card">

<input
type="text"
placeholder="Product Name"
value={product}
onChange={(e)=>setProduct(e.target.value)}
/>

<input
type="number"
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<input
type="text"
placeholder="Offer"
value={offer}
onChange={(e)=>setOffer(e.target.value)}
/>

<button onClick={generateEmail}>
Generate Email
</button>

{email && (
<textarea
value={email}
readOnly
/>
)}

</div>

</div>

);

};

export default PromotionGenerator;