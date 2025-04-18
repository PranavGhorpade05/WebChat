import React, { useState } from "react";
import './signup.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAk010uXVXNepp1n7w4chzfgaYz5Cjk5rA",
    authDomain:  "webchat-4649c.firebaseapp.com",
    projectId: "webchat-4649c",
    storageBucket:"webchat-4649c.firebasestorage.app",
    messagingSenderId: "930289158859",
    appId:  "1:930289158859:web:d17a3e07e6fcf6ec1ce94e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up:", userCredential.user);
            alert("Signup successful!");
        } catch (err) {
            console.error("Error signing up:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="form-group">
                    <input
                        className="username-input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className="email-input"
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className="password-input"
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}

                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="signup-button">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
