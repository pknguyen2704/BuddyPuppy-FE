import React from "react";
import logo1 from "../../assets/logo 1.png";
import googleIcon from "../../assets/google.png";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

export const LogIn = () => {
    const navigate = useNavigate();
    return (
        <div className="login-page">

            {/* Login form */}
            <div className="login-container">
                <div className="logo">
                    <img src={logo1} onClick={() => navigate("/")} alt="Buddy Puppy" />
                </div>
                <h2>Login</h2>

                <input type="text" placeholder="Username" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />

                <button className="login-btn2">Login</button>

                <p className="signup-text">
                    Don’t Have An Account? <a onClick={() => navigate("/signup1")}>Sign Up</a>
                </p>

                {/* <div className="divider"><span>Or</span></div>

                <button className="google-btn">
                    <img src={googleIcon} alt="Google" /> Log In With Google
                </button> */}
            </div>
        </div>
    );
}