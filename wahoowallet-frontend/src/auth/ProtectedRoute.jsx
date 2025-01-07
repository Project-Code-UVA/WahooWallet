import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  // Real auth logic needed once DB is setup
  const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to='/login' />;
  /*
    Needs fix: When not logged in, and filepath is '/' more than one time
    Eg. '//', '/////', etc, without any other characters,
    <Navigate /> cannot redirect to '/login'
  */
}