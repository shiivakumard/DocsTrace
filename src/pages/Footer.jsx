/* src/components/Footer.jsx */
import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: '#fff', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              DocsTrace
            </Typography>
            <Typography variant="body2">
              © {new Date().getFullYear()} DocsTrace. All rights reserved.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="#" color="inherit" underline="hover" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mb: 1 }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Contact Us
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="#" color="inherit" underline="hover" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mb: 1 }}>
              Careers
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Blog
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
