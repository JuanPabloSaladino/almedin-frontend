import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

const AppBarComponent = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Link to="/especialistas" style={{ textDecoration: 'none', color: '#FFF', margin: '10px' }}>
            Especialistas
          </Link>
          <Link to="/turnos" style={{ textDecoration: 'none', color: '#FFF', margin: '10px' }}>
            Turnos
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarComponent;
