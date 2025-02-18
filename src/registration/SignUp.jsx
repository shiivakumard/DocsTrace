import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Card, Typography, Box, AppBar, Toolbar, Link, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false); // State for dialog visibility
  
      const navigate = useNavigate();

  const GOOGLE_CLIENT_ID = "9896645119-usjugnlhkf0kkg3q7ph4v40poddple7r.apps.googleusercontent.com";
  const REDIRECT_URI = "https://dev.docqment.ai/HomePage";
  const MicroSoft_CLIENT_ID = "4ed729b6-f0ce-47eb-8e3a-4727cc47600e";

  const handleGoogleSignup = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=email%20profile`;
    window.location.href = googleAuthUrl;
  };

  const handleMicrosoftSignup = () => {
    const microsoftAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${MicroSoft_CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=User.Read`;
    window.location.href = microsoftAuthUrl;
  };

  const sendOtp = async (email) => {
    try {
      const response = await axios.post('https://bdev.docqment.ai/api/send_otp', { email });

      setOtpSent(true);
      alert("A verification email has been sent to your email, please enter the OTP to activate the account.");

    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP. Please try again.");
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const response = await axios.post('https://bdev.docqment.ai/api/verify_otp', { email, otp });
      localStorage.setItem("userEmail", email);
      navigate("/SetPassword");
      setSignupSuccessful(true);
      alert("Signup Successful!");

    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying OTP. Please try again.");
    }
  };
  const resendOtp = async (email) => {
    try {
      const response = await axios.post('https://bdev.docqment.ai/api/send_otp', { email });

      setOtpSent(true);
      alert("Once again a verification email has been sent to your email, please enter the OTP to activate the account.");

    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP. Please try again.");
    }
  };


  const handleEmailSignup = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email to signup");
      return;
    }
    if (!termsChecked) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (email === "existinguser@example.com") {
      setIsEmailExist(true);
      return;
    }

    setIsEmailExist(false);
    sendOtp(email); // Call the sendOtp function
  };

  const handleOtpVerification = () => {
    verifyOtp(email, otp); // Call the verifyOtp function
  };

 

  const handleTermsDialogOpen = () => {
    setOpenTermsDialog(true);
  };

  const handleTermsDialogClose = () => {
    setOpenTermsDialog(false);
  };

  return (
    <>
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
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

        {!signupSuccessful && (
          <Card sx={{ padding: 4, width: 400, boxShadow: 3, gap: 2 }}>
            <Typography variant="h5" textAlign="center" gutterBottom fontSize={24} fontWeight="bold">
              DocsTrace
            </Typography>

            {/* Google Signup */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignup}
              sx={{
                mb: 2,
                backgroundColor: '#4285F4',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#357AE8',
                },
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '16px',
                padding: '10px 0',
              }}
            >
              Signup with Google
            </Button>

            {/* Microsoft Signup */}
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleMicrosoftSignup}
              sx={{
                mb: 2,
                backgroundColor: '#4285F4',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#357AE8',
                },
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '16px',
                padding: '10px 0',
              }}
            >
              Signup with Microsoft
            </Button>

            <Typography textAlign="center" mt={2} mb={2}>
              or
            </Typography>

            {/* Email Signup */}
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              error={isEmailExist}
              helperText={isEmailExist ? "User already exists with the system. Please Login to access the system." : ""}
            />
            <Button fullWidth variant="contained" color="secondary" onClick={handleEmailSignup}>
              Signup with Email
            </Button>

            {/* OTP Input */}
            {otpSent && !isEmailExist && (
              <>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  margin="normal"
                />
                <Button fullWidth variant="contained" color="success" onClick={handleOtpVerification}>
                  Verify OTP
                </Button>
                <Button fullWidth variant="text" color="primary" onClick={() => resendOtp(email)}>
                  Resend OTP
                </Button>
              </>
            )}

            {/* Terms and Conditions */}
            <FormControlLabel
              control={<Checkbox checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />}
              label={<Typography variant="body2">I agree to the <Button
                variant="text"
                onClick={handleTermsDialogOpen}
                sx={{ textTransform: "none", padding: 0, minWidth: "auto", color: "primary.main" }}
              >
                 Terms & Conditions
              </Button></Typography>}
            />

            {/* Link to Terms & Services */}

            
          </Card>
        )}

        {/* Signup Successful Message */}
        {signupSuccessful && (
          <Typography variant="h3" textAlign="center" color="success.main" mt={2}>
            Signup Successful!
          </Typography>
        )}
      </Box>
      <Box sx={{ py: 2, textAlign: "center", mb: 10 }}>
        <Typography variant="body2" color="textSecondary">
          ©2025 DocsTrace &nbsp;
          <Link href="#" color="inherit">Privacy Policy</Link> &nbsp;
          <Link href="#" color="inherit">Terms</Link> &nbsp;
          <Link href="#" color="inherit">Help</Link>
        </Typography>
      </Box>

      {/* Terms and Conditions Dialog */}
      <Dialog open={openTermsDialog} onClose={handleTermsDialogClose}>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {/* Add your terms and conditions content here */}
            These are the terms and conditions for using DocsTrace. Please read them carefully.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTermsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUp;
