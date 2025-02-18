import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { REACT_BASE_PATH_URL } from "../../utils/common";
import { REACT_BASE_PATH_URL } from '../utils/common';
// import { REACT_BASE_PATH_URL } from "../utils/common";
// console.log("REACT_BASE_PATH_URL", REACT_BASE_PATH_URL);

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  /** This function parses the query string and gets the query parameters */
  const getQueryParams = () => {
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = urlParams.get("token");
    const emailFromUrl = urlParams.get("email");

    /** Set the values into state */
    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
  };

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };
  const hToken = getAuthToken();
  const headers = hToken ? { Authorization: `Bearer ${hToken}` } : {};

  /** Fetch data when the token and email are available */
  const fetchResetPasswordData = async () => {
    if (token && email) {
      try {
        const response = await axios.get(
          // `https://devtwitter.chotanews.com/api/password/reset/${token}?email=${email}`,
          `https://bdev.docqment.ai/password/reset/${token}?email=${email}`,
          headers
        );
        setResponseData(response.data);
        navigate("/ForgotPassword", {
          state: { email: response.data.email, token: response.data.token },
        });
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error("Password Reset Link Expired");
          navigate("/");
        } else {
          setError("An error occurred while resetting the password.");
          console.error(err);
        }
        if (err.response && err.response.status === 403) {
          toast.error("Reset Link Expired");
          navigate("/");
        } else {
          setError("An error occurred while resetting the password.");
          console.error(err);
        }
      }
    } else {
      toast.error("Token Expired");
      navigate("/home");
    }
  };

  // Run the functions when the component mounts or when location changes
  useEffect(() => {
    getQueryParams();
  }, [location]);

  // Fetch the data whenever token and email are set
  useEffect(() => {
    if (token && email) {
      fetchResetPasswordData();
    }
  }, [token, email]);

  return (
    <div>
      <h1>Loading ...</h1>
    </div>
  );
};

export default ResetPassword;
