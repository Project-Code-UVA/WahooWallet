import { Navigate, useLocation } from "react-router";
import { useAuth } from "./UserAuth.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  /* 
    Fix for trailing forward slashes in pathname breaking react-router (super niche)
    '//', '////', etc, get forced to '/'
    '/url/', '//url', '/url//' are untouched.
  */
  const multipleSlashes = location.pathname.match(/^\/{2,}$/);
  if (multipleSlashes) {
    window.location.pathname = '/';
  }

  if (!user) {
    return <Navigate to='/login' />
  }

  return children;
}