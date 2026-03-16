import React, { useState } from "react";
import "./Login.css";
import { auth, googleProvider } from "../../Firebase/firebaseConfig";
import {
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signInWithPopup
} from "firebase/auth";

import { FaPaperPlane } from "react-icons/fa";
import { GiSpartanHelmet } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Login = () => {

const [isSignup,setIsSignup] = useState(false);
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

const navigate = useNavigate();

const toggleForm = () => setIsSignup(!isSignup);

const handleSubmit = async (e) => {

e.preventDefault();

try{

if(isSignup){

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

await createUserWithEmailAndPassword(auth,email,password);

}else{

await signInWithEmailAndPassword(auth,email,password);

}

navigate("/introduction");

}catch(error){
alert(error.message);
}

};

const handleGoogleLogin = async () => {

try{
await signInWithPopup(auth,googleProvider);
navigate("/introduction");
}catch(error){
alert(error.message);
}

};

return(

<div className="login-wrapper">

{/* BRAND */}

<div className="brand">
<GiSpartanHelmet className="logo"/>
<h5>MailTitan</h5>
</div>

{/* CLOUDS */}

<div className="cloud cloud1"></div>
<div className="cloud cloud2"></div>
<div className="cloud cloud3"></div>
<div className="cloud cloud4"></div>
<div className="cloud cloud5"></div>
<div className="cloud cloud6"></div>

<div className="cloud cloud1"></div>
<div className="cloud cloud2"></div>
<div className="cloud cloud3"></div>


{/* PLANES */}

<div className="paper-plane plane1">✈</div>
<div className="paper-plane plane2">✈</div>
<div className="paper-plane plane3">✈</div>
<div className="paper-plane plane4">✈</div>
<div className="paper-plane plane5">✈</div>

{/* LOGIN CARD */}

<div className="login-card">

<h2>{isSignup ? "Create Account" : "Sign in with email"}</h2>

<p className="subtitle">
Launch powerful email campaigns and dominate the inbox.
</p>

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

{isSignup && (

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
required
/>

)}

<button className="primary-btn">
{isSignup ? "Register" : "Get Started"}
</button>

</form>

<button
onClick={handleGoogleLogin}
className="google-btn"
>
Continue with Google
</button>

<p className="toggle">

{isSignup ? "Already have an account?" : "New user?"}

<span onClick={toggleForm}>
{isSignup ? " Login" : " Register"}
</span>

</p>

</div>

</div>

);

};

export default Login;