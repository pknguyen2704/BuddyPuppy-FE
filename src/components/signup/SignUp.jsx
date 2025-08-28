import React, { useState } from "react";
import "./SignUp.css";
import logo1 from "../../assets/logo 1.png";
import { useNavigate } from "react-router-dom";
import { register } from "../../service/authService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const SignUp = () => {
  const navigate = useNavigate();
  const [genderChild, setGenderChild] = useState("");
  const [genderGuardian, setGenderGuardian] = useState("");
  const [errors, setErrors] = useState({}); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const fullName = e.target.fullName.value.trim();
    const dobChild = e.target.dobChild.value;
    const school = e.target.school.value.trim();
    const fullNameGuardian = e.target.fullNameGuardian.value.trim();
    const dobGuardian = e.target.dobGuardian.value;
    const emailGuardian = e.target.emailGuardian.value.trim();
    const relation = e.target.relation.value.trim();

    const newErrors = {};

    // Validation
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (!fullName) newErrors.fullName = "Child full name is required";
    if (!genderChild) newErrors.genderChild = "Please select child's gender";
    if (!dobChild) newErrors.dobChild = "Child date of birth is required";
    if (!school) newErrors.school = "School is required";
    if (!fullNameGuardian) newErrors.fullNameGuardian = "Guardian full name is required";
    if (!genderGuardian) newErrors.genderGuardian = "Please select guardian's gender";
    if (!dobGuardian) newErrors.dobGuardian = "Guardian date of birth is required";
    if (!emailGuardian) newErrors.emailGuardian = "Email is required";
    if (!relation) newErrors.relation = "Relation to child is required";

    const usernameRegex = /^[a-zA-Z0-9_-]{4,20}$/;
    if (username && !usernameRegex.test(username)) {
      newErrors.username = "Username must be 4–20 characters, letters, numbers, _ or - only";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 chars, include uppercase, lowercase, number, and special char";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

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

      const response = await register(payload);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed!");
      }
    }
  };

  return (
    <div className="if-page">
      <div className="if-content">
        <form className="if-form" onSubmit={handleSignUp}>
          <div className="if-logo">
            <img src={logo1} alt="Buddy Puppy Logo" onClick={() => navigate("/")} />
          </div>

          <div className="if-signup">

            {/* Username */}
            <label className="if-field">
              <input type="text" name="username" placeholder="Username" />
              {errors.username && <p className="error">{errors.username}</p>}
            </label>

            {/* Password */}
            <label className="if-field relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              <span
                className="eye-icon icon1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
              </span>
              {errors.password && <p className="error">{errors.password}</p>}
            </label>

            {/* Confirm Password */}
            <label className="if-field relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <span
                className="eye-icon icon2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {/* {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} */}
              </span>
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </label>
          </div>

          {/* Child info */}
          <div className="if-grid">
            <section className="if-section">
              <h2 className="if-section-title">Child Information</h2>
              <label className="if-field">
                <input type="text" name="fullName" placeholder="Full name" />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
              </label>

              <div className="if-row">
                <label className="if-field">
                  <select
                    name="genderChild"
                    value={genderChild}
                    onChange={(e) => setGenderChild(e.target.value)}
                    className={genderChild ? "selected-select" : "placeholder-select"}
                  >
                    <option value="" disabled hidden>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.genderChild && <p className="error">{errors.genderChild}</p>}
                </label>
                <label className="if-field">
                  <input type="date" name="dobChild" />
                  {errors.dobChild && <p className="error">{errors.dobChild}</p>}
                </label>
              </div>

              <label className="if-field">
                <input type="text" name="school" placeholder="School" />
                {errors.school && <p className="error">{errors.school}</p>}
              </label>
            </section>

            {/* Guardian info */}
            <section className="if-section">
              <h2 className="if-section-title">Guardian Information</h2>
              <label className="if-field">
                <input type="text" name="fullNameGuardian" placeholder="Full name" />
                {errors.fullNameGuardian && <p className="error">{errors.fullNameGuardian}</p>}
              </label>

              <div className="if-row">
                <label className="if-field">
                  <select
                    name="genderGuardian"
                    value={genderGuardian}
                    onChange={(e) => setGenderGuardian(e.target.value)}
                    className={genderGuardian ? "selected-select" : "placeholder-select"}
                  >
                    <option value="" disabled hidden>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.genderGuardian && <p className="error">{errors.genderGuardian}</p>}
                </label>
                <label className="if-field">
                  <input type="date" name="dobGuardian" />
                  {errors.dobGuardian && <p className="error">{errors.dobGuardian}</p>}
                </label>
              </div>

              <label className="if-field">
                <input type="email" name="emailGuardian" placeholder="Email" />
                {errors.emailGuardian && <p className="error">{errors.emailGuardian}</p>}
              </label>
              <label className="if-field">
                <input type="text" name="relation" placeholder="Relation to Child" />
                {errors.relation && <p className="error">{errors.relation}</p>}
              </label>
            </section>
          </div>

          <div className="if-actions">
            <button type="submit" className="if-btn">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
