import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './pages/routes'

export function App() {

  return (
   <RouterProvider router={router}/>
  )
}