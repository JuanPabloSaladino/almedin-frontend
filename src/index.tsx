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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <TurnosPage />
  },
  {
    path: "/turnos",
    element: <TurnosPage />
  },
  {
    path: "/especialistas",
    element: <EspecialistasPage />
  }
]);


root.render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={ router } />
    </AppContextProvider>
  </React.StrictMode>
);
