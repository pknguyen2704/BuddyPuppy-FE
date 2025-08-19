import React from "react";
import logo1 from "../../assets/logo 1.png";
import googleIcon from "../../assets/google.png";
import { useNavigate } from "react-router-dom";
import "../login/LogIn.css";

export const SignUp = () => {
    const navigate = useNavigate();
    return (
        // Form giống với LogIn.jsx nhưng có tiêu đề "Sign up" và nút "Next" 
        <div className="login-page">
            {/* Sidebar logo */}
            <div className="sidebar">
                <div className="logo">
                    <img src={logo1} onClick={() => navigate("/")} alt="Buddy Puppy" />
                </div>
            </div>

            {/* Signup form */}
            <div className="login-container">
                <h2>Sign up</h2>

                <input type="text" placeholder="Username" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />

                <button className="login-btn2" onClick={() => navigate("/signup2")}>Next</button>

                <p className="signup-text">
                    Already Have An Account? <a onClick={() => navigate("/login")}>Log In</a>
                </p>

                <div className="divider"><span>Or</span></div>

                <button className="google-btn">
                    <img src={googleIcon} alt="Google" /> Log In With Google
                </button>
            </div>
        </div>
    );
}