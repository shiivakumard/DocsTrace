import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, CircularProgress, AppBar, Link, Toolbar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import MenuIcon from "@mui/icons-material/Menu";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [emailError, setEmailError] = useState(""); 
    const [isLocked, setIsLocked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);
      
    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!validateEmail(newEmail)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (isLocked) {
            setLoginError("Your account is locked. Please use 'Forgot Password' to reset your password.");
            return;
        }if (emailError) {
            setLoginError("Please fix the errors before submitting.");
            return;
        }
        dispatch(loginUser({ email, password })).then((result) => {
            console.log("Login result:", result);
            if (result.payload && result.payload.success) {
                setLoginSuccessful(true);
                setFailedAttempts(0);
            } else {
                setFailedAttempts(prev => prev + 1);
                if (failedAttempts + 1 >= 3) {
                    setIsLocked(true);
                    setLoginError("Your account is locked due to too many failed attempts. Please use 'Forgot Password' to reset your password.");
                } else {
                    setLoginError("Login failed. Please try again.");
                }
            }
        });
    };

    const handleSignUpClick = () => {
        navigate("/SignUp");
    };

    const handleForgotPassword = async () => {
        navigate("/ForgotPassword");
        // if (!email) {
        //     alert("Please enter your email address to reset your password.");
        //     return;
        // }
        // try {
        //     const response = await axios.post('https://bdev.docqment.ai/api/forgot_password', { email });
        //     if (response) {
        //         const token = response.data.reset_token;
        //         localStorage.setItem("resetToken", token);
        //         setIsLocked(false);
        //         setFailedAttempts(0);
        //         navigate("/ForgotPassword", { state: { token } });
        //     } else {
        //         alert("Failed to send password reset instructions. Please try again.");
        //     }
        // } catch (error) {
        //     console.error("Error sending password reset instructions:", error);
        //     alert("An error occurred while sending password reset instructions. Please try again.");
        // }
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

            {!loginSuccessful && (
                <Container component="main" maxWidth="xs">
                    <Paper elevation={6} sx={{ padding: 4, mt: 20, borderRadius: 2 }}>
                        <Typography variant="h5" textAlign="center" gutterBottom fontSize={24} fontWeight="bold">
                            DocsTrace Login
                        </Typography>
                        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {loginError && <Typography color="error">{loginError}</Typography>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading || isLocked}
                            >
                                {loading ? <CircularProgress size={24} /> : "Login"}
                            </Button>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                <Button
                                    variant="text"
                                    onClick={handleForgotPassword}
                                    sx={{ textTransform: "none", padding: 0, minWidth: "auto", color: "primary.main" }}
                                >
                                    Forgot password?
                                </Button>
                                <Typography variant="body2" color="textSecondary">
                                    Don't have an account?{" "}
                                    <Button
                                        variant="text"
                                        onClick={handleSignUpClick}
                                        sx={{ textTransform: "none", padding: 0, minWidth: "auto", color: "primary.main" }}
                                    >
                                        Sign Up
                                    </Button>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            )}

            {loginSuccessful && (
                <Typography variant="h3" textAlign="center" color="success.main" mt={20}>
                    Login Successful!
                </Typography>
            )}

            <Box sx={{ py: 2, textAlign: "center", mt: 10 }}>
                <Typography variant="body2" color="textSecondary">
                    ©2025 DocsTrace &nbsp;
                    <Link href="#" color="inherit">Privacy Policy</Link> &nbsp;
                    <Link href="#" color="inherit">Terms</Link> &nbsp;
                    <Link href="#" color="inherit">Help</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
