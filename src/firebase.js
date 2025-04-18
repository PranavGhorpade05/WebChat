// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAk010uXVXNepp1n7w4chzfgaYz5Cjk5rA",
    authDomain: "webchat-4649c.firebaseapp.com",
    projectId: "webchat-4649c",
    storageBucket: "webchat-4649c.appspot.com",
    messagingSenderId: "930289158859",
    appId: "1:930289158859:web:d17a3e07e6fcf6ec1ce94e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default { auth };
