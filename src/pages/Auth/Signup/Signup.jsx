import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "~/assets/logo.svg";
import { register } from "~/service/authService";

const Signup = () => {
  const navigate = useNavigate();
  const [genderChild, setGenderChild] = useState("");
  const [genderGuardian, setGenderGuardian] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const fullName = form.fullName.value.trim();
    const dobChild = form.dobChild.value;
    const school = form.school.value.trim();
    const fullNameGuardian = form.fullNameGuardian.value.trim();
    const dobGuardian = form.dobGuardian.value;
    const emailGuardian = form.emailGuardian.value.trim();
    const relation = form.relation.value.trim();

    const newErrors = {};
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

      await register(payload);
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
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #f6e58d  0%, #f0932b 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          width: "100%",
          maxWidth: "56vw",
          borderRadius: 4,
          p: 4,
          overflowY: "auto",
          maxHeight: "95vh",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 80,
            mb: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "100%", objectFit: "contain" }}
          />
          <Typography sx={{
            color: '#e67e22',
            fontWeight: 'bold',
            fontSize: '24px',
          }}>BuddyPuppy</Typography>
        </Box>


        <Typography
          variant="h5"
          fontWeight={600}
          textAlign="center"
          sx={{ mb: 3 }}
        >
          Create Your Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* Account Info */}
          <Typography variant="h6" fontWeight={600}>
            Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid>
              <TextField
                fullWidth
                name="username"
                label="Username"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Child Info */}
          <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
            Child Information
          </Typography>
          <Grid container spacing={2}>
            <Grid>
              <TextField
                fullWidth
                name="fullName"
                label="Full Name"
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid>
              <TextField
                sx={{
                  minWidth: '200px'
                }}
                select
                fullWidth
                name="genderChild"
                label="Gender"
                value={genderChild}
                onChange={(e) => setGenderChild(e.target.value)}
                error={!!errors.genderChild}
                helperText={errors.genderChild}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                type="date"
                name="dobChild"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dobChild}
                helperText={errors.dobChild}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                name="school"
                label="School"
                error={!!errors.school}
                helperText={errors.school}
              />
            </Grid>
          </Grid>

          {/* Guardian Info */}
          <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
            Guardian Information
          </Typography>
          <Grid container spacing={2}>
            <Grid>
              <TextField
                fullWidth
                name="fullNameGuardian"
                label="Full Name"
                error={!!errors.fullNameGuardian}
                helperText={errors.fullNameGuardian}
              />
            </Grid>
            <Grid>
              <TextField
                sx={{
                  minWidth: '200px'
                }}
                select
                fullWidth
                name="genderGuardian"
                label="Gender"
                value={genderGuardian}
                onChange={(e) => setGenderGuardian(e.target.value)}
                error={!!errors.genderGuardian}
                helperText={errors.genderGuardian}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                type="date"
                name="dobGuardian"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dobGuardian}
                helperText={errors.dobGuardian}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                name="emailGuardian"
                label="Email"
                type="email"
                error={!!errors.emailGuardian}
                helperText={errors.emailGuardian}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                name="relation"
                label="Relation to Child"
                error={!!errors.relation}
                helperText={errors.relation}
              />
            </Grid>
          </Grid>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                width: '50%',
                backgroundColor: '#f0932b',
                color: 'white',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: '#f0932b',
                  color: 'white',
            },
              }}
            >
              Create account
            </Button>
          </Box>


          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
          >
            Already have an account?{" "}
            <Typography
              component="span"
              sx={{
                color: "#f0932b",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/login")}
            >
              Log in
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
