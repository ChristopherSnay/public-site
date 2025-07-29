import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.scss';
import MainPage from './pages/MainPage.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { index: true, element: <MainPage /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
