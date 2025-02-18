import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const FeatureCard = ({ title, description, buttonText }) => {
  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: '#fff', p: 4, borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" paragraph>
        {description}
      </Typography>
      <Button variant="contained" color="primary" sx={{ bgcolor: '#0070f3', mt: 2 }}>
        {buttonText}
      </Button>
    </Box>
  );
};

const Card = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
      <FeatureCard
        title="For work"
        description="Work efficiently with teammates and clients, stay in sync on projects, and keep company data safe — all in one place."
        buttonText="Get Dropbox for work"
      />
      <FeatureCard
        title="For personal use"
        description="Keep everything that’s important to you and your family shareable and safe in one place. Back up files in the cloud, share photos and videos, and more."
        buttonText="Get Dropbox for personal use"
      />
    </Container>
  );
};

export default Card;
