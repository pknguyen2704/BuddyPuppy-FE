import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "~/assets/logo.svg";
import { login } from "~/service/authService";

const Login = () => {
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
      toast.success("Login successful!");
      navigate("/home");
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
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          p: 4,
          alignItems: "center",
          gap: 2,
          bgcolor: "white",
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
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
          <Typography sx={{
            color: '#e67e22',
            fontWeight: 'bold',
            fontSize: '24px',
          }}>BuddyPuppy</Typography>
        </Box>

        <Typography variant="h5" fontWeight={600} textAlign="center">
          Welcome back
        </Typography>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, alignItems: 'center', justifyContent: 'center'}}
        >
          <TextField
            fullWidth
            name="username"
            label="Username"
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username}
          />
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
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              borderRadius: '50px',
              width: '100%',
              backgroundColor: '#f0932b',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#f0932b',
                color: 'white',
          },
            }}
          >
            Log in
          </Button>
        </Box>

        {/* Signup link */}
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          Don’t have an account?{" "}
          <Typography
            component="span"
            sx={{
              borderRadius: '50px',
              color: '#f0932b',
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/signup")}
          >
            Register
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
