import React, { useState } from "react";
import './signup.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Set displayName (name) for the user
            await updateProfile(userCredential.user, { displayName: username });
            // Store email and password in localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            // Send displayName (username) to home
            navigate("/home", { state: { displayName: username } });
        } catch (err) {
            console.error("Error signing up:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Signup</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="form-group">
                    <input
                        className="input-field"
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
                        className="input-field"
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
                        className="input-field"
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
            <div style={{ marginTop: '1.5rem' }}>
                <span>Already have an account? </span>
                <a href="/" style={{ color: '#45b6f3', fontWeight: 600, textDecoration: 'underline', marginLeft: 4 }}>Login</a>
            </div>
        </div>
    );
};

export default Signup;
