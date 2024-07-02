import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../../api/login-api';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { AppContext } from '../../context/AppContext';

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  const handleLogin = async () => {
    try {
      console.log("Email:", email, "Password:", password);
      const response = await LoginAPI.login(email, password);

      console.log("Respuesta del backend:", response);

      if (response) {
        setUser(response)
        navigate('/turnos'); // Redirige al usuario a /turnos
      } else {
        throw new Error("PARO EN EL COMPONENTE LOGIN pq response es nulo");
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.' + err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginComponent;

