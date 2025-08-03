import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import './index.scss';
import ContactPage from './pages/ContactPage.tsx';
import DevPage from './pages/DevPage.tsx';
import EducationPage from './pages/EducationPage.tsx';
import ExperiencePage from './pages/ExperiencePage.tsx';
import MainPage from './pages/MainPage.tsx';
import PostPage from './pages/PostPage.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'dev',
        element: <ProtectedRoute><DevPage /></ProtectedRoute>
      },
      {
        path: 'education',
        element: <EducationPage />
      },
      {
        path: 'experience',
        element: <ExperiencePage />
      },
      {
        path: 'post/:postId',
        element: <PostPage />
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
