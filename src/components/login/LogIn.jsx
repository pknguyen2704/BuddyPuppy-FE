import React from "react";
import logo1 from "../../assets/logo 1.png";
import googleIcon from "../../assets/google.png";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/authService";
import "./LogIn.css";

export const LogIn = () => {

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        if (!username || !password) {
            console.error("Username and password are required");
            return;
        }

        try {
            const response = await login(username, password);
            console.log("Login successful:", response);
            // Redirect or perform further actions after successful login
            navigate("/homescreen");
        } catch (error) {
            console.error("Login failed:", error);
            // Handle login error (e.g., show an error message)
        }
    };
    const navigate = useNavigate();
    return (
        <div className="login-page">

            {/* Login form */}
            <div className="login-container">
                <div className="logo">
                    <img src={logo1} onClick={() => navigate("/")} alt="Buddy Puppy" />
                </div>
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="login-form">

                    <input type="text" name="username" placeholder="Username" className="input-field" />
                    <input type="password" name="password" placeholder="Password" className="input-field" />

                    <button className="login-btn2">Login</button>
                </form>
                <p className="signup-text">
                    Don’t Have An Account? <a onClick={() => navigate("/signup")}>Sign Up</a>
                </p>

                {/* <div className="divider"><span>Or</span></div>

                <button className="google-btn">
                    <img src={googleIcon} alt="Google" /> Log In With Google
                </button> */}
            </div>
        </div>
    );
}