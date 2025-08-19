import React from "react";
import "./Info.css";
import logo1 from "../../assets/logo 1.png"; // đổi path tới logo Buddy Puppy
import { useNavigate } from "react-router-dom";
export const Info = () => {
    const navigate = useNavigate();
    return (
        <div className="if-page">
            {/* Sidebar / Topbar brand */}
            <div className="if-brand">
                <img src={logo1} alt="Buddy Puppy" onClick={() => navigate("/")} className="if-logo" />
            </div>

            {/* Nội dung */}
            <div className="if-content">
                <form className="if-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="if-grid">
                        {/* Child info */}
                        <section className="if-section">
                            <h2 className="if-section-title">Child’s Information</h2>
                            <label className="if-field">
                                <input type="text" placeholder="Full name" />
                            </label>
                            <div className="if-row">
                                <label className="if-field">
                                    <input type="text" placeholder="Gender" />
                                </label>
                                <label className="if-field">
                                    <input type="date" placeholder="Date of Birth" />
                                </label>
                            </div>

                            <label className="if-field">

                                <input type="text" placeholder="School" />
                            </label>
                        </section>

                        {/* Guardian info */}
                        <section className="if-section">
                            <h2 className="if-section-title">Guardian Information</h2>

                            <label className="if-field">
                                <input type="text" placeholder="Full name" />
                            </label>

                            <div className="if-row">
                                <label className="if-field">

                                    <input type="text" placeholder="Gender" />
                                </label>
                                <label className="if-field">
                                    <input type="date" />
                                </label>
                            </div>

                            <label className="if-field">
                                <input type="email" placeholder="Email" />
                            </label>

                            <label className="if-field">
                                <input type="tel" placeholder="Phone number" />
                            </label>
                        </section>
                    </div>

                    {/* Nút */}
                    <div className="if-actions">
                        <button type="submit" className="if-btn">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
