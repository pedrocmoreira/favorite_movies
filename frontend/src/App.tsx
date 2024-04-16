import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './pages/routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {

  return (
    <HelmetProvider>
      <ThemeProvider storageKey='favoritemovies-theme' defaultTheme='dark'>
        <Helmet titleTemplate='%s | Favorite Movies' />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}