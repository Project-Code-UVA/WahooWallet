import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css'
import App from './App.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'

import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';

// For demonstration purposes
import Test from './components/Test.jsx'

// Authorized-only pages
import BankAccount from './components/BankAccount/BankAccount.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <BankAccount />
      },
      {
        path: '/bank',
        element: <BankAccount />
      },
      {
        path: '/test',
        element: <Test />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
