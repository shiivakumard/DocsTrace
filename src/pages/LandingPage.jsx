import React ,{useEffect}from 'react';
import { Box, Typography, Button, Container, AppBar, Toolbar,IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/Login'); 
  };

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

  const items = [
    {
      image: 'src/assets/isometric-cloud-storage-landing-page-concept-vector-21306132.jpg',
      alt: 'First Slide',
    },
    {
      image: 'src/assets/modern-flat-design-of-cloud-computing-online-storage-technology-on-tablet-and-mobile-device-connection-concept-for-landing-page-template-vector.jpg',
      alt: 'Second Slide',
    },
    {
      image: 'src/assets/cloud-storage-landing-page-vector.jpg',
      alt: 'Third Slide',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <AppBar  sx={{ bgcolor: 'linear-gradient(90deg, #0070f3, #00c6ff)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            DocsTrace
          </Typography>
          <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 'bold' }} onClick={handleLoginClick}>Login</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container 
        maxWidth={false} 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          height: 'calc(100vh - 64px)', 
          mt: 8,
          px: 4 
        }}
      >
        <Box sx={{ width: '50%' }}>
          <Typography variant="h3" gutterBottom sx={{ fontSize: '3.0rem', fontWeight: 'bold' }}>
            Everything you and your business need to work efficiently, all in one place
          </Typography>
          <Typography variant="body1" paragraph>
            Collaborate seamlessly and deliver work faster from anywhere with DocTrace. Securely store your content, edit PDFs, share videos, sign documents and track file engagement—without leaving DocTrace.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Try it for free
          </Button>
          <Button variant="text" color="primary">
            or purchase now
          </Button>
        </Box>

        {/* Carousel */}
        <Carousel sx={{ width: '50%',height: '100%' }}>
          {items.map((item, index) => (
            <Box key={index} component="img" src={item.image} alt={item.alt} sx={{ maxWidth: '600px', borderRadius: '8px',pt:14 }} />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};

export default LandingPage;
