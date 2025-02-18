import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom"; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const location = useLocation();
    const token = location.state?.token; // Access the token
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP and Password
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();
    console.log("Token:", token);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // Validate email on change
        if (newEmail && !validateEmail(newEmail)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };
    const handleEmailSubmit = async (email) => {
        if (!email) {
            setEmailError("Email is required.");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        setEmailError(""); 
        try {
            const response = await axios.post('https://bdev.docqment.ai/api/forgot_password', { email });
            console.log("Response:", response);
            setStep(2);
            if (response.status === 200 && response.data.message) {
                alert("Password reset instructions have been sent to your email.");
                setStep(2);
            } else {
                alert("Failed to send password reset instructions. Please try again.");
            }
        } catch (error) {
            console.error("Error sending password reset instructions:", error);
            alert("An error occurred while sending password reset instructions. Please try again.");
        }
        // Move to OTP and Password step
    };

    const handleForgotPassword = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.post('https://bdev.docqment.ai/api/set_password', {otp, email,  password,  password_confirmation: confirmPassword,});
            if (response) {
                setMessage("Password has been reset successfully.");
                setTimeout(() => {  // Redirect to login page after 3 seconds   
                    navigate("/Login");
                }, 3000);
            } else {
                setMessage("Failed to reset password. Please try again.");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setMessage("An error occurred while resetting password. Please try again.");
        }
    };

    return (
        <Box>
            <AppBar sx={{ bgcolor: 'linear-gradient(90deg, #0070f3, #00c6ff)' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        DocsTrace
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="xs">
                <Paper elevation={6} sx={{ padding: 4, mt: 20, borderRadius: 2 }}>
                    <Typography variant="h5" textAlign="center" gutterBottom fontSize={24} fontWeight="bold">
                        Reset Password
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        {step === 1 && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={()=>handleEmailSubmit(email)}
                                >
                                    Send OTP
                                </Button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="OTP"
                                    name="otp"
                                    autoComplete="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="New Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleForgotPassword}
                                >
                                    Reset Password
                                </Button>
                            </>
                        )}
                        {message && <Typography color="success.main" textAlign="center">{message}</Typography>}
                    </Box>
                </Paper>
            </Container>

            <Box sx={{ py: 2, textAlign: "center", mt: 10 }}>
                <Typography variant="body2" color="textSecondary">
                    ©2025 DocsTrace &nbsp;
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a> &nbsp;
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a> &nbsp;
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Help</a>
                </Typography>
            </Box>
        </Box>
    );
};

export default ForgotPassword;
