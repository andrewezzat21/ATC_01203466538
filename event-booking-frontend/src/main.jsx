import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.jsx'
import './index.css'
import AdminPage from './pages/AdminPage.jsx'
import Checkout from "./pages/Checkout.jsx"
import EventsPage from './pages/EventsPage.jsx'
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
    element:<HomePage />
  },
  {
    path: '/events',
    element:<EventsPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/book/:eventId',
    element: <Checkout/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
