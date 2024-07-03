import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import TurnosPage from '../pages/TurnosPage';
import EspecialistasPage from '../pages/EspecialistasPage';

const routes = [
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/turnos',
    element: <TurnosPage />
  },
  {
    path: '/especialistas',
    element: <EspecialistasPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
];

const router = createBrowserRouter(routes);

export default router;
