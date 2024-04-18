import { RouterProvider } from 'react-router-dom';
import './global.css';
import { router } from './routes/routes';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/theme/theme-provider';
import { AuthProvider } from './contexts/authContext';  // Garanta que o caminho de importação está correto
import { Toaster } from 'sonner';

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey='favoritemovies-theme' defaultTheme='dark'>
        <Helmet titleTemplate='%s | Favorite Movies' />
        <Toaster/>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
