import React, { useState, useEffect } from "react";
import './login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Link ,useNavigate} from "react-router-dom";


const firebaseConfig = {
    apiKey: "AIzaSyAk010uXVXNepp1n7w4chzfgaYz5Cjk5rA",
    authDomain:  "webchat-4649c.firebaseapp.com",
    projectId: "webchat-4649c",
    storageBucket:"webchat-4649c.firebasestorage.app",
    messagingSenderId: "930289158859",
    appId:  "1:930289158859:web:d17a3e07e6fcf6ec1ce94e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');
        if (storedEmail && storedPassword) {
            navigate("/home", { state: { email: storedEmail } });
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Store email and password in localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            // Send displayName (username) to home
            const displayName = userCredential.user.displayName || email;
            navigate("/home", { state: { displayName } });
        } catch (error) {
            console.error("Error logging in:", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <input
                        className="input-field"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-button" >Login</button>
            </form>
            <div style={{ marginTop: '1.5rem' }}>
                <span>Don't have an account? </span>
                <Link to="/signup" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'underline', marginLeft: 4 }}>Sign up</Link>
            </div>
        </div>
    );
};

export default Login;
