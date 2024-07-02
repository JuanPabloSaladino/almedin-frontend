import React from 'react';
import LoginComponent from '../components/Login/login';
import { Container, Box } from '@mui/material';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <LoginComponent />
      </Box>
    </Container>
  );
};

export default LoginPage;
