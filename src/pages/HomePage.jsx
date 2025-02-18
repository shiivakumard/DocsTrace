import React ,{useEffect}from 'react';

const HomePage = () => {
    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        if (accessToken) {
          fetchUserDetails(accessToken);
        }
      }, []);
    
      const fetchUserDetails = async (accessToken) => {
        try {
          const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const userData = await response.json();
          console.log("User Details", userData);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      };
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of our application.</p>
        </div>
    );
};

export default HomePage;