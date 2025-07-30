import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import './index.scss';
import DevPage from './pages/DevPage.tsx';
import MainPage from './pages/MainPage.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const router = createBrowserRouter([
  {
    path: '/public-site', element: <App />, children: [
      { index: true, element: <MainPage /> },
      {
        path: '/public-site/dev', element:
          <ProtectedRoute><DevPage /></ProtectedRoute>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
