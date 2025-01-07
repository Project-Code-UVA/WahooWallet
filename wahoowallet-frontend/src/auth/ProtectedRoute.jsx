import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }) {
  // Real auth logic needed once DB is setup
  const isLoggedIn = true;

  /* 
    Fix for trailing forward slashes in pathname breaking react-router (super niche)
    '//', '////', etc, get forced to '/'
    '/url/', '//url', '/url//' are untouched.
  */
  const location = useLocation();
  useEffect(() => {
    const multipleSlashes = location.pathname.match(/^\/{2,}$/);
    if (multipleSlashes) {
      window.location.pathname = '/';
    }
  }, [location]);

  return isLoggedIn ? children : <Navigate to='/login' />;
}