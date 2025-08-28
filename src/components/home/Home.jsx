import React from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../../assets/logo 1.png";
import landingpagebg from "../../assets/landing.png"
import "./Home.css";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home-page">
            <header className="header">
                <img src={logo1} alt="Buddy Puppy Logo" className="logo1" />
                <div className="button-group">
                    <div className="btn login-btn" onClick={() => navigate('/login')}>Log in</div>
                    <div className="btn register-btn" onClick={() => navigate('/signup')}>Register</div>
                </div>
            </header>

            <main className="main-content">
                {/* <div className="landing-box">Landing page</div> */}
                <img src={landingpagebg} alt="landing bg" className="landingbg" />

            </main>
        </div>
    );
};
