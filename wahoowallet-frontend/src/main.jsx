import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css'
import App from './App.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import { AuthProvider } from './auth/UserAuth.jsx';

import Login from './components/Login/Login.jsx'
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';

// For demonstration purposes
import Test from './components/Test.jsx'

// Authorized-only pages
import BankAccount from './components/BankAccount/BankAccount.jsx';
import Grubhub from './components/Grubhub/Grubhub.jsx';
import AI from './components/AI/AI.jsx';
import Budget from './components/Budget/Budget.jsx';
import Profile from './components/Profile/Profile.jsx';

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
        path: '/grubhub',
        element: <Grubhub />
      },
      {
        path: '/AI',
        element: <AI />
      },
      {
        path: '/budget',
        element: <Budget />
      },
      {
        path: '/profile',
        element: <Profile />
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
    path: '*',
    element: <PageNotFound />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
