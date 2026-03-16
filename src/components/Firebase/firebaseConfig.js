// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAzFk26wGl0P-3pXEDwDmVrlpkFqYcal8",
  authDomain: "lghomecomfortemail.firebaseapp.com",
  projectId: "lghomecomfortemail",
  storageBucket: "lghomecomfortemail.firebasestorage.app",
  messagingSenderId: "85349271279",
  appId: "1:85349271279:web:5445977654ae7bf74d7d1a",
  measurementId: "G-YDN2ND6DK3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
