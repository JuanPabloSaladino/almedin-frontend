import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
} from "react-router-dom";
import './index.css';
import AppContextProvider from './context/AppContext';
import router from './router/RoutesConfig';
import SnackbarContextProvider from './context/SnackbarContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <SnackbarContextProvider>
        <RouterProvider router={ router } />
      </SnackbarContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
