import React, { useState } from "react";
import logo1 from "../../assets/logo 1.png";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/authService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LogIn.css";

export const LogIn = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value.trim();
        const password = e.target.password.value;

        const newErrors = {};
        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            const response = await login(username, password);
            console.log("Login successful:", response);
            toast.success("Login successful!");
            navigate("/homescreen");
        } catch (error) {
            console.error("Login failed:", error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Invalid username or password");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="logo">
                    <img src={logo1} onClick={() => navigate("/")} alt="Buddy Puppy" />
                </div>
                <form onSubmit={handleLogin} className="login-form">
                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="input-field"
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>

                    {/* Password */}
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="input-field"
                        />
                        <span
                            className="eye-icon-login"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                        </span>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <button className="login-btn2">Log in</button>
                </form>

                <p className="signup-text">
                    Don’t Have An Account?{" "}
                    <a onClick={() => navigate("/signup")}>Register</a>
                </p>
            </div>
        </div>
    );
};
