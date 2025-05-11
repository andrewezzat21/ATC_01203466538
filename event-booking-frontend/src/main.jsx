import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.jsx'
import './index.css'
import AdminPage from './pages/AdminPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const router = createBrowserRouter([
  {
    path: '/admin',
    element:<PrivateRoute role="ADMIN"><AdminPage /></PrivateRoute>
  },
  {
    path: '/',
    element:<PrivateRoute role="USER"><HomePage /></PrivateRoute>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
