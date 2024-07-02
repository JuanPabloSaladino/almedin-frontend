import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import TurnosPage from './pages/TurnosPage';
import EspecialistasPage from './pages/EspecialistasPage';
import AppContextProvider from './context/AppContext';
import LoginPage from './pages/LoginPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/turnos",
    element: <TurnosPage />
  },
  {
    

  },
  {
    path: "/especialistas",
    element: <EspecialistasPage />
  },
  {
    path: "/login",
    element:<LoginPage />
  }
]);


root.render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={ router } />
    </AppContextProvider>
  </React.StrictMode>
);
