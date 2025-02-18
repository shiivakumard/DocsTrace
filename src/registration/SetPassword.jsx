import React, { useState } from "react";
import { TextField, Button, Typography, Box, IconButton, InputAdornment, Container, Paper } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    const errors = {};
    const regex = {
      length: /.{8,}/,
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /[0-9]/,
      specialChar: /[@#$%^&*]/,
    };

    if (!regex.length.test(password)) {
      errors.length = "Password must be at least 8 characters long.";
    }
    if (!regex.uppercase.test(password) || !regex.number.test(password) || !regex.specialChar.test(password)) {
      errors.complexity = "Password should contain at least one uppercase letter, one number, and one special character.";
    }

    return errors;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);

    const validationErrors = validatePassword(password);
    setErrors(validationErrors);

    if (password.length >= 8 && Object.keys(validationErrors).length === 0) {
      if (password.length >= 12) {
        setPasswordStrength("Strong");
      } else {
        setPasswordStrength("Medium");
      }
    } else {
      setPasswordStrength("Weak");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const validationErrors = validatePassword(newPassword);
      if (newPassword !== confirmPassword) {
        validationErrors.match = "Passwords do not match.";
      }

      if (Object.keys(validationErrors).length === 0) {
        setIsLoading(true);
        const email = localStorage.getItem('userEmail');
        const response = await axios.post('https://bdev.docqment.ai/api/set_password', {
          email: email,
          password: newPassword,
          password_confirmation: confirmPassword,
        });

        if (response.data) {
          alert("Password set successfully!");
          navigate('/Login');
        } else {
          alert(response.data.message || "Failed to set password. Please try again.");
        }
      } else {
        setErrors(validationErrors);
      }
    } catch (error) {
      console.error("Error setting password:", error);
      alert(error.response?.data?.message || "An error occurred while setting the password.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, mt: 20, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center" gutterBottom fontSize={24} fontWeight="bold">
          Set Your Password
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={handlePasswordChange}
            margin="normal"
            error={!!errors.length || !!errors.complexity}
            helperText={errors.length || errors.complexity}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            margin="normal"
            error={!!errors.match}
            helperText={errors.match}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Password Strength: {passwordStrength}
          </Typography>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit} 
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Setting Password..." : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SetPassword;
