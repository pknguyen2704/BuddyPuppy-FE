import React from "react";
import "./SignUp.css";
import logo1 from "../../assets/logo 1.png";
import { useNavigate } from "react-router-dom";
import { register } from "../../service/authService";
export const SignUp = () => {
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const fullName = e.target.fullName.value;
        const genderChild = e.target.genderChild.value
        const dobChild = e.target.dobChild.value;
        const school = e.target.school.value;
        const fullNameGuardian = e.target.fullNameGuardian.value
        const genderGuardian = e.target.genderGuardian.value;
        const dobGuardian = e.target.dobGuardian.value;
        const emailGuardian = e.target.emailGuardian.value;
        const relation = e.target.relation.value;
        if (!username || !password || !confirmPassword || !fullName || !genderChild || !dobChild || !school || !fullNameGuardian || !genderGuardian || !dobGuardian || !emailGuardian) {
            console.error("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }
        try {
            const payload = {
                email: emailGuardian,
                password,
                username,
                child_Fullname: fullName,
                child_Gender: genderChild,
                child_dateOfBirth: dobChild,
                child_school: school,
                guardian_Fullname: fullNameGuardian,
                guardian_Gender: genderGuardian,
                guardian_dateOfBirth: dobGuardian,
                guardian_relation: relation,
            };
            console.log("Payload for registration:", payload);
            const response = await register(payload);
            console.log("Registration successful:", response);

            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    }
    return (
        <div className="if-page">
            {/* Sidebar / Topbar brand */}

            {/* Nội dung */}
            <div className="if-content">
                <form className="if-form" onSubmit={handleSignUp}>
                    <div className="if-logo">
                        <img src={logo1} alt="Buddy Puppy Logo" onClick={() => navigate("/")} />
                    </div>
                    <div className="if-signup">
                        <h2 className="if-title">Sign Up</h2>
                        <label className="if-field">
                            <input type="text" name="username" placeholder="Username" />
                        </label>
                        <label className="if-field">
                            <input type="password" name="password" placeholder="Password" />
                        </label>
                        <label className="if-field">
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" />
                        </label>
                    </div>
                    <div className="if-grid">
                        {/* Child info */}
                        <section className="if-section">
                            <h2 className="if-section-title">Child Information</h2>
                            <label className="if-field">
                                <input type="text" name="fullName" placeholder="Full name" />
                            </label>
                            <div className="if-row">
                                <label className="if-field">
                                    <input type="text" name="genderChild" placeholder="Gender" />
                                </label>
                                <label className="if-field">
                                    <input type="date" name="dobChild" placeholder="Date of Birth" />
                                </label>
                            </div>

                            <label className="if-field">

                                <input type="text" name="school" placeholder="School" />
                            </label>
                        </section>

                        {/* Guardian info */}
                        <section className="if-section">
                            <h2 className="if-section-title">Guardian Information</h2>

                            <label className="if-field">
                                <input type="text" name="fullNameGuardian" placeholder="Full name" />
                            </label>

                            <div className="if-row">
                                <label className="if-field">

                                    <input type="text" name="genderGuardian" placeholder="Gender" />
                                </label>
                                <label className="if-field">
                                    <input type="date" name="dobGuardian" />
                                </label>
                            </div>

                            <label className="if-field">
                                <input type="email" name="emailGuardian" placeholder="Email" />
                            </label>
                            <label className="if-field">
                                <input type="text" name="relation" placeholder="Relation to Child" />
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
