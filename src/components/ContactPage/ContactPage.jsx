import React from "react";
import "./ContactPage.css";
import { FaEnvelopeOpenText } from "react-icons/fa";

const ContactPage = () => {

return (

<div className="contact-page">

<h2 className="contact-title">
HAVE SOME QUESTIONS?
</h2>

<p className="contact-subtitle">
📍 Mumbai &nbsp; | &nbsp; Founded in 2025
</p>

<div className="contact-container">

{/* LEFT SIDE ICON */}

<div className="contact-icon">

<FaEnvelopeOpenText />

</div>


{/* RIGHT SIDE FORM */}

<div className="contact-form">

<input
type="text"
placeholder="First Name"
/>

<input
type="text"
placeholder="Last Name"
/>

<input
type="email"
placeholder="What's your email?"
/>

<textarea
placeholder="Your questions..."
rows="4"
/>

<button>

SEND MESSAGE

</button>

</div>

</div>

</div>

);

};

export default ContactPage;